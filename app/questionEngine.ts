import type { QuizQuestion } from "./masteryData";

type Category = "K/U" | "Thinking" | "Communication" | "Application";

function mc(
  id: string,
  prompt: string,
  choices: string[],
  answer: number,
  explanation: string,
  skill: string,
  category: Category,
): QuizQuestion {
  return { id, kind: "choice", prompt, choices, answer, explanation, skill, category };
}

function input(
  id: string,
  prompt: string,
  accepted: string[],
  explanation: string,
  skill: string,
  category: Category,
  placeholder = "Type your answer",
): QuizQuestion {
  return { id, kind: "input", prompt, accepted, explanation, skill, category, placeholder };
}

function explain(
  id: string,
  prompt: string,
  requiredGroups: string[][],
  explanation: string,
  skill: string,
  category: Category = "Communication",
): QuizQuestion {
  return {
    id,
    kind: "explain",
    prompt,
    requiredGroups,
    minLength: 24,
    explanation,
    skill,
    category,
    placeholder: "Explain in a complete sentence",
  };
}

const pick = <T,>(values: T[], seed: number) => values[Math.abs(seed) % values.length];
const signed = (value: number) => (value >= 0 ? "+" + value : String(value));
const setAnswers = (values: number[]) => {
  const permute = (items: number[]): number[][] => items.length <= 1
    ? [items]
    : items.flatMap((item, index) => permute([...items.slice(0, index), ...items.slice(index + 1)]).map((rest) => [item, ...rest]));
  return permute(values).flatMap((order) => {
    const body = order.join(",");
    return [body, "{" + body + "}"];
  });
};

function relationQuestions(seed: number, prefix: string): QuizQuestion[] {
  const repeated = pick([-4, -2, 1, 3, 5], seed);
  const a = repeated - 3;
  const b = repeated + 2;
  const domain = [a, repeated, b];
  const range = [2, 6, 9];
  return [
    mc(prefix + "-11-classify", "Which relation is a function?", [
      "{(-2,4),(0,4),(3,7)}",
      "{(1,3),(1,5),(2,8)}",
      "x = y²",
      "A circle centred at the origin",
    ], 0, "A function may repeat outputs, but every input must have exactly one output.", "1.1 classify representations", "K/U"),
    mc(prefix + "-11-vlt", "A vertical line meets a graph at two points. What has been proved?", [
      "One input has two outputs, so the graph is not y as a function of x.",
      "Two inputs share one output, so the graph is not a function.",
      "The relation has no domain.",
      "The relation must be quadratic.",
    ], 0, "Two intersections share the same x-value. That single input has two y-values.", "1.1 vertical-line justification", "Thinking"),
    input(prefix + "-11-domain", "For R={(" + a + ",2),(" + repeated + ",6),(" + b + ",9)}, type the domain as a set or comma-separated list.", setAnswers(domain), "The domain is the set of first coordinates: " + domain.join(", ") + ".", "1.1 construct domain", "K/U", "Example: {-3,0,4}"),
    input(prefix + "-11-range", "For R={(" + a + ",2),(" + repeated + ",6),(" + b + ",9),(" + (b + 2) + ",6)}, type the range.", setAnswers(range), "List each distinct output once: " + range.join(", ") + ".", "1.1 construct range", "Application", "Example: {2,6,9}"),
    explain(prefix + "-11-explain", "Explain why {(" + repeated + ",1),(" + repeated + ",7),(" + b + ",4)} is not a function. Name the exact input and the rule it breaks.", [[String(repeated)], ["input", "x-value", "x value"], ["two outputs", "more than one output", "different outputs", "1 and 7"]], "The input " + repeated + " is paired with two different outputs, 1 and 7. A function assigns exactly one output to each input.", "1.1 justify with counterexample", "Communication"),
    mc(prefix + "-11-apply", "A student number is paired with every course that student takes. Is course a function of student number?", [
      "Usually no, because one student number can be paired with several courses.",
      "Yes, because student numbers are unique.",
      "Yes, because courses may repeat.",
      "No, because a function cannot use numbers as inputs.",
    ], 0, "The input is the student number. One student can take several courses, so that input can have multiple outputs.", "1.1 contextual transfer", "Application"),
  ];
}

