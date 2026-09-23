import { allLessons, lessonById } from "./curriculum";
import type { Check } from "./checks";
export type Phase = "diagnostic" | "exit" | "retention" | "unit";
export type Attempt = {
  id: string;
  lessonId: string;
  phase: Phase;
  score: number;
  total: number;
  at: number;
  seconds: number;
  seed: number;
  skills: { skill: string; correct: boolean }[];
};
export type Mistake = {
  id: string;
  lessonId: string;
  skill: string;
  prompt: string;
  solution: string;
  reason: string;
  note: string;
  at: number;
  resolved?: number;
};
export type Feedback = {
  id: string;
  lessonId: string;
  video: string;
  rating: number;
  confusion: string;
  at: number;
};
export type RecordState = {
  watched: string[];
  practice: boolean;
  paperChecked: boolean;
  confidence: number;
  notes: string;
};
export type Progress = {
  version: 6;
  participant: string;
  active: string;
  lessons: Record<string, RecordState>;
  attempts: Attempt[];
  mistakes: Mistake[];
  feedback: Feedback[];
  legacyImported?: boolean;
};
export const KEY = "open-functions-v1";
export const uid = () => crypto.randomUUID();
export const blankRecord = (): RecordState => ({
  watched: [],
  practice: false,
  paperChecked: false,
  confidence: 0,
  notes: "",
});
export const fresh = (): Progress => ({
  version: 6,
  participant: uid(),
  active: "u1-l1",
  lessons: {},
  attempts: [],
  mistakes: [],
  feedback: [],
});
const text = (x: unknown, max = 4000) =>
  typeof x === "string" ? x.slice(0, max) : "";
const num = (x: unknown, max = 1e15) =>
  typeof x === "number" && Number.isFinite(x)
    ? Math.max(0, Math.min(max, x))
    : 0;
export function validateState(raw: unknown): Progress {
  if (!raw || typeof raw !== "object" || (raw as Progress).version !== 6)
    throw Error("Choose an Open Functions progress backup.");
  const r = raw as Progress,
    base = fresh();
  base.participant = text(r.participant, 100) || base.participant;
  base.active = lessonById[r.active] ? r.active : base.active;
  for (const l of allLessons) {
    const v = r.lessons?.[l.id];
    if (v && typeof v === "object")
      base.lessons[l.id] = {
        watched: Array.isArray(v.watched)
          ? v.watched.filter((id) => l.videos.some((v) => v.id === id))
          : [],
        practice: v.practice === true,
        paperChecked: v.paperChecked === true,
        confidence: num(v.confidence, 5),
        notes: text(v.notes),
      };
  }
  if (Array.isArray(r.attempts))
    base.attempts = r.attempts
      .slice(-3000)
      .filter(
        (a) =>
          a &&
          typeof a === "object" &&
          (lessonById[a.lessonId] || /^unit-[1-7]$/.test(a.lessonId)) &&
          ["diagnostic", "exit", "retention", "unit"].includes(a.phase) &&
          num(a.total, 200) > 0 &&
          num(a.score) <= num(a.total),
      )
      .map((a) => ({
        ...a,
        id: text(a.id, 100),
        score: num(a.score, 200),
        total: num(a.total, 200),
        at: num(a.at),
        seconds: num(a.seconds, 86400),
        seed: num(a.seed, 1e9),
        skills: Array.isArray(a.skills)
          ? a.skills
              .slice(0, 200)
              .map((s) => ({
                skill: text(s.skill, 120),
                correct: s.correct === true,
              }))
          : [],
      }));
  if (Array.isArray(r.mistakes))
    base.mistakes = r.mistakes
      .slice(-2000)
      .filter((m) => m && lessonById[m.lessonId])
      .map((m) => ({
        id: text(m.id, 100),
        lessonId: m.lessonId,
        skill: text(m.skill, 120),
        prompt: text(m.prompt),
        solution: text(m.solution),
        reason: text(m.reason, 120),
        note: text(m.note),
        at: num(m.at),
        ...(m.resolved ? { resolved: num(m.resolved) } : {}),
      }));
  if (Array.isArray(r.feedback))
    base.feedback = r.feedback
      .slice(-1000)
      .filter((f) => f && lessonById[f.lessonId])
      .map((f) => ({
        id: text(f.id, 100),
        lessonId: f.lessonId,
        video: text(f.video, 300),
        rating: num(f.rating, 5),
        confusion: text(f.confusion),
        at: num(f.at),
      }));
  base.legacyImported = r.legacyImported === true;
  return base;
}
export function loadProgress(): { data: Progress; warning: string } {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) return { data: validateState(JSON.parse(saved)), warning: "" };
    const base = fresh();
    for (const key of [
      "open-functions-v0",
    ]) {
      const old = localStorage.getItem(key);
      if (!old) continue;
      const p = JSON.parse(old);
      base.legacyImported = true;
      if (lessonById[p.activeLessonId]) base.active = p.activeLessonId;
      for (const l of allLessons) {
        const r = p.lessons?.[l.id];
        if (r)
          base.lessons[l.id] = {
            ...blankRecord(),
            practice: r.practiceDone === true,
            notes:
              "Practice history carried over from the earlier site. New checks start separately.",
          };
      }
      break;
    }
    return { data: base, warning: "" };
  } catch {
    return {
      data: fresh(),
      warning:
        "Saved progress could not be read. The previous data has not been deleted. Use a backup to restore it.",
    };
  }
}
export const attemptsFor = (s: Progress, id: string) =>
  s.attempts.filter((a) => a.lessonId === id);
