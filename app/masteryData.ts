export type VideoOption = {
  id: string;
  title: string;
  provider: string;
  role: "core" | "alternate" | "repair" | "worked-test";
  note: string;
};

export type ResourceLink = {
  label: string;
  url: string;
  kind: "worksheet" | "answers" | "quiz" | "test" | "reference";
};

export type AssessmentPack = {
  step: string;
  title: string;
  source: string;
  coverage: string;
  timing: string;
  instructions: string;
  links: ResourceLink[];
};

export type QuizQuestion = {
  id: string;
  kind?: "choice" | "input" | "explain";
  prompt: string;
  choices?: string[];
  answer?: number;
  accepted?: string[];
  requiredGroups?: string[][];
  minLength?: number;
  placeholder?: string;
  explanation: string;
  skill: string;
  category?: "K/U" | "Thinking" | "Communication" | "Application";
};

export type MasteryLesson = {
  id: string;
  section: string;
  title: string;
  taught: string;
  duration: string;
  summary: string;
  objectives: string[];
  pausePrompts: string[];
  pitfall: string;
  videos: VideoOption[];
  resources: ResourceLink[];
  forms: QuizQuestion[][];
};

const lourdesFiles = "https://lourdesmath.weebly.com/uploads/5/9/7/7/5977474/";
const file = (name: string) => lourdesFiles + name;

const question = (
  id: string,
  prompt: string,
  choices: string[],
  answer: number,
  explanation: string,
  skill: string,
): QuizQuestion => ({ id, prompt, choices, answer, explanation, skill });

