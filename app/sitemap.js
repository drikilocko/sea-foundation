import { ROUTES, SITE_URL } from "@/lib/site";

const LAST_MODIFIED = "2026-11-18";

export default function sitemap() {
  return ROUTES.map((route) => ({ url: `${SITE_URL}${route}`, lastModified: LAST_MODIFIED }));
}
