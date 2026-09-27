# Learning World scope

Read the root AGENTS.md and `docs/learning-world/PRD.md`.

This directory has a synthetic mission fixture only. There is no playable route, server, account, storage, simulation implementation or live AI. Keep fixtures synthetic. Do not connect it to the existing Academy routes as a side effect of scaffold maintenance.

Use learning-core for learning contracts and game-core for simulation contracts. Never let model output change rules or permissions. Real child data, external AI and persistence require the reviewed safety/data gates. Changes to behavior need corresponding focused tests and evidence.
