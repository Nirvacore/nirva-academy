# Learning core

Versioned mission and evidence contracts only; no learner database, adaptive scoring or runtime validation. Checked by root TypeScript; not a published npm package. See [architecture](../../docs/learning-world/architecture.md).

`TenantLearningEvidence` is a future server-bound envelope: `companyId` must come from trusted auth and resource authorization must also check guardian/teacher relationships. TypeScript alone does not enforce either.
