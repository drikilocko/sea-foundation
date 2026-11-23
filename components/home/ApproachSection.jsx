"use client";

import { useEffect, useRef } from "react";
import LogoWatermark from "@/components/ui/LogoWatermark";
import { useLanguage } from "@/components/providers/LanguageProvider";

// Photo grise ; la couleur apparait en cercle autour du curseur.
function RevealImage({ src }) {
  return (
    <span className="approach-item__media">
      <img src={src} alt="" loading="lazy" />
      <img src={src} alt="" loading="lazy" aria-hidden="true" />
    </span>
  );
}

export default function ApproachSection() {
  const { t } = useLanguage();
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;
    const cleanups = [...grid.querySelectorAll(".approach-item")].map((item) => {
      const media = item.querySelector(".approach-item__media");
      const move = (event) => {
        const rect = media.getBoundingClientRect();
        media.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        media.style.setProperty("--my", `${event.clientY - rect.top}px`);
        item.classList.add("is-revealing");
      };
      const leave = () => item.classList.remove("is-revealing");
      item.addEventListener("pointermove", move);
      item.addEventListener("pointerleave", leave);
      return () => {
        item.removeEventListener("pointermove", move);
        item.removeEventListener("pointerleave", leave);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <>
      <section className="approach-section wrap" id="engagements">
        <LogoWatermark />
        <header className="approach-hero" id="mise-en-oeuvre">
          <div className="approach-hero__copy">
            <span className="eyebrow">{t("Notre manière d’agir")}</span>
            <h2 className="section-heading">
              {t("Des actions proches des jeunes, des résultats qui comptent.")}
            </h2>
            <p>
              {t(
                "La confiance se construit sur le terrain : avec les acteurs locaux, à l’écoute des jeunes et dans la durée.",
              )}
            </p>
          </div>
        </header>
        <div className="approach-grid" ref={gridRef}>
          <article className="approach-item">
            <RevealImage src="/assets/images/accueil/tournoi-salut-officiels.webp" />
            <div className="approach-item__copy">
              <span>01</span>
              <h3>{t("Faire participer les jeunes")}</h3>
              <p>
                {t(
                  "Associer les 15–35 ans comme acteurs du changement et leur donner une place dans les décisions qui les concernent.",
                )}
              </p>
            </div>
          </article>
          <article className="approach-item">
            <RevealImage src="/assets/images/terrain/echange-officiels-tente.webp" />
            <div className="approach-item__copy">
              <span>02</span>
              <h3>{t("Renforcer les systèmes sociaux")}</h3>
              <p>
                {t(
                  "Agir auprès des individus et des communautés, notamment par la communication et la lutte contre les normes sociales préjudiciables.",
                )}
              </p>
            </div>
          </article>
          <article className="approach-item">
            <RevealImage src="/assets/images/terrain/celebration-equipe.webp" />
            <div className="approach-item__copy">
              <span>03</span>
              <h3>{t("Promouvoir l’équité et l’inclusion")}</h3>
              <p>
                {t(
                  "Accorder une attention fondamentale à l’égalité de genre et à l’inclusion des jeunes en situation de handicap.",
                )}
              </p>
            </div>
          </article>
          <article className="approach-item">
            <RevealImage src="/assets/images/evenements/conference-prise-de-parole.webp" />
            <div className="approach-item__copy">
              <span>04</span>
              <h3>{t("Communiquer sur des faits")}</h3>
              <p>
                {t(
                  "Utiliser les données pour le plaidoyer, sensibiliser et contribuer à la conception des politiques et des programmes.",
                )}
              </p>
            </div>
          </article>
          <article className="approach-item">
            <RevealImage src="/assets/images/actions/sante-vaccination.jpg" />
            <div className="approach-item__copy">
              <span>05</span>
              <h3>{t("Anticiper les risques")}</h3>
              <p>
                {t(
                  "Identifier chaque année les risques qui peuvent freiner les activités et prévoir des mesures d’atténuation.",
                )}
              </p>
            </div>
          </article>
          <article className="approach-item">
            <RevealImage src="/assets/images/actions/tournoi-remise-trophee.webp" />
            <div className="approach-item__copy">
              <span>06</span>
              <h3>{t("Rendre compte des résultats")}</h3>
              <p>
                {t(
                  "Partager les rapports annuels, consulter les bénéficiaires et utiliser les évaluations pour ajuster les actions.",
                )}
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
