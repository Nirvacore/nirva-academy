import assert from "node:assert/strict";
import test from "node:test";
import { initialTreeState, isTreeAction, simulateTree } from "../packages/game-core/src/tree-simulation.ts";

test("the same state and action always have the same result", () => {
  const state = initialTreeState();
  const action = { kind: "add-water", units: 2 };
  const first = simulateTree(state, action);
  assert.deepEqual(first, simulateTree(state, action));
  assert.equal(state.waterUnits, 0);
  assert.equal(first.state.treeCondition, "balanced");
});

test("dry, adequate, excessive water and recovery edges", () => {
  const dry = simulateTree(initialTreeState(), { kind: "add-water", units: 1 });
  assert.equal(dry.consequenceId, "tree-dry");
  const balanced = simulateTree(initialTreeState(), { kind: "add-water", units: 2 });
  assert.equal(balanced.consequenceId, "tree-balanced");
  const excess = simulateTree(initialTreeState(), { kind: "add-water", units: 3 });
  assert.equal(excess.consequenceId, "tree-waterlogged");
  const recovery = simulateTree(excess.state, { kind: "wait" });
  assert.equal(recovery.state.treeCondition, "balanced");
  assert.equal(simulateTree(recovery.state, { kind: "wait" }).state.treeCondition, "dry");
});

test("runtime boundary rejects malformed actions and inconsistent state", () => {
  assert.equal(isTreeAction({ kind: "add-water", units: 9 }), false);
  assert.equal(isTreeAction({ kind: "delete" }), false);
  assert.throws(() => simulateTree(initialTreeState(), { kind: "add-water", units: 9 }), /Invalid water/);
  assert.throws(() => simulateTree({ ...initialTreeState(), treeCondition: "balanced" }, { kind: "observe" }), /Invalid tree state/);
  assert.throws(() => simulateTree(initialTreeState(), { kind: "delete" }), /Unknown tree action/);
});