function notationQuestions(seed: number, prefix: string): QuizQuestion[] {
  const m = pick([2, 3, 4, 5], seed);
  const c = pick([-7, -4, 3, 6], seed + 1);
  const x = pick([-3, -2, 2, 4], seed + 2);
  const value = m * x + c;
  const targetX = x + 2;
  const target = m * targetX + c;
  const comp = (m * x + c) ** 2;
  return [
    input(prefix + "-12-eval", "Let f(x)=" + m + "x" + signed(c) + ". Type f(" + x + ").", [String(value)], "Substitute with brackets: f(" + x + ")=" + m + "(" + x + ")" + signed(c) + "=" + value + ".", "1.2 evaluate notation", "K/U"),
    mc(prefix + "-12-expression", "If f(x)=x²-3x, which expression equals f(2-t)?", [
      "(2-t)²-3(2-t)",
      "2-t²-6+t",
      "f(2)-f(t)",
      "(2-t)(2-t-3x)",
    ], 0, "Replace every x with the entire input 2-t and keep brackets until simplifying.", "1.2 substitute expressions", "Thinking"),
    input(prefix + "-12-solve", "Let f(x)=" + m + "x" + signed(c) + ". Solve f(x)=" + target + " and type x.", [String(targetX)], "Solve " + m + "x" + signed(c) + "=" + target + ", giving x=" + targetX + ".", "1.2 solve input from output", "Application"),
    input(prefix + "-12-compose", "Let f(x)=" + m + "x" + signed(c) + " and g(x)=x². Type g(f(" + x + ")).", [String(comp)], "First f(" + x + ")=" + value + ". Then g(" + value + ")=" + value + "²=" + comp + ".", "1.2 composition", "Thinking"),
    explain(prefix + "-12-explain", "Explain why brackets matter when evaluating f(-3) for f(x)=x²-4x.", [["-3", "negative three"], ["bracket", "parenthes"], ["square", "squared", "positive 9", "positive nine"]], "Write f(-3)=(-3)²-4(-3). Brackets keep the negative sign inside the square and make the substitution unambiguous.", "1.2 communicate substitution", "Communication"),
    mc(prefix + "-12-table", "A table gives f(-2)=5, f(0)=1, and f(3)=-4. Which statement is true?", [
      "f(3)=-4",
      "f(-4)=3",
      "f(5)=-2",
      "f(1)=0",
    ], 0, "Function notation records input first and output second. The row x=3 has output -4.", "1.2 read table", "K/U"),
  ];
}

function domainQuestions(seed: number, prefix: string): QuizQuestion[] {
  const left = pick([-6, -4, -2, 1], seed);
  const right = left + pick([4, 5, 7], seed + 1);
  const excluded = pick([-5, -2, 3, 6], seed + 2);
  const rad = pick([-4, -1, 2, 5], seed + 3);
  const exclusions = [excluded, -excluded].sort((first, second) => first - second);
  return [
    input(prefix + "-13-interval", "Write " + left + " < x ≤ " + right + " in interval notation.", ["(" + left + "," + right + "]"], "The open bracket excludes " + left + "; the square bracket includes " + right + ".", "1.3 interval notation", "K/U", "Example: (-2,5]"),
    input(prefix + "-13-rational", "For h(x)=1/(x" + signed(-excluded) + "), type the single excluded x-value.", [String(excluded)], "The denominator cannot be zero. x" + signed(-excluded) + "=0 at x=" + excluded + ".", "1.3 rational restriction", "K/U"),
    input(prefix + "-13-radical", "For r(x)=√(x" + signed(-rad) + "), type the domain as an inequality.", ["x>=" + rad, "x≥" + rad, rad + "<=x", rad + "≤x"], "The radicand must be non-negative: x" + signed(-rad) + "≥0, so x≥" + rad + ".", "1.3 radical domain", "Thinking", "Example: x>=2"),
    mc(prefix + "-13-range", "A graph begins at (" + left + "," + right + ") with a filled point and continues forever downward. What is its range?", [
      "y ≤ " + right,
      "y ≥ " + right,
      "x ≤ " + left,
      "All real y except " + right,
    ], 0, "The greatest output is included at y=" + right + ", and the graph continues toward negative infinity.", "1.3 read range from graph", "Application"),
    explain(prefix + "-13-context", "A function models distance walked after t minutes. Explain the natural restriction on t, even if its formula accepts negative inputs.", [["t", "time"], [">=0", "≥0", "non-negative", "cannot be negative", "not negative"], ["minutes", "context", "real situation"]], "Time elapsed in this context cannot be negative, so the natural domain uses t≥0 (and may have an upper bound if the walk ends).", "1.3 contextual restriction", "Communication"),
    input(prefix + "-13-union", "Type the domain of y=1/[(x" + signed(-excluded) + ")(x" + signed(excluded) + ")] using exclusions, for example x≠a,b.", ["x!=" + exclusions.join(","), "x≠" + exclusions.join(","), "x!=" + [...exclusions].reverse().join(","), "x≠" + [...exclusions].reverse().join(",")], "Neither factor may be zero, so x cannot equal " + exclusions[0] + " or " + exclusions[1] + ".", "1.3 multiple restrictions", "Application", "Example: x≠-3,3"),
  ];
}