export const unit1Lessons: MasteryLesson[] = [
  {
    id: "u1-l1",
    section: "1.1",
    title: "Functions and relations",
    taught: "Thu, Sep 10",
    duration: "55-70 min",
    summary: "Decide whether a relation is a function and justify it from ordered pairs, tables, mappings, graphs, and equations.",
    objectives: [
      "Identify domain and range in discrete relations.",
      "Use the one-input/one-output rule in tables, mappings, and ordered pairs.",
      "Use the vertical-line test and explain why it works.",
      "Distinguish one-to-one, many-to-one, and one-to-many relations.",
    ],
    pausePrompts: [
      "Before each example is classified, cover the answer and state the exact input that proves your decision.",
      "For every graph, physically trace a vertical line from left to right.",
    ],
    pitfall: "Repeated outputs are allowed. A function fails only when one input has more than one output.",
    videos: [
      { id: "8ndTq9VM6KM", title: "Functions 1.1 Nelson", provider: "Ms Havrot", role: "core", note: "Start here. It follows the Ontario Nelson lesson used by your course." },
      { id: "BCo-07Dwpz4", title: "MCR3U 1.1 - Functions, relations, domain and range", provider: "AllThingsMathematics", role: "alternate", note: "Use for a second Ontario explanation and more challenge." },
    ],
    resources: [
      { label: "1.1 student worksheet", url: file("mcr3u_whatisafunction.docx"), kind: "worksheet" },
      { label: "1.1 worked solutions", url: file("mcr3u_whasisafunction_soln.pdf"), kind: "answers" },
      { label: "Lourdes Unit 1 hub (Nelson-aligned)", url: "https://lourdesmath.weebly.com/unit-1---transformation-of-functions.html", kind: "reference" },
    ],
    forms: [
      [
        question("11a1", "Which relation is NOT a function?", ["{(-2,1), (0,3), (-2,4)}", "{(-2,1), (0,1), (2,1)}", "{(1,4), (2,4), (3,5)}", "{(-1,0), (0,0), (1,0)}"], 0, "The input -2 is paired with both 1 and 4. Repeated outputs are fine; repeated inputs with different outputs are not.", "repeated-input"),
        question("11a2", "A mapping sends 1 to 5, 2 to 5, and 3 to 7. What is true?", ["It is a function because every input has one output.", "It is not a function because 1 and 2 share an output.", "It is not a relation.", "It is a function only if every output is different."], 0, "Many inputs may share one output. The rule only forbids a single input from having two outputs.", "mapping-rule"),
        question("11a3", "A vertical line crosses a graph twice. What can you conclude?", ["The graph is not a function of x.", "The graph has no range.", "The graph is one-to-one.", "The graph must be quadratic."], 0, "Two intersections mean one x-value has two y-values, so the relation is not a function of x.", "vertical-line-test"),
        question("11a4", "For R = {(-3,2), (1,5), (4,2)}, what are the domain and range?", ["D={-3,1,4}, R={2,5}", "D={2,5}, R={-3,1,4}", "D={-3,1,2,4,5}, R={2}", "D={-3,4}, R={1,2,5}"], 0, "The domain is the set of first coordinates. The range is the set of distinct second coordinates.", "domain-range-discrete"),
      ],
      [
        question("11b1", "Which table represents a function?", ["x: 1,2,3,4; y: 2,2,5,5", "x: 1,1,2,3; y: 2,4,5,6", "x: -2,-2,0,1; y: 3,7,4,5", "x: 0,0,0,1; y: 1,2,3,4"], 0, "Each input in the first table appears once. Repeated y-values do not break a function.", "table-function"),
        question("11b2", "Which equation does NOT define y as a function of x?", ["x = y²", "y = 2x - 3", "y = x² + 1", "y = |x|"], 0, "For a positive x, x=y² usually gives two y-values, +sqrt(x) and -sqrt(x). It fails the vertical-line test.", "equation-function"),
        question("11b3", "Which statement is always true?", ["Every function is a relation, but not every relation is a function.", "Every relation is a function.", "Every function is one-to-one.", "A function cannot have repeated outputs."], 0, "A function is a special relation with exactly one output for each allowed input.", "function-definition"),
        question("11b4", "A graph has the points (-1,4), (0,2), (2,2), and (5,-3). Is it a function?", ["Yes; all x-values are different.", "No; the output 2 repeats.", "No; one output is negative.", "Yes, but only if the range repeats."], 0, "Every listed input appears once, so each input has exactly one output.", "ordered-pairs"),
      ],
    ],
  },
  {
    id: "u1-l2",
    section: "1.2",
    title: "Function notation",
    taught: "Thu-Fri, Sep 10-11",
    duration: "65-80 min",
    summary: "Read and evaluate functions from equations, graphs, and sets; solve for inputs; substitute expressions; and evaluate composite functions.",
    objectives: [
      "Interpret f(a) as an output and solve f(x)=k for an input.",
      "Substitute numbers and algebraic expressions using brackets.",
      "Read function values and inequalities from a graph.",
      "Evaluate f(g(x)) and explain why composition order matters.",
    ],
    pausePrompts: [
      "Write the substituted expression with brackets before simplifying.",
      "For a composite, calculate the inside function first and circle its output before using the outside function.",
    ],
    pitfall: "f(2x) means the input is 2x. It does not mean 2f(x). In f(g(x)), g happens first.",
    videos: [
      { id: "3_WTOAB4n-s", title: "Functions 1.2 - Function Notation", provider: "Ms Havrot", role: "core", note: "Start here for the exact Ontario/Nelson sequence." },
      { id: "T2o97I3yYbw", title: "Function Notation with Composite Functions", provider: "AllThingsMathematics", role: "core", note: "Required because your class handout includes f(g(x))." },
      { id: "KS8JLof5o90", title: "Solve equations with function notation", provider: "AllThingsMathematics", role: "repair", note: "Use if solving f(x)=k is your weak spot." },
    ],
    resources: [
      { label: "Extra 1.2 Ontario practice", url: file("mcr3u_functionnotation.docx"), kind: "worksheet" },
      { label: "1.2 worked solutions", url: file("mcr3u_functionnotation_soln.pdf"), kind: "answers" },
      { label: "Lourdes Unit 1 hub (Nelson-aligned)", url: "https://lourdesmath.weebly.com/unit-1---transformation-of-functions.html", kind: "reference" },
    ],
    forms: [
      [
        question("12a1", "If f(x)=2x²+3x-1, what is f(2)?", ["13", "9", "5", "17"], 0, "f(2)=2(2²)+3(2)-1=8+6-1=13.", "evaluate-function"),
        question("12a2", "If f(x)=3x+2, solve f(x)=-10.", ["x=-4", "x=4", "x=-8/3", "x=-12"], 0, "Set 3x+2=-10, so 3x=-12 and x=-4.", "solve-input"),
        question("12a3", "If f(t)=t²+1, which expression equals f(2-x)?", ["(2-x)²+1", "2-x²+1", "2f(x)-x", "(2-x²)+1"], 0, "Replace every t with the entire input (2-x), using brackets before squaring.", "expression-substitution"),
        question("12a4", "Let f(x)=3x-4 and g(x)=x²-3. What is f(g(2))?", ["-1", "5", "-7", "1"], 0, "g(2)=4-3=1, then f(1)=3-4=-1.", "composition"),
      ],
      [
        question("12b1", "If g(x)=2x²+3x, what is g(1/2)?", ["2", "5/2", "1", "4"], 0, "g(1/2)=2(1/4)+3(1/2)=1/2+3/2=2.", "evaluate-function"),
        question("12b2", "If h(x)=5-2x, find x when h(x)=17.", ["-6", "6", "-11", "11"], 0, "5-2x=17 gives -2x=12, so x=-6.", "solve-input"),
        question("12b3", "If f(x)=3x+5 and g(x)=x²+6x, what is g(f(-3))?", ["-8", "4", "-4", "8"], 0, "f(-3)=-4. Then g(-4)=(-4)²+6(-4)=16-24=-8.", "composition"),
        question("12b4", "Which statement about composition is correct?", ["f(g(x)) and g(f(x)) can be different because the inside function is applied first.", "f(g(x)) always equals g(f(x)).", "Composition means multiplying f and g.", "In f(g(x)), f is always the inside function."], 0, "Composition is ordered: the inside function acts first, so reversing the order can change the result.", "composition-order"),
      ],
    ],
  },
  {
    id: "u1-l3",
    section: "1.3",
    title: "Domain, range, and interval notation",
    taught: "Fri-Mon, Sep 11-14",
    duration: "65-80 min",
    summary: "State domain and range from sets, graphs, and equations; use interval notation; and explain contextual restrictions.",
    objectives: [
      "Read open/closed endpoints and arrows correctly.",
      "Convert among inequalities, set-builder notation, number lines, and intervals.",
      "Find natural domains and ranges of linear, quadratic, square-root, absolute-value, and reciprocal functions.",
      "Classify a graph as a function while stating its domain and range.",
    ],
    pausePrompts: [
      "Project the graph onto the x-axis for domain and onto the y-axis for range.",
      "Say whether each endpoint is included before choosing a bracket or parenthesis.",
    ],
    pitfall: "Infinity is never included, so it always uses a parenthesis. Domain is about inputs; range is about outputs.",
    videos: [
      { id: "FLGpA8QFYBw", title: "Functions 1.4 - Domain and Range", provider: "Ms Havrot", role: "core", note: "Ontario/Nelson-aligned lesson." },
      { id: "KirGQOwjBVI", title: "Domain and Range from a Graph", provider: "The Organic Chemistry Tutor", role: "alternate", note: "Extra graph-reading practice." },
      { id: "Ww7xtG2S7IM", title: "Interval Notation", provider: "The Organic Chemistry Tutor", role: "repair", note: "Use if brackets, unions, or infinity are shaky." },
    ],
    resources: [
      { label: "Extra 1.3 Ontario practice", url: file("mcr3u_domainandrange.docx"), kind: "worksheet" },
      { label: "1.3 worked solutions", url: file("mcr3u_domainandrange_soln.pdf"), kind: "answers" },
      { label: "Checkpoint quiz: 1.1-1.3", url: file("mcr3u_introtofunctions_quiz.docx"), kind: "quiz" },
      { label: "Checkpoint answer key", url: file("mcr3u_introtofunctions_quiz_soln.pdf"), kind: "answers" },
    ],
    forms: [
      [
        question("13a1", "Write x >= 4 in interval notation.", ["[4, infinity)", "(4, infinity)", "(-infinity, 4]", "[4, infinity]"], 0, "4 is included, so use a square bracket at 4. Infinity always uses a parenthesis.", "interval-endpoints"),
        question("13a2", "What is the natural domain of h(x)=sqrt(2-x)?", ["x <= 2", "x >= 2", "x < 2", "all real x"], 0, "The radicand must be non-negative: 2-x>=0, so x<=2.", "radical-domain"),
        question("13a3", "For f(x)=-3, what are the domain and range?", ["D=all real numbers; R={-3}", "D={-3}; R=all real numbers", "D=[-3,infinity); R={0}", "D=all real numbers; R=all real numbers"], 0, "Any real input is allowed, but every output is exactly -3.", "constant-domain-range"),
        question("13a4", "A graph runs from an open point at x=-3 to a closed point at x=2. What is its domain?", ["(-3,2]", "[-3,2)", "(-3,2)", "[-3,2]"], 0, "Open at -3 means exclude it; closed at 2 means include it.", "graph-endpoints"),
      ],
      [
        question("13b1", "For {(-3,4),(5,-6),(-2,7),(5,3),(6,-8)}, what is the domain?", ["{-3,-2,5,6}", "{4,-6,7,3,-8}", "{-3,-2,3,5,6}", "all real numbers"], 0, "Collect the distinct first coordinates: -3, 5, -2, and 6.", "domain-discrete"),
        question("13b2", "For the relation x=-3, what are domain, range, and function status?", ["D={-3}, R=all real numbers, not a function of x", "D=all real numbers, R={-3}, function", "D={-3}, R={-3}, function", "D=all real numbers, R=all real numbers, not a function"], 0, "It is a vertical line: one input x=-3 has infinitely many outputs, so it is not a function of x.", "vertical-line-domain-range"),
        question("13b3", "Which inequality matches (-infinity,-8]?", ["x <= -8", "x < -8", "x >= -8", "x > -8"], 0, "The interval extends left and includes -8, so x<=-8.", "interval-to-inequality"),
        question("13b4", "Write: x is greater than 6 OR strictly between -3 and -2.", ["(-3,-2) union (6,infinity)", "[-3,-2] union [6,infinity)", "(-infinity,-3) union (-2,6)", "(-3,6)"], 0, "Strict inequalities use parentheses, and the two separated pieces are joined with a union.", "interval-union"),
      ],
    ],
  },
  {
    id: "u1-l4",
    section: "1.4",
    title: "Parent functions",
    taught: "Tue, Sep 15",
    duration: "60-75 min",
    summary: "Recognize the core parent functions instantly and state their key points, domains, ranges, symmetry, and asymptotes.",
    objectives: [
      "Sketch y=x, y=x², y=sqrt(x), y=|x|, and y=1/x from memory.",
      "State domain, range, intercepts, symmetry, and asymptotes.",
      "Match a graph, equation, table, and description of the same parent.",
      "Use the parent as the starting point for transformations.",
    ],
    pausePrompts: [
      "Before each graph appears, sketch its shape and label three anchor points.",
      "Say the domain and range out loud before checking the video.",
    ],
    pitfall: "The reciprocal parent has asymptotes x=0 and y=0; it never touches either axis.",
    videos: [
      { id: "A2Xp6aaFYnw", title: "Functions 1.3 - Parent Functions", provider: "Ms Havrot", role: "core", note: "Directly follows the Nelson Functions 11 parent set." },
      { id: "PBeO-4nPo0w", title: "Parent and family functions overview", provider: "AllThingsMathematics", role: "alternate", note: "A second Ontario explanation." },
      { id: "6Sy5SMWE_Ko", title: "Domain and Range of Parent Functions", provider: "Anil Kumar", role: "repair", note: "Use if parent domains and ranges are not automatic." },
    ],
    resources: [
      { label: "Parent-function summary table", url: file("mcr3u_unitone_summary.docx"), kind: "worksheet" },
      { label: "Ontario parent-function practice", url: "https://splash.tdchristian.ca/classes/math/Templeton/Templeton%20Archive/MCR3UF15/MCR3UChp1/MCR3U%201.3%201.4.PDF", kind: "worksheet" },
      { label: "Lourdes Unit 1 hub (Nelson-aligned)", url: "https://lourdesmath.weebly.com/unit-1---transformation-of-functions.html", kind: "reference" },
    ],
    forms: [
      [
        question("14a1", "Which parent is a smooth U-shaped parabola with vertex (0,0) and range y>=0?", ["y=x²", "y=|x|", "y=sqrt(x)", "y=1/x"], 0, "The quadratic parent y=x² is a smooth parabola with minimum (0,0).", "identify-parent"),
        question("14a2", "What are the domain and range of y=sqrt(x)?", ["D: x>=0; R: y>=0", "D: all real; R: y>=0", "D: x>0; R: all real", "D: x<=0; R: y>=0"], 0, "Real square roots require x>=0, and the principal square root is never negative.", "parent-domain-range"),
        question("14a3", "What are the asymptotes of y=1/x?", ["x=0 and y=0", "x=1 and y=1", "x=0 only", "y=0 only"], 0, "The reciprocal parent approaches both axes but never reaches them.", "reciprocal-asymptotes"),
        question("14a4", "Which parent has a sharp V-shape and is symmetric about the y-axis?", ["y=|x|", "y=x", "y=sqrt(x)", "y=1/x"], 0, "The absolute-value parent y=|x| has two linear arms meeting at the origin.", "identify-parent"),
      ],
      [
        question("14b1", "Which parent has domain and range equal to all real numbers and passes through (-1,-1), (0,0), (1,1)?", ["y=x", "y=x²", "y=|x|", "y=sqrt(x)"], 0, "Those points and unrestricted values describe the linear parent y=x.", "identify-parent"),
        question("14b2", "Which statement about y=x² is true?", ["It is a function but not one-to-one on all real numbers.", "It is not a function.", "Its range is all real numbers.", "It has asymptote x=0."], 0, "It passes the vertical-line test, but fails the horizontal-line test on its full domain.", "quadratic-features"),
        question("14b3", "Where are the two branches of y=1/x?", ["Quadrants I and III", "Quadrants I and II", "Quadrants II and IV", "Quadrants III and IV"], 0, "Positive inputs give positive outputs; negative inputs give negative outputs.", "reciprocal-shape"),
        question("14b4", "Which parent starts at (0,0) and exists only to the right?", ["y=sqrt(x)", "y=x²", "y=|x|", "y=x"], 0, "The square-root parent requires non-negative inputs and begins at the origin.", "identify-parent"),
      ],
    ],
  },
  {
    id: "u1-l5",
    section: "1.5",
    title: "Exploring transformations",
    taught: "Wed, Sep 16",
    duration: "70-90 min",
    summary: "Understand what a, k, d, and c do in y=a f(k(x-d))+c before attempting full graphing questions.",
    objectives: [
      "Identify vertical and horizontal translations.",
      "Identify reflections in the x-axis and y-axis.",
      "Use reciprocals for horizontal stretch/compression factors.",
      "Describe a transformation accurately from an equation.",
    ],
    pausePrompts: [
      "Predict the move before the transformed graph appears.",
      "Write horizontal factors as 1/|k| instead of reading k directly.",
    ],
    pitfall: "Inside changes act horizontally and use the reciprocal scale. f(4x) compresses horizontally by 1/4.",
    videos: [
      { id: "dRIwgEtUYA0", title: "Transformations - vertical and horizontal translations", provider: "Ms Havrot", role: "core", note: "Start here for d and c." },
      { id: "tF4P2Y47Odk", title: "Functions 1.7 - Stretches and Compressions", provider: "Ms Havrot", role: "core", note: "Continue here for a and k after translations." },
      { id: "3lTp7weYqto", title: "MCR3U transformations overview", provider: "AllThingsMathematics", role: "alternate", note: "Use as the second explanation or repair lesson." },
    ],
    resources: [
      { label: "Transformations Part 1", url: file("mcr3u_transformationsoffunctions_part1.docx"), kind: "worksheet" },
      { label: "Part 1 solutions", url: file("mcr3u_transformationoffunctions_part1_soln.pdf"), kind: "answers" },
    ],
    forms: [
      [
        question("15a1", "From y=f(x-3)+2, how does the graph of y=f(x) move?", ["Right 3 and up 2", "Left 3 and up 2", "Right 2 and up 3", "Left 3 and down 2"], 0, "x-3 shifts right 3; +2 outside shifts up 2.", "translations"),
        question("15a2", "What does y=-2f(x) do?", ["Reflect in the x-axis and stretch vertically by 2", "Reflect in the y-axis and stretch horizontally by 2", "Move down 2", "Compress vertically by 1/2"], 0, "The negative outside reflects outputs across the x-axis; |a|=2 doubles y-values.", "vertical-transform"),
        question("15a3", "What does y=f(4x) do horizontally?", ["Compress by factor 1/4", "Stretch by factor 4", "Compress by factor 4", "Move right 4"], 0, "Horizontal scale is the reciprocal of the inside multiplier: 1/|4|.", "horizontal-factor"),
        question("15a4", "Which parameter creates a vertical translation in y=a f(k(x-d))+c?", ["c", "d", "a", "k"], 0, "c is added to every output, so it moves the graph up or down.", "parameter-roles"),
      ],
      [
        question("15b1", "Describe y=(1/2)f(x)+5.", ["Vertical compression by 1/2, then up 5", "Horizontal stretch by 2, then right 5", "Vertical stretch by 2, then up 5", "Left 5 and vertical compression by 1/2"], 0, "The outside multiplier changes y-values; +5 translates vertically.", "vertical-transform"),
        question("15b2", "Describe y=f(-(x+2)).", ["Reflect in the y-axis and translate left 2", "Reflect in the x-axis and translate right 2", "Translate right 2 only", "Stretch horizontally by 2"], 0, "k=-1 gives a y-axis reflection and x+2 means d=-2, a shift left 2.", "horizontal-transform"),
        question("15b3", "What does y=f(0.25x) do?", ["Stretch horizontally by 4", "Compress horizontally by 4", "Stretch vertically by 4", "Move right 0.25"], 0, "The horizontal factor is 1/0.25=4.", "horizontal-factor"),
        question("15b4", "Which equation moves f left 4 and down 3?", ["y=f(x+4)-3", "y=f(x-4)-3", "y=f(x+3)-4", "y=f(x-4)+3"], 0, "Left 4 is x+4 inside; down 3 is -3 outside.", "translations"),
      ],
    ],
  },
  {
    id: "u1-l6",
    section: "1.6",
    title: "Graphing transformations",
    taught: "Fri-Mon, Sep 18 & 21",
    duration: "80-100 min",
    summary: "Use mapping rules and anchor points to graph combined transformations accurately, including new domains, ranges, vertices, and asymptotes.",
    objectives: [
      "Use (x,y) -> (x/k+d, ay+c) for y=a f(k(x-d))+c.",
      "Transform anchor points instead of guessing the shape.",
      "Move vertices, endpoints, and asymptotes correctly.",
      "State the transformed domain and range.",
    ],
    pausePrompts: [
      "Build a point table and transform every anchor point before viewing the finished graph.",
      "After graphing, verify the vertex or asymptotes from the equation.",
    ],
    pitfall: "In the point mapping, x is divided by k before adding d. Missing the reciprocal is the most common lost-mark error.",
    videos: [
      { id: "Wkf24MjBC-U", title: "Functions 1.8 - Mapping RULES!", provider: "Ms Havrot", role: "core", note: "The mapping-rule method your Ontario course expects." },
      { id: "H-IdTIi7Xr8", title: "Functions 1.7 - X's Are Weird", provider: "Ms Havrot", role: "core", note: "Targeted Ontario examples for the horizontal rules that cause most errors." },
      { id: "Tmdrjs9xufc", title: "Transformations of Functions", provider: "The Organic Chemistry Tutor", role: "repair", note: "Long-form backup explanation." },
    ],
    resources: [
      { label: "Graphing transformations Part 2", url: file("mcr3u_transformationsoffunctions_part2.docx"), kind: "worksheet" },
      { label: "Part 2 solutions", url: file("mcr3u_transformationoffunctions_part2_soln.pdf"), kind: "answers" },
      { label: "Combined transformations Part 3", url: file("mcr3u_transformationsoffunctions_part3.doc"), kind: "worksheet" },
      { label: "Part 3 solutions", url: file("mcr3u_transformationsoffunctionspart3_soln.pdf"), kind: "answers" },
    ],
    forms: [
      [
        question("16a1", "For y=a f(k(x-d))+c, which mapping rule is correct?", ["(x,y) -> (x/k+d, ay+c)", "(x,y) -> (kx-d, y/a-c)", "(x,y) -> (x+d, ky+c)", "(x,y) -> (x/k-d, ay-c)"], 0, "Horizontal coordinates are divided by k then shifted by d; vertical coordinates are multiplied by a then shifted by c.", "mapping-rule"),
        question("16a2", "A point (2,4) is on y=f(x). Where does it go on y=-2f(0.5(x-3))+1?", ["(7,-7)", "(4,-9)", "(1,-7)", "(7,9)"], 0, "x'=2/0.5+3=7 and y'=-2(4)+1=-7.", "map-a-point"),
        question("16a3", "Where does the square-root parent endpoint (0,0) move for y=sqrt(x-4)+2?", ["(4,2)", "(-4,2)", "(2,4)", "(4,-2)"], 0, "The graph shifts right 4 and up 2, so its endpoint becomes (4,2).", "anchor-points"),
        question("16a4", "What are the domain and range of y=sqrt(x-4)+2?", ["D: x>=4; R: y>=2", "D: x>=2; R: y>=4", "D: x<=4; R: y<=2", "D/R: all real"], 0, "The transformed endpoint is (4,2) and the square-root graph continues right and up.", "transformed-domain-range"),
      ],
      [
        question("16b1", "What is the mapping rule for y=3f(-2(x+1))-4?", ["(x,y) -> (-x/2-1, 3y-4)", "(x,y) -> (-2x+1, y/3+4)", "(x,y) -> (x/2+1, -3y-4)", "(x,y) -> (-x/2+1, 3y+4)"], 0, "Here k=-2, d=-1, a=3, c=-4: x'=x/(-2)-1 and y'=3y-4.", "mapping-rule"),
        question("16b2", "Under that mapping, where does (4,-1) move?", ["(-3,-7)", "(1,-7)", "(-1,1)", "(-3,7)"], 0, "x'=-4/2-1=-3; y'=3(-1)-4=-7.", "map-a-point"),
        question("16b3", "For y=-2|x-3|+5, what is the vertex?", ["(3,5)", "(-3,5)", "(3,-5)", "(5,3)"], 0, "The absolute-value parent vertex (0,0) shifts right 3 and up 5. The -2 changes its orientation and width, not the vertex.", "vertex-transform"),
        question("16b4", "For y=2/(x-4)-3, what are the asymptotes?", ["x=4 and y=-3", "x=-4 and y=3", "x=2 and y=-3", "x=4 and y=0"], 0, "The reciprocal parent asymptotes move with d and c: x=d=4 and y=c=-3.", "transformed-asymptotes"),
      ],
    ],
  },
  {
    id: "u1-l7",
    section: "1.7",
    title: "Inverse functions",
    taught: "Tue, Sep 22",
    duration: "70-90 min",
    summary: "Reverse a function numerically, graphically, and algebraically; swap domain and range; and decide whether the inverse is also a function.",
    objectives: [
      "Create an inverse by swapping x and y values.",
      "Reflect a graph in y=x and swap domain with range.",
      "Find an algebraic inverse by swapping x and y, then solving for y.",
      "Use the horizontal-line test and restrict a quadratic domain when necessary.",
    ],
    pausePrompts: [
      "Find the inverse yourself before the video completes the algebra.",
      "Check one point and its reversed point, then verify f(f^-1(x))=x.",
    ],
    pitfall: "f^-1(x) means inverse function, not 1/f(x). A quadratic needs a restricted domain for its inverse to be a function.",
    videos: [
      { id: "vfxoaiCaqk8", title: "Functions 1.5 - Inverse Functions", provider: "Ms Havrot", role: "core", note: "Complete Ontario/Nelson lesson with the course's expected notation." },
      { id: "x_aTsnglk7k", title: "Inverse of a Function Overview", provider: "AllThingsMathematics", role: "alternate", note: "A second MCR3U explanation." },
      { id: "2zeYEx4eTdc", title: "How to Find the Inverse of a Function", provider: "The Organic Chemistry Tutor", role: "repair", note: "Use for extra algebraic examples." },
    ],
    resources: [
      { label: "Inverse-functions worksheet", url: file("mcr3u_inverseofafunction.docx"), kind: "worksheet" },
      { label: "Inverse-functions solutions", url: file("mcr3u_inverseofafunction_soln.pdf"), kind: "answers" },
      { label: "Lourdes Unit 1 hub (Nelson-aligned)", url: "https://lourdesmath.weebly.com/unit-1---transformation-of-functions.html", kind: "reference" },
    ],
    forms: [
      [
        question("17a1", "If f(x)=3x-4, what is f^-1(x)?", ["(x+4)/3", "(x-4)/3", "3x+4", "1/(3x-4)"], 0, "Swap x and y: x=3y-4. Then x+4=3y, so y=(x+4)/3.", "inverse-algebra"),
        question("17a2", "How are the domain and range of a function related to its inverse?", ["They swap.", "They stay identical in every case.", "Both become all real numbers.", "Only the domain changes."], 0, "Each ordered pair (x,y) becomes (y,x), so domain and range exchange roles.", "inverse-domain-range"),
        question("17a3", "What does the horizontal-line test tell you?", ["Whether the inverse relation is a function", "Whether the original graph is a function", "Whether the graph has an x-intercept", "Whether the range is all real numbers"], 0, "A horizontal line on the original becomes a vertical line after reflection in y=x.", "horizontal-line-test"),
        question("17a4", "Why is the inverse relation of y=x² not a function on the full real domain?", ["Most positive outputs come from two inputs, so the inverse has two outputs.", "The graph has no range.", "Squaring is undefined for negatives.", "It has an asymptote."], 0, "Both x and -x square to the same value. Restricting the original domain to x>=0 or x<=0 fixes this.", "quadratic-inverse"),
      ],
      [
        question("17b1", "If f(x)=2x+1, what is f^-1(x)?", ["(x-1)/2", "(x+1)/2", "2x-1", "1/(2x+1)"], 0, "Swap x and y, then solve: x=2y+1 gives y=(x-1)/2.", "inverse-algebra"),
        question("17b2", "If (3,7) lies on y=f(x), which point lies on y=f^-1(x)?", ["(7,3)", "(-3,-7)", "(3,-7)", "(1/3,1/7)"], 0, "Inverse relations swap coordinates, reflecting points in y=x.", "inverse-points"),
        question("17b3", "If the range of f is y>=-4, what is the domain of f^-1?", ["x>=-4", "x<=-4", "all real x", "x>-4"], 0, "The inverse domain is exactly the original range, including its endpoint.", "inverse-domain-range"),
        question("17b4", "If f and f^-1 are true inverses, what should f(f^-1(x)) simplify to?", ["x", "0", "1", "f(x)"], 0, "An inverse undoes the original function, returning the starting input.", "verify-inverse"),
      ],
    ],
  },
];

