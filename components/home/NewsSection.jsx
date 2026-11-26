"use client";

import Link from "next/link";
import NewsVideos from "@/components/news/NewsVideos";
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
        <NewsVideos />
        <div className="news-more-wrap">
          <Link className="button news-more" href="/actualites/">
            {t("Voir toutes les actualités")}{" "}
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
