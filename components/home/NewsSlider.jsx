"use client";

import { useCallback, useRef, useState } from "react";
import NewsVideoStory from "@/components/news/NewsVideoStory";
import { NEWS_VIDEOS, videoPoster } from "@/components/news/NewsVideos";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

// Carrousel « SEA Action » du haut de l’accueil : il présente les mêmes vidéos que la section
// Actualités et ouvre la même vue immersive, l’aperçu partant de la diapositive affichée.
export default function NewsSlider() {
  const { t } = useLanguage();
  const { scrollToY } = useSmoothScroll();
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(null);
  const showSlide = (index) => setActiveIndex((index + NEWS_VIDEOS.length) % NEWS_VIDEOS.length);

  // Au retour, la diapositive de la dernière vidéo regardée s’affiche, et le carrousel
  // est ramené à l’écran si besoin, pour que l’aperçu y revienne.
  const prepareReturn = useCallback(
    (index, topOffset) => {
      const slider = sliderRef.current;
      setActiveIndex(index);
      slider.classList.add("is-instant");
      const bounds = slider.getBoundingClientRect();
      if (bounds.top < topOffset || bounds.bottom > window.innerHeight) {
        scrollToY(window.scrollY + bounds.top - topOffset - 16, { immediate: true });
      }
      return slider;
    },
    [scrollToY],
  );

  const finishReturn = useCallback(() => {
    sliderRef.current?.classList.remove("is-instant");
    setStoryIndex(null);
  }, []);

  return (
    <>
      <div
        ref={sliderRef}
        className="sea-news-slider"
        data-news-slider=""
        role="region"
        aria-roledescription="carrousel"
        aria-label={t("Les dernières actualités")}
      >
        {NEWS_VIDEOS.map((video, index) => {
          const isActive = index === activeIndex;
          return (
            <article
              key={video.id}
              className={`sea-news-slide${isActive ? " is-active" : ""}`}
              // Toute la diapositive ouvre la vidéo, pas seulement le bouton.
              onClick={isActive ? () => setStoryIndex(index) : undefined}
              data-news-slide=""
              aria-roledescription="diapositive"
              aria-label={t(`${index + 1} sur ${NEWS_VIDEOS.length}`)}
              aria-hidden={isActive ? undefined : "true"}
            >
              <img src={videoPoster(video)} alt="" loading="lazy" decoding="async" />
              <button
                type="button"
                className="sea-news-slide__play"
                aria-label={t("Lire la vidéo")}
                aria-haspopup="dialog"
                tabIndex={isActive ? undefined : -1}
                onClick={(event) => {
                  event.stopPropagation();
                  setStoryIndex(index);
                }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5.5v13l10.5-6.5z" />
                </svg>
              </button>
              <div className="sea-news-slide__content">
                <span className="sea-news-slide__category">{video.tags.map((tag) => t(tag)).join(" · ")}</span>
                <h2>{t(video.title)}</h2>
                <button
                  type="button"
                  className="sea-news-slide__link"
                  aria-haspopup="dialog"
                  tabIndex={isActive ? undefined : -1}
                  onClick={(event) => {
                    event.stopPropagation();
                    setStoryIndex(index);
                  }}
                >
                  {t("Regarder la vidéo")}{" "}
                  <span aria-hidden="true">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </span>
                </button>
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
            {NEWS_VIDEOS.map((video, index) => (
              <button
                key={video.id}
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
      {storyIndex !== null && (
        <NewsVideoStory
          videos={NEWS_VIDEOS}
          initialIndex={storyIndex}
          getSourceCard={() => sliderRef.current}
          prepareReturn={prepareReturn}
          onClosed={finishReturn}
        />
      )}
    </>
  );
}
