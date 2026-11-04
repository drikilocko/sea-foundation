# SEA Foundation

Static site for SEA Foundation with a Gemini assistant served by a Vercel Node.js Function.

## Deploy on Vercel

1. Import [drikilocko/sea-foundation](https://github.com/drikilocko/sea-foundation) in Vercel.
2. Keep the project root at the repository root and use the **Other** framework preset. No build command or output directory is required.
3. In **Project Settings → Environment Variables**, add `GEMINI_API_KEY` for Production (and Preview if needed). Never put the key in an HTML or JavaScript file or commit `.env`.
4. Deploy the `main` branch. Future pushes to `main` will trigger a new deployment.

Vercel serves the static pages and routes `/api/chat` to `api/chat.js`. The function receives the site pages as reference content and replies in the currently selected language.

Lenis is enabled only on non-touch devices with more than four logical CPU cores and no reduced-motion or data-saving preference. Other devices use native browser scrolling. Scroll-driven effects share a single animation-frame scheduler.

## Run locally

Create a local `.env` file containing:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Then run:

```sh
npm start
```

Open `http://127.0.0.1:4173/`. The `.env` file is excluded from Git and Vercel uploads.

## 404 and Apache

`404.html` is the custom not-found page used by Vercel and the local server. `.htaccess` provides an Apache 404 document, disables directory listings, redirects HTTP to HTTPS, and blocks access to private configuration files. Vercel does not read `.htaccess`; its routing and headers are configured in `vercel.json`.

Apache-only static hosting does not run the Gemini API. Use Vercel (or another Node.js host) to keep `/api/chat` working.
