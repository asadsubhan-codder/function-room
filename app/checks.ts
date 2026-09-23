import { buildLessonCheck } from "./questionEngine.ts";

export type Check = {
  id: string;
  lessonId: string;
  prompt: string;
  choices?: string[];
  answer?: number;
  accepted?: string[];
  numeric?: number;
  tolerance?: number;
  explanation: string;
  skill: string;
};
type Item = Omit<Check, "id" | "lessonId">;
const number = (
  prompt: string,
  numeric: number,
  explanation: string,
  skill: string,
  tolerance = 0.000001,
): Item => ({ prompt, numeric, tolerance, explanation, skill });
const choice = (
  prompt: string,
  correct: string,
  wrong: string[],
  explanation: string,
  skill: string,
): Item => ({
  prompt,
  choices: [correct, ...wrong],
  answer: 0,
  explanation,
  skill,
});
const s = (n: number) => (n < 0 ? String(n) : "+" + n);

export function makeCheck(lessonId: string, seed: number): Check[] {
  let items: Item[] = [];
  const k = 2 + (Math.abs(seed) % 5),
    a = 2 + (Math.abs(seed * 3) % 4),
    b = k + 3;
  if (lessonId.startsWith("u1-")) {
    const sec = "1." + lessonId.split("l")[1];
    return buildLessonCheck(sec, seed)
      .filter((q) => q.kind !== "explain")
      .map((q, i) => ({
        id: lessonId + "-" + seed + "-" + i,
        lessonId,
        prompt: q.prompt,
        choices: q.choices,
        answer: q.answer,
        accepted: q.accepted,
        explanation: q.explanation,
        skill: q.skill,
      }));
  }
  switch (lessonId) {
    case "u2-l1":
      items = [
        choice(
          `Simplify (${k}x² − 3x + 4) − (2x² + x − 7).`,
          `${k - 2}x² − 4x + 11`,
          [`${k + 2}x² − 2x − 3`, `${k - 2}x² − 2x − 3`, `${k - 2}x² − 4x − 3`],
          "Distribute the minus to all three terms: −2x² − x + 7. Then collect equal powers.",
          "subtract polynomials",
        ),
        number(
          `What is the coefficient of x in (${k}x + 5) + (3x − 2)?`,
          k + 3,
          `The x terms add: ${k}+3=${k + 3}. The constant is 3.`,
          "like terms",
        ),
        choice(
          "Which two terms can be combined?",
          "3x² and −5x²",
          ["3x and 3x²", "4xy and 4x", "x² and 2"],
          "Like terms have identical variable parts, including exponents.",
          "identify like terms",
        ),
        number(
          `Evaluate P(−1) if P(x)=${k}x² − 3x + 4.`,
          k + 7,
          `P(−1)=${k}(1)−3(−1)+4=${k + 7}.`,
          "signs in substitution",
        ),
      ];
      break;
    case "u2-l2":
      items = [
        choice(
          `Expand (x + ${k})(x − 3).`,
          `x² ${s(k - 3)}x − ${3 * k}`,
          [
            `x² − ${3 * k}`,
            `x² ${s(k + 3)}x − ${3 * k}`,
            `x² ${s(k - 3)}x + ${3 * k}`,
          ],
          `The products are x², −3x, ${k}x, −${3 * k}. Combine the middle terms.`,
          "distributive property",
        ),
        number(
          `In (${k}x − 2)(3x + 1), what is the coefficient of x?`,
          k - 6,
          `The middle products are ${k}x and −6x. Their sum is ${k - 6}x.`,
          "middle terms",
        ),
        choice(
          "Expand (x − 4)².",
          "x² − 8x + 16",
          ["x² + 16", "x² − 16", "x² − 4x + 16"],
          "(x−4)(x−4)=x²−4x−4x+16.",
          "square a binomial",
        ),
        number(
          `Evaluate (x + ${k})(x − 3) at x = 0.`,
          -3 * k,
          `Use the original factors: ${k}(−3)=−${3 * k}.`,
          "check an expansion",
        ),
      ];
      break;
    case "u2-l3":
      items = [
        choice(
          `Factor completely: ${k}x² + ${3 * k}x.`,
          `${k}x(x + 3)`,
          [`${k}(x + 3)`, `x(${k}x + 3)`, `${k}x(x − 3)`],
          `Both terms contain ${k}x; divide each by it.`,
          "greatest common factor",
        ),
        choice(
          `Factor x² + ${k}x + 3x + ${3 * k}.`,
          `(x + 3)(x + ${k})`,
          [`(x − 3)(x − ${k})`, `x(x + ${k} + 3)`, `(x + 3)(x − ${k})`],
          `Group x(x+${k})+3(x+${k}), then remove the common binomial.`,
          "grouping",
        ),
        number(
          `What is the numerical GCF of ${6 * k} and ${9 * k}?`,
          3 * k,
          `gcd(6,9)=3, so the common factor is 3×${k}=${3 * k}.`,
          "common factor",
        ),
        choice(
          "How do you check a factorization?",
          "Multiply the factors and compare every term.",
          [
            "Add the factors.",
            "Compare only constants.",
            "Plug in x = 0 only.",
          ],
          "Expansion must reproduce the whole polynomial; one input alone cannot establish equivalence.",
          "verify factors",
        ),
      ];
      break;
    case "u2-l4":
      items = [
        choice(
          `Factor x² + ${k + 3}x + ${3 * k}.`,
          `(x + ${k})(x + 3)`,
          [`(x − ${k})(x − 3)`, `(x + ${k})(x − 3)`, `(x + 1)(x + ${3 * k})`],
          `Find numbers with product ${3 * k} and sum ${k + 3}: ${k} and 3.`,
          "product and sum",
        ),
        choice(
          `Factor x² − ${k + 3}x + ${3 * k}.`,
          `(x − ${k})(x − 3)`,
          [`(x + ${k})(x + 3)`, `(x − ${k})(x + 3)`, `(x − 1)(x − ${3 * k})`],
          "A positive product and negative sum mean both numbers are negative.",
          "factor signs",
        ),
        number(
          `If x² + bx + ${2 * k} = (x + 2)(x + ${k}), find b.`,
          k + 2,
          `The middle coefficients add: 2+${k}=${k + 2}.`,
          "recover coefficient",
        ),
        choice(
          "Which is the factorization of x² − x − 12?",
          "(x − 4)(x + 3)",
          ["(x − 4)(x − 3)", "(x + 4)(x − 3)", "(x − 6)(x + 2)"],
          "−4×3=−12 and −4+3=−1.",
          "opposite signs",
        ),
      ];
      break;
    case "u2-l5":
      items = [
        choice(
          `Factor x² − ${k * k}.`,
          `(x − ${k})(x + ${k})`,
          [`(x − ${k})²`, `(x + ${k})²`, `x(x − ${k * k})`],
          "Use A²−B²=(A−B)(A+B).",
          "difference of squares",
        ),
        choice(
          `Factor x² − ${2 * k}x + ${k * k}.`,
          `(x − ${k})²`,
          [`(x + ${k})²`, `(x − ${k})(x + ${k})`, `x(x − ${2 * k})`],
          `The middle term is −2×x×${k}, so it is a perfect square.`,
          "perfect square",
        ),
        number(
          `What constant makes x² + ${2 * k}x + c a perfect square?`,
          k * k,
          `Half the x coefficient is ${k}; square it to get ${k * k}.`,
          "complete pattern",
        ),
        choice(
          "Factor completely: 2x² − 18.",
          "2(x − 3)(x + 3)",
          ["2(x − 3)²", "(2x − 3)(x + 3)", "2(x² + 9)"],
          "Remove 2 first, then factor x²−9 as a difference of squares.",
          "factor completely",
        ),
      ];
      break;
    case "u2-l6":
      items = [
        choice(
          `Factor 2x² + ${2 * k + 1}x + ${k}.`,
          `(2x + 1)(x + ${k})`,
          [`(2x − 1)(x − ${k})`, `(2x + ${k})(x + 1)`, `2(x + 1)(x + ${k})`],
          `Split the middle term into ${2 * k}x+x, group, and factor.`,
          "factor ax²+bx+c",
        ),
        number(
          `For 3x² + 10x + 8, what is the product ac?`,
          24,
          "a=3 and c=8, so ac=24. The split is 6x+4x.",
          "AC method",
        ),
        choice(
          "Factor 3x² + 10x + 8.",
          "(3x + 4)(x + 2)",
          ["(3x + 2)(x + 4)", "(3x − 4)(x − 2)", "3(x + 4)(x + 2)"],
          "Expansion gives 3x²+6x+4x+8.",
          "verify middle coefficient",
        ),
        number(
          `What is the constant term of (2x − ${k})(3x + 1)?`,
          -k,
          `Multiply the constants: −${k}×1=−${k}.`,
          "sign verification",
        ),
      ];
      break;
    case "u2-l7":
      items = [
        choice(
          `Simplify (x² − ${k * k})/(x − ${k}), retaining restrictions.`,
          `x + ${k}, x ≠ ${k}`,
          [`x + ${k}, all real x`, `x − ${k}, x ≠ ${k}`, `x², x ≠ ${k}`],
          `Factor the numerator, cancel the factor x−${k}, but keep the original restriction.`,
          "cancel factors and retain restrictions",
        ),
        number(
          `For (x + 1)/(x − ${k}), which input is excluded?`,
          k,
          `x−${k}=0 when x=${k}.`,
          "original denominator",
        ),
        choice(
          "Can x cancel in (x + 3)/x?",
          "No; x is not a factor of the entire numerator.",
          ["Yes, leaving 3.", "Yes, leaving 4.", "Only when x > 0."],
          "Cancellation applies to multiplication, not terms joined by addition.",
          "invalid cancellation",
        ),
        choice(
          "Simplify (2x²)/(4x), with restrictions.",
          "x/2, x ≠ 0",
          ["x/2, all real x", "2x, x ≠ 0", "x²/2, x ≠ 0"],
          "Divide coefficients by 2 and remove one factor of x. Keep x≠0.",
          "monomial fraction",
        ),
      ];
      break;
    case "u2-l8":
      items = [
        number(
          `Find the vertical asymptote of y = ${a}/(x − ${k}) + 3. Type its x-value.`,
          k,
          `The denominator is zero at x=${k}; the numerator is nonzero.`,
          "vertical asymptote",
        ),
        number(
          `Find the horizontal asymptote of y = ${a}/(x − ${k}) + 3. Type its y-value.`,
          3,
          "The fraction approaches zero for large |x|, leaving y=3.",
          "horizontal asymptote",
        ),
        choice(
          `The graph of (x² − ${k * k})/(x − ${k}) has…`,
          `a hole at (${k}, ${2 * k})`,
          [
            `a vertical asymptote at x=${k}`,
            `no restriction`,
            `a hole at (${k}, 0)`,
          ],
          `After cancellation the rule is x+${k}, but x=${k} remains excluded; its missing output is ${2 * k}.`,
          "holes versus asymptotes",
        ),
        choice(
          "What is the range of y = 2/(x − 1) − 4?",
          "All real y except −4",
          ["All real y except 1", "y ≥ −4", "All real y"],
          "The nonzero fraction cannot equal zero; the vertical shift excludes y=−4.",
          "reciprocal range",
        ),
      ];
      break;
    case "u2-l9":
      items = [
        choice(
          `Simplify (x/${k})·(${k}/(x + 1)).`,
          "x/(x + 1), x ≠ −1",
          [`1, x ≠ −1`, `x, all x`, `1/(x + 1), x ≠ −1`],
          "Cancel the nonzero constant. The original denominator x+1 must remain nonzero.",
          "multiply rationals",
        ),
        choice(
          "Simplify [x/(x−2)] ÷ [x/(x+3)].",
          "(x+3)/(x−2), x ≠ 0,2,−3",
          ["(x+3)/(x−2), x ≠ 2", "(x−2)/(x+3), x ≠ −3", "1, x ≠ 0"],
          "Original denominators exclude 2 and −3; the divisor must also be nonzero, excluding 0. Invert the divisor and multiply.",
          "division restrictions",
        ),
        number(
          `Evaluate [${k}/(x+1)]·[(x+1)/2] at x=3.`,
          k / 2,
          `The product simplifies to ${k}/2 for x≠−1.`,
          "evaluate product",
        ),
        choice(
          "Before cancelling in a product of rational expressions, first…",
          "factor every numerator and denominator.",
          [
            "add all denominators.",
            "remove all x symbols.",
            "invert both expressions.",
          ],
          "Only whole common factors can cancel.",
          "factor first",
        ),
      ];
      break;
    case "u2-l10":
      items = [
        choice(
          `Add ${k}/x + 2/(x+1).`,
          `((${k + 2})x+${k})/[x(x+1)], x ≠ 0,−1`,
          [
            `(${k + 2})/(2x+1)`,
            `(${k + 2})/[x(x+1)]`,
            `((${k - 2})x+${k})/[x(x+1)]`,
          ],
          `Use common denominator x(x+1). The numerator is ${k}(x+1)+2x.`,
          "common denominator",
        ),
        choice(
          "Simplify 1/(x−1) − 1/(x+1).",
          "2/(x²−1), x ≠ ±1",
          ["2x/(x²−1), x ≠ ±1", "0, x ≠ ±1", "−2/(x²−1), x ≠ ±1"],
          "The numerator is (x+1)−(x−1)=2. Distribute the subtraction sign.",
          "subtract rationals",
        ),
        number(
          `Evaluate ${k}/x + 2/x at x=2.`,
          (k + 2) / 2,
          `Combine equal denominators to (${k + 2})/x, then substitute 2.`,
          "like denominators",
        ),
        choice(
          "The least common denominator of x(x−2) and (x−2)² is…",
          "x(x−2)²",
          ["x²(x−2)²", "x(x−2)", "2x(x−2)²"],
          "Use each distinct factor to its greatest needed power.",
          "least common denominator",
        ),
      ];
      break;
    case "u3-l1":
      items = [
        choice(
          `State the vertex of f(x)=−2(x−${k})²+5.`,
          `(${k}, 5)`,
          [`(−${k}, 5)`, `(${k}, −5)`, `(−${k}, −5)`],
          "Vertex form a(x−h)²+k has vertex (h,k).",
          "vertex form",
        ),
        number(
          `Find the y-intercept of f(x)=(x−${k})(x+3). Type y.`,
          -3 * k,
          `At x=0: (−${k})(3)=−${3 * k}.`,
          "intercepts",
        ),
        choice(
          `Which form shows zeros −2 and ${k}?`,
          `a(x+2)(x−${k}), a ≠ 0`,
          [`a(x−2)(x+${k})`, `a(x+2)²+${k}`, `ax²+${k}`],
          "Each factor is zero at its corresponding root.",
          "factored form",
        ),
        number(
          `Find the axis of symmetry of y=(x−${k})(x−${k + 4}). Type x.`,
          k + 2,
          `The axis is halfway between the zeros: (${k}+${k + 4})/2=${k + 2}.`,
          "symmetry",
        ),
      ];
      break;
    case "u3-l2":
      items = [
        number(
          `What is the maximum value of h(t)=−2(t−${k})²+${k + 12}?`,
          k + 12,
          "A square is nonnegative; multiplying by −2 makes that part nonpositive. The vertex gives the maximum.",
          "maximum output",
        ),
        number(
          `At what time is the maximum of h(t)=−2(t−${k})²+${k + 12} reached?`,
          k,
          `The squared part becomes zero when t=${k}.`,
          "input at vertex",
        ),
        choice(
          "For a rectangle with perimeter 40 m, which width maximizes its area?",
          "10 m",
          ["20 m", "5 m", "40 m"],
          "Length=20−w; A=w(20−w)=−(w−10)²+100. Maximum occurs at w=10.",
          "optimization model",
        ),
        number(
          `Find the minimum value of f(x)=(x+${k})²−${a}.`,
          -a,
          `The square has minimum 0 at x=−${k}; the minimum output is −${a}.`,
          "minimum versus location",
        ),
      ];
      break;
    case "u3-l3":
      items = [
        number(
          `What must be added to x²+${2 * k}x to complete the square?`,
          k * k,
          `Half ${2 * k} is ${k}; square it to get ${k * k}.`,
          "complete the square",
        ),
        choice(
          `Rewrite x²−${2 * k}x+3 in vertex form.`,
          `(x−${k})²${s(3 - k * k)}`,
          [`(x−${k})²+3`, `(x+${k})²${s(3 - k * k)}`, `(x−${2 * k})²+3`],
          `Add and subtract ${k * k}: (x−${k})²+3−${k * k}.`,
          "balance the compensation",
        ),
        choice(
          "Complete the square for 2x²+12x+5.",
          "2(x+3)²−13",
          ["2(x+3)²−4", "2(x+6)²+5", "2(x+3)²+5"],
          "Factor 2 from quadratic and linear terms; 2[(x+3)²−9]+5=2(x+3)²−13.",
          "non-unit leading coefficient",
        ),
        number(
          `For f(x)=x²+${2 * k}x+${k * k + 4}, find the minimum value.`,
          4,
          `f(x)=(x+${k})²+4, so the minimum is 4.`,
          "apply vertex form",
        ),
      ];
      break;
    case "u3-l4":
      items = [
        choice(
          `For f(x)=(x−${k})²+1 restricted to x≥${k}, find f⁻¹(x).`,
          `${k}+√(x−1), x≥1`,
          [`${k}−√(x−1), x≥1`, `√(x−${k})+1`, `1/[(x−${k})²+1]`],
          `Swap x,y: x=(y−${k})²+1. The original domain chooses the nonnegative branch y−${k}=√(x−1).`,
          "restricted quadratic inverse",
        ),
        number(
          `For f(x)=(x−${k})²+1 with x≥${k}, find f⁻¹(10).`,
          k + 3,
          `√(10−1)=3, so f⁻¹(10)=${k}+3=${k + 3}.`,
          "evaluate inverse",
        ),
        choice(
          "Why does y=x² on all real x have no inverse function?",
          "Two inputs such as −2 and 2 share one output.",
          [
            "Its outputs are always positive.",
            "It fails the vertical-line test.",
            "The graph has a minimum.",
          ],
          "It fails the horizontal-line test. Restricting one side of the vertex makes it one-to-one.",
          "one-to-one restriction",
        ),
        choice(
          "For f(x)=x², x≤0, which inverse is correct?",
          "f⁻¹(x)=−√x, x≥0",
          ["f⁻¹(x)=√x, x≥0", "f⁻¹(x)=−√x, x≤0", "f⁻¹(x)=1/x²"],
          "The inverse outputs must be nonpositive to match the original domain.",
          "choose the branch",
        ),
      ];
      break;
    case "u3-l5":
      items = [
        choice(
          `Simplify √(${2 * k * k}).`,
          `${k}√2`,
          [`${2 * k}√2`, `${k + 2}`, `${k}√3`],
          `Factor ${2 * k * k}=${k * k}×2 and take out √${k * k}=${k}.`,
          "simplify radicals",
        ),
        choice(
          "Simplify 3√8−√18.",
          "3√2",
          ["2√2", "√6", "6√2"],
          "3√8=6√2 and √18=3√2, so the difference is 3√2.",
          "like radicals",
        ),
        choice(
          "Rationalize 1/√3.",
          "√3/3",
          ["3/√3", "√3", "1/3"],
          "Multiply numerator and denominator by √3.",
          "rationalize",
        ),
        number(
          "Evaluate (√5+2)(√5−2).",
          1,
          "Use difference of squares: 5−4=1.",
          "radical multiplication",
        ),
      ];
      break;
    case "u3-l6":
      items = [
        choice(
          `Solve (x−${k})(x+2)=0.`,
          `x=${k} or x=−2`,
          [`x=−${k} or x=2`, `x=${k - 2}`, `x=${2 * k}`],
          "By the zero-product property, at least one factor must be zero.",
          "zero-product property",
        ),
        choice(
          "Solve x²−4x−1=0 exactly.",
          "x=2±√5",
          ["x=4±√5", "x=2±5", "x=−2±√5"],
          "Quadratic formula gives (4±√20)/2=2±√5.",
          "quadratic formula",
        ),
        number(
          `Find the positive solution of x²=${k * k}.`,
          k,
          `The two roots are ±${k}; the positive root is ${k}.`,
          "square-root method",
        ),
        choice(
          "Before using the zero-product property, the equation must be…",
          "a product equal to zero.",
          [
            "a sum equal to one.",
            "divided by x.",
            "written in vertex form only.",
          ],
          "AB=0 implies A=0 or B=0; the statement is not valid for a nonzero right side.",
          "equation setup",
        ),
      ];
      break;
    case "u3-l7":
      items = [
        number(
          `Find the discriminant of x²−${2 * k}x+${k * k - 1}=0.`,
          4,
          `b²−4ac=${4 * k * k}−${4 * (k * k - 1)}=4.`,
          "calculate discriminant",
        ),
        choice(
          "If b²−4ac < 0, a real quadratic has…",
          "no real zeros.",
          [
            "one distinct real zero.",
            "two distinct real zeros.",
            "infinitely many real zeros.",
          ],
          "A negative radicand gives no real roots in the quadratic formula.",
          "interpret negative discriminant",
        ),
        number(
          `Find c so x²−${2 * k}x+c=0 has one distinct real root.`,
          k * k,
          `Set the discriminant to zero: ${4 * k * k}−4c=0, so c=${k * k}.`,
          "parameter condition",
        ),
        choice(
          "A positive, non-square discriminant gives…",
          "two distinct irrational real roots, for integer coefficients.",
          ["one repeated root.", "no real roots.", "two equal integer roots."],
          "The square root of the discriminant is irrational; the ± branches are distinct.",
          "classify roots",
        ),
      ];
      break;
    case "u3-l8":
      items = [
        choice(
          `Which family has zeros −2 and ${k}?`,
          `y=a(x+2)(x−${k}), a≠0`,
          [`y=a(x−2)(x+${k})`, `y=a(x+2)²+${k}`, `y=ax²+${k}`],
          "Keep the root factors and vary a to change width and direction.",
          "family from zeros",
        ),
        number(
          `A member of y=a(x+2)(x−${k}) passes through (0,${-4 * k}). Find a.`,
          2,
          `Substitute: −${4 * k}=a(2)(−${k}); divide to get a=2.`,
          "determine family parameter",
        ),
        choice(
          "A family with vertex (3,−4) is…",
          "y=a(x−3)²−4, a≠0",
          ["y=a(x+3)²−4", "y=a(x−4)²+3", "y=a(x−3)(x+4)"],
          "Vertex form fixes the vertex while a varies.",
          "family from vertex",
        ),
        number(
          "A quadratic with vertex (1,2) goes through (3,10). Find a.",
          2,
          "10=a(3−1)²+2, so 8=4a and a=2.",
          "use an extra point",
        ),
      ];
      break;
    case "u3-l9":
      items = [
        choice(
          `Find the x-coordinates where y=x² and y=${k}x meet.`,
          `x=0 and x=${k}`,
          [`x=−${k} and x=${k}`, `x=${k * k}`, `x=0 only`],
          `Set x²=${k}x, then factor x(x−${k})=0.`,
          "solve intersections",
        ),
        number(
          `Where y=x² and y=${k}x meet, what is the y-coordinate of the nonzero intersection?`,
          k * k,
          `Substitute x=${k} into either equation: y=${k * k}.`,
          "recover ordered pairs",
        ),
        choice(
          "How many intersection points do y=x² and y=−1 have?",
          "0",
          ["1", "2", "Infinitely many"],
          "x² cannot equal −1 for real x.",
          "interpret no intersection",
        ),
        choice(
          "A line tangent to a parabola produces which discriminant after substitution?",
          "0",
          ["A negative value", "A positive value", "Always 1"],
          "Tangency means one repeated solution, so the discriminant is zero.",
          "tangent condition",
        ),
      ];
      break;
    case "u4-l1":
      items = [
        number(
          `Evaluate 2^${k}.`,
          2 ** k,
          `Multiply ${k} factors of 2 to obtain ${2 ** k}.`,
          "positive exponents",
        ),
        number(
          "Evaluate 2^(−3).",
          1 / 8,
          "A negative exponent means reciprocal: 1/2³=1/8.",
          "negative exponent",
        ),
        choice(
          `Simplify x^${k} · x³.`,
          `x^${k + 3}`,
          [`x^${k * 3}`, `2x^${k + 3}`, `x^${k - 3}`],
          "Add exponents only when multiplying powers with the same base.",
          "exponent law",
        ),
        choice(
          "For x≠0, x⁰ equals…",
          "1",
          ["0", "x", "Undefined"],
          "xⁿ/xⁿ=1=x⁰ for nonzero x.",
          "zero exponent",
        ),
      ];
      break;
    case "u4-l2":
      items = [
        number(
          "Evaluate 27^(2/3).",
          9,
          "Take the cube root first, then square: 3²=9.",
          "rational exponent",
        ),
        number(
          `Evaluate (${k * k})^(1/2).`,
          k,
          `The principal square root of ${k * k} is ${k}.`,
          "principal root",
        ),
        number(
          "Evaluate 16^(−3/4).",
          1 / 8,
          "The fourth root is 2, cubing gives 8, and the negative exponent takes its reciprocal.",
          "negative rational exponent",
        ),
        choice(
          "Over the real numbers, which equals √(x²)?",
          "|x|",
          ["x for every x", "−x for every x", "±x"],
          "A principal square root is nonnegative, even when x is negative.",
          "absolute value restriction",
        ),
      ];
      break;
    case "u4-l3":
      items = [
        choice(
          `Simplify (x³)^${k}/x², for x≠0.`,
          `x^${3 * k - 2}`,
          [`x^${3 + k - 2}`, `x^${3 * k + 2}`, `x^${k}`],
          "Multiply exponents for a power of a power, then subtract exponents in division.",
          "combined exponent laws",
        ),
        number(
          "Evaluate (8^(2/3))·(4^(−1/2)).",
          2,
          "8^(2/3)=4 and 4^(−1/2)=1/2, so the product is 2.",
          "numerical exponent expression",
        ),
        choice(
          "Simplify (2x²)³.",
          "8x⁶",
          ["6x⁵", "2x⁶", "8x⁵"],
          "The exponent applies to both factors: 2³(x²)³.",
          "power of product",
        ),
        number(
          `If 2^x · 2³ = 2^${k + 3}, find x.`,
          k,
          `Add exponents: x+3=${k + 3}, so x=${k}.`,
          "equal bases",
        ),
      ];
      break;
    case "u4-l4":
      items = [
        number(
          `Find the horizontal asymptote of y=2^(x−${k})+3. Type y.`,
          3,
          "The exponential approaches 0; adding 3 shifts its horizontal asymptote to y=3.",
          "asymptote",
        ),
        choice(
          `Describe 2^(x−${k}) compared with 2^x.`,
          `Shift right ${k}.`,
          [
            `Shift left ${k}.`,
            `Shift down ${k}.`,
            `Stretch vertically by ${k}.`,
          ],
          "An inside subtraction shifts a graph right.",
          "horizontal translation",
        ),
        choice(
          "What is the range of y=2^x+3?",
          "y>3",
          ["y≥3", "All real y", "y<3"],
          "2^x is strictly positive, so 3 is approached but never reached.",
          "exponential range",
        ),
        number(
          `Evaluate f(${k}) for f(x)=2^(x−${k})+3.`,
          4,
          "The exponent becomes 0, so 2⁰+3=4.",
          "transformed key point",
        ),
      ];
      break;
    case "u4-l5":
      items = [
        number(
          `Find the horizontal asymptote of y=−${a}·2^(−x)+${k}. Type y.`,
          k,
          `The outside translation sets the asymptote to y=${k}.`,
          "combined transformations",
        ),
        choice(
          `Find the range of y=−${a}·2^(−x)+${k}.`,
          `y<${k}`,
          [`y>${k}`, `y≤${k}`, "All real y"],
          `2^(−x)>0. Multiplication by −${a} makes it negative, so the output is strictly less than ${k}.`,
          "reflection and range",
        ),
        number(
          `Find f(0) for f(x)=−${a}·2^(−x)+${k}.`,
          k - a,
          `2⁰=1, giving −${a}+${k}=${k - a}.`,
          "y-intercept",
        ),
        choice(
          "Compared with y=2^x, y=2^(3x) has…",
          "a horizontal compression by factor 1/3.",
          [
            "a vertical stretch by factor 3.",
            "a horizontal stretch by factor 3.",
            "a shift right 3.",
          ],
          "Set 3x=u; an old point at u moves to u/3.",
          "horizontal scaling",
        ),
      ];
      break;
    case "u4-l6":
      items = [
        number(
          `Solve 2^x = ${2 ** k}.`,
          k,
          `${2 ** k}=2^${k}, so matching exponents gives x=${k}.`,
          "equal bases",
        ),
        number(
          `Solve 4^x = 2^${2 * k}.`,
          k,
          `4^x=2^(2x), so 2x=${2 * k}.`,
          "rewrite bases",
        ),
        choice(
          "Which table is exponential?",
          "x: 0,1,2,3; y: 3,6,12,24",
          [
            "x: 0,1,2,3; y: 3,6,9,12",
            "x: 0,1,2,3; y: 0,1,4,9",
            "x: 0,1,2,3; y: 1,2,4,7",
          ],
          "For equally spaced inputs, each output is multiplied by a constant ratio, here 2.",
          "identify from a table",
        ),
        number(
          `Solve 3^(x−1)=3^${k}.`,
          k + 1,
          `Set x−1=${k}, then add 1.`,
          "solve an exponent",
        ),
      ];
      break;
    case "u4-l7":
      items = [
        choice(
          `A population of 500 grows ${k}% each year. Which model is correct?`,
          `P(t)=500(1+${k}/100)^t`,
          [`P(t)=500(${k})^t`, `P(t)=500(1−${k}/100)^t`, `P(t)=(500+${k})^t`],
          "Growth by r uses factor 1+r with the percentage written as a decimal.",
          "growth model",
        ),
        number(
          "A $1000 item loses 20% of its value each year. Find its value after 2 years.",
          640,
          "1000(0.8)²=640. Apply the decay to the current value each year.",
          "decay application",
          0.005,
        ),
        choice(
          "In P(t)=1200(1.06)^t, 1.06 represents…",
          "a 6% increase per time interval.",
          ["a 106% increase.", "a 6% decrease.", "an increase of 1.06 people."],
          "The multiplier is 1+r, so r=0.06.",
          "interpret multiplier",
        ),
        number(
          `An initial amount of ${100 * k} triples once each hour. How much remains after 2 hours?`,
          900 * k,
          `${100 * k}×3²=${900 * k}.`,
          "interpret time interval",
        ),
      ];
      break;
    case "u4-l8":
      items = [
        number(
          `A 160 g sample has half-life ${k} hours. How much remains after ${3 * k} hours?`,
          20,
          "There are 3 half-lives: 160(1/2)³=20 g.",
          "half-life count",
        ),
        number(
          `A population starts at 50 and doubles every ${k} days. Find it after ${4 * k} days.`,
          800,
          "Four doubling intervals give 50×2⁴=800.",
          "doubling time",
        ),
        choice(
          "A sample has half-life 6 h. Which model fits initial mass A₀?",
          "A(t)=A₀(1/2)^(t/6)",
          ["A(t)=A₀(1/2)^(6t)", "A(t)=A₀−t/6", "A(t)=A₀·2^(t/6)"],
          "t/6 counts how many half-lives have elapsed.",
          "fractional periods",
        ),
        number(
          `How many ${k}-hour half-lives pass in ${2.5 * k} hours?`,
          2.5,
          `Elapsed time / half-life = ${2.5 * k}/${k}=2.5.`,
          "continuous decay",
        ),
      ];
      break;
    case "u5-l1":
      items = [
        number(
          `A right triangle has opposite side ${3 * k} and hypotenuse ${5 * k}. Find sin θ.`,
          0.6,
          `sin θ=opposite/hypotenuse=${3 * k}/${5 * k}=3/5.`,
          "SOH",
        ),
        number(
          "If sin θ=3/5, find csc θ.",
          5 / 3,
          "Cosecant is the reciprocal of sine: 5/3.",
          "reciprocal ratio",
        ),
        choice(
          "Which equation uses tangent correctly?",
          "tan θ = opposite / adjacent",
          [
            "tan θ = adjacent / opposite",
            "tan θ = opposite / hypotenuse",
            "tan θ = hypotenuse / adjacent",
          ],
          "Tangent compares the two legs relative to the chosen acute angle.",
          "TOA",
        ),
        number(
          `A right triangle has legs ${3 * k} and ${4 * k}. Find its hypotenuse.`,
          5 * k,
          `Use Pythagoras: √((${3 * k})²+(${4 * k})²)=${5 * k}.`,
          "triangle side lengths",
        ),
      ];
      break;
    case "u5-l2":
      items = [
        number(
          "Find sin 30° exactly.",
          0.5,
          "A 30–60–90 triangle has side ratio 1:√3:2, so sin 30°=1/2.",
          "special triangle",
        ),
        choice(
          "Find cos 45° exactly.",
          "√2/2",
          ["1/2", "√3/2", "√2"],
          "Use the 1:1:√2 triangle: 1/√2=√2/2.",
          "exact value",
        ),
        number(
          "Find tan 45°.",
          1,
          "The opposite and adjacent legs are equal.",
          "tangent exact value",
        ),
        choice(
          "Find sin 60° exactly.",
          "√3/2",
          ["1/2", "√2/2", "√3"],
          "Opposite/hypotenuse in a 30–60–90 triangle is √3/2.",
          "30–60–90 ratio",
        ),
      ];
      break;
    case "u5-l3":
      items = [
        number(
          `The terminal arm passes through (−${3 * k}, ${4 * k}). Find r.`,
          5 * k,
          `r=√(x²+y²)=${5 * k}, always a nonnegative distance.`,
          "radius",
        ),
        number(
          `For the point (−${3 * k}, ${4 * k}) on a terminal arm, find cos θ.`,
          -0.6,
          "cos θ=x/r=−3/5.",
          "coordinate ratio",
        ),
        choice(
          "In Quadrant II, which basic ratio is positive?",
          "Sine",
          ["Cosine", "Tangent", "All three"],
          "y>0 and x<0, while r>0, so sin=y/r is positive.",
          "quadrant signs",
        ),
        number(
          `For (−${3 * k}, ${4 * k}), find tan θ.`,
          -4 / 3,
          "tan θ=y/x=−4/3.",
          "coordinate tangent",
        ),
      ];
      break;
    case "u5-l4":
      items = [
        choice(
          "Solve sin θ=1/2 for 0°≤θ<360°.",
          "30°, 150°",
          ["30°, 330°", "150°, 210°", "30° only"],
          "The reference angle is 30°. Sine is positive in Quadrants I and II.",
          "all solutions",
        ),
        number(
          `Find the reference angle for ${180 + 10 * k}°.`,
          10 * k,
          `In Quadrant III, subtract 180°: ${180 + 10 * k}−180=${10 * k}°.`,
          "reference angle",
        ),
        choice(
          "Where is tangent negative?",
          "Quadrants II and IV",
          ["Quadrants I and III", "Quadrants I and II", "Quadrants III and IV"],
          "Tangent=y/x is negative when x and y have opposite signs.",
          "CAST",
        ),
        number(
          "Find the second solution of cos θ=1/2 in [0°,360°), besides 60°.",
          300,
          "Cosine is also positive in Quadrant IV: 360°−60°=300°.",
          "second angle",
        ),
      ];
      break;
    case "u5-l5":
      items = [
        choice(
          "Which is a Pythagorean identity?",
          "sin²θ + cos²θ = 1",
          ["sin θ + cos θ = 1", "sin²θ − cos²θ = 1", "tan²θ + 1 = sin²θ"],
          "It follows from x²+y²=r² after dividing by r².",
          "fundamental identity",
        ),
        choice(
          "Simplify sin θ / cos θ where defined.",
          "tan θ",
          ["cot θ", "sec θ", "1"],
          "tan θ is defined as sin θ / cos θ, with cos θ≠0.",
          "quotient identity",
        ),
        number(
          "If sin θ=0.6, find cos²θ.",
          0.64,
          "cos²θ=1−sin²θ=1−0.36=0.64.",
          "apply identity",
        ),
        choice(
          "When proving an identity, a reliable approach is to…",
          "rewrite one side until it matches the other on the common domain.",
          [
            "test a single angle.",
            "assume the two sides equal and cancel freely.",
            "solve for one angle.",
          ],
          "An identity needs a general argument, respecting all restrictions.",
          "proof structure",
        ),
      ];
      break;
    case "u5-l6":
      items = [
        choice(
          "Simplify (1−cos²θ)/sin θ where defined.",
          "sin θ",
          ["cos θ", "1", "csc θ"],
          "Use 1−cos²θ=sin²θ, then divide by sin θ, which must be nonzero.",
          "multi-step identity",
        ),
        choice(
          "Simplify sec²θ−tan²θ.",
          "1",
          ["0", "sin²θ", "cos²θ"],
          "Divide sin²θ+cos²θ=1 by cos²θ to obtain tan²θ+1=sec²θ.",
          "derived identity",
        ),
        number(
          "If tan θ=2, find sec²θ.",
          5,
          "sec²θ=1+tan²θ=1+4=5.",
          "apply derived identity",
        ),
        choice(
          "Which restriction is needed for sin²θ/sin θ?",
          "sin θ≠0",
          ["cos θ≠0", "tan θ=0", "No restriction"],
          "The original denominator must not vanish even after cancellation.",
          "identity domain",
        ),
      ];
      break;
    case "u5-l7":
      items = [
        number(
          `In a triangle, A=30°, a=${k} and B=90°. Find b.`,
          2 * k,
          `By sine law b/sin90°=${k}/sin30°, so b=${2 * k}.`,
          "sine law",
        ),
        number(
          `Two sides have lengths ${3 * k} and ${4 * k}, with included angle 90°. Find the third side.`,
          5 * k,
          `c²=(${3 * k})²+(${4 * k})²−2(${3 * k})(${4 * k})cos90°=${25 * k * k}.`,
          "cosine law",
        ),
        choice(
          "Which information can cause the ambiguous case?",
          "Two sides and a non-included angle (SSA)",
          [
            "Three sides (SSS)",
            "Two sides and their included angle (SAS)",
            "Two angles and a side (AAS)",
          ],
          "With SSA, the sine law may produce two supplementary angle candidates. Check their angle sums.",
          "ambiguous case",
        ),
        choice(
          "A=30°, a=7, b=10. How many triangles exist?",
          "Two",
          ["One", "Zero", "Infinitely many"],
          "sin B=10sin30°/7=5/7. B≈45.6° or 134.4°; both leave A+B<180°.",
          "check both triangles",
        ),
      ];
      break;
    case "u5-l8":
      items = [
        number(
          `A box has dimensions ${3 * k}, ${4 * k}, and ${12 * k}. Find its space diagonal.`,
          13 * k,
          `First the base diagonal is ${5 * k}; then √((${5 * k})²+(${12 * k})²)=${13 * k}.`,
          "two right triangles",
        ),
        choice(
          "To find an angle of elevation of a space diagonal above the base, use…",
          "the vertical height and the horizontal base diagonal.",
          [
            "two unrelated edges.",
            "the space diagonal as the opposite side.",
            "the base perimeter.",
          ],
          "Draw the vertical triangle containing the space diagonal; its adjacent leg lies in the base.",
          "choose the plane",
        ),
        number(
          "A 3D right triangle has vertical rise 12 and horizontal distance 5. Find tan of its elevation angle.",
          2.4,
          "tan θ=opposite/adjacent=12/5=2.4.",
          "angle of elevation",
        ),
        choice(
          "When a 3D drawing looks misleading, first…",
          "redraw the relevant 2D triangles and label shared lengths.",
          [
            "measure angles on the image.",
            "assume all visible angles are right.",
            "apply sine law to four points.",
          ],
          "Perspective distorts apparent lengths and angles. Use stated geometry.",
          "diagram interpretation",
        ),
      ];
      break;
    case "u6-l1":
      items = [
        number(
          `A cycle repeats at times ${k}, ${k + 8}, ${k + 16}. Find its period.`,
          8,
          "The time between corresponding points in adjacent cycles is 8.",
          "period",
        ),
        number(
          `A periodic height ranges from ${k} to ${k + 10}. Find its amplitude.`,
          5,
          "Amplitude=(maximum−minimum)/2=10/2=5.",
          "amplitude",
        ),
        number(
          `A periodic height ranges from ${k} to ${k + 10}. Find its midline.`,
          k + 5,
          `Midline=(max+min)/2=(${k + 10}+${k})/2=${k + 5}.`,
          "midline",
        ),
        choice(
          "Which situation is approximately periodic?",
          "Height of a rider on a steadily turning Ferris wheel",
          [
            "A savings balance growing exponentially",
            "A car travelling along a straight highway forever",
            "Total pages read in a book",
          ],
          "The rider’s height repeats after each full revolution.",
          "model periodic behaviour",
        ),
      ];
      break;
    case "u6-l2":
      items = [
        number(
          "Find sin 90°.",
          1,
          "The sine curve has a maximum of 1 at 90°.",
          "sine key point",
        ),
        number(
          "Find cos 180°.",
          -1,
          "The x-coordinate on the unit circle at 180° is −1.",
          "cosine key point",
        ),
        number(
          "What is the period of y=sin x when x is in degrees?",
          360,
          "The values repeat after a complete 360° rotation.",
          "degree period",
        ),
        choice(
          "At x=0°, the graphs y=sin x and y=cos x have outputs…",
          "0 and 1, respectively",
          ["1 and 0", "0 and 0", "1 and 1"],
          "Sine starts at its midline rising, while cosine starts at its maximum.",
          "compare curves",
        ),
      ];
      break;
    case "u6-l3":
      items = [
        number(
          `A curve has maximum ${k + 8} and minimum ${k}. Find amplitude.`,
          4,
          "Amplitude is half the vertical range: 8/2=4.",
          "read amplitude",
        ),
        number(
          `A curve has maximum ${k + 8} and minimum ${k}. Find its midline.`,
          k + 4,
          `Average the extremes: (${k + 8}+${k})/2=${k + 4}.`,
          "read midline",
        ),
        number(
          `Consecutive maxima occur at t=${k} and t=${k + 12}. Find period.`,
          12,
          "Use the gap between consecutive equal-phase features: 12.",
          "read period",
        ),
        choice(
          "If one cycle takes 12 seconds, how long from a maximum to the next minimum?",
          "6 seconds",
          ["3 seconds", "12 seconds", "24 seconds"],
          "A maximum and the next minimum are half a cycle apart.",
          "cycle fractions",
        ),
      ];
      break;
    case "u6-l4":
      items = [
        number(
          `Find the amplitude of y=−${k}sin(2x)+3.`,
          k,
          `Amplitude is |a|=|−${k}|=${k}.`,
          "amplitude sign",
        ),
        number(
          "Find the period of y=sin(2x), with x in degrees.",
          180,
          "Period=360°/|2|=180°.",
          "horizontal factor",
        ),
        number(
          `Find the midline of y=${k}cos(3x)−4. Type y.`,
          -4,
          "The outside constant gives the midline y=−4.",
          "vertical shift",
        ),
        choice(
          "What does a negative coefficient outside sin do?",
          "Reflect the graph in the x-axis before any vertical translation.",
          [
            "Reflect in the y-axis only.",
            "Make the amplitude negative.",
            "Make the period negative.",
          ],
          "Multiplying outputs by −1 reflects their sign. Amplitude is always nonnegative.",
          "reflection",
        ),
      ];
      break;
    case "u6-l5":
      items = [
        number(
          `Find the phase shift of y=2sin(3(x−${k}))+4. Type the rightward shift in degrees.`,
          k,
          `The inside is already k(x−d), with d=${k}.`,
          "phase shift",
        ),
        number(
          "Find the rightward phase shift of y=3cos(2x−60°)+1.",
          30,
          "Factor the inside: 2(x−30°). The shift is 30°, not 60°.",
          "factor inside",
        ),
        choice(
          `Find the range of y=${k}sin(2x)+3.`,
          `${3 - k} ≤ y ≤ ${3 + k}`,
          [`${3} ≤ y ≤ ${3 + k}`, `${-k} ≤ y ≤ ${k}`, "All real y"],
          "Start with −1≤sin≤1, multiply by the amplitude, then shift by 3.",
          "range of sinusoid",
        ),
        number(
          "For y=cos(4x), how far apart are consecutive quarter-cycle key points, in degrees?",
          22.5,
          "Period=360/4=90°. A quarter-period is 90/4=22.5°.",
          "sketch key points",
        ),
      ];
      break;
    case "u6-l6":
      items = [
        choice(
          `A sinusoid has max ${k + 4}, min ${k - 4}, period 180°, and a maximum at x=0°. Choose a model.`,
          `y=4cos(2x)+${k}`,
          [`y=4sin(2x)+${k}`, `y=${k}cos(4x)+2`, `y=4cos(x)+${k}`],
          "Amplitude=4, midline=k, coefficient 360/180=2. Positive cosine starts at a maximum.",
          "model from features",
        ),
        number(
          "A sinusoid has period 120°. Find positive k in y=a sin(kx)+c.",
          3,
          "k=360°/120°=3.",
          "period to coefficient",
        ),
        number(
          `A curve has minimum ${k} and amplitude 3. Find its maximum.`,
          k + 6,
          `The full vertical range is 2×3=6, so max=${k}+6.`,
          "connect extrema",
        ),
        choice(
          "Can the same sinusoidal graph have different correct equations?",
          "Yes; phase shifts and sine/cosine identities allow equivalent models.",
          [
            "No; each graph has one unique formula.",
            "Only if the amplitude is zero.",
            "Only in radians.",
          ],
          "For example, sin x=cos(x−90°). Check a full cycle when comparing models.",
          "non-unique equations",
        ),
      ];
      break;
    case "u6-l7":
      items = [
        number(
          `A wheel has radius ${k} m and centre height ${k + 2} m. Find minimum rider height.`,
          2,
          `Centre minus radius: ${k + 2}−${k}=2 m.`,
          "interpret a physical model",
        ),
        number(
          `A Ferris wheel completes a turn in 40 s. How long from bottom to top?`,
          20,
          "Bottom to top is half a revolution: 40/2=20 s.",
          "elapsed cycle time",
        ),
        choice(
          `A wheel has radius ${k} m, centre height ${k + 2} m, and period 40 s. A rider starts at the bottom. Which height model fits?`,
          `h(t)=−${k}cos(9t)+${k + 2}`,
          [
            `h(t)=${k}cos(9t)+${k + 2}`,
            `h(t)=−${k}cos(40t)+${k + 2}`,
            `h(t)=${k}sin(9t)`,
          ],
          "The negative cosine starts at the minimum. The angular coefficient is 360/40=9 degrees per second.",
          "create a model",
        ),
        choice(
          "Solve 2sin θ+1=2 for 0°≤θ<360°.",
          "30°, 150°",
          ["30°, 330°", "90°", "150°, 210°"],
          "Rearrange to sin θ=1/2 and find both angles in the given interval.",
          "solve in a domain",
        ),
      ];
      break;
    case "u7-l1":
      items = [
        number(
          `Find term 10 of the arithmetic sequence with a₁=${k} and d=3.`,
          k + 27,
          `a₁₀=a₁+(10−1)d=${k}+27=${k + 27}.`,
          "nth term",
        ),
        number(
          `Find the common difference of ${k}, ${k - 4}, ${k - 8}, …`,
          -4,
          "Subtract consecutive terms in order: next minus previous = −4.",
          "common difference",
        ),
        choice(
          `Write a rule for ${k}, ${k + 3}, ${k + 6}, …`,
          `aₙ=${k}+3(n−1)`,
          [`aₙ=${k}+3n`, `aₙ=${k}·3^(n−1)`, `aₙ=${k}−3(n−1)`],
          "Starting from term 1 requires n−1 equal steps.",
          "indexing",
        ),
        number(
          `How many terms are in ${k}, ${k + 2}, …, ${k + 18}?`,
          10,
          `Solve ${k}+2(n−1)=${k + 18}: n−1=9, so n=10.`,
          "count terms",
        ),
      ];
      break;
    case "u7-l2":
      items = [
        number(
          `Find term 5 if a₁=${k} and r=2.`,
          16 * k,
          `a₅=${k}·2⁴=${16 * k}.`,
          "geometric nth term",
        ),
        number(
          `Find the common ratio of ${k}, ${-2 * k}, ${4 * k}, …`,
          -2,
          "Divide a term by its predecessor: (−2k)/k=−2.",
          "negative ratio",
        ),
        choice(
          `Which rule fits ${k}, ${2 * k}, ${4 * k}, …?`,
          `aₙ=${k}·2^(n−1)`,
          [`aₙ=${k}+2(n−1)`, `aₙ=${k}·2^n`, `aₙ=${k}·2^(n+1)`],
          "a₁ is k and there are n−1 multiplications by 2.",
          "explicit rule",
        ),
        number(
          "Find term 4 of 80,40,20,…",
          10,
          "The ratio is 1/2; 80(1/2)³=10.",
          "fractional ratio",
        ),
      ];
      break;
    case "u7-l3":
      items = [
        number(
          `Find the sum of the first 10 terms if a₁=${k}, d=2.`,
          10 * (k + 9),
          `S₁₀=10/2[2(${k})+9(2)]=${10 * (k + 9)}.`,
          "arithmetic sum",
        ),
        number(
          "Find 1+2+…+20.",
          210,
          "Pair first and last: S₂₀=20(1+20)/2=210.",
          "pair terms",
        ),
        choice(
          "What is the difference between aₙ and Sₙ?",
          "aₙ is one term; Sₙ is the sum of the first n terms.",
          [
            "Both represent the same number.",
            "aₙ is always larger.",
            "Sₙ is the common difference.",
          ],
          "A sequence lists terms; a series adds them.",
          "term versus sum",
        ),
        number(
          `A theatre has 5 rows, starting at ${10 + k} seats and increasing by 2 per row. How many seats?`,
          5 * (14 + k),
          `Last row has ${18 + k}. Sum=5(${10 + k}+${18 + k})/2=${5 * (14 + k)}.`,
          "series application",
        ),
      ];
      break;
    case "u7-l4":
      items = [
        number(
          `Find the sum of ${k}+${2 * k}+${4 * k}+${8 * k}.`,
          15 * k,
          `S₄=${k}(2⁴−1)/(2−1)=${15 * k}.`,
          "finite geometric sum",
        ),
        number(
          "Find the sum of 80+40+20+10.",
          150,
          "S₄=80(1−(1/2)⁴)/(1−1/2)=150.",
          "decreasing series",
        ),
        choice(
          "If r=1, how do you sum n equal terms a₁?",
          "Sₙ=na₁",
          ["Use a₁(rⁿ−1)/(r−1) directly.", "The sum is undefined.", "Sₙ=a₁ⁿ."],
          "The usual quotient gives 0/0 at r=1; simply add n copies.",
          "special case",
        ),
        number(
          `A plan saves $${k} the first week, doubles weekly, and runs 5 weeks. Find total saved.`,
          31 * k,
          `Sum=${k}(1+2+4+8+16)=${31 * k}.`,
          "series context",
        ),
      ];
      break;
    case "u7-l5":
      items = [
        number(
          `a₁=${k}, aₙ=aₙ₋₁+3. Find a₄.`,
          k + 9,
          `Three steps from a₁ to a₄ add 9.`,
          "generate recursively",
        ),
        number(
          "a₁=2, aₙ=3aₙ₋₁−1. Find a₃.",
          14,
          "a₂=3(2)−1=5, then a₃=3(5)−1=14.",
          "non-arithmetic recurrence",
        ),
        choice(
          "Why does a recurrence need an initial value?",
          "It tells us where to start applying the rule.",
          [
            "It sets every term equal.",
            "It makes the sequence finite.",
            "It always sets the ratio.",
          ],
          "Different starting values can create different sequences with the same recurrence.",
          "initial condition",
        ),
        choice(
          `An explicit rule for a₁=${k}, aₙ=2aₙ₋₁ is…`,
          `aₙ=${k}·2^(n−1)`,
          [`aₙ=${k}+2(n−1)`, `aₙ=2${k}n`, `aₙ=${k}·2^n`],
          "Repeatedly multiply the starting term by 2, n−1 times.",
          "recursive to explicit",
        ),
      ];
      break;
    case "u7-l6":
      items = [
        number(
          "Find the coefficient of x² in (x+1)⁴.",
          6,
          "Pascal row 4 is 1,4,6,4,1. The x² coefficient is 6.",
          "Pascal coefficients",
        ),
        number(
          `Find the coefficient of x² in (x+${k})³.`,
          3 * k,
          `Expand x³+3x²(${k})+3x(${k})²+${k}³; the coefficient is ${3 * k}.`,
          "binomial coefficient",
        ),
        choice(
          "Expand (x−2)³.",
          "x³−6x²+12x−8",
          ["x³−8", "x³−6x²−12x−8", "x³+6x²+12x+8"],
          "Use coefficients 1,3,3,1 and the signed powers of −2.",
          "binomial signs",
        ),
        number(
          `What is the constant term in (x+${k})³?`,
          k ** 3,
          `Choose the constant in every factor: ${k}³=${k ** 3}.`,
          "constant term",
        ),
      ];
      break;
    case "u7-l7":
      items = [
        number(
          `Find simple interest on $1000 at ${k}% per year for 2 years.`,
          20 * k,
          `I=Prt=1000(${k}/100)(2)=${20 * k}.`,
          "simple interest",
        ),
        number(
          "Find total value of $500 at 4% simple interest for 3 years.",
          560,
          "Interest=500(0.04)(3)=60. Add principal to obtain $560.",
          "amount versus interest",
        ),
        number(
          "Convert 9 months to years.",
          0.75,
          "9/12=0.75 years.",
          "time units",
        ),
        choice(
          "With simple interest, each period’s interest is calculated on…",
          "the original principal.",
          [
            "the growing balance.",
            "the previous interest alone.",
            "the future value.",
          ],
          "I=Prt uses a fixed principal.",
          "simple versus compound",
        ),
      ];
      break;
    case "u7-l8":
      items = [
        number(
          "Find the future value of $1000 at 10% compounded annually for 2 years.",
          1210,
          "A=1000(1.10)²=$1210.",
          "compound value",
          0.005,
        ),
        number(
          "Find the principal that becomes $1210 after 2 years at 10% compounded annually.",
          1000,
          "P=1210/(1.10)²=$1000.",
          "present value",
          0.005,
        ),
        number(
          "A nominal annual rate of 6% compounds monthly. Give the monthly rate as a decimal.",
          0.005,
          "0.06/12=0.005 per month.",
          "periodic rate",
        ),
        number(
          `How many monthly compounding periods occur in ${k} years?`,
          12 * k,
          `n=12×${k}=${12 * k}.`,
          "number of periods",
        ),
      ];
      break;
    case "u7-l9":
      items = [
        number(
          "Deposit $100 at the end of each year for 3 years at 10% annually. Find the balance just after deposit 3.",
          331,
          "The deposits grow for 2,1,0 years: 100(1.1)²+100(1.1)+100=331.",
          "ordinary annuity",
          0.005,
        ),
        number(
          "Find the present value of $110 paid at the end of each of the next 2 years, discounted at 10%. Round to cents.",
          190.91,
          "PV=110/1.1+110/1.1²=190.909… → $190.91.",
          "annuity present value",
          0.005,
        ),
        choice(
          "An ordinary annuity makes payments…",
          "at the end of each payment period.",
          ["at the beginning only.", "at random intervals.", "only once."],
          "Payment timing affects the number of compounding periods.",
          "payment timing",
        ),
        number(
          `At zero interest, ${k} equal deposits of $50 total how much?`,
          50 * k,
          `Without interest, sum the payments: ${k}×50=${50 * k}.`,
          "zero interest case",
        ),
      ];
      break;
    default:
      throw new Error("Missing checks for " + lessonId);
  }
  return items.map((q, i) => ({
    ...q,
    lessonId,
    id: `${lessonId}-${seed}-${i}`,
  }));
}

