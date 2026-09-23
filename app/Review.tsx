import { allLessons, lessonById } from "./curriculum";
import { dueFor, type Progress, type Phase } from "./progress";
export default function Review({
  state,
  update,
  go,
  launch,
}: {
  state: Progress;
  update: (fn: (s: Progress) => Progress) => void;
  go: (s: string) => void;
  launch: (p: Phase, id: string) => void;
}) {
  const pending = state.mistakes.filter((m) => !m.resolved),
    due = allLessons.filter((l) => dueFor(state, l.id));
  return (
    <div className="page-stack">
      <div className="page-heading">
        <span className="eyebrow">TURN MISTAKES INTO A PLAN</span>
        <h1>Your review room.</h1>
        <p>
          Find the missed step, explain the correction, and retry without the
          answer in front of you.
        </p>
      </div>
      <section className="panel">
        <h2>Ready for a delayed check</h2>
        {due.length ? (
          <div className="resource-list">
            {due.map((l) => (
              <button
                className="resource-link"
                key={l.id}
                onClick={() => launch("retention", l.id)}
              >
                <span>
                  <strong>
                    {l.section} · {l.title}
                  </strong>
                  <small>At least 24 hours since a passed exit check</small>
                </span>
                →
              </button>
            ))}
          </div>
        ) : (
          <p className="muted">
            No delayed checks are due. A lesson appears here 24 hours after you
            pass an exit check. You can start any check from its lesson page at
            any time.
          </p>
        )}
      </section>
      <section className="panel">
        <div className="section-title">
          <h2>Errors to understand</h2>
          <span className="tag">{pending.length} open</span>
        </div>
        {pending.length ? (
          pending
            .slice()
            .reverse()
            .map((m) => (
              <details className="error-item" key={m.id}>
                <summary>
                  <span className="error-mark">↺</span>
                  <span>
                    <strong>{m.skill}</strong>
                    <small>{lessonById[m.lessonId]?.title}</small>
                  </span>
                </summary>
                <p>{m.prompt}</p>
                <div className="solution-box">
                  <strong>Work through the correction</strong>
                  <p>{m.solution}</p>
                </div>
                <label>
                  What caused this miss?
                  <select
                    value={m.reason}
                    onChange={(e) =>
                      update((s) => ({
                        ...s,
                        mistakes: s.mistakes.map((x) =>
                          x.id === m.id ? { ...x, reason: e.target.value } : x,
                        ),
                      }))
                    }
                  >
                    {[
                      "Not reviewed",
                      "Concept gap",
                      "Dropped sign or value",
                      "Algebra step",
                      "Misread question",
                      "Notation or restriction",
                      "Ran out of time",
                    ].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Explain what you will do differently
                  <textarea
                    rows={2}
                    value={m.note}
                    maxLength={2000}
                    onChange={(e) =>
                      update((s) => ({
                        ...s,
                        mistakes: s.mistakes.map((x) =>
                          x.id === m.id ? { ...x, note: e.target.value } : x,
                        ),
                      }))
                    }
                  />
                </label>
                <div className="button-row">
                  <button
                    className="button"
                    onClick={() => go("lesson/" + m.lessonId)}
                  >
                    Revisit lesson
                  </button>
                  <button
                    className="button primary"
                    onClick={() => launch("exit", m.lessonId)}
                  >
                    Try another check
                  </button>
                  <button
                    className="text-button"
                    onClick={() =>
                      update((s) => ({
                        ...s,
                        mistakes: s.mistakes.map((x) =>
                          x.id === m.id ? { ...x, resolved: Date.now() } : x,
                        ),
                      }))
                    }
                  >
                    I corrected and redid this ✓
                  </button>
                </div>
              </details>
            ))
        ) : (
          <div className="empty-state">
            <span className="empty-symbol">✓</span>
            <h3>No open errors.</h3>
            <p>
              Missed check questions will appear with their explanations. Start
              a diagnostic to find your next practice target.
            </p>
            <button className="button" onClick={() => go("course")}>
              Choose a lesson
            </button>
          </div>
        )}
        {state.mistakes.some((m) => m.resolved) && (
          <details className="resolved-list">
            <summary>
              {state.mistakes.filter((m) => m.resolved).length} self-reported
              repairs
            </summary>
            {state.mistakes
              .filter((m) => m.resolved)
              .slice(-30)
              .map((m) => (
                <div className="resolved-row" key={m.id}>
                  <span>{m.skill}</span>
                  <button
                    className="text-button"
                    onClick={() =>
                      update((s) => ({
                        ...s,
                        mistakes: s.mistakes.map((x) =>
                          x.id === m.id ? { ...x, resolved: undefined } : x,
                        ),
                      }))
                    }
                  >
                    Reopen
                  </button>
                </div>
              ))}
          </details>
        )}
      </section>
      <section className="panel">
        <h2>The final inspection pass</h2>
        <div className="inspection-grid">
          {[
            "Check every negative sign.",
            "Substitute the entire input in brackets.",
            "Keep the original restrictions.",
            "Check what the question asked.",
          ].map((s, i) => (
            <div key={s}>
              <span>{i + 1}</span>
              {s}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
