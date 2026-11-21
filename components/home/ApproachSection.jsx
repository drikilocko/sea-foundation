"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ApproachSection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="approach-section wrap" id="engagements">
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
        <div className="approach-grid">
          <article className="approach-item">
            <img src="/assets/images/accueil/tournoi-salut-officiels.webp" alt="" loading="lazy" />
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
            <img src="/assets/images/articles/rencontre-officielle.webp" alt="" loading="lazy" />
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
            <img src="/assets/images/accueil/fond-jeunes-football.jpg" alt="" loading="lazy" />
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
            <img src="/assets/images/contact/jeune-crepuscule.jpg" alt="" loading="lazy" style={{ objectPosition: "82% 22%" }} />
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
            <img src="/assets/images/articles/president-tournoi-tribune.webp" alt="" loading="lazy" />
            <div className="approach-item__copy">
              <span>05</span>
              <h3>{t("Anticiper les risques")}</h3>
              <p>
                {t(
                  "Identifier dans les plans annuels les risques qui peuvent freiner les activités et prévoir des mesures d’atténuation.",
                )}
              </p>
            </div>
          </article>
          <article className="approach-item">
            <img src="/assets/images/actions/tournoi-remise-trophee.webp" alt="" loading="lazy" />
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
