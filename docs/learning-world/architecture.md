# Architecture and integration boundaries

Status: foundation contracts; no live integrations.

## Verified repository ownership

Portfolio authority: [Nirva One reconciliation at 09853a56](https://github.com/Nirvacore/nirva-one/blob/09853a56aa0cdbc2c809cfa3b8888f96b6a02f04/docs/architecture/REPOSITORY_RECONCILIATION_V1.md).
It keeps `nirva-academy` for learning, `nirvacore-v1` for shared identity/business data and `nirva-AI` for AI orchestration. [ADR 0001](adr/0001-reuse-academy.md) captures the decision.

Academy baseline: `2e7aa6a5352e2ec71bf369160e3397969a246cf8`, root Next.js static-export app, React, TypeScript and npm lockfile; existing CI builds it. Existing Pages, DNS and Netcup workflows are manual. Source inspection does not verify deployed state.

## Additive layout

```text
app/                         existing Academy routes, unchanged
components/ content/ lib/    existing Academy experience, unchanged
apps/learning-world/         future game composition; fixture only now
packages/learning-core/      mission/learning evidence types
packages/game-core/          deterministic simulation contract types
scripts/learning-world/      foundation documentation checks
docs/learning-world/        PRD, decisions and operational gates
```

These are source boundaries, not independently published npm packages or a second workspace manager. Root TypeScript checks them. There is no duplicate React/Next dependency, auth store, database or AI gateway. No current Academy route imports the scaffold.

## Logical engines, not six services

| Boundary | Responsibility | Initial implementation |
| --- | --- | --- |
| World/story | Scene and mission progression | Future UI in app shell |
| Learning | Evidence and versioned rubrics | Types only |
| Simulation | Pure state/action → consequences | Types only; future deterministic module |
| Companion | Reviewed hints; later bounded model call | Scripted content first |
| Safety | Access, content review, escalation, spend limits | Requirements; enforce before connection |

## Planned data flow

Child action → validate allowlisted action → deterministic simulation → consequence → child reflection → scoped learning evidence.
Optional AI will receive minimal, approved context through NirvaAI only. It cannot set simulation truth, silently change a score, execute child code, browse freely or write learner records. Provider errors, timeouts, rejected content or exhausted budget fall back to reviewed hints.

## Contracts and authorization

See [learning types](../../packages/learning-core/src/index.ts) and [game types](../../packages/game-core/src/index.ts). Contract version, mission version and rules version are independent. Fixtures use synthetic opaque IDs.

Future persisted requests must derive `companyId` and actor identity from verified server context, not request body. `companyId` is necessary but not sufficient: guardian/child relationships and teacher assignments must be checked per resource. A family tenant mapping must be agreed with NirvaCore before live accounts. Never reinterpret a missing tenant as global access. Do not reuse employee LMS permissions as child consent.

Types are not runtime validators. Before adding an API, implement bounded payload validation, per-resource authorization, rate limits, idempotent evidence writes and tenant-isolation tests. Keep proposed endpoints unregistered until their contracts are reviewed. Do not add a Prisma schema or apply `db push` from this repository.

## Environments and rollback

Local foundation uses synthetic data without secrets. Dev/staging/production are future distinct credentials, tenants and approval gates; a branch is not an environment. No deployment configuration is added. Rollback before merge is closing the PR; after merge a reviewed revert removes the additive scaffold. No database rollback or data migration is involved.

Existing Git is code recovery only. A later persisted release needs owner-reviewed database/object backups, retention/deletion handling and a demonstrated restore; Git alone is not a child-data backup policy.
