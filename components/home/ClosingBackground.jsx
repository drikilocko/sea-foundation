"use client";

import { useEffect } from "react";

// Affiche la photo de fond de fin de page tant que la FAQ ou le pied de page sont à l’écran.
// Un IntersectionObserver suffit : rien n’est mesuré pendant le défilement.
export default function ClosingBackground() {
  useEffect(() => {
    const faq = document.getElementById("faq");
    const footer = document.querySelector(".footer");
    if (!faq || !footer) return undefined;

    const visible = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      document.body.classList.toggle("closing-background-active", visible.size > 0);
    });
    observer.observe(faq);
    observer.observe(footer);
    return () => {
      observer.disconnect();
      document.body.classList.remove("closing-background-active");
    };
  }, []);

  return null;
}
