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

  useEffect(() => {
    if (!canUseSmoothScroll()) return undefined;

    let cancelled = false;
    import("lenis")
      .then(({ default: Lenis }) => {
        if (cancelled) return;
        lenisRef.current = new Lenis({
          autoRaf: true,
          duration: 0.5,
          lerp: 0.2,
          smoothWheel: true,
          syncTouch: false,
          wheelMultiplier: 1,
        });
        if (lockCountRef.current > 0) lenisRef.current.stop();
      })
      .catch((error) => {
        console.error("Lenis n’a pas pu être chargé, le défilement natif reste actif.", error);
      });

    return () => {
      cancelled = true;
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
  }, []);

  // Défile la page avec Lenis quand il est actif, sinon avec le défilement natif.
  const scrollToY = useCallback((top, { immediate = false } = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(top, { immediate, force: true });
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