// Small arithmetic parser: no eval, scripts, variables or implicit multiplication.
export function parseNumber(source: string): number | null {
  const value = source
    .trim()
    .replace(/−/g, "-")
    .replace(/\s/g, "")
    .replace(/,/g, "")
    .replace(/\$/g, "");
  if (!value || !/^[0-9.+\-*/()^]+$/.test(value)) return null;
  let p = 0;
  const primary = (): number => {
    if (value[p] === "(") {
      p++;
      const n = add();
      if (value[p++] !== ")") throw Error();
      return n;
    }
    const m = value.slice(p).match(/^(?:\d+(?:\.\d*)?|\.\d+)/);
    if (!m) throw Error();
    p += m[0].length;
    return Number(m[0]);
  };
  const power = (): number => {
    let n = primary();
    if (value[p] === "^") {
      p++;
      n = n ** unary();
    }
    return n;
  };
  const unary = (): number => {
    if (value[p] === "+") {
      p++;
      return unary();
    }
    if (value[p] === "-") {
      p++;
      return -unary();
    }
    return power();
  };
  const mul = (): number => {
    let n = unary();
    while (value[p] === "*" || value[p] === "/") {
      const op = value[p++],
        v = unary();
      n = op === "*" ? n * v : n / v;
    }
    return n;
  };
  const add = (): number => {
    let n = mul();
    while (value[p] === "+" || value[p] === "-") {
      const op = value[p++],
        v = mul();
      n = op === "+" ? n + v : n - v;
    }
    return n;
  };
  try {
    const n = add();
    return p === value.length && Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}
export const normalize = (v: string) =>
  v
    .toLowerCase()
    .replace(/\s/g, "")
    .replace(/−/g, "-")
    .replace(/≥/g, ">=")
    .replace(/≤/g, "<=")
    .replace(/≠/g, "!=")
    .replace(/[{}]/g, "");
export function correct(q: Check, value: string | number | undefined): boolean {
  if (value === undefined || String(value).trim() === "") return false;
  if (q.choices) return Number(value) === q.answer;
  if (q.numeric !== undefined) {
    const n = parseNumber(String(value));
    return n !== null && Math.abs(n - q.numeric) <= (q.tolerance ?? 0.000001);
  }
  if (q.accepted?.some((a) => normalize(a) === normalize(String(value))))
    return true;
  const n = parseNumber(String(value));
  return (
    n !== null &&
    Boolean(
      q.accepted?.some((a) => {
        const target = parseNumber(a);
        return target !== null && Math.abs(target - n) < 0.000001;
      }),
    )
  );
}
export function expected(q: Check) {
  if (q.choices) return q.choices[q.answer ?? 0];
  if (q.numeric === undefined) return q.accepted?.[0] ?? "See solution";
  if (Number.isInteger(q.numeric)) return String(q.numeric);
  for (let d = 2; d <= 100; d++) {
    const n = q.numeric * d;
    if (Math.abs(n - Math.round(n)) < 1e-9) return `${Math.round(n)}/${d}`;
  }
  return String(q.numeric);
}
