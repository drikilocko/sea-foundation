"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { prefersReducedMotion } from "@/lib/scrollEffects";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const PRIORITIES = [
  {
    id: "priority-sante",
    image: "/assets/images/actions/sante-vaccination.jpg",
    number: "01 / PRENDRE SOIN",
    title: "Santé & bien-être",
    description:
      "Faciliter les soins primaires, une alimentation nutritive et la prévention des maladies pour les jeunes vulnérables.",
    icon: (
      <>
        <path d="M20.8 8.7c0 5.4-8.8 11-8.8 11s-8.8-5.6-8.8-11a4.7 4.7 0 0 1 8.8-2.2 4.7 4.7 0 0 1 8.8 2.2Z" />
        <path d="M4.5 12h4l2-3.5 3.2 7 2-3.5h3.8" />
      </>
    ),
  },
  {
    id: "priority-education",
    image: "/assets/images/documents/equipe-eleves-uniformes.jpg",
    number: "02 / APPRENDRE",
    title: "Éducation & sport",
    description:
      "Soutenir les bourses et les enseignants, encourager le sport scolaire et préparer les jeunes à l’emploi.",
    icon: (
      <>
        <path d="M12 5.2c-2.2-1.6-5.3-2-9-1.3v14c3.7-.7 6.8-.3 9 1.3 2.2-1.6 5.3-2 9-1.3v-14c-3.7-.7-6.8-.3-9 1.3Z" />
        <path d="M12 5.2v14" />
      </>
    ),
  },
  {
    id: "priority-entrepreneuriat",
    image: "/assets/images/projet/formation-jeunes-terrain.webp",
    number: "03 / ENTREPRENDRE",
    title: "Entrepreneuriat",
    description:
      "Incuber les projets, former à la mobilisation de fonds et soutenir l’insertion socioprofessionnelle.",
    icon: (
      <>
        <path d="M12 20v-8" />
        <path d="M12 13c-5.2 0-8-2.6-8-7 5.5 0 8 2.3 8 7Z" />
        <path d="M12 10c0-4.1 2.5-6 7-6 0 4.5-2.4 7-7 7" />
      </>
    ),
  },
  {
    id: "priority-agrobusiness",
    image: "/assets/images/projet/elevage-agropastoral.webp",
    number: "04 / INNOVER",
    title: "Agriculture & agrobusiness",
    description:
      "Former des agripreneurs et les accompagner dans différents maillons de la chaîne agricole.",
    icon: (
      <>
        <path d="M12 21V11" />
        <path d="M12 15c-4.4 0-7-2.4-7-6.5 4.8 0 7 2.2 7 6.5Z" />
        <path d="M12 11c0-4.2 2.6-6.5 7-6.5 0 4.4-2.5 6.5-7 6.5Z" />
      </>
    ),
  },
  {
    id: "priority-inclusion",
    image: "/assets/images/a-propos/equipe-fondation-terrain.jpg",
    number: "05 / INCLURE",
    title: "Inclusion & transparence",
    description:
      "Promouvoir l’équité de genre, l’inclusion du handicap et le libre accès aux rapports annuels.",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.8 20v-1.5a6.2 6.2 0 0 1 12.4 0V20" />
        <path d="M16 5.2a3.5 3.5 0 0 1 0 6.8M18 14.5a5 5 0 0 1 3.2 4.7V20" />
      </>
    ),
  },
];

function getOpenCardWidth(track) {
  const probe = document.createElement("div");
  probe.style.cssText = "position:absolute;visibility:hidden;width:var(--priority-open-width)";
  track.append(probe);
  const width = probe.offsetWidth;
  probe.remove();
  return width;
}

// Calcule la position finale pour défiler pendant l’ouverture, et non après.
function revealOpeningCard(track, card, index) {
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
  track.scrollTo({ left: Math.min(target, maxScroll), behavior: "smooth" });
}

export default function PriorityCards() {
  const { t } = useLanguage();
  const trackRef = useRef(null);
  const [activeId, setActiveId] = useState(PRIORITIES[0].id);

  const activate = (card, id, index) => {
    if (id === activeId) return;
    setActiveId(id);

    if (window.matchMedia("(min-width: 741px)").matches) {
      revealOpeningCard(trackRef.current, card, index);
      return;
    }
    window.setTimeout(() => {
      const bounds = card.getBoundingClientRect();
      if (bounds.top < 80 || bounds.bottom > window.innerHeight) {
        card.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
      }
    }, 720);
  };

  return (
    <div className="priority-grid" id="priority-track" ref={trackRef}>
      {PRIORITIES.map(({ id, image, number, title, description, icon }, index) => {
        const isActive = id === activeId;
        return (
          // eslint-disable-next-line jsx-a11y/role-supports-aria-props -- la carte se déplie au clic.
          <article
            key={id}
            className={`priority-card${isActive ? " priority-card--active" : ""}`}
            id={id}
            style={{ "--priority-image": `url('${image}')` }}
            tabIndex={0}
            aria-expanded={isActive}
            onClick={(event) => {
              if (!event.target.closest("a")) activate(event.currentTarget, id, index);
            }}
            onKeyDown={(event) => {
              if ((event.key === "Enter" || event.key === " ") && event.target === event.currentTarget) {
                event.preventDefault();
                activate(event.currentTarget, id, index);
              }
            }}
          >
            <div className="priority-topline">
              <span className="priority-number">{t(number)}</span>
              <span className="priority-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">{icon}</svg>
              </span>
            </div>
            <div className="priority-copy">
              <h3>{t(title)}</h3>
              <p>{t(description)}</p>
              <div className="priority-actions">
                <a className="priority-action priority-action--light" href="#axes">
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
  );
}
