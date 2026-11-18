"use client";

import { useEffect, useRef } from "react";
import { subscribeToScroll } from "@/lib/scrollEffects";

export default function ScrollProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      progressRef.current?.style.setProperty("--scroll-progress", `${progress * 100}%`);
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
    <div className="scroll-progress" ref={progressRef} aria-hidden="true">
      <span className="scroll-progress__fill" />
      <span className="scroll-progress__dot" />
    </div>
  );
}
