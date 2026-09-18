"use strict";

const lessons = {
  "1.1": {
    label: "RELATIONS & FUNCTIONS",
    title: "One input.<br><em>One output.</em>",
    lead: "A relation is any set of input-output pairs. It is a function when every input has exactly one output.",
    strip: ["input x", "→", "one y", "→", "function"],
    video: {id:"52tpYl2tTqk", title:"What are functions? · Math Antics", url:"https://www.youtube.com/watch?v=52tpYl2tTqk"},
    more: [{title:"Relations, mappings & vertical-line test",url:"https://www.youtube.com/watch?v=wbBY2tTqXDA"}],
    watch: "Pause at each mapping or graph. Ask: can this input land on two different outputs?",
    whyTitle: "A function must be predictable from its input",
    why: ["If the same x gives two different y-values, the rule cannot tell you which single output to use. That is why the relation is not a function.","A repeated y is fine: two inputs are allowed to share an output. On a graph, a vertical line fixes one x, so it can hit a function at most once."],
    worked: {title:"Is {(-2, 1), (0, 3), (-2, 4)} a function?",start:"Try to decide before revealing each step.",steps:["Look only at the first number of each pair: -2, 0, -2.","The input -2 appears twice, with outputs 1 and 4.","Because one input has two outputs, this relation is not a function."]},
    sheet: "Use 1.1 Relations and Functions and Unit 1 Quiz Practice page 1. Classify sets, mapping diagrams, equations and graphs; then give domain and range. The vertical line x = -2 is an important counterexample."
  },
  "1.2": {
    label: "FUNCTION NOTATION",
    title: "Two letters. Two rules.<br><em>One input at a time.</em>",
    lead: "The name tells you which rule to use. What sits in the parentheses is the entire input. In a composition, the inside output feeds the outside rule.",
    strip: ["2", "→", "g(x)=3x+4", "→", "10", "→", "f(x)=x²", "→", "100"],
    video: {id:"HyNie_PYgsY",title:"Evaluating functions · The Organic Chemistry Tutor",url:"https://www.youtube.com/watch?v=HyNie_PYgsY"},
    more: [{title:"Next: composite functions",url:"https://www.youtube.com/watch?v=ZFPkQkURSxk"},{title:"Khan: evaluating from an equation",url:"https://www.khanacademy.org/math/algebra-1-tx/x36b5a29ce1c3a684:introduction-to-functions/x36b5a29ce1c3a684:evaluating-functions/v/understanding-function-notation-example-1"}],
    watch: "Before the presenter substitutes a value, pause and write exactly what replaces x. For f(g(x)), start with g.",
    whyTitle: "The parentheses are the input slot",
    why: ["If f(x)=x², then f(3+n) means square the whole input: (3+n)². The name f does not mean multiplication by f.","For f(g(-1)), g first turns -1 into an output. That output is then placed into f. The order matters; g(f(-1)) can be different.","To solve f(x)=g(x), ask where the two rules give the same output for the same input. Set their equations equal and solve."],
    worked: {title:"With f(x)=x² and g(x)=3x+4, find f(g(-1)).",start:"Read from the inside out. Predict each line before opening it.",steps:["Calculate the inside: g(-1)=3(-1)+4=1.","Use that output as f's input: f(g(-1))=f(1).","Apply f's rule: f(1)=1²=1."]},
    sheet: "Use Function Notation 2, especially page 3 #2–4, page 4 #2–3, and page 5 #4 for longer compositions. Then do Unit 1 Quiz Practice page 2 and Learning Check 1.1–1.3 #2 without notes. Cover numerical inputs, expression inputs, reverse lookup, composites, f±g and f=g."
  },
  "1.3": {
    label: "DOMAIN & RANGE",
    title: "Which inputs work?<br><em>Which outputs happen?</em>",
    lead: "Domain lists possible x-values. Range lists the y-values the relation actually reaches. Endpoints and gaps count.",
    strip: ["domain = x", "→", "rule or graph", "→", "range = y"],
    video: {id:"KyOQhC8ctxc",title:"Domain and range from graphs · The Organic Chemistry Tutor",url:"https://www.youtube.com/watch?v=KyOQhC8ctxc"},
    more: [{title:"Interval notation & endpoints",url:"https://www.youtube.com/watch?v=Ww7xtG2S7IM"},{title:"Khan: why domain matters",url:"https://www.khanacademy.org/math/algebra2/x2f1f4d0/x2f1f4d1a/v/domain-and-range-of-a-function"}],
    watch: "Pause on a graph and trace left-to-right for domain, then bottom-to-top for range. Check whether the end dots are open or closed.",
    whyTitle: "A domain comes from what the rule permits",
    why: ["An open dot means that endpoint is missing; use a parenthesis or a strict inequality. A filled dot includes it; use a bracket or an inclusive inequality.","For √(2-x), the amount under the root cannot be negative, so 2-x ≥ 0 and x ≤ 2. The square root output cannot be negative, so the range begins at 0.","For -3(x+1)²+6, the squared part is never negative. Multiplying by -3 makes it nonpositive, then adding 6 makes 6 the highest output."],
    worked: {title:"Find the range of g(x)=-3(x+1)²+6.",start:"Use the square before guessing from the graph.",steps:["(x+1)² ≥ 0 for every real x.","-3(x+1)² ≤ 0, so adding 6 gives g(x) ≤ 6.","The maximum 6 occurs at x=-1. Range: (-∞, 6]."]},
    sheet: "Use 1.3 Domain and Range Class Notes, the interval worksheet, and 1.3 Domain and Range pages 4–6. Practise discrete sets, graph endpoints, constant and vertical lines, radicals, quadratics, and unions of intervals."
  },
  "1.4": {
    label: "PARENT FUNCTIONS",
    title: "Know the five<br><em>starting shapes.</em>",
    lead: "A parent function is the simplest version of a graph family. Its key points, domain, range and special features help you understand every transformed version.",
    strip: ["x", "x²", "√x", "1/x", "|x|"],
    video: {id:"96gBgZv-y9g",title:"Five parent functions · AlRichards314",url:"https://www.youtube.com/watch?v=96gBgZv-y9g"},
    more: [{title:"Ontario lesson: parent functions",url:"https://www.youtube.com/watch?v=A2Xp6aaFYnw"},{title:"Transformations overview",url:"https://www.youtube.com/watch?v=Tmdrjs9xufc"}],
    watch: "For each graph, pause and sketch three key points. Say its domain, range and one feature before the answer appears.",
    whyTitle: "The shape follows the rule",
    why: ["x² and |x| cannot output a negative number, so both start at y=0, but one curves and one makes a V. The distance meaning of |x| explains the V.","√x needs x≥0 in the real numbers and returns the nonnegative root. The graph begins at (0,0).","1/x cannot accept x=0 because division by zero is undefined. It approaches both axes without touching them; x=0 and y=0 are asymptotes."],
    worked: {title:"Why is the domain of √x [0,∞)?",start:"Use the meaning of a real square root.",steps:["√x asks for a real number whose square is x.","A real square cannot be negative, so x must be at least 0.","0 works, so include it: domain [0,∞). The outputs are also nonnegative."]},
    sheet: "Use 1.4 Parent Functions. Make a five-row table for linear, quadratic, square root, reciprocal and absolute value. For each, sketch key points and state domain, range, vertex or asymptotes when applicable."
  },
  "1.5": {
    label: "TRANSFORMATIONS",
    title: "Move the graph.<br><em>Know why it moved.</em>",
    lead: "In g(x)=a f(k(x-d))+c, changes outside f affect outputs; changes inside f affect inputs. That is why horizontal factors act reciprocally.",
    strip: ["(u, v)", "→", "(u/k + d, av + c)"],
    video: {id:"Tmdrjs9xufc",title:"Transformations of functions · The Organic Chemistry Tutor",url:"https://www.youtube.com/watch?v=Tmdrjs9xufc"},
    more: [{title:"Ontario: horizontal transformations",url:"https://www.youtube.com/watch?v=tF4P2Y47Odk"},{title:"Khan: why horizontal scaling reverses",url:"https://www.khanacademy.org/math/get-ready-for-precalculus/x65c069afc012e9d0:get-ready-for-composite-and-inverse-functions/x65c069afc012e9d0:scaling-functions/v/scaling-functions-horizontally"}],
    watch: "Pause on every transformed graph. Choose one old point and calculate where it lands before looking at the drawing.",
    whyTitle: "Solve for the new input",
    why: ["If the old graph has point (u,v), its output is f(u)=v. For the new graph, set k(x-d)=u. Solving gives x=u/k+d; the new output is av+c.","That one equation explains the inside reversal: f(2x) reaches the old feature at u when x=u/2, so it compresses horizontally by a factor of 1/2.","A negative a reflects over the x-axis because it changes the sign of every output. A negative k reflects over the y-axis because it changes the sign of the input."],
    worked: {title:"Where does (4,5) go under g(x)=f(2(x-3))+1?",start:"Make the new inside equal the old input 4.",steps:["Set 2(x-3)=4, giving x-3=2 and new x=5.","The outside +1 changes output 5 to 6.","So the point (4,5) moves to (5,6)."]},
    sheet: "Use 1.5 Exploring Transformations pages 1–6. Identify a, k, d and c only after writing the inside as k(x-d). Practise point mappings, reflection axes, and why the horizontal scale is 1/|k|. Then try assigned Nelson p. 70 #4, 6, 10, 16–18."
  },
  "1.6": {
    label: "GRAPHING TRANSFORMATIONS",
    title: "Turn the rule into<br><em>a whole graph.</em>",
    lead: "Start from a parent shape. Factor the inside, move several key points, and then use the transformed features to sketch, label, and find domain and range.",
    strip: ["parent points", "→", "(u/k+d, av+c)", "→", "new graph"],
    video: {id:"_mUfeLOWHcM",title:"Graphing transformed functions · Mario's Math Tutoring",url:"https://www.youtube.com/watch?v=_mUfeLOWHcM"},
    more: [{title:"Five parent shapes before graphing",url:"https://www.lulumath.com/videos/algebra/functions/parent-functions"},{title:"One clear transformation at a time",url:"https://www.lulumath.com/videos/algebra/functions/transformations-of-functions-summary"}],
    watch: "Pause before each new point is plotted. Write its old coordinates and calculate its new coordinates yourself. At the end, name the domain and range without copying.",
    whyTitle: "The mapping keeps every point consistent",
    why: ["For an old point (u,v), the new graph must use the same input inside f. Set k(x-d)=u, so x=u/k+d. Outside f, the old output v becomes av+c.","Factor the inside first. In f(-5x+10), write -5(x-2): k=-5 and d=2. Reading +10 as a vertical shift or reading d=10 would place the graph incorrectly.","Map several useful points and special features. The starting point of √x, the vertex of x² or |x|, and the asymptotes of 1/x anchor the sketch. Check domain and range from the finished graph."],
    worked: {title:"Sketch g(x)=-2√(x-3)+1 from f(x)=√x.",start:"Choose parent points with easy square roots: (0,0), (1,1), and (4,2).",steps:["Here a=-2, k=1, d=3, c=1. Map (u,v) to (u+3,-2v+1).","The parent points become (3,1), (4,-1), and (7,-3). Plot these and draw the falling square-root curve starting at (3,1).","The graph starts at x=3 and extends right, so domain is [3,∞). Its highest y is 1 and it falls without bound, so range is (-∞,1]."]},
    sheet: "Use Nelson 1.8, pp. 61–73: start with p. 70 #1–6, then p. 71 #7–17 and p. 73 #19–21. Graph on paper, label key points and asymptotes, and state domain and range. For a cumulative check, try Chapter Review p. 77 #14–19. This is your teacher's 1.6, despite the textbook number."
  },
  "1.7": {
    label: "INVERSE FUNCTIONS",
    title: "Undo the rule.<br><em>Swap the viewpoint.</em>",
    lead: "An inverse reverses input and output. That swaps coordinates, reflects the graph over y=x, and exchanges domain with range.",
    strip: ["f: x → y", "→", "inverse: y → x"],
    video: {id:"TN4ybFiuV3k",title:"Inverse functions explained · The Organic Chemistry Tutor",url:"https://www.youtube.com/watch?v=TN4ybFiuV3k"},
    more: [{title:"See the reflection across y=x",url:"https://www.youtube.com/watch?v=ukEtad_aml4"},{title:"Khan Academy: a linear inverse example",url:"https://en.khanacademy.org/math/get-ready-for-precalculus/x65c069afc012e9d0%3Aget-ready-for-composite-and-inverse-functions/x65c069afc012e9d0%3Aintro-to-inverse-functions/v/function-inverse-example-1"}],
    watch: "Before the presenter solves for the inverse, predict what (2,7) becomes. For each equation, reverse the operations yourself, then check by composing the two rules.",
    whyTitle: "An inverse reverses the arrows",
    why: ["If f sends input 2 to output 7, the inverse relation sends 7 back to 2. Thus (2,7) becomes (7,2), and the graph mirrors across y=x.","For f(x)=3x+5, the original multiplies by 3, then adds 5. Reverse in the opposite order: subtract 5, then divide by 3. So f⁻¹(x)=(x-5)/3.","An inverse relation is a function only when each original output came from one input. A horizontal line test checks this. The inverse of a horizontal line is vertical and fails the function test. f⁻¹ is inverse notation, not 1/f."],
    worked: {title:"Find and check the inverse of f(x)=3x+5.",start:"Reverse the operations, then prove a sample input returns to itself.",steps:["Write y=3x+5. Switch x and y: x=3y+5.","Solve for y: y=(x-5)/3, so f⁻¹(x)=(x-5)/3.","Check: f⁻¹(f(2))=f⁻¹(11)=(11-5)/3=2. The inverse undoes f."]},
    sheet: "Use Nelson 1.5, pp. 41–49 (your teacher's 1.7). On pp. 46–49, practise reversing linear rules, swapping x and y, sketching reflections, and swapping domain/range. Then try Chapter Review p. 76 #10–11 and Self-Test p. 78 #4–6."
  }
};

