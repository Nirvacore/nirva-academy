# Delivery and verification

## Small delivery slices

1. Foundation: PRD/ADR/contracts/CI; no playable app or external services.
2. One tree mission: deterministic water simulation, DOM/SVG scene, reflection/reset and scripted hints using synthetic data. Test outcome edges and keyboard/touch/reduced-motion use.
3. Adult-reviewed learning evidence: rubric and transferable second task; no claim of efficacy from completion counts.
4. Guardian/teacher and shared identity contracts: implement authorization/consent/retention only after owners review the boundary.
5. Optional AI: NirvaAI integration, offline fallback, abuse evaluation and hard budgets after explicit provider/spend authorization.

Create scoped issues from the Learning World template as each slice is accepted; the future backlog is not a claim that those issues or implementations already exist.

## Local validation

```sh
npm ci --no-audit --no-fund
npm run check:learning-world
npm run typecheck
npm run build
npm audit --omit=dev --audit-level=high
```

`check:learning-world` validates local documentation links and required foundation files. Typecheck checks the mission fixture against the contracts. These do not test runtime authorization or a playable game. The existing `test:shop` is an intentionally failing educational exercise per the root README; do not rewrite it to make foundation CI green.

## Secret and review gate before push

Run Gitleaks with redaction on the full tracked working-tree snapshot and on every new commit, not just the final diff. Do not paste secret findings or credential contents into PRs. Check `.env` ignore behavior; only `.env.example` is committed.

```sh
gitleaks git . --redact --no-banner --log-opts="origin/main..HEAD"
git diff --check origin/main...HEAD
git diff --stat origin/main...HEAD
```

For a tracked snapshot, export `git archive HEAD` to a temporary directory and run `gitleaks dir <directory> --redact --no-banner`. No blanket allowlist is added. Report baseline dependency findings separately from newly introduced dependencies; this foundation adds none.

CI checks foundation links/contracts and the unchanged Academy build, and scans PR commit history for secrets. Existing release workflows remain manual. CI success is not approval to deploy. Workflow security: hosted runner, read-only contents permission, no production environment, checkout credentials not persisted, no `pull_request_target`, no paid AI call.

## Handoff evidence

Record base/head SHA, small commits, local checks, dependency audit disposition, PR URL and actual CI status. Mark unrun checks explicitly. Never equate pushed, reviewed, merged or deployed. Human merge and later production release remain separate actions.

## Baseline dependency findings — 2026-09-27

Local npm audit reported 4 production dependency findings: `next` critical; `js-yaml`, `postcss` and `sharp` high. The lockfile is byte-for-byte unchanged from base `2e7aa6a5352e2ec71bf369160e3397969a246cf8`. These are existing dependency findings, not new packages introduced by the scaffold. Audit is therefore **not clean**. Reachability and remediation require a separate dependency review before a release; a static-export build alone is not proof that every advisory is irrelevant.

No automatic dependency upgrade, blanket suppression or production change was made.
