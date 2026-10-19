import type { Simulate, SimulationAction, SimulationState } from "./index";

export const TREE_RULES_VERSION = "1.0.0";

export function initialTreeState(): SimulationState {
  return { rulesVersion: TREE_RULES_VERSION, tick: 0, waterUnits: 0, treeCondition: "dry" };
}

function assertState(state: SimulationState): void {
  if (
    state.rulesVersion !== TREE_RULES_VERSION ||
    !Number.isSafeInteger(state.tick) || state.tick < 0 ||
    !Number.isSafeInteger(state.waterUnits) || state.waterUnits < 0 || state.waterUnits > 6 ||
    state.treeCondition !== conditionFor(state.waterUnits)
  ) {
    throw new Error("Invalid tree state");
  }
}

function conditionFor(waterUnits: number): SimulationState["treeCondition"] {
  if (waterUnits < 2) return "dry";
  if (waterUnits === 2) return "balanced";
  return "waterlogged";
}

export const simulateTree: Simulate = (state, action) => {
  assertState(state);
  let waterUnits = state.waterUnits;

  switch (action.kind) {
    case "observe":
      break;
    case "add-water":
      if (action.units !== 1 && action.units !== 2 && action.units !== 3) {
        throw new Error("Invalid water action");
      }
      waterUnits = Math.min(6, waterUnits + action.units);
      break;
    case "wait":
      waterUnits = Math.max(0, waterUnits - 1);
      break;
    default:
      throw new Error("Unknown tree action");
  }

  const treeCondition = conditionFor(waterUnits);
  return {
    state: {
      rulesVersion: TREE_RULES_VERSION,
      tick: state.tick + 1,
      waterUnits,
      treeCondition,
    },
    consequenceId: `tree-${treeCondition}`,
  };
};

export function isTreeAction(action: unknown): action is SimulationAction {
  if (!action || typeof action !== "object") return false;
  const candidate = action as Record<string, unknown>;
  return candidate.kind === "observe" || candidate.kind === "wait" ||
    (candidate.kind === "add-water" &&
      (candidate.units === 1 || candidate.units === 2 || candidate.units === 3));
}