const references={
  "1.1":"<h3>Four ways to check</h3><ul><li><strong>Ordered pairs:</strong> one x cannot appear with two different y-values.</li><li><strong>Mapping:</strong> each input has exactly one outgoing arrow.</li><li><strong>Graph:</strong> every vertical line hits at most once.</li><li><strong>Equation:</strong> each allowed x must determine one y.</li></ul><p>Domain = distinct inputs. Range = distinct outputs.</p>",
  "1.2":"<h3>Read the notation</h3><table><thead><tr><th>You see</th><th>You do</th></tr></thead><tbody><tr><td>f(a)</td><td>Put a into f.</td></tr><tr><td>f(x+2)</td><td>Replace every x in f with (x+2).</td></tr><tr><td>f(g(a))</td><td>Find g(a), then put its output into f.</td></tr><tr><td>f(x)=b</td><td>Set f's rule equal to b and solve for x.</td></tr><tr><td>f(x)=g(x)</td><td>Set the two rules equal and solve.</td></tr></tbody></table>",
  "1.3":"<h3>Endpoints and intervals</h3><table><thead><tr><th>Statement</th><th>Interval</th><th>Graph endpoint</th></tr></thead><tbody><tr><td>x&gt;a</td><td>(a,∞)</td><td>Open</td></tr><tr><td>x≥a</td><td>[a,∞)</td><td>Filled</td></tr><tr><td>x&lt;a</td><td>(-∞,a)</td><td>Open</td></tr><tr><td>x≤a</td><td>(-∞,a]</td><td>Filled</td></tr></tbody></table><p>Infinity always uses a parenthesis. For a graph, scan left-to-right for domain and bottom-to-top for range. Set-builder notation such as {x∈ℝ | x≥3} says the same thing as [3,∞). A discrete context, such as a number of tickets, may permit only whole-number inputs.</p>",
  "1.4":"<h3>Five parent functions</h3><table><thead><tr><th>Rule</th><th>Domain</th><th>Range</th><th>Key feature</th></tr></thead><tbody><tr><td>x</td><td>All real</td><td>All real</td><td>Line through (0,0)</td></tr><tr><td>x²</td><td>All real</td><td>[0,∞)</td><td>Vertex (0,0); axis x=0</td></tr><tr><td>√x</td><td>[0,∞)</td><td>[0,∞)</td><td>Starts at (0,0)</td></tr><tr><td>1/x</td><td>x≠0</td><td>y≠0</td><td>Asymptotes x=0, y=0</td></tr><tr><td>|x|</td><td>All real</td><td>[0,∞)</td><td>V shape; vertex (0,0)</td></tr></tbody></table>",
  "1.5":"<h3>Transformation map</h3><table><thead><tr><th>Change</th><th>Effect</th><th>Why</th></tr></thead><tbody><tr><td>f(x)+c</td><td>Up/down c</td><td>Output changes</td></tr><tr><td>f(x-d)</td><td>Right/left d</td><td>New x-d equals old x</td></tr><tr><td>a f(x)</td><td>Vertical scale |a|</td><td>Output multiplied by a</td></tr><tr><td>f(kx)</td><td>Horizontal scale 1/|k|</td><td>New input x=old x/k</td></tr><tr><td>a&lt;0 / k&lt;0</td><td>Reflect in x / y axis</td><td>Output / input sign reverses</td></tr></tbody></table><p>For g(x)=a f(k(x-d))+c, (u,v) moves to (u/k+d, av+c). Factor the inside before reading k and d.</p>",
  "1.6":"<h3>Graphing checklist</h3><ol><li>Identify the parent among x, x², √x, 1/x, |x|.</li><li>Factor the inside to read k and d correctly.</li><li>Choose at least three parent points (u,v).</li><li>Map each to (u/k+d, av+c).</li><li>Plot, connect in the parent's shape, and move any asymptotes.</li><li>State domain and range from the finished graph.</li></ol><p>For a transformed reciprocal, the asymptotes become x=d and y=c. For a transformed square root, the endpoint is (d,c), and the direction depends on the signs of a and k.</p>",
  "1.7":"<h3>Inverse checklist</h3><ol><li>Swap every ordered pair (x,y) → (y,x).</li><li>For an equation, write y=f(x), swap x and y, then solve for y.</li><li>Check by substituting: f⁻¹(f(x))=x wherever both rules allow it.</li><li>On a graph, reflect across y=x.</li><li>Original domain ↔ inverse range; original range ↔ inverse domain.</li></ol><p>The inverse relation is a function if the original graph passes the horizontal line test. f⁻¹(x) does not mean 1/f(x).</p>"
};

