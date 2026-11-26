"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import NewsVideoStory from "@/components/news/NewsVideoStory";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { prefersReducedMotion } from "@/lib/scrollEffects";

const DEKAWOWO_VALUES = ["Sport", "Cohésion", "Inclusion", "Opportunités"];
const DEKAWOWO_APOTHEOSE = {
  src: "/assets/images/actualites/dekawowo-apotheose.jpg",
  alt: "Emmanuel Adebayor sur le terrain, en maillot du Dékawowo Sportfest.",
  caption: "Tournoi Dékawowo : l’apothéose.",
};

// Textes tirés du contenu des vidéos : légendes de publication, textes à l’écran et paroles.
export const NEWS_VIDEOS = [
  {
    id: "mission-ambassade",
    tags: ["Ambassade", "SEA Foundation"],
    title: "Une mission d’ambassade acceptée avec fierté",
    text: "« C’est avec une immense fierté et beaucoup d’honneur que j’accepte cette mission d’ambassade. »",
    paragraphs: [
      "« J’ai porté le maillot du Togo avec toute la fierté que vous pouvez imaginer. […] Cette signature marque une étape que nous attendions. Elle ouvre une nouvelle occasion de faire connaître notre beau pays. »",
      "« Je pense surtout à notre jeunesse, à celles et ceux qui ont des idées, du courage. […] Je veux qu’ils puissent voir dans cette étape une raison de croire en leur avenir, ici, dans ce pays. Vive le Togo ! »",
      "La cérémonie s’est tenue dans le cadre de la 21ᵉ Foire internationale de Lomé, du 27 novembre au 13 décembre 2026, placée sous le thème « Lomé, hub du commerce et des investissements en Afrique ».",
    ],
    highlights: [
      "L’accueil en musique et en danses traditionnelles.",
      "La signature officielle de la mission d’ambassade.",
      "Un maillot dédicacé remis en souvenir.",
    ],
    images: [
      {
        src: "/assets/images/actualites/ambassade-poignee-de-main.jpg",
        alt: "Poignée de main lors de la signature de la mission d’ambassade.",
        caption: "Signature de la mission d’ambassade.",
      },
    ],
  },
  {
    id: "dekawowo-conference-presse",
    tags: ["Conférence de presse", "Dekawowo Sports Fest"],
    title: "Dékawowo Sportfest : retour sur la conférence de presse",
    text: "Des échanges constructifs et des perspectives pour la jeunesse : retour sur la conférence de presse de lancement du Dékawowo Sportfest, organisée par la Fondation SEA et la Coopération allemande au Togo.",
    paragraphs: [
      "Placée sous le thème « Le sport comme levier d’inclusion et d’opportunités au service de la jeunesse », la rencontre a réuni les partenaires, les médias et des jeunes autour du projet.",
      "Elle a présenté l’édition 2026 du tournoi, organisée les 14, 16, 17 et 18 octobre 2026 à l’Université de Lomé, avec une entrée gratuite.",
    ],
    values: DEKAWOWO_VALUES,
    highlightsLabel: "Au programme",
    highlights: [
      "Mots de bienvenue, présentation du tournoi et des partenaires.",
      "Allocutions officielles et échanges avec les médias.",
      "Panel d’échange avec les jeunes.",
    ],
    images: [
      {
        src: "/assets/images/actualites/dekawowo-lancement-cooperation-allemande.jpg",
        alt: "Les équipes de la Fondation SEA et de la Coopération allemande réunies lors de la conférence de presse du Dekawowo Sports Fest.",
        caption: "Fondation SEA & Coopération allemande : le sport comme levier de cohésion et d’opportunités pour la jeunesse.",
      },
      {
        src: "/assets/images/actualites/dekawowo-conference-presse.jpg",
        alt: "Les intervenants de la conférence de presse du Dékawowo Sportfest.",
        caption: "Les intervenants de la conférence de presse.",
      },
    ],
  },
  {
    id: "dekawowo-sports-fest",
    tags: ["Sport", "Dekawowo Sports Fest"],
    title: "Dekawowo Sports Fest : une première édition réussie",
    text: "C’est avec beaucoup de joie et de fierté que la Fondation SEA revient sur la première édition du Dékawowo Sportfest, tournoi de football organisé en collaboration avec la Coopération allemande au Togo.",
    paragraphs: [
      "Équipes, supporters, partenaires et officiels se sont retrouvés autour d’une même idée : faire du sport un levier pour la jeunesse togolaise.",
      "Matchs disputés, célébrations, séances d’autographes et remise du trophée aux champions : la vidéo revient sur une journée placée sous le signe du jeu et du partage.",
    ],
    values: DEKAWOWO_VALUES,
    highlights: [
      "Des matchs entre joueurs, invités et anciens professionnels, sur un terrain plein d’énergie.",
      "Des rencontres avec le public, autour d’autographes et de maillots dédicacés.",
      "La remise du trophée à l’équipe championne de cette première édition.",
    ],
    images: [DEKAWOWO_APOTHEOSE],
  },
  {
    id: "rencontre-maroc",
    tags: ["Rencontre", "CAN Maroc 2025"],
    title: "Greet and Meet avec Acıbadem au Maroc",
    text: "« Un plaisir de rencontrer le public marocain aux côtés d’une institution qui a joué un rôle essentiel dans ma vie. »",
    paragraphs: [
      "En marge de la Coupe d’Afrique des Nations de la CAF, Maroc 2025, SEA Foundation et le groupe hospitalier Acıbadem ont organisé une séance « Greet and Meet » sur le stand Acıbadem.",
      "Casquettes et ballons dédicacés, échanges avec les supporters venus de tout le continent et photos avec l’équipe : un moment de proximité avec le public.",
    ],
    highlights: [
      "Des casquettes et des ballons dédicacés pour les supporters.",
      "Des échanges avec les fans, petits et grands.",
      "Une photo de groupe avec l’équipe Acıbadem.",
    ],
  },
];

