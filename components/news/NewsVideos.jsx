"use client";

import { useCallback, useRef, useState } from "react";
import NewsVideoStory from "@/components/news/NewsVideoStory";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

const DEKAWOWO_VALUES = ["Sport", "Cohésion", "Inclusion", "Opportunités"];
const DEKAWOWO_APOTHEOSE = {
  src: "/assets/images/actualites/dekawowo-apotheose.jpg",
  alt: "Emmanuel Adebayor sur le terrain, en maillot du Dékawowo Sportfest.",
  caption: "Tournoi Dékawowo : l’apothéose.",
};

// Textes tirés du contenu des vidéos : légendes de publication, textes à l’écran et paroles.
export const NEWS_VIDEOS = [
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
    id: "dekawowo-retour-en-images",
    tags: ["Retour en images", "Dekawowo Sports Fest"],
    title: "Du sport, du partage et des opportunités",
    text: "Retour en images sur la première édition du Dékawowo Sportfest : le coup d’envoi donné par les officiels, les matchs sur le terrain, l’ambiance au bord du terrain et le sacre des champions.",
    paragraphs: [
      "Le tournoi a pu compter sur le soutien de ses partenaires, présents tout au long de la journée aux côtés des joueurs et du public.",
    ],
    values: DEKAWOWO_VALUES,
    highlights: [
      "Le coup d’envoi officiel et la présentation des équipes.",
      "Des rencontres disputées devant un public nombreux.",
      "La photo des champions du Dékawowo Sportfest.",
    ],
    images: [DEKAWOWO_APOTHEOSE],
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

export default function NewsVideos() {
  const { t } = useLanguage();
  const { scrollToY } = useSmoothScroll();
  const railRef = useRef(null);
  const cardRefs = useRef([]);
  const [storyIndex, setStoryIndex] = useState(null);

  // Avant le retour, la carte de la vidéo affichée est ramenée à l’écran (rail horizontal
  // sur mobile, page verticale), pour que l’aperçu revienne exactement à sa place.
  const prepareReturn = useCallback(
    (index, topOffset) => {
      const rail = railRef.current;
      const card = cardRefs.current[index];
      if (!card) return null;
      const railBounds = rail.getBoundingClientRect();
      let bounds = card.getBoundingClientRect();
      if (bounds.left < railBounds.left) rail.scrollLeft -= railBounds.left - bounds.left + 14;
      else if (bounds.right > railBounds.right) rail.scrollLeft += bounds.right - railBounds.right + 14;
      bounds = card.getBoundingClientRect();
      if (bounds.top < topOffset || bounds.bottom > window.innerHeight) {
        scrollToY(window.scrollY + bounds.top - topOffset - 16, { immediate: true });
      }
      return card;
    },
    [scrollToY],
  );

  const finishReturn = useCallback(() => setStoryIndex(null), []);

  return (
    <>
      <div className="news-videos" ref={railRef}>
        {NEWS_VIDEOS.map((video, index) => (
          <button
            key={video.id}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            type="button"
            className="news-video"
            aria-haspopup="dialog"
            onClick={() => setStoryIndex(index)}
          >
            <img
              src={videoPoster(video)}
              alt=""
              loading="lazy"
              decoding="async"
              style={video.posterPosition ? { objectPosition: video.posterPosition } : undefined}
            />
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