function parentQuestions(seed: number, prefix: string): QuizQuestion[] {
  const shift = pick([2, 3, 5, 7], seed);
  return [
    mc(prefix + "-14-match", "Which parent function has an endpoint at (0,0), domain x≥0, and range y≥0?", ["y=√x", "y=1/x", "y=x²", "y=x³"], 0, "The square-root parent starts at the origin and extends only to the right and upward.", "1.4 parent identification", "K/U"),
    mc(prefix + "-14-features", "Which statement about y=1/x is true?", ["Its asymptotes are x=0 and y=0.", "Its domain is x≥0.", "It has an endpoint at (0,0).", "Its range includes y=0."], 0, "The reciprocal parent approaches both axes but never reaches them.", "1.4 reciprocal features", "K/U"),
    input(prefix + "-14-value", "The parent is f(x)=x². Type f(" + shift + ").", [String(shift * shift)], "Square the input: " + shift + "²=" + (shift * shift) + ".", "1.4 parent key value", "K/U"),
    input(prefix + "-14-domain", "Type the domain of the reciprocal parent y=1/x using an exclusion.", ["x!=0", "x≠0", "allrealexcept0", "allrealsxexcept0"], "Division by zero is undefined, so the domain is all real x except 0.", "1.4 parent domain", "Application", "Example: x≠0"),
    explain(prefix + "-14-explain", "Explain why y=1/x can never have an x-intercept.", [["1", "numerator"], ["zero", "0"], ["never", "cannot", "no value"]], "An x-intercept would require 1/x=0. A fraction with numerator 1 cannot equal zero for any allowed real x.", "1.4 justify reciprocal feature", "Communication"),
    mc(prefix + "-14-transfer", "Which parent is odd and passes through (-1,-1), (0,0), and (1,1) with an S-shape?", ["y=x³", "y=x²", "y=|x|", "y=√x"], 0, "The cubic parent is odd, contains those three points, and has an S-shaped graph.", "1.4 unfamiliar representation", "Thinking"),
  ];
}

function transformQuestions(seed: number, prefix: string): QuizQuestion[] {
  const k = pick([2, 3, 4], seed);
  const d = pick([-4, -2, 1, 3], seed + 1);
  const c = pick([-5, -3, 2, 6], seed + 2);
  const x = k * pick([-3, -1, 2, 4], seed + 3);
  const y = pick([-4, -1, 2, 5], seed + 4);
  const mappedX = x / k + d;
  const mappedY = -2 * y + c;
  return [
    mc(prefix + "-15-describe", "Describe y=-2f(" + k + "(x" + signed(-d) + "))" + signed(c) + ".", [
      "Reflect in the x-axis, vertical stretch 2, horizontal compression 1/" + k + ", shift " + (d >= 0 ? "right " : "left ") + Math.abs(d) + ", and " + (c >= 0 ? "up " : "down ") + Math.abs(c) + ".",
      "Reflect in the y-axis, vertical compression 1/2, horizontal stretch " + k + ", then reverse both shifts.",
      "Only shift right " + Math.abs(d) + " and up " + Math.abs(c) + ".",
      "Vertical stretch " + k + " and horizontal compression 1/2.",
    ], 0, "Outside changes affect y; inside changes affect x using the reciprocal factor and opposite-looking sign.", "1.5 describe transformations", "K/U"),
    input(prefix + "-15-mapx", "Under y=-2f(" + k + "(x" + signed(-d) + "))" + signed(c) + ", a parent point has x=" + x + ". Type its transformed x-coordinate.", [String(mappedX)], "Use x′=x/k+d: " + x + "/" + k + signed(d) + "=" + mappedX + ".", "1.5 horizontal mapping", "Thinking"),
    input(prefix + "-15-mapy", "Under y=-2f(" + k + "(x" + signed(-d) + "))" + signed(c) + ", a parent point has y=" + y + ". Type its transformed y-coordinate.", [String(mappedY)], "Use y′=ay+c=-2(" + y + ")" + signed(c) + "=" + mappedY + ".", "1.5 vertical mapping", "Thinking"),
    input(prefix + "-15-equation", "Start with y=f(x). Shift right 3 and down 4. Type the transformed equation.", ["y=f(x-3)-4", "f(x-3)-4"], "Right 3 replaces x with x-3; down 4 subtracts 4 outside.", "1.5 write transformed equation", "Application", "Example: y=f(x-3)-4"),
    explain(prefix + "-15-reciprocal", "Explain why y=f(3x) is horizontally compressed by 1/3 rather than stretched by 3.", [["input", "x"], ["one third", "1/3", "divide by 3", "x/3"], ["same output", "parent point", "reach"]], "To reach the same parent input X, the new x must satisfy 3x=X, so x=X/3. Each parent x-coordinate is divided by 3.", "1.5 justify horizontal factor", "Communication"),
    mc(prefix + "-15-order", "Which mapping rule matches y=af(k(x-d))+c?", ["(x,y) → (x/k+d, ay+c)", "(x,y) → (kx-d, y/a-c)", "(x,y) → (ax+c, ky+d)", "(x,y) → (x+d/k, y+c/a)"], 0, "Horizontal coordinates use x/k+d; vertical coordinates use ay+c.", "1.5 general mapping rule", "Application"),
  ];
}

