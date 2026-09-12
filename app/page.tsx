"use client";

import { useEffect, useMemo, useState } from "react";

type Resource = { label: string; url: string };
type Lesson = {
  id: string;
  title: string;
  video: string;
  provider: string;
  focus: string[];
  pause: string;
  pitfall: string;
  practice: Resource[];
  solutions?: Resource[];
};
type Unit = {
  id: number;
  title: string;
  kicker: string;
  description: string;
  prerequisites: string;
  source: Resource;
  lessons: Lesson[];
  review: Resource[];
  readiness: string[];
};

const jm = (file: string) => `https://www.jensenmath.ca/s/${file}`;
const page = (unit: number) => `https://www.jensenmath.ca/math11-unit-${unit}`;
const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;

const units: Unit[] = [
  {
    id: 1,
    title: "Introduction to Functions",
    kicker: "THE LANGUAGE OF THE COURSE",
    description: "Relations, notation, domain and range, parent functions, transformations, and inverses. This is the vocabulary every later unit uses.",
    prerequisites: "Grade 10 algebra basics and reading points on a graph.",
    source: { label: "JensenMath Unit 1 hub", url: page(1) },
    lessons: [
      { id: "u1-l1", title: "Relations -> functions", video: "qgRsd_7CWOc", provider: "JensenMath", focus: ["Classify tables, mappings, ordered pairs, and graphs.", "Use the vertical-line test and explain one input -> one output."], pause: "Before each worked example is explained, classify it yourself and name the repeated input or vertical line that proves your answer.", pitfall: "Several inputs may share one output; one input cannot have two outputs.", practice: [{ label: "Lesson practice", url: jm("L1s-11-functions-domain-and-range-3g52.pdf") }, { label: "Unit 1 hub", url: page(1) }], solutions: [{ label: "Worked solutions", url: jm("L1t-11-functions-domain-and-range-dcnn.pdf") }] },
      { id: "u1-l2", title: "Function notation", video: "PtjxcbaH8VM", provider: "JensenMath", focus: ["Read f(x) as an output, not multiplication.", "Evaluate f(a), solve f(x)=k, and substitute expressions such as f(2-x)."], pause: "Pause every time an input is substituted. Write the parentheses before simplifying; then compare your line with the video.", pitfall: "f(2x) means the input is 2x. It is not 2f(x).", practice: [{ label: "Notation practice", url: jm("L2s-12-Function-Notation.pdf") }, { label: "Teacher notes", url: "https://mshavrot.pbworks.com/w/page/104877370/MCR3U%20Functions" }], solutions: [{ label: "Worked solutions", url: jm("L2t-12-Function-Notation-gxy9.pdf") }] },
      { id: "u1-l3", title: "Domain, range, and interval notation", video: "FLGpA8QFYBw", provider: "Ms Havrot", focus: ["Read endpoint inclusion from open and closed circles.", "Write domains and ranges in set, inequality, and interval notation."], pause: "Draw the number line before writing interval notation. Say out loud whether each endpoint is included.", pitfall: "Infinity always uses a parenthesis. It is never included as an endpoint.", practice: [{ label: "Domain/range practice", url: jm("L1s-11-functions-domain-and-range-3g52.pdf") }, { label: "Interval notation sheet", url: jm("Chapter-1-Functions-REVIEW.pdf") }], solutions: [{ label: "Practice solutions", url: jm("L1t-11-functions-domain-and-range-dcnn.pdf") }] },
      { id: "u1-l4", title: "Parent functions and key features", video: "A2Xp6aaFYnw", provider: "Ms Havrot", focus: ["Recognise linear, quadratic, square-root, and reciprocal parents.", "Read intercepts, vertex, asymptotes, and end behaviour from a graph."], pause: "Pause at each new parent. Sketch it from memory and label its domain, range, and one key point.", pitfall: "A parent function is the untransformed reference graph, not the whole family of graphs.", practice: [{ label: "Parent function practice", url: jm("Chapter-1-Unit-Package-student-no-16-mhhd.pdf") }], solutions: [{ label: "Package solutions", url: jm("Chapter-1-Unit-Package-SOLUTIONS-bgyt.pdf") }] },
      { id: "u1-l5", title: "Transformations: the big picture", video: "Q4FzgST6U6Q", provider: "JensenMath", focus: ["Translate, reflect, stretch, and compress a parent function.", "Describe transformations in the correct order."], pause: "For each equation, predict the graph before the video draws it. Record the mapping rule as a check.", pitfall: "Changes inside f(x) affect x horizontally and work in the opposite-looking direction.", practice: [{ label: "Transformations practice", url: jm("Intro-to-Transformations-Worksheet.pdf") }, { label: "Mapping-rule workbook", url: jm("Chapter-2b-WORKBOOK-package-student.pdf") }], solutions: [{ label: "Worksheet solutions", url: jm("Intro-to-Transformations-Worksheet-SOLUTIONS.pdf") }] },
      { id: "u1-l6", title: "Mapping rules and transformed graphs", video: "H-IdTIi7Xr8", provider: "Ms Havrot", focus: ["Move points with a mapping rule.", "Build a transformed table and connect it to the equation."], pause: "Stop after the original point table. Transform every point yourself before checking the mapping.", pitfall: "Horizontal stretch factors are reciprocals in a point mapping; check with two points.", practice: [{ label: "Mapping rules practice", url: jm("Chapter-2b-WORKBOOK-package-student.pdf") }], solutions: [{ label: "Workbook solutions", url: jm("Chapter-2b-Transformations-of-Functions-REVIEW-SOLUTIONS.pdf") }] },
      { id: "u1-l7", title: "Inverse functions", video: "JDnQXEvbWck", provider: "JensenMath", focus: ["Swap x and y, then solve for the inverse.", "Use the horizontal-line test and connect inverse graphs by y=x."], pause: "Find the inverse without the video first. Verify by composing f(f^-1(x)) and checking the reflected graph.", pitfall: "A relation can have an inverse relation without having an inverse function.", practice: [{ label: "Inverse practice", url: jm("26-inverse-of-a-function-worksheet.pdf") }], solutions: [{ label: "Worksheet solutions", url: jm("26-inverse-of-a-function-worksheet-SOLUTIONS.pdf") }] },
    ],
    review: [{ label: "Unit 1 review video", url: yt("Qy94DxRd3Ko") }, { label: "Review questions", url: jm("Chapter-1-Functions-REVIEW.pdf") }, { label: "Review solutions", url: jm("Chapter-1-Functions-REVIEW-solutions.pdf") }],
    readiness: ["I can decide whether a relation is a function and justify it.", "I can evaluate and solve function-notation questions without confusing f(a) with af(x).", "I can state domain and range in interval notation, including restrictions.", "I can sketch a transformed parent and find an inverse when it exists."],
  },
  {
    id: 2,
    title: "Algebraic Expressions",
    kicker: "THE SYMBOLIC TOOLKIT",
    description: "Exponent laws, polynomials, factoring, radicals, and rational expressions. These skills are the machinery underneath quadratics and exponentials.",
    prerequisites: "Grade 10 factoring, distributive property, fractions, and exponent rules.",
    source: { label: "JensenMath Unit 2 hub", url: page(2) },
    lessons: [
      { id: "u2-l1", title: "Exponent laws and rational exponents", video: "Tnwhj_qiOPw", provider: "JensenMath", focus: ["Use product, quotient, power, and zero-exponent laws.", "Translate radicals into rational exponents and back."], pause: "Predict the exponent before the video simplifies. Keep a one-line reason beside every law you use.", pitfall: "A power distributes over multiplication, not over addition: (a+b)^n is not a^n+b^n.", practice: [{ label: "Exponent laws 1", url: jm("33a-Exponent-Laws-Worksheet-1.pdf") }, { label: "Rational exponents", url: jm("L2s-rational-exponents.pdf") }], solutions: [{ label: "Exponent answers", url: jm("33-Exponent-Laws-Worksheet-1-SOLUTIONS.pdf") }] },
      { id: "u2-l2", title: "Collecting like terms and polynomial operations", video: "3EKx3zeC8OU", provider: "Ms Havrot", focus: ["Combine only like terms.", "Add and subtract polynomials by aligning degree and sign."], pause: "Rewrite subtraction as adding the opposite before combining. Check your highest degree and constant term.", pitfall: "x and x^2 are different terms even though both contain x.", practice: [{ label: "Polynomial operations", url: jm("36-adding-and-subtracting-polynomials-worksheet.pdf") }], solutions: [{ label: "Practice answers", url: jm("36-worksheet-solutions.pdf") }] },
      { id: "u2-l3", title: "Multiplying polynomials", video: "dGQ6a3jiLbI", provider: "Ms Havrot", focus: ["Distribute every term and collect like terms.", "Use FOIL as a special case, not a new rule."], pause: "Multiply term-by-term on paper before watching the combination step.", pitfall: "The middle terms can cancel; do not drop them before you combine.", practice: [{ label: "Multiply polynomials", url: jm("Chapter-2-part-1-lesson-package.pdf") }], solutions: [{ label: "Package solutions", url: jm("Chapter-2-part-1-lesson-package-SOLUTIONS.pdf") }] },
      { id: "u2-l4", title: "Factoring: common factors and grouping", video: "M5Q6S29IggE", provider: "JensenMath", focus: ["Factor out the greatest common factor first.", "Recognise grouping and difference of squares patterns."], pause: "Multiply your factorisation back to the original expression before moving on.", pitfall: "A factorisation is not finished if a common factor remains inside a bracket.", practice: [{ label: "Common factoring", url: jm("u3w2s-common-factoring.pdf") }, { label: "Factoring review", url: jm("u3w3s-factoring-quad1.pdf") }], solutions: [{ label: "Common factoring answers", url: jm("u3w2t-common-factoring-plra.pdf") }] },
      { id: "u2-l5", title: "Factoring trinomials", video: "n-GVDng5p9g", provider: "JensenMath", focus: ["Factor x^2+bx+c and ax^2+bx+c.", "Use signs and product-sum checks to catch errors."], pause: "Write the two numbers that multiply to ac and add to b before splitting the middle term.", pitfall: "The signs in the factors must produce both the middle term and the constant.", practice: [{ label: "Trinomial practice", url: jm("u3w3s-factoring-quad1.pdf") }, { label: "Complex trinomials", url: jm("u3w4s-factoring-quad2.pdf") }], solutions: [{ label: "Practice solutions", url: jm("u3w3t-factoring-quad1-yws6.pdf") }] },
      { id: "u2-l6", title: "Radicals and simplifying expressions", video: "twG5TkG8GIM", provider: "JensenMath", focus: ["Simplify radicals by extracting perfect-square factors.", "Multiply, divide, and add radicals only when the terms allow it."], pause: "Simplify every radicand before deciding whether terms are like.", pitfall: "sqrt(a+b) does not equal sqrt(a)+sqrt(b).", practice: [{ label: "Radical expressions", url: jm("L4s-14-radicals.pdf") }], solutions: [{ label: "Radical solutions", url: jm("L4t-14-radicals-f3ps.pdf") }] },
      { id: "u2-l7", title: "Rational expressions: simplify, multiply, divide", video: "mAwa7bnJJEY", provider: "JensenMath", focus: ["Factor before cancelling.", "State restrictions from the original denominators."], pause: "Write restrictions first. Then factor every numerator and denominator before cancelling.", pitfall: "Cancelling terms across addition is invalid: (x+2)/x cannot cancel x.", practice: [{ label: "Rational expressions", url: jm("L3s-multiplying-and-dividing-rational-expressions.pdf") }], solutions: [{ label: "Lesson solutions", url: jm("L3t-multiplying-and-dividing-rational-expressions.pdf") }] },
      { id: "u2-l8", title: "Rational expressions: add and subtract", video: "1hQjmCk7TtQ", provider: "JensenMath", focus: ["Find the least common denominator.", "Combine numerators, factor, and state restrictions."], pause: "Build the LCD yourself and rewrite each numerator before watching the combine step.", pitfall: "The LCD is a common multiple of the entire denominators, not just their visible constants.", practice: [{ label: "Add and subtract", url: jm("L4s-add-and-subtract-rational-expressions.pdf") }], solutions: [{ label: "Lesson solutions", url: jm("L4t-add-and-subtract-rational-expressions.pdf") }] },
    ],
    review: [{ label: "Unit 2 hub and workbook", url: page(2) }, { label: "Review package", url: jm("Chapter-2a-Rational-Expressions-REVIEW.pdf") }, { label: "Review solutions", url: jm("Chapter-2a-Rational-Expressions-REVIEW-SOLUTIONS.pdf") }],
    readiness: ["I can simplify an algebraic expression while showing the law or factoring pattern used.", "I can factor and verify by multiplication.", "I can simplify rational expressions and state every excluded value.", "I can add rational expressions using an LCD without losing restrictions."],
  },
  {
    id: 3,
    title: "Quadratic Functions",
    kicker: "THE PARABOLA UNIT",
    description: "Move between standard, vertex, and factored forms; solve quadratic equations; interpret roots, vertex, discriminant, and systems.",
    prerequisites: "Unit 2 factoring and completing the square, plus graphing from Unit 1.",
    source: { label: "JensenMath Unit 3 hub", url: page(3) },
    lessons: [
      { id: "u3-l1", title: "Quadratic features and forms", video: "iz1US34cW9U", provider: "JensenMath", focus: ["Identify direction, axis, vertex, intercepts, and maximum/minimum.", "Choose standard, vertex, or factored form for the question."], pause: "Given each form, predict which features are immediate before the video translates it.", pitfall: "The axis of symmetry passes through the vertex; it is not the y-coordinate of the vertex.", practice: [{ label: "Intro to quadratics", url: jm("u4w1-intro-to-quadratics-2nst.pdf") }], solutions: [{ label: "Lesson solutions", url: jm("u4w1t-intro-to-quadratics-bpnw.pdf") }] },
      { id: "u3-l2", title: "Vertex form and maximum/minimum", video: "ajBJf1scjyY", provider: "JensenMath", focus: ["Read the vertex from y=a(x-h)^2+k.", "Interpret a, h, and k in context."], pause: "State the vertex, opening, and range from each equation before graphing.", pitfall: "The sign inside (x-h) is opposite the horizontal shift: x+3 means h=-3.", practice: [{ label: "Vertex form practice", url: jm("u4w2-vertex-form.pdf") }], solutions: [{ label: "Practice solutions", url: jm("u4w2t-vertex-form-n77l.pdf") }] },
      { id: "u3-l3", title: "Solve by factoring", video: "vCkzG0_E0CM", provider: "JensenMath", focus: ["Set the quadratic equal to zero.", "Use the zero-product property and verify both roots."], pause: "Factor and solve before watching the final line. Substitute both roots into the original equation.", pitfall: "The zero-product property requires a product equal to zero; do not apply it to a sum.", practice: [{ label: "Factoring quadratics", url: jm("L5s-15-solve-quadratics-by-factoring.pdf") }], solutions: [{ label: "Practice solutions", url: jm("L5t-15-solve-quadratics-by-factoring.pdf") }] },
      { id: "u3-l4", title: "Complete the square", video: "0PJ0wAPQJRo", provider: "JensenMath", focus: ["Convert standard form to vertex form.", "Use completing the square to solve when factoring is awkward."], pause: "Add and subtract the needed constant yourself, remembering that the balance must stay equal.", pitfall: "When the x coefficient is not 1, factor it before completing the square.", practice: [{ label: "Completing the square", url: jm("u4l3s-completing-square-dasb.pdf") }], solutions: [{ label: "Lesson solutions", url: jm("u4l3t-completing-square.pdf") }] },
      { id: "u3-l5", title: "Quadratic formula", video: "Ur3GLETKaNo", provider: "JensenMath", focus: ["Substitute a, b, c carefully.", "Use the discriminant to anticipate the number of real roots."], pause: "Circle a, b, c in the equation before substituting. Keep the entire numerator over 2a.", pitfall: "b includes its sign. For x^2-6x+1, b=-6.", practice: [{ label: "Quadratic formula practice", url: jm("L6s-15-solve-using-QF.pdf") }], solutions: [{ label: "Practice solutions", url: jm("L6t-15-solve-using-QF.pdf") }] },
      { id: "u3-l6", title: "Discriminant and applications", video: "xDhSMwBS4JY", provider: "Ms Havrot", focus: ["Use b^2-4ac to classify roots.", "Translate perimeter, area, and projectile situations into quadratics."], pause: "Write the equation and define the variable before reaching for a formula.", pitfall: "A negative discriminant means no real x-intercepts, not no algebraic solution at all.", practice: [{ label: "Quadratic applications", url: "https://www.jensenmath.ca/math11-unit-3" }], solutions: [{ label: "Unit review hub", url: page(3) }] },
      { id: "u3-l7", title: "Linear-quadratic systems", video: "NnZ65skFlAk", provider: "JensenMath", focus: ["Solve a line and parabola intersection by substitution.", "Interpret zero, one, or two intersection points."], pause: "Substitute and solve the quadratic before looking at the graph. Then match roots to points.", pitfall: "A root gives an x-coordinate; use the original line or quadratic to find y.", practice: [{ label: "Linear-quadratic systems", url: jm("L8s-17-lin-quad-system.pdf") }], solutions: [{ label: "Lesson solutions", url: jm("L8t-17-lin-quad-system.pdf") }] },
    ],
    review: [{ label: "Unit review video", url: yt("Qy94DxRd3Ko") }, { label: "Unit 3 hub", url: page(3) }, { label: "Quadratic review", url: "https://www.jensenmath.ca/math11-unit-3" }],
    readiness: ["I can choose a useful quadratic form and read its key features.", "I can solve by factoring, completing the square, or the quadratic formula and justify the choice.", "I can use the discriminant and interpret the result.", "I can model and solve a quadratic application, then reject impossible roots."],
  },
  {
    id: 4,
    title: "Exponential Functions",
    kicker: "GROWTH, DECAY, AND CHANGE",
    description: "Build, transform, solve, and interpret exponential models, including growth/decay, compound interest, and half-life or doubling-time contexts.",
    prerequisites: "Exponent laws from Unit 2 and reading transformations from Unit 1.",
    source: { label: "JensenMath Unit 4 hub", url: page(4) },
    lessons: [
      { id: "u4-l1", title: "Exponential growth", video: "b7x5dPhdtoE", provider: "JensenMath", focus: ["Recognise a constant multiplicative change.", "Build y=a(b)^x from a starting value and growth factor."], pause: "Write the recursive pattern before converting it to an equation.", pitfall: "A 6% increase uses 1.06, not 0.06, as the multiplier.", practice: [{ label: "Exponential growth practice", url: page(4) }, { label: "Lourdes unit pack", url: "https://lourdesmath.weebly.com/unit-4---exponential-functions" }] },
      { id: "u4-l2", title: "Exponential decay", video: "OQx4XQWEsB8", provider: "JensenMath", focus: ["Model a constant percentage decrease.", "Interpret a multiplier between 0 and 1."], pause: "Turn each percent decrease into a multiplier before watching.", pitfall: "A decay factor is positive but less than 1; do not use a negative base for ordinary models.", practice: [{ label: "Exponential decay practice", url: "https://lourdesmath.weebly.com/unit-4---exponential-functions" }] },
      { id: "u4-l3", title: "Compound interest", video: "PHs_7MSGssI", provider: "JensenMath", focus: ["Use A=P(1+i)^n and identify i and n.", "Convert annual rate and time to the compounding period."], pause: "Write i=r/N and n=Nt beside the formula before substituting.", pitfall: "The number of compounding periods and the rate per period must match.", practice: [{ label: "Unit 4 practice hub", url: page(4) }, { label: "Financial math extension", url: "https://lourdesmath.weebly.com/unit-8---financial-mathematics.html" }] },
      { id: "u4-l4", title: "Properties and equations", video: "wfj81FhUdtI", provider: "JensenMath", focus: ["Compare domain, range, intercept, asymptote, and end behaviour.", "Solve exponential equations when bases can be matched."], pause: "List the graph features before trying to solve the equation.", pitfall: "The horizontal asymptote is y=0 only when there is no vertical translation.", practice: [{ label: "Properties practice", url: "https://lourdesmath.weebly.com/unit-4---exponential-functions" }] },
      { id: "u4-l5", title: "Transformations of exponentials", video: "RoMMs_Zg3nM", provider: "JensenMath", focus: ["Read y=a b^{k(x-d)}+c.", "Connect each parameter to a graph change."], pause: "Make a five-point sketch using the parent before checking the transformed graph.", pitfall: "The horizontal scale is 1/|k|, not |k|.", practice: [{ label: "Transformations practice", url: "https://lourdesmath.weebly.com/unit-4---exponential-functions" }] },
      { id: "u4-l6", title: "Solve exponential equations", video: "AKyb4Y4k0ks", provider: "JensenMath", focus: ["Match bases when possible.", "Use a graph or logarithm extension when bases cannot be matched."], pause: "Try rewriting each side with the same base first; only then use a calculator or logarithm.", pitfall: "Do not equate exponents until the bases are truly equal and valid.", practice: [{ label: "Solving and tables", url: "https://lourdesmath.weebly.com/unit-4---exponential-functions" }] },
      { id: "u4-l7", title: "Growth, decay, half-life, and doubling time", video: "91O3vKGigDE", provider: "JensenMath", focus: ["Define variables with units.", "Use a model to answer a question about time, amount, or rate."], pause: "Write what t=0 means and include units in your final answer.", pitfall: "Half-life is not half the multiplier per year unless the time interval is one year.", practice: [{ label: "Applications practice", url: "https://lourdesmath.weebly.com/unit-4---exponential-functions" }] },
    ],
    review: [{ label: "Unit 4 review hub", url: page(4) }, { label: "Ontario-aligned exponential review", url: "https://lourdesmath.weebly.com/unit-4---exponential-functions" }, { label: "Full course review", url: "https://www.jensenmath.ca/math11-review" }],
    readiness: ["I can build an exponential model from a starting amount and percent change.", "I can read and sketch key features and transformations.", "I can solve exponential equations and check with substitution or a graph.", "I can explain what every variable means in a growth, decay, or interest model."],
  },
  {
    id: 5,
    title: "Trigonometric Ratios",
    kicker: "TRIG GEOMETRY",
    description: "Special triangles, all-quadrant ratios, reciprocal ratios, equations, identities, and the sine/cosine laws. Trig is taught in a careful ladder because each layer depends on the previous one.",
    prerequisites: "Right-triangle vocabulary, Pythagorean theorem, and a scientific calculator in degree mode.",
    source: { label: "JensenMath Unit 5 hub", url: page(5) },
    lessons: [
      { id: "u5-l1", title: "Special angles and exact values", video: "b7x5dPhdtoE", provider: "JensenMath", focus: ["Build 30-60-90 and 45-45-90 triangles.", "Use exact values instead of decimal approximations."], pause: "Derive the triangle ratios before memorising them, then test 0, 30, 45, 60, and 90 degrees.", pitfall: "Do not switch calculator modes when an exact-value question asks for a fraction or radical.", practice: [{ label: "Special angles", url: jm("Special-Angles-1-worksheet.pdf") }, { label: "Second practice set", url: jm("Special-Angles-2-worksheet.pdf") }], solutions: [{ label: "Special-angle solutions", url: jm("Special-Angles-1-worksheet-SOLUTIONS.pdf") }] },
      { id: "u5-l2", title: "Ratios beyond 90 degrees", video: "OQx4XQWEsB8", provider: "JensenMath", focus: ["Place angles in standard position.", "Use CAST/signs and related acute angles for 0 to 360 degrees."], pause: "Draw the quadrant and related angle before calculating any ratio.", pitfall: "The related acute angle is not the principal angle; use the quadrant to restore the sign.", practice: [{ label: "Angles greater than 90", url: jm("W2s-ratios-for-angles-greater-than-90.pdf") }], solutions: [{ label: "Practice solutions", url: jm("W2t-ratios-for-angles-greater-than-90.pdf") }] },
      { id: "u5-l3", title: "Solve trig equations on 0 to 360", video: "PHs_7MSGssI", provider: "JensenMath", focus: ["Find the reference angle.", "Use quadrant signs to list every solution in the interval."], pause: "Write the reference angle and all possible quadrants before using the calculator.", pitfall: "A calculator's inverse-trig output is only the principal angle; it is not the complete answer.", practice: [{ label: "Trig equations", url: jm("W3s-solving-trig-equations.pdf") }], solutions: [{ label: "Practice solutions", url: jm("W3t-solving-trig-equations.pdf") }] },
      { id: "u5-l4", title: "Reciprocal ratios", video: "wfj81FhUdtI", provider: "JensenMath", focus: ["Use sec, csc, and cot as reciprocals.", "Find exact and approximate values from a point or ratio."], pause: "Rewrite every reciprocal ratio as sin, cos, or tan before solving.", pitfall: "sec(theta) is 1/cos(theta), not 1/sin(theta).", practice: [{ label: "Reciprocal ratios", url: jm("W4s-reciprocal-trig-ratios.pdf") }], solutions: [{ label: "Practice solutions", url: jm("W4t-reciprocal-trig-ratios.pdf") }] },
      { id: "u5-l5", title: "Sine and cosine law in 2D and 3D", video: "RoMMs_Zg3nM", provider: "JensenMath", focus: ["Choose sine law, cosine law, or right-triangle ratios from the information given.", "Draw and label a diagram before calculating."], pause: "Name the known side-angle pair and decide which law fits before watching the setup.", pitfall: "The largest side is opposite the largest angle; use that check to catch a wrong diagram.", practice: [{ label: "Problems in 2 and 3 dimensions", url: jm("W5s-problems-in-2-dimensions.pdf") }], solutions: [{ label: "Practice solutions", url: jm("W5t-problems-in-2-dimensions.pdf") }] },
      { id: "u5-l6", title: "Ambiguous case of the sine law", video: "AKyb4Y4k0ks", provider: "JensenMath", focus: ["Detect zero, one, or two possible triangles.", "Report both valid solutions and reject impossible angles."], pause: "Sketch the two possible triangles before calculating the second angle.", pitfall: "The inverse sine gives one angle; the supplementary angle may also fit.", practice: [{ label: "Ambiguous case", url: jm("W6s-ambiguous-case-of-sine.pdf") }], solutions: [{ label: "Ambiguous-case solutions", url: jm("Ambiguous-case-of-sine-worksheet-SOLUTIONS.pdf") }] },
      { id: "u5-l7", title: "Trig identities and verification", video: "91O3vKGigDE", provider: "JensenMath", focus: ["Use reciprocal and Pythagorean identities.", "Prove an identity by changing one side at a time."], pause: "Choose the more complicated side and write the identity that moves it toward the other side.", pitfall: "An identity is true for all permitted values; checking one angle is not a proof.", practice: [{ label: "Identity worksheet 1", url: jm("46-trig-identities-worksheet-1.pdf") }, { label: "Identity worksheet 2", url: jm("46-trig-identities-worksheet-2.pdf") }], solutions: [{ label: "Identity solutions", url: jm("46-trig-identities-worksheet-1-SOLUTIONS.pdf") }] },
    ],
    review: [{ label: "Unit 5 review", url: page(5) }, { label: "Trig geometry workbook", url: jm("Chapter-5-Trig-Functions-Review.pdf") }, { label: "Full course review", url: "https://www.jensenmath.ca/math11-review" }],
    readiness: ["I can give exact special-angle values and use degree mode correctly.", "I can solve every trig equation on 0 to 360 degrees with all valid answers.", "I can select and apply a triangle law from a labelled diagram.", "I can explain why an ambiguous case has zero, one, or two solutions and prove a basic identity."],
  },
  {
    id: 6,
    title: "Sinusoidal Functions",
    kicker: "MODELLING PERIODIC CHANGE",
    description: "Read periodic behaviour, graph sine and cosine, reverse-engineer equations, and model real cycles with amplitude, period, phase shift, and midline.",
    prerequisites: "Unit 5 trig ratios, transformations from Unit 1, and a graphing calculator or Desmos.",
    source: { label: "JensenMath Unit 6 hub", url: page(6) },
    lessons: [
      { id: "u6-l1", title: "Periodic behaviour", video: "oWuEVzdAF3k", provider: "JensenMath", focus: ["Identify cycle, period, amplitude, and midline from a context.", "Connect repeated data to a sinusoidal graph."], pause: "Describe one full cycle in words before looking at the equation.", pitfall: "The period is one cycle length, not the distance from a maximum to a minimum.", practice: [{ label: "Periodic behaviour", url: jm("51-periodic-behaviour-worksheet.pdf") }], solutions: [{ label: "Practice solutions", url: jm("51-periodic-behaviour-worksheet-SOLUTIONS.pdf") }] },
      { id: "u6-l2", title: "Graphing sine and cosine", video: "l1zog6IP9LA", provider: "JensenMath", focus: ["Use the five key points over one cycle.", "Compare sine and cosine starting positions."], pause: "Mark the quarter-period points before connecting the curve.", pitfall: "Amplitude is a distance from the midline, so it is always nonnegative.", practice: [{ label: "Graphing practice", url: jm("Graphing-Sine-and-Cosine-Functions-Worksheet.pdf") }], solutions: [{ label: "Graphing solutions", url: jm("Graphing-Sine-and-Cosine-Functions-Worksheet-SOLUTIONS.pdf") }] },
      { id: "u6-l3", title: "Equation to transformed graph", video: "nzGnlvWZ2Rg", provider: "JensenMath", focus: ["Read a, k, d, and c from y=a sin(k(x-d))+c.", "Graph one complete cycle accurately."], pause: "Fill in amplitude, period, phase shift, and midline before plotting.", pitfall: "Period is 360/|k| in degree mode; it is not 360|k|.", practice: [{ label: "Transformations set 1", url: jm("53-transformations-of-sine-and-cosine-worksheet-1.pdf") }], solutions: [{ label: "Set 1 solutions", url: jm("53-transformations-of-sine-and-cosine-worksheet-1-SOLUTIONS.pdf") }] },
      { id: "u6-l4", title: "Graph to equation", video: "dPNcPTnmuZw", provider: "JensenMath", focus: ["Find midline and amplitude from extrema.", "Use a maximum or minimum to choose sine/cosine and phase shift."], pause: "Read the four parameters from the graph before checking the equation.", pitfall: "A graph can have many equivalent equations; verify with a key point.", practice: [{ label: "Transformations set 2", url: jm("53-transformations-of-sine-and-cosine-worksheet-2.pdf") }], solutions: [{ label: "Set 2 solutions", url: jm("53-transformations-of-sine-and-cosine-worksheet-2-SOLUTIONS.pdf") }] },
      { id: "u6-l5", title: "Sinusoidal applications", video: "_ZcxZozR31M", provider: "JensenMath", focus: ["Define time and output variables with units.", "Interpret max, min, midline, and phase in a real situation."], pause: "Write the context sentence for every parameter before calculating.", pitfall: "A positive time origin and a chosen starting position determine the phase shift.", practice: [{ label: "Trig applications", url: jm("55-ls-Trig-applications-part-1.pdf") }], solutions: [{ label: "Teacher example", url: jm("55-lt-Trig-applications-part-1.pdf") }] },
      { id: "u6-l6", title: "Sinusoidal modelling and solving", video: "vA9cXLhgRz8", provider: "JensenMath", focus: ["Build a model from data or a graph.", "Solve for times when a target value is reached."], pause: "Sketch the cycle and mark the target line before solving.", pitfall: "A target height may occur twice in a cycle; report every time in the requested interval.", practice: [{ label: "Unit 6 hub and review", url: page(6) }, { label: "Application worksheet 2", url: jm("55-Trig-applications-worksheet-2.pdf") }] },
    ],
    review: [{ label: "Unit 6 review", url: page(6) }, { label: "Full course review", url: "https://www.jensenmath.ca/math11-review" }],
    readiness: ["I can read amplitude, period, midline, and phase shift from a graph or equation.", "I can draw one accurate cycle with labelled key points.", "I can create a sinusoidal model from a context and explain every parameter.", "I can solve a target-value question and include all times in the required interval."],
  },
  {
    id: 7,
    title: "Discrete Functions",
    kicker: "SEQUENCES, SERIES, AND FINANCE",
    description: "Arithmetic and geometric sequences, series, recursion, Pascal's triangle, and the financial mathematics block that commonly follows in Ontario MCR3U texts.",
    prerequisites: "Exponent laws, algebraic rearranging, and comfort with a scientific calculator.",
    source: { label: "JensenMath Unit 7 hub", url: page(7) },
    lessons: [
      { id: "u7-l1", title: "Arithmetic and geometric sequences", video: "-_myO_Lmdbw", provider: "JensenMath", focus: ["Find common difference or ratio.", "Use a_n=a_1+(n-1)d and a_n=a_1r^(n-1)."], pause: "Classify the pattern and write the recursive rule before using the explicit formula.", pitfall: "A common difference adds; a common ratio multiplies. Do not swap d and r.", practice: [{ label: "Sequence lesson and practice", url: "https://lourdesmath.weebly.com/unit-7---sequences--series.html" }] },
      { id: "u7-l2", title: "Arithmetic and geometric series", video: "JtnMrqsA9Io", provider: "JensenMath", focus: ["Distinguish a sequence from its sum.", "Use finite arithmetic and geometric series formulas."], pause: "Write the first and last terms and count n before substituting.", pitfall: "The number of terms is not automatically the last term's value.", practice: [{ label: "Series practice", url: "https://lourdesmath.weebly.com/unit-7---sequences--series.html" }] },
      { id: "u7-l3", title: "More sequences: modelling and finding n", video: "5W_kr8KsffA", provider: "JensenMath", focus: ["Solve for a missing term, index, or parameter.", "Translate a word pattern into a discrete model."], pause: "Define what n represents and test the formula at n=1.", pitfall: "Indexing starts where the question says it starts; do not assume n=0 or n=1.", practice: [{ label: "Sequence workbook", url: page(7) }] },
      { id: "u7-l4", title: "Recursive definitions", video: "dLPs0-G_Hkg", provider: "JensenMath", focus: ["Read a first term and recurrence together.", "Generate terms and convert between recursive and explicit descriptions."], pause: "Generate the first five terms yourself, then compare each transition.", pitfall: "A recurrence without its initial value is incomplete.", practice: [{ label: "Recursion worksheet", url: "https://lourdesmath.weebly.com/unit-7---sequences--series.html" }] },
      { id: "u7-l5", title: "Pascal's triangle and binomial coefficients", video: "MwFxofHwr2g", provider: "JensenMath", focus: ["Generate rows and identify symmetry.", "Use coefficients to expand binomials and count combinations."], pause: "Build the row before using it in an expansion; check the powers add to n.", pitfall: "The row number and the exponent are linked, but the first row is often numbered 0.", practice: [{ label: "Pascal and binomial practice", url: "https://lourdesmath.weebly.com/unit-7---sequences--series.html" }] },
      { id: "u7-l6", title: "Simple and compound interest", video: "4BNQK9vz-gU", provider: "Lourdes Mathematics", focus: ["Use I=Prt and A=P(1+i)^n.", "Match rate and number of periods to the compounding schedule."], pause: "Write P, r, t, N, i, and n with units before calculating.", pitfall: "A percent must become a decimal, and the period rate must match n.", practice: [{ label: "Financial mathematics lessons", url: "https://lourdesmath.weebly.com/unit-8---financial-mathematics.html" }] },
      { id: "u7-l7", title: "Future and present value of annuities", video: "7ZGPfLJMhU4", provider: "Lourdes Mathematics", focus: ["Recognise an annuity as equal payments at regular intervals.", "Use the future- and present-value formulas and identify the payment interval."], pause: "Draw the cash-flow timeline and label payment number, rate per period, and n.", pitfall: "An annuity is not the same as a one-time compound-interest deposit.", practice: [{ label: "Annuity lessons and practice", url: "https://lourdesmath.weebly.com/unit-8---financial-mathematics.html" }] },
      { id: "u7-l8", title: "Mortgages and mixed finance review", video: "ZMhV_KdP1Yk", provider: "Lourdes Mathematics", focus: ["Interpret loan and payment variables.", "Choose the correct financial model and check the reasonableness of an answer."], pause: "Estimate the scale of the answer before using a calculator or TVM solver.", pitfall: "A payment frequency, compounding frequency, and quoted rate must be converted consistently.", practice: [{ label: "Finance review", url: "https://lourdesmath.weebly.com/unit-8---financial-mathematics.html" }, { label: "Full course review", url: "https://www.jensenmath.ca/math11-review" }] },
    ],
    review: [{ label: "Unit 7 review hub", url: page(7) }, { label: "Sequences and series practice", url: "https://lourdesmath.weebly.com/unit-7---sequences--series.html" }, { label: "Financial mathematics practice", url: "https://lourdesmath.weebly.com/unit-8---financial-mathematics.html" }],
    readiness: ["I can tell whether a pattern is arithmetic, geometric, recursive, or neither.", "I can find a term or sum and explain what n means.", "I can move between a context, a recurrence, and an explicit formula.", "I can model simple interest, compound interest, and annuities with consistent periods and units."],
  },
];

