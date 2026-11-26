"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import { ArrowIcon, PriorityIcon } from "@/components/home/PriorityIcon";
import { PRIORITIES } from "@/components/home/priorities";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { canUseSmoothScroll, PRIORITY_EASE } from "@/lib/motion";
import { prefersReducedMotion } from "@/lib/scrollEffects";

const OPEN_DURATION = 950;
const CLOSE_DURATION = 820;
const CARD_RADIUS = 22;
const OPEN_CLASS = "is-priority-story-open";

const pad = (value) => String(value).padStart(2, "0");

const WALL_TILES = 28;

// Taille d’origine d’une image déjà affichée par la carte (donc déjà en cache).
function naturalSize(url) {
  const image = new Image();
  image.src = url;
  return image.naturalWidth ? { width: image.naturalWidth, height: image.naturalHeight } : null;
}

// Prépare le trajet de l’image entre la carte (petite) et la bannière (grande).
// L’image reste dessinée une seule fois à la taille de la bannière : le trajet n’utilise que
// des déplacements, des agrandissements et un recadrage, que la carte graphique gère sans
// recalculer la mise en page. Le recadrage reproduit celui de la carte.
export function placeGhost(ghost, image, big, small, bigRadius, imageUrl) {
  Object.assign(ghost.style, {
    left: `${big.left}px`,
    top: `${big.top}px`,
    width: `${big.width}px`,
    height: `${big.height}px`,
  });
  const scale = Math.max(small.width / big.width, small.height / big.height);
  const cropX = (big.width - small.width / scale) / 2;
  const cropY = (big.height - small.height / scale) / 2;
  const dx = small.left + small.width / 2 - (big.left + big.width / 2);
  const dy = small.top + small.height / 2 - (big.top + big.height / 2);

  // L’image garde sa taille complète (sans recadrage) et reste centrée : c’est le recadrage
  // du calque qui choisit la partie visible, comme « background-size: cover ».
  let imageScale = 1;
  const size = naturalSize(imageUrl);
  if (size) {
    const bigCover = Math.max(big.width / size.width, big.height / size.height);
    const smallCover = Math.max(small.width / size.width, small.height / size.height);
    const width = size.width * bigCover;
    const height = size.height * bigCover;
    Object.assign(image.style, {
      left: `${(big.width - width) / 2}px`,
      top: `${(big.height - height) / 2}px`,
      width: `${width}px`,
      height: `${height}px`,
      right: "auto",
      bottom: "auto",
      backgroundSize: "100% 100%",
    });
    imageScale = smallCover / (bigCover * scale);
  }

  return {
    ghostSmall: {
      transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
      clipPath: `inset(${cropY}px ${cropX}px round ${CARD_RADIUS / scale}px)`,
    },
    ghostBig: { transform: "translate(0px, 0px) scale(1)", clipPath: `inset(0px 0px round ${bigRadius}px)` },
    imageSmall: { transform: `scale(${imageScale})` },
    imageBig: { transform: "scale(1)" },
  };
}

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

