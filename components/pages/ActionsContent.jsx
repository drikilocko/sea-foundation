"use client";

import LogoWatermark from "@/components/ui/LogoWatermark";
import Link from "next/link";
import PageFooter from "@/components/layout/PageFooter";
import PageHeader from "@/components/layout/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ActionsContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader cover="/assets/images/projet/elevage-agropastoral.webp">
        <span className="eyebrow">{t("Président de SEA Foundation")}</span>
        <h1>{t("Des priorités, des actions sur le terrain.")}</h1>
        <p>
          {t(
            "SEA Foundation organise ses interventions autour de trois secteurs prioritaires et de principes transversaux.",
          )}
        </p>
      </PageHeader>
      <main className="site-page-main">
        <div className="page-content">
          <LogoWatermark />
          <section>
            <h2 className="page-section-heading">{t("Nos priorités")}</h2>
            <div className="page-card-grid">
              <article
                className="page-card page-card--photo"
                style={{
                  "--project-card-image": "url('/assets/images/actions/sante-vaccination.jpg')",
                }}
              >
                <span>{t("01 · Santé")}</span>
                <h3>{t("Santé & bien-être")}</h3>
                <p>
                  {t(
                    "Faciliter l’accès aux soins primaires, à une alimentation nutritive et à la prévention des maladies, notamment pour les jeunes vulnérables.",
                  )}
                </p>
              </article>
              <article
                className="page-card page-card--photo"
                style={{
                  "--project-card-image": "url('/assets/images/actions/tournoi-remise-trophee.webp')",
                }}
              >
                <span>{t("02 · Éducation")}</span>
                <h3>{t("Éducation & sport")}</h3>
                <p>
                  {t(
                    "Soutenir l’apprentissage par la formation, les bourses, le renforcement des capacités des éducateurs et le sport scolaire et universitaire.",
                  )}
                </p>
              </article>
              <article
                className="page-card page-card--photo"
                style={{
                  "--project-card-image": "url('/assets/images/projet/elevage-agropastoral.webp')",
                }}
              >
                <span>{t("03 · Entrepreneuriat")}</span>
                <h3>{t("Entrepreneuriat & agrobusiness")}</h3>
                <p>
                  {t(
                    "Accompagner l’incubation, l’insertion socioprofessionnelle et les initiatives innovantes des jeunes, notamment dans les chaînes agricoles.",
                  )}
                </p>
              </article>
            </div>
          </section>
          <section>
            <h2 className="page-section-heading">{t("Une mise en œuvre inclusive")}</h2>
            <div className="page-card-grid">
              <article className="page-card">
                <h3>{t("Faire participer les jeunes")}</h3>
                <p>
                  {t(
                    "Associer les 15–35 ans comme acteurs du changement et leur donner une place dans les décisions qui les concernent.",
                  )}
                </p>
              </article>
              <article className="page-card">
                <h3>{t("Renforcer les systèmes sociaux")}</h3>
                <p>
                  {t(
                    "Agir auprès des individus et des communautés, notamment par la communication et la lutte contre les normes sociales préjudiciables.",
                  )}
                </p>
              </article>
              <article className="page-card">
                <h3>{t("Promouvoir l’équité et l’inclusion")}</h3>
                <p>
                  {t(
                    "Accorder une attention fondamentale à l’égalité de genre et à l’inclusion des jeunes en situation de handicap.",
                  )}
                </p>
              </article>
              <article className="page-card">
                <h3>{t("Communiquer sur des faits")}</h3>
                <p>
                  {t(
                    "Utiliser les données pour le plaidoyer, la sensibilisation et la conception des politiques et des programmes.",
                  )}
                </p>
              </article>
              <article className="page-card">
                <h3>{t("Anticiper les risques")}</h3>
                <p>
                  {t(
                    "Identifier chaque année les risques qui peuvent freiner les activités et prévoir des mesures d’atténuation.",
                  )}
                </p>
              </article>
              <article className="page-card">
                <h3>{t("Rendre compte des résultats")}</h3>
                <p>
                  {t(
                    "Partager les rapports annuels, consulter les bénéficiaires et utiliser les évaluations pour ajuster les actions.",
                  )}
                </p>
              </article>
            </div>
          </section>
          <section className="page-callout">
            <h2>Un projet pour entreprendre dans l’agrobusiness.</h2>
            <p>
              Découvrez le projet d’incubation de la Fondation SEA : formation, accompagnement des
              jeunes entrepreneurs agricoles et appui à la création d’activités durables.
            </p>
            <Link className="button button-light" href="/projet/">
              Découvrir le projet{" "}
              <span className="arrow">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </Link>
          </section>
          <section className="page-callout">
            <h2>{t("Suivre les actions et partager les résultats.")}</h2>
            <p>
              {t(
                "La Fondation prévoit des programmes de travail annuels, un suivi régulier avec les partenaires, la consultation des bénéficiaires et des évaluations du cycle.",
              )}
            </p>
            <Link className="button button-light" href="/documents/">
              {t("Voir les documents")}{" "}
              <span className="arrow">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </Link>
          </section>
        </div>
      </main>
      <PageFooter links={["/a-propos/", "/contact/"]} />
    </>
  );
}
