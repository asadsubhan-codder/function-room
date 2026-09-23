import { course, allLessons, VERSION, type CourseUnit } from "./curriculum";
import { status, type Progress, type Phase } from "./progress";
import { Resources, Status, External } from "./components";
export function UnitPage({
  unit,
  state,
  onNavigate,
  onLaunch,
}: {
  unit: CourseUnit;
  state: Progress;
  onNavigate: (r: string) => void;
  onLaunch: (p: Phase, id: string) => void;
}) {
  return (
    <div className="page-stack">
      <div className="unit-heading">
        <span className="unit-symbol">{unit.symbol}</span>
        <div>
          <span className="eyebrow">
            UNIT {String(unit.id).padStart(2, "0")} · {unit.lessons.length}{" "}
            LESSONS
          </span>
          <h1>{unit.title}</h1>
          <p>{unit.description}</p>
        </div>
      </div>
      <div className="note-line">
        <strong>Before you begin:</strong> {unit.prerequisites}
      </div>
      <section className="panel">
        <div className="section-title">
          <h2>Your lesson route</h2>
          <span className="small muted">All lessons open</span>
        </div>
        <p className="small muted">{unit.numbering}</p>
        <div className="lesson-list">
          {unit.lessons.map((l, i) => (
            <button
              key={l.id}
              className="lesson-row"
              onClick={() => onNavigate("lesson/" + l.id)}
            >
              <span className="lesson-order">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <strong>{l.title}</strong>
                <small>{l.section} · Videos + guided courseware</small>
              </span>
              <Status state={state} id={l.id} />
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </section>
      <div className="two-columns">
        <section className="panel">
          <span className="eyebrow">CONNECT THE LESSONS</span>
          <h2>Mixed unit check</h2>
          <p>
            Two questions per lesson, mixed together. Use paper and work without
            notes. Allow about {unit.lessons.length * 4} minutes; the focus
            timer is optional.
          </p>
          <button
            className="button primary"
            onClick={() => onLaunch("unit", "unit-" + unit.id)}
          >
            Start mixed check →
          </button>
          <p className="small muted">
            A sampling of skills. For longer applications, graphing and written
            reasoning, complete the teacher review below.
          </p>
        </section>
        <section className="panel">
          <span className="eyebrow">BEFORE THE CLASS TEST</span>
          <h2>Readiness questions</h2>
          <ul className="objective-list">
            {unit.readiness.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="small muted">
            Explain your reasoning aloud, solve unfamiliar questions, and ask
            your teacher about any required topic not yet covered.
          </p>
        </section>
      </div>
      <section className="panel">
        <h2>Teacher review & assessment bank</h2>
        <p>
          Complete questions before opening solutions. Reviews are linked to
          their original creators. A test with no key is labelled; take
          unresolved answers to your teacher.
        </p>
        <Resources links={unit.review} />
      </section>
    </div>
  );
}
export function CourseMap({
  state,
  query,
  setQuery,
  go,
}: {
  state: Progress;
  query: string;
  setQuery: (s: string) => void;
  go: (s: string) => void;
}) {
  const match = (l: (typeof allLessons)[number]) =>
    (l.title + " " + l.section + " " + l.summary)
      .toLowerCase()
      .includes(query.toLowerCase());
  return (
    <div className="page-stack">
      <div className="page-heading">
        <span className="eyebrow">MCR3U · {allLessons.length} LESSONS</span>
        <h1>Find your next lesson.</h1>
        <p>
          Start anywhere. Choose a topic that matches what you are learning;
          lesson numbers can differ between schools.
        </p>
        <label className="search-label">
          <span className="sr-only">Search lessons</span>
          <input
            type="search"
            placeholder="Search a topic, e.g. inverse or sine law"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span aria-hidden="true">⌕</span>
        </label>
      </div>
      {course.map((u) => {
        const lessons = u.lessons.filter(match);
        return lessons.length ? (
          <section className="panel" key={u.id}>
            <div className="section-title">
              <h2>
                <span className="unit-small">{u.id}</span>
                {u.title}
              </h2>
              <button
                className="text-button"
                onClick={() => go("unit/" + u.id)}
              >
                Unit review →
              </button>
            </div>
            <div className="lesson-list">
              {lessons.map((l) => (
                <button
                  key={l.id}
                  className="lesson-row"
                  onClick={() => go("lesson/" + l.id)}
                >
                  <span className="lesson-order">{l.section}</span>
                  <span>
                    <strong>{l.title}</strong>
                    <small>{l.focus[0]}</small>
                  </span>
                  <Status state={state} id={l.id} />
                  <span aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </section>
        ) : null;
      })}
      {!allLessons.some(match) && (
        <div className="empty-state">
          <h2>No matching lesson yet.</h2>
          <p>Try a shorter topic name or clear the search.</p>
          <button className="button" onClick={() => setQuery("")}>
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
export function UnitCards({
  state,
  go,
}: {
  state: Progress;
  go: (s: string) => void;
}) {
  return (
    <div className="unit-grid">
      {course.map((u) => {
        const count = u.lessons.filter((l) =>
          ["Retained", "Check passed"].includes(status(state, l.id)),
        ).length;
        return (
          <button
            className="unit-card"
            key={u.id}
            onClick={() => go("unit/" + u.id)}
          >
            <div className="unit-card-top">
              <span>UNIT {String(u.id).padStart(2, "0")}</span>
              <span aria-hidden="true">↗</span>
            </div>
            <span className="card-formula">{u.symbol}</span>
            <h3>{u.title}</h3>
            <p>{u.lessons.length} lessons · Videos + practice</p>
            <progress
              value={count}
              max={u.lessons.length}
              aria-label={`${u.title} checks passed`}
            />
            <small>
              {count} / {u.lessons.length} checks passed
            </small>
          </button>
        );
      })}
    </div>
  );
}
export function Sources() {
  const sources = [
    [
      "Ontario curriculum",
      "https://www.edu.gov.on.ca/eng/curriculum/secondary/math1112currb.pdf",
      "MCR3U expectations: characteristics of functions, exponential functions, trigonometric functions and discrete functions.",
    ],
    [
      "University of Waterloo CEMC",
      "https://cemc.uwaterloo.ca/resources/courseware/grade-9-10-11-mathematics",
      "Free narrated visual lessons, interactive checks, paper exercises and complete solutions. Topic links are matched to each lesson.",
    ],
    [
      "Ontario teacher video index",
      "https://splash.tdchristian.ca/classes/math/Hagen/11U/index2022.html",
      "Mr Hagen’s public course videos provide complete alternate explanations. Source lesson numbers vary.",
    ],
    [
      "Lourdes MCR3U resources",
      "https://lourdesmath.weebly.com/unit-1---transformation-of-functions.html",
      "Ontario teacher worksheets, review packets and separately linked answer keys.",
    ],
    [
      "IES practice guide",
      "https://ies.ed.gov/ncee/wwc/PracticeGuide/1",
      "Supports spacing, worked examples and retrieval practice. Our app and short checks have not been validated by a study.",
    ],
    [
      "W3C accessibility tutorials",
      "https://www.w3.org/WAI/tutorials/",
      "Semantic structure, labelled controls, keyboard navigation and clear feedback guide the interface.",
    ],
    [
      "Nielsen Norman Group",
      "https://www.nngroup.com/articles/progressive-disclosure/",
      "Keep the main study action easy to find; offer alternate explanations and optional tools when needed.",
    ],
  ];
  return (
    <div className="page-stack">
      <div className="page-heading">
        <span className="eyebrow">OPEN ABOUT THE MATERIAL</span>
        <h1>Sources & standards.</h1>
        <p>
          Free resources selected for course fit, worked examples and a useful
          alternative when the first explanation does not help.
        </p>
      </div>
      <section className="panel">
        <h2>How the course is organized</h2>
        <p>
          Seven units organize Ontario MCR3U topics into a study route. Begin
          with relations, notation, domain and range, parent functions,
          transformations and inverses. These are site lesson numbers;
          your teacher’s order and textbook chapter numbers may differ.
        </p>
        <p>
          Financial mathematics is included within discrete functions. Degrees
          are used throughout Grade 11 trigonometry. Quadratics includes
          completing the square, restricted inverses, radicals, the
          discriminant, families and linear–quadratic systems.
        </p>
        <p>
          This resource is not an official school-board course or a credit.
          Your teacher’s current outline determines what will be assessed.
        </p>
      </section>
      <section className="panel">
        <h2>Instruction and learning design</h2>
        <div className="source-list">
          {sources.map(([title, url, detail]) => (
            <div key={url}>
              <External href={url}>
                <strong>{title}</strong>
              </External>
              <p>{detail}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="panel">
        <h2>What student stories tell us</h2>
        <p>
          In one Ontario discussion, a student reported a 97 in MCR3U and said
          The Organic Chemistry Tutor’s whiteboard explanations helped. Other
          replies emphasized daily questions and cumulative review. That is a
          useful lead for choosing an explanation, not proof that one resource
          causes a particular mark.
        </p>
        <External href="https://www.reddit.com/r/OntarioGrade11s/comments/1j8di14/any_advice_for_grade_11_functions_im_really/">
          Read the original discussion
        </External>
        <p>
          You can switch between visual introductions, Ontario classroom
          examples and Waterloo’s guided lessons. Teaching preferences differ;
          no resource is universally best and no website can guarantee a mark.
        </p>
      </section>
      <section className="panel">
        <h2>Content review & credits</h2>
        <p>
          Links and video metadata were checked for this release ({VERSION}).
          Availability checks cannot guarantee playback in every location or
          that an external resource will remain online. Use the direct source
          link or an alternate explanation if a player fails.
        </p>
        <p>
          Instruction and linked worksheets belong to their creators. Short
          checks are skill samples, not validated assessments. Use your
          teacher’s instructions for graded work.
        </p>
      </section>
      <section className="panel">
        <h2>Your progress & privacy</h2>
        <p>
          Progress, private notes and feedback stay in this browser. They do
          not automatically sync between an iPad and laptop. Export a backup
          and import it on the other device. Clearing browser data can erase
          local progress.
        </p>
        <p>
          No account is required. There is no central analytics collection or
          automatic feedback submission. Google Fonts, YouTube thumbnails,
          played videos and external pages connect to their providers, which
          have their own privacy practices.
        </p>
      </section>
    </div>
  );
}