export const mockQuestions: QuizQuestion[] = [
  question("m1", "Which relation is a function?", ["{(1,2),(2,2),(3,5)}", "{(1,2),(1,3),(2,4)}", "x=y²", "A circle centred at the origin"], 0, "Each input in the first set has one output.", "1.1 function classification"),
  question("m2", "For R={(-2,4),(0,1),(3,4)}, what is the range?", ["{1,4}", "{-2,0,3}", "{-2,0,1,3,4}", "all real numbers"], 0, "The range is the set of distinct output values.", "1.1 domain/range"),
  question("m3", "If f(x)=x²-4x+1, what is f(-2)?", ["13", "-11", "-3", "5"], 0, "f(-2)=4+8+1=13.", "1.2 evaluate"),
  question("m4", "If f(x)=2x-5 and g(x)=x², what is g(f(4))?", ["9", "3", "11", "121"], 0, "f(4)=3, then g(3)=9.", "1.2 composition"),
  question("m5", "Which interval represents -2<x<=5?", ["(-2,5]", "[-2,5)", "(-2,5)", "[-2,5]"], 0, "-2 is excluded and 5 is included.", "1.3 intervals"),
  question("m6", "What is the natural domain of 1/(x-3)?", ["All real x except 3", "x>=3", "x>3", "All real x"], 0, "The denominator cannot equal zero.", "1.3 restrictions"),
  question("m7", "Which parent has an endpoint at the origin and range y>=0?", ["y=sqrt(x)", "y=1/x", "y=x", "y=x³"], 0, "The square-root parent begins at (0,0) and extends right.", "1.4 parents"),
  question("m8", "Describe y=-f(x+2)+3.", ["Reflect in x-axis, left 2, up 3", "Reflect in y-axis, right 2, up 3", "Left 3, up 2", "Reflect in x-axis, right 2, down 3"], 0, "The outside negative reflects vertically; x+2 shifts left; +3 shifts up.", "1.5 transformations"),
  question("m9", "What horizontal change occurs in y=f(5x)?", ["Compression by 1/5", "Stretch by 5", "Compression by 5", "Right 5"], 0, "Horizontal factors use the reciprocal of k.", "1.5 horizontal factor"),
  question("m10", "Where does (6,2) map under y=3f(2(x-1))-4?", ["(4,2)", "(11,2)", "(2,10)", "(4,10)"], 0, "x'=6/2+1=4 and y'=3(2)-4=2.", "1.6 mapping"),
  question("m11", "For y=-2/(x+1)+4, what are the asymptotes?", ["x=-1, y=4", "x=1, y=-4", "x=-2, y=4", "x=-1, y=0"], 0, "The reciprocal asymptotes move to x=d=-1 and y=c=4.", "1.6 graphing"),
  question("m12", "If f(x)=5x+10, what is f^-1(x)?", ["(x-10)/5", "5x-10", "(x+10)/5", "1/(5x+10)"], 0, "x=5y+10 gives y=(x-10)/5.", "1.7 inverse algebra"),
];

