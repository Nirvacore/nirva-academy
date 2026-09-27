# Product requirements — v0.1

Status: proposed foundation for review. User-requested direction comes from “เจนหลังอัลฟ่า”; this document records the implementable scope, not proof of learning outcomes.

## Product goal

A world where a child observes, asks, explores, builds, acts, sees consequences, reflects, and improves. The north star is evidence of better reasoning and transfer of learning, not screen time, streaks, or mission completion.

## Users and boundaries

| User | Intended capability | Foundation status |
| --- | --- | --- |
| Child, initially 7–12 | Explore one Living City; try again without identity judgments | Synthetic fixture only |
| Parent/guardian | Manage profile/consent; co-play; inspect learning evidence | Requirements only |
| Teacher | Review evidence for assigned learners; curate missions | Future authorized pilot |
| Creator | Author versioned missions for adult review | Future tooling |
| Administrator | Review content, safety incidents, access and retention | Future integration |

Age band and demonstrated capability are separate. Skills may develop at different rates; never label a child's intelligence or diagnose ability. Adapt text and scaffolding per skill using reviewed evidence. Thai first, English fallback. Do not collect exact birth dates when an age band suffices.

## First experience and core loop

The eventual guardian creates a profile with age band, language, interests and accessibility preferences. Avoid a long placement test; observe play over time. In the first five minutes, a wilted tree invites “คิดว่าเกิดอะไรขึ้น?” and an immediate experiment.

Observe → Question → Explore → Build → Act → Consequence → Reflect → Improve.

Distinguish short-term results, longer-term trade-offs, and effects on others. Feedback describes actions and conditions, never “you are bad.” AI hints progress from a question to a clue to a worked explanation after the child's attempt; a child can decline hints.

## Delivery scope

**This foundation:** documents, typed contracts, one synthetic mission, repository guardrails and CI. No playable route, account, persistence, provider SDK, database migration, production flag activation or deployment.

**Next vertical slice:** one tree/water mission, deterministic rule-based consequences, a reflection prompt and reset, keyboard/touch access, scripted companion; local synthetic data only.

**Later MVP target:** one city, Self/Nature/Technology areas, 20 reviewed missions, block-based coding, parent evidence view and one bounded companion. This target is not included in the foundation PR.

Home/River/Forest/Farm/Workshop are candidate locations, not promised built areas. Teacher authoring, co-op, voice, multiplayer, marketplaces, open-ended child chat and persistent knowledge graphs are deferred.

## Acceptance criteria for next slice

| ID | Observable check |
| --- | --- |
| LW-01 | Child can observe, predict, act, compare, reflect and retry one mission without AI/network access. |
| LW-02 | Identical state, action and rule version produce identical results; dry/adequate/excess-water edges are tested. |
| LW-03 | A wrong hypothesis is recoverable; no punitive identity label or pressure to keep playing. |
| LW-04 | Keyboard and touch complete every action; text alternatives and reduced motion work. |
| LW-05 | Thai prompts are understandable in an adult-reviewed usability session; English fallback is defined. |
| LW-06 | Evidence separates observed action, child explanation and adult/AI interpretation; unknown capability stays unknown. |
| LW-07 | Reset clears local session state; no names, free-text telemetry or external requests are required. |
| LW-08 | Any later integration denies mismatched tenant, guardian and assigned-teacher access, including by-ID reads. |

## Learning evidence and evaluation

Record the question, prediction choice, selected action, versioned consequence and revised strategy. For an authorized pilot, adults use a rubric: asks relevant questions; tests a hypothesis; explains a result; revises after feedback; transfers reasoning to a new situation. Use repeated observations and mark insufficient evidence; completing a mission alone does not establish improvement.

Do not publish comparative child rankings. Session length is a wellbeing guardrail, not an optimization target. Pilot success criteria, accessibility participants, consent process and retention duration require owner/educator review before recruitment.

## Open decisions before a live pilot

Guardian verification, applicable privacy requirements/consent wording, child-data retention and deletion across backups, adult review staffing, approved AI providers and hard spend ceiling. None is implicitly solved by this PR.
