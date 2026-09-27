# Learning World app boundary

Source-only scaffold; not a runnable application. The existing Academy stays at the repository root. Do not run a second package install here.

`src/missions/wilted-tree.ts` is a typed, synthetic content fixture for the first five-minute experience. It has no user data, AI call or runtime simulation.

Run `npm run typecheck` and `npm run check:learning-world` from the root. See [PRD](../../docs/learning-world/PRD.md) and [architecture](../../docs/learning-world/architecture.md) before building the first DOM/SVG playable slice.

`.env.example` documents future local-only defaults. They are not read by a runtime in this PR. No keys or environment file are required for the checks.