export default function Home() {
  const [activeUnitId, setActiveUnitId] = useState(1);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [syncState, setSyncState] = useState<"loading" | "synced" | "local">("loading");
  const activeUnit = units.find((unit) => unit.id === activeUnitId) ?? units[0];
  const activeLesson = activeUnit.lessons[activeLessonIndex] ?? activeUnit.lessons[0];
  const totalLessons = useMemo(() => units.reduce((sum, unit) => sum + unit.lessons.length, 0), []);
  const completeCount = useMemo(() => units.reduce((sum, unit) => sum + unit.lessons.filter((lesson) => progress[lesson.id]).length, 0), [progress]);
  const unitComplete = activeUnit.lessons.filter((lesson) => progress[lesson.id]).length;

  useEffect(() => {
    try {
      const cached = localStorage.getItem("function-room-progress");
      if (cached) setProgress(JSON.parse(cached) as Record<string, boolean>);
    } catch { /* no-op */ }
    setSyncState("local");
  }, []);

  function saveProgress(next: Record<string, boolean>) {
    setProgress(next);
    try { localStorage.setItem("function-room-progress", JSON.stringify(next)); } catch { /* no-op */ }
  }

  function chooseUnit(unitId: number) {
    setActiveUnitId(unitId);
    setActiveLessonIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleLesson(lessonId: string) {
    saveProgress({ ...progress, [lessonId]: !progress[lessonId] });
  }

  return (
    <div className="study-shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="Function Room home"><b className="brand-mark">f<span>·</span></b><span>function room<small>MCR3U / GRADE 11</small></span></a>
        <p className="sidebar-label">YOUR COURSE</p>
        <nav aria-label="Course units">{units.map((unit) => { const done = unit.lessons.filter((lesson) => progress[lesson.id]).length; return <button className={`unit-link ${activeUnit.id === unit.id ? "active" : ""}`} key={unit.id} onClick={() => chooseUnit(unit.id)}><span className="unit-number">0{unit.id}</span><span className="unit-name">{unit.title}</span><span className="unit-count">{done}/{unit.lessons.length}</span></button>; })}</nav>
        <div className="sidebar-foot"><small>THE APPROACH</small><p>Watch. Work it out.<br />Make it stick.</p><small>Ontario Functions · Nelson 11</small></div>
      </aside>

      <main className="workspace">
        <header className="topbar"><span>YOUR STUDY SPACE</span><div className="topbar-right"><span className={`sync-state ${syncState}`}><i />{syncState === "synced" ? "Synced across devices" : syncState === "loading" ? "Loading progress" : "Saved on this browser"}</span><span className="course-badge">MCR3U · 2026-27</span></div></header>
        <div className="content">
          <div className="course-progress"><span style={{ width: `${(completeCount / totalLessons) * 100}%` }} /></div>
          <div className="unit-heading"><div><p className="eyebrow">UNIT 0{activeUnit.id} <span className="dot-sep">·</span> {activeUnit.kicker}</p><h1>{activeUnit.title}</h1><p className="lead">{activeUnit.description}</p><p className="prereq"><strong>Before you start:</strong> {activeUnit.prerequisites}</p></div><span className="unit-symbol" aria-hidden="true">ƒ(x)</span></div>
          {activeUnit.id === 1 ? <div className="quiz-strip"><strong>Thursday's quiz</strong><span>September 17 · Functions and relations, notation, domain and range</span><span className="quiz-tag">1.1-1.3</span></div> : <div className="course-note"><span className="note-icon">i</span><span>Teacher sequence mapped from your welcome slides. Use the linked Ontario resources after every video, then return here to mark the lesson complete.</span><a href={activeUnit.source.url} target="_blank" rel="noreferrer">Open unit hub ↗</a></div>}

          <div className="lesson-layout">
            <section className="lesson-main">
              <div className="lesson-meta"><span className="section-kicker">{String(activeLessonIndex + 1).padStart(2, "0")} / WATCH & UNDERSTAND</span><span className="lesson-status">{progress[activeLesson.id] ? "COMPLETED" : "IN PROGRESS"}</span></div>
              <h2>{activeLesson.title}</h2><p className="muted">{activeLesson.provider} · Watch first, practise second</p>
              <div className="video-frame"><iframe title={`${activeLesson.title} video`} src={`https://www.youtube-nocookie.com/embed/${activeLesson.video}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
              <div className="video-actions"><a className="external-link" href={yt(activeLesson.video)} target="_blank" rel="noreferrer">Open video on YouTube ↗</a><span className="watch-label">Video lesson · pause when prompted</span></div>
              <div className="pause-note"><span>Ⅱ</span><div><strong>Pause before the answer.</strong><p>{activeLesson.pause}</p></div></div>
              <div className="lesson-columns"><div className="objectives"><h3>What you’re learning</h3><ul>{activeLesson.focus.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="pitfall"><h3>Watch for</h3><p>{activeLesson.pitfall}</p></div></div>
              <div className="practice-block"><div><p className="section-kicker">02 / PRACTISE AFTER THE VIDEO</p><h3>Use the existing worksheet, then check.</h3><p className="practice-copy">Do the student sheet closed-book first. Open the solution only after you have committed to an answer.</p></div><div className="resource-list">{activeLesson.practice.map((resource) => <a className="resource-button" href={resource.url} target="_blank" rel="noreferrer" key={resource.url}><span>{resource.label}</span><b>↗</b></a>)}{activeLesson.solutions?.map((resource) => <a className="solution-link" href={resource.url} target="_blank" rel="noreferrer" key={resource.url}>Answers / worked solutions ↗</a>)}</div></div>
              <button className={`complete-button ${progress[activeLesson.id] ? "done" : ""}`} onClick={() => toggleLesson(activeLesson.id)}><span>{progress[activeLesson.id] ? "✓" : "○"}</span>{progress[activeLesson.id] ? "Lesson complete" : "Mark lesson complete"}</button>
            </section>

            <aside className="path-panel"><div className="path-header"><div><p className="eyebrow">YOUR LEARNING PATH</p><h3>{unitComplete}/{activeUnit.lessons.length} lessons complete</h3></div><span className="unit-progress-ring">{Math.round((unitComplete / activeUnit.lessons.length) * 100)}%</span></div><div className="unit-progress"><span style={{ width: `${(unitComplete / activeUnit.lessons.length) * 100}%` }} /></div><div className="path-list">{activeUnit.lessons.map((lesson, index) => <div className={`path-item ${activeLesson.id === lesson.id ? "selected" : ""} ${progress[lesson.id] ? "complete" : ""}`} key={lesson.id}><button className="lesson-select" onClick={() => setActiveLessonIndex(index)}><span className="path-index">{progress[lesson.id] ? "✓" : String(index + 1).padStart(2, "0")}</span><span><strong>{lesson.title}</strong><small>{progress[lesson.id] ? "COMPLETE" : activeLesson.id === lesson.id ? "NOW PLAYING" : "WATCH → PRACTISE"}</small></span></button><button className="check-button" aria-label={`${progress[lesson.id] ? "Unmark" : "Mark"} ${lesson.title} complete`} onClick={() => toggleLesson(lesson.id)}>{progress[lesson.id] ? "✓" : ""}</button></div>)}</div><div className="path-explainer"><p><strong>Finish line</strong></p><p>Complete the lessons, then use the review links below and tick every readiness statement you can do without the video.</p></div></aside>
          </div>

          <section className="review-section"><div><p className="section-kicker">03 / PROVE YOU’RE READY</p><h2>Review + readiness</h2><p className="muted">A unit is finished when you can do the mixed questions, explain your method, and recover from a mistake.</p></div><div className="review-grid"><div className="review-card"><h3>Review materials</h3>{activeUnit.review.map((resource) => <a className="review-link" href={resource.url} target="_blank" rel="noreferrer" key={resource.url}><span>{resource.label}</span><b>↗</b></a>)}</div><div className="ready-card"><h3>Readiness checklist</h3>{activeUnit.readiness.map((item, index) => { const readinessId = `u${activeUnit.id}-r${index + 1}`; return <label key={item}><input type="checkbox" checked={!!progress[readinessId]} onChange={() => saveProgress({ ...progress, [readinessId]: !progress[readinessId] })} /> <span>{item}</span></label>; })}</div></div></section>
          <footer className="site-footer"><span>Built for your MCR3U course sequence.</span><span>Free video-first resources · worksheets follow the lesson</span></footer>
        </div>
      </main>
    </div>
  );
}
