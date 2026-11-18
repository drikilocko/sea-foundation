const effects = new Set();
let frame = 0;

export function scheduleScrollEffects() {
  if (frame) return;
  frame = window.requestAnimationFrame(() => {
    frame = 0;
    effects.forEach((effect) => effect());
  });
}

export function subscribeToScroll(effect) {
  effects.add(effect);
  if (effects.size === 1) {
    window.addEventListener("scroll", scheduleScrollEffects, { passive: true });
  }
  return () => {
    effects.delete(effect);
    if (effects.size === 0) window.removeEventListener("scroll", scheduleScrollEffects);
  };
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
