"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { type Lesson as LibraryLesson, units, youtube } from "./courseData";
import {
  assessmentPacks,
  courseMilestones,
  methodSources,
  type MasteryLesson,
  type QuizQuestion,
  reviewLibrary,
  saturdayPlan,
  testWeekPlan,
  unit1Lessons,
} from "./masteryData";
import { buildLessonCheck, buildMock } from "./questionEngine";

const STORAGE_KEY = "function-room-mastery-v4";
const PREVIOUS_KEY = "function-room-mastery-v3";
const LEGACY_KEY = "function-room-progress";
const TEST_DATE = new Date(2026, 8, 24, 9, 0, 0);
const DAY = 86400000;

type LessonRecord = {
  watched: string[];
  practiceDone: boolean;
  attempts: number;
  best: number;
  reviewAttempts: number;
  masteredAt?: string;
  reviewDueAt?: string;
  lockedInAt?: string;
};

type ErrorItem = {
  id: string;
  lessonId: string;
  skill: string;
  prompt: string;
  at: string;
};

type TimerState = { mode: "focus" | "break"; endAt: number };

type MasteryState = {
  version: 4;
  activeLessonId: string;
  lessons: Record<string, LessonRecord>;
  mockAttempts: number;
  mockBest: number;
  mockCleanPasses: number;
  mockEndAt?: number;
  errors: ErrorItem[];
  timer?: TimerState;
};

type QuizResult = { score: number; total: number; missed: QuizQuestion[] };
type QuizAnswer = number | string;
type DisplayQuestion = QuizQuestion & { displayChoices: string[]; displayAnswer?: number };

const blankLesson = (): LessonRecord => ({
  watched: [],
  practiceDone: false,
  attempts: 0,
  best: 0,
  reviewAttempts: 0,
});

const blankState = (): MasteryState => ({
  version: 4,
  activeLessonId: unit1Lessons[0].id,
  lessons: Object.fromEntries(unit1Lessons.map((lesson) => [lesson.id, blankLesson()])),
  mockAttempts: 0,
  mockBest: 0,
  mockCleanPasses: 0,
  errors: [],
});

const getRecord = (state: MasteryState, lessonId: string) => state.lessons[lessonId] ?? blankLesson();

function normalizeRecord(value: unknown): LessonRecord {
  const item = value && typeof value === "object" ? (value as Partial<LessonRecord>) : {};
  return {
    watched: Array.isArray(item.watched) ? item.watched.filter((entry): entry is string => typeof entry === "string") : [],
    practiceDone: item.practiceDone === true,
    attempts: Number.isFinite(item.attempts) ? Math.max(0, Number(item.attempts)) : 0,
    best: Number.isFinite(item.best) ? Math.min(100, Math.max(0, Number(item.best))) : 0,
    reviewAttempts: Number.isFinite(item.reviewAttempts) ? Math.max(0, Number(item.reviewAttempts)) : 0,
    ...(typeof item.masteredAt === "string" ? { masteredAt: item.masteredAt } : {}),
    ...(typeof item.reviewDueAt === "string" ? { reviewDueAt: item.reviewDueAt } : {}),
    ...(typeof item.lockedInAt === "string" ? { lockedInAt: item.lockedInAt } : {}),
  };
}

function normalizeState(value: unknown): MasteryState | null {
  if (!value || typeof value !== "object") return null;
  const savedVersion = (value as { version?: number }).version;
  const item = value as Partial<MasteryState>;
  if ((savedVersion !== 3 && savedVersion !== 4) || !item.lessons || typeof item.lessons !== "object") return null;
  const knownIds = new Set(unit1Lessons.map((lesson) => lesson.id));
  const lessons = Object.fromEntries(unit1Lessons.map((lesson) => {
    const record = normalizeRecord(item.lessons?.[lesson.id]);
    if (savedVersion === 4) return [lesson.id, record];
    const { masteredAt: _masteredAt, reviewDueAt: _reviewDueAt, lockedInAt: _lockedInAt, ...preserved } = record;
    return [lesson.id, preserved];
  }));
  const errors = Array.isArray(item.errors)
    ? item.errors.filter(
        (error): error is ErrorItem =>
          Boolean(
            error &&
              typeof error.id === "string" &&
              typeof error.lessonId === "string" &&
              knownIds.has(error.lessonId) &&
              typeof error.skill === "string" &&
              typeof error.prompt === "string" &&
              typeof error.at === "string",
          ),
      )
    : [];
  const timer =
    item.timer &&
    (item.timer.mode === "focus" || item.timer.mode === "break") &&
    Number.isFinite(item.timer.endAt)
      ? { mode: item.timer.mode, endAt: Number(item.timer.endAt) }
      : undefined;
  return {
    version: 4,
    activeLessonId: knownIds.has(item.activeLessonId ?? "") ? String(item.activeLessonId) : unit1Lessons[0].id,
    lessons,
    mockAttempts: Number.isFinite(item.mockAttempts) ? Math.max(0, Number(item.mockAttempts)) : 0,
    mockBest: Number.isFinite(item.mockBest) ? Math.min(100, Math.max(0, Number(item.mockBest))) : 0,
    mockCleanPasses: Number.isFinite(item.mockCleanPasses) ? Math.max(0, Number(item.mockCleanPasses)) : 0,
    ...(Number.isFinite(item.mockEndAt) ? { mockEndAt: Number(item.mockEndAt) } : {}),
    errors,
    ...(timer ? { timer } : {}),
  };
}

function hashText(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  return hash;
}

function prepareQuestions(questions: QuizQuestion[], seed: number): DisplayQuestion[] {
  return questions.map((question, questionIndex) => {
    if (!question.choices || question.answer === undefined) return { ...question, displayChoices: [] };
    const choices = question.choices;
    const answer = question.answer;
    const count = choices.length;
    const shift = (hashText(question.id) + seed * 3 + questionIndex) % count;
    return {
      ...question,
      displayChoices: choices.map((_, index) => choices[(index + shift) % count]),
      displayAnswer: (answer - shift + count) % count,
    };
  });
}

function normalizeTyped(value: string) {
  return value
    .toLowerCase()
    .replaceAll("−", "-")
    .replaceAll("÷", "/")
    .replaceAll(" ", "")
    .replaceAll(";", ",")
    .replace(/^\{(.+)\}$/, "$1")
    .trim();
}

