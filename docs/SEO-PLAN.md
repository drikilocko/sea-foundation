# Plan SEO — SEA Foundation

Site : https://sea-foundationafr.vercel.app
Dernière mise à jour : 18 novembre 2026

## 1. Objectif

Faire de SEA Foundation le premier résultat sur son nom, puis la référence sur l'engagement des jeunes au Togo (santé, éducation, entrepreneuriat, agrobusiness).

| Public | Ce qu'il cherche | Page d'arrivée |
| --- | --- | --- |
| Jeunes de 15 à 35 ans | Formation, incubation, comment participer | `/inscription/`, `/projet/` |
| Partenaires et bailleurs | Mission, orientations, crédibilité | `/a-propos/`, `/documents/` |
| Grand public et presse | Actualités, événements, contact | `/actualites/`, `/evenements/`, `/contact/` |

## 2. Déjà en place

- `sitemap.xml` avec les 14 pages publiques, et `robots.txt` qui le déclare.
- Une URL canonique, des balises Open Graph et Twitter sur chaque page.
- Données structurées : organisation et site sur l'accueil, fil d'Ariane sur les autres pages.
- `next.config.mjs` : en-têtes de sécurité, cache des images et redirection des anciennes adresses `.html`.
- Pages générées à l'avance par Next.js : Google reçoit tout le contenu dans le HTML.
- Images rangées par page, avec des noms de fichiers descriptifs.

## 3. Architecture du site

```text
/                         Accueil
├── /a-propos/            Mission, vision, gouvernance
├── /actions/             Priorités et axes d'intervention
│   └── /projet/          Incubation agricole (page lien depuis Actions)
├── /inscription/         Conversion principale
├── /actualites/          Hub des nouvelles
│   ├── /articles/        Dossiers thématiques
│   └── /evenements/      Agenda et comptes rendus
├── /documents/           Orientations et ressources
├── /contact/             Coordonnées
└── Pages légales         /mentions-legales/, /confidentialite/, /cookies/, /conditions-utilisation/
```

Règle : chaque page doit être accessible en trois clics maximum depuis l'accueil.

## 4. Mots-clés par page

| Page | Mot-clé principal | Mots-clés secondaires | Intention |
| --- | --- | --- | --- |
| `/` | SEA Foundation | Fondation Sheyi Emmanuel Adebayor, fondation jeunesse Togo | Marque |
| `/a-propos/` | Fondation Sheyi Emmanuel Adebayor | mission, vision, jeunesse togolaise | Information |
| `/actions/` | actions pour la jeunesse au Togo | santé des jeunes, éducation, entrepreneuriat | Information |
| `/projet/` | incubation agricole Togo | agrobusiness jeunes, insertion socioprofessionnelle | Information, conversion |
| `/inscription/` | s'engager fondation Togo | bénévolat jeunes Togo, participer aux actions | Conversion |
| `/articles/` | jeunesse togolaise enjeux | chômage des jeunes Togo, santé des jeunes | Information |
| `/evenements/` | événements jeunesse Togo | formation agricole, atelier, conférence | Information |
| `/documents/` | documents SEA Foundation | rapports, ressources | Information |
| `/contact/` | contacter SEA Foundation | partenariat fondation Togo | Navigation |

Ces mots-clés sont des hypothèses de départ. Il faut les confirmer avec les requêtes réelles de la Search Console après 4 à 8 semaines.

## 5. Points à corriger

| Priorité | Problème constaté | Action | Responsable |
| --- | --- | --- | --- |
| Haute | Les liens Instagram et TikTok pointent vers les pages d'accueil de ces réseaux | Fournir les vraies URL des comptes, puis les ajouter au site et aux données structurées | Fondation |
| Haute | Le site est sur une adresse `vercel.app` alors que l'e-mail utilise `fondationsea.org` | Si ce domaine est disponible, y connecter le site, puis mettre à jour les URL canoniques et le sitemap | Fondation |
| Haute | Images encore lourdes : `mosaique-actions-terrain.webp` (660 Ko), logos SEA (400 à 500 Ko) | Compresser sous 300 Ko (photos) et 60 Ko (logos) | Développement |
| Moyenne | 17 images de l'accueil ont un texte alternatif vide | Décrire les images porteuses de sens | Contenu |
| Moyenne | Les articles et événements n'ont pas de page individuelle | Créer une page par article et par événement | Contenu, développement |
| Moyenne | La version anglaise est générée par JavaScript sur la même URL, donc Google ne l'indexe pas séparément | Créer des pages `/en/` avec des balises `hreflang` si l'international devient un objectif | Développement |
| Basse | Les liens internes pointent vers `.../index.html` | Passer aux URL propres (`/a-propos/`) | Développement |

## 6. Feuille de route sur 90 jours

### Jours 1 à 15 : fondations

1. Créer la propriété dans Google Search Console et Bing Webmaster Tools.
2. Soumettre `https://sea-foundationafr.vercel.app/sitemap.xml`.
3. Créer ou compléter la fiche Google Business Profile de la Fondation.
4. Corriger les liens des réseaux sociaux et compresser les images lourdes.

### Jours 16 à 45 : contenu

1. Publier un dossier par priorité : santé, éducation, entrepreneuriat, agrobusiness, inclusion.
2. Viser 800 mots minimum par dossier, avec des sources citées.
3. Relier chaque dossier à `/actions/` et à `/inscription/`.
4. Compléter les textes alternatifs des images.

### Jours 46 à 90 : notoriété

1. Publier deux contenus par mois, dont un compte rendu d'événement avec photos.
2. Demander un lien vers le site à chaque partenaire (AFD, PNUD, ministère de l'Agriculture, INFA de Tové, etc.).
3. Proposer des communiqués à la presse togolaise.
4. Revoir les titres des pages qui ont des impressions mais peu de clics.

## 7. Suivi mensuel

| Indicateur | Outil | Objectif |
| --- | --- | --- |
| Pages indexées | Search Console | 14 sur 14 |
| Position sur « SEA Foundation » | Search Console | Top 3 |
| Clics hors marque | Search Console | En hausse chaque mois |
| LCP, INP, CLS | PageSpeed Insights | Inférieurs à 2,5 s, 200 ms et 0,1 |
| Inscriptions et contacts issus de la recherche | Outil de mesure d'audience, avec consentement | En hausse chaque trimestre |

## 8. Règles à chaque nouvelle page

- Un seul `h1`, un titre de 60 caractères maximum, une description de 155 caractères maximum.
- Des métadonnées créées avec `buildMetadata`, et la route ajoutée dans `lib/site.js` pour apparaître dans le sitemap.
- Des images dans `public/assets/images/<page>/`, en minuscules, avec des tirets et sans espaces.
- Au moins deux liens internes vers des pages utiles.
