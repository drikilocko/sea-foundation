"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { subscribeToScroll } from "@/lib/scrollEffects";

// Barre de défilement fine, sur toute la hauteur de l'écran (la barre native est masquée).
// La taille du curseur suit la proportion visible de la page, comme une vraie barre de défilement.
export default function ScrollProgress() {
  const barRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;

    const update = () => {
      const view = window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const scrollable = total - view;
      const thumb = scrollable > 0 ? Math.max(48, (view * view) / total) : 0;
      const progress = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
      bar.style.setProperty("--thumb-size", `${thumb}px`);
      bar.style.setProperty("--thumb-offset", `${progress * (view - thumb)}px`);
      bar.classList.toggle("is-hidden", scrollable <= 0);
    };

    const unsubscribe = subscribeToScroll(update);
    const resize = new ResizeObserver(update);
    resize.observe(document.body);
    window.addEventListener("resize", update);
    update();
    return () => {
      unsubscribe();
      resize.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <div className="scroll-progress" ref={barRef} aria-hidden="true">
      <span className="scroll-progress__thumb" />
    </div>
  );
}
