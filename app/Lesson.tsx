import { useState } from "react";
import { allLessons, unitFor, type CourseLesson } from "./curriculum";
import {
  blankRecord,
  attemptsFor,
  dueFor,
  uid,
  type Progress,
  type Phase,
  type RecordState,
} from "./progress";
import { Status, Resources, External, VideoPlayer } from "./components";
import GraphLab from "./GraphLab";
const tabs = [
  ["watch", "Watch & understand"],
  ["practice", "Paper practice"],
  ["check", "Check understanding"],
] as const;
type LessonTab = (typeof tabs)[number][0];
export default function Lesson({
  lesson,
  state,
  update,
  onLaunch,
  onNavigate,
}: {
  lesson: CourseLesson;
  state: Progress;
  update: (fn: (s: Progress) => Progress) => void;
  onLaunch: (phase: Phase, id: string) => void;
  onNavigate: (r: string) => void;
}) {
  const [tab, T] = useState<LessonTab>("watch"),
    [videoIndex, V] = useState(0),
    [rating, S] = useState(4),
    [confusion, F] = useState(""),
    [feedbackMessage, M] = useState("");
  const r = state.lessons[lesson.id] ?? blankRecord(),
    video = lesson.videos[videoIndex],
    unit = unitFor(lesson.id),
    history = attemptsFor(state, lesson.id),
    baseline = history.find((a) => a.phase === "diagnostic"),
    exit = history.filter((a) => a.phase === "exit").at(-1),
    next = allLessons[allLessons.findIndex((l) => l.id === lesson.id) + 1];
  const setRecord = (patch: Partial<RecordState>) =>
    update((s) => ({
      ...s,
      lessons: {
        ...s.lessons,
        [lesson.id]: { ...(s.lessons[lesson.id] ?? blankRecord()), ...patch },
      },
    }));
  return (
    <div className="page-stack">
      <div className="lesson-heading">
        <div>
          <span className="eyebrow">
            UNIT {unit.id} / LESSON {lesson.section}
          </span>
          <h1>{lesson.title}</h1>
          <p>{lesson.summary}</p>
        </div>
        <Status state={state} id={lesson.id} />
      </div>
      <div className="lesson-split">
        <div className="lesson-body">
          <div className="lesson-tabs" role="tablist" aria-label="Lesson steps">
            {tabs.map(([id, label], i) => (
              <button
                key={id}
                id={"tab-" + id}
                role="tab"
                aria-controls={"panel-" + id}
                tabIndex={tab === id ? 0 : -1}
                aria-selected={tab === id}
                onClick={() => T(id)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    const n = (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                    T(tabs[n][0]);
                    document.getElementById("tab-" + tabs[n][0])?.focus();
                  }
                }}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {label}
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            id={"panel-" + tab}
            aria-labelledby={"tab-" + tab}
          >
            {tab === "watch" && (
              <div className="stack">
                <section className="video-panel">
                  <VideoPlayer key={video.id} video={video} />
                  <div className="video-caption">
                    <div>
                      <span className="eyebrow">
                        {video.provider}
                        {video.duration ? " · " + video.duration : ""}
                      </span>
                      <h2>{video.title}</h2>
                      <p className="small muted">{video.note}</p>
                    </div>
                    <External href={video.url} className="text-button">
                      Open {video.type === "youtube" ? "YouTube" : "source"}
                    </External>
                  </div>
                  <div className="watch-actions">
                    <label className="check-label">
                      <input
                        type="checkbox"
                        checked={r.watched.includes(video.id)}
                        onChange={(e) =>
                          setRecord({
                            watched: e.target.checked
                              ? [...r.watched, video.id]
                              : r.watched.filter((id) => id !== video.id),
                          })
                        }
                      />
                      I worked through this explanation
                    </label>
                    <span className="small muted">Self-reported progress</span>
                  </div>
                </section>
                <section className="panel compact">
                  <h2>Choose the explanation that clicks.</h2>
                  <div className="video-options">
                    {lesson.videos.map((v, i) => (
                      <button
                        className={
                          "video-option " + (i === videoIndex ? "active" : "")
                        }
                        key={v.id}
                        onClick={() => V(i)}
                        aria-pressed={i === videoIndex}
                      >
                        <span className="video-number">
                          {i === videoIndex
                            ? "▶"
                            : String(i + 1).padStart(2, "0")}
                        </span>
                        <span>
                          <strong>{v.title}</strong>
                          <small>
                            {v.provider}
                            {v.duration ? " · " + v.duration : ""}
                          </small>
                        </span>
                        <span className="option-tag">
                          {i === 0
                            ? "Start here"
                            : v.type === "course"
                              ? "Guided lesson"
                              : "Alternative"}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="small muted">
                    You do not need every video. Switch when you still cannot
                    solve an example independently. External players may show
                    ads; the selected lessons are publicly accessible.
                  </p>
                </section>
                <div className="pause-card">
                  <span className="pause-icon" aria-hidden="true">
                    Ⅱ
                  </span>
                  <div>
                    <strong>Pause. Predict. Then press play.</strong>
                    <p>{lesson.pause}</p>
                  </div>
                </div>
                {[
                  "u1-l4",
                  "u1-l5",
                  "u1-l6",
                  "u1-l7",
                  "u2-l8",
                  "u3-l1",
                  "u3-l4",
                  "u4-l4",
                  "u4-l5",
                ].includes(lesson.id) && <GraphLab />}
                <button
                  className="button primary"
                  onClick={() => {
                    T("practice");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Ready to try it on paper →
                </button>
              </div>
            )}
            {tab === "practice" && (
              <div className="stack">
                <section className="panel">
                  <span className="eyebrow">LEARN IT BY DOING IT</span>
                  <h2>Paper first. Answers after.</h2>
                  <p>
                    Work without the example in front of you. Show each step,
                    state restrictions and label diagrams. Mark your attempt,
                    explain every error, then redo it on a clean page.
                  </p>
                  <div className="practice-route">
                    <div>
                      <b>01</b>
                      <span>Start with the matched lesson exercises.</span>
                    </div>
                    <div>
                      <b>02</b>
                      <span>
                        Attempt routine, explanation and application questions.
                      </span>
                    </div>
                    <div>
                      <b>03</b>
                      <span>
                        Check the worked solutions. Rewatch only the part you
                        need.
                      </span>
                    </div>
                  </div>
                  <h3>Waterloo exercises & complete solutions</h3>
                  <p className="small muted">
                    Open the matching lesson and choose{" "}
                    <strong>Practise</strong> for paper questions and solutions;
                    use <strong>Watch</strong> for another explanation.
                  </p>
                  <Resources
                    links={lesson.courseware.map((r) => ({
                      label: r.title + " · Practise",
                      url: r.url,
                    }))}
                  />
                  {lesson.practice.length > 0 && (
                    <>
                      <h3>Ontario teacher worksheets</h3>
                      <Resources links={lesson.practice} />
                    </>
                  )}
                  {lesson.solutions.length > 0 && (
                    <details>
                      <summary>Open the teacher answer keys</summary>
                      <Resources links={lesson.solutions} />
                    </details>
                  )}
                  <div className="check-stack">
                    <label className="check-label">
                      <input
                        type="checkbox"
                        checked={r.practice}
                        onChange={(e) =>
                          setRecord({
                            practice: e.target.checked,
                            paperChecked: e.target.checked
                              ? r.paperChecked
                              : false,
                          })
                        }
                      />
                      I attempted the paper questions without copying.
                    </label>
                    <label className="check-label">
                      <input
                        type="checkbox"
                        checked={r.paperChecked}
                        onChange={(e) =>
                          setRecord({
                            paperChecked: e.target.checked,
                            practice: e.target.checked || r.practice,
                          })
                        }
                      />
                      I checked my work and redid my mistakes independently.
                    </label>
                  </div>
                </section>
                <section className="panel">
                  <h2>Write one thing you want to remember.</h2>
                  <label htmlFor="lesson-note" className="small muted">
                    Private note, saved on this device
                  </label>
                  <textarea
                    id="lesson-note"
                    value={r.notes}
                    onChange={(e) => setRecord({ notes: e.target.value })}
                    rows={4}
                    maxLength={4000}
                    placeholder="What was confusing? What changed? Which step should you check next time?"
                  />
                  <label>
                    Confidence after practice
                    <select
                      value={r.confidence}
                      onChange={(e) =>
                        setRecord({ confidence: Number(e.target.value) })
                      }
                    >
                      <option value={0}>Choose a rating</option>
                      {[
                        "Still lost",
                        "Need help starting",
                        "Can do routine questions",
                        "Can explain most of it",
                        "Can solve and explain unfamiliar questions",
                      ].map((v, i) => (
                        <option value={i + 1} key={v}>
                          {i + 1} — {v}
                        </option>
                      ))}
                    </select>
                  </label>
                </section>
                <button className="button primary" onClick={() => T("check")}>
                  Check my understanding →
                </button>
              </div>
            )}
            {tab === "check" && (
              <div className="stack">
                <section className="panel">
                  <span className="eyebrow">FIND YOUR NEXT STEP</span>
                  <h2>Check now. Remember later.</h2>
                  <p>
                    Use these short checks to locate gaps. Complete the external
                    paper work and a mixed unit review before judging your test
                    readiness.
                  </p>
                  <div className="check-options">
                    <button onClick={() => onLaunch("diagnostic", lesson.id)}>
                      <span className="check-stage">Before</span>
                      <strong>Diagnostic</strong>
                      <span>Find your starting point. About 5–10 minutes.</span>
                      <b>
                        {baseline
                          ? `${Math.round((100 * baseline.score) / baseline.total)}% baseline`
                          : "Start a baseline →"}
                      </b>
                    </button>
                    <button onClick={() => onLaunch("exit", lesson.id)}>
                      <span className="check-stage">After</span>
                      <strong>Exit check</strong>
                      <span>Close your notes and solve a parallel set.</span>
                      <b>
                        {exit
                          ? `${Math.round((100 * exit.score) / exit.total)}% last attempt`
                          : "Try the lesson check →"}
                      </b>
                    </button>
                    <button onClick={() => onLaunch("retention", lesson.id)}>
                      <span className="check-stage">Tomorrow</span>
                      <strong>Retention check</strong>
                      <span>Try again after 24 hours. Available anytime.</span>
                      <b>
                        {dueFor(state, lesson.id)
                          ? "Ready for a revisit →"
                          : "Check what stayed →"}
                      </b>
                    </button>
                  </div>
                  <p className="small muted">
                    “Check passed” means every exit-check item was correct.
                    “Retained” also requires a perfect check at least 24 hours
                    later and your confirmation that you corrected the paper
                    work. These are practice signals, not school grades.
                  </p>
                </section>
                {history.length > 0 && (
                  <section className="panel">
                    <h2>Your attempts</h2>
                    <div className="table-wrap">
                      <table>
                        <thead>
                          <tr>
                            <th>Check</th>
                            <th>Score</th>
                            <th>When</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {history
                            .slice(-8)
                            .reverse()
                            .map((a) => (
                              <tr key={a.id}>
                                <td>{a.phase}</td>
                                <td>
                                  {a.score}/{a.total}
                                </td>
                                <td>{new Date(a.at).toLocaleDateString()}</td>
                                <td>
                                  {Math.floor(a.seconds / 60)}m {a.seconds % 60}
                                  s
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}
                <section className="panel">
                  <h2>Make this lesson better.</h2>
                  <p className="small muted">
                    Optional feedback saves here. Share it by downloading a
                    study report in Project. Please omit personal details.
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      update((s) => ({
                        ...s,
                        feedback: [
                          ...s.feedback,
                          {
                            id: uid(),
                            lessonId: lesson.id,
                            video: video.title,
                            rating,
                            confusion,
                            at: Date.now(),
                          },
                        ],
                      }));
                      M(
                        "Feedback saved on this device. Nothing was sent online.",
                      );
                      F("");
                    }}
                  >
                    <label>
                      How useful was “{video.title}”?
                      <select
                        value={rating}
                        onChange={(e) => S(Number(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5].map((v) => (
                          <option key={v} value={v}>
                            {v} / 5
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      What helped, or what is still confusing?
                      <textarea
                        rows={3}
                        maxLength={2000}
                        value={confusion}
                        onChange={(e) => F(e.target.value)}
                        placeholder="Example: I understand the rule, but the horizontal scale still confuses me."
                      />
                    </label>
                    <button className="button" type="submit">
                      Save feedback
                    </button>
                    {feedbackMessage && (
                      <p className="small green" role="status">
                        {feedbackMessage}
                      </p>
                    )}
                  </form>
                </section>
                {next && (
                  <button
                    className="button primary"
                    onClick={() => onNavigate("lesson/" + next.id)}
                  >
                    Next: {next.title} →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <aside className="lesson-aside">
          <section className="panel">
            <span className="eyebrow">BY THE END, YOU CAN…</span>
            <ul className="objective-list">
              {lesson.focus.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            <div className="pitfall">
              <strong>Catch this mistake</strong>
              <p>{lesson.pitfall}</p>
            </div>
            <button
              className="button full"
              onClick={() => onLaunch("diagnostic", lesson.id)}
            >
              Find my starting point
            </button>
            <p className="small muted">
              Every lesson and resource is open. Follow the route that helps
              you.
            </p>
          </section>
          <section className="panel compact">
            <span className="eyebrow">IN THIS UNIT</span>
            <nav aria-label="Other lessons in unit">
              {unit.lessons.map((l) => (
                <button
                  key={l.id}
                  className={
                    "mini-lesson " + (lesson.id === l.id ? "active" : "")
                  }
                  aria-current={lesson.id === l.id ? "page" : undefined}
                  onClick={() => onNavigate("lesson/" + l.id)}
                >
                  <span>{l.section}</span>
                  {l.title}
                </button>
              ))}
            </nav>
            <button
              className="text-button"
              onClick={() => onNavigate("unit/" + unit.id)}
            >
              Open unit review →
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
}
