# Safety and data requirements

These are implementation gates, not claims of legal compliance or an operational safety service.

## Foundation

Only authored, synthetic fixtures enter source control. No child names, dates of birth, school identifiers, recordings, production exports or real conversations in code, prompts, logs or screenshots. No provider key is needed. The repository is public, so templates and examples must be safe to publish.

## Before child accounts or persistence

- Guardian onboarding and verifiable relationship to a child; age-appropriate notice and applicable legal/privacy review.
- Server-derived tenant scope plus guardian/teacher assignment checks on every read/write/export/delete; negative cross-tenant and same-tenant/unrelated-child tests.
- Minimize data; document field purpose, retention duration, access roles and deletion/backup behavior. Do not collect exact birth dates or voice by default.
- Version consent and policy records. Support withdrawal, export, deletion and privileged access auditing through shared services.
- No advertising profiles, public child rankings, manipulative streaks, open social chat or purchases in the first slice.

## Before model access

Use NirvaAI's approved server integration; never put secrets into a static app or `NEXT_PUBLIC_*`. Allowlist tasks/context/output shape, redact identifiers, bound tokens/time/tool access and validate model output as untrusted. Do not transmit reflection text or audio by default. No provider configuration in this PR authorizes uploads.

A companion is an AI helper, not a secret confidant or substitute guardian. Provide understandable identity/disclosure and a clear adult-help route. No emotional exclusivity or requests to keep secrets from trusted adults. Concerning content needs a reviewed response/escalation policy and accountable adults before the pilot.

Test prompt injection from mission content, harmful/inappropriate hints, missing consent, tenant mismatch, provider failure, exhausted budget and deletion. A model output never overrides permission or deterministic simulation rules.

## Evidence classification

Store observation separately from inference. Unknown stays unknown. Do not infer diagnoses, intelligence, religion or family traits from play. Symbolic worlds are optional narrative metaphors, not scientific facts or required beliefs.

## Launch checklist ownership

The product owner and qualified privacy/safeguarding reviewers must record decisions on jurisdiction, consent, retention, approved providers and escalation capacity before a live pilot. This foundation does not claim these decisions are complete.
