"use strict";

const { TOOL_TRACKS, migratePiece } = require("./media-lab-gates");

const LIMITS = Object.freeze({
  array: 200,
  fields: 100,
  id: 160,
  key: 160,
  name: 120,
  text: 4000,
  seconds: 31_536_000,
  leitner: 20,
});

function boundedString(value, max) {
  return typeof value === "string" ? value.slice(0, max) : "";
}

function safeKey(value) {
  if (typeof value !== "string" || value.length > LIMITS.key) return "";
  const key = value;
  return /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/.test(key) ? key : "";
}

function stringArray(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value
    .slice(0, LIMITS.array)
    .map((item) => typeof item === "string" && item.length <= LIMITS.id ? item : "")
    .filter(Boolean))];
}

function entries(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return [];
  return Object.entries(value).slice(0, LIMITS.fields);
}

function stringArrayRecord(value) {
  const output = {};
  for (const [rawKey, rawItems] of entries(value)) {
    const key = safeKey(rawKey);
    if (!key || !Array.isArray(rawItems)) continue;
    output[key] = stringArray(rawItems);
  }
  return output;
}

function normalizeProgressDump(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw) || raw.v !== 1) {
    throw new Error("รูปแบบไฟล์ไม่รู้จัก");
  }

  const journal = {};
  for (const [rawLesson, rawRow] of entries(raw.journal)) {
    const lesson = safeKey(rawLesson);
    if (!lesson || !rawRow || typeof rawRow !== "object" || Array.isArray(rawRow)) continue;
    const row = {};
    for (const [rawField, rawText] of entries(rawRow)) {
      const field = safeKey(rawField);
      if (!field || typeof rawText !== "string") continue;
      row[field] = boundedString(rawText, LIMITS.text);
    }
    journal[lesson] = row;
  }

  const checks = {};
  for (const [rawLesson, rawScore] of entries(raw.checks)) {
    const lesson = safeKey(rawLesson);
    if (!lesson || typeof rawScore !== "number" || !Number.isFinite(rawScore)) continue;
    checks[lesson] = Math.min(100, Math.max(0, Math.round(rawScore)));
  }

  const leitner = {};
  for (const [rawCard, rawBox] of entries(raw.leitner)) {
    const card = safeKey(rawCard);
    if (!card || typeof rawBox !== "number" || !Number.isFinite(rawBox)) continue;
    leitner[card] = Math.min(LIMITS.leitner, Math.max(0, Math.floor(rawBox)));
  }

  const track = typeof raw.track === "string" && TOOL_TRACKS.includes(raw.track) ? raw.track : "cursor";
  const last = boundedString(raw.last, LIMITS.id);
  const safeLast = last.startsWith("/") && !last.startsWith("//") && !last.includes("://") ? last : "";
  const seconds = typeof raw.seconds === "number" && Number.isFinite(raw.seconds)
    ? Math.min(LIMITS.seconds, Math.max(0, Math.floor(raw.seconds)))
    : 0;

  return {
    v: 1,
    exportedAt: boundedString(raw.exportedAt, 64),
    track,
    done: stringArray(raw.done),
    journal,
    checks,
    plan: raw.plan === "evening" ? "evening" : "intensive",
    name: boundedString(raw.name, LIMITS.name),
    leitner,
    last: safeLast,
    seconds,
    rubric: stringArrayRecord(raw.rubric),
    nowdo: stringArrayRecord(raw.nowdo),
    mediaLab: migratePiece(raw.mediaLab),
  };
}

module.exports = { LIMITS, normalizeProgressDump };
