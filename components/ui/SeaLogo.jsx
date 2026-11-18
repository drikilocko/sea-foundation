"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LOGO_COLOR, LOGO_WHITE } from "@/lib/site";

export default function SeaLogo({ className = "", label = "Logo SEA Foundation", fillOn }) {
  const { t } = useLanguage();
  const logoRef = useRef(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo || !fillOn) return undefined;
    const fill = () => setFilled(true);

    if (fillOn === "hover") {
      const link = logo.closest("a");
      logo.addEventListener("pointerenter", fill, { once: true });
      link?.addEventListener("focus", fill, { once: true });
      return () => {
        logo.removeEventListener("pointerenter", fill);
        link?.removeEventListener("focus", fill);
      };
    }

    if (!("IntersectionObserver" in window)) {
      fill();
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        fill();
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(logo);
    return () => observer.disconnect();
  }, [fillOn]);

  const classes = ["sea-logo-fill", className, filled ? "is-logo-filled" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <span ref={logoRef} className={classes} role="img" aria-label={t(label)}>
      <img className="sea-logo-fill__base" src={LOGO_WHITE} alt="" aria-hidden="true" />
      <img className="sea-logo-fill__color" src={LOGO_COLOR} alt="" aria-hidden="true" />
    </span>
  );
}
