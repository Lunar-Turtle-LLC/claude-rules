---
paths:
  - "migrations/**"
  - "src/repositories/**"
---

# D1 schema and migrations

- Never edit a migration that has been applied. Add a new numbered file (`NNNN_short_description.sql`) in the migrations directory set in `wrangler.jsonc`.
- Write migrations that are safe on existing data: `IF NOT EXISTS` / `IF EXISTS`, defaults for new non-null columns, and a data backfill in the same file when needed.
- Keep the Worker compatible with both the old and new schema until the migration has been applied remotely.
- Apply locally with `npx wrangler d1 migrations apply DB --local`. Only Kyle applies `--remote`.
- Mirror schema changes in the test schema setup and in the table's repository and model.
- Use bound parameters (`.bind(...)`) for every value in SQL. Never build SQL by string concatenation with request data.
- Store hashes of keys and passcodes, never the raw values.
