---
paths:
  - "**/routes.ts"
  - "**/controllers/**"
  - "**/services/**"
  - "**/repositories/**"
  - "**/models/**"
  - "**/cron/**"
  - "**/queues/**"
---

# Rails-style API layout

Backend code is laid out like a Rails app so it reads familiarly: a route table, a controller per resource, service objects for business rules, and models. Rails' ActiveRecord is split in two: models are objects that hold a thing's fields and behaviour, and repositories hold the queries that load and save them. The repo's `CLAUDE.md` maps this onto its platform.

| Rails | Here | Owns | Must not |
|-------|------|------|----------|
| `config/routes.rb` | `src/routes.ts` | The table mapping each path to a controller action | Contain request handling |
| `app/controllers/` | `src/controllers/<version>/<resource>Controller.ts` | Read the request, call one service method, map its result to a response | Contain queries, storage calls or business rules |
| Service objects | `src/services/<feature>/<thing>Service.ts` | Business rules | Touch a database or storage binding, or build a response |
| ActiveRecord queries | `src/repositories/<thing>Repository.ts` | Every query and storage call for one table or bucket, returning model types | Make business decisions or call services |
| ActiveRecord models | `src/models/<feature>/<thing>.ts` | A class per thing with its fields and behaviour, its input parsing, and its row shape | Do I/O, save themselves, or import from the other layers |
| `app/jobs/` | `src/cron/jobs/` | Scheduled work, registered by schedule | Contain business rules; call a service instead |
| Background workers | `src/queues/` | Queue messages, registered by queue name: parse, call a service, ack or retry | Contain business rules; call a service instead |
| `lib/` | `src/lib/` | Small cross-cutting helpers | Know about a feature |
| `db/migrate/` | `migrations/` | Schema changes, numbered and append-only | Change once applied |

## Classes

Controllers, services and repositories are classes with static methods:

```ts
export class ThingsController {
	static async create(request: Request, env: Env): Promise<Response> { ... }
}

export class ThingService {
	static async create(env: Env, input: ThingInput): Promise<CreateThingResult> { ... }
}

export class ThingRepository {
	static async findById(db: Database, id: string): Promise<Thing | null> { ... }
	private static toThing(row: ThingRow): Thing { ... }
}
```

- Name them `<Resource>Controller` (plural, like Rails), `<Thing>Service` and `<Thing>Repository`, one class per file.
- Controller methods are the actions the route table points at. Helpers are `private static` or module-level functions in the same file.
- Pass bindings or `env` as the first argument rather than storing them on the class. No instance state, inheritance, base classes or DI containers.
- Models are different: they are objects with fields, covered next.

## Models

A model is one class per thing, holding its fields and its own behaviour, so everything a thing can do is in one place and services read like sentences:

```ts
export class Thing {
	declare readonly id: string;
	declare readonly name: string;
	declare readonly parts: readonly Part[];

	constructor(attributes: Attributes<Thing>) {
		Object.assign(this, attributes);
	}

	// Input from a request, parsed and validated.
	static parse(input: unknown): ParseThingResult { ... }

	isEmpty(): boolean {
		return this.parts.length === 0;
	}

	// A change returns a new object; the original is left as it was.
	renamed(name: string): Thing {
		return new Thing({ ...this, name });
	}
}
```

- Fields are `readonly`. A method that changes something returns a new instance, so code can still compare what was loaded with what it is about to save.
- Methods answer questions about the thing, derive values from its fields, and return changed copies. They never do I/O.
- A model never saves or loads itself: there is no `thing.save()` or `Thing.find()`. Repositories build model instances from rows and take them back to save.
- The constructor takes the model's fields as one object (`Attributes<Thing>`, its fields without its methods), so a repository or a test builds one in a single call.
- Parsing request input is a static on the class (`Thing.parse(input)`), returning a typed result.
- A model turns itself into the plain shape a response needs with a method such as `toDetails()`. The response body itself is still built in the controller, and its JSON stays the same when a model changes shape inside.
- Small values that are part of a thing, such as its line items, are classes of their own when they have behaviour, and live in the same file.
- A pure helper with no thing behind it, such as parsing a page number, stays a plain function.

