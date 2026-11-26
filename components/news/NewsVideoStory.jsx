"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import { placeGhost } from "@/components/home/PriorityStory";
import { videoPoster } from "@/components/news/NewsVideos";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { canUseSmoothScroll, PRIORITY_EASE } from "@/lib/motion";
import { prefersReducedMotion } from "@/lib/scrollEffects";

// Mêmes durées que la vue immersive des priorités.
const OPEN_DURATION = 950;
const CLOSE_DURATION = 820;
const OPEN_CLASS = "is-priority-story-open";
const WALL_TILES = 28;

const pad = (value) => String(value).padStart(2, "0");

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

function ChevronIcon({ direction }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === "previous" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

// Vue immersive d’une vidéo : l’aperçu de la carte s’agrandit au centre de l’écran, comme
// pour « Nos priorités », puis la vidéo se lance avec le son.
export default function NewsVideoStory({ videos, initialIndex, getSourceCard, prepareReturn, onClosed }) {
  const { t } = useLanguage();
  const { lockScroll, unlockScroll } = useSmoothScroll();
  const [index, setIndex] = useState(initialIndex);
  const [phase, setPhase] = useState(() => (prefersReducedMotion() ? "open" : "opening"));
  const [hasSwitched, setHasSwitched] = useState(false);

  const rootRef = useRef(null);
  const backdropRef = useRef(null);
  const scrollerRef = useRef(null);
  const innerRef = useRef(null);
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  const ghostRef = useRef(null);
  const ghostImageRef = useRef(null);
  const backRef = useRef(null);
  const innerLenisRef = useRef(null);
  const indexRef = useRef(initialIndex);
  const closingRef = useRef(false);
  const ownsHistoryEntryRef = useRef(false);
  const sourceCardRef = useRef(null);

  const video = videos[index];
  const nextVideo = videos[(index + 1) % videos.length];

  // Mise en place : la page se fige, la navigation reste visible et seule la vue est accessible.
  useLayoutEffect(() => {
    const root = rootRef.current;
    const panel = document.querySelector(".sea-header-panel");
    document.documentElement.classList.add(OPEN_CLASS);
    // Le navigateur ne doit pas remettre la page à son ancienne position quand la vue se ferme
    // par l’historique : c’est la vue qui place la page pour que l’image retrouve sa carte.
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const navBottom = panel
      ? panel.classList.contains("is-scroll-nav")
        ? panel.offsetHeight
        : Math.max(0, panel.getBoundingClientRect().bottom)
      : 0;
    root.style.setProperty("--story-top", `${navBottom}px`);
    lockScroll();

    const inertElements = [...document.body.children].filter(
      (element) => element !== root && !element.matches("header, script, .ai-chat, .site-header-slot"),
    );
    inertElements.forEach((element) => element.setAttribute("inert", ""));

    const source = getSourceCard(initialIndex);
    sourceCardRef.current = source;
    backRef.current?.focus({ preventScroll: true });

    if (prefersReducedMotion() || !source) {
      root.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: "ease" });
    } else {
      const small = source.getBoundingClientRect();
      const big = mediaRef.current.getBoundingClientRect();
      const radius = parseFloat(window.getComputedStyle(mediaRef.current).borderTopLeftRadius) || 22;
      const frames = placeGhost(ghostRef.current, ghostImageRef.current, big, small, radius, videoPoster(videos[initialIndex]));
      source.classList.add("is-story-source");
      const timing = { duration: OPEN_DURATION, easing: PRIORITY_EASE, fill: "both" };
      backdropRef.current.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 620, easing: "ease", fill: "both" });
      ghostImageRef.current.animate([frames.imageSmall, frames.imageBig], timing);
      ghostRef.current
        .animate([frames.ghostSmall, frames.ghostBig], timing)
        .finished.then(() => setPhase("open"))
        .catch(() => {});
    }

    return () => {
      window.history.scrollRestoration = previousRestoration;
      document.documentElement.classList.remove(OPEN_CLASS);
      inertElements.forEach((element) => element.removeAttribute("inert"));
      sourceCardRef.current?.classList.remove("is-story-source");
      unlockScroll();
    };
    // Exécuté une seule fois, à l’ouverture.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // La lecture démarre dans la foulée du clic (le navigateur autorise alors le son),
  // pendant que l’aperçu s’agrandit.
  useLayoutEffect(() => {
    const element = videoRef.current;
    if (!element) return;
    element.play().catch(() => {});
  }, [index]);

  // La barre « Retour / flèches » reste collée en haut ; un fond apparaît dès qu’on défile.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const root = rootRef.current;
    const panel = document.querySelector(".sea-header-panel");
    const update = () => {
      root.classList.toggle("is-scrolled", scroller.scrollTop > 8);
      // Une barre fixe peut être encore en train de réapparaître : sa hauteur suffit.
      const navBottom = !panel
        ? 0
        : panel.classList.contains("is-scroll-nav")
          ? panel.offsetHeight
          : Math.max(0, panel.getBoundingClientRect().bottom);
      root.style.setProperty("--story-sticky", `${Math.round(navBottom)}px`);
    };
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!canUseSmoothScroll()) return undefined;
    let cancelled = false;
    import("lenis")
      .then(({ default: Lenis }) => {
        if (cancelled) return;
        innerLenisRef.current = new Lenis({
          wrapper: scrollerRef.current,
          content: innerRef.current,
          autoRaf: true,
          lerp: 0.12,
          smoothWheel: true,
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      innerLenisRef.current?.destroy();
      innerLenisRef.current = null;
    };
  }, []);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const root = rootRef.current;
    videoRef.current?.pause();
    const finish = () => {
      sourceCardRef.current?.classList.remove("is-story-source");
      sourceCardRef.current?.focus({ preventScroll: true });
      onClosed();
    };

    const topOffset = parseFloat(root.style.getPropertyValue("--story-top")) || 0;
    const big = mediaRef.current.getBoundingClientRect();
    const radius = parseFloat(window.getComputedStyle(mediaRef.current).borderTopLeftRadius) || 22;
    sourceCardRef.current?.classList.remove("is-story-source");
    const card = prepareReturn(indexRef.current, topOffset);
    sourceCardRef.current = card;

    if (prefersReducedMotion() || !card) {
      root.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: "ease", fill: "both" })
        .finished.then(finish)
        .catch(finish);
      return;
    }

    card.classList.add("is-story-source");
    const small = card.getBoundingClientRect();
    const frames = placeGhost(ghostRef.current, ghostImageRef.current, big, small, radius, videoPoster(videos[indexRef.current]));
    flushSync(() => setPhase("closing"));
    requestAnimationFrame(() => {
      const timing = { duration: CLOSE_DURATION, easing: PRIORITY_EASE, fill: "both" };
      backdropRef.current.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 520,
        delay: 300,
        easing: "cubic-bezier(.4, 0, .2, 1)",
        fill: "both",
      });
      ghostImageRef.current.animate([frames.imageBig, frames.imageSmall], timing);
      ghostRef.current
        .animate([frames.ghostBig, frames.ghostSmall], timing)
        .finished.then(() => {
          card.classList.remove("is-story-source");
          return ghostRef.current.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 180,
            easing: "ease",
            fill: "forwards",
          }).finished;
        })
        .then(finish)
        .catch(finish);
    });
  }, [onClosed, prepareReturn, videos]);

  // Le bouton « Retour » du navigateur ou du téléphone ferme la vue au lieu de quitter la page.
  useEffect(() => {
    if (!window.history.state?.seaVideoStory) {
      window.history.pushState({ ...window.history.state, seaVideoStory: true }, "");
    }
    ownsHistoryEntryRef.current = true;
    const onPopState = () => {
      ownsHistoryEntryRef.current = false;
      close();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [close]);

  const requestClose = useCallback(() => {
    if (ownsHistoryEntryRef.current && window.history.state?.seaVideoStory) {
      ownsHistoryEntryRef.current = false;
      window.history.back();
      return;
    }
    close();
  }, [close]);

  const goTo = useCallback(
    (target) => {
      if (closingRef.current) return;
      const next = (target + videos.length) % videos.length;
      indexRef.current = next;
      setIndex(next);
      setHasSwitched(true);
      if (innerLenisRef.current) innerLenisRef.current.scrollTo(0, { duration: 0.9 });
      else scrollerRef.current.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    },
    [videos.length],
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.target instanceof HTMLVideoElement) return;
      if (event.key === "Escape") requestClose();
      else if (event.key === "ArrowRight") goTo(indexRef.current + 1);
      else if (event.key === "ArrowLeft") goTo(indexRef.current - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, requestClose]);

  const delay = hasSwitched ? "60ms" : "430ms";

  return createPortal(
    <div
      ref={rootRef}
      className="priority-story video-story"
      data-phase={phase}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-story-title"
      style={{ "--story-image": `url('${videoPoster(video)}')` }}
    >
      <div ref={backdropRef} className="priority-story__backdrop" aria-hidden="true">
        <div className="priority-story__wall">
          {Array.from({ length: WALL_TILES }, (_, tile) => (
            <span key={tile} />
          ))}
        </div>
      </div>
      <div ref={scrollerRef} className="priority-story__scroller">
        <div ref={innerRef} className="priority-story__inner video-story__inner">
          <div className="priority-story__bar">
            <button ref={backRef} type="button" className="priority-story__back" onClick={requestClose}>
              <BackIcon />
              {t("Retour aux actualités")}
            </button>
            <div className="priority-story__pager">
              <span className="priority-story__count" aria-live="polite">
                {pad(index + 1)} / {pad(videos.length)}
              </span>
              <button
                type="button"
                className="priority-story__arrow"
                aria-label={t("Vidéo précédente")}
                onClick={() => goTo(index - 1)}
              >
                <ChevronIcon direction="previous" />
              </button>
              <button
                type="button"
                className="priority-story__arrow"
                aria-label={t("Vidéo suivante")}
                onClick={() => goTo(index + 1)}
              >
                <ChevronIcon direction="next" />
              </button>
            </div>
          </div>

          {/* La vidéo reste collée pendant que seul le texte, à côté, défile. */}
          <div className="video-story__layout">
            <div className="video-story__sticky">
              <figure
                key={`media-${video.id}`}
                ref={mediaRef}
                className={`priority-story__media video-story__media${hasSwitched ? " is-switching" : ""}`}
              >
                <video
                  ref={videoRef}
                  src={`/assets/videos/${video.id}.mp4`}
                  poster={videoPoster(video)}
                  controls
                  playsInline
                  preload="auto"
                  aria-label={t(video.title)}
                />
              </figure>
            </div>

            <div key={`copy-${video.id}`} className="video-story__copy" style={{ "--story-delay": delay }}>
              <div className="news-feature-tags story-rise" style={{ "--i": 0 }}>
                {video.tags.map((tag) => (
                  <span key={tag}>{t(tag)}</span>
                ))}
              </div>
              <h2 id="video-story-title" className="story-rise" style={{ "--i": 1 }}>
                {t(video.title)}
              </h2>
              <p className="video-story__lead story-rise" style={{ "--i": 2 }}>
                {t(video.text)}
              </p>
              {video.paragraphs?.map((paragraph, paragraphIndex) => (
                <p key={paragraph} className="video-story__text story-rise" style={{ "--i": 3 + paragraphIndex }}>
                  {t(paragraph)}
                </p>
              ))}
              {video.values && (
                <ul
                  className="video-story__values story-rise"
                  style={{ "--i": 5 }}
                  aria-label={t("Les valeurs du tournoi")}
                >
                  {video.values.map((value) => (
                    <li key={value}>{t(value)}</li>
                  ))}
                </ul>
              )}
              {video.highlights && (
                <div className="video-story__highlights story-rise" style={{ "--i": 6 }}>
                  <span className="priority-story__label">{t(video.highlightsLabel ?? "Les temps forts")}</span>
                  <ol className="priority-story__points">
                    {video.highlights.map((highlight, highlightIndex) => (
                      <li key={highlight}>
                        <span>{pad(highlightIndex + 1)}</span>
                        <p>{t(highlight)}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {video.images?.map((image) => (
                <figure key={image.src} className="video-story__image story-rise" style={{ "--i": 7 }}>
                  <img src={image.src} alt={t(image.alt)} decoding="async" />
                  <figcaption>{t(image.caption)}</figcaption>
                </figure>
              ))}
              <button
                type="button"
                className="priority-story__next story-rise"
                style={{ "--i": 8 }}
                onClick={() => goTo(index + 1)}
              >
                <span className="priority-story__label">{t("Vidéo suivante")}</span>
                <strong>{t(nextVideo.title)}</strong>
                <span className="priority-story__next-arrow" aria-hidden="true">
                  <ChevronIcon direction="next" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div ref={ghostRef} className="priority-story__ghost" aria-hidden="true">
        <div ref={ghostImageRef} className="priority-story__ghost-image" />
      </div>
    </div>,
    document.body,
  );
}
