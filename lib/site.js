export const SITE_URL = "https://dev.fondationsea.org";
export const SITE_NAME = "SEA Foundation";
// Logos affichés sur le site (WebP léger) ; le PNG d’origine sert aux moteurs de recherche.
export const LOGO_WHITE = "/assets/images/marque/logo-sea-blanc.webp";
export const LOGO_COLOR = "/assets/images/marque/logo-sea-couleur.webp";
export const LOGO_PNG = "/assets/images/marque/logo-sea-couleur.png";
export const FAVICON = "/assets/images/marque/icone-sea.png";
export const HERO_IMAGE = "/assets/images/accueil/hero-tournoi-accueil-joueurs.webp";

export const PAGE_LABELS = {
  "/": "Accueil",
  "/a-propos/": "À Propos",
  "/actions/": "Actions",
  "/projet/": "Projet",
  "/inscription/": "Inscription",
  "/actualites/": "Actualités",
  "/evenements/": "Événements",
  "/articles/": "Articles",
  "/documents/": "Documents",
  "/contact/": "Contact",
  "/mentions-legales/": "Mentions légales",
  "/confidentialite/": "Confidentialité",
  "/cookies/": "Cookies",
  "/conditions-utilisation/": "Conditions d’utilisation",
};

export const ROUTES = Object.keys(PAGE_LABELS);

export const MAIN_NAVIGATION = [
  "/",
  "/a-propos/",
  "/actions/",
  "/projet/",
  "/inscription/",
  "/actualites/",
  "/evenements/",
  "/articles/",
  "/documents/",
  "/contact/",
];

export const COMPACT_NAVIGATION = ["/", "/a-propos/", "/actions/", "/projet/", "/contact/"];

export const LEGAL_LINKS = [
  "/mentions-legales/",
  "/confidentialite/",
  "/cookies/",
  "/conditions-utilisation/",
];