## Fat models, skinny controllers, focused services

Each layer has one kind of job, so none of them bloats:

- **Controllers stay skinny:** read the request, call one service method, map its result to a response. Nothing else.
- **Models are fat:** every rule about one thing's own fields lives on its model: what is valid, what counts as done, totals and other derived values, and how it changes.
- **Services are use cases:** load what the use case needs through repositories, ask the models, save through repositories, and return a typed result. A service keeps only the rules a model can't answer alone, because they need storage or more than one thing, such as a limit counted across rows or a reference to another table.
- If a service checks or changes a thing's own fields, move that logic onto the model. If a service method is only a call to a model and a repository with no rule of its own, keep it thin rather than adding to it.
- One service per resource or use case, named after it. Merge services that serve the same resource; split one whose methods serve unrelated resources.

## The route table

The route table is the one place to read what the API exposes, top to bottom, like `config/routes.rb`.

```ts
// The app's route table, read top to bottom like config/routes.rb. Paths match exactly.
const routes: Record<string, RouteHandler> = {
	'/ping': HealthController.ping,
	'/v1/things': ThingsController.list,
	'/v1/things/create': ThingsController.create,
	'/v1/things/update': ThingsController.update,
	'/v1/things/delete': ThingsController.remove,
	'/v1/things/publish-now': ThingsController.publishNow,
};

export function findRoute(pathname: string): RouteHandler | null {
	return routes[pathname] ?? null;
}
```

- One entry per path, mapping it straight to `<Resource>Controller.<action>`. No handlers, closures or logic inline.
- Group a resource's routes together, list first, then the actions on it. Paths are `/<version>/<resource>` for the list and `/<version>/<resource>/<action>` for each action, in kebab-case.
- Action names are verbs in camelCase: `list`, `create`, `update`, `remove` (since `delete` is reserved), and domain verbs like `schedule`. The path and the action say the same thing.
- Version public paths (`/v1/...`) and mirror the version in the controller folder. Health checks and protocol endpoints stay unversioned, with their controllers directly in `src/controllers/`.
- A library that owns a whole path prefix, such as an auth library, is mounted by prefix in `findRoute`, with a comment saying why. Everything else matches exactly.
- The entry point only dispatches: it finds the route, calls it, and applies cross-cutting concerns such as CORS. Adding an endpoint is a controller action plus one line here.

## Rules

- Calls go one way: route table → controllers → services → repositories. Any layer may import models and `src/lib/`. Controllers never call repositories or other controllers; repositories never call services. A service may call another feature's service, not its repository.
- A service talks to storage only through a repository. When a query is needed, add or extend a repository method instead of querying from the service.
- Repositories use bound parameters for every value, and map storage rows (snake_case) to model instances (camelCase fields) before returning. Nothing above the repository sees raw rows or storage objects.
- Validation lives in models: `Thing.parse(input): { ok: true, value } | { ok: false, code }`. Controllers and services call it; they don't re-check fields by hand.
- Expected failures are typed results at every layer (`{ ok: true, ... } | { ok: false, code }`). Controllers map each `code` to a response with an exhaustive `switch`. Repositories throw only on unexpected I/O errors, and the controller catches those.
- Response bodies are built only in controllers. A response shape two controllers share lives next to them in `src/controllers/`.
- Logic starts in its feature's service folder. When a second feature needs it, move it to `src/lib/` (cross-cutting) or a shared service in the same change.
- Name each feature folder after the product or tool it serves, in full (`<toolName>`, not a shortened word), so the folder says which tool it is for. Models sit in the same feature folders as services. A model a second feature needs moves to `src/models/shared/` in the same change.
- A migration that changes a table is paired with changes to that table's repository and model in the same change.
- Test services by stubbing repository methods, test repositories against real local storage, and test controllers end to end through the app's entry point.