function graphQuestions(seed: number, prefix: string): QuizQuestion[] {
  const d = pick([-4, -2, 1, 3], seed);
  const c = pick([-5, -2, 2, 6], seed + 1);
  const px = pick([-6, -2, 4, 8], seed + 2);
  const py = pick([-2, 1, 3, 6], seed + 3);
  const mappedX = px / 2 + d;
  const mappedY = -py + c;
  return [
    input(prefix + "-16-pointx", "On paper, map point (" + px + "," + py + ") for y=-f(2(x" + signed(-d) + "))" + signed(c) + ". Type the new x-coordinate.", [String(mappedX)], "The horizontal mapping is x′=x/2+d=" + px + "/2" + signed(d) + "=" + mappedX + ".", "1.6 construct graph x-coordinate", "Thinking"),
    input(prefix + "-16-pointy", "For the same mapping, type the new y-coordinate.", [String(mappedY)], "The vertical mapping is y′=-y+c=-(" + py + ")" + signed(c) + "=" + mappedY + ".", "1.6 construct graph y-coordinate", "Thinking"),
    input(prefix + "-16-asymptotes", "For y=-3/[2(x" + signed(-d) + ")]" + signed(c) + ", type both asymptotes as x=d,y=c.", ["x=" + d + ",y=" + c, "y=" + c + ",x=" + d], "A transformed reciprocal has vertical asymptote x=d and horizontal asymptote y=c.", "1.6 label asymptotes", "Application", "Example: x=-2,y=4"),
    input(prefix + "-16-endpoint", "For y=2√(x" + signed(-d) + ")" + signed(c) + ", type the endpoint as an ordered pair.", ["(" + d + "," + c + ")"], "The square-root parent endpoint (0,0) maps to (d,c)=(" + d + "," + c + ").", "1.6 transformed endpoint", "K/U", "Example: (-2,4)"),
    explain(prefix + "-16-proof", "State the three labels your paper sketch of a transformed reciprocal must show to count as complete.", [["vertical asymptote", "x="], ["horizontal asymptote", "y="], ["point", "mapped", "coordinates", "branch"]], "A complete sketch labels the vertical asymptote, horizontal asymptote, and enough correctly mapped points/branches to show orientation.", "1.6 communicate graph evidence", "Communication"),
    mc(prefix + "-16-domain", "For y=4/(x" + signed(-d) + ")" + signed(c) + ", which domain and range are correct?", [
      "D: x≠" + d + "; R: y≠" + c,
      "D: x≥" + d + "; R: y≥" + c,
      "D: x≠" + c + "; R: y≠" + d,
      "All real x and y",
    ], 0, "The vertical asymptote excludes x=d and the horizontal asymptote excludes y=c.", "1.6 domain and range from graph", "Application"),
  ];
}

