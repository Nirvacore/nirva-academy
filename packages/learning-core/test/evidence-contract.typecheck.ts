import type { TenantLearningEvidence } from "../src/index";

const recordedEvidence: TenantLearningEvidence = {
  contractVersion: 1,
  companyId: "company-synthetic",
  learnerId: "learner-synthetic",
  missionId: "lw-tree-001",
  contentVersion: "0.1.0",
  rulesVersion: "water-v1",
  eventId: "event-synthetic",
  observedAt: "2026-09-28T00:00:00.000Z",
  observation: {
    questionId: "tree-cause",
    prediction: { status: "recorded", choiceId: "too-little-water" },
    actionId: "add-water-1",
    consequenceId: "tree-recovers",
    childExplanation: { status: "recorded", responseId: "because-water-helped" },
    revisedStrategy: { status: "recorded", strategyId: "measure-before-watering" },
  },
  interpretation: { status: "insufficient-evidence" },
};

const unknownEvidence: TenantLearningEvidence = {
  ...recordedEvidence,
  eventId: "event-unknown",
  observation: {
    ...recordedEvidence.observation,
    prediction: { status: "not-attempted" },
    childExplanation: { status: "unknown" },
    revisedStrategy: { status: "not-attempted" },
  },
};

const missingRecordedChoice: TenantLearningEvidence = {
  ...recordedEvidence,
  eventId: "event-invalid-missing-choice",
  observation: {
    ...recordedEvidence.observation,
    // @ts-expect-error Recorded predictions require the selected choice ID.
    prediction: { status: "recorded" },
  },
};

const inventedUnknownChoice: TenantLearningEvidence = {
  ...recordedEvidence,
  eventId: "event-invalid-invented-choice",
  observation: {
    ...recordedEvidence.observation,
    // @ts-expect-error Unknown evidence cannot silently carry a prediction choice.
    prediction: { status: "unknown", choiceId: "invented" },
  },
};

void recordedEvidence;
void unknownEvidence;
void missingRecordedChoice;
void inventedUnknownChoice;
