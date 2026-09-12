# Function Room

Video-first Ontario Grade 11 MCR3U study path.

This GitHub Pages version is independent of ChatGPT Sites. It has no account authentication or server database; lesson and readiness progress is saved in the browser's local storage. The site is built from the existing course plan and links to the original free videos and practice sheets.

## Live site

https://asadsubhan-codder.github.io/function-room/

The seven units follow the sequence in the school's welcome presentation. The quadratic path now uses MCR3U-labelled Grade 11 lessons (3.1–3.8); the discrete path keeps financial mathematics as an optional extension because it is not listed as one of the seven course units.

## Local preview

```bash
npm install
npm run dev
```

## Deployment

Push the repository's `main` branch to GitHub, enable **Settings → Pages → GitHub Actions**, and the included workflow will build and publish the `dist` folder.

The deployment workflow is stored in `.github/workflows/deploy.yml`.