function answerIsCorrect(question: DisplayQuestion, answer: QuizAnswer | undefined) {
  if (question.kind === "input") {
    if (typeof answer !== "string" || !answer.trim()) return false;
    const candidate = normalizeTyped(answer);
    return Boolean(question.accepted?.some((accepted) => normalizeTyped(accepted) === candidate));
  }
  if (question.kind === "explain") {
    if (typeof answer !== "string" || answer.trim().length < (question.minLength ?? 1)) return false;
    const candidate = answer.toLowerCase().replaceAll("−", "-");
    return Boolean(question.requiredGroups?.every((group) => group.some((term) => candidate.includes(term.toLowerCase()))));
  }
  return typeof answer === "number" && answer === question.displayAnswer;
}

function formatCountdown(seconds: number) {
  const safe = Math.max(0, seconds);
  return String(Math.floor(safe / 60)).padStart(2, "0") + ":" + String(safe % 60).padStart(2, "0");
}

function formatReviewTime(value?: string) {
  if (!value) return "";
  return new Date(value).toLocaleString([], { weekday: "short", hour: "numeric", minute: "2-digit" });
}

function InlineQuiz(props: {
  title: string;
  eyebrow: string;
  questions: QuizQuestion[];
  seed: number;
  buttonLabel: string;
  onGrade: (result: QuizResult) => void;
  deadline?: number;
  now?: number;
  onRetry?: () => void;
  onPerfectAction?: () => void;
  perfectActionLabel?: string;
}) {
  const [round, setRound] = useState({ questions: props.questions, seed: props.seed });
  const prepared = useMemo(() => prepareQuestions(round.questions, round.seed), [round]);
  const [answers, setAnswers] = useState<Record<string, QuizAnswer>>({});
  const [graded, setGraded] = useState<{ result: QuizResult; questions: DisplayQuestion[]; answers: Record<string, QuizAnswer> } | null>(null);
  const [message, setMessage] = useState("");
  const submittedRef = useRef(false);

  useEffect(() => {
    setRound({ questions: props.questions, seed: props.seed });
    setAnswers({});
    setGraded(null);
    setMessage("");
    submittedRef.current = false;
  }, [props.title]);

  function submitQuiz(force = false) {
    if (submittedRef.current) return;
    if (!force && prepared.some((question) => answers[question.id] === undefined || answers[question.id] === "")) {
      setMessage("Answer every question before you submit. No lucky gaps.");
      return;
    }
    const missed = prepared
      .filter((question) => !answerIsCorrect(question, answers[question.id]))
      .map(({ displayChoices: _choices, displayAnswer: _answer, ...question }) => question);
    const result = { score: prepared.length - missed.length, total: prepared.length, missed };
    submittedRef.current = true;
    setGraded({ result, questions: prepared, answers: { ...answers } });
    setMessage("");
    props.onGrade(result);
  }

  useEffect(() => {
    if (props.deadline && props.now && props.now >= props.deadline && !graded) submitQuiz(true);
  }, [props.deadline, props.now, graded]);

  function retry() {
    props.onRetry?.();
    setRound({ questions: props.questions, seed: props.seed });
    setAnswers({});
    setGraded(null);
    setMessage("");
    submittedRef.current = false;
    window.setTimeout(() => document.querySelector(".quiz-card")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  function perfectAction() {
    props.onPerfectAction?.();
    setRound({ questions: props.questions, seed: props.seed });
    setAnswers({});
    setGraded(null);
    setMessage("");
    submittedRef.current = false;
    window.setTimeout(() => document.querySelector(".quiz-card")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  const visibleQuestions = graded?.questions ?? prepared;
  const visibleAnswers = graded?.answers ?? answers;
  const perfect = graded?.result.score === graded?.result.total;
  const secondsLeft = props.deadline && props.now ? Math.max(0, Math.ceil((props.deadline - props.now) / 1000)) : null;

  return (
    <section className="quiz-card">
      <div className="section-heading">
        <div><p className="eyebrow">{props.eyebrow}</p><h2>{props.title}</h2></div>
        <span className={"closed-notes " + (secondsLeft !== null && secondsLeft < 300 ? "urgent" : "")}>{secondsLeft === null ? "CLOSED NOTES" : formatCountdown(secondsLeft)}</span>
      </div>
      <p className="quiz-rule">Every item must be correct. Type exact answers, show the full solution on paper, and explain when asked. A miss creates a repair item and a fresh parallel form.</p>
      <div className="question-stack">
        {visibleQuestions.map((question, questionIndex) => {
          const selected = visibleAnswers[question.id];
          const correct = graded ? answerIsCorrect(question, selected) : undefined;
          return (
            <fieldset className={"question " + (graded ? (correct ? "correct" : "incorrect") : "")} key={question.id}>
              <legend><span>{String(questionIndex + 1).padStart(2, "0")}</span><div>{question.prompt}{question.category && <small>{question.category}</small>}</div></legend>
              {question.kind === "input" || question.kind === "explain" ? (
                <div className="typed-answer">
                  {question.kind === "explain" ? (
                    <textarea
                      value={typeof selected === "string" ? selected : ""}
                      disabled={Boolean(graded)}
                      placeholder={question.placeholder}
                      onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
                    />
                  ) : (
                    <input
                      type="text"
                      value={typeof selected === "string" ? selected : ""}
                      disabled={Boolean(graded)}
                      placeholder={question.placeholder}
                      autoComplete="off"
                      onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
                    />
                  )}
                  <small>{question.kind === "explain" ? "Use a complete sentence with the mathematical reason." : "Your paper must show the steps; enter the final answer here."}</small>
                </div>
              ) : (
                <div className="choice-grid">
                  {question.displayChoices.map((choice, choiceIndex) => {
                    const chosen = selected === choiceIndex;
                    const answer = Boolean(graded && question.displayAnswer === choiceIndex);
                    return (
                      <label className={"choice " + (chosen ? "chosen " : "") + (answer ? "answer" : "")} key={question.id + "-" + choiceIndex}>
                        <input
                          type="radio"
                          name={question.id}
                          checked={chosen}
                          disabled={Boolean(graded)}
                          onChange={() => setAnswers((current) => ({ ...current, [question.id]: choiceIndex }))}
                        />
                        <b>{String.fromCharCode(65 + choiceIndex)}</b><span>{choice}</span>
                      </label>
                    );
                  })}
                </div>
              )}
              {graded && <p className="answer-explanation"><strong>{correct ? "Correct." : "Repair this."}</strong> {question.explanation}</p>}
            </fieldset>
          );
        })}
      </div>
      {message && <p className="form-message error">{message}</p>}
      {graded ? (
        <div className={"score-panel " + (perfect ? "pass" : "repair")}>
          <div>
            <span>{perfect ? "MASTERED" : "REPAIR LOOP"}</span>
            <strong>{graded.result.score}/{graded.result.total}</strong>
            <p>{perfect ? "Perfect evidence across recognition, construction, explanation, and transfer. The next gate is open." : "Read the feedback, correct the full solution on paper, then use a fresh parallel form."}</p>
          </div>
          {!perfect && <button className="button dark" type="button" onClick={retry}>Load fresh form</button>}
          {perfect && props.onPerfectAction && <button className="button dark" type="button" onClick={perfectAction}>{props.perfectActionLabel ?? "Continue"}</button>}
        </div>
      ) : (
        <button className="button primary wide" type="button" onClick={() => submitQuiz(false)}>{props.buttonLabel}</button>
      )}
    </section>
  );
}

function FocusTimer(props: {
  timer?: TimerState;
  now: number;
  onStart: (mode: "focus" | "break", minutes: number) => void;
  onStop: () => void;
}) {
  const seconds = props.timer ? Math.ceil((props.timer.endAt - Math.max(props.now, Date.now())) / 1000) : 0;
  const finished = Boolean(props.timer && seconds <= 0);
  return (
    <div className={"focus-timer " + (props.timer?.mode ?? "") + (finished ? " finished" : "")}>
      <div>
        <span>{finished ? "BLOCK COMPLETE" : props.timer ? props.timer.mode.toUpperCase() + " BLOCK" : "FOCUS TIMER"}</span>
        <strong>{props.timer ? formatCountdown(seconds) : "25:00"}</strong>
      </div>
      <div className="timer-actions">
        {props.timer ? (
          <>
            {finished && <button type="button" onClick={() => props.onStart(props.timer?.mode === "focus" ? "break" : "focus", props.timer?.mode === "focus" ? 5 : 25)}>Start {props.timer.mode === "focus" ? "5 min break" : "25 min focus"}</button>}
            <button type="button" onClick={props.onStop}>Reset</button>
          </>
        ) : (
          <><button type="button" onClick={() => props.onStart("focus", 25)}>Start 25</button><button type="button" onClick={() => props.onStart("focus", 50)}>Start 50</button></>
        )}
      </div>
    </div>
  );
}

function LessonWorkspace(props: {
  lesson: MasteryLesson;
  record: LessonRecord;
  onToggleVideo: (videoId: string) => void;
  onPractice: (done: boolean) => void;
  onGrade: (result: QuizResult, mode: "mastery" | "retention") => void;
  onNext: () => void;
}) {
  const [activeVideoId, setActiveVideoId] = useState(props.lesson.videos[0].id);
  const [showAnswers, setShowAnswers] = useState(false);
  const activeVideo = props.lesson.videos.find((video) => video.id === activeVideoId) ?? props.lesson.videos[0];
  const mastered = Boolean(props.record.masteredAt);
  const lockedIn = Boolean(props.record.lockedInAt);

  useEffect(() => {
    setActiveVideoId(props.lesson.videos[0].id);
    setShowAnswers(false);
  }, [props.lesson.id, props.lesson.videos]);

  const masteryQuestions = buildLessonCheck(props.lesson.section, props.record.attempts, "mastery");
  const retentionQuestions = buildLessonCheck(props.lesson.section, props.record.reviewAttempts, "retention");

  return (
    <div className="lesson-workspace">
      <section className="lesson-hero">
        <div>
          <p className="eyebrow">UNIT 1 · LESSON {props.lesson.section}</p>
          <h1>{props.lesson.title}</h1>
          <p>{props.lesson.summary}</p>
          <div className="lesson-meta">
            <span>{props.lesson.taught}</span>
            <span>{props.lesson.duration}</span>
            <span>{props.lesson.videos.length} explanations</span>
          </div>
        </div>
        <div className={"mastery-seal " + (lockedIn ? "locked-in" : mastered ? "mastered" : "learning")}>
          <span>{lockedIn ? "LOCKED IN" : mastered ? "DEMONSTRATED" : "IN PROGRESS"}</span>
          <strong>{lockedIn ? "✓✓" : mastered ? "✓" : props.lesson.section}</strong>
          <small>{props.record.best}% best</small>
        </div>
      </section>

      <div className="stage-strip">
        <div className={props.record.watched.length ? "done" : "active"}><b>1</b><span>Learn</span><small>{props.record.watched.length ? "Video checked" : "Watch actively"}</small></div>
        <div className={props.record.practiceDone ? "done" : props.record.watched.length ? "active" : ""}><b>2</b><span>Practise</span><small>{props.record.practiceDone ? "Paper work done" : "Independent work"}</small></div>
        <div className={mastered ? "done" : "active"}><b>3</b><span>Prove</span><small>{mastered ? "6/6 passed" : "Available anytime"}</small></div>
        <div className={lockedIn ? "done" : "active"}><b>4</b><span>Retain</span><small>{lockedIn ? "Delayed pass" : "Available anytime"}</small></div>
      </div>

      <section className="objective-card">
        <div className="section-heading">
          <div><p className="eyebrow">THE FINISH LINE</p><h2>What you must be able to do</h2></div>
          <span className="objective-count">{props.lesson.objectives.length} objectives</span>
        </div>
        <div className="objective-grid">
          {props.lesson.objectives.map((objective, index) => (
            <div key={objective}><span>{String(index + 1).padStart(2, "0")}</span><p>{objective}</p></div>
          ))}
        </div>
        <p className="pitfall"><strong>Most common mark-killer:</strong> {props.lesson.pitfall}</p>
      </section>

      <section className="video-lab">
        <div className="section-heading">
          <div><p className="eyebrow">STAGE 01 · LEARN</p><h2>Watch with a pencil, not like Netflix</h2></div>
          <span className="video-progress">{props.record.watched.length}/{props.lesson.videos.length} checked</span>
        </div>
        <div className="video-layout">
          <div>
            <div className="video-frame">
              <iframe
                key={activeVideo.id}
                src={"https://www.youtube-nocookie.com/embed/" + activeVideo.id + "?rel=0"}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="now-watching">
              <div><span>{activeVideo.role} · {activeVideo.provider}</span><strong>{activeVideo.title}</strong><p>{activeVideo.note}</p></div>
              <div className="video-actions">
                <a href={youtube(activeVideo.id)} target="_blank" rel="noreferrer">Open on YouTube ↗</a>
                <button
                  className={props.record.watched.includes(activeVideo.id) ? "watched" : ""}
                  type="button"
                  onClick={() => props.onToggleVideo(activeVideo.id)}
                >
                  {props.record.watched.includes(activeVideo.id) ? "✓ Actively watched" : "Mark actively watched"}
                </button>
              </div>
            </div>
          </div>
          <div className="video-playlist">
            <p className="mini-label">CHOOSE YOUR EXPLANATION</p>
            {props.lesson.videos.map((video, index) => (
              <button
                className={(video.id === activeVideo.id ? "active " : "") + (props.record.watched.includes(video.id) ? "complete" : "")}
                key={video.id}
                type="button"
                onClick={() => setActiveVideoId(video.id)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><b>{video.title}</b><small>{video.provider} · {video.role}</small></div>
                <i>{props.record.watched.includes(video.id) ? "✓" : "▶"}</i>
              </button>
            ))}
            <div className="pause-card">
              <span>PAUSE &amp; PROVE</span>
              {props.lesson.pausePrompts.map((prompt) => <p key={prompt}>{prompt}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="practice-card">
        <div className="section-heading">
          <div><p className="eyebrow">STAGE 02 · PRACTISE</p><h2>Now make your own brain do it</h2></div>
          <span className={"status-pill " + (props.record.practiceDone ? "done" : "")}>{props.record.practiceDone ? "DONE" : "OPTIONAL TRACKER"}</span>
        </div>
        <p className="practice-intro">Work the student questions on paper without copying a solution. Circle anything you cannot explain. Check the key only after a real attempt.</p>
        <div className="resource-grid">
          {props.lesson.resources.filter((resource) => resource.kind !== "answers").map((resource) => (
            <a href={resource.url} target="_blank" rel="noreferrer" key={resource.url}>
              <span>{resource.kind.toUpperCase()}</span><strong>{resource.label}</strong><i>↗</i>
            </a>
          ))}
        </div>
        <label className="integrity-check">
          <input type="checkbox" checked={props.record.practiceDone} onChange={(event) => props.onPractice(event.target.checked)} />
          <span><strong>I attempted the assigned questions on paper before checking the answers.</strong>This tracks your work but never locks another part of the site.</span>
        </label>
        <div className="answer-lock">
          <button type="button" onClick={() => setShowAnswers((current) => !current)}>{showAnswers ? "Hide answer keys" : "Reveal answer keys"}</button>
          {showAnswers && <div className="answer-links">
            {props.lesson.resources.filter((resource) => resource.kind === "answers").map((resource) => (
              <a href={resource.url} target="_blank" rel="noreferrer" key={resource.url}>{resource.label} ↗</a>
            ))}
          </div>}
        </div>
      </section>

      <InlineQuiz
        title={props.lesson.section + " mastery check"}
        eyebrow="STAGE 03 · PROVE IT · ALWAYS AVAILABLE"
        questions={masteryQuestions}
        seed={props.record.attempts + 1}
        buttonLabel="Grade my mastery check"
        onGrade={(result) => props.onGrade(result, "mastery")}
      />

      {mastered && !lockedIn && (
        <section className="retention-card">
          <div className="retention-icon">↻</div>
          <div>
            <p className="eyebrow">STAGE 04 · MAKE IT STICK</p>
            <h2>Immediate mastery earned. The recheck is already accessible below.</h2>
            <p>The suggested spaced-review time is {formatReviewTime(props.record.reviewDueAt)}, but the site will never block you.</p>
            <button className="button primary" type="button" onClick={props.onNext}>Continue to the next lesson</button>
          </div>
        </section>
      )}

      {!lockedIn && (
        <InlineQuiz
          title={props.lesson.section + " optional fresh recheck"}
          eyebrow="STAGE 04 · RETRIEVAL · ALWAYS AVAILABLE"
          questions={retentionQuestions}
          seed={props.record.reviewAttempts + 41}
          buttonLabel="Lock this lesson in"
          onGrade={(result) => props.onGrade(result, "retention")}
        />
      )}

      {lockedIn && (
        <section className="locked-in-card">
          <span>✓✓</span>
          <div><p className="eyebrow">LOCKED IN</p><h2>You proved this lesson again after a delay.</h2><p>Keep it alive through the mixed Unit 1 mock and your error log.</p><button className="button primary" type="button" onClick={props.onNext}>Continue</button></div>
        </section>
      )}
    </div>
  );
}

function LibraryWorkspace(props: { unitId: number; lessonIndex: number; onLesson: (index: number) => void }) {
  const unit = units.find((candidate) => candidate.id === props.unitId) ?? units[1];
  const lesson: LibraryLesson = unit.lessons[props.lessonIndex] ?? unit.lessons[0];
  return (
    <div className="library-workspace">
      <section className="library-hero">
        <div><p className="eyebrow">UNIT {String(unit.id).padStart(2, "0")} · VIDEO LIBRARY</p><h1>{unit.title}</h1><p>{unit.description}</p></div>
        <span>UP NEXT</span>
      </section>
      <div className="library-note"><strong>Your current test mission is Unit 1.</strong> This library keeps the rest of MCR3U ready: curated videos first, then Ontario practice and solutions.</div>
      <div className="library-layout">
        <nav className="library-lessons">
          {unit.lessons.map((item, index) => (
            <button className={index === props.lessonIndex ? "active" : ""} type="button" key={item.id} onClick={() => props.onLesson(index)}>
              <span>{item.section}</span><strong>{item.title}</strong><i>▶</i>
            </button>
          ))}
        </nav>
        <article className="library-player">
          <div className="video-frame">
            <iframe
              key={lesson.video}
              src={"https://www.youtube-nocookie.com/embed/" + lesson.video + "?rel=0"}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="eyebrow">{lesson.section} · {lesson.provider}</p><h2>{lesson.title}</h2>
          <div className="library-columns">
            <div><h3>Learn these</h3>{lesson.focus.map((focus) => <p key={focus}>✓ {focus}</p>)}</div>
            <div><h3>Active-watch prompt</h3><p>{lesson.pause}</p><p className="pitfall"><strong>Watch for:</strong> {lesson.pitfall}</p></div>
          </div>
          <div className="resource-grid">
            <a href={youtube(lesson.video)} target="_blank" rel="noreferrer"><span>VIDEO</span><strong>Open on YouTube</strong><i>↗</i></a>
            {lesson.practice.map((resource) => <a href={resource.url} target="_blank" rel="noreferrer" key={resource.url}><span>PRACTICE</span><strong>{resource.label}</strong><i>↗</i></a>)}
            {lesson.solutions?.map((resource) => <a href={resource.url} target="_blank" rel="noreferrer" key={resource.url}><span>ANSWERS</span><strong>{resource.label}</strong><i>↗</i></a>)}
          </div>
        </article>
      </div>
    </div>
  );
}

export default function Home() {
  const [mastery, setMastery] = useState<MasteryState>(blankState);
  const [hydrated, setHydrated] = useState(false);
  const [activeUnitId, setActiveUnitId] = useState(1);
  const [unitOneView, setUnitOneView] = useState<"mission" | "assessment" | "lesson" | "mock">("mission");
  const [libraryLessonIndex, setLibraryLessonIndex] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [syncNote, setSyncNote] = useState("Loading progress…");
  const importRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(PREVIOUS_KEY);
      if (saved) {
        const normalized = normalizeState(JSON.parse(saved));
        if (normalized) setMastery(normalized);
      } else {
        const legacy = localStorage.getItem(LEGACY_KEY);
        if (legacy) {
          const old = JSON.parse(legacy) as Record<string, boolean>;
          setMastery((current) => ({
            ...current,
            lessons: Object.fromEntries(
              unit1Lessons.map((lesson) => [
                lesson.id,
                old[lesson.id] ? { ...blankLesson(), watched: [lesson.videos[0].id] } : blankLesson(),
              ]),
            ),
          }));
        }
      }
    } catch {
      setSyncNote("Storage repaired · new local record");
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mastery));
      setSyncNote("Saved on this device");
    } catch {
      setSyncNote("Progress is open but not saving");
    }
  }, [hydrated, mastery]);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const records = unit1Lessons.map((lesson) => getRecord(mastery, lesson.id));
  const masteredCount = records.filter((record) => record.masteredAt).length;
  const lockedCount = records.filter((record) => record.lockedInAt).length;
  const allMastered = masteredCount === unit1Lessons.length;
  const dueCount = records.filter(
    (record) => record.masteredAt && !record.lockedInAt && record.reviewDueAt && new Date(record.reviewDueAt).getTime() <= now,
  ).length;
  const readiness = Math.min(
    100,
    Math.round((masteredCount / unit1Lessons.length) * 55 + (lockedCount / unit1Lessons.length) * 25 + Math.min(2, mastery.mockCleanPasses) * 10),
  );
  const testReady = allMastered && lockedCount === unit1Lessons.length && mastery.mockCleanPasses >= 2 && mastery.errors.length === 0;
  const currentLessonIndex = Math.max(0, unit1Lessons.findIndex((lesson) => lesson.id === mastery.activeLessonId));
  const currentLesson = unit1Lessons[currentLessonIndex];
  const currentRecord = getRecord(mastery, currentLesson.id);
  const nextLessonIndex = Math.max(0, unit1Lessons.findIndex((lesson) => !getRecord(mastery, lesson.id).masteredAt));
  const nextLesson = allMastered ? null : unit1Lessons[nextLessonIndex];
  const rawDaysToTest = Math.ceil((TEST_DATE.getTime() - now) / DAY);
  const countdownLabel = rawDaysToTest > 0 ? rawDaysToTest + " DAYS" : rawDaysToTest === 0 ? "TEST DAY" : "COMPLETE";
  const testWindowEnded = now > TEST_DATE.getTime() + 16 * 60 * 60 * 1000;

  function updateLesson(lessonId: string, transform: (record: LessonRecord) => LessonRecord) {
    setMastery((current) => ({
      ...current,
      lessons: { ...current.lessons, [lessonId]: transform(getRecord(current, lessonId)) },
    }));
  }

  function chooseLesson(index: number) {
    const lesson = unit1Lessons[index];
    if (!lesson) return;
    setMastery((current) => ({ ...current, activeLessonId: lesson.id }));
    setActiveUnitId(1);
    setUnitOneView("lesson");
    window.setTimeout(() => document.querySelector(".main")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  function nextFromLesson() {
    const index = unit1Lessons.findIndex((lesson) => lesson.id === mastery.activeLessonId);
    if (index < unit1Lessons.length - 1) chooseLesson(index + 1);
    else setUnitOneView("mock");
  }

  function toggleVideo(videoId: string) {
    updateLesson(currentLesson.id, (record) => ({
      ...record,
      watched: record.watched.includes(videoId)
        ? record.watched.filter((candidate) => candidate !== videoId)
        : [...record.watched, videoId],
    }));
  }

  function addErrors(lessonId: string, missed: QuizQuestion[]) {
    if (missed.length === 0) return;
    const timestamp = new Date().toISOString();
    setMastery((current) => {
      const retained = current.errors.filter(
        (error) => !missed.some((question) => error.lessonId === lessonId && error.skill === question.skill),
      );
      const additions = missed.map((question, index) => ({
        id: lessonId + "-" + question.id + "-" + Date.now() + "-" + index,
        lessonId,
        skill: question.skill,
        prompt: question.prompt,
        at: timestamp,
      }));
      return { ...current, errors: [...additions, ...retained].slice(0, 30) };
    });
  }

  function gradeLesson(result: QuizResult, mode: "mastery" | "retention") {
    const percent = Math.round((result.score / result.total) * 100);
    const lessonId = currentLesson.id;
    if (mode === "mastery") {
      updateLesson(lessonId, (record) => ({
        ...record,
        attempts: record.attempts + 1,
        best: Math.max(record.best, percent),
        ...(percent === 100
          ? { masteredAt: new Date().toISOString(), reviewDueAt: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString() }
          : {}),
      }));
    } else {
      updateLesson(lessonId, (record) => ({
        ...record,
        reviewAttempts: record.reviewAttempts + 1,
        best: Math.max(record.best, percent),
        ...(percent === 100 ? { lockedInAt: new Date().toISOString() } : {}),
      }));
    }
    if (percent === 100) {
      setMastery((current) => ({ ...current, errors: current.errors.filter((error) => error.lessonId !== lessonId) }));
    } else addErrors(lessonId, result.missed);
  }

  function gradeMock(result: QuizResult) {
    const percent = Math.round((result.score / result.total) * 100);
    setMastery((current) => {
      return {
        ...current,
        mockAttempts: current.mockAttempts + 1,
        mockBest: Math.max(current.mockBest, percent),
        mockCleanPasses: current.mockCleanPasses + (percent === 100 ? 1 : 0),
        ...(percent === 100 ? { errors: [] } : {}),
      };
    });
    if (percent < 100) {
      result.missed.forEach((question) => {
        const section = question.skill.split(" ")[0];
        const lesson = unit1Lessons.find((candidate) => candidate.section === section);
        if (lesson) addErrors(lesson.id, [question]);
      });
    }
  }

  function startMock() {
    setMastery((current) => ({ ...current, mockEndAt: Date.now() + 40 * 60 * 1000 }));
  }

  function finishMock() {
    setMastery((current) => {
      const { mockEndAt: _mockEndAt, ...rest } = current;
      return rest;
    });
    setUnitOneView("mission");
  }

  function exportProgress() {
    const blob = new Blob([JSON.stringify(mastery, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "function-room-progress-" + new Date().toISOString().slice(0, 10) + ".json";
    anchor.click();
    URL.revokeObjectURL(url);
    setSyncNote("Progress backup downloaded");
  }

  function importProgress(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const normalized = normalizeState(JSON.parse(String(reader.result)));
        if (!normalized) throw new Error("Invalid backup");
        setMastery(normalized);
        setSyncNote("Progress restored from backup");
      } catch {
        setSyncNote("That file is not a Function Room backup");
      }
    };
    reader.readAsText(file);
  }

  const firstUnlockedUnmastered = unit1Lessons.findIndex((lesson) => !getRecord(mastery, lesson.id).masteredAt);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button
          className="brand"
          type="button"
          onClick={() => {
            setActiveUnitId(1);
            setUnitOneView("mission");
            window.setTimeout(() => document.querySelector(".main")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
          }}
        >
          <b>ƒ</b><span>FUNCTION ROOM<small>MCR3U · ONTARIO</small></span>
        </button>

        <div className="test-countdown">
          <span>UNIT 1 TEST</span><strong>{countdownLabel}</strong><small>THU · SEP 24</small>
        </div>

        <p className="sidebar-label">CURRENT MISSION</p>
        <button
          type="button"
          className={"mission-link " + (activeUnitId === 1 && unitOneView === "mission" ? "active" : "")}
          onClick={() => {
            setActiveUnitId(1);
            setUnitOneView("mission");
            window.setTimeout(() => document.querySelector(".main")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
          }}
        >
          <span>⌂</span><div><b>Mission control</b><small>{readiness}% evidence</small></div>
        </button>

        <button
          type="button"
          className={"mission-link " + (activeUnitId === 1 && unitOneView === "assessment" ? "active" : "")}
          onClick={() => {
            setActiveUnitId(1);
            setUnitOneView("assessment");
            window.setTimeout(() => document.querySelector(".main")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
          }}
        >
          <span>◉</span><div><b>Ontario assessment lab</b><small>Real quiz · review · test</small></div>
        </button>

        <nav className="lesson-path" aria-label="Unit 1 mastery path">
          {unit1Lessons.map((lesson, index) => {
            const record = getRecord(mastery, lesson.id);
            const selected = activeUnitId === 1 && unitOneView === "lesson" && mastery.activeLessonId === lesson.id;
            return (
              <button
                type="button"
                className={(selected ? "active " : "") + (record.lockedInAt ? "locked-in" : record.masteredAt ? "mastered" : "")}
                key={lesson.id}
                onClick={() => chooseLesson(index)}
              >
                <span className="path-node">{record.lockedInAt ? "✓✓" : record.masteredAt ? "✓" : lesson.section}</span>
                <div><b>{lesson.title}</b><small>{record.lockedInAt ? "Locked in" : record.masteredAt ? "Mastered · review scheduled" : "Open anytime"}</small></div>
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          className={"mock-link " + (unitOneView === "mock" && activeUnitId === 1 ? "active" : "")}
          onClick={() => {
            setActiveUnitId(1);
            setUnitOneView("mock");
            window.setTimeout(() => document.querySelector(".main")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
          }}
        >
          <span>★</span><div><b>Unit 1 mock test</b><small>{mastery.mockAttempts ? mastery.mockBest + "% best" : "Open anytime"}</small></div>
        </button>

        <details className="future-units">
          <summary>FULL COURSE LIBRARY <span>+</span></summary>
          {units.filter((unit) => unit.id > 1).map((unit) => (
            <button
              type="button"
              className={activeUnitId === unit.id ? "active" : ""}
              key={unit.id}
              onClick={() => {
                setActiveUnitId(unit.id);
                setLibraryLessonIndex(0);
                window.setTimeout(() => document.querySelector(".main")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
              }}
            >
              <span>0{unit.id}</span><b>{unit.title}</b>
            </button>
          ))}
        </details>

        <div className="sidebar-backup">
          <p><span className="save-dot" /> {syncNote}</p>
          <div><button type="button" onClick={exportProgress}>Export</button><button type="button" onClick={() => importRef.current?.click()}>Import</button></div>
          <input
            ref={importRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(event) => {
              importProgress(event.target.files?.[0]);
              event.currentTarget.value = "";
            }}
          />
          <small>Use export/import to move progress between iPad and laptop.</small>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div><span className="live-dot" /><b>{activeUnitId === 1 ? "UNIT 1 · MASTERY MODE" : "UNIT " + activeUnitId + " · VIDEO LIBRARY"}</b></div>
          <FocusTimer
            timer={mastery.timer}
            now={now}
            onStart={(mode, minutes) => setMastery((current) => ({ ...current, timer: { mode, endAt: Date.now() + minutes * 60000 } }))}
            onStop={() => setMastery((current) => {
              const { timer: _timer, ...rest } = current;
              return rest;
            })}
          />
        </header>

        <div className="page-content">
          {activeUnitId === 1 && unitOneView === "mission" && (
            <div className="mission-page">
              <section className="mission-hero">
                <div className="mission-copy">
                  <p className="eyebrow">{testWindowEnded ? "UNIT 1 · RETENTION ARCHIVE" : "SATURDAY · SEPTEMBER 19 · START AT 3:00"}</p>
                  <h1>{testWindowEnded ? <>Keep the skill.<br />Carry it forward.</> : <>Build proof.<br />Walk into Thursday calm.</>}</h1>
                  <p>This room does not count passive watching as learning. Every lesson moves through video, independent practice, a perfect mastery check, and a delayed recheck.</p>
                  <div className="hero-actions">
                    <button
                      className="button primary"
                      type="button"
                      onClick={() => {
                        if (nextLesson) chooseLesson(firstUnlockedUnmastered >= 0 ? firstUnlockedUnmastered : 0);
                        else setUnitOneView("mock");
                      }}
                    >
                      {nextLesson ? "Start " + nextLesson.section + " · " + nextLesson.title : "Open Unit 1 mock"}
                    </button>
                    <button
                      className="button secondary"
                      type="button"
                      onClick={() => setUnitOneView("assessment")}
                    >
                      Open authentic Ontario assessments →
                    </button>
                  </div>
                  <p className="honest-promise"><span>THE STANDARD</span>The site can make gaps impossible to hide. Your test mark still depends on doing the work without notes.</p>
                </div>
                <div className="readiness-card">
                  <div className="readiness-ring" style={{ "--progress": readiness * 3.6 + "deg" } as React.CSSProperties}>
                    <div><strong>{readiness}%</strong><span>READINESS<br />EVIDENCE</span></div>
                  </div>
                  <div className="readiness-stats">
                    <div><strong>{masteredCount}/7</strong><span>mastered</span></div>
                    <div><strong>{lockedCount}/7</strong><span>locked in</span></div>
                    <div><strong>{mastery.mockCleanPasses}/2</strong><span>clean mocks</span></div>
                    <div><strong>{mastery.errors.length}</strong><span>open errors</span></div>
                  </div>
                  <p className={testReady ? "ready" : ""}>{testReady ? "Every readiness gate is passed." : "Test-ready = 7 delayed passes + two 100% unseen mocks + zero open errors."}</p>
                </div>
              </section>

              <section className="next-action">
                <div className="action-number">01</div>
                <div>
                  <p className="eyebrow">DO THIS NEXT</p>
                  <h2>{dueCount > 0 ? dueCount + " delayed recheck" + (dueCount === 1 ? "" : "s") + " due" : nextLesson ? nextLesson.section + " · " + nextLesson.title : "Take the full Unit 1 mock"}</h2>
                  <p>{dueCount > 0 ? "Retrieval after a delay comes before new content. Pass the fresh form without notes." : nextLesson ? nextLesson.summary : "Use the 19 mixed questions as a strict, timed, closed-notes test."}</p>
                </div>
                <button
                  className="button dark"
                  type="button"
                  onClick={() => {
                    const dueIndex = unit1Lessons.findIndex((lesson) => {
                      const record = getRecord(mastery, lesson.id);
                      return Boolean(record.masteredAt && !record.lockedInAt && record.reviewDueAt && new Date(record.reviewDueAt).getTime() <= now);
                    });
                    if (dueIndex >= 0) chooseLesson(dueIndex);
                    else if (nextLesson) chooseLesson(nextLessonIndex);
                    else setUnitOneView("mock");
                  }}
                >
                  Open next action →
                </button>
              </section>

              {!testWindowEnded ? <>
              <section className="schedule-section">
                <div className="section-heading">
                  <div><p className="eyebrow">YOUR 3:00 PM LOCK-IN</p><h2>Saturday execution plan</h2></div>
                  <span className="closed-notes">4.5 HOURS · BREAKS INCLUDED</span>
                </div>
                <div className="schedule-grid">
                  {saturdayPlan.map((block, index) => (
                    <article className={index === 0 ? "highlight" : ""} key={block.time}>
                      <time>{block.time}</time><div><h3>{block.title}</h3><p>{block.detail}</p></div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="calendar-section">
                <div className="section-heading"><div><p className="eyebrow">TEACHER CALENDAR · VERIFIED</p><h2>The road to September 24</h2></div></div>
                <div className="milestone-row">
                  {courseMilestones.map((item) => (
                    <article className={item.status} key={item.date + item.label}><span>{item.date}</span><b>{item.label}</b><small>{item.detail}</small></article>
                  ))}
                </div>
                <div className="week-plan">
                  {testWeekPlan.map((item) => <article key={item.day}><strong>{item.day}</strong><p>{item.task}</p></article>)}
                </div>
              </section>
              </> : (
                <section className="locked-in-card archive-card">
                  <span>↻</span>
                  <div><p className="eyebrow">TEST WINDOW COMPLETE</p><h2>The September 24 plan is archived.</h2><p>Keep using delayed lesson checks and fresh mocks when later units depend on these skills.</p></div>
                </section>
              )}

              {mastery.errors.length > 0 && (
                <section className="error-log">
                  <div className="section-heading"><div><p className="eyebrow">NO HIDDEN GAPS</p><h2>Your repair queue</h2></div><span className="status-pill">{mastery.errors.length} OPEN</span></div>
                  <div className="error-list">
                    {mastery.errors.slice(0, 8).map((error) => {
                      const lessonIndex = unit1Lessons.findIndex((lesson) => lesson.id === error.lessonId);
                      const lesson = unit1Lessons[lessonIndex];
                      return (
                        <button type="button" key={error.id} onClick={() => chooseLesson(lessonIndex)}>
                          <span>{lesson?.section}</span><div><b>{error.skill.replaceAll("-", " ")}</b><small>{error.prompt}</small></div><i>Repair →</i>
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}

              <section className="resources-method">
                <div className="review-bank">
                  <div className="section-heading"><div><p className="eyebrow">ONTARIO PRACTICE BANK</p><h2>Quizzes, reviews, tests</h2></div></div>
                  <div className="review-links">
                    {reviewLibrary.map((resource) => (
                      <a href={resource.url} target="_blank" rel="noreferrer" key={resource.url}><span>{resource.kind}</span><strong>{resource.label}</strong><i>↗</i></a>
                    ))}
                  </div>
                </div>
                <div className="method-card">
                  <p className="eyebrow">WHY THIS METHOD</p><h2>What actually sticks</h2>
                  <ol>
                    <li><b>Retrieve.</b> Solve before looking.</li>
                    <li><b>Repair.</b> Name the exact mistake.</li>
                    <li><b>Space.</b> Return on a later day.</li>
                    <li><b>Mix.</b> Identify the method yourself.</li>
                    <li><b>Explain.</b> Say why each step works.</li>
                  </ol>
                  <p>Education research supports spaced retrieval and worked-example/problem alternation. Student advice repeatedly emphasizes closed-book paper work, explaining steps, and keeping an error log.</p>
                  <div>{methodSources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label} ↗</a>)}</div>
                </div>
              </section>
            </div>
          )}

          {activeUnitId === 1 && unitOneView === "assessment" && (
            <div className="assessment-page">
              <section className="assessment-hero">
                <div>
                  <p className="eyebrow">REAL ONTARIO MCR3U MATERIALS</p>
                  <h1>Assessment lab</h1>
                  <p>These are teacher-made quizzes, review packages, and tests from Ontario course sites. Work on paper or mark them up on your iPad. Keep every answer key closed until the attempt is finished.</p>
                </div>
                <aside>
                  <span>THE RULE</span>
                  <strong>Solve → mark → repair → redo</strong>
                  <small>A score only counts when you can reproduce the corrected solution from a blank page.</small>
                </aside>
              </section>

              <section className="assessment-protocol">
                <div><b>1</b><span>Set the timer</span><small>Closed notes and one sitting.</small></div>
                <div><b>2</b><span>Show the reasoning</span><small>Graphs, restrictions, notation, and units count.</small></div>
                <div><b>3</b><span>Mark in another colour</span><small>Name the exact skill behind each miss.</small></div>
                <div><b>4</b><span>Earn the redo</span><small>Wait, then solve the missed item cleanly.</small></div>
              </section>

              <section className="assessment-list">
                {assessmentPacks.map((pack) => (
                  <article className="assessment-pack" key={pack.step}>
                    <div className="assessment-pack-head">
                      <div><p className="eyebrow">{pack.step}</p><h2>{pack.title}</h2><p>{pack.source}</p></div>
                      <span>{pack.timing}</span>
                    </div>
                    <div className="assessment-pack-body">
                      <div><small>COVERAGE</small><p>{pack.coverage}</p></div>
                      <div><small>HOW TO USE IT</small><p>{pack.instructions}</p></div>
                    </div>
                    <div className="assessment-actions">
                      {pack.links.map((link) => (
                        <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>
                          <span>{link.kind}</span><strong>{link.label}</strong><i>↗</i>
                        </a>
                      ))}
                    </div>
                  </article>
                ))}
              </section>

              <section className="assessment-truth">
                <p className="eyebrow">HONEST LABELS</p>
                <h2>What counts as what</h2>
                <p>The files in this lab are external Ontario teacher materials. The six-part checks inside each lesson and the 40-minute mock are generated by this site so you can get immediate feedback and fresh values. Use both: authentic papers for school-style difficulty, generated forms for fast retrieval and error repair.</p>
              </section>
            </div>
          )}

          {activeUnitId === 1 && unitOneView === "lesson" && (
            <LessonWorkspace
              lesson={currentLesson}
              record={currentRecord}
              onToggleVideo={toggleVideo}
              onPractice={(done) => updateLesson(currentLesson.id, (record) => ({ ...record, practiceDone: done }))}
              onGrade={gradeLesson}
              onNext={nextFromLesson}
            />
          )}

          {activeUnitId === 1 && unitOneView === "mock" && (
            <div className="mock-page">
              <section className="mock-hero">
                <div><p className="eyebrow">FINAL GATE · UNIT 1</p><h1>40-minute unseen mock</h1><p>19 mixed questions across all seven lessons: calculations, construction, explanation, and transfer. The timer auto-submits at zero. Every attempt generates new values.</p></div>
                <div><span>CLEAN FORMS</span><strong>{mastery.mockCleanPasses}/2</strong><small>{mastery.mockBest}% best · {mastery.mockAttempts} attempt{mastery.mockAttempts === 1 ? "" : "s"}</small></div>
              </section>
              {!mastery.mockEndAt ? (
                <section className="mock-start">
                  <div><p className="eyebrow">TEST CONDITIONS · ALWAYS AVAILABLE</p><h2>Paper, pencil, no notes, 40 minutes.</h2><p>Start this whenever you want, even before completing the lessons. Two perfect performances on different generated forms remain the readiness standard, but they never restrict access.</p></div>
                  <button className="button primary" type="button" onClick={startMock}>Start 40-minute form {mastery.mockAttempts + 1}</button>
                </section>
              ) : (
                <InlineQuiz
                  title="Unit 1 mixed mock"
                  eyebrow="19 QUESTIONS · AUTO-SUBMITS"
                  questions={buildMock(mastery.mockAttempts)}
                  seed={mastery.mockAttempts + 101}
                  buttonLabel="Grade my Unit 1 mock"
                  onGrade={gradeMock}
                  deadline={mastery.mockEndAt}
                  now={now}
                  onRetry={startMock}
                  onPerfectAction={mastery.mockCleanPasses >= 2 ? finishMock : startMock}
                  perfectActionLabel={mastery.mockCleanPasses >= 2 ? "Return to mission control" : "Start the second unseen form"}
                />
              )}
            </div>
          )}

          {activeUnitId > 1 && <LibraryWorkspace unitId={activeUnitId} lessonIndex={libraryLessonIndex} onLesson={setLibraryLessonIndex} />}
        </div>
      </main>
    </div>
  );
}
