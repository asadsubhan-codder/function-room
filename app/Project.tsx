import { useRef, useState } from "react";
import { allLessons, lessonById, VERSION } from "./curriculum";
import {
  download,
  pilotReport,
  validateReport,
  type PilotReport,
  type Progress,
} from "./progress";

const pilotGuide = `# Function Room: small pilot guide

Purpose: find which explanations and practice sequences help students and where the site fails them. This is informal product feedback, not a controlled education study.

1. Invite 3–5 willing classmates after your own schoolwork is under control. Participation is optional; do not promise a grade.
2. Ask each person to choose one lesson they have not yet mastered. Give them the site link. They should use their own browser.
3. Before studying, complete its diagnostic closed-notes. Record how confident they feel.
4. Watch one explanation, pausing to work the examples. Complete matching paper practice and mark with the published key.
5. Complete the exit check without notes. The app saves the first baseline and all later attempts separately.
6. Return at least 24 hours later for a retention check. Repeat testing itself can improve scores, so short-term gains do not prove the website caused improvement.
7. Use the lesson feedback form. Do not include names, contact information, school IDs or another person's story. Export the optional study report only after reviewing what it contains, and share the downloaded file directly with the project organizer.
8. Import consenting participants’ files into Project > Pilot results on the organizer's browser. Files stay on that device. Aggregate only comparable course versions. Include sample size, missing follow-ups and limitations when reporting results.
9. Ask a math teacher to review content using the rubric below. Record their permission before quoting feedback publicly.
10. Make one change in response to evidence and record it in the development log. Collect a fresh round of feedback.

Teacher review rubric: curriculum fit; correct worked answers; notation and restrictions; graph accuracy; question difficulty and transfer; accessible language; source attribution. Flag exact lesson, problem and correction. Rate each area Needs repair / Acceptable / Strong. Never claim teacher approval before a real review.

Weekly project rhythm (about 3 hours): 90 minutes learning/verifying content, 45 minutes improvements, 30 minutes observation, 15 minutes reflection. Reuse school study time when possible.

Possible pilot milestones, not current achievements: complete and revise the course; 15–30 meaningful users; a documented teacher review; voluntary outcome data; a public development history; a careful report of observed barriers. Avoid claiming causal effects from a small self-selected group.

Credits: existing educational creators provide linked instruction; original Function Room checks and interface were built with AI assistance. The organizer owns curriculum selection, testing, feedback analysis and revisions. No university, school board or creator endorsement is implied.
`;
export default function Project({ state }: { state: Progress }) {
  const [reports, setReports] = useState<PilotReport[]>(() => {
      try {
        return JSON.parse(
          localStorage.getItem("function-room-pilot") || "[]",
        ).map(validateReport);
      } catch {
        return [];
      }
    }),
    [message, setMessage] = useState(""),
    [consent, setConsent] = useState(false),
    [log, setLog] = useState(() => {
      try {
        return localStorage.getItem("function-room-project-log") || "";
      } catch {
        return "";
      }
    });
  const file = useRef<HTMLInputElement>(null);
  const current = reports.filter((r) => r.courseVersion === VERSION);
  const paired = current.flatMap((r) =>
    allLessons.flatMap((l) => {
      const attempts = r.attempts
          .filter((a) => a.lessonId === l.id)
          .sort((a, b) => a.at - b.at),
        baseline = attempts.find((a) => a.phase === "diagnostic"),
        exit =
          baseline &&
          attempts.find((a) => a.phase === "exit" && a.at > baseline.at);
      return baseline && exit
        ? [
            {
              participant: r.participant,
              lesson: l.title,
              before: (100 * baseline.score) / baseline.total,
              after: (100 * exit.score) / exit.total,
            },
          ]
        : [];
    }),
  );
  const avg = paired.length
    ? paired.reduce((n, p) => n + p.after - p.before, 0) / paired.length
    : null;
  const retention = current.reduce(
    (n, r) =>
      n +
      r.attempts.filter(
        (a) =>
          a.phase === "retention" &&
          r.attempts.some(
            (p) =>
              p.lessonId === a.lessonId &&
              p.phase === "exit" &&
              a.at - p.at >= 86400000,
          ),
      ).length,
    0,
  );
  async function importReports(files: FileList | null) {
    if (!files) return;
    try {
      const incoming = await Promise.all(
        Array.from(files).map(async (f) => {
          if (f.size > 5e6) throw Error("A report is too large. Maximum 5 MB.");
          return validateReport(JSON.parse(await f.text()));
        }),
      );
      const map = new Map(reports.map((r) => [r.participant, r]));
      for (const r of incoming) {
        const old = map.get(r.participant);
        if (!old || r.created >= old.created) map.set(r.participant, r);
      }
      const result = [...map.values()];
      localStorage.setItem("function-room-pilot", JSON.stringify(result));
      setReports(result);
      setMessage(
        `${incoming.length} report(s) imported. Re-importing the same participant replaces an older report instead of counting twice.`,
      );
    } catch (e) {
      setMessage(
        e instanceof Error ? e.message : "Could not import the report.",
      );
    }
    if (file.current) file.current.value = "";
  }
  function exportReport() {
    download("function-room-study-report.json", pilotReport(state));
    setMessage(
      "Downloaded. Nothing was submitted online. Share the file with the organizer only if you choose.",
    );
  }
  const feedback = current.flatMap((r) => r.feedback);
  return (
    <div className="page-stack">
      <div className="page-heading">
        <span className="eyebrow">THE STUDENT PROJECT</span>
        <h1>
          Build it. Test it.
          <br />
          <em>Make it more useful.</em>
        </h1>
        <p>
          Function Room helps Ontario students recover the concepts they missed.
          Its impact starts with real people using it and honest feedback.
        </p>
      </div>
      <div className="project-banner">
        <span className="tag">Pilot stage</span>
        <h2>Help a few students well.</h2>
        <p>
          The first milestone is a useful lesson tested with 3–5 willing
          classmates. There are no published outcome claims or teacher
          endorsements yet.
        </p>
        <button
          className="button primary"
          onClick={() =>
            download(
              "function-room-pilot-guide.md",
              pilotGuide,
              "text/markdown",
            )
          }
        >
          Download the pilot & teacher review guide ↓
        </button>
      </div>
      <div className="two-columns">
        <section className="panel">
          <span className="eyebrow">FOR PARTICIPANTS</span>
          <h2>Your results, your choice.</h2>
          <p>
            Use a diagnostic before studying, an exit check afterward, and a
            retention check the next day. Feedback is optional.
          </p>
          <details>
            <summary>What is included in a study report?</summary>
            <p>
              A random participant code, course version, question scores and
              skill results, attempt dates and durations, and feedback you
              typed. It excludes your private notes and error reflections. No
              name, email, or school ID is requested. Free-text feedback can
              still identify you if you include personal details.
            </p>
          </details>
          <label className="check-label">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            I have reviewed this and want to download my report for optional
            sharing.
          </label>
          <button
            className="button primary"
            disabled={!consent}
            onClick={exportReport}
          >
            Download my study report
          </button>
          <p className="small muted">
            There is no automatic submission. The organizer receives it only if
            you share the file.
          </p>
        </section>
        <section className="panel">
          <span className="eyebrow">FOR THE ORGANIZER</span>
          <h2>Pilot results</h2>
          <p>
            Import reports that participants choose to share. Your imported
            collection stays in this browser.
          </p>
          <input
            ref={file}
            className="sr-only"
            type="file"
            accept=".json,application/json"
            multiple
            onChange={(e) => importReports(e.target.files)}
          />
          <button className="button" onClick={() => file.current?.click()}>
            Import study reports
          </button>
          <div className="pilot-stats">
            <div>
              <strong>{current.length}</strong>
              <span>participants</span>
            </div>
            <div>
              <strong>{paired.length}</strong>
              <span>paired lessons</span>
            </div>
            <div>
              <strong>
                {avg === null ? "—" : `${avg >= 0 ? "+" : ""}${avg.toFixed(1)}`}
              </strong>
              <span>mean change, points</span>
            </div>
          </div>
          <p className="small muted">
            First diagnostic compared with first subsequent exit check per
            participant/lesson. {retention} delayed check(s).{" "}
            {reports.length - current.length} report(s) from other course
            versions excluded.
          </p>
          <p className="small muted">
            A small voluntary sample, repeated practice and different question
            forms limit interpretation. Score changes do not establish that the
            site caused improvement.
          </p>
          {reports.length > 0 && (
            <div className="button-row">
              <button
                className="text-button"
                onClick={() =>
                  download("function-room-pilot-results.json", {
                    courseVersion: VERSION,
                    participants: current.length,
                    pairedLessons: paired,
                    delayedChecks: retention,
                    feedback,
                  })
                }
              >
                Export analysis
              </button>
              <button
                className="text-button"
                onClick={() => {
                  if (
                    window.confirm(
                      "Clear imported pilot reports from this browser? Export first if you need a backup.",
                    )
                  ) {
                    setReports([]);
                    localStorage.removeItem("function-room-pilot");
                  }
                }}
              >
                Clear imported collection
              </button>
            </div>
          )}
        </section>
      </div>
      {message && (
        <p className="notice" role="status">
          {message}
        </p>
      )}
      {feedback.length > 0 && (
        <section className="panel">
          <h2>Participant feedback</h2>
          {feedback.map((f, i) => (
            <div className="feedback-item" key={f.id + i}>
              <strong>
                {lessonById[f.lessonId]?.title} · {f.rating}/5
              </strong>
              <p>{f.video}</p>
              <p>{f.confusion || "No written feedback."}</p>
            </div>
          ))}
        </section>
      )}
      <section className="panel">
        <span className="eyebrow">DOCUMENT THE WORK</span>
        <h2>Private project journal</h2>
        <p>
          Record the problem, what you changed, the evidence you used, and what
          you will test next. Keep other students’ identities out of it.
        </p>
        <label className="sr-only" htmlFor="project-journal">
          Project journal
        </label>
        <textarea
          id="project-journal"
          rows={7}
          value={log}
          onChange={(e) => {
            setLog(e.target.value);
            try {
              localStorage.setItem("function-room-project-log", e.target.value);
            } catch {
              setMessage("Journal could not save. Download a copy.");
            }
          }}
          placeholder="Date / Lesson / Problem observed / Change made / Evidence / Next check"
        />
        <button
          className="button"
          onClick={() =>
            download("function-room-project-journal.md", log, "text/markdown")
          }
        >
          Download journal
        </button>
      </section>
      <section className="panel">
        <span className="eyebrow">PUBLIC DEVELOPMENT LOG</span>
        <h2>What changed</h2>
        <div className="timeline-item">
          <time dateTime="2026-09-22">22 Sep 2026</time>
          <div>
            <strong>Full-course pilot release</strong>
            <p>
              58 lessons across seven units; free video alternatives, linked
              Ontario worksheets and CEMC exercises, lesson checks, error
              reflections, delayed review, progress backups, and voluntary pilot
              reporting.
            </p>
            <p className="small muted">
              AI-assisted interface and original checks. Classroom validation
              and teacher review are the next milestones.
            </p>
          </div>
        </div>
        <a
          className="inline-link"
          href="https://github.com/asadsubhan-codder/function-room/commits/main/"
          target="_blank"
          rel="noreferrer"
        >
          See the public change history ↗
        </a>
      </section>
    </div>
  );
}
