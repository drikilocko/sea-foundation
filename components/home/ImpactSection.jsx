"use client";

import LogoWatermark from "@/components/ui/LogoWatermark";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ImpactSection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="impact-section" aria-labelledby="impact-title">
        <LogoWatermark />
        <div className="wrap impact-section__inner">
          <div className="impact-visual">
            {/* Version à 1680 px (trois fois sa taille d’affichage maximale) : même rendu,
                décodage bien plus léger ; l’original reste disponible pour les grands écrans. */}
            <img
              src="/assets/images/accueil/mosaique-actions-terrain-1680.webp"
              srcSet="/assets/images/accueil/mosaique-actions-terrain-1680.webp 1680w, /assets/images/accueil/mosaique-actions-terrain.webp 3150w"
              sizes="(max-width: 980px) calc(100vw - 28px), 560px"
              alt="Des jeunes réunis autour d’activités éducatives et communautaires."
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="impact-copy">
            <span className="eyebrow">Ensemble, sur le terrain</span>
            <h2 className="section-heading" id="impact-title">
              Des actions qui ouvrent de nouvelles possibilités.
            </h2>
            <p>
              Avec les jeunes, les communautés et nos partenaires, SEA Foundation agit pour
              rapprocher les opportunités en santé, en éducation et en entrepreneuriat.
            </p>
            <div className="impact-actions">
              <a className="button" href="#actualites">
                {t("Découvrir nos actions")}{" "}
                <span className="arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </a>{" "}
              <Link className="button button-light" href="/contact/">
                {t("Nous contacter")}{" "}
                <span className="arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
