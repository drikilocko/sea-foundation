"use client";

import { useEffect, useRef } from "react";
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
    logo: "dekawowo-sportfest.webp",
    alt: "Logo du Dékawowo Sportfest",
    name: "Dékawowo Sportfest",
    caption: "Tournoi sportif pour la jeunesse",
  },
  {
    logo: "cooperation-allemande.webp",
    alt: "Logo de la Coopération allemande au Togo",
    name: "Coopération allemande",
    caption: "Deutsche Zusammenarbeit au Togo",
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
  const trackRef = useRef(null);

  // Le défilement des logos ne tourne que lorsqu’il est à l’écran : une animation infinie
  // oblige sinon le navigateur à recalculer des images en permanence, même hors de vue.
  useEffect(() => {
    const track = trackRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      track.classList.toggle("is-paused", !entry.isIntersecting);
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={trackRef}
      className="partner-track is-paused"
      id="partner-track"
      aria-label={t("Logos des organisations présents dans les ressources du site")}
    >
      <PartnerGroup />
      <PartnerGroup decorative />
    </div>
  );
}
