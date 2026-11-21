# SEA Foundation

Website of SEA Foundation, built with Next.js (App Router) and React, with a Gemini assistant served by a route handler.

## Run locally

Requires Node.js 20.9 or later. Create a local `.env` file containing:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Then run:

```sh
npm install
npm run dev
```

Open `http://localhost:3000/`. The `.env` file is excluded from Git.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the production build |
| `npm start` | Serve the production build |
| `npm run lint` | Check the code with ESLint |

## Deploy on Vercel

1. Import [drikilocko/sea-foundation](https://github.com/drikilocko/sea-foundation) in Vercel. `vercel.json` selects the Next.js framework.
2. In **Project Settings → Environment Variables**, add `GEMINI_API_KEY` for Production (and Preview if needed). Never put the key in source code or commit `.env`.
3. Deploy the `main` branch. Future pushes to `main` trigger a new deployment.

## Project structure

```text
app/                 Routes, metadata, sitemap, robots and the /api/chat endpoint
components/
  chat/              AI assistant
  home/              Homepage sections
  layout/            Preloader, page header and footer, cookie consent
  pages/             Content of each inner page
  providers/         Language and smooth scrolling
  seo/               Structured data
  ui/                Shared interface elements
content/en.js        English translations, keyed by the French text
lib/                 Site configuration, SEO helpers and shared utilities
public/assets/images/
  marque/            SEA Foundation logos
  partenaires/       Partner logos
  accueil/           Homepage images
  actions/           Actions page
  articles/          Articles page
  contact/           Contact page
  evenements/        Events and news pages
  projet/            Agricultural incubation project
styles/              Stylesheets, imported in order by styles/index.css
docs/SEO-PLAN.md     SEO plan and roadmap
```

## Conventions

- An image shared by several pages stays in the folder of the page where it is the main visual. File names use lowercase letters and hyphens.
- To add a page, create `app/<route>/page.jsx` and add the route to `PAGE_LABELS` in `lib/site.js`. The sitemap is generated from that list.
- To translate a text, wrap it with `t("...")` from `useLanguage()` and add the English version to `content/en.js`.
- Security and cache headers, and the redirects from the former `.html` addresses, are configured in `next.config.mjs`.

Lenis is enabled only on non-touch devices with more than four logical CPU cores and no reduced-motion or data-saving preference. Other devices use native browser scrolling.
