import { useMemo, useState, useEffect, useRef } from "react";
import { correct, expected, type Check } from "./checks";
export default function Quiz({
  title,
  questions,
  seed,
  onFinish,
  onRetry,
}: {
  title: string;
  questions: Check[];
  seed: number;
  onFinish: (results: boolean[], seconds: number) => void;
  onRetry: () => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string | number>>({}),
    [results, setResults] = useState<boolean[] | null>(null),
    [index, setIndex] = useState(0);
  const start = useRef(Date.now()),
    finished = useRef(false),
    head = useRef<HTMLHeadingElement>(null);
  const order = useMemo(
    () =>
      questions.map((q, j) =>
        (q.choices ?? [])
          .map((label, original) => ({ label, original }))
          .sort((x, y) => {
            const h = (i: number) =>
              Math.sin((seed + j * 31 + i + 1) * 123.456);
            return h(x.original) - h(y.original);
          }),
      ),
    [questions, seed],
  );
  const q = questions[index];
  useEffect(() => {
    head.current?.focus();
  }, [index, results]);
  function submit() {
    if (finished.current) return;
    finished.current = true;
    const scores = questions.map((q) => correct(q, answers[q.id]));
    setResults(scores);
    onFinish(scores, (Date.now() - start.current) / 1000);
  }
  if (results)
    return (
      <section className="panel quiz-result">
        <span className="eyebrow">YOUR CHECK RESULTS</span>
        <h2 ref={head} tabIndex={-1}>
          {results.filter(Boolean).length} / {questions.length} correct
        </h2>
        <p>
          {results.every(Boolean)
            ? "Good work. Explain the steps on paper, then try again tomorrow to check retention."
            : "Your next step is visible now. Work through the explanations, then try another version."}
        </p>
        <div className="result-rows">
          {questions.map((q, i) => (
            <details
              key={q.id}
              open={!results[i]}
              className={results[i] ? "result-correct" : "result-miss"}
            >
              <summary>
                <span className="result-symbol">{results[i] ? "✓" : "↺"}</span>
                <span>{q.prompt}</span>
              </summary>
              <p>
                <strong>Your answer:</strong>{" "}
                {answers[q.id] === undefined
                  ? "Not answered"
                  : q.choices
                    ? q.choices[Number(answers[q.id])]
                    : answers[q.id]}
              </p>
              <p>
                <strong>Expected:</strong> {expected(q)}
              </p>
              <p>{q.explanation}</p>
              <span className="tag">{q.skill}</span>
            </details>
          ))}
        </div>
        <p className="small muted">
          Missed questions are saved in Review & errors. This is a small skill
          sample, not a prediction of a school test score.
        </p>
        <button className="button primary" onClick={onRetry}>
          Try another version →
        </button>
      </section>
    );
  return (
    <section className="panel quiz">
      <div className="section-title">
        <div>
          <span className="eyebrow">{title.toUpperCase()}</span>
          <h2 ref={head} tabIndex={-1}>
            Question {index + 1} of {questions.length}
          </h2>
        </div>
        <span className="tag">Closed notes</span>
      </div>
      <progress
        value={index + 1}
        max={questions.length}
        aria-label="Question progress"
      />
      <div className="question-prompt">
        <span className="small muted">{q.skill}</span>
        <h3>{q.prompt}</h3>
      </div>
      <fieldset>
        <legend className="sr-only">{q.prompt}</legend>
        {q.choices ? (
          <div className="answer-list">
            {order[index].map(({ label, original }, i) => (
              <label
                key={original}
                className={
                  "answer " + (answers[q.id] === original ? "selected" : "")
                }
              >
                <input
                  type="radio"
                  name={q.id}
                  value={original}
                  checked={answers[q.id] === original}
                  onChange={() => setAnswers({ ...answers, [q.id]: original })}
                />
                <span className="answer-letter">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{label}</span>
              </label>
            ))}
          </div>
        ) : (
          <label>
            Your answer
            <input
              className="numeric-answer"
              value={answers[q.id] ?? ""}
              onChange={(e) =>
                setAnswers({ ...answers, [q.id]: e.target.value })
              }
              autoComplete="off"
              spellCheck={false}
              placeholder={
                q.numeric !== undefined
                  ? "Number or fraction, e.g. -3 or 1/2"
                  : "Use the notation requested"
              }
            />
            <span className="small muted">
              {q.numeric !== undefined
                ? "Fractions and arithmetic such as 1/3 are accepted. Keep full precision unless asked to round."
                : "Use a minus sign for negatives. Spaces and equivalent inequality symbols are accepted."}
            </span>
          </label>
        )}
      </fieldset>
      <div className="quiz-actions">
        <button
          className="button subtle"
          onClick={() => setIndex((i) => i - 1)}
          disabled={index === 0}
        >
          ← Previous
        </button>
        {index < questions.length - 1 ? (
          <button
            className="button primary"
            onClick={() => setIndex((i) => i + 1)}
          >
            Next question →
          </button>
        ) : (
          <button className="button primary" onClick={submit}>
            Check my answers
          </button>
        )}
      </div>
      <div className="question-jumps" aria-label="Jump to a question">
        {questions.map((q, i) => (
          <button
            key={q.id}
            className={
              (i === index ? "current " : "") +
              (answers[q.id] !== undefined && answers[q.id] !== ""
                ? "answered"
                : "")
            }
            aria-label={`Question ${i + 1}${answers[q.id] !== undefined ? ", answered" : ""}`}
            aria-current={i === index ? "step" : undefined}
            onClick={() => setIndex(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <p className="small muted">
        Show your work on paper. You can move freely between questions;
        unanswered items count as incorrect when you finish.
      </p>
    </section>
  );
}
