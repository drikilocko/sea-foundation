"use client";

import { Fragment, useEffect, useRef } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { prefersReducedMotion, subscribeToScroll } from "@/lib/scrollEffects";

const SENTENCE =
  "Chaque jeune mérite une chance, un accompagnement bienveillant et la liberté de construire son avenir.";
const WORDS = SENTENCE.split(" ");

export default function KindnessStatement() {
  const { t } = useLanguage();
  const statementRef = useRef(null);

  useEffect(() => {
    const statement = statementRef.current;
    if (!statement) return undefined;
    const words = [...statement.querySelectorAll("span")];

    const update = () => {
      if (prefersReducedMotion()) {
        words.forEach((word) => word.style.setProperty("--word-reveal", "1"));
        return;
      }
      const bounds = statement.getBoundingClientRect();
      const start = window.innerHeight * 0.82;
      const finish = window.innerHeight * 0.18;
      const progress = Math.min(Math.max((start - bounds.top) / (bounds.height + start - finish), 0), 1);
      const range = words.length + 1;
      words.forEach((word, index) => {
        const reveal = Math.min(Math.max(progress * range - index, 0), 1);
        word.style.setProperty("--word-reveal", String(0.18 + reveal * 0.82));
      });
    };

    const unsubscribe = subscribeToScroll(update);
    window.addEventListener("resize", update);
    update();
    return () => {
      unsubscribe();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <p className="kindness-statement" ref={statementRef} aria-label={t(SENTENCE)}>
      {WORDS.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span aria-hidden="true">{t(word)}</span>{" "}
        </Fragment>
      ))}
    </p>
  );
}