export const courseMilestones = [
  { date: "Sep 17", label: "Checkpoint quiz", detail: "1.1-1.3", status: "past" },
  { date: "Sep 19", label: "Saturday lock-in", detail: "Diagnose, repair, then master 1.4", status: "today" },
  { date: "Sep 21", label: "Graphing transformations", detail: "Second class day for 1.6", status: "next" },
  { date: "Sep 22", label: "Inverse functions", detail: "1.7", status: "next" },
  { date: "Sep 23", label: "Teacher review", detail: "Timed mock + error repair", status: "next" },
  { date: "Sep 24", label: "UNIT 1 TEST", detail: "Target: 100%", status: "test" },
] as const;

export const saturdayPlan = [
  { time: "3:00-3:20", title: "Authentic checkpoint", detail: "Print or mark up the Lourdes 1.1-1.3 quiz. Closed notes; open its key only after finishing." },
  { time: "3:20-4:00", title: "Repair the misses", detail: "Use only the video segment tied to each missed skill, then solve a new question." },
  { time: "4:00-4:10", title: "Reset", detail: "Walk, water, no scrolling." },
  { time: "4:10-5:00", title: "Master 1.4", detail: "Primary video, parent-function table from memory, worksheet, then the six-part mastery check." },
  { time: "5:00-5:10", title: "Break", detail: "Leave the screen." },
  { time: "5:10-6:00", title: "Begin 1.5", detail: "Only if 1.4 is mastered. Otherwise finish the repair loop." },
  { time: "6:00-6:30", title: "Meal", detail: "Full break." },
  { time: "6:30-7:05", title: "Mixed retrieval", detail: "Recheck everything studied without notes." },
  { time: "7:05-7:30", title: "Error log", detail: "Classify each miss, explain the correction, and solve one parallel problem." },
] as const;

