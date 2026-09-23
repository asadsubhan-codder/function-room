import { useState, useId } from "react";
type Shape =
  | "quadratic"
  | "linear"
  | "root"
  | "reciprocal"
  | "absolute"
  | "exponential";
const names: Record<Shape, string> = {
  linear: "x",
  quadratic: "x²",
  root: "√x",
  reciprocal: "1/x",
  absolute: "|x|",
  exponential: "2ˣ",
};
const val = (t: Shape, x: number) =>
  t === "quadratic"
    ? x * x
    : t === "linear"
      ? x
      : t === "root"
        ? x < 0
          ? NaN
          : Math.sqrt(x)
        : t === "reciprocal"
          ? Math.abs(x) < 0.001
            ? NaN
            : 1 / x
          : t === "absolute"
            ? Math.abs(x)
            : 2 ** x;
const fmt = (n: number) => Number(n.toFixed(2)).toString();
export default function GraphLab() {
  const [shape, setShape] = useState<Shape>("quadratic"),
    [a, A] = useState(1),
    [k, K] = useState(1),
    [d, D] = useState(0),
    [c, C] = useState(0),
    [inverse, I] = useState(false);
  const clip = useId().replace(/:/g, "");
  const coords = (x: number, y: number) => [250 + x * 23, 200 - y * 23];
  const path = (transformed: boolean, swap = false) => {
    let out = "",
      last: number[] | null = null;
    for (let i = 0; i <= 1400; i++) {
      const x = -10 + i / 70,
        y = transformed ? a * val(shape, k * (x - d)) + c : val(shape, x),
        p = swap ? coords(y, x) : coords(x, y);
      if (
        !Number.isFinite(y) ||
        Math.abs(y) > 30 ||
        (last && Math.abs(p[1] - last[1]) > 150) ||
        (last && Math.abs(p[0] - last[0]) > 150)
      ) {
        last = null;
        continue;
      }
      out += (last ? "L" : "M") + p.map(fmt).join(",");
      last = p;
    }
    return out;
  };
  const pts =
    shape === "root"
      ? [0, 1, 4]
      : shape === "reciprocal"
        ? [-2, -1, 1, 2]
        : [-1, 0, 1];
  const domain =
    shape === "root"
      ? `x ${k > 0 ? "≥" : "≤"} ${d}`
      : shape === "reciprocal"
        ? `x ≠ ${d}`
        : "all real x";
  const range =
    shape === "quadratic" || shape === "root" || shape === "absolute"
      ? `y ${a > 0 ? "≥" : "≤"} ${c}`
      : shape === "exponential"
        ? `y ${a > 0 ? ">" : "<"} ${c}`
        : shape === "reciprocal"
          ? `y ≠ ${c}`
          : "all real y";
  return (
    <section className="panel graph-lab">
      <div className="section-title">
        <div>
          <span className="eyebrow">EXPLORE THE RULE</span>
          <h2>Move one thing. See what changes.</h2>
        </div>
        <span className="tag">Interactive</span>
      </div>
      <div className="graph-layout">
        <div>
          <svg
            viewBox="0 0 500 400"
            role="img"
            aria-label={`Graph of parent ${names[shape]} and transformed function. Domain ${domain}; range ${range}.`}
          >
            <defs>
              <clipPath id={clip}>
                <rect x="20" y="15" width="460" height="365" />
              </clipPath>
            </defs>
            <g className="grid-lines">
              {Array.from({ length: 21 }, (_, i) => i - 10).map((n) => (
                <g key={n}>
                  <line x1={250 + n * 23} x2={250 + n * 23} y1="15" y2="380" />
                  <line x1="20" x2="480" y1={200 + n * 23} y2={200 + n * 23} />
                </g>
              ))}
            </g>
            <g className="axis-lines">
              <line x1="20" x2="480" y1="200" y2="200" />
              <line x1="250" x2="250" y1="15" y2="380" />
            </g>
            <g className="axis-labels">
              {[-8, -4, 4, 8].map((n) => (
                <text key={n} x={250 + n * 23} y="218" textAnchor="middle">
                  {n}
                </text>
              ))}
              {[-6, -3, 3, 6].map((n) => (
                <text key={n} x="239" y={204 - n * 23} textAnchor="end">
                  {n}
                </text>
              ))}
              <text x="480" y="195">
                x
              </text>
              <text x="258" y="22">
                y
              </text>
            </g>
            <g clipPath={`url(#${clip})`} fill="none">
              <path
                d={path(false)}
                stroke="#a5adb8"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
              <path d={path(true)} stroke="#147c66" strokeWidth="3" />
              {inverse && (
                <>
                  <line
                    x1="20"
                    y1="430"
                    x2="480"
                    y2="-30"
                    stroke="#d99d22"
                    strokeDasharray="6 6"
                  />
                  <path
                    d={path(true, true)}
                    stroke="#6f4cbb"
                    strokeWidth="2.5"
                  />
                </>
              )}
              {pts.map((x) => {
                const y = val(shape, x),
                  [cx, cy] = coords(x / k + d, a * y + c);
                return (
                  <circle
                    key={x}
                    cx={cx}
                    cy={cy}
                    r="4"
                    fill="#147c66"
                    stroke="white"
                    strokeWidth="2"
                  />
                );
              })}
            </g>
          </svg>
          <div className="graph-legend">
            <span>┄ Parent</span>
            <span className="green">━ Transformed</span>
            {inverse && <span className="purple">━ Inverse relation</span>}
          </div>
        </div>
        <div className="graph-settings">
          <label>
            Parent function
            <select
              value={shape}
              onChange={(e) => setShape(e.target.value as Shape)}
            >
              {Object.entries(names).map(([id, n]) => (
                <option key={id} value={id}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <div className="two-fields">
            <label>
              Vertical factor a
              <select value={a} onChange={(e) => A(Number(e.target.value))}>
                {[-3, -2, -1, -0.5, 0.5, 1, 2, 3].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <label>
              Inside factor k
              <select value={k} onChange={(e) => K(Number(e.target.value))}>
                {[-3, -2, -1, -0.5, 0.5, 1, 2, 3].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Horizontal shift d: {d}
            <input
              type="range"
              min="-5"
              max="5"
              step="0.5"
              value={d}
              onChange={(e) => D(Number(e.target.value))}
            />
          </label>
          <label>
            Vertical shift c: {c}
            <input
              type="range"
              min="-5"
              max="5"
              step="0.5"
              value={c}
              onChange={(e) => C(Number(e.target.value))}
            />
          </label>
          <label className="check-label">
            <input
              type="checkbox"
              checked={inverse}
              onChange={(e) => I(e.target.checked)}
            />
            Reflect across y = x
          </label>
          <button
            className="text-button"
            onClick={() => {
              A(1);
              K(1);
              D(0);
              C(0);
              I(false);
            }}
          >
            Reset graph
          </button>
        </div>
      </div>
      <div className="math-strip" aria-live="polite">
        g(x) = {a} f({k}(x − ({d}))) + ({c})
        <span>
          Domain: {domain} · Range: {range}
        </span>
      </div>
      <p className="muted small">
        Mapping: (u, v) → (u/k + d, av + c). Only the visible window is shown.{" "}
        {inverse
          ? "The reflected relation is a function only if the original is one-to-one; the original domain and range exchange roles."
          : "Grey shows the original parent. Predict a point before moving a control."}
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Parent point</th>
              <th>Transformed point</th>
            </tr>
          </thead>
          <tbody>
            {pts.map((x) => (
              <tr key={x}>
                <td>
                  ({fmt(x)}, {fmt(val(shape, x))})
                </td>
                <td>
                  ({fmt(x / k + d)}, {fmt(a * val(shape, x) + c)})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
