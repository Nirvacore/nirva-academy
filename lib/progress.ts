import { normalizeProgressDump } from "@/lib/progress-import";

export const TRACK_KEY = "ai-acadamy:track";
export const DONE_KEY = "ai-acadamy:done";
export const JOURNAL_KEY = "ai-acadamy:journal";
export const CHECKS_KEY = "ai-acadamy:checks";
export const PLAN_KEY = "ai-acadamy:plan";
export const NAME_KEY = "ai-acadamy:name";
export const LEITNER_KEY = "ai-acadamy:leitner";
export const LAST_KEY = "ai-acadamy:last";
export const SECONDS_KEY = "ai-acadamy:seconds";
export const RUBRIC_KEY = "ai-acadamy:rubric";
export const TOUR_KEY = "ai-acadamy:tour";
export const FOCUS_KEY = "ai-acadamy:focus";
export const NOWDO_KEY = "ai-acadamy:nowdo";
export const MEDIA_LAB_KEY = "ai-acadamy:media-lab";
export const PROGRESS_EVENT = "ai-acadamy-progress";

export type PlanId = "intensive" | "evening";

export const PLANS: { id: PlanId; name: string; days: number; pace: string }[] = [
  { id: "intensive", name: "เข้มข้น ๗ วัน", days: 7, pace: "วันละประมาณสองบท รวมแล็บ" },
  { id: "evening", name: "ภาคค่ำ ๔ สัปดาห์", days: 28, pace: "สัปดาห์ละสามถึงสี่บท เหมาะกับงานประจำ" },
];

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown) {
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export function readDone(): string[] {
  return readJson<string[]>(DONE_KEY, []);
}

export function writeDone(ids: string[]) {
  writeJson(DONE_KEY, ids);
}

export function readChecks(): Record<string, number> {
  return readJson<Record<string, number>>(CHECKS_KEY, {});
}

export function writeCheckScore(lessonId: string, score: number) {
  const all = readChecks();
  all[lessonId] = score;
  writeJson(CHECKS_KEY, all);
}

export function readJournal(): Record<string, Record<string, string>> {
  return readJson(JOURNAL_KEY, {});
}

export function readPlan(): PlanId {
  const value = typeof window === "undefined" ? null : window.localStorage.getItem(PLAN_KEY);
  return value === "evening" ? "evening" : "intensive";
}

export function writePlan(id: PlanId) {
  window.localStorage.setItem(PLAN_KEY, id);
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export function readName(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(NAME_KEY) ?? "";
}

export function writeName(name: string) {
  window.localStorage.setItem(NAME_KEY, name);
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export function readLeitner(): Record<string, number> {
  return readJson<Record<string, number>>(LEITNER_KEY, {});
}

export function writeLeitner(map: Record<string, number>) {
  writeJson(LEITNER_KEY, map);
}

export type ProgressDump = {
  v: 1;
  exportedAt: string;
  track: string;
  done: string[];
  journal: Record<string, Record<string, string>>;
  checks: Record<string, number>;
  plan: PlanId;
  name: string;
  leitner: Record<string, number>;
  last?: string;
  seconds?: number;
  rubric?: Record<string, string[]>;
  nowdo?: Record<string, string[]>;
  mediaLab?: unknown;
};

export function exportProgress(): ProgressDump {
  return {
    v: 1,
    exportedAt: new Date().toISOString(),
    track: window.localStorage.getItem(TRACK_KEY) ?? "cursor",
    done: readDone(),
    journal: readJournal(),
    checks: readChecks(),
    plan: readPlan(),
    name: readName(),
    leitner: readLeitner(),
    last: window.localStorage.getItem(LAST_KEY) ?? "",
    seconds: readSeconds(),
    rubric: readJson(RUBRIC_KEY, {}),
    nowdo: readJson(NOWDO_KEY, {}),
    mediaLab: readJson(MEDIA_LAB_KEY, null),
  };
}

export function importProgress(dump: ProgressDump) {
  const safe = normalizeProgressDump(dump);
  window.localStorage.setItem(TRACK_KEY, safe.track);
  writeJson(DONE_KEY, safe.done);
  writeJson(JOURNAL_KEY, safe.journal);
  writeJson(CHECKS_KEY, safe.checks);
  window.localStorage.setItem(PLAN_KEY, safe.plan);
  window.localStorage.setItem(NAME_KEY, safe.name);
  writeJson(LEITNER_KEY, safe.leitner);
  safe.last ? window.localStorage.setItem(LAST_KEY, safe.last) : window.localStorage.removeItem(LAST_KEY);
  window.localStorage.setItem(SECONDS_KEY, String(safe.seconds));
  writeJson(RUBRIC_KEY, safe.rubric);
  writeJson(NOWDO_KEY, safe.nowdo);
  writeJson(MEDIA_LAB_KEY, safe.mediaLab);
}

export function journalFilled(id: string): boolean {
  const entry = readJournal()[id];
  if (!entry) return false;
  return Object.values(entry).some((text) => text.trim().length >= 12);
}

export function readLast(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(LAST_KEY) ?? "";
}

export function writeLast(path: string) {
  if (!path || path === "/") return;
  window.localStorage.setItem(LAST_KEY, path);
}

export function readSeconds(): number {
  if (typeof window === "undefined") return 0;
  return Number(window.localStorage.getItem(SECONDS_KEY) || 0) || 0;
}

export function writeSeconds(value: number) {
  window.localStorage.setItem(SECONDS_KEY, String(Math.max(0, Math.floor(value))));
}

export function readRubric(id: string): string[] {
  return readJson<Record<string, string[]>>(RUBRIC_KEY, {})[id] ?? [];
}

export function writeRubric(id: string, items: string[]) {
  const all = readJson<Record<string, string[]>>(RUBRIC_KEY, {});
  all[id] = items;
  writeJson(RUBRIC_KEY, all);
}

export function tourSeen(): boolean {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(TOUR_KEY) === "1";
}

export function markTourSeen() {
  window.localStorage.setItem(TOUR_KEY, "1");
}

export function readFocus(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(FOCUS_KEY) === "1";
}

export function writeFocus(on: boolean) {
  window.localStorage.setItem(FOCUS_KEY, on ? "1" : "0");
  document.body.classList.toggle("is-focus", on);
}

export function readNowDo(id: string): string[] {
  return readJson<Record<string, string[]>>(NOWDO_KEY, {})[id] ?? [];
}

export function writeNowDo(id: string, items: string[]) {
  const all = readJson<Record<string, string[]>>(NOWDO_KEY, {});
  all[id] = items;
  writeJson(NOWDO_KEY, all);
}
