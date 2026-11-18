"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/scrollEffects";

const TARGETS = 'main [class*="-card"]:not(.partner-card):not(.priority-card)';

export default function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll(TARGETS);
    if (prefersReducedMotion() || !targets.length || !("IntersectionObserver" in window)) {
      return undefined;
    }

    document.body.classList.add("has-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );

    targets.forEach((target, index) => {
      target.classList.add("reveal-item");
      target.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
