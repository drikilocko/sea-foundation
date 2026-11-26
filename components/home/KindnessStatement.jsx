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

    // Le calcul ne tourne que lorsque la phrase est à l’écran, et seuls les mots dont
    // l’opacité change sont mis à jour.
    let isVisible = false;
    const values = words.map(() => "");
    const setWord = (index, value) => {
      if (values[index] === value) return;
      values[index] = value;
      words[index].style.setProperty("--word-reveal", value);
    };

    const update = () => {
      if (!isVisible) return;
      if (prefersReducedMotion()) {
        words.forEach((_, index) => setWord(index, "1"));
        return;
      }
      const bounds = statement.getBoundingClientRect();
      const start = window.innerHeight * 0.82;
      const finish = window.innerHeight * 0.18;
      const progress = Math.min(Math.max((start - bounds.top) / (bounds.height + start - finish), 0), 1);
      const range = words.length + 1;
      words.forEach((_, index) => {
        const reveal = Math.min(Math.max(progress * range - index, 0), 1);
        setWord(index, (0.18 + reveal * 0.82).toFixed(3));
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      update();
    });
    observer.observe(statement);
    const unsubscribe = subscribeToScroll(update);
    window.addEventListener("resize", update);
    return () => {
      unsubscribe();
      observer.disconnect();
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
