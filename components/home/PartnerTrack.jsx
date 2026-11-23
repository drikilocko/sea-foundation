"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

const PARTNERS = [
  {
    logo: "ministere-agriculture.webp",
    alt: "Logo du ministère togolais de l’Agriculture",
    name: "Ministère de l’Agriculture",
    caption: "Élevage et Développement rural",
  },
  {
    logo: "infa-tove.webp",
    alt: "Logo de l’Institut national de formation agricole de Tové",
    name: "INFA de Tové",
    caption: "Formation agricole",
  },
  {
    logo: "iastm.webp",
    alt: "Logo de l’IASTM",
    name: "IASTM",
    caption: "Enseignement supérieur et formation",
  },
  {
    logo: "pnud.webp",
    alt: "Logo du Programme des Nations unies pour le développement",
    name: "PNUD",
    caption: "Programme des Nations unies pour le développement",
  },
  {
    logo: "afd.webp",
    alt: "Logo de l’Agence française de développement",
    name: "AFD",
    caption: "Agence française de développement",
  },
  { logo: "far.webp", alt: "Logo FAR", name: "FAR", caption: "Logo présent dans les ressources du site" },
  { logo: "aklo-group.webp", alt: "Logo d’Aklo Group", name: "Aklo Group", caption: "Entreprise" },
];

function PartnerGroup({ decorative = false }) {
  const { t } = useLanguage();
  return (
    <div className="partner-track__group" aria-hidden={decorative ? "true" : undefined}>
      {PARTNERS.map(({ logo, alt, name, caption }) => (
        <article className="partner-card" key={logo}>
          <span className="partner-logo-frame">
            <img
              src={`/assets/images/partenaires/${logo}`}
              alt={decorative ? "" : t(alt)}
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          </span>
          <strong>{t(name)}</strong>
          <span className="partner-card-caption">{t(caption)}</span>
        </article>
      ))}
    </div>
  );
}

export default function PartnerTrack() {
  const { t } = useLanguage();
  return (
    <div
      className="partner-track"
      id="partner-track"
      aria-label={t("Logos des organisations présents dans les ressources du site")}
    >
      <PartnerGroup />
      <PartnerGroup decorative />
    </div>
  );
}
