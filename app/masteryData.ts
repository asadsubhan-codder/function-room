export type VideoOption = {
  id: string;
  title: string;
  provider: string;
  role: "core" | "alternate" | "repair" | "worked-test";
  note: string;
  duration?: string;
  priority?: string;
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
  textbookMap?: string;
  studyRoute?: { time: string; title: string; detail: string }[];
  videos: VideoOption[];
  resources: ResourceLink[];
  forms: QuizQuestion[][];
};

export type SuccessStory = {
  score: string;
  headline: string;
  detail: string;
  source: string;
  url: string;
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
    duration: "80-95 min",
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
    textbookMap: "YOUR 1.4 = NELSON §1.3 · PP. 25-28",
    studyRoute: [
      { time: "00-10", title: "Make the first move", detail: "Watch only seven minutes, then pause. Draw the linear and quadratic parents from memory before continuing." },
      { time: "10-45", title: "Finish in short rounds", detail: "Repeat: seven minutes of Ms Havrot, then two minutes on paper. Predict each graph before she reveals it." },
      { time: "45-60", title: "Blank-page recall", detail: "Close the video. Draw all five parents and add domain, range, key points, symmetry, and asymptotes." },
      { time: "60-85", title: "Ontario practice", detail: "Complete the parent-functions table and Nelson Further Your Understanding #1-3. Mark every feature, not only the shape." },
      { time: "85-95", title: "Prove it", detail: "Take the fresh mastery check without notes. Use a backup video only for the exact feature you missed." },
    ],
    videos: [
      { id: "A2Xp6aaFYnw", title: "Parent Functions: what they are and how to graph them", provider: "Ms Havrot", role: "core", duration: "35:01", priority: "START HERE", note: "Best course match. It teaches the exact five Nelson parents. The video says 1.3 because your teacher renumbered this topic as 1.4." },
      { id: "Qt6X5KNbZ5c", title: "Parent Functions, End Behaviour, and Asymptotes", provider: "The Organic Chemistry Tutor", role: "repair", duration: "61:13", priority: "DEEP REPAIR", note: "Use chapters for the parent that is still weak; do not rewatch the full hour when one graph is the problem." },
      { id: "6Sy5SMWE_Ko", title: "Domain and Range of Parent Functions", provider: "Anil Kumar", role: "repair", duration: "10:55", priority: "TARGETED", note: "Short Canadian repair lesson for parent domains, ranges, and graph features." },
    ],
    resources: [
      { label: "CORE: one-page parent-functions table", url: "https://stevesweeney.pbworks.com/w/file/fetch/132228267/MCR3U%20-%20WS%20-%20Graphs%20of%20Functions.pdf", kind: "worksheet" },
      { label: "Ontario parent-functions notes + assigned-style questions", url: "https://splash.tdchristian.ca/classes/math/Templeton/Templeton%20Archive/MCR3UF15/MCR3UChp1/MCR3U%201.3%201.4.PDF", kind: "worksheet" },
      { label: "Nelson Chapter 1: use §1.3 pp. 25-28", url: "https://splash.tdchristian.ca/classes/math/Hagen/11U/textbook/01_F11_Ch1_x-079.pdf#page=35", kind: "reference" },
      { label: "Nelson textbook answers", url: "https://splash.tdchristian.ca/classes/math/Hagen/11U/textbook/12_F11_Ans_617-685.pdf", kind: "answers" },
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
    duration: "90-110 min",
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
    textbookMap: "YOUR 1.5 = NELSON §1.6 · PP. 50-51",
    studyRoute: [
      { time: "00-08", title: "See the whole map", detail: "Watch the AllThingsMathematics overview once so a, k, d, and c have jobs before the details." },
      { time: "08-51", title: "Learn each move", detail: "Watch Ms Havrot translations, then stretches/reflections. Predict every movement before it appears." },
      { time: "51-65", title: "AKDC recall", detail: "Close the videos. Write what a, k, d, c do, including 1/|k| and both reflection rules." },
      { time: "65-100", title: "Independent set", detail: "Complete the separate-answer-key worksheet, mark it, and redo each miss on clean paper." },
      { time: "100-110", title: "Prove it", detail: "Take the mastery check closed-notes. Open Organic Chemistry Tutor only for a missed transformation type." },
    ],
    videos: [
      { id: "7V1hiX5Hch4", title: "MCR3U Transformations of Functions Overview", provider: "AllThingsMathematics", role: "core", duration: "7:16", priority: "WATCH FIRST", note: "Fast Ontario overview. Use it to build the a-k-d-c map before the two detailed lessons." },
      { id: "dRIwgEtUYA0", title: "Vertical and Horizontal Translations", provider: "Ms Havrot", role: "core", duration: "21:23", priority: "CORE 1 OF 2", note: "Exact Nelson treatment of d and c. Its section number differs because your teacher groups the topics differently." },
      { id: "tF4P2Y47Odk", title: "Stretches, Compressions, and Reflections", provider: "Ms Havrot", role: "core", duration: "21:30", priority: "CORE 2 OF 2", note: "Exact treatment of a and k, including the reciprocal horizontal factor." },
      { id: "Tmdrjs9xufc", title: "Transformations of Functions", provider: "The Organic Chemistry Tutor", role: "repair", duration: "21:54", priority: "BACKUP", note: "Use only if the Ontario sequence still has not clicked; it provides a slower second route through the same ideas." },
    ],
    resources: [
      { label: "CORE: transformations Part 1", url: file("mcr3u_transformationsoffunctions_part1.docx"), kind: "worksheet" },
      { label: "Extra equations + descriptions drill (key included at end)", url: "https://stevesweeney.pbworks.com/w/file/fetch/132345567/MCR3U%20-%20WS%20-%20Functions%20-%20Transformations%20%26%20Descriptions.pdf", kind: "worksheet" },
      { label: "Ms Havrot transformations handout", url: "https://mshavrot.pbworks.com/w/file/fetch/128894223/U3-4%20Transformations%20Handouts.pdf", kind: "reference" },
      { label: "Nelson Chapter 1: use §1.6 pp. 50-51", url: "https://splash.tdchristian.ca/classes/math/Hagen/11U/textbook/01_F11_Ch1_x-079.pdf#page=60", kind: "reference" },
      { label: "Part 1 separate solutions", url: file("mcr3u_transformationoffunctions_part1_soln.pdf"), kind: "answers" },
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
    duration: "105-130 min",
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
    textbookMap: "YOUR 1.6 = NELSON §1.7-1.8 · PP. 52-73",
    studyRoute: [
      { time: "00-20", title: "Graphing overview", detail: "Watch the AllThingsMathematics graphing overview and copy only the general process." },
      { time: "20-53", title: "Mapping precision", detail: "Watch Ms Havrot Mapping Rules and X's Are Weird. Work every image point before she reveals it." },
      { time: "53-68", title: "Formula from memory", detail: "Write (x,y) -> (x/k+d, ay+c), explain every symbol, then test it on two points." },
      { time: "68-115", title: "Two worksheet levels", detail: "Do Part 2 first, then the Pinhey graphing set. Mark with the separate keys and redraw every miss." },
      { time: "115-130", title: "Prove it", detail: "Take the closed-notes mastery check. Use the reciprocal video only if asymptotes caused the miss." },
    ],
    videos: [
      { id: "AkeZ79GyAlk", title: "Graphing Functions with Transformations Overview", provider: "AllThingsMathematics", role: "core", duration: "20:24", priority: "START HERE", note: "Ontario-specific graphing workflow before the precise mapping-rule lessons." },
      { id: "Wkf24MjBC-U", title: "Mapping Rules", provider: "Ms Havrot", role: "core", duration: "15:52", priority: "CORE 1 OF 2", note: "The exact point-mapping method expected in Ontario: (x,y) -> (x/k+d, ay+c)." },
      { id: "H-IdTIi7Xr8", title: "Horizontal Changes: X's Are Weird", provider: "Ms Havrot", role: "core", duration: "16:49", priority: "CORE 2 OF 2", note: "Targets reciprocal horizontal factors and y-axis reflections, the highest-risk errors in this lesson." },
      { id: "S1c9PiOAKT8", title: "Transforming the Reciprocal Parent y=1/x", provider: "Ms Havrot", role: "repair", duration: "15:25", priority: "TARGETED", note: "Use when transformed asymptotes, domain, or range are the weak point." },
      { id: "ASF7vMYgFzQ", title: "Transformations of Parent Functions", provider: "AlRichards314", role: "alternate", duration: "28:23", priority: "SECOND ROUTE", note: "A complete MCR3U Ontario explanation across quadratic, square-root, and reciprocal parents." },
    ],
    resources: [
      { label: "CORE: graphing transformations Part 2", url: file("mcr3u_transformationsoffunctions_part2.docx"), kind: "worksheet" },
      { label: "Ontario graphing-transformation worksheet", url: "https://pinheymath.pbworks.com/w/file/fetch/132101580/L6%20-%20WS%20-%20Graphing%20Transformations%20of%20Functions.doc", kind: "worksheet" },
      { label: "Horizontal transformations drill (answers included)", url: "https://stevesweeney.pbworks.com/w/file/fetch/132314205/MCR3U%20-%20WS%20-%20Functions%20-%20Horizontal%20Scaling%20%26%20Reflection.pdf", kind: "worksheet" },
      { label: "Nelson Chapter 1: use §1.7-1.8 pp. 52-73", url: "https://splash.tdchristian.ca/classes/math/Hagen/11U/textbook/01_F11_Ch1_x-079.pdf#page=62", kind: "reference" },
      { label: "Part 2 separate solutions", url: file("mcr3u_transformationsoffunctions_part2_soln.pdf"), kind: "answers" },
      { label: "Ontario graphing worksheet solutions", url: "https://pinheymath.pbworks.com/w/file/fetch/128849013/L6%20-%20WS%20-%20Graphing%20Transformations%20of%20Functions%20Solutions.pdf", kind: "answers" },
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
    duration: "80-100 min",
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
    textbookMap: "YOUR 1.7 = NELSON §1.5 · PP. 41-49",
    studyRoute: [
      { time: "00-16", title: "Ontario core", detail: "Watch Ms Havrot and pause before every coordinate swap and algebraic inverse." },
      { time: "16-28", title: "Second explanation", detail: "Use AllThingsMathematics for the concise overview; switch to Organic only if solving for y is still shaky." },
      { time: "28-43", title: "Reverse from memory", detail: "Explain the domain/range swap, y=x reflection, horizontal-line test, and why f^-1 is not a reciprocal." },
      { time: "43-85", title: "Independent inverse set", detail: "Complete the Lourdes worksheet, mark with its separate key, then use Pinhey for harder transfer questions." },
      { time: "85-100", title: "Prove it", detail: "Take the mastery check without notes and redo any miss using a fresh equation." },
    ],
    videos: [
      { id: "vfxoaiCaqk8", title: "Inverse Functions", provider: "Ms Havrot", role: "core", duration: "15:15", priority: "START HERE", note: "Complete Ontario/Nelson lesson. The video says 1.5 because your teacher places inverse functions at 1.7." },
      { id: "x_aTsnglk7k", title: "Inverse of a Function Overview", provider: "AllThingsMathematics", role: "alternate", duration: "10:30", priority: "SECOND PASS", note: "Concise MCR3U explanation for coordinate swaps, inverse notation, and the graphical relationship." },
      { id: "2zeYEx4eTdc", title: "How to Find the Inverse of a Function", provider: "The Organic Chemistry Tutor", role: "repair", duration: "11:36", priority: "ALGEBRA REPAIR", note: "Use for extra swap-and-solve examples if isolating y is the problem." },
    ],
    resources: [
      { label: "CORE: inverse-functions worksheet", url: file("mcr3u_inverseofafunction.docx"), kind: "worksheet" },
      { label: "Harder Ontario inverse worksheet (answers at bottom)", url: "https://pinheymath.pbworks.com/w/file/fetch/128899434/L8%20-%20Inverse%20Functions%20Worksheet.pdf", kind: "worksheet" },
      { label: "Ms Havrot inverse lesson notes", url: "https://mshavrot.pbworks.com/w/file/fetch/105049239/3UFeb10.pdf", kind: "reference" },
      { label: "Nelson Chapter 1: use §1.5 pp. 41-49", url: "https://splash.tdchristian.ca/classes/math/Hagen/11U/textbook/01_F11_Ch1_x-079.pdf#page=51", kind: "reference" },
      { label: "Inverse-functions separate solutions", url: file("mcr3u_inverseofafunction_soln.pdf"), kind: "answers" },
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
  question("m7", "Which parent has an endpoint at the origin and range y>=0?", ["y=sqrt(x)", "y=1/x", "y=x", "y=|x|"], 0, "The square-root parent begins at (0,0) and extends right.", "1.4 parents"),
  question("m8", "Describe y=-f(x+2)+3.", ["Reflect in x-axis, left 2, up 3", "Reflect in y-axis, right 2, up 3", "Left 3, up 2", "Reflect in x-axis, right 2, down 3"], 0, "The outside negative reflects vertically; x+2 shifts left; +3 shifts up.", "1.5 transformations"),
  question("m9", "What horizontal change occurs in y=f(5x)?", ["Compression by 1/5", "Stretch by 5", "Compression by 5", "Right 5"], 0, "Horizontal factors use the reciprocal of k.", "1.5 horizontal factor"),
  question("m10", "Where does (6,2) map under y=3f(2(x-1))-4?", ["(4,2)", "(11,2)", "(2,10)", "(4,10)"], 0, "x'=6/2+1=4 and y'=3(2)-4=2.", "1.6 mapping"),
  question("m11", "For y=-2/(x+1)+4, what are the asymptotes?", ["x=-1, y=4", "x=1, y=-4", "x=-2, y=4", "x=-1, y=0"], 0, "The reciprocal asymptotes move to x=d=-1 and y=c=4.", "1.6 graphing"),
  question("m12", "If f(x)=5x+10, what is f^-1(x)?", ["(x-10)/5", "5x-10", "(x+10)/5", "1/(5x+10)"], 0, "x=5y+10 gives y=(x-10)/5.", "1.7 inverse algebra"),
];

export const courseMilestones = [
  { date: "Sep 17", label: "Checkpoint quiz", detail: "1.1-1.3", status: "past" },
  { date: "Sep 20", label: "You are here", detail: "1.3 complete · begin 1.4", status: "today" },
  { date: "Sep 21", label: "Graphing transformations", detail: "Second class day for 1.6", status: "next" },
  { date: "Sep 22", label: "Inverse functions", detail: "1.7", status: "next" },
  { date: "Sep 23", label: "Teacher review", detail: "Timed mock + error repair", status: "next" },
  { date: "Sep 24", label: "UNIT 1 TEST", detail: "Target: 100%", status: "test" },
] as const;

export const currentPlan = [
  { time: "BLOCK 1 · 90M", title: "Own 1.4 parent functions", detail: "Ms Havrot core video, five-parent table from memory, Ontario worksheet, then the fresh check." },
  { time: "BREAK · 10M", title: "Leave the screen", detail: "Water, walk, and keep the phone away from the desk." },
  { time: "BLOCK 2 · 100M", title: "Build 1.5 transformations", detail: "AllThings overview, Ms Havrot detail lessons, AKDC recall, then the separate-key worksheet." },
  { time: "BREAK · 20M", title: "Full reset", detail: "Eat and move. Do not turn a break into scrolling." },
  { time: "BLOCK 3 · 20M", title: "Confirm 1.1-1.3 stayed learned", detail: "Do the real checkpoint quiz closed-notes. This is retrieval, not a new lesson." },
  { time: "BLOCK 4 · 35M", title: "Repair only real misses", detail: "Name the error, use the exact video segment, then solve a parallel question without help." },
  { time: "FINISH · 10M", title: "Write tomorrow's targets", detail: "Record three facts you can recall, every unresolved error, and the first 1.6 task for Monday." },
] as const;

export const testWeekPlan = [
  { day: "SUN 20", task: "Master 1.4, build 1.5, then verify 1.1-1.3 with the real checkpoint quiz." },
  { day: "MON 21", task: "Finish 1.5 and master 1.6 mapping and combined graphing after class." },
  { day: "TUE 22", task: "Master 1.7 inverses, then a short mixed set." },
  { day: "WED 23", task: "Timed full review, mark it, repair every error, then one fresh mock." },
  { day: "THU 24", task: "20-minute error-log warm-up. No last-minute marathon." },
] as const;

export const successStories: SuccessStory[] = [
  {
    score: "96",
    headline: "Daily homework + Ms Havrot",
    detail: "An Ontario student said they self-taught two units while their teacher was away and finished Functions with 96. They credited doing the homework daily and using Ms Havrot's Ontario-textbook examples.",
    source: "Reddit self-report",
    url: "https://www.reddit.com/r/OntarioGrade12s/comments/1wdxs10/help_i_dont_know_what_to_do/",
  },
  {
    score: "98",
    headline: "AllThings for the concepts",
    detail: "A student reported moving from 86 in Grade 10 math to 98 in Grade 11 and recommended AllThingsMathematics for understanding concepts.",
    source: "Reddit self-report",
    url: "https://www.reddit.com/r/OntarioGrade12s/comments/qztvlj/course_advice/",
  },
  {
    score: "98",
    headline: "Organic Chemistry Tutor as backup",
    detail: "A student who reported 98 in pre-AP MCR recommended Organic Chemistry Tutor, studying ahead, and repairing weak graphing or quadratic skills.",
    source: "Reddit self-report",
    url: "https://www.reddit.com/r/OntarioGrade12s/comments/1epscmg/functions_mcr3u/",
  },
  {
    score: "99",
    headline: "Key concepts + class worksheets",
    detail: "One commenter reported a 99 exam after reviewing key concepts and class worksheets. Other high scorers in the same thread emphasized repeated practice over passive review.",
    source: "Reddit self-report",
    url: "https://www.reddit.com/r/OntarioGrade12s/comments/157iysn/what_are_some_tips_to_help_me_with_mcr3u_compare/",
  },
  {
    score: "100",
    headline: "Four focused hours before one exam",
    detail: "One student reported four distraction-free hours reviewing the main topics and doing many problems the day before a Functions exam. This is one anecdote, not a required or guaranteed hour count.",
    source: "Reddit self-report",
    url: "https://www.reddit.com/r/OntarioGrade12s/comments/1afr0uv/any_100_on_exams/",
  },
];

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
