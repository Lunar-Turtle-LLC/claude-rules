---
paths:
  - "src/**"
  - "test/**"
---

# Layers: routes, controllers, services, repositories, models

The layout follows Rails so it reads familiarly: a route table, controllers per resource, service objects for business rules, and models. Rails' ActiveRecord is split in two here: models hold types and validation, and repositories hold the queries.

| Rails | Here | Owns | Must not |
|-------|------|------|----------|
| `config/routes.rb` | `src/routes.ts` | The table mapping each path to a controller action | Contain request handling |
| `app/controllers/` | `src/controllers/<version>/<resource>Controller.ts` | Read the request, call one service method, map its result to a `Response` | Contain SQL, R2 calls or business rules |
| (no Rails equivalent) | `src/mcp/` | MCP tools: parse tool input, call one service method, map its result to a tool result | Contain SQL, R2 calls or business rules |
| Service objects | `src/services/<feature>/<thing>Service.ts` | Business rules | Touch a D1 or R2 binding directly, or build a `Response` |
| ActiveRecord queries | `src/repositories/<thing>Repository.ts` | Every D1 query and R2 call for one table or bucket, returning model types | Make business decisions or call services |
| ActiveRecord attributes and validations | `src/models/<thing>.ts` | Domain types, request and row shapes, and pure parse/validate functions | Do I/O or import from the other layers |
| `app/jobs/` | `src/cron/jobs/` | Scheduled work, registered by cron expression | Contain business rules; call a service instead |
| Sidekiq workers | `src/queues/` | Queue messages, registered by queue name: parse, call a service, ack or retry | Contain business rules; call a service instead |
| `lib/` | `src/lib/` | Small cross-cutting helpers (encoding, CORS) | Know about a feature |
| `db/migrate/` | `migrations/main/` | D1 schema changes | Change once applied |

Controllers, services and repositories are classes with static methods:

```ts
export class ThingsController {
	static async create(request: Request, env: Env): Promise<Response> { ... }
}

export class ThingService {
	static async create(env: Env, input: ThingInput): Promise<CreateThingResult> { ... }
}

export class ThingRepository {
	static async findById(db: D1Database, id: string): Promise<Thing | null> { ... }
	private static toThing(row: ThingRow): Thing { ... }
}
```

Name them `<Resource>Controller`, `<Thing>Service` and `<Thing>Repository`, one class per file. Controller methods are the actions the route table points at. Helpers are `private static` or module-level functions in the same file. Pass bindings or `env` as the first argument rather than storing them on the class. No instance state, inheritance, base classes or DI containers. Models are plain types and functions, not classes.

## Rules

- Calls go one way: route table → controllers → services → repositories. Any layer may import models and `src/lib/`. Controllers never call repositories or other controllers; repositories never call services. A service may call another feature's service, not its repository.
- Add an endpoint by adding a controller action and one line to the route table, then decide its CORS mode. Controller folders mirror the URL version (`/v1/...` lives in `src/controllers/v1/`); a controller for an unversioned path sits directly in `src/controllers/`.
- A service talks to storage only through a repository. When a query is needed, add or extend a static method on the repository instead of calling `db.prepare` or a bucket method in the service.
- Repositories use bound parameters for every value, and map D1 rows (snake_case) and R2 metadata to model types (camelCase) before returning. Nothing above the repository sees raw rows or R2 objects.
- Validation lives in models: `parseX(input): { ok: true, value } | { ok: false, code }`. Controllers and services call it; they don't re-check fields by hand.
- Expected failures are typed results at every layer (`{ ok: true, ... } | { ok: false, code }`). Controllers map each `code` to a response with an exhaustive `switch`. Repositories throw only on unexpected I/O errors; the controller boundary catches those.
- Response bodies are built only in controllers. A response shape two controllers share lives next to them in `src/controllers/`.
- Logic starts in its feature's service folder. When a second feature needs it, move it to `src/lib/` (cross-cutting) or a shared service in the same change, rather than copying it. Before writing a helper, search the services and `src/lib/` for one.
- Keep side effects at the edges: D1 and R2 in repositories, other network calls in services. Keep the logic they call pure.
- Catch unexpected errors at the controller, not deep inside a service, unless you're converting the error into a typed result.
- A D1 migration that changes a table is paired with changes to that table's repository and model in the same PR.
- Test services by stubbing repository methods with `vi.spyOn`, test repositories against the local D1 and R2 bindings, and test controllers end to end through the Worker's `fetch`.