// Vue immersive d’une priorité : l’image de la carte s’agrandit au centre de l’écran,
// le reste de la page s’efface (sauf la navigation) et le détail de la priorité apparaît dessous.
export default function PriorityStory({ initialIndex, getSourceCard, prepareReturn, onClosed }) {
  const { t } = useLanguage();
  const { lockScroll, unlockScroll } = useSmoothScroll();
  const [index, setIndex] = useState(initialIndex);
  // Rendu seulement après un clic, donc toujours côté navigateur.
  const [phase, setPhase] = useState(() => (prefersReducedMotion() ? "open" : "opening"));
  const [hasSwitched, setHasSwitched] = useState(false);

  const rootRef = useRef(null);
  const backdropRef = useRef(null);
  const scrollerRef = useRef(null);
  const innerRef = useRef(null);
  const mediaRef = useRef(null);
  const ghostRef = useRef(null);
  const ghostImageRef = useRef(null);
  const backRef = useRef(null);
  const innerLenisRef = useRef(null);
  const indexRef = useRef(initialIndex);
  const closingRef = useRef(false);
  const ownsHistoryEntryRef = useRef(false);
  const sourceCardRef = useRef(null);

  const priority = PRIORITIES[index];
  const nextPriority = PRIORITIES[(index + 1) % PRIORITIES.length];

  // Mise en place : la page se fige, la navigation reste visible et seule la vue est accessible.
  useLayoutEffect(() => {
    const root = rootRef.current;
    const panel = document.querySelector(".sea-header-panel");
    document.documentElement.classList.add(OPEN_CLASS);
    const navBottom = panel
      ? panel.classList.contains("is-scroll-nav")
        ? panel.offsetHeight
        : Math.max(0, panel.getBoundingClientRect().bottom)
      : 0;
    root.style.setProperty("--story-top", `${navBottom}px`);
    lockScroll();

    const inertElements = [...document.body.children].filter(
      (element) => element !== root && !element.matches("header, script, .ai-chat"),
    );
    inertElements.forEach((element) => element.setAttribute("inert", ""));

    const source = getSourceCard(initialIndex);
    sourceCardRef.current = source;
    backRef.current?.focus({ preventScroll: true });

    if (prefersReducedMotion()) {
      root.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: "ease" });
    } else {
      const small = source.getBoundingClientRect();
      const big = mediaRef.current.getBoundingClientRect();
      const radius = parseFloat(window.getComputedStyle(mediaRef.current).borderTopLeftRadius) || 28;
      const frames = placeGhost(ghostRef.current, ghostImageRef.current, big, small, radius, PRIORITIES[initialIndex].image);
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
      document.documentElement.classList.remove(OPEN_CLASS);
      inertElements.forEach((element) => element.removeAttribute("inert"));
      sourceCardRef.current?.classList.remove("is-story-source");
      unlockScroll();
    };
    // Exécuté une seule fois, à l’ouverture.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // La barre « Retour / flèches » reste collée en haut ; un fond apparaît dès qu’on défile.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const root = rootRef.current;
    if (!scroller || !root) return undefined;
    const panel = document.querySelector(".sea-header-panel");
    const update = () => {
      root.classList.toggle("is-scrolled", scroller.scrollTop > 8);
      // Bas réel du menu, qui peut changer de hauteur après l’ouverture.
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

  // Défilement fluide à l’intérieur de la vue, comme sur le reste du site.
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
    const finish = () => {
      sourceCardRef.current?.classList.remove("is-story-source");
      sourceCardRef.current?.focus({ preventScroll: true });
      onClosed();
    };

    const topOffset = parseFloat(root.style.getPropertyValue("--story-top")) || 0;
    const big = mediaRef.current.getBoundingClientRect();
    const radius = parseFloat(window.getComputedStyle(mediaRef.current).borderTopLeftRadius) || 28;
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
    const frames = placeGhost(ghostRef.current, ghostImageRef.current, big, small, radius, PRIORITIES[indexRef.current].image);
    // Tout le travail de mise en page est fait avant le premier pas de l’animation,
    // pour qu’aucune image ne soit sautée pendant le trajet.
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
  }, [onClosed, prepareReturn]);

  // Le bouton « Retour » du navigateur ou du téléphone ferme la vue au lieu de quitter la page.
  useEffect(() => {
    if (!window.history.state?.seaPriorityStory) {
      window.history.pushState({ ...window.history.state, seaPriorityStory: true }, "");
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
    if (ownsHistoryEntryRef.current && window.history.state?.seaPriorityStory) {
      ownsHistoryEntryRef.current = false;
      window.history.back();
      return;
    }
    close();
  }, [close]);

  const goTo = useCallback(
    (target) => {
      if (closingRef.current) return;
      const next = (target + PRIORITIES.length) % PRIORITIES.length;
      indexRef.current = next;
      setIndex(next);
      setHasSwitched(true);
      if (innerLenisRef.current) innerLenisRef.current.scrollTo(0, { duration: 0.9 });
      else scrollerRef.current.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    },
    [],
  );

  useEffect(() => {
    const onKeyDown = (event) => {
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
      className="priority-story"
      data-phase={phase}
      role="dialog"
      aria-modal="true"
      aria-labelledby="priority-story-title"
      style={{ "--story-image": `url('${priority.image}')` }}
    >
      <div ref={backdropRef} className="priority-story__backdrop" aria-hidden="true">
        <div className="priority-story__wall">
          {Array.from({ length: WALL_TILES }, (_, tile) => (
            <span key={tile} />
          ))}
        </div>
      </div>
      <div ref={scrollerRef} className="priority-story__scroller">
        <div ref={innerRef} className="priority-story__inner">
          <div className="priority-story__bar">
            <button ref={backRef} type="button" className="priority-story__back" onClick={requestClose}>
              <BackIcon />
              {t("Retour aux priorités")}
            </button>
            <div className="priority-story__pager">
              <span className="priority-story__count" aria-live="polite">
                {pad(index + 1)} / {pad(PRIORITIES.length)}
              </span>
              <button
                type="button"
                className="priority-story__arrow"
                aria-label={t("Priorité précédente")}
                onClick={() => goTo(index - 1)}
              >
                <ChevronIcon direction="previous" />
              </button>
              <button
                type="button"
                className="priority-story__arrow"
                aria-label={t("Priorité suivante")}
                onClick={() => goTo(index + 1)}
              >
                <ChevronIcon direction="next" />
              </button>
            </div>
          </div>

          <figure
            key={`media-${priority.id}`}
            ref={mediaRef}
            className={`priority-story__media${hasSwitched ? " is-switching" : ""}`}
            style={{ "--story-delay": delay }}
          >
            <span className="priority-story__icon story-rise" aria-hidden="true">
              <PriorityIcon name={priority.icon} />
            </span>
            <figcaption>
              <span className="priority-story__eyebrow story-rise" style={{ "--i": 1 }}>
                {t(priority.number)}
              </span>
              <h2 id="priority-story-title" className="story-rise" style={{ "--i": 2 }}>
                {t(priority.title)}
              </h2>
            </figcaption>
          </figure>

          <div key={`body-${priority.id}`} className="priority-story__body" style={{ "--story-delay": delay }}>
            <p className="priority-story__lead story-rise" style={{ "--i": 2 }}>
              {t(priority.lead)}
            </p>
            <div className="priority-story__plan">
              <span className="priority-story__label story-rise" style={{ "--i": 3 }}>
                {t("Nos axes d’intervention")}
              </span>
              <ol className="priority-story__points">
                {priority.points.map((point, pointIndex) => (
                  <li key={point} className="story-rise" style={{ "--i": pointIndex + 4 }}>
                    <span>{pad(pointIndex + 1)}</span>
                    <p>{t(point)}</p>
                  </li>
                ))}
              </ol>
              {priority.note && (
                <p className="priority-story__note story-rise" style={{ "--i": priority.points.length + 4 }}>
                  {t(priority.note)}
                </p>
              )}
            </div>
            <div className="priority-story__actions story-rise" style={{ "--i": 3 }}>
              <Link className="button priority-story__cta" href="/inscription/">
                {t("S’engager avec SEA")}
                <ArrowIcon />
              </Link>
              <Link className="priority-story__link" href="/actions/">
                {t("Voir toutes nos actions")}
                <ArrowIcon />
              </Link>
            </div>
            <button
              type="button"
              className="priority-story__next story-rise"
              style={{ "--i": priority.points.length + 5 }}
              onClick={() => goTo(index + 1)}
            >
              <span className="priority-story__label">{t("Priorité suivante")}</span>
              <strong>{t(nextPriority.title)}</strong>
              <span className="priority-story__next-arrow" aria-hidden="true">
                <ChevronIcon direction="next" />
              </span>
            </button>
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