export const testWeekPlan = [
  { day: "SUN 20", task: "Delayed 1.1-1.4 rechecks, then master 1.5." },
  { day: "MON 21", task: "Finish 1.6 mapping and combined graphing after class." },
  { day: "TUE 22", task: "Master 1.7 inverses, then a short mixed set." },
  { day: "WED 23", task: "Timed full review, mark it, repair every error, then one fresh mock." },
  { day: "THU 24", task: "20-minute error-log warm-up. No last-minute marathon." },
] as const;

export const reviewLibrary: ResourceLink[] = [
  { label: "Teacher checkpoint quiz 1.1-1.3", url: file("mcr3u_introtofunctions_quiz.docx"), kind: "quiz" },
  { label: "Checkpoint quiz solutions", url: file("mcr3u_introtofunctions_quiz_soln.pdf"), kind: "answers" },
  { label: "Full Unit 1 review", url: file("mcr3u_functionsreview.doc"), kind: "test" },
  { label: "Full review solutions", url: file("mcr3u_functionsreview_soln.pdf"), kind: "answers" },
  { label: "31-question MCR3U review + key", url: "https://abawa8.wordpress.com/wp-content/uploads/2014/09/ch1-mcr3u-review.pdf", kind: "test" },
  { label: "Ms Havrot Chapter 1 practice test", url: "https://mshavrot.pbworks.com/f/Chapter%201%20Test%20%231%20Feb%202016.pdf", kind: "test" },
  { label: "Authentic Ontario Unit 1 test B (timed mock; no key)", url: "https://300math.weebly.com/uploads/5/2/5/1/52513515/test_1_-_functions_and_transformations_version_b.pdf", kind: "test" },
  { label: "Solved MCR3U Unit 1 test video", url: "https://www.youtube.com/watch?v=Pu4LMMYA45U", kind: "reference" },
];

