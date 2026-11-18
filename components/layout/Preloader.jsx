"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { prefersReducedMotion } from "@/lib/scrollEffects";
import { LOGO_COLOR, LOGO_WHITE } from "@/lib/site";
import { useHydrated } from "@/lib/useHydrated";

const VISIT_KEY = "sea-foundation-preloader-visited";
const LINE_DURATION = 3000;
const IMAGE_TIMEOUT = 12000;
const CRITICAL_SELECTOR = ".sea-hero-wrap, #fondation, .site-page-header";
const ARTICLE_SELECTOR = "[data-news-slide], #actualites article, .site-page-main article";
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
    const articleImages = [...collectImageUrls(ARTICLE_SELECTOR)].filter(
      (src) => !criticalImages.has(src),
    );

    // Une image d’article manquante ne doit pas bloquer l’accès au site.
    const loadArticleImage = (src) =>
      loadImage(src).catch((error) => console.warn("Image d’article non préchargée:", error));

    Promise.all([...[...criticalImages].map(loadImage), ...articleImages.map(loadArticleImage)])
      .then(() => {
        if (cancelled) return;
        saveVisit();
        const showLogo = () => {
          setPhase("logo");
          later(() => setPhase("opening"), reducedMotion ? 100 : isRepeatVisit ? 550 : 3000);
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
    const delay = isRepeatVisit ? 500 : prefersReducedMotion() ? 100 : 1600;
    const timer = window.setTimeout(() => setPhase("done"), delay);
    return () => window.clearTimeout(timer);
  }, [phase, isRepeatVisit, releaseScroll]);

  if (phase === "done") return null;

  // Vide au premier rendu : la règle CSS de secours s’applique si JavaScript ne démarre pas.
  if (!isHydrated) return <div className="site-preloader" aria-hidden="true" />;

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
