"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AboutSection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="about wrap" id="fondation">
        <div className="about-grid context-panel">
          <div className="about-text">
            <span className="eyebrow">{t("Qui sommes-nous ?")}</span>
            <h2 className="section-heading">
              {t("Une fondation engagée pour la jeunesse togolaise.")}
            </h2>
            <p>
              {t("La Fondation Sheyi Emmanuel Adebayor promeut")}{" "}
              <strong>{t("l’éducation, la santé et l’entrepreneuriat des jeunes au Togo.")}</strong>{" "}
              {t(
                "Le plan s’appuie sur l’engagement de son président et porte la vision d’une jeunesse en bonne santé, entreprenante et actrice du développement.",
              )}
            </p>
            <a className="about-link" href="#vision">
              {t("Découvrir notre vision")}{" "}
              <span className="arrow">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </a>
          </div>
          <div className="context-summary" id="contexte">
            <span className="eyebrow">{t("Pourquoi agir ?")}</span>
            <h3 className="section-heading">
              {t("Le potentiel est immense. Les obstacles aussi.")}
            </h3>
            <p>
              {t(
                "Face au chômage, au sous-emploi et aux difficultés d’accès aux soins, la Fondation relie santé, éducation, sport et insertion économique.",
              )}
            </p>
          </div>
          <div className="context-facts" aria-label="Repères cités dans le plan stratégique">
            <div className="context-fact">
              <strong>{t("15–35 ans")}</strong>
              <span>{t("Tranche d’âge au cœur des actions de SEA Foundation.")}</span>
            </div>
            <div className="context-fact">
              <strong>8 095 498</strong>
              <span>
                {t("Habitants recensés au RGPH-5 de novembre 2022, selon le plan stratégique.")}
              </span>
            </div>
            <div className="context-fact">
              <strong>6,8 % / 26 %</strong>
              <span>
                {t(
                  "Chômage et sous-emploi des jeunes de 15 à 34 ans, chiffres rapportés dans le plan.",
                )}
              </span>
            </div>
            <div className="context-fact">
              <strong>53 % / 47 %</strong>
              <span>
                {t(
                  "Répartition entre zones rurales et urbaines selon les données citées dans le plan.",
                )}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
