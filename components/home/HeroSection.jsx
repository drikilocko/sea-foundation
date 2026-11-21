"use client";

import Link from "next/link";
import NewsSlider from "@/components/home/NewsSlider";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function HeroSection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="hero sea-hero" id="accueil">
        <div className="sea-main wrap">
          <div className="sea-copy">
            <h1 className="sea-headline">
              <span className="sea-headline__line light">{t("L’Afrique")}</span>{" "}
              <span className="sea-headline__line light">{t("de demain")}</span>{" "}
              <span className="sea-headline__line">{t("commence avec nous.")}</span>
            </h1>
            <div className="sea-kicker">{t("Des jeunes, par les jeunes, pour les jeunes.")}</div>
            <Link className="button sea-hero-cta" href="/inscription/">
              {t("S’engager avec SEA")}{" "}
              <span className="arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </Link>
          </div>
          <div className="sea-cta-card">
            <div className="sea-cta-content">
              <div className="text">
                <strong>{t("SEA Action")}</strong>
                {t("Votre chemin vers un changement concret.")}
              </div>
              <a className="badge" href="#actualites" aria-label="Voir toutes les actualités">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </a>
            </div>
            <NewsSlider />
          </div>
        </div>
      </section>
    </>
  );
}