export const assessmentPacks: AssessmentPack[] = [
  {
    step: "01 · BASELINE",
    title: "Teacher checkpoint quiz: 1.1–1.3",
    source: "Our Lady of Lourdes Catholic High School · Ontario MCR3U",
    coverage: "Relations and functions, function notation, domain and range",
    timing: "20 minutes · closed notes",
    instructions: "Do the student file on paper or with iPad markup. Show every line. Do not open the separate key until the timer ends; circle every error instead of erasing it.",
    links: [
      { label: "Open student quiz", url: file("mcr3u_introtofunctions_quiz.docx"), kind: "quiz" },
      { label: "Open answer key after attempt", url: file("mcr3u_introtofunctions_quiz_soln.pdf"), kind: "answers" },
    ],
  },
  {
    step: "02 · BUILD",
    title: "Ontario teacher lesson packet",
    source: "Avon Maitland DSB teacher course · Nelson Functions 11",
    coverage: "Blank notes, completed notes, homework examples, and Unit 1 review",
    timing: "Use after each matching video",
    instructions: "Open the blank notes first and solve. Use the completed version only to mark. This packet follows the same 1.1–1.6 Nelson sequence as the Ms Havrot core videos.",
    links: [
      { label: "Open Unit 1 teacher course", url: "https://sites.google.com/ed.amdsb.ca/rastorfer/mcr3u/unit-1-functions", kind: "worksheet" },
      { label: "Open Lourdes Unit 1 lesson bank", url: "https://lourdesmath.weebly.com/unit-1---transformation-of-functions.html", kind: "reference" },
    ],
  },
  {
    step: "03 · TRANSFORM",
    title: "Transformations precision drill",
    source: "Ontario MCR3U teacher resource",
    coverage: "a, k, d, c; mapping rules; transformed points and graphs",
    timing: "30–40 minutes · after lessons 1.5 and 1.6",
    instructions: "Predict each move and write the mapping rule before graphing. Mark with your lesson examples, then redo every missed graph from a clean page.",
    links: [
      { label: "Open transformations practice", url: file("mcr3u_transformationsoffunctions_part2.docx"), kind: "worksheet" },
      { label: "Open worked solutions after attempt", url: file("mcr3u_transformationoffunctions_part2_soln.pdf"), kind: "answers" },
    ],
  },
  {
    step: "04 · FULL REVIEW",
    title: "31-question Chapter 1 review",
    source: "MCR3U teacher review · answer section included",
    coverage: "Objectives 1.1, 1.2, 1.4, 1.5, 1.7, and 1.8",
    timing: "55–70 minutes · closed notes",
    instructions: "Complete questions 1–31 before using pages 11–13. Give yourself one repair round: study each miss, wait at least 30 minutes, then redo it without the solution visible.",
    links: [
      { label: "Open 31-question review + key", url: "https://abawa8.wordpress.com/wp-content/uploads/2014/09/ch1-mcr3u-review.pdf", kind: "test" },
    ],
  },
  {
    step: "05 · TEST SIMULATION",
    title: "Ms Havrot Chapter 1 practice test",
    source: "Ontario Functions teacher · paired with a full video take-up",
    coverage: "Complete Chapter 1 functions and transformations test practice",
    timing: "45–55 minutes · closed notes · one sitting",
    instructions: "Download the test and finish it before opening the video. Then mark every line against Ms Havrot's take-up, record each error type, and redo only the misses from a blank page.",
    links: [
      { label: "Open Chapter 1 practice test", url: "https://mshavrot.pbworks.com/f/Chapter%201%20Test%20%231%20Feb%202016.pdf", kind: "test" },
      { label: "Watch full test take-up after", url: "https://www.youtube.com/watch?v=pJPaVZTtiGE", kind: "answers" },
    ],
  },
  {
    step: "06 · TRANSFER TEST",
    title: "Authentic five-page Unit 1 Test B",
    source: "300Math · Ontario MCR3U classroom test",
    coverage: "Knowledge, thinking, communication, and application · 55 marks",
    timing: "50 minutes · closed notes · one sitting",
    instructions: "Treat this as the final dress rehearsal. No answer key is published with this version. Mark comparable skills with your earlier keys, then bring any unresolved solutions to your teacher or tutoring support instead of guessing.",
    links: [
      { label: "Open authentic Test B", url: "https://300math.weebly.com/uploads/5/2/5/1/52513515/test_1_-_functions_and_transformations_version_b.pdf", kind: "test" },
    ],
  },
  {
    step: "07 · HARD MODE",
    title: "Extra Ontario test bank",
    source: "AllThingsMathematics · MCR3U course page",
    coverage: "Unit 1 tests, tricky transformations, and video solutions",
    timing: "Only after the full review and Test B",
    instructions: "Use the free items that are available on the course page as extra transfer practice. Some items require enrolment, so this is an optional challenge source rather than a required gate.",
    links: [
      { label: "Open MCR3U Unit 1 course bank", url: "https://www.allthingsmathematics.com/p/mcr3u-grade-11-functions", kind: "reference" },
    ],
  },
];