function inverseQuestions(seed: number, prefix: string): QuizQuestion[] {
  const m = pick([2, 3, 4, 5], seed);
  const c = pick([-6, -3, 2, 7], seed + 1);
  const x = pick([-3, -1, 2, 4], seed + 2);
  const y = m * x + c;
  const inverse = "(x" + signed(-c) + ")/" + m;
  return [
    input(prefix + "-17-algebra", "For f(x)=" + m + "x" + signed(c) + ", type f⁻¹(x).", [inverse, "y=" + inverse, "(x" + signed(-c) + ")÷" + m], "Swap x and y, then solve x=" + m + "y" + signed(c) + " to get y=" + inverse + ".", "1.7 algebraic inverse", "Thinking", "Example: (x-3)/2"),
    input(prefix + "-17-point", "If (" + x + "," + y + ") is on f, type the corresponding point on f⁻¹.", ["(" + y + "," + x + ")"], "Inverse relations swap coordinates, so (x,y) becomes (y,x).", "1.7 inverse points", "K/U", "Example: (7,3)"),
    mc(prefix + "-17-domain", "If the range of f is y≥" + c + ", what is the domain of f⁻¹?", ["x≥" + c, "x≤" + c, "x≠" + c, "All real x"], 0, "The inverse swaps domain and range.", "1.7 swap domain and range", "K/U"),
    input(prefix + "-17-verify", "For f(x)=" + m + "x" + signed(c) + " and its inverse, type f⁻¹(f(" + x + ")).", [String(x)], "An inverse undoes the original function, so f⁻¹(f(" + x + "))=" + x + ".", "1.7 verify by composition", "Application"),
    explain(prefix + "-17-restrict", "Explain why f(x)=x² needs a restricted domain before its inverse can be a function.", [["two", "2", "positive and negative", "x and -x"], ["same output", "same y"], ["horizontal line", "one-to-one", "one to one", "inverse"]], "On the full domain, x and -x give the same output, so f is not one-to-one and its reflected inverse fails the vertical-line test. Restrict to x≥0 or x≤0.", "1.7 justify domain restriction", "Communication"),
    mc(prefix + "-17-test", "What does the horizontal-line test determine?", ["Whether the inverse relation will be a function", "Whether the original relation is a function of x", "Whether a graph has a y-intercept", "Whether the domain is all real numbers"], 0, "After reflection in y=x, horizontal intersections become vertical intersections.", "1.7 horizontal-line test", "Thinking"),
  ];
}

export function buildLessonCheck(section: string, attempt: number, phase: "mastery" | "retention" | "diagnostic" | "mock" = "mastery"): QuizQuestion[] {
  const offset = phase === "retention" ? 101 : phase === "mock" ? 211 : phase === "diagnostic" ? 307 : 0;
  const seed = attempt * 17 + offset;
  const prefix = phase + "-" + attempt + "-" + section.replace(".", "");
  if (section === "1.1") return relationQuestions(seed, prefix);
  if (section === "1.2") return notationQuestions(seed, prefix);
  if (section === "1.3") return domainQuestions(seed, prefix);
  if (section === "1.4") return parentQuestions(seed, prefix);
  if (section === "1.5") return transformQuestions(seed, prefix);
  if (section === "1.6") return graphQuestions(seed, prefix);
  return inverseQuestions(seed, prefix);
}

export function buildDiagnostic(attempt: number): QuizQuestion[] {
  const indexes = attempt % 2 === 0 ? [0, 2, 4] : [1, 3, 5];
  return ["1.1", "1.2", "1.3"].flatMap((section, index) => {
    const questions = buildLessonCheck(section, attempt + index, "diagnostic");
    return indexes.map((questionIndex) => questions[questionIndex]);
  });
}

export function buildMock(attempt: number): QuizQuestion[] {
  const plan: Array<[string, number[]]> = [
    ["1.1", [0, 4, 5]],
    ["1.2", [0, 3, 4]],
    ["1.3", [0, 3, 4]],
    ["1.4", [0, 4]],
    ["1.5", [0, 2, 5]],
    ["1.6", [0, 1, 2]],
    ["1.7", [0, 3]],
  ];
  return plan.flatMap(([section, indexes], sectionIndex) => {
    const questions = buildLessonCheck(section, attempt + sectionIndex, "mock");
    return indexes.map((index) => questions[index]);
  });
}
