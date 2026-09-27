# ADR 0001 — Extend the existing Academy repository

Date: 2026-09-27. Status: proposed for PR review.

## Context

The request is to prepare Learning World in canonical Nirva without creating a duplicate repository. A prior conversation suggested a generic `nirva-platform/apps` layout, but that was illustrative, not repository evidence.

Live GitHub metadata and the [frozen repository reconciliation](https://github.com/Nirvacore/nirva-one/blob/09853a56aa0cdbc2c809cfa3b8888f96b6a02f04/docs/architecture/REPOSITORY_RECONCILIATION_V1.md) identify `Nirvacore/nirva-academy` as the education family. Its main at `2e7aa6a5352e2ec71bf369160e3397969a246cf8` already serves learning content. NirvaCore remains identity/backend authority, not the default home for every UI.

## Decision

Add `docs/learning-world`, source-only `apps/learning-world` and narrowly named packages within Academy. Preserve the root app, lockfile and existing deployment workflows. Reuse shared identity and AI through future reviewed contracts. Use GitHub branch `feature/learning-world-foundation` and a PR to `main`; do not auto-merge.

## Alternatives

- New learning repo: duplicates the existing family and adds release/ownership overhead; rejected for this scope.
- Put the child UI inside NirvaCore ERP: ties a different experience to ERP routes; keep only shared backend contracts there.
- Move Academy to a new monorepo layout now: unnecessary disruption; source folders can precede a separately reviewed workspace migration.

## Consequences

No new product family or backend is created. A future separate deployable app requires a packaging/deployment ADR and explicit release approval. CODEOWNERS routes to the verified repository administrator `@Nirvacore`; this is routing, not evidence of branch-protection enforcement.
