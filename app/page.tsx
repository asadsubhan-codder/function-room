import { useEffect, useMemo, useRef, useState } from "react";
import { course, allLessons, lessonById, unitFor } from "./curriculum";
import { makeCheck } from "./checks";
import {
  KEY,
  loadProgress,
  recordAttempt,
  status,
  dueFor,
  validateState,
  download,
  uid,
  type Progress,
  type Phase,
} from "./progress";
import { Timer } from "./components";
import { UnitPage, CourseMap, UnitCards, Sources } from "./CourseViews";
import Lesson from "./Lesson";
import Review from "./Review";
import Quiz from "./Quiz";

export default function Home() {
  const initial = useMemo(loadProgress, []),
    [state, SS] = useState(initial.data),
    [route, SR] = useState(() => location.hash.slice(1) || "desk"),
    [menu, SM] = useState(false),
    [query, Q] = useState(""),
    [notice, N] = useState(initial.warning),
    [quiz, SQ] = useState<{
      id: string;
      phase: Phase;
      seed: number;
      key: string;
    } | null>(null);
  const importRef = useRef<HTMLInputElement>(null),
    main = useRef<HTMLElement>(null);
  const saved = useRef(initial.data);
  const update = (fn: (s: Progress) => Progress) => SS(fn);
  useEffect(() => {
    if (saved.current === state) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      saved.current = state;
    } catch {
      N(
        "This browser could not save progress. Export a backup before closing the page.",
      );
    }
  }, [state]);
  useEffect(() => {
    const handler = () => {
      SR(location.hash.slice(1) || "desk");
      SQ(null);
      SM(false);
      window.scrollTo(0, 0);
      setTimeout(() => main.current?.focus(), 0);
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  useEffect(() => {
    if (route.startsWith("lesson/")) {
      const id = route.split("/")[1];
      if (lessonById[id] && state.active !== id)
        update((s) => ({ ...s, active: id }));
    }
    document.title =
      (route.startsWith("lesson/")
        ? lessonById[route.split("/")[1]]?.title + " · "
        : "") + "Open Functions · Ontario Grade 11";
  }, [route]);
  function go(r: string) {
    if (location.hash === "#" + r) {
      SR(r);
      SQ(null);
      SM(false);
    } else location.hash = r;
  }
  function launch(phase: Phase, id: string) {
    SQ({ id, phase, seed: Math.floor(Math.random() * 1000000), key: uid() });
    window.scrollTo(0, 0);
  }
  const pending = state.mistakes.filter((m) => !m.resolved),
    due = allLessons.filter((l) => dueFor(state, l.id)),
    passed = allLessons.filter((l) =>
      ["Retained", "Check passed"].includes(status(state, l.id)),
    ),
    active = lessonById[state.active] ?? allLessons[0],
    activeUnit = unitFor(active.id);
  const questions = useMemo(() => {
    if (!quiz) return [];
    if (quiz.phase !== "unit") return makeCheck(quiz.id, quiz.seed);
    const u = course.find((u) => "unit-" + u.id === quiz.id)!;
    const qs = u.lessons.flatMap((l, i) => {
      const q = makeCheck(l.id, quiz.seed + i);
      return [q[(quiz.seed + i) % q.length], q[(quiz.seed + i + 2) % q.length]];
    });
    for (let i = qs.length - 1; i > 0; i--) {
      const j =
        Math.abs(Math.floor(Math.sin(quiz.seed + i) * 100000)) % (i + 1);
      [qs[i], qs[j]] = [qs[j], qs[i]];
    }
    return qs;
  }, [quiz]);
  const currentLesson = route.startsWith("lesson/")
      ? lessonById[route.split("/")[1]]
      : undefined,
    currentUnit = route.startsWith("unit/")
      ? course.find((u) => String(u.id) === route.split("/")[1])
      : undefined;
  const nav = [
    ["desk", "▦", "My study desk"],
    ["course", "▤", "Course map"],
    ["review", "↺", "Review & errors"],
    ["sources", "ⓘ", "Sources & standards"],
  ];
  async function restore(file: File | undefined) {
    if (!file) return;
    try {
      if (file.size > 5e6) throw Error("Backup is too large. Maximum 5 MB.");
      const next = validateState(JSON.parse(await file.text()));
      download("open-functions-before-import.json", state);
      update(() => next);
      N(
        "Backup restored. A copy of your previous progress was downloaded first.",
      );
    } catch (e) {
      N(e instanceof Error ? e.message : "Could not restore this file.");
    }
    if (importRef.current) importRef.current.value = "";
  }
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          main.current?.focus();
        }}
      >
        Skip to content
      </a>
      <div className="app-shell">
        <aside className={"sidebar " + (menu ? "open" : "")}>
          <button
            className="brand"
            onClick={() => go("desk")}
            aria-label="Open Functions home"
          >
            <span className="brand-mark">ƒ</span>
            <span>
              open<span className="brand-second">functions.</span>
            </span>
          </button>
          <div className="course-badge">
            <span className="eyebrow">ONTARIO GRADE 11</span>
            <strong>
              Functions <span>MCR3U</span>
            </strong>
          </div>
          <nav className="primary-nav" aria-label="Main navigation">
            {nav.map(([id, icon, label]) => (
              <button
                key={id}
                className={
                  route === id ||
                  (id === "course" && (currentLesson || currentUnit))
                    ? "selected"
                    : ""
                }
                aria-current={route === id ? "page" : undefined}
                onClick={() => go(id)}
              >
                <span className="nav-icon" aria-hidden="true">
                  {icon}
                </span>
                {label}
                {id === "review" && pending.length > 0 && (
                  <span className="nav-count">{pending.length}</span>
                )}
              </button>
            ))}
          </nav>
          <div className="sidebar-units">
            <span className="eyebrow">YOUR SEVEN UNITS</span>
            {course.map((u) => (
              <button
                key={u.id}
                className={
                  currentUnit?.id === u.id ||
                  (currentLesson && unitFor(currentLesson.id).id === u.id)
                    ? "active"
                    : ""
                }
                onClick={() => go("unit/" + u.id)}
              >
                <span>{String(u.id).padStart(2, "0")}</span>
                {u.title}
              </button>
            ))}
          </div>
          <div className="sidebar-bottom">
            <div className="sidebar-progress">
              <span>Lesson checks passed</span>
              <strong>
                {passed.length}
                <small> / {allLessons.length}</small>
              </strong>
              <progress
                value={passed.length}
                max={allLessons.length}
                aria-label="Lesson checks passed"
              />
            </div>
            <span className="small sidebar-note">
              Free to learn. Open to everyone.
            </span>
          </div>
        </aside>
        {menu && (
          <button
            className="menu-backdrop"
            onClick={() => SM(false)}
            aria-label="Close navigation"
          />
        )}
        <div className="main-shell">
          <header className="topbar">
            <button
              className="mobile-menu"
              aria-expanded={menu}
              aria-label="Toggle navigation"
              onClick={() => SM(!menu)}
            >
              ☰
            </button>
            <div className="breadcrumbs">
              <span>YOUR ROOM TO LEARN</span>
              <i>/</i>
              <strong>
                {currentLesson
                  ? currentLesson.section
                  : currentUnit
                    ? "Unit " + currentUnit.id
                    : (nav.find((n) => n[0] === route)?.[2] ?? "Course")}
              </strong>
            </div>
            <Timer />
            <div className="save-menu">
              <details>
                <summary aria-label="Progress backup options">
                  Progress <span aria-hidden="true">⌄</span>
                </summary>
                <div className="save-popover">
                  <strong>Saved on this device</strong>
                  <p>Move between devices with a backup.</p>
                  <button
                    onClick={() =>
                      download("open-functions-progress.json", state)
                    }
                  >
                    Export progress ↓
                  </button>
                  <button onClick={() => importRef.current?.click()}>
                    Import progress ↑
                  </button>
                </div>
              </details>
              <input
                className="sr-only"
                ref={importRef}
                type="file"
                accept=".json,application/json"
                onChange={(e) => restore(e.target.files?.[0])}
              />
            </div>
          </header>
          <main id="main-content" ref={main} tabIndex={-1}>
            {notice && (
              <div className="notice" role="status">
                {notice}
                <button aria-label="Dismiss message" onClick={() => N("")}>
                  ×
                </button>
              </div>
            )}
            {quiz ? (
              <div className="quiz-page">
                <button className="text-button" onClick={() => SQ(null)}>
                  ← Back to study
                </button>
                <div className="page-heading">
                  <span className="eyebrow">
                    {quiz.phase === "unit"
                      ? "MIXED UNIT REVIEW"
                      : lessonById[quiz.id].section +
                        " · " +
                        lessonById[quiz.id].title}
                  </span>
                  <h1>
                    {quiz.phase === "diagnostic"
                      ? "Find your starting point."
                      : quiz.phase === "exit"
                        ? "Show what you understand."
                        : quiz.phase === "retention"
                          ? "See what stayed."
                          : "Bring it all together."}
                  </h1>
                  <p>
                    Write the working, check signs and restrictions, and use
                    each result to decide what to practise next.
                  </p>
                </div>
                <Quiz
                  key={quiz.key}
                  title={quiz.phase + " check"}
                  questions={questions}
                  seed={quiz.seed}
                  onFinish={(results, seconds) =>
                    update((s) =>
                      recordAttempt(
                        s,
                        quiz.id,
                        quiz.phase,
                        questions,
                        results,
                        seconds,
                        quiz.seed,
                      ),
                    )
                  }
                  onRetry={() => launch(quiz.phase, quiz.id)}
                />
              </div>
            ) : route === "desk" ? (
              <div className="page-stack">
                <div className="desk-heading">
                  <div>
                    <span className="eyebrow">
                      SMALL STEPS. SOLID UNDERSTANDING.
                    </span>
                    <h1>
                      Your study desk<span className="accent-period">.</span>
                    </h1>
                    <p>
                      Pick a lesson. Work an example. Leave with something you
                      can do.
                    </p>
                  </div>
                  <span className="tag open-tag">All lessons open</span>
                </div>
                <div className="desk-top">
                  <section className="continue-card">
                    <div className="continue-copy">
                      <span className="eyebrow">
                        {state.attempts.length
                          ? "PICK UP WHERE YOU LEFT OFF"
                          : "YOUR NEXT STUDY SESSION"}{" "}
                        · UNIT {activeUnit.id}
                      </span>
                      <h2>{active.title}</h2>
                      <p>{active.focus[0]}</p>
                      <div className="button-row">
                        <button
                          className="button light"
                          onClick={() => go("lesson/" + active.id)}
                        >
                          Open lesson {active.section} <span>→</span>
                        </button>
                        <button
                          className="continue-secondary"
                          onClick={() => launch("diagnostic", active.id)}
                        >
                          Try a quick diagnostic
                        </button>
                      </div>
                    </div>
                    <div className="continue-graph" aria-hidden="true">
                      <svg viewBox="0 0 240 180">
                        <path
                          d="M18 140H224M70 16V164"
                          stroke="currentColor"
                          opacity=".25"
                        />
                        <path
                          d="M22 20Q122 250 222 20"
                          fill="none"
                          stroke="#b9f1d7"
                          strokeWidth="3"
                        />
                        <circle cx="122" cy="135" r="5" fill="#f6d070" />
                        <text x="150" y="62" fill="currentColor" fontSize="23">
                          ƒ(x)
                        </text>
                        <text x="127" y="158" fill="#b9f1d7" fontSize="12">
                          one step at a time
                        </text>
                      </svg>
                    </div>
                  </section>
                  <section className="today-card">
                    <span className="eyebrow">YOUR LEARNING SIGNALS</span>
                    <div>
                      <strong>{passed.length}</strong>
                      <span>lesson checks passed</span>
                    </div>
                    <div>
                      <strong>{due.length}</strong>
                      <span>lessons ready to revisit</span>
                    </div>
                    <div>
                      <strong>{pending.length}</strong>
                      <span>mistakes to work through</span>
                    </div>
                    <button
                      className="text-button"
                      onClick={() => go("review")}
                    >
                      Open your review list →
                    </button>
                  </section>
                </div>
                {state.legacyImported && (
                  <div className="note-line">
                    Earlier practice history is preserved. New checks begin
                    separately, so old scores do not imply you passed the new
                    questions.
                  </div>
                )}
                <section>
                  <div className="section-title">
                    <div>
                      <span className="eyebrow">THE FULL COURSE</span>
                      <h2>Seven units. Your own pace.</h2>
                    </div>
                    <button
                      className="text-button"
                      onClick={() => go("course")}
                    >
                      Browse every lesson →
                    </button>
                  </div>
                  <UnitCards state={state} go={go} />
                </section>
                <div className="desk-bottom">
                  <div>
                    <span className="method-number">01 → 02 → 03</span>
                    <h3>Watch. Work. Check.</h3>
                    <p>
                      Finish with paper practice and revisit tomorrow.
                      Understanding grows through what you can do yourself.
                    </p>
                  </div>
                  <div>
                    <h3>Return to what you missed.</h3>
                    <p>
                      Use the review list to correct errors and revisit skills
                      after a delay.
                    </p>
                    <button className="text-button" onClick={() => go("review")}>
                      Open review & errors →
                    </button>
                  </div>
                </div>
              </div>
            ) : currentLesson ? (
              <Lesson
                key={currentLesson.id}
                lesson={currentLesson}
                state={state}
                update={update}
                onLaunch={launch}
                onNavigate={go}
              />
            ) : currentUnit ? (
              <UnitPage
                unit={currentUnit}
                state={state}
                onNavigate={go}
                onLaunch={launch}
              />
            ) : route === "course" ? (
              <CourseMap state={state} query={query} setQuery={Q} go={go} />
            ) : route === "review" ? (
              <Review state={state} update={update} go={go} launch={launch} />
            ) : route === "sources" ? (
              <Sources />
            ) : (
              <div className="empty-state">
                <h1>Let’s find the right room.</h1>
                <p>This lesson address was not found.</p>
                <button className="button primary" onClick={() => go("course")}>
                  Open the course map
                </button>
              </div>
            )}
          </main>
          <footer className="footer">
            <span>
              open functions. <small>Ontario Grade 11 · MCR3U</small>
            </span>
            <button onClick={() => go("sources")}>
              Sources, credits & privacy
            </button>
            <span className="small muted">
              Learn freely. Progress saves here.
            </span>
          </footer>
        </div>
      </div>
    </>
  );
}
