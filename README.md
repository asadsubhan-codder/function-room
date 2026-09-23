# Function Room

A free, independent study site for **Ontario Grade 11 Functions (MCR3U)**.

[Open Function Room](https://asadsubhan-codder.github.io/function-room/)

58 lessons cover seven units: introduction to functions, algebraic expressions, quadratics, exponentials, trigonometric ratios, sinusoidal functions, and discrete functions (including financial mathematics). Topic order and lesson numbers can differ from a school's course outline.

Every lesson is open from the start. Students can choose a free explanation, practise with linked Ontario teacher worksheets and Waterloo CEMC exercises, and use short diagnostics, exit checks and delayed reviews to identify gaps. Interactive graphs, private notes, an error log, optional focus timer and progress backups support independent study. Multiple explanations are available; students do not need to watch them all.

The Project page supports optional participant reports, local pilot analysis, a project journal and a teacher review guide. There are no claimed learning outcomes or endorsements. The short original checks are practice samples, not validated assessments or a guarantee of a school mark. Instruction and worksheets belong to the linked creators; the interface and original checks were built with AI assistance.

## Privacy and access

No account, ChatGPT subscription, paid API, or server is needed. Progress stays in the student's browser, not a shared class database. Export/import a backup to move between devices. Clearing site data can erase local progress. Optional feedback is saved locally and shared only if the student downloads and sends a report. Videos, Google Fonts, thumbnails and external resources connect to their respective providers.

The public site contains no personal quiz marks, school calendar, student photos or textbook copies. Resource availability can change; direct links and alternatives are included.

## Development

Use Node 22.18+ or Node 24.

```sh
npm ci
npm run dev
npm run check
npm run build
```

`app/curriculum.json` is the editable resource catalogue. `app/checks.ts` and `app/questionEngine.ts` contain original practice questions. `app/progress.ts` manages local progress and validates imports.

To audit public links and YouTube metadata without downloading videos:

```sh
python scripts/audit-resources.py
```

`npm run check` checks types and runs 100 seeds for every lesson, checking grading, duplicate choices, answer formatting and arithmetic parsing. This does not replace a math teacher's review. Browser verification covers navigation, study interactions, storage, backups, reporting and responsive layouts.

## Hosting

Push `main` to publish through `.github/workflows/deploy.yml`. GitHub Pages serves the static site from `dist` without depending on ChatGPT. Public GitHub Pages hosting is available on GitHub Free. A custom `.com` is optional and requires separately registered and renewed domain ownership; it is not included free. No custom domain is configured.

## Sources and corrections

See the site's **Sources & standards** page for curriculum, learning-design references and creator credits. [Report a content error or broken link](https://github.com/asadsubhan-codder/function-room/issues/new), including the lesson and exact question or link. Teacher review and classroom validation remain pending.