const C=(id,section,tag,prompt,context,options,correct,hints,explanation)=>({id,section,tag,prompt,context,kind:"choice",options,correct,hints,explanation});
const T=(id,section,tag,prompt,context,answers,hints,explanation)=>({id,section,tag,prompt,context,kind:"text",answers,hints,explanation});

const questions = [
  C("11a","1.1","Repeated inputs","Is this relation a function?","{(-2,1), (0,3), (-2,4)}",["Yes","No"],1,["Check whether any first number repeats.","The input -2 has outputs 1 and 4."],"No. One input, -2, leads to two different outputs. A function needs exactly one output for each input."),
  C("11b","1.1","Repeated outputs","Is this relation a function?","{(1,5), (2,5), (3,7)}",["Yes","No"],0,["Check the first numbers, not the second numbers.","Inputs 1, 2 and 3 are all different."],"Yes. Different inputs may share an output. It is repeated inputs with different outputs that cause trouble."),
  C("11c","1.1","Vertical-line test","Is x = -2 a function of x?","Think of its graph as a vertical line.",["Yes","No"],1,["Can one x-value have multiple y-values?","At x=-2, every point on the vertical line is possible."],"No. x=-2 pairs one input with infinitely many y-values, so a vertical line hits the graph more than once."),
  C("11d","1.1","Equations","Is y = 3(x-1)² + 2 a function of x?","Decide whether each x gives one y.",["Yes","No"],0,["Substitute any one x-value.","Squaring a number still gives one definite result."],"Yes. Every x has one squared value and therefore one y-value."),
  C("11e","1.1","Domain from a set","What is the domain?","{(1,5), (2,5), (3,7)}",["{1,2,3}","{5,7}","{1,2,3,5,7}"],0,["Domain means inputs.","Use the first coordinate of each ordered pair."],"The domain is {1,2,3}. Domain lists first coordinates; range would be {5,7}."),
  C("11f","1.1","Circle relation","Is x²+y²=9 a function of x?","Use x=0 to test whether one input can have two outputs.",["No","Yes"],0,["At x=0, y²=9.","Both y=3 and y=-3 work."],"No. The input x=0 gives two outputs, 3 and -3. The circle fails the vertical-line test, as in your 1.1 class notes."),

  T("12a","1.2","Two rules, one expression","Find f(-5) - 2g(1).","f(x)=x²     g(x)=3x+4",["11"],["Find f(-5) and g(1) separately.","f(-5)=25 and g(1)=7."],"f(-5)=25 and 2g(1)=2(7)=14, so 25-14=11. The 2 multiplies the output of g."),
  C("12b","1.2","Whole expression as input","What is f(3+n)?","f(x)=x²",["(3+n)²","9+n","3+n²","9+n²"],0,["Replace x with the entire input.","Put parentheses around 3+n before squaring."],"f(3+n)=(3+n)². The whole input is squared; it cannot be distributed as 9+n²."),
  T("12c","1.2","Composition","Find f(g(-1)).","f(x)=x²     g(x)=3x+4",["1"],["Work from the inside: g(-1).","g(-1)=3(-1)+4=1."],"g(-1)=1, so f(g(-1))=f(1)=1²=1. The inner output becomes the outer input."),
  C("12d","1.2","Equal outputs","For which x is f(x)=g(x)?","f(x)=x²     g(x)=3x+4",["x=-1 or x=4","x=1 or x=-4","x=4 only","x=-1 only"],0,["Set x² equal to 3x+4.","Factor x²-3x-4 as (x-4)(x+1)."],"x²=3x+4 gives (x-4)(x+1)=0, so x=4 or x=-1. These are inputs where both functions output the same number."),
  T("12e","1.2","Order of composition","Find g(f(-3)).","f(x)=3x+5     g(x)=x²+6x",["-8"],["The inside is f(-3), not g(-3).","f(-3)=3(-3)+5=-4."],"f(-3)=-4. Then g(-4)=(-4)²+6(-4)=16-24=-8. Switching the order would be a different problem."),
  C("12f","1.2","Expression substitution","Which expression is g(3m+2)?","g(x)=2x²+3x",["2(3m+2)²+3(3m+2)","2(3m)²+2+3m","2(3m+2)+3(3m+2)²"],0,["Replace every x, not just the first one.","The first x is squared; the second x is multiplied by 3."],"Every x is replaced by the complete input 3m+2, giving 2(3m+2)²+3(3m+2)."),
  T("12g","1.2","Learning Check mix","Find 2g(-3) + 3f(0).","f(x)=x²-1     g(x)=2/(x+1)+2",["-1"],["Calculate each output separately.","g(-3)=1 and f(0)=-1."],"2g(-3)+3f(0)=2(1)+3(-1)=-1. The coefficients multiply the completed function outputs."),
  T("12h","1.2","Nested rational rule","Find h(g(9)).","g(x)=2/(x+1)+2     h(x)=3x-7",["-2/5","-0.4"],["Calculate g(9) first.","g(9)=2/10+2=11/5."],"h(g(9))=h(11/5)=3(11/5)-7=33/5-35/5=-2/5."),
  C("12i","1.2","Expand after substituting","What is 2f(x+2) simplified?","f(x)=x²-1",["2x²+8x+6","2x²+4x+2","2x²+8x+8","x²+4x+3"],0,["First write 2[(x+2)²-1].","(x+2)²=x²+4x+4."],"2f(x+2)=2[(x+2)²-1]=2(x²+4x+3)=2x²+8x+6."),
  T("12j","1.2","Reverse lookup","Find x when f(x)=-10.","f(x)=3x+2",["-4"],["Set the rule equal to -10.","3x+2=-10."],"3x+2=-10, so 3x=-12 and x=-4. Here the output was given and you worked backward to the input."),
  C("12k","1.2","Symbolic composition","Which is g(f(x)) simplified?","f(x)=3x-4     g(x)=x²-3",["9x²-24x+13","3x²-13","9x²-24x-13"],0,["Put f(x) into g's input slot.","g(f(x))=(3x-4)²-3."],"(3x-4)²-3=9x²-24x+16-3=9x²-24x+13. g(f(x)) is different from f(g(x))."),
  C("12l","1.2","Function arithmetic","What is 2f(x)-3g(x) simplified?","f(x)=7x     g(x)=2x-3",["8x+9","8x-9","20x-3"],0,["Multiply each entire rule first.","2(7x)-3(2x-3)=14x-6x+9."],"2f(x)-3g(x)=14x-6x+9=8x+9. The -3 multiplies both terms in g."),
  C("12m","1.2","Reverse lookup from a set","For which x is f(x)=0?","{(-1,3), (-3,-1), (0,1), (2,1), (3,0), (-2,0)}",["x=-2 and x=3","x=0 only","x=-3 and x=-1"],0,["Find pairs whose second coordinate is 0.","Read their first coordinates."],"The pairs (3,0) and (-2,0) have output 0, so x=3 and x=-2."),
  T("12n","1.2","Fraction input","Find f(1/2).","f(x)=2x²+3x-1",["1","1.0"],["Replace x with (1/2) everywhere.","2(1/2)²+3(1/2)-1 = 1/2+3/2-1."],"2(1/4)+3/2-1=1/2+3/2-1=1. Parentheses keep the fraction together."),
  T("12o","1.2","Triple composition","Find f(g(h(4))).","f(x)=2x+3     g(x)=-x²+1     h(x)=x",["-27"],["Start with h(4), then put that into g.","h(4)=4 and g(4)=-16+1=-15."],"Read inside out: h(4)=4, g(4)=-15, then f(-15)=2(-15)+3=-27. This matches the longer compositions on page 5 of your handout."),
  T("12p","1.2","Nested set lookup","Find f(f(-4)).","f is given by {(-4,2), (2,-2), (-2,5)}",["-2"],["Find f(-4) from the pair with first coordinate -4.","f(-4)=2, so the next lookup is f(2)."],"f(-4)=2, then f(2)=-2. The first output becomes the second input."),

  C("13a","1.3","Discrete domain","What is the domain?","{(-3,4), (5,-6), (-2,7), (5,3), (6,-8)}",["{-3,-2,5,6}","{-8,-6,3,4,7}","{-3,-2,5,5,6}"],0,["Take the x-values.","A set lists 5 only once."],"Domain is {-3,-2,5,6}. Sets do not repeat 5. This relation is not a function because 5 has two outputs."),
  C("13b","1.3","Inequality to interval","Write x ≥ 4 in interval notation.","Include or exclude 4?",["[4,∞)","(4,∞)","(-∞,4]"],0,["The ≥ includes 4.","Infinity is never an endpoint you can include."],"[4,∞). The bracket includes 4; infinity always has a parenthesis."),
  C("13c","1.3","Interval to inequality","What inequality means (-∞,-8]?","The right endpoint has a bracket.",["x≤-8","x<-8","x≥-8"],0,["Which direction extends toward negative infinity?","The bracket includes -8."],"x≤-8. The interval extends left forever and includes -8."),
  C("13d","1.3","Constant function","What is the range of y=-3?","Imagine a horizontal line.",["{-3}","All real numbers","{-3,0}"],0,["Range means outputs.","A horizontal line always has the same y."],"Range is {-3}; every x produces the one output -3. Its domain is all real numbers."),
  C("13e","1.3","Vertical line","Which statement is true for x=-3?","Consider all the points on the line.",["Domain {-3}; range all real; not a function","Domain all real; range {-3}; function","Domain {-3}; range {-3}; function"],0,["A vertical line fixes x.","Its y-values can vary without limit."],"Only x=-3 occurs, but every y can occur. Since one x has many outputs, this is not a function."),
  C("13f","1.3","Quadratic range","What is the range of g(x)=-3(x+1)²+6?","The parabola opens downward.",["(-∞,6]","[6,∞)","(-∞,6)","All real numbers"],0,["The squared part is never negative.","What is the largest output? Does it happen?"],"The greatest value is 6 at x=-1, so the range is (-∞,6]. The bracket includes the maximum."),
  C("13g","1.3","Radical domain","What is the domain of h(x)=√(2-x)?","Use real-number square roots.",["(-∞,2]","[2,∞)","(-∞,2)","All real numbers"],0,["The amount under the root must be ≥ 0.","Solve 2-x≥0."],"2-x≥0 means x≤2. The endpoint 2 works because √0=0, so the domain is (-∞,2]."),
  C("13h","1.3","Open vs closed","What is f(1)?","At x=1, the graph has an open circle at (1,1) and a filled circle at (1,1/2).",["1/2","1","No value"],0,["Only a filled point belongs to the graph.","Which point is filled at x=1?"],"f(1)=1/2. The open circle at y=1 is excluded; the filled point gives the actual output."),
  C("13i","1.3","Union of intervals","Which interval describes x between -3 and -2 (excluding both), or x greater than 6?","There are two separate pieces.",["(-3,-2) ∪ (6,∞)","[-3,-2] ∪ [6,∞)","(-3,6)"],0,["Write each piece separately.","All three finite endpoints are excluded."],"(-3,-2) ∪ (6,∞). The union symbol combines two separate allowed regions."),
  C("13j","1.3","Mixed endpoints","Write -3 ≤ x < 4 in interval notation.","Include -3, exclude 4.",["[-3,4)","(-3,4]","[-3,4]"],0,["Use a bracket for ≤.","Use a parenthesis for <."],"[-3,4). The left endpoint belongs to the set; the right endpoint does not."),
  C("13k","1.3","Set-builder notation","Which set-builder statement means (-∞,-2) ∪ [3,∞)?","There is a gap between -2 and 3.",["{x∈ℝ | x<-2 or x≥3}","{x∈ℝ | -2≤x<3}","{x∈ℝ | x≤-2 or x>3}"],0,["The left piece excludes -2.","The right piece includes 3."],"The union means x<-2 or x≥3. The set-builder statement keeps those two separate conditions."),
  C("13l","1.3","Discrete context","What is a reasonable domain for the number n of tickets sold?","You cannot sell part of a ticket and cannot sell a negative number.",["{0,1,2,3,…}","[0,∞) including fractions","All real numbers"],0,["Think of whole counts.","Zero sales is possible; fractions are not."],"The number of tickets is a nonnegative integer: {0,1,2,3,…}. Context can restrict a domain more than the algebraic formula alone."),

  C("14a","1.4","Recognize a parent","Which parent has asymptotes x=0 and y=0?","Pick the starting rule.",["f(x)=1/x","f(x)=x²","f(x)=|x|"],0,["Which rule forbids x=0?","Division by zero is undefined."],"The reciprocal parent 1/x approaches the axes, but x=0 is undefined and 1/x never equals 0."),
  C("14b","1.4","Square-root parent","What is the domain of f(x)=√x?","Use real numbers.",["[0,∞)","(-∞,∞)","(0,∞)"],0,["Can a real square be negative?","√0 is allowed."],"The input must satisfy x≥0. Zero is included, so the domain is [0,∞)."),
  C("14c","1.4","Absolute value","Why is the range of f(x)=|x| nonnegative?","Think of distance from 0.",["Distance cannot be negative","The input must be positive","The graph has an asymptote"],0,["What does absolute value measure?","Distances are 0 or greater."],"|x| is distance from zero, so it cannot be negative. Its range is [0,∞), even though its domain includes negative inputs."),
  C("14d","1.4","Quadratic parent","What are the vertex and axis of symmetry of y=x²?","Sketch a few points if needed.",["Vertex (0,0), axis x=0","Vertex (0,0), axis y=0","Vertex (1,1), axis x=1"],0,["The smallest square is 0.","The left and right sides mirror across which vertical line?"],"The minimum is at (0,0), and x and -x produce the same output, so the axis of symmetry is x=0."),
  C("14e","1.4","Linear parent","What are the domain and range of y=x?","Think of every possible real input.",["Both all real numbers","Both [0,∞)","Domain all real; range [0,∞)"],0,["Can x be negative?","Does y=x cover negative outputs too?"],"Every real input is allowed, and the output equals that input. Domain and range are both all real numbers."),
  C("14f","1.4","Reciprocal restriction","Why is x=0 excluded from f(x)=1/x?","Use the equation itself.",["Division by zero is undefined","Zero is an asymptote in every function","The numerator is zero"],0,["What would 1/0 mean?","No real number multiplied by 0 equals 1."],"1/0 has no real value, so x=0 is excluded. This creates the vertical asymptote x=0."),

  C("15a","1.5","Translations","How does g(x)=f(x-3)+2 move f?","Use the inside and outside separately.",["Right 3, up 2","Left 3, up 2","Right 3, down 2"],0,["To use the old input u, solve x-3=u.","The outside +2 adds to every output."],"An old point (u,v) becomes (u+3,v+2), so the graph moves right 3 and up 2."),
  C("15b","1.5","Horizontal factor","What does g(x)=f(2x) do horizontally?","Assume a nontrivial parent graph such as x².",["Compress by 1/2","Stretch by 2","Compress by 2"],0,["Set 2x equal to an old input u.","Then x=u/2."],"A feature at old input u appears at new x=u/2. Every x-coordinate halves, so the graph compresses horizontally by 1/2."),
  C("15c","1.5","Vertical reflection","What does g(x)=-f(x) do?","The negative sign is outside f.",["Reflect in the x-axis","Reflect in the y-axis","Shift down 1"],0,["What happens to output y?","It becomes -y."],"Each point (x,y) becomes (x,-y), which reflects the graph across the x-axis."),
  C("15d","1.5","Horizontal reflection","What does g(x)=f(-x) do?","The negative sign is inside f.",["Reflect in the y-axis","Reflect in the x-axis","Shift left 1"],0,["To use old input u, set -x=u.","Then new x=-u."],"Each old point (u,v) becomes (-u,v), a reflection across the y-axis."),
  C("15e","1.5","Point mapping","If (2,-1) is on f, which point is on g(x)=3f(x)?","Only the output changes.",["(2,-3)","(6,-1)","(2,2)"],0,["The x-coordinate stays 2.","Multiply the old y-value -1 by 3."],"The point becomes (2,3(-1))=(2,-3). Outside multiplication scales y-values."),
  C("15f","1.5","Combined mapping","If (1,5) is on f, where is it on g(x)=-2f(x-4)+3?","Use x-4=1.",["(5,-7)","(-3,-7)","(5,13)"],0,["Solve x-4=1, so new x=5.","New y=-2(5)+3."],"The old input 1 appears at new x=5, and output 5 becomes -2(5)+3=-7. New point: (5,-7)."),
  C("15g","1.5","Horizontal stretch","Which k in g(x)=f(kx) makes a horizontal stretch by factor 2?","Use the reciprocal horizontal rule.",["k=1/2","k=2","k=-2"],0,["New x=old x/k.","To double x-coordinates, divide by 1/2."],"k=1/2. The new input for an old feature u is u/(1/2)=2u."),
  C("15h","1.5","Read a,k,d,c","For g(x)=-3f(2(x+1))-4, what are a,k,d,c?","Write the inside as k(x-d).",["a=-3, k=2, d=-1, c=-4","a=-3, k=2, d=1, c=-4","a=3, k=2, d=-1, c=4"],0,["x+1 means x-(-1).","Match g(x)=a f(k(x-d))+c."],"a=-3, k=2, d=-1, c=-4. The inside must be read in factored k(x-d) form."),
  C("15i","1.5","Factor the inside","For g(x)=1/2·f(8-4x)+3, what are a,k,d,c?","First factor 8-4x as -4(x-2).",["a=1/2, k=-4, d=2, c=3","a=1/2, k=4, d=-2, c=3","a=1/2, k=-4, d=-2, c=3"],0,["Write 8-4x=-4(x-2).","Now compare with a f(k(x-d))+c."],"8-4x=-4(x-2), so a=1/2, k=-4, d=2 and c=3. The negative k also gives a y-axis reflection before translation."),
  C("15j","1.5","Equation from words","Which rule comes from y=|x| after a vertical stretch by 3, reflection in the x-axis, shift right 2 and up 5?","Use g(x)=a|x-d|+c.",["g(x)=-3|x-2|+5","g(x)=3|x+2|+5","g(x)=-3|x+2|-5"],0,["Stretch and reflect make a=-3.","Right 2 means x-2; up 5 means +5 outside."],"The rule is g(x)=-3|x-2|+5. The vertex moves from (0,0) to (2,5), and the V opens downward."),

  C("16a","1.6","Graph a square root","Where does parent point (4,2) move?","f(x)=√x; g(x)=-2√(x-3)+1",["(7,-3)","(1,-3)","(7,5)"],0,["The inside x-3 must equal the old input 4.","New x=7; new y=-2(2)+1."],"(4,2) becomes (7,-3). Plotting this point with the new endpoint helps set the curve's shape."),
  C("16b","1.6","Domain and range from a sketch","What are the domain and range?","g(x)=-2√(x-3)+1",["Domain [3,∞), range (-∞,1]","Domain (-∞,3], range [1,∞)","Domain [3,∞), range [1,∞)"],0,["The root requires x-3≥0.","-2 times a nonnegative number is ≤0; then add 1."],"The graph begins at (3,1) and falls rightward: domain [3,∞), range (-∞,1]."),
  C("16c","1.6","Factor before graphing","For g(x)=f(-4x+8), what are k and d?","Write the inside in k(x-d) form.",["k=-4, d=2","k=-4, d=8","k=4, d=-2"],0,["Factor -4 from both terms.","-4x+8=-4(x-2)."],"The factored inside is -4(x-2), so k=-4 and d=2. The horizontal scale is 1/4, with a reflection and a shift right 2."),
  C("16d","1.6","Graph a quadratic","Which vertex and range go with g(x)=2(x+1)²-3?","Start from parent y=x².",["Vertex (-1,-3); range [-3,∞)","Vertex (1,-3); range [-3,∞)","Vertex (-1,-3); range (-∞,-3]"],0,["The parent vertex (0,0) moves left 1 and down 3.","The positive factor 2 keeps the parabola opening up."],"Vertex (-1,-3) is the lowest point. The graph rises on both sides, so the range is [-3,∞)."),
  C("16e","1.6","Move asymptotes","What are the asymptotes of g(x)=3/(x-2)+4?","Start from y=1/x, whose asymptotes are x=0 and y=0.",["x=2 and y=4","x=-2 and y=4","x=2 and y=0"],0,["The parent shifts right 2 and up 4.","Asymptotes move with the graph."],"The vertical asymptote moves to x=2 and the horizontal one to y=4. Thus x=2 is excluded from the domain and y=4 from the range."),
  C("16f","1.6","Read an absolute-value graph","What are the vertex and range of g(x)=-|2(x-1)|+3?","The parent y=|x| has vertex (0,0).",["Vertex (1,3); range (-∞,3]","Vertex (-1,3); range [3,∞)","Vertex (1,-3); range (-∞,-3]"],0,["The inside is zero at x=1.","The negative outside flips the V downward."],"The vertex is (1,3), the maximum. The graph extends downward, giving range (-∞,3]."),
  T("16g","1.6","Full point map","Where does (4,-1) land? Give the new y-coordinate.","g(x)=-2f(2(x+1))+3",["5"],["Here a=-2, k=2, d=-1, c=3.","The new y is -2(-1)+3."],"The new point is (1,5): x=4/2-1=1 and y=-2(-1)+3=5."),
  C("16h","1.6","Equation from a graph","Which rule matches a square-root graph starting at (2,-1), falling through (3,-3)?","Use f(x)=√x as the parent.",["g(x)=-2√(x-2)-1","g(x)=2√(x-2)-1","g(x)=-2√(x+2)-1"],0,["The start point sets d=2 and c=-1.","At x=3, √(3-2)=1, so the output must drop by 2."],"g(x)=-2√(x-2)-1 begins at (2,-1). At x=3 it gives -3, matching the second point."),
  C("16i","1.6","Reciprocal restrictions","What are the domain and range of g(x)=1/[-2(x+3)]+1?","Find where the denominator is zero and the shifted horizontal asymptote.",["x≠-3; y≠1","x≠3; y≠1","x≠-3; y≠0"],0,["-2(x+3)=0 at x=-3.","A nonzero reciprocal term plus 1 can never equal 1."],"Domain excludes x=-3. The reciprocal term is never zero, so range excludes y=1."),
  C("16j","1.6","Reverse a root horizontally","What is the domain of g(x)=√[-2(x-1)]+4?","Use real square roots.",["(-∞,1]","[1,∞)","(-∞,-1]"],0,["The radicand must be nonnegative.","-2(x-1)≥0 means x≤1."],"The graph extends left from x=1. Since -2(x-1)≥0 only when x≤1, domain is (-∞,1]."),
  C("16k","1.6","Equation from a parabola","Which rule has vertex (3,2), opens down, and passes through (4,0)?","Write y=a(x-3)²+2.",["y=-2(x-3)²+2","y=2(x-3)²+2","y=-(x-3)²+2"],0,["At (4,0), substitute x=4 and y=0.","0=a(1)²+2, so a=-2."],"The vertex sets d=3 and c=2. The point (4,0) gives a=-2, so y=-2(x-3)²+2."),
  C("16l","1.6","Keep a sketch consistent","Which process correctly sketches g(x)=a f(k(x-d))+c?","Start from the parent graph.",["Map several parent points with (u/k+d, av+c), then connect in the parent shape","Add k to every x and a to every y","Move only the vertex or endpoint and leave all other points fixed"],0,["The whole graph must transform, not one point.","Inside changes x reciprocally; outside changes y."],"The same mapping applies to every parent point and special feature. Multiple mapped points keep the sketch's scale and orientation correct."),

  C("17a","1.7","Swap ordered pairs","Which point is on the inverse relation if (2,7) is on f?","The inverse reverses input and output.",["(7,2)","(-2,-7)","(2,1/7)"],0,["Switch first and second coordinates.","The old output 7 becomes the new input."],"(2,7) becomes (7,2). This is the coordinate effect of reflection across y=x."),
  C("17b","1.7","Inverse equation","What is f⁻¹(x) if f(x)=2x-7?","Reverse the operations.",["(x+7)/2","(x-7)/2","2x+7"],0,["f multiplies by 2, then subtracts 7.","Undo by adding 7, then dividing by 2."],"Write y=2x-7, swap x and y, and solve: x=2y-7, so y=(x+7)/2."),
  C("17c","1.7","Reverse a fraction rule","What is f⁻¹(x) if f(x)=(x-4)/3?","Undo division and subtraction in reverse order.",["3x+4","3x-4","(x+4)/3"],0,["The last original step divided by 3.","First multiply by 3, then add 4."],"If y=(x-4)/3, then 3y=x-4, so x=3y+4. Thus f⁻¹(x)=3x+4."),
  T("17d","1.7","Evaluate the inverse","Find f⁻¹(9).","f(x)=2x+1",["4"],["Which input gives output 9?","Solve 2x+1=9."],"f(4)=9, so f⁻¹(9)=4. An inverse input is an original output."),
  C("17e","1.7","Swap domain and range","If f has domain [0,∞) and range [2,∞), what are the inverse relation's domain and range?","Inverse points swap coordinates.",["Domain [2,∞); range [0,∞)","Domain [0,∞); range [2,∞)","Both [2,∞)"],0,["The inverse accepts the original outputs.","Its outputs are the original inputs."],"The inverse domain is the original range [2,∞); the inverse range is the original domain [0,∞)."),
  C("17f","1.7","Horizontal line test","Is the inverse of f(x)=x², with all real x, a function?","Think about original inputs -2 and 2.",["No","Yes"],0,["Both -2 and 2 output 4.","Would the inverse input 4 have one output?"],"No. The inverse relation would send 4 to both -2 and 2. The original parabola fails the horizontal line test."),
  C("17g","1.7","Constant rule","Is the inverse of f(x)=5, with all real x, a function?","The inverse graph of horizontal y=5 is vertical x=5.",["No","Yes"],0,["What does a vertical line fail?","One inverse input 5 would have many outputs."],"No. The inverse of y=5 is x=5, a vertical relation with many outputs for the input 5."),
  C("17h","1.7","Meaning of the symbol","What does f⁻¹ mean?","Compare it with 1/f(x).",["The inverse relation or function","The reciprocal 1/f(x)","Negative one times f(x)"],0,["It reverses the mapping of f.","A superscript -1 on the function name is special notation here."],"f⁻¹ reverses f. It is not the reciprocal 1/f(x)."),
  C("17i","1.7","Check an inverse pair","Are f(x)=3x+2 and g(x)=(x-2)/3 inverses?","Try g(f(x)).",["Yes","No"],0,["Substitute 3x+2 into g.","g(f(x))=((3x+2)-2)/3=x."],"Yes. g reverses the operations of f, and g(f(x))=x. The same check works in the other direction."),
  C("17j","1.7","Graph reflection","Where does (2,-3) move when a graph is reflected across y=x?","Reflection across y=x swaps coordinates.",["(-3,2)","(-2,3)","(2,3)"],0,["Old y becomes new x.","Old x becomes new y."],"The reflected point is (-3,2), a point of the inverse relation."),
  C("17k","1.7","Inverse in context","If cost is C(a)=10a+50, which rule gives area a from cost c?","$10 per square foot plus a $50 fixed fee.",["a=(c-50)/10","a=10c+50","a=(c+50)/10"],0,["Remove the fixed fee first.","Then divide by the price per square foot."],"Subtract $50, then divide by $10: a=(c-50)/10. This reverses the cost calculation."),
  T("17l","1.7","Undo a value","Find f⁻¹(f(-2)).","f(x)=3x+5",["-2"],["An inverse undoes the original function.","f(-2)=-1, then f⁻¹(-1)=(-1-5)/3."],"f(-2)=-1 and f⁻¹(-1)=-2. The composition returns the starting input.")
];

