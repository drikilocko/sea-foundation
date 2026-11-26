"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { canUseSmoothScroll } from "@/lib/motion";

const SmoothScrollContext = createContext({
  lockScroll: () => {},
  unlockScroll: () => {},
  scrollToY: () => {},
});

export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const lockCountRef = useRef(0);

  const wakeRef = useRef(() => {});

  useEffect(() => {
    if (!canUseSmoothScroll()) return undefined;

    let cancelled = false;
    let frame = 0;
    let idleFrames = 0;
    const events = ["wheel", "keydown", "touchstart", "pointerdown"];
    let wake = () => {};

    import("lenis")
      .then(({ default: Lenis }) => {
        if (cancelled) return;
        const lenis = new Lenis({
          // La boucle d’animation est pilotée ici : elle ne tourne que pendant un défilement,
          // au lieu de solliciter le navigateur à chaque image même quand la page est immobile.
          autoRaf: false,
          // Lissage continu : chaque cran de molette prolonge le mouvement en cours au lieu de
          // relancer une animation de durée fixe, ce qui provoquait des à-coups.
          lerp: 0.1,
          smoothWheel: true,
          syncTouch: false,
          wheelMultiplier: 1,
        });
        lenisRef.current = lenis;

        const loop = (time) => {
          lenis.raf(time);
          idleFrames = lenis.isScrolling ? 0 : idleFrames + 1;
          // Une demi-seconde sans mouvement : la boucle s’arrête jusqu’au prochain geste.
          frame = idleFrames > 30 ? 0 : requestAnimationFrame(loop);
        };
        wake = () => {
          idleFrames = 0;
          if (frame) return;
          // Repart d’une horloge neuve, sinon le premier pas couvrirait toute la pause.
          lenis.time = 0;
          frame = requestAnimationFrame(loop);
        };
        wakeRef.current = wake;
        events.forEach((type) => window.addEventListener(type, wake, { passive: true }));
        wake();
        if (lockCountRef.current > 0) lenis.stop();
      })
      .catch((error) => {
        console.error("Lenis n’a pas pu être chargé, le défilement natif reste actif.", error);
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      events.forEach((type) => window.removeEventListener(type, wake));
      wakeRef.current = () => {};
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  const lockScroll = useCallback(() => {
    lockCountRef.current += 1;
    document.body.style.overflow = "hidden";
    lenisRef.current?.stop();
  }, []);

  const unlockScroll = useCallback(() => {
    lockCountRef.current = Math.max(0, lockCountRef.current - 1);
    if (lockCountRef.current > 0) return;
    document.body.style.overflow = "";
    lenisRef.current?.start();
    wakeRef.current();
  }, []);

  // Défile la page avec Lenis quand il est actif, sinon avec le défilement natif.
  const scrollToY = useCallback((top, { immediate = false } = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(top, { immediate, force: true });
      wakeRef.current();
      return;
    }
    window.scrollTo({ top, behavior: immediate ? "instant" : "smooth" });
  }, []);

  const value = useMemo(
    () => ({ lockScroll, unlockScroll, scrollToY }),
    [lockScroll, unlockScroll, scrollToY],
  );

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}

export const useSmoothScroll = () => useContext(SmoothScrollContext);
