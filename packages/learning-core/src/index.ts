export type AgeBand = "7-9" | "10-12";
export type Locale = "th" | "en";
export type LearningSkill = "observation" | "reasoning" | "reflection" | "transfer";
export type MissionPhase =
  | "observe" | "question" | "explore" | "build"
  | "act" | "consequence" | "reflect" | "improve";

export interface MissionDefinition {
  readonly contractVersion: 1;
  readonly id: string;
  readonly contentVersion: string;
  readonly ageBands: readonly AgeBand[];
  readonly title: Readonly<Record<Locale, string>>;
  readonly openingQuestion: Readonly<Record<Locale, string>>;
  readonly skills: readonly LearningSkill[];
  readonly phases: readonly MissionPhase[];
  readonly hintMode: "scripted";
}

// Future persisted envelope, not an authorization implementation.
export interface TenantLearningEvidence {
  readonly contractVersion: 1;
  readonly companyId: string;
  readonly learnerId: string;
  readonly missionId: string;
  readonly contentVersion: string;
  readonly rulesVersion: string;
  readonly eventId: string;
  readonly observedAt: string;
  readonly observation: {
    readonly actionId: string;
    readonly consequenceId: string;
    readonly revisedPrediction: boolean;
  };
  readonly interpretation:
    | { readonly status: "insufficient-evidence" }
    | {
        readonly status: "reviewed";
        readonly reviewerId: string;
        readonly rubricVersion: string;
        readonly skill: LearningSkill;
      };
}
