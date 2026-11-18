"use client";

import Link from "next/link";
import PageFooter from "@/components/layout/PageFooter";
import PageHeader from "@/components/layout/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ArticlesContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader cover="/assets/images/articles/rencontre-officielle.webp">
        <span className="eyebrow">{t("Comprendre les enjeux")}</span>
        <h1>{t("Articles & dossiers")}</h1>
        <p>{t("Des repères thématiques tirés du plan stratégique de SEA Foundation 2024–2028.")}</p>
      </PageHeader>
      <main className="site-page-main">
        <div className="page-content">
          <div className="page-notice">
            {t(
              "Les textes ci-dessous sont des synthèses thématiques du plan stratégique, et non des témoignages ni des articles d’actualité datés.",
            )}
          </div>
          <section className="page-card-grid">
            <article
              className="page-card page-card--photo"
              style={{
                "--project-card-image": "url('/assets/images/actions/sante-vaccination.jpg')",
              }}
            >
              <span>{t("Dossier · Santé et bien-être")}</span>
              <h2>{t("Rapprocher les jeunes des soins et de la prévention")}</h2>
              <p>
                {t(
                  "Le plan place la santé des jeunes au centre de son action. Il prévoit de soutenir l’accès aux soins primaires, la nutrition et la prévention, en tenant compte des vulnérabilités et des réalités des milieux de vie.",
                )}
              </p>
            </article>
            <article
              className="page-card page-card--photo"
              style={{
                "--project-card-image": "url('/assets/images/accueil/hero-equipe-sea.jpg')",
              }}
            >
              <span>{t("Dossier · Éducation & sport")}</span>
              <h2>{t("Faire de l’apprentissage un tremplin")}</h2>
              <p>
                {t(
                  "La formation, les bourses, le renforcement des capacités des éducateurs et le sport scolaire doivent contribuer à l’autonomie, au bien-être et à la préparation des jeunes à la vie professionnelle.",
                )}
              </p>
            </article>
            <article
              className="page-card page-card--photo"
              style={{
                "--project-card-image": "url('/assets/images/projet/elevage-agropastoral.webp')",
              }}
            >
              <span>{t("Dossier · Entrepreneuriat")}</span>
              <h2>{t("Soutenir les initiatives économiques des jeunes")}</h2>
              <p>
                {t(
                  "La Fondation souhaite développer l’incubation et l’insertion socioprofessionnelle, en particulier dans l’agrobusiness, et soutenir des initiatives innovantes dans plusieurs secteurs porteurs.",
                )}
              </p>
            </article>
          </section>
          <section className="page-callout">
            <h2>{t("Consulter les axes d’intervention")}</h2>
            <p>
              {t(
                "Les objectifs et les actions prévues sont détaillés dans la rubrique dédiée au plan stratégique.",
              )}
            </p>
            <Link className="button button-light" href="/actions/">
              {t("Voir les actions")}{" "}
              <span className="arrow">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </Link>
          </section>
        </div>
      </main>
      <PageFooter links={["/actualites/", "/documents/"]} />
    </>
  );
}