export const methodSources = [
  { label: "IES study guide: spacing, worked examples, and retrieval quizzes", url: "https://ies.ed.gov/ncee/wwc/practiceguide/1" },
  { label: "Ontario MCR3U curriculum", url: "https://www.edu.gov.on.ca/eng/curriculum/secondary/math1112currb.pdf" },
  { label: "Ontario Growing Success: varied evidence, feedback, and follow-up", url: "https://www.edu.gov.on.ca/eng/policyfunding/growSuccess.pdf" },
  { label: "WWC-reviewed math interleaving classroom study", url: "https://ies.ed.gov/ncee/wwc/Study/88770" },
  { label: "High-school math study: immediate corrective feedback", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7334720/" },
  { label: "Reddit: practise like the test and write every step", url: "https://www.reddit.com/r/learnmath/comments/1fu49zv/whats_the_best_way_to_study_for_math_tests/" },
  { label: "Ontario student with 99: log and redo every missed question", url: "https://www.reddit.com/r/OntarioGrade12s/comments/1gpz8ka/i_got_a_99_in_advanced_functions_this_is_how_you/" },
  { label: "Reddit: active problem solving and explaining each step", url: "https://www.reddit.com/r/learnmath/comments/tdgckf/what_have_you_found_to_be_the_most_effective_way/" },
  { label: "Ontario students: daily MCR3U practice and course-specific videos", url: "https://www.reddit.com/r/OntarioGrade12s/comments/1vhfiw8/any_advice_for_grade_11_functions_mcr3u0/" },
  { label: "Ontario student advice: Ms Havrot follows the course and includes practice tests", url: "https://www.reddit.com/r/OntarioGrade12s/comments/15ljr7o/online_help_for_mcr3u1/" },
  { label: "Ontario student report: Organic Chemistry Tutor helped produce a 97 in MCR3U", url: "https://www.reddit.com/r/OntarioGrade11s/comments/1j8di14/any_advice_for_grade_11_functions_im_really/" },
  { label: "Ontario students: AllThingsMathematics helps on quizzes; unit tests still require hard practice", url: "https://www.reddit.com/r/OntarioGrade12s/comments/1lpe11n/how_similar_is_allthingsmathematics_to_classroom/" },
];
