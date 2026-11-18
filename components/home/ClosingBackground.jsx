"use client";

import { useEffect } from "react";
import { subscribeToScroll } from "@/lib/scrollEffects";

export default function ClosingBackground() {
  useEffect(() => {
    const faq = document.getElementById("faq");
    const footer = document.querySelector(".footer");
    if (!faq || !footer) return undefined;

    const update = () => {
      const isActive =
        faq.getBoundingClientRect().top < window.innerHeight &&
        footer.getBoundingClientRect().bottom > 0;
      document.body.classList.toggle("closing-background-active", isActive);
    };
    const unsubscribe = subscribeToScroll(update);
    window.addEventListener("resize", update);
    update();
    return () => {
      unsubscribe();
      window.removeEventListener("resize", update);
      document.body.classList.remove("closing-background-active");
    };
  }, []);

  return null;
}
