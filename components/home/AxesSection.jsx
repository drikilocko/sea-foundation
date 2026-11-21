"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AxesSection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="axes wrap" id="axes">
        <div className="axes-intro">
          <div>
            <span className="eyebrow">{t("Nos axes d’intervention")}</span>
            <h2 className="section-heading">
              {t("Des objectifs précis, des actions sur le terrain.")}
            </h2>
          </div>
          <p className="section-lead">
            {t(
              "Nos trois axes d’intervention détaillent comment les priorités deviennent des programmes, des accompagnements et des opportunités concrètes.",
            )}
          </p>
        </div>
        <div className="axes-grid">
          <article className="axis-card">
            <div className="axis-topline">
              <span>{t("Axe 01 · Santé")}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.8 8.7c0 5.4-8.8 11-8.8 11s-8.8-5.6-8.8-11a4.7 4.7 0 0 1 8.8-2.2 4.7 4.7 0 0 1 8.8 2.2Z" />
                <path d="M4.5 12h4l2-3.5 3.2 7 2-3.5h3.8" />
              </svg>
            </div>
            <h3>{t("Renforcer la résilience sanitaire des jeunes")}</h3>
            <p>
              {t(
                "Améliorer le bien-être physique et mental des jeunes de 15 à 35 ans, en particulier ceux qui sont vulnérables ou éloignés des services.",
              )}
            </p>
            <h4>{t("Les actions prévues")}</h4>
            <ul className="axis-list">
              <li>
                {t(
                  "Soutenir l’accès aux soins de santé primaires en milieu urbain comme rural, y compris pour les jeunes en situation précaire ou de crise humanitaire.",
                )}
              </li>
              <li>{t("Favoriser l’accès à une alimentation saine et nutritive.")}</li>
              <li>
                {t(
                  "Prévenir les maladies et la malnutrition, et contribuer à éviter les décès évitables, y compris ceux liés au VIH.",
                )}
              </li>
              <li>
                {t(
                  "Soutenir les familles et les communautés ; prendre en compte l’inclusion sociale, le genre et le changement climatique.",
                )}
              </li>
              <li>
                {t(
                  "Favoriser la santé physique et mentale dans un environnement propice au bien-être.",
                )}
              </li>
            </ul>
            <p className="axis-audience">
              {t(
                "Ces interventions s’inscrivent en lien avec les stratégies nationales de santé et de nutrition.",
              )}
            </p>
          </article>
          <article className="axis-card">
            <div className="axis-topline">
              <span>{t("Axe 02 · Éducation & sport")}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5.2c-2.2-1.6-5.3-2-9-1.3v14c3.7-.7 6.8-.3 9 1.3 2.2-1.6 5.3-2 9-1.3v-14c-3.7-.7-6.8-.3-9 1.3Z" />
                <path d="M12 5.2v14" />
              </svg>
            </div>
            <h3>{t("Faire de l’apprentissage un tremplin")}</h3>
            <p>
              {t(
                "Mettre l’éducation et le sport au service de l’autonomie, de la santé et de l’insertion professionnelle des jeunes.",
              )}
            </p>
            <h4>{t("Les actions prévues")}</h4>
            <ul className="axis-list">
              <li>
                {t(
                  "Renforcer la formation des jeunes issus de milieux défavorisés, y compris ceux en situation de handicap.",
                )}
              </li>
              <li>
                {t(
                  "Soutenir les élèves vulnérables ou méritants en fournitures et par des bourses, selon des critères d’excellence et de vulnérabilité.",
                )}
              </li>
              <li>
                {t(
                  "Renforcer les capacités des éducateurs et appuyer les matériels didactiques et infrastructures modernes.",
                )}
              </li>
              <li>
                {t(
                  "Développer le réseau universitaire, public et privé, et encourager les filières STEM, l’entrepreneuriat et l’agrobusiness.",
                )}
              </li>
              <li>
                {t(
                  "Soutenir le sport scolaire et universitaire, les compétitions et les infrastructures ; utiliser le football pour la sensibilisation à la santé et la promotion de l’excellence.",
                )}
              </li>
              <li>
                {t(
                  "Renforcer les compétences numériques et les savoir-être (soft skills) pour préparer les jeunes diplômés à l’emploi.",
                )}
              </li>
            </ul>
            <p className="axis-audience">
              {t(
                "Ces interventions contribuent aux objectifs d’éducation de qualité (ODD 4) et de consolidation de la paix (ODD 16).",
              )}
            </p>
          </article>
          <article className="axis-card">
            <div className="axis-topline">
              <span>{t("Axe 03 · Entrepreneuriat")}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 20v-8" />
                <path d="M12 13c-5.2 0-8-2.6-8-7 5.5 0 8 2.3 8 7Z" />
                <path d="M12 10c0-4.1 2.5-6 7-6 0 4.5-2.4 7-7 7" />
              </svg>
            </div>
            <h3>{t("Transformer les idées en activités durables")}</h3>
            <p>
              {t(
                "Faire de l’entrepreneuriat un levier d’intégration économique et sociale, et soutenir la création d’emplois décents.",
              )}
            </p>
            <h4>{t("Les actions prévues")}</h4>
            <ul className="axis-list">
              <li>
                {t(
                  "Développer l’incubation et l’insertion socioprofessionnelle des jeunes en agrobusiness.",
                )}
              </li>
              <li>
                {t(
                  "Former et informer les jeunes pour développer des activités à différents niveaux de la chaîne agricole, dont les secteurs agro-sylvo-pastoral et halieutique.",
                )}
              </li>
              <li>
                {t(
                  "Accompagner la création d’agro-entreprises et former les porteurs de projets agricoles à la levée de fonds.",
                )}
              </li>
              <li>
                {t(
                  "Renforcer la mobilisation et la gestion des fonds pour les initiatives des jeunes, en se focalisant sur les résultats et la transparence.",
                )}
              </li>
              <li>
                {t(
                  "Soutenir les initiatives innovantes des jeunes dans l’agriculture, le numérique, l’éducation et la santé.",
                )}
              </li>
              <li>
                {t(
                  "Développer des champions nationaux choisis par des processus compétitifs transparents.",
                )}
              </li>
            </ul>
            <p className="axis-audience">
              {t(
                "Cet axe contribue à l’ODD 8 (emploi décent) et à l’ODD 1 (réduction de la pauvreté), avec une attention à l’équité de genre, à l’inclusion du handicap et aux effets positifs pour l’environnement.",
              )}
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
