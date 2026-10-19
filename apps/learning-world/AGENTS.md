# Learning World scope

Read the root AGENTS.md and `docs/learning-world/PRD.md`.

The first synthetic mission has a playable static route at `/learning-world/tree`. Its deterministic simulation lives in `packages/game-core`; the page keeps choices only in React memory and clears them on retry or reload. There is no server, account, storage, or live AI. Keep fixtures synthetic. Any other connection to Academy routes needs an explicit task.

Use learning-core for learning contracts and game-core for simulation contracts. Never let model output change rules or permissions. Real child data, external AI and persistence require the reviewed safety/data gates. Changes to behavior need corresponding focused tests and evidence.
