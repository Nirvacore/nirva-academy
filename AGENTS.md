# Repository instructions

## Scope and sources

This is Nirva Academy, the existing learning product. Read `README.md` and scoped documents before editing. Portfolio ownership is defined in Nirva One; Learning World decisions and source links are in `docs/learning-world/`.

## Preserve existing behavior

- Keep the root Next.js static-export app and existing content/routes intact unless the task specifically changes them.
- `apps/learning-world` and `packages/*-core` are source-only foundation boundaries, not deployed services or npm workspaces.
- Do not duplicate identity, tenant storage, payments or the NirvaAI gateway. Future server calls derive `companyId` from trusted auth and enforce guardian/teacher relationships.
- Use Thai-first product text and English code identifiers. Preserve the metaphor/fact distinction in existing learning content.
- Do not apply database changes, alter DNS, trigger deployment, enable paid providers or auto-merge without explicit task authorization.

## Checks and handoff

Use Node 22 and `npm ci`. For this foundation run `npm run check:learning-world`, `npm run typecheck`, and `npm run build`. For changed runtime behavior add focused behavioral tests. `npm run test:shop` is an intentionally failing learner exercise; do not silently fix it for unrelated work.

Before push, review the complete diff and scan new commits plus tracked files with Gitleaks redaction. Never commit real learner data, credentials or `.env` files. `.env.example` contains safe defaults only. Report existing audit failures honestly; do not rewrite the lockfile or suppress findings just to pass.

Use small commits and a PR. State local checks, CI, review, merge and deployment separately. Respect unrelated work and existing branches.
