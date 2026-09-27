import type { MissionDefinition } from "../../../../packages/learning-core/src/index";

export const wiltedTree = {
  contractVersion: 1,
  id: "lw-tree-001",
  contentVersion: "0.1.0",
  ageBands: ["7-9", "10-12"],
  title: { th: "ต้นไม้กำลังบอกอะไรเรา", en: "What is the tree telling us?" },
  openingQuestion: { th: "คิดว่าเกิดอะไรขึ้น?", en: "What do you think happened?" },
  skills: ["observation", "reasoning", "reflection"],
  phases: ["observe", "question", "explore", "build", "act", "consequence", "reflect", "improve"],
  hintMode: "scripted",
} as const satisfies MissionDefinition;
