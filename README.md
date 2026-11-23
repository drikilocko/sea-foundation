# SEA Foundation

Website of SEA Foundation, built with Next.js (App Router) and React, with a Gemini assistant served by a route handler.

## Page d'accueil et assistant IA

### Conception de la page d'accueil

La page d'accueil (`app/page.jsx` → `components/home/HomePage.jsx`) enchaîne des sections indépendantes, une par fichier dans `components/home/` :

| Section | Rôle |
| --- | --- |
| `HomeHeader` | Navigation, grand titre d’accueil et carrousel d’actualités (`NewsSlider`) |
| `AboutSection` | Qui sommes-nous et pourquoi agir |
| `PrioritiesSection` | Les cinq priorités en cartes ; chaque carte ouvre un récit plein écran (`PriorityStory`) |
| `ImpactSection`, `NewsSection` | Impact sur le terrain et actualités |
| `AxesSection`, `VisionSection` | Axes d'intervention et vision 2024–2028 (chiffres animés avec `CountUp`) |
| `ApproachSection` | Six principes d'action : photos en gris, couleur révélée autour du curseur |
| `BrandShowcaseSection`, `TestimonialsSection`, `PartnersSection` | Mot du président, citations, partenaires |
| `FaqSection` | Questions fréquentes (une seule réponse ouverte à la fois) |
| `ContactSection`, `HomeFooter` | Contact et pied de page |

Éléments transverses :

- **Filigrane** : l'emblème SEA gris (`public/assets/images/marque/embleme-sea-gris.svg`) reste fixe à droite et n'apparaît que sur les fonds clairs (`components/ui/LogoWatermark.jsx`, `styles/watermark.css`).
- **Défilement** : défilement fluide avec Lenis et barre de progression fine sur toute la hauteur (`ScrollProgress`).
- **Apparitions** : les éléments `.reveal-item` apparaissent au défilement (`RevealOnScroll`), en respectant la préférence « mouvement réduit ».
- **Bilingue** : chaque texte passe par `t("...")` ; la traduction anglaise est dans `content/en.js`.

Les autres pages affichent pour l'instant « Page en construction » (`components/pages/UnderConstruction.jsx`). Leur contenu reste dans `components/pages/` pour leur réouverture.

### Assistant IA intégré

1. **Interface** : `components/chat/ChatWidget.jsx` affiche le bouton de l'assistant et les liens réseaux sociaux en bas à droite, puis la fenêtre de discussion. L'historique de la conversation reste dans la page ; rien n'est enregistré.
2. **API** : la fenêtre envoie les messages à `POST /api/chat/` (`app/api/chat/route.js`). La route vérifie la requête (taille, format, langue) puis appelle Gemini côté serveur : la clé `GEMINI_API_KEY` n'est jamais envoyée au navigateur.
3. **Connaissances** : `lib/siteKnowledge.js` lit le texte des pages publiques du site (mis en cache une heure) et le transmet à Gemini comme seule source. Le message système interdit d'inventer un programme, une date ou un contact, et renvoie vers info@fondationsea.com en cas de doute.
4. **Modèles** : la route essaie `gemini-3.5-flash`, puis `gemini-3.8-flash` et `gemini-flash-latest` si un modèle est surchargé ou retiré. Pour changer de modèle, modifiez `GEMINI_MODELS` dans la route.

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
  terrain/           Tournament field photos
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
