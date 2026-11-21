// Courbe et durée partagées par les cartes des priorités et la vue immersive.
// Elles doivent rester identiques aux valeurs de --priority-ease et --priority-duration en CSS.
export const PRIORITY_DURATION = 900;
export const PRIORITY_EASE = "cubic-bezier(.16, 1, .3, 1)";

// Calcule cubic-bezier(.16, 1, .3, 1) en JavaScript, pour piloter un défilement
// exactement au même rythme qu’une transition CSS.
function cubicBezier(x1, y1, x2, y2) {
  const coordinate = (t, a, b) => 3 * a * t * (1 - t) ** 2 + 3 * b * t ** 2 * (1 - t) + t ** 3;
  const slope = (t, a, b) => 3 * a * (1 - t) ** 2 + 6 * (b - a) * t * (1 - t) + 3 * (1 - b) * t ** 2;
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i += 1) {
      const error = coordinate(t, x1, x2) - x;
      const derivative = slope(t, x1, x2);
      if (Math.abs(error) < 1e-5 || !derivative) break;
      t = Math.min(1, Math.max(0, t - error / derivative));
    }
    return coordinate(t, y1, y2);
  };
}

export const easeOutExpo = cubicBezier(0.16, 1, 0.3, 1);

// Lenis n’est activé que sur les appareils à souris assez puissants, sans préférence
// de mouvement réduit ni d’économie de données.
export const canUseSmoothScroll = () =>
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  !window.matchMedia("(pointer: coarse)").matches &&
  navigator.hardwareConcurrency > 4 &&
  !navigator.connection?.saveData;
