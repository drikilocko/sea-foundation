"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { prefersReducedMotion } from "@/lib/scrollEffects";

export default function QuotesCarousel({ children }) {
  const { t } = useLanguage();
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateControls();
    window.addEventListener("resize", updateControls);
    return () => window.removeEventListener("resize", updateControls);
  }, [updateControls]);

  const move = (direction) => {
    const track = trackRef.current;
    const firstCard = track?.querySelector(".quote-card");
    if (!firstCard) return;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (firstCard.getBoundingClientRect().width + gap),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <>
      <div
        className="quote-grid"
        id="quotes-track"
        role="region"
        aria-label={t("Citations du plan stratégique")}
        ref={trackRef}
        onScroll={updateControls}
      >
        {children}
      </div>
      <nav className="quote-controls" aria-label={t("Navigation des citations")}>
        <button
          className="slider-button"
          type="button"
          aria-label={t("Citation précédente")}
          aria-controls="quotes-track"
          disabled={atStart}
          onClick={() => move(-1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          className="slider-button"
          type="button"
          aria-label={t("Citation suivante")}
          aria-controls="quotes-track"
          disabled={atEnd}
          onClick={() => move(1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </nav>
    </>
  );
}
