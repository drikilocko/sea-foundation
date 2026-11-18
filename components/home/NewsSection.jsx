"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function NewsSection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="news-section wrap" id="actualites">
        <div className="news-heading">
          <div>
            <span className="eyebrow">{t("Actualités")}</span>
            <h2 className="section-heading">{t("Les nouvelles de SEA Foundation.")}</h2>
          </div>
          <p className="section-lead">
            {t("Les dernières nouvelles et initiatives de SEA Foundation.")}
          </p>
        </div>
        <div className="news-feature-grid">
          <article className="news-feature-card news-feature-card--lead">
            <img src="/assets/images/projet/formation-jeunes-terrain.webp" alt="" loading="lazy" />
            <div className="news-feature-tags">
              <span>{t("Formation")}</span>
              <span>Innov’ert</span>
            </div>
            <h3>{t("Former les jeunes aux nouvelles pratiques agricoles")}</h3>
            <p className="news-feature-date">{t("4 mai 2026")}</p>
            <Link className="news-feature-link" href="/evenements/">
              {t("Découvrir")}{" "}
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </article>
          <div className="news-feature-stack">
            <article className="news-feature-card news-feature-card--side">
              <img src="/assets/images/evenements/atelier-agricole.jpeg" alt="" loading="lazy" />
              <div className="news-feature-tags">
                <span>{t("Atelier")}</span>
                <span>Innov’ert</span>
              </div>
              <h3>{t("Valoriser les huiles usagées grâce à un atelier dédié")}</h3>
              <p className="news-feature-date">{t("22 avril 2026")}</p>
              <Link className="news-feature-link" href="/evenements/">
                {t("Découvrir")}{" "}
                <span aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </article>
            <article className="news-feature-card news-feature-card--side">
              <img
                src="/assets/images/evenements/conference-prise-de-parole.webp"
                alt=""
                loading="lazy"
              />
              <div className="news-feature-tags">
                <span>{t("Actualité")}</span>
                <span>{t("Conférences")}</span>
              </div>
              <h3>{t("Échanger autour des enjeux de gouvernance migratoire")}</h3>
              <p className="news-feature-date">{t("1 avril 2026")}</p>
              <Link className="news-feature-link" href="/evenements/">
                {t("Découvrir")}{" "}
                <span aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </article>
          </div>
        </div>
        <div className="news-more-wrap">
          <Link className="button news-more" href="/evenements/">
            {t("Voir tous les événements")}{" "}
            <span className="arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
