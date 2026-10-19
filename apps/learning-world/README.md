# Learning World app boundary

This folder owns the synthetic mission fixture; the playable static page is at the root app's `/learning-world/tree` route. The existing Academy stays at the repository root. Do not run a second package install here.

`src/missions/wilted-tree.ts` is a typed, synthetic content fixture for the first five-minute experience. The pure water simulation is in `packages/game-core/src/tree-simulation.ts`; the client page uses it without a network request, account or persisted learner record.

Run `npm run check:learning-world`, `npm run typecheck`, `npm run build` and `npm test` from the root. See [PRD](../../docs/learning-world/PRD.md) and [architecture](../../docs/learning-world/architecture.md) before adding another mission or a live integration.

`.env.example` documents future local-only defaults. They are not read by a runtime in this PR. No keys or environment file are required for the checks.
