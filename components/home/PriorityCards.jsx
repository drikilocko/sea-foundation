"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ArrowIcon, PriorityIcon } from "@/components/home/PriorityIcon";
import PriorityStory from "@/components/home/PriorityStory";
import { PRIORITIES } from "@/components/home/priorities";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { easeOutExpo, PRIORITY_DURATION } from "@/lib/motion";
import { prefersReducedMotion } from "@/lib/scrollEffects";

function getOpenCardWidth(track) {
  const probe = document.createElement("div");
  probe.style.cssText = "position:absolute;visibility:hidden;width:var(--priority-open-width)";
  track.append(probe);
  const width = probe.offsetWidth;
  probe.remove();
  return width;
}

// Position finale du rail une fois la carte ouverte, calculée avant l’animation.
function getRevealScroll(track, card, index) {
  const styles = window.getComputedStyle(track);
  const gap = parseFloat(styles.columnGap) || 0;
  const paddingLeft = parseFloat(styles.paddingLeft) || 0;
  const paddingRight = parseFloat(styles.paddingRight) || 0;
  const closedWidth = parseFloat(window.getComputedStyle(card).minWidth) || 0;
  const openWidth = getOpenCardWidth(track);
  const cardLeft = paddingLeft + index * (closedWidth + gap);
  const cardRight = cardLeft + openWidth;
  const contentWidth =
    paddingLeft + paddingRight + openWidth + (PRIORITIES.length - 1) * (closedWidth + gap);
  const maxScroll = Math.max(0, contentWidth - track.clientWidth);

  let target = track.scrollLeft;
  if (cardLeft < target) target = cardLeft;
  else if (cardRight > target + track.clientWidth) target = cardRight - track.clientWidth;
  return Math.min(target, maxScroll);
}

const isDesktopTrack = () => window.matchMedia("(min-width: 741px)").matches;

