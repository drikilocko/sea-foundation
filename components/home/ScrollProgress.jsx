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

    // La hauteur de la page n’est relue qu’au redimensionnement : pendant le défilement,
    // seule la position change, sans forcer le navigateur à recalculer la mise en page.
    let view = 0;
    let thumb = 0;
    let scrollable = 0;
    const measure = () => {
      view = window.innerHeight;
      const total = document.documentElement.scrollHeight;
      scrollable = total - view;
      thumb = scrollable > 0 ? Math.max(48, (view * view) / total) : 0;
      bar.style.setProperty("--thumb-size", `${thumb}px`);
      bar.classList.toggle("is-hidden", scrollable <= 0);
      update();
    };
    const update = () => {
      const progress = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
      bar.style.setProperty("--thumb-offset", `${progress * (view - thumb)}px`);
    };

    const unsubscribe = subscribeToScroll(update);
    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      unsubscribe();
      resize.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pathname]);

  return (
    <div className="scroll-progress" ref={barRef} aria-hidden="true">
      <span className="scroll-progress__thumb" />
    </div>
  );
}
