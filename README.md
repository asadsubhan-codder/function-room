# Function Room

Video-first Ontario Grade 11 MCR3U study path.

This GitHub Pages version is independent of ChatGPT Sites. It has no account authentication or server database; lesson and readiness progress is saved in the browser's local storage. The site is built from the existing course plan and links to the original free videos and practice sheets.

## Local preview

```bash
npm install
npm run dev
```

## Deployment

Push the repository's `main` branch to GitHub, enable **Settings → Pages → GitHub Actions**, and the included workflow will build and publish the `dist` folder.

The deployment workflow is stored in `.github/workflows/deploy.yml`.
