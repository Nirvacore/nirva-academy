# ADR 0002 — Synthetic, deterministic and offline first

Date: 2026-09-27. Status: proposed for PR review.

Start the first playable slice with reviewed scripted hints and a pure simulation. Keep the current PR at typed contracts and one synthetic mission; do not add a game engine or provider SDK yet.

A DOM/SVG scene is sufficient to test the first tree/water interaction using the existing React/TypeScript toolchain. Reassess a dedicated 2D renderer only when measured animation/input needs justify it; defer 3D/native engines until a concrete platform requirement exists.

A live LLM for every action would add latency, nondeterminism, recurring cost and child-data handling before the learning loop is validated. A separate game stack now would add packaging and maintenance cost. Both are deferred.

The future AI adapter must default off, enforce server-side budgets and safety checks, and fall back to static hints. Environment examples are documentation only; there is no executable feature-flag protection or live provider in this foundation.

Acceptance: root Academy still builds; new contracts typecheck; no new route, dependency, network call, persistence or deployment is introduced.
