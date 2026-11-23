"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { prefersReducedMotion } from "@/lib/scrollEffects";
import { LOGO_COLOR, LOGO_WHITE } from "@/lib/site";
import { useHydrated } from "@/lib/useHydrated";

const VISIT_KEY = "sea-foundation-preloader-visited";
// Durées de la première visite (ms) : barre, logo en couleur, ouverture.
const LINE_DURATION = 900;
const LOGO_DURATION = 700;
const OPEN_DURATION = 900;
const IMAGE_TIMEOUT = 8000;
// Seules les images visibles à l’ouverture retiennent le préchargeur.
const CRITICAL_SELECTOR = ".sea-hero-wrap, .site-page-header";
const ARTICLE_SELECTOR = "[data-news-slide]";
const BACKGROUND_URL = /url\((?:"([^"]+)"|'([^']+)'|([^)]*))\)/g;

function collectImageUrls(selector, ignoredSelector) {
  const urls = new Set();
  document.querySelectorAll(selector).forEach((section) => {
    [section, ...section.querySelectorAll("*")].forEach((element) => {
      if (ignoredSelector && element.closest(ignoredSelector)) return;
      if (element instanceof HTMLImageElement && (element.currentSrc || element.src)) {
        urls.add(element.currentSrc || element.src);
      }
      ["", "::before", "::after"].forEach((pseudoElement) => {
        const { backgroundImage } = window.getComputedStyle(element, pseudoElement);
        for (const match of backgroundImage.matchAll(BACKGROUND_URL)) {
          const url = match[1] || match[2] || match[3];
          if (url) urls.add(new URL(url.trim(), document.baseURI).href);
        }
      });
    });
  });
  return urls;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const timeout = window.setTimeout(
      () => reject(new Error(`Délai dépassé pour ${src}`)),
      IMAGE_TIMEOUT,
    );
    const fail = () => {
      window.clearTimeout(timeout);
      reject(new Error(`Image impossible à charger : ${src}`));
    };
    image.onerror = fail;
    image.onload = () => {
      if (!image.naturalWidth) {
        fail();
        return;
      }
      image.decode().then(() => {
        window.clearTimeout(timeout);
        resolve();
      }, fail);
    };
    image.src = src;
  });
}

function readRepeatVisit() {
  try {
    return window.sessionStorage.getItem(VISIT_KEY) === "true";
  } catch (error) {
    console.error("Impossible de lire l’état du préchargeur:", error);
    return false;
  }
}

function saveVisit() {
  try {
    window.sessionStorage.setItem(VISIT_KEY, "true");
  } catch (error) {
    console.error("Impossible d’enregistrer l’état du préchargeur:", error);
  }
}

export default function Preloader() {
  const { t } = useLanguage();
  const { lockScroll, unlockScroll } = useSmoothScroll();
  const isHydrated = useHydrated();
  const [phase, setPhase] = useState("loading");
  const [isRepeatVisit] = useState(() => typeof window !== "undefined" && readRepeatVisit());
  const retryRef = useRef(null);
  const isScrollLockedRef = useRef(false);

  const releaseScroll = useCallback(() => {
    if (!isScrollLockedRef.current) return;
    isScrollLockedRef.current = false;
    unlockScroll();
  }, [unlockScroll]);

  useEffect(() => {
    let cancelled = false;
    const timers = [];
    const later = (callback, delay) => {
      timers.push(window.setTimeout(() => !cancelled && callback(), delay));
    };

    const reducedMotion = prefersReducedMotion();
    const startedAt = performance.now();
    isScrollLockedRef.current = true;
    lockScroll();

    const absolute = (path) => new URL(path, document.baseURI).href;
    const criticalImages = new Set([
      absolute(LOGO_WHITE),
      absolute(LOGO_COLOR),
      ...collectImageUrls(CRITICAL_SELECTOR, ARTICLE_SELECTOR),
    ]);

    Promise.all([...criticalImages].map(loadImage))
      .then(() => {
        if (cancelled) return;
        saveVisit();
        const showLogo = () => {
          setPhase("logo");
          later(() => setPhase("opening"), reducedMotion ? 100 : isRepeatVisit ? 450 : LOGO_DURATION);
        };
        if (reducedMotion || isRepeatVisit) showLogo();
        else later(showLogo, Math.max(0, LINE_DURATION - (performance.now() - startedAt)));
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Les premières images n’ont pas pu être chargées.", error);
        setPhase("error");
      });

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
      releaseScroll();
    };
  }, [isRepeatVisit, lockScroll, releaseScroll]);

  useEffect(() => {
    if (phase === "done") releaseScroll();
    if (phase === "error") retryRef.current?.focus({ preventScroll: true });
    if (phase !== "opening") return undefined;
    const delay = isRepeatVisit ? 450 : prefersReducedMotion() ? 100 : OPEN_DURATION + 100;
    const timer = window.setTimeout(() => setPhase("done"), delay);
    return () => window.clearTimeout(timer);
  }, [phase, isRepeatVisit, releaseScroll]);

  if (phase === "done") return null;

  // Dès le HTML, le logo blanc s’affiche : l’écran n’attend pas le JavaScript pour montrer
  // quelque chose. La règle CSS de secours retire ce voile si JavaScript ne démarre pas.
  if (!isHydrated) {
    return (
      <div className="site-preloader is-static" aria-hidden="true">
        <span className="site-preloader__line" />
        <span className="site-preloader__logo">
          <img className="site-preloader__logo-base" src={LOGO_WHITE} alt="" fetchPriority="high" />
        </span>
      </div>
    );
  }

  const classes = [
    "site-preloader",
    isRepeatVisit && "is-visited",
    phase === "loading" && "is-loading",
    (phase === "logo" || phase === "opening") && "is-logo-visible is-logo-colored",
    phase === "opening" && "is-opening",
    phase === "error" && "has-error",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      aria-hidden={phase === "error" ? undefined : "true"}
      onTransitionEnd={(event) => {
        if (
          phase === "opening" &&
          event.target === event.currentTarget &&
          event.propertyName === "transform"
        ) {
          setPhase("done");
        }
      }}
    >
      <span className="site-preloader__line" hidden={phase === "error"} />
      <span
        className="site-preloader__logo"
        role="img"
        aria-label="SEA Foundation"
        hidden={phase === "error"}
      >
        <img className="site-preloader__logo-base" src={LOGO_WHITE} alt="" />
        <img className="site-preloader__logo-color" src={LOGO_COLOR} alt="" />
      </span>
      <div className="site-preloader__error" role="alert" hidden={phase !== "error"}>
        <h1>{t("Connexion impossible")}</h1>
        <p>
          {t(
            "Les premières images du site n’ont pas pu être chargées. Vérifiez votre connexion, puis actualisez la page.",
          )}
        </p>
        <button
          ref={retryRef}
          className="site-preloader__retry"
          type="button"
          onClick={() => window.location.reload()}
        >
          {t("Actualiser")}
        </button>
      </div>
    </div>
  );
}
