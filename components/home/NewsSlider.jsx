"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const SLIDES = [
  {
    image: "/assets/images/projet/formation-jeunes-terrain.webp",
    category: "Formation · Innov’ert",
    title: "Former les jeunes aux nouvelles pratiques agricoles",
    date: "2026-05-04",
    dateLabel: "4 mai 2026",
  },
  {
    image: "/assets/images/evenements/atelier-agricole.jpeg",
    category: "Atelier · Innov’ert",
    title: "Valoriser les huiles usagées grâce à un atelier dédié",
    date: "2026-04-22",
    dateLabel: "22 avril 2026",
  },
  {
    image: "/assets/images/evenements/conference-prise-de-parole.webp",
    category: "Conférence",
    title: "Échanger autour des enjeux de gouvernance migratoire",
    date: "2026-04-01",
    dateLabel: "1 avril 2026",
  },
];

export default function NewsSlider() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const showSlide = (index) => setActiveIndex((index + SLIDES.length) % SLIDES.length);

  return (
    <div
      className="sea-news-slider"
      data-news-slider=""
      role="region"
      aria-roledescription="carrousel"
      aria-label={t("Les dernières actualités")}
    >
      {SLIDES.map((slide, index) => {
        const isActive = index === activeIndex;
        return (
          <article
            key={slide.image}
            className={`sea-news-slide${isActive ? " is-active" : ""}`}
            data-news-slide=""
            aria-roledescription="diapositive"
            aria-label={t(`${index + 1} sur ${SLIDES.length}`)}
            aria-hidden={isActive ? undefined : "true"}
          >
            <img src={slide.image} alt="" loading="lazy" />
            <div className="sea-news-slide__content">
              <span className="sea-news-slide__category">{t(slide.category)}</span>
              <h2>{t(slide.title)}</h2>
              <time dateTime={slide.date}>{t(slide.dateLabel)}</time>
              <Link href="/evenements/">
                {t("Découvrir")}{" "}
                <span aria-hidden="true">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </Link>
            </div>
          </article>
        );
      })}
      <div className="sea-news-slider__controls" aria-label={t("Commandes du carrousel")}>
        <button
          type="button"
          aria-label={t("Actualité précédente")}
          onClick={() => showSlide(activeIndex - 1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <div className="sea-news-slider__dots" aria-label={t("Choisir une actualité")}>
          {SLIDES.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              aria-label={t(`Afficher l’actualité ${index + 1}`)}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => showSlide(index)}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label={t("Actualité suivante")}
          onClick={() => showSlide(activeIndex + 1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