export default function PriorityCards() {
  const { t } = useLanguage();
  const { scrollToY } = useSmoothScroll();
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const scrollFrameRef = useRef(0);
  const [activeId, setActiveId] = useState(PRIORITIES[0].id);
  const [storyIndex, setStoryIndex] = useState(null);

  const stopScrollAnimation = useCallback(() => {
    cancelAnimationFrame(scrollFrameRef.current);
    scrollFrameRef.current = 0;
  }, []);

  // Fait défiler le rail avec la même durée et la même courbe que l’ouverture de la carte,
  // pour que les deux mouvements avancent ensemble.
  const animateTrackTo = useCallback(
    (target) => {
      const track = trackRef.current;
      stopScrollAnimation();
      const start = track.scrollLeft;
      const distance = target - start;
      if (Math.abs(distance) < 1) return;
      if (prefersReducedMotion()) {
        track.scrollLeft = target;
        return;
      }
      const startedAt = performance.now();
      const step = (now) => {
        const progress = Math.min(1, (now - startedAt) / PRIORITY_DURATION);
        track.scrollLeft = start + distance * easeOutExpo(progress);
        scrollFrameRef.current = progress < 1 ? requestAnimationFrame(step) : 0;
      };
      scrollFrameRef.current = requestAnimationFrame(step);
    },
    [stopScrollAnimation],
  );

  useEffect(() => {
    const track = trackRef.current;
    // Le geste de l’utilisateur reprend la main sur l’animation.
    track.addEventListener("wheel", stopScrollAnimation, { passive: true });
    track.addEventListener("pointerdown", stopScrollAnimation, { passive: true });
    return () => {
      stopScrollAnimation();
      track.removeEventListener("wheel", stopScrollAnimation);
      track.removeEventListener("pointerdown", stopScrollAnimation);
    };
  }, [stopScrollAnimation]);

  const animatingTimerRef = useRef(0);

  const activate = (card, id, index) => {
    if (id === activeId) return;
    // Pendant l’animation, les effets de flou coûteux sont suspendus pour garder 60 images/s.
    const track = trackRef.current;
    track.classList.add("is-animating");
    window.clearTimeout(animatingTimerRef.current);
    animatingTimerRef.current = window.setTimeout(
      () => track.classList.remove("is-animating"),
      PRIORITY_DURATION + 50,
    );
    if (isDesktopTrack()) animateTrackTo(getRevealScroll(trackRef.current, card, index));
    setActiveId(id);
    if (isDesktopTrack()) return;

    window.setTimeout(() => {
      const bounds = card.getBoundingClientRect();
      if (bounds.top < 80 || bounds.bottom > window.innerHeight) {
        scrollToY(window.scrollY + bounds.top - 96, { immediate: prefersReducedMotion() });
      }
    }, PRIORITY_DURATION * 0.75);
  };

  // Avant la fermeture de la vue immersive, ouvre la bonne carte sans animation, derrière le voile,
  // pour que l’image revienne exactement à sa place.
  const prepareReturn = useCallback(
    (index, topOffset) => {
      const track = trackRef.current;
      const card = cardRefs.current[index];
      stopScrollAnimation();
      track.classList.add("is-instant");
      flushSync(() => setActiveId(PRIORITIES[index].id));

      if (isDesktopTrack()) {
        const trackBounds = track.getBoundingClientRect();
        const cardBounds = card.getBoundingClientRect();
        if (cardBounds.left < trackBounds.left) track.scrollLeft -= trackBounds.left - cardBounds.left + 2;
        else if (cardBounds.right > trackBounds.right) track.scrollLeft += cardBounds.right - trackBounds.right + 2;
      } else {
        const bounds = card.getBoundingClientRect();
        if (bounds.top < topOffset || bounds.bottom > window.innerHeight) {
          scrollToY(window.scrollY + bounds.top - topOffset - 16, { immediate: true });
        }
      }
      return card;
    },
    [scrollToY, stopScrollAnimation],
  );

  const finishReturn = useCallback(() => {
    trackRef.current?.classList.remove("is-instant");
    setStoryIndex(null);
  }, []);

  return (
    <>
      <div className="priority-grid" id="priority-track" ref={trackRef}>
        {PRIORITIES.map(({ id, image, number, title, description, icon }, index) => {
          const isActive = id === activeId;
          return (
            // eslint-disable-next-line jsx-a11y/role-supports-aria-props -- la carte se déplie au clic.
            <article
              key={id}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className={`priority-card${isActive ? " priority-card--active" : ""}`}
              id={id}
              style={{ "--priority-image": `url('${image}')` }}
              tabIndex={0}
              aria-expanded={isActive}
              onClick={(event) => {
                if (event.target.closest("a, button")) return;
                // Une carte déjà ouverte lance la vue immersive, comme « Découvrir les actions ».
                if (isActive) setStoryIndex(index);
                else activate(event.currentTarget, id, index);
              }}
              onKeyDown={(event) => {
                if ((event.key === "Enter" || event.key === " ") && event.target === event.currentTarget) {
                  event.preventDefault();
                  if (isActive) setStoryIndex(index);
                  else activate(event.currentTarget, id, index);
                }
              }}
            >
              <div className="priority-topline">
                <span className="priority-number">{t(number)}</span>
                <span className="priority-icon" aria-hidden="true">
                  <PriorityIcon name={icon} />
                </span>
              </div>
              <div className="priority-copy">
                <h3>{t(title)}</h3>
                <p>{t(description)}</p>
                <div className="priority-actions">
                  <a
                    className="priority-action priority-action--light"
                    href="#axes"
                    aria-haspopup="dialog"
                    onClick={(event) => {
                      event.preventDefault();
                      setStoryIndex(index);
                    }}
                  >
                    {t("Découvrir les actions")}{" "}
                    <span className="arrow">
                      <ArrowIcon />
                    </span>
                  </a>
                  <Link className="priority-action priority-action--accent" href="/contact/">
                    {t("Nous contacter")}{" "}
                    <span className="arrow">
                      <ArrowIcon />
                    </span>
                  </Link>
                </div>
              </div>
              <span className="priority-more" aria-hidden="true">
                <ArrowIcon />
              </span>
            </article>
          );
        })}
      </div>
      {storyIndex !== null && (
        <PriorityStory
          initialIndex={storyIndex}
          getSourceCard={(index) => cardRefs.current[index]}
          prepareReturn={prepareReturn}
          onClosed={finishReturn}
        />
      )}
    </>
  );
}
