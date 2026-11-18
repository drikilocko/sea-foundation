"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/scrollEffects";

const DURATION = 1400;

export default function CountUp({ to, from = 0, ...props }) {
  const nodeRef = useRef(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || from === to || prefersReducedMotion() || !("IntersectionObserver" in window)) {
      return undefined;
    }

    let frame = 0;
    const animate = () => {
      let startedAt = 0;
      const step = (timestamp) => {
        if (!startedAt) startedAt = timestamp;
        const progress = Math.min((timestamp - startedAt) / DURATION, 1);
        const eased = 1 - (1 - progress) ** 3;
        setValue(Math.round(from + (to - from) * eased));
        if (progress < 1) frame = window.requestAnimationFrame(step);
      };
      frame = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        animate();
      },
      { threshold: 0.2 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [from, to]);

  return (
    <span ref={nodeRef} {...props}>
      {value}
    </span>
  );
}