const $=id=>document.getElementById(id);
const progressKey="functions-lab-progress-v2";
let progress={};
try { progress=JSON.parse(localStorage.getItem(progressKey)||"{}"); if(!progress||typeof progress!=="object") progress={}; } catch { progress={}; }
let mode="1.2", queue=[], position=0, current=null, tries=0, hintCount=0, revealed=false, solved=false, mixedDone=false, workedIndex=0, displayedLesson="", displayedOptions=[], choiceCorrectIndex=-1;
const byId=Object.fromEntries(questions.map(q=>[q.id,q]));
const parentRules={
  linear:{label:"x",fn:x=>x},
  quadratic:{label:"x²",fn:x=>x*x},
  root:{label:"√x",fn:x=>x<0?NaN:Math.sqrt(x)},
  reciprocal:{label:"1/x",fn:x=>Math.abs(x)<0.001?NaN:1/x},
  absolute:{label:"|x|",fn:x=>Math.abs(x)}
};
function graphNumber(n){
  const rounded=Math.round(n*100)/100;
  return String(Object.is(rounded,-0)?0:rounded);
}
function plotPath(fn){
  let path="",penDown=false,previousY=null;
  for(let i=0;i<=600;i++){
    const x=-6+i*.02,y=fn(x);
    if(!Number.isFinite(y)||Math.abs(y)>5.2||(previousY!==null&&Math.abs(y-previousY)>2.5)){penDown=false;previousY=null;continue;}
    const px=210+x*30,py=160-y*30;
    path+=(penDown?" L":" M")+px.toFixed(1)+" "+py.toFixed(1);
    penDown=true;previousY=y;
  }
  return path;
}
function renderGraph(){
  if(displayedLesson==="1.7"){renderInverseGraph();return;}
  if(displayedLesson!=="1.4"&&displayedLesson!=="1.5"&&displayedLesson!=="1.6") return;
  const showTransform=displayedLesson==="1.5"||displayedLesson==="1.6";
  $("graph-explorer").hidden=false;
  $("graph-controls").hidden=false;
  $("transform-controls").hidden=!showTransform;
  $("graph-title").textContent=displayedLesson==="1.6"?"Build a full graph from its parent":showTransform?"Move one point to understand the whole graph":"Explore the five parent shapes";
  $("graph-intro").textContent=displayedLesson==="1.6"?"Try a combined transformation. Grey is the parent; teal is the new graph. Plot an endpoint or vertex, then use more mapped points to keep the shape accurate.":showTransform?"Change a, k, d or c. Grey is the parent; teal is the transformed graph. Watch how the same parent point moves.":"Choose a parent and notice its shape, where it begins, and any gap or asymptote.";
  const key=$("parent-select").value,rule=parentRules[key];
  const a=showTransform?Number($("control-a").value):1;
  const k=showTransform?Number($("control-k").value):1;
  const d=showTransform?Number($("control-d").value):0;
  const c=showTransform?Number($("control-c").value):0;
  $("value-d").textContent=graphNumber(d);
  $("value-c").textContent=graphNumber(c);
  let svg="";
  for(let x=-6;x<=6;x++){svg+="<line x1='"+(210+x*30)+"' y1='0' x2='"+(210+x*30)+"' y2='320' stroke='#dfebf0' stroke-width='1'/>";}
  for(let y=-5;y<=5;y++){svg+="<line x1='0' y1='"+(160-y*30)+"' x2='420' y2='"+(160-y*30)+"' stroke='#dfebf0' stroke-width='1'/>";}
  svg+="<line x1='0' y1='160' x2='420' y2='160' stroke='#718b99' stroke-width='1.6'/><line x1='210' y1='0' x2='210' y2='320' stroke='#718b99' stroke-width='1.6'/><text x='400' y='153' fill='#526d7b' font-size='13'>x</text><text x='219' y='17' fill='#526d7b' font-size='13'>y</text>";
  svg+="<path d='"+plotPath(rule.fn)+"' fill='none' stroke='#9caebb' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/>";
  svg+="<path d='"+plotPath(x=>a*rule.fn(k*(x-d))+c)+"' fill='none' stroke='#078779' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'/>";
  const oldX=1,oldY=rule.fn(1),newX=1/k+d,newY=a*oldY+c;
  svg+="<circle cx='"+(210+oldX*30)+"' cy='"+(160-oldY*30)+"' r='5' fill='#8397a5' stroke='white' stroke-width='2'/>";
  if(Math.abs(newX)<=6&&Math.abs(newY)<=5.2)svg+="<circle cx='"+(210+newX*30)+"' cy='"+(160-newY*30)+"' r='6' fill='#078779' stroke='white' stroke-width='2'/>";
  $("graph-svg").innerHTML=svg;
  $("graph-svg").setAttribute("aria-label","Graph of parent "+rule.label+" and transformed graph. Parent point (1,1) maps to ("+graphNumber(newX)+","+graphNumber(newY)+").");
  $("graph-explanation").textContent=showTransform?"The parent point (1,1) moves to ("+graphNumber(newX)+", "+graphNumber(newY)+"). Solve k(x-d)=1 for the new x, then calculate a(1)+c for the new y.":"This is f(x)="+rule.label+". The grey and teal graphs overlap because no transformation is applied.";
}
function renderInverseGraph(){
  $("graph-explorer").hidden=false;
  $("graph-controls").hidden=true;
  $("graph-title").textContent="See an inverse reverse the coordinates";
  $("graph-intro").textContent="The teal line is f(x)=2x+1. Its inverse is the blue line f⁻¹(x)=(x-1)/2. Each point crosses the dashed mirror line y=x.";
  let svg="";
  for(let x=-6;x<=6;x++)svg+="<line x1='"+(210+x*30)+"' y1='0' x2='"+(210+x*30)+"' y2='320' stroke='#dfebf0' stroke-width='1'/>";
  for(let y=-5;y<=5;y++)svg+="<line x1='0' y1='"+(160-y*30)+"' x2='420' y2='"+(160-y*30)+"' stroke='#dfebf0' stroke-width='1'/>";
  svg+="<line x1='0' y1='160' x2='420' y2='160' stroke='#718b99' stroke-width='1.6'/><line x1='210' y1='0' x2='210' y2='320' stroke='#718b99' stroke-width='1.6'/>";
  svg+="<path d='"+plotPath(x=>x)+"' fill='none' stroke='#8397a5' stroke-width='2' stroke-dasharray='6 5'/>";
  svg+="<path d='"+plotPath(x=>2*x+1)+"' fill='none' stroke='#078779' stroke-width='3.5'/>";
  svg+="<path d='"+plotPath(x=>(x-1)/2)+"' fill='none' stroke='#4865bf' stroke-width='3.5'/>";
  svg+="<circle cx='240' cy='70' r='6' fill='#078779' stroke='white' stroke-width='2'/><circle cx='300' cy='130' r='6' fill='#4865bf' stroke='white' stroke-width='2'/>";
  svg+="<text x='245' y='65' fill='#075a52' font-size='13'>(1,3)</text><text x='308' y='137' fill='#354ba1' font-size='13'>(3,1)</text><text x='310' y='52' fill='#617887' font-size='13'>y=x</text>";
  $("graph-svg").innerHTML=svg;
  $("graph-svg").setAttribute("aria-label","The line f(x)=2x+1 and its inverse (x-1)/2 reflected across y=x. Point (1,3) becomes (3,1).");
  $("graph-explanation").textContent="f(1)=3, so f⁻¹(3)=1. Swapping the coordinates makes the two highlighted points mirror each other across y=x.";
}
function resetGraph(id){
  $("parent-select").value=id==="1.6"?"root":"quadratic";
  $("control-a").value=id==="1.6"?"-2":id==="1.5"?"2":"1";
  $("control-k").value=id==="1.6"?"2":"1";
  $("control-d").value=id==="1.6"?"2":id==="1.5"?"2":"0";
  $("control-c").value=id==="1.6"?"1":id==="1.5"?"1":"0";
  renderGraph();
}