export const videoPoster = (video) => video.poster ?? `/assets/videos/${video.id}.webp`;

function ChevronIcon({ direction }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === "previous" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

// Rangée de vidéos : grille pleine largeur tant qu’il y a cinq vidéos ou moins sur ordinateur,
// rail glissable (souris, doigt, flèches latérales) dès qu’elles dépassent la largeur,
// soit à partir de la sixième sur ordinateur, et toujours sur tablette (3,5) et téléphone (1,5).
export default function NewsVideos() {
  const { t } = useLanguage();
  const { scrollToY } = useSmoothScroll();
  const railRef = useRef(null);
  const cardRefs = useRef([]);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const [storyIndex, setStoryIndex] = useState(null);
  const [edges, setEdges] = useState({ scrollable: false, atStart: true, atEnd: true });

  // Flèches visibles seulement quand la rangée dépasse ; désactivées aux extrémités.
  useEffect(() => {
    const rail = railRef.current;
    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const next = { scrollable: max > 2, atStart: rail.scrollLeft <= 2, atEnd: rail.scrollLeft >= max - 2 };
      setEdges((current) =>
        current.scrollable === next.scrollable && current.atStart === next.atStart && current.atEnd === next.atEnd
          ? current
          : next,
      );
    };
    const observer = new ResizeObserver(update);
    observer.observe(rail);
    rail.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      rail.removeEventListener("scroll", update);
    };
  }, []);

  const step = (direction) => {
    const rail = railRef.current;
    const card = cardRefs.current[0];
    const gap = parseFloat(window.getComputedStyle(rail).columnGap) || 0;
    const width = card ? card.offsetWidth + gap : rail.clientWidth * 0.8;
    rail.scrollBy({ left: direction * width, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  // Glisser à la souris (le doigt fait défiler nativement).
  const onPointerDown = (event) => {
    const rail = railRef.current;
    if (event.pointerType !== "mouse" || event.button !== 0 || rail.scrollWidth <= rail.clientWidth) return;
    dragRef.current = { x: event.clientX, left: rail.scrollLeft, moved: false, id: event.pointerId };
  };
  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag) return;
    const rail = railRef.current;
    const dx = event.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 6) {
      drag.moved = true;
      rail.setPointerCapture(drag.id);
      rail.classList.add("is-dragging");
    }
    if (drag.moved) rail.scrollLeft = drag.left - dx;
  };
  const endDrag = () => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag?.moved) return;
    suppressClickRef.current = true;
    railRef.current.classList.remove("is-dragging");
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  };

  // Avant le retour, la carte de la vidéo affichée est placée à l’écran (dans la rangée puis
  // dans la page), d’un coup et derrière le voile, pour que l’aperçu revienne exactement à sa place.
  const prepareReturn = useCallback(
    (index, topOffset) => {
      const rail = railRef.current;
      const card = cardRefs.current[index];
      if (!card) return null;
      const padding = parseFloat(window.getComputedStyle(rail).scrollPaddingLeft) || 0;
      const railBounds = rail.getBoundingClientRect();
      let bounds = card.getBoundingClientRect();
      if (bounds.left < railBounds.left || bounds.right > railBounds.right) {
        const left = rail.scrollLeft + bounds.left - railBounds.left - padding;
        rail.scrollTo({ left: Math.max(0, left), behavior: "instant" });
      }
      bounds = card.getBoundingClientRect();
      const margin = 16;
      const room = window.innerHeight - topOffset - margin * 2;
      let shift = 0;
      if (bounds.height > room || bounds.top < topOffset + margin) shift = bounds.top - topOffset - margin;
      else if (bounds.bottom > window.innerHeight - margin) shift = bounds.bottom - window.innerHeight + margin;
      if (shift) scrollToY(window.scrollY + shift, { immediate: true });
      return card;
    },
    [scrollToY],
  );

  const finishReturn = useCallback(() => setStoryIndex(null), []);

  return (
    <>
      <div className={`news-rail${edges.scrollable ? " is-scrollable" : ""}`}>
        <button
          type="button"
          className="news-rail__arrow news-rail__arrow--previous"
          aria-label={t("Vidéo précédente")}
          disabled={edges.atStart}
          onClick={() => step(-1)}
        >
          <ChevronIcon direction="previous" />
        </button>
        <div
          className="news-videos"
          ref={railRef}
          style={{ "--count": NEWS_VIDEOS.length }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={(event) => {
            if (!suppressClickRef.current) return;
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          {NEWS_VIDEOS.map((video, index) => (
            <button
              key={video.id}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              type="button"
              className="news-video"
              aria-haspopup="dialog"
              draggable={false}
              onClick={() => setStoryIndex(index)}
            >
              <img src={videoPoster(video)} alt="" loading="lazy" decoding="async" draggable={false} />
              <span className="news-video__cover">
                <span className="news-video__play" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5.5v13l10.5-6.5z" />
                  </svg>
                </span>
                <span className="news-video__copy">
                  <span className="news-feature-tags">
                    {video.tags.map((tag) => (
                      <span key={tag}>{t(tag)}</span>
                    ))}
                  </span>
                  <span className="news-video__title">{t(video.title)}</span>
                </span>
                <span className="visually-hidden">{t("Lire la vidéo")}</span>
              </span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="news-rail__arrow news-rail__arrow--next"
          aria-label={t("Vidéo suivante")}
          disabled={edges.atEnd}
          onClick={() => step(1)}
        >
          <ChevronIcon direction="next" />
        </button>
      </div>
      {storyIndex !== null && (
        <NewsVideoStory
          videos={NEWS_VIDEOS}
          initialIndex={storyIndex}
          getSourceCard={(index) => cardRefs.current[index]}
          prepareReturn={prepareReturn}
          onClosed={finishReturn}
        />
      )}
    </>
  );
}
