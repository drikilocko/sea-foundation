"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/scrollEffects";

const DURATION = 1400;

// Compte de `from` à `to` quand le nombre entre à l’écran.
// `pad` complète avec des zéros (03), `delay` décale le départ (en ms) pour enchaîner plusieurs nombres.
export default function CountUp({ to, from = 0, pad = 0, delay = 0, duration = DURATION, ...props }) {
  const nodeRef = useRef(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || from === to || prefersReducedMotion() || !("IntersectionObserver" in window)) {
      return undefined;
    }

    let frame = 0;
    let timer = 0;
    const animate = () => {
      let startedAt = 0;
      const step = (timestamp) => {
        if (!startedAt) startedAt = timestamp;
        const progress = Math.min((timestamp - startedAt) / duration, 1);
        const eased = 1 - (1 - progress) ** 4;
        setValue(Math.round(from + (to - from) * eased));
        if (progress < 1) frame = window.requestAnimationFrame(step);
      };
      frame = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setValue(from);
        timer = window.setTimeout(animate, delay);
      },
      { threshold: 0.2 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frame);
    };
  }, [from, to, delay, duration]);

  return (
    <span ref={nodeRef} {...props}>
      {String(value).padStart(pad, "0")}
    </span>
  );
}