function safeSave(){
  try { localStorage.setItem(progressKey,JSON.stringify(progress)); } catch {}
}
function updateProgress(){
  $("solo-count").textContent=Object.values(progress).filter(x=>x.status==="solo").length;
  $("review-count").textContent=Object.values(progress).filter(x=>x.status==="review"||x.status==="supported").length;
}
function setStatus(id,status){
  progress[id]={status,date:new Date().toISOString().slice(0,10)};
  safeSave();
  updateProgress();
}
function renderLesson(id){
  if(displayedLesson===id) return;
  displayedLesson=id;
  const x=lessons[id];
  $("lesson-kicker").textContent=id+" · "+x.label;
  $("lesson-title").innerHTML=x.title;
  $("lesson-lead").textContent=x.lead;
  $("concept-strip").innerHTML=x.strip.map(piece=>piece==="→"?"<b aria-hidden='true'>→</b>":"<span"+(piece.includes("f(")||piece.includes("g(")?" class='rule'":"")+">"+piece+"</span>").join("");
  $("video-title").textContent=x.video.title;
  $("video-prompt").textContent=x.watch;
  $("video-embed").removeAttribute("src");
  $("video-embed").hidden=true;
  $("video-embed").title=x.video.title;
  $("video-poster").hidden=false;
  $("video-poster").style.backgroundImage="linear-gradient(90deg,rgba(9,22,36,.72),rgba(9,22,36,.12)),url('https://i.ytimg.com/vi/"+x.video.id+"/hqdefault.jpg')";
  $("poster-label").textContent="Play "+x.video.title;
  $("video-list").innerHTML="<a href='"+x.video.url+"' target='_blank' rel='noopener noreferrer'>Open featured video ↗</a>"+x.more.map(v=>"<a href='"+v.url+"' target='_blank' rel='noopener noreferrer'>"+v.title+" ↗</a>").join("");
  $("why-title").textContent=x.whyTitle;
  $("why-copy").innerHTML=x.why.map(p=>"<p>"+p+"</p>").join("");
  $("worked-title").textContent=x.worked.title;
  $("worked-start").textContent=x.worked.start;
  $("worked-steps").innerHTML=x.worked.steps.map(s=>"<li hidden>"+s+"</li>").join("");
  workedIndex=0;
  $("reveal-step").hidden=false;
  $("reveal-step").textContent="Show next step";
  $("sheet-copy").textContent=x.sheet;
  $("reference-card").open=false;
  $("reference-content").innerHTML=references[id];
  if(id==="1.4"||id==="1.5"||id==="1.6"){resetGraph(id);}else if(id==="1.7"){renderInverseGraph();}else{$("graph-explorer").hidden=true;}
}
function revealStep(){
  const steps=[...$("worked-steps").children];
  if(workedIndex<steps.length){steps[workedIndex].hidden=false;workedIndex++;}
  if(workedIndex>=steps.length){$("reveal-step").hidden=true;}
}
function shuffle(items){
  const out=[...items];
  for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}
  return out;
}
function escapeHtml(value){
  return String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}
