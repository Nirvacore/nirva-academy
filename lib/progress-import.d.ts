import type { MediaPiece } from "./media-lab-gates";

export const LIMITS: Readonly<{
  array: number;
  fields: number;
  id: number;
  key: number;
  name: number;
  text: number;
  seconds: number;
  leitner: number;
}>;

export type NormalizedProgressDump = {
  v: 1;
  exportedAt: string;
  track: string;
  done: string[];
  journal: Record<string, Record<string, string>>;
  checks: Record<string, number>;
  plan: "intensive" | "evening";
  name: string;
  leitner: Record<string, number>;
  last: string;
  seconds: number;
  rubric: Record<string, string[]>;
  nowdo: Record<string, string[]>;
  mediaLab: MediaPiece;
};

export function normalizeProgressDump(raw: unknown): NormalizedProgressDump;
