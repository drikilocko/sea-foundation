import { ROUTES } from "@/lib/site";

const MAX_CHARACTERS = 36_000;
const CACHE_DURATION = 60 * 60 * 1000;
const PAGE_TIMEOUT = 8000;

let cache = { text: "", expiresAt: 0 };

const NAMED_ENTITIES = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: '"' };

function decodeEntities(text) {
  return text.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, value) => {
    if (value[0] !== "#") return NAMED_ENTITIES[value] ?? entity;
    const isHex = value[1].toLowerCase() === "x";
    const codePoint = Number.parseInt(value.slice(isHex ? 2 : 1), isHex ? 16 : 10);
    return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : entity;
  });
}

function htmlToText(html) {
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  return decodeEntities(
    body
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<(script|style|svg|noscript|template)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchPageText(origin, route) {
  const response = await fetch(`${origin}${route}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(PAGE_TIMEOUT),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} sur ${route}`);
  return `PAGE ${route}\n${htmlToText(await response.text())}`;
}

/** Texte public du site, relu au plus une fois par heure, transmis à l’assistant. */
export async function getSiteKnowledge(requestUrl) {
  if (cache.text && Date.now() < cache.expiresAt) return cache.text;

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const origin = productionHost ? `https://${productionHost}` : new URL(requestUrl).origin;
  const pages = await Promise.allSettled(ROUTES.map((route) => fetchPageText(origin, route)));
  pages
    .filter((page) => page.status === "rejected")
    .forEach((page) => console.error("Page non lue par l’assistant:", page.reason?.message));

  const text = pages
    .filter((page) => page.status === "fulfilled")
    .map((page) => page.value)
    .join("\n\n")
    .slice(0, MAX_CHARACTERS);
  if (text) cache = { text, expiresAt: Date.now() + CACHE_DURATION };
  return text;
}