function selectMode(nextMode){
  mode=nextMode;
  position=0;
  if(nextMode==="mixed") queue=shuffle(Object.keys(lessons).flatMap(id=>shuffle(questions.filter(q=>q.section===id)).slice(0,2)));
  else if(nextMode==="review") queue=shuffle(questions.filter(q=>progress[q.id]&&(progress[q.id].status==="review"||progress[q.id].status==="supported")));
  else queue=questions.filter(q=>q.section===nextMode);
  document.querySelectorAll(".lesson-link").forEach(b=>b.classList.remove("active"));
  const active=nextMode==="mixed"?$("mixed-nav"):nextMode==="review"?$("review-nav"):document.querySelector("[data-lesson='"+nextMode+"']");
  if(active) active.classList.add("active");
  $("top-status").textContent=nextMode==="mixed"?"14 questions · every lesson":nextMode==="review"?"Retry a previous miss":"Start with a cold question";
  if(queue.length) renderQuestion();
  else renderEmpty();
}
function renderEmpty(){
  current=null;
  renderLesson("1.2");
  $("practice-title").textContent="Nothing to retry yet";
  $("question-type").textContent="REVIEW";
  $("question-count").textContent="";
  $("question-context").textContent="Try some lesson or mixed questions first. A miss or a hint will appear here for another attempt.";
  $("answer-area").innerHTML="";
  $("check").hidden=true;
  $("hint").hidden=true;
  $("solution").hidden=true;
  $("next").textContent="Start mixed practice";
  $("feedback").textContent="Getting an answer wrong here simply tells you what to practise next.";
  $("explanation").hidden=true;
}
function renderQuestion(){
  current=queue[position];
  if(!current){renderEmpty();return;}
  mixedDone=false;
  renderLesson(current.section);
  tries=0;hintCount=0;revealed=false;solved=false;
  $("practice-title").innerHTML=current.prompt;
  $("question-context").textContent=current.context;
  $("question-type").textContent=current.section+" · "+current.tag.toUpperCase();
  $("question-count").textContent=(position+1)+" / "+queue.length;
  $("practice-status").textContent="No notes first";
  $("practice-status").className="status-pill";
  $("feedback").textContent="Give it a real attempt before opening a hint.";
  $("feedback").className="feedback";
  $("explanation").hidden=true;
  $("explanation").innerHTML="";
  $("check").hidden=false;
  $("check").disabled=false;
  $("hint").hidden=false;
  $("solution").hidden=false;
  $("next").textContent=mode==="mixed"&&position===queue.length-1?"Finish set":"Another problem";
  if(current.kind==="choice"){
    const order=shuffle(current.options.map((text,original)=>({text,original})));
    displayedOptions=order.map(item=>item.text);
    choiceCorrectIndex=order.findIndex(item=>item.original===current.correct);
    $("answer-area").innerHTML="<div class='answer-options' role='radiogroup' aria-label='Answer choices'>"+displayedOptions.map((o,i)=>"<label class='answer-option'><input type='radio' name='answer-choice' value='"+i+"'><span>"+escapeHtml(o)+"</span></label>").join("")+"</div>";
  }else{
    displayedOptions=[];
    choiceCorrectIndex=-1;
    $("answer-area").innerHTML="<label for='answer-input'>Your answer</label><input id='answer-input' class='text-answer' type='text' autocomplete='off' spellcheck='false' placeholder='Write a number or expression'>";
    $("answer-input").addEventListener("keydown",e=>{if(e.key==="Enter")checkAnswer();});
  }
}
function renderMixedComplete(){
  mixedDone=true;
  current=null;
  $("practice-title").textContent="Mixed set complete";
  $("question-type").textContent="MIXED PRACTICE";
  $("question-count").textContent=queue.length+" / "+queue.length;
  $("question-context").textContent="You attempted two questions from each lesson. Use Retry misses for anything that needed a hint or another attempt.";
  $("answer-area").innerHTML="";
  $("check").hidden=true;
  $("hint").hidden=true;
  $("solution").hidden=true;
  $("next").textContent="Start another mixed set";
  $("practice-status").textContent="Set complete";
  $("practice-status").className="status-pill solo";
  $("explanation").hidden=true;
  setFeedback("Come back to missed types after a break. A later cold solve is stronger evidence than an immediate repeat.","good");
}
function normalize(value){
  return String(value).trim().toLowerCase().replaceAll("−","-").replaceAll("–","-").replaceAll(" ","").replaceAll(",",".");
}
function readAnswer(){
  if(!current) return null;
  if(current.kind==="choice"){
    const picked=document.querySelector("input[name='answer-choice']:checked");
    return picked?Number(picked.value):null;
  }
  const value=$("answer-input").value.trim();
  return value||null;
}
function setFeedback(message,kind){
  $("feedback").textContent=message;
  $("feedback").className="feedback"+(kind?" "+kind:"");
}
function showExplanation(){
  $("explanation").hidden=false;
  $("explanation").innerHTML="<p><strong>Why:</strong> "+current.explanation+"</p><p class='why-prompt'>Before moving on, explain the key step out loud in your own words.</p>";
}
function checkAnswer(override){
  if(!current||solved) return {correct:!!solved,status:progress[current?.id]?.status||null};
  const value=override===undefined?readAnswer():override;
  if(value===null||value===""){setFeedback("Put down your best answer first, even if you are unsure.","try");return {correct:false,error:"empty answer"};}
  tries++;
  const correct=current.kind==="choice"?Number(value)===choiceCorrectIndex:current.answers.some(x=>normalize(x)===normalize(value));
  if(correct){
    solved=true;
    const status=tries===1&&hintCount===0&&!revealed?"solo":"supported";
    setStatus(current.id,status);
    $("practice-status").textContent=status==="solo"?"Solved cold":"Solved with support";
    $("practice-status").className="status-pill "+status;
    setFeedback(status==="solo"?"Correct on your own. That is evidence you can retrieve this skill.":"Correct. Retry this type later without a hint to make it stick.","good");
    $("check").disabled=true;
    showExplanation();
    return {correct:true,status};
  }
  setStatus(current.id,"review");
  $("practice-status").textContent="Retry later";
  $("practice-status").className="status-pill review";
  setFeedback(tries===1?"Not yet. Check the rule and try again, or open one hint.":"Still not there. Open a hint or compare the worked solution.","try");
  return {correct:false,status:"review"};
}
function showHint(){
  if(!current||solved) return;
  const index=Math.min(hintCount,current.hints.length-1);
  hintCount++;
  setStatus(current.id,"review");
  $("practice-status").textContent="Using a hint";
  $("practice-status").className="status-pill supported";
  setFeedback(current.hints[index],"");
}
function showSolution(){
  if(!current||solved) return;
  if(tries===0&&hintCount===0){setFeedback("Make one attempt or open a hint first. Even an uncertain attempt helps you spot the gap.","try");return;}
  revealed=true;
  setStatus(current.id,"review");
  $("practice-status").textContent="Retry later";
  $("practice-status").className="status-pill review";
  setFeedback("Read the reasoning, then try a fresh problem without looking.","");
  showExplanation();
}
function nextQuestion(){
  if(mixedDone){selectMode("mixed");return;}
  if(!queue.length){selectMode("mixed");return;}
  if(mode==="mixed"&&tries===0){setFeedback("Give one answer before moving on, even if you are unsure. You can use a hint first.","try");return;}
  if(mode==="mixed"&&position===queue.length-1){renderMixedComplete();return;}
  position=(position+1)%queue.length;
  renderQuestion();
}

