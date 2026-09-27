# Learning core

Versioned mission and evidence contracts only; no learner database, adaptive scoring or runtime validation. Checked by root TypeScript; not a published npm package. See [architecture](../../docs/learning-world/architecture.md).

`TenantLearningEvidence` is a future server-bound envelope: `companyId` must come from trusted auth and resource authorization must also check guardian/teacher relationships. TypeScript alone does not enforce either.

Question, prediction, action, consequence, child explanation and revised strategy remain separate evidence. Prediction, explanation and strategy use explicit `recorded`, `unknown` or `not-attempted` states; a recorded state references an opaque choice/response/strategy ID rather than requiring free-text telemetry. Adult or AI interpretation remains a separate reviewed field.
