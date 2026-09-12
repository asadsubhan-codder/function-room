"use client";

import { useEffect, useMemo, useState } from "react";
import { type Lesson, units, youtube } from "./courseData";

const progressKey = "function-room-progress";

export default function Home() {
  const [activeUnitId, setActiveUnitId] = useState(1);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [syncState, setSyncState] = useState<"loading" | "local">("loading");

  const activeUnit = units.find((unit) => unit.id === activeUnitId) ?? units[0];
  const activeLesson = activeUnit.lessons[activeLessonIndex] ?? activeUnit.lessons[0];
  const totalLessons = useMemo(() => units.reduce((sum, unit) => sum + unit.lessons.length, 0), []);
  const completeCount = useMemo(
    () => units.reduce((sum, unit) => sum + unit.lessons.filter((lesson) => progress[lesson.id]).length, 0),
    [progress],
  );
  const unitComplete = activeUnit.lessons.filter((lesson) => progress[lesson.id]).length;
  const coursePercent = Math.round((completeCount / totalLessons) * 100);
  const unitPercent = Math.round((unitComplete / activeUnit.lessons.length) * 100);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(progressKey);
      if (cached) setProgress(JSON.parse(cached) as Record<string, boolean>);
    } catch {
      // A damaged local cache should never prevent the study path from opening.
    }
    setSyncState("local");
  }, []);

  function saveProgress(next: Record<string, boolean>) {
    setProgress(next);
    try {
      localStorage.setItem(progressKey, JSON.stringify(next));
    } catch {
      // Progress still remains available for this open tab if storage is blocked.
    }
  }

  function chooseUnit(unitId: number) {
    setActiveUnitId(unitId);
    setActiveLessonIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseLesson(index: number) {
    setActiveLessonIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleLesson(lessonId: string) {
    saveProgress({ ...progress, [lessonId]: !progress[lessonId] });
  }

  function toggleReadiness(index: number) {
    const readinessId = "u" + activeUnit.id + "-r" + (index + 1);
    saveProgress({ ...progress, [readinessId]: !progress[readinessId] });
  }

  const statusText = (lesson: Lesson, index: number) => {
    if (progress[lesson.id]) return "COMPLETE";
    if (activeLesson.id === lesson.id) return "NOW PLAYING";
    return "WATCH " + String(index + 1).padStart(2, "0");
  };

  return (
    <div className="study-shell">
      <aside className="sidebar">
        <a className="brand" href="./" aria-label="Function Room home">
          <b className="brand-mark">
            f<span>·</span>
          </b>
          <span>
            function room
            <small>MCR3U / GRADE 11</small>
          </span>
        </a>
        <p className="sidebar-label">YOUR COURSE</p>
        <nav aria-label="Course units">
          {units.map((unit) => {
            const done = unit.lessons.filter((lesson) => progress[lesson.id]).length;
            return (
              <button
                className={"unit-link " + (activeUnit.id === unit.id ? "active" : "")}
                key={unit.id}
                onClick={() => chooseUnit(unit.id)}
              >
                <span className="unit-number">0{unit.id}</span>
                <span className="unit-name">{unit.title}</span>
                <span className="unit-count">
                  {done}/{unit.lessons.length}
                </span>
              </button>
            );
          })}
        </nav>
        <div className="sidebar-foot">
          <small>THE APPROACH</small>
          <p>
            Watch. Work it out.
            <br />
            Make it stick.
          </p>
          <small>Ontario Functions · Nelson 11</small>
        </div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <span>YOUR STUDY SPACE</span>
          <div className="topbar-right">
            <span className={"sync-state " + syncState}>
              <i />
              {syncState === "loading" ? "Loading progress" : "Saved on this browser"}
            </span>
            <span className="course-badge">MCR3U · 2026–27</span>
          </div>
        </header>

        <div className="content">
          <div className="course-progress" aria-label={coursePercent + "% of videos complete"}>
            <span style={{ width: coursePercent + "%" }} />
          </div>

          <div className="unit-heading">
            <div>
              <p className="eyebrow">
                UNIT 0{activeUnit.id} <span className="dot-sep">·</span> {activeUnit.kicker}
              </p>
              <h1>{activeUnit.title}</h1>
              <p className="lead">{activeUnit.description}</p>
              <p className="prereq">
                <strong>Before you start:</strong> {activeUnit.prerequisites}
              </p>
            </div>
            <span className="unit-symbol" aria-hidden="true">
              ƒ(x)
            </span>
          </div>

          <section className="coverage-panel" aria-label="MCR3U coverage">
            <div className="coverage-heading">
              <span className="section-kicker">MCR3U COVERAGE</span>
              <span className="coverage-note">Core path checked against the seven-unit course map</span>
            </div>
            <div className="coverage-pills">
              {activeUnit.coverage.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>

          {activeUnit.id === 1 ? (
            <div className="quiz-strip">
              <strong>Quiz checkpoint</strong>
              <span>Thursday, September 17 · functions and relations, notation, domain and range</span>
              <span className="quiz-tag">1.1–1.3</span>
              <a href={activeUnit.review[2].url} target="_blank" rel="noreferrer">
                Open practice ↗
              </a>
            </div>
          ) : (
            <div className="course-note">
              <span className="note-icon">i</span>
              <span>
                <strong>Watch first, practise second.</strong> Every core video below is tagged with its MCR3U
                section. Use the student worksheet after the video, then return here to mark it complete.
              </span>
              <a href={activeUnit.source.url} target="_blank" rel="noreferrer">
                Open unit bank ↗
              </a>
            </div>
          )}

          <div className="lesson-layout">
            <section className="lesson-main">
              <div className="lesson-meta">
                <span className="section-kicker">
                  {String(activeLessonIndex + 1).padStart(2, "0")} / WATCH &amp; UNDERSTAND
                </span>
                <span className="lesson-status">{progress[activeLesson.id] ? "COMPLETED" : "IN PROGRESS"}</span>
              </div>

              <div className="lesson-title-row">
                <div>
                  <div className="lesson-badges">
                    <span className="section-badge">{activeLesson.section}</span>
                    <span className={"level-badge " + (activeLesson.level === "bridge" ? "bridge" : "")}>
                      {activeLesson.level === "bridge" ? "GRADE 10 BRIDGE" : "MCR3U CORE"}
                    </span>
                  </div>
                  <h2>{activeLesson.title}</h2>
                </div>
              </div>
              <p className="muted">{activeLesson.provider} · Watch first, practise second</p>

              <div className="video-frame">
                <iframe
                  title={activeLesson.title + " video"}
                  src={"https://www.youtube-nocookie.com/embed/" + activeLesson.video}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="video-actions">
                <a className="external-link" href={youtube(activeLesson.video)} target="_blank" rel="noreferrer">
                  Open video on YouTube ↗
                </a>
                <span className="watch-label">Video lesson · pause when prompted</span>
              </div>

              <div className="pause-note">
                <span>Ⅱ</span>
                <div>
                  <strong>Pause before the answer.</strong>
                  <p>{activeLesson.pause}</p>
                </div>
              </div>

              <div className="lesson-columns">
                <div className="objectives">
                  <h3>What you’re learning</h3>
                  <ul>
                    {activeLesson.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="pitfall">
                  <h3>Watch for</h3>
                  <p>{activeLesson.pitfall}</p>
                </div>
              </div>

              <div className="practice-block">
                <div>
                  <p className="section-kicker">02 / PRACTISE AFTER THE VIDEO</p>
                  <h3>Work it out while it’s fresh.</h3>
                  <p className="practice-copy">
                    Close the video and do the student worksheet closed-book. Show every step, mark the questions
                    you miss, then use the answer key and redo those questions from a blank page.
                  </p>
                </div>
                <div className="resource-list">
                  {activeLesson.practice.map((resource) => (
                    <a
                      className="resource-button"
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      key={resource.url}
                    >
                      <span>{resource.label}</span>
                      <b>↗</b>
                    </a>
                  ))}
                  {activeLesson.solutions?.map((resource) => (
                    <a className="solution-link" href={resource.url} target="_blank" rel="noreferrer" key={resource.url}>
                      Answers / worked solutions ↗
                    </a>
                  ))}
                </div>
              </div>

              <button
                className={"complete-button " + (progress[activeLesson.id] ? "done" : "")}
                onClick={() => toggleLesson(activeLesson.id)}
              >
                <span>{progress[activeLesson.id] ? "✓" : "○"}</span>
                {progress[activeLesson.id] ? "Lesson complete" : "Mark lesson complete"}
              </button>
            </section>

            <aside className="path-panel">
              <div className="path-header">
                <div>
                  <p className="eyebrow">YOUR LEARNING PATH</p>
                  <h3>
                    {unitComplete}/{activeUnit.lessons.length} lessons complete
                  </h3>
                </div>
                <span className="unit-progress-ring">{unitPercent}%</span>
              </div>
              <div className="unit-progress">
                <span style={{ width: unitPercent + "%" }} />
              </div>
              <div className="path-list">
                {activeUnit.lessons.map((lesson, index) => (
                  <div
                    className={
                      "path-item " +
                      (activeLesson.id === lesson.id ? "selected " : "") +
                      (progress[lesson.id] ? "complete" : "")
                    }
                    key={lesson.id}
                  >
                    <button className="lesson-select" onClick={() => chooseLesson(index)}>
                      <span className="path-index">
                        {progress[lesson.id] ? "✓" : String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <strong>{lesson.title}</strong>
                        <small>
                          {lesson.section} · {statusText(lesson, index)}
                        </small>
                      </span>
                    </button>
                    <button
                      className="check-button"
                      aria-label={(progress[lesson.id] ? "Unmark " : "Mark ") + lesson.title + " complete"}
                      onClick={() => toggleLesson(lesson.id)}
                    >
                      {progress[lesson.id] ? "✓" : ""}
                    </button>
                  </div>
                ))}
              </div>
              <div className="path-explainer">
                <p>
                  <strong>Finish line</strong>
                </p>
                <p>
                  Complete the lessons, then use the review links below and tick every readiness statement you can
                  do without the video.
                </p>
              </div>
            </aside>
          </div>

          <section className="review-section">
            <div>
              <p className="section-kicker">03 / PROVE YOU’RE READY</p>
              <h2>Review + readiness</h2>
              <p className="muted">
                A unit is finished when you can do the mixed questions, explain your method, and recover from a
                mistake.
              </p>
            </div>
            <div className="review-grid">
              <div className="review-card">
                <h3>Review materials</h3>
                {activeUnit.review.map((resource) => (
                  <a className="review-link" href={resource.url} target="_blank" rel="noreferrer" key={resource.url}>
                    <span>{resource.label}</span>
                    <b>↗</b>
                  </a>
                ))}
              </div>
              <div className="ready-card">
                <h3>Readiness checklist</h3>
                {activeUnit.readiness.map((item, index) => {
                  const readinessId = "u" + activeUnit.id + "-r" + (index + 1);
                  return (
                    <label key={item}>
                      <input
                        type="checkbox"
                        checked={!!progress[readinessId]}
                        onChange={() => toggleReadiness(index)}
                      />
                      <span>{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </section>

          <footer className="site-footer">
            <span>Built for your MCR3U seven-unit course sequence.</span>
            <span>Free video-first resources · worksheets follow the lesson</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