document.querySelectorAll("[data-lesson]").forEach(b=>b.addEventListener("click",()=>selectMode(b.dataset.lesson)));
$("mixed-nav").addEventListener("click",()=>selectMode("mixed"));
$("review-nav").addEventListener("click",()=>selectMode("review"));
$("check").addEventListener("click",()=>checkAnswer());
$("hint").addEventListener("click",showHint);
$("solution").addEventListener("click",showSolution);
$("next").addEventListener("click",nextQuestion);
$("reveal-step").addEventListener("click",revealStep);
$("video-poster").addEventListener("click",()=>{
  const x=lessons[displayedLesson];
  $("video-poster").hidden=true;
  $("video-embed").hidden=false;
  $("video-embed").src="https://www.youtube-nocookie.com/embed/"+x.video.id+"?autoplay=1";
});
["parent-select","control-a","control-k","control-d","control-c"].forEach(id=>$(id).addEventListener("input",renderGraph));
$("reset-graph").addEventListener("click",()=>resetGraph(displayedLesson));
updateProgress();
selectMode("1.2");

// Optional browser-agent actions mirror the visible lesson and practice controls.
const context=document.modelContext;
if(context?.registerTool){
  const register=tool=>{try{Promise.resolve(context.registerTool(tool)).catch(()=>{});}catch{}};
  register({name:"get_current_problem",title:"Read current problem",description:"Read the visible practice problem and answer choices without changing progress.",inputSchema:{type:"object",properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute(){return current?{id:current.id,section:current.section,prompt:current.prompt,context:current.context,kind:current.kind,options:current.kind==="choice"?displayedOptions:null}:null;}});
  register({name:"open_functions_lesson",title:"Open lesson",description:"Open one of the seven visible Unit 1 lesson sections.",inputSchema:{type:"object",properties:{lesson:{type:"string",enum:["1.1","1.2","1.3","1.4","1.5","1.6","1.7"]}},required:["lesson"],additionalProperties:false},annotations:{readOnlyHint:false},execute(input){if(!lessons[input?.lesson])throw Error("Invalid lesson");selectMode(input.lesson);return {lesson:mode,problemId:current?.id||null};}});
  register({name:"submit_current_answer",title:"Submit practice answer",description:"Check an answer to the visible problem. For a multiple-choice problem, send the zero-based choice index as a string; for a text problem, send the answer text.",inputSchema:{type:"object",properties:{answer:{type:"string"}},required:["answer"],additionalProperties:false},annotations:{readOnlyHint:false},execute(input){if(!current)throw Error("No active problem");if(typeof input?.answer!=="string")throw Error("Answer must be text");if(current.kind==="choice"){const i=Number(input.answer);if(!Number.isInteger(i)||i<0||i>=current.options.length)throw Error("Invalid choice index");const radio=document.querySelector("input[name='answer-choice'][value='"+i+"']");if(radio)radio.checked=true;return checkAnswer(i);} $("answer-input").value=input.answer;return checkAnswer(input.answer);}});
}