export function status(s: Progress, id: string) {
  const r = s.lessons[id] ?? blankRecord(),
    a = attemptsFor(s, id),
    passed = a.filter((a) => a.phase === "exit" && a.score === a.total);
  const retained = a.some(
    (a) =>
      a.phase === "retention" &&
      a.score === a.total &&
      passed.some((p) => a.at - p.at >= 86400000),
  );
  if (retained && r.paperChecked) return "Retained";
  if (passed.length) return "Check passed";
  if (a.length || r.watched.length || r.practice) return "In progress";
  return "Not started";
}
export function dueFor(s: Progress, id: string, now = Date.now()) {
  const a = attemptsFor(s, id),
    last = a.filter((a) => a.phase === "exit" && a.score === a.total).at(-1);
  return Boolean(
    last &&
      now - last.at >= 86400000 &&
      !a.some(
        (r) =>
          r.phase === "retention" &&
          r.score === r.total &&
          r.at >= last.at + 86400000,
      ),
  );
}
export function recordAttempt(
  s: Progress,
  lessonId: string,
  phase: Phase,
  questions: Check[],
  results: boolean[],
  seconds: number,
  seed: number,
): Progress {
  const at = Date.now(),
    attempt: Attempt = {
      id: uid(),
      lessonId,
      phase,
      at,
      seconds: Math.round(seconds),
      seed,
      score: results.filter(Boolean).length,
      total: questions.length,
      skills: questions.map((q, i) => ({
        skill: q.skill,
        correct: results[i],
      })),
    };
  const misses = questions.flatMap((q, i) =>
    results[i]
      ? []
      : [
          {
            id: uid(),
            lessonId: q.lessonId,
            skill: q.skill,
            prompt: q.prompt,
            solution: q.explanation,
            reason: "Not reviewed",
            note: "",
            at,
          },
        ],
  );
  return {
    ...s,
    attempts: [...s.attempts, attempt].slice(-3000),
    mistakes: [...s.mistakes, ...misses].slice(-2000),
  };
}
export function download(
  name: string,
  value: unknown,
  type = "application/json",
) {
  const blob = new Blob(
      [typeof value === "string" ? value : JSON.stringify(value, null, 2)],
      { type },
    ),
    url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
