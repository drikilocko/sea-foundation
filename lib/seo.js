import { LOGO_COLOR, SITE_NAME, SITE_URL } from "@/lib/site";

export function buildMetadata({ path, title, description, image }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "fr_FR",
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: { card: "summary_large_image" },
  };
}

export function breadcrumbJsonLd({ path, title }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: title.split(" — ")[0], item: `${SITE_URL}${path}` },
    ],
  };
}

export function organizationJsonLd({ description, image }) {
  const organizationId = `${SITE_URL}/#organisation`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NGO",
        "@id": organizationId,
        name: SITE_NAME,
        alternateName: "Fondation Sheyi Emmanuel Adebayor",
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}${LOGO_COLOR}`,
        image: `${SITE_URL}${image}`,
        description,
        email: "info@fondationsea.com",
        telephone: "+22870162121",
        address: { "@type": "PostalAddress", addressCountry: "TG" },
        areaServed: { "@type": "Country", name: "Togo" },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#site`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        inLanguage: "fr",
        publisher: { "@id": organizationId },
      },
    ],
  };
}
