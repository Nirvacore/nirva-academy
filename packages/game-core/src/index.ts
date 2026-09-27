export interface SimulationState {
  readonly rulesVersion: string;
  readonly tick: number;
  readonly waterUnits: number;
  readonly treeCondition: "dry" | "balanced" | "waterlogged";
}

export type SimulationAction =
  | { readonly kind: "observe" }
  | { readonly kind: "add-water"; readonly units: 1 | 2 | 3 }
  | { readonly kind: "wait" };

export interface SimulationResult {
  readonly state: SimulationState;
  readonly consequenceId: string;
}

// Future implementation must be pure and validate inputs at runtime boundaries.
export type Simulate = (
  state: SimulationState,
  action: SimulationAction,
) => SimulationResult;
