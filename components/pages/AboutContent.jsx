"use client";

import Link from "next/link";
import PageFooter from "@/components/layout/PageFooter";
import PageHeader from "@/components/layout/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AboutContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader cover="/assets/images/accueil/tournoi-salut-officiels.webp">
        <span className="eyebrow">{t("Qui sommes-nous ?")}</span>
        <h1>{t("Une fondation engagée pour la jeunesse togolaise.")}</h1>
        <p>
          {t(
            "La Fondation Sheyi Emmanuel Adebayor promeut des actions innovantes en santé, éducation et entrepreneuriat des jeunes au Togo.",
          )}
        </p>
      </PageHeader>
      <main className="site-page-main">
        <div className="page-content">
          <section className="page-callout">
            <h2>
              {t("Une jeunesse en bonne santé, qui entreprend et participe au développement.")}
            </h2>
            <p>
              {t(
                "La Fondation met la jeunesse au cœur de sa vision. De 2024 à 2028, elle entend améliorer les conditions de vie des jeunes grâce à des approches innovantes en santé, éducation et entrepreneuriat.",
              )}
            </p>
          </section>
          <section>
            <h2 className="page-section-heading">{t("Une ambition commune")}</h2>
            <p className="page-copy">
              {t(
                "À l’horizon 2028, la Fondation veut contribuer aux objectifs de développement du Togo en matière de santé, d’éducation et de création d’emplois, avec une attention particulière aux jeunes de 15 à 35 ans.",
              )}
            </p>
            <div className="page-card-grid">
              <article
                className="page-card page-card--photo"
                style={{
                  "--project-card-image":
                    "url('/assets/images/articles/rencontre-officielle.webp')",
                }}
              >
                <span>2024—2028</span>
                <h3>{t("Cinq ans d’engagement")}</h3>
                <p>
                  {t("Une vision stratégique déclinée en priorités et en axes d’intervention.")}
                </p>
              </article>
              <article
                className="page-card page-card--photo"
                style={{
                  "--project-card-image":
                    "url('/assets/images/articles/president-tournoi-tribune.webp')",
                }}
              >
                <span>{t("15–35 ans")}</span>
                <h3>{t("La jeunesse au centre")}</h3>
                <p>{t("Les jeunes sont au cœur des actions et de la vision de SEA Foundation.")}</p>
              </article>
              <article
                className="page-card page-card--photo"
                style={{
                  "--project-card-image": "url('/assets/images/accueil/mosaique-actions-terrain.webp')",
                }}
              >
                <span>{t("03 secteurs")}</span>
                <h3>{t("Santé, éducation et entrepreneuriat")}</h3>
                <p>
                  {t("Trois secteurs prioritaires pour rapprocher les opportunités des jeunes.")}
                </p>
              </article>
            </div>
          </section>
          <section>
            <h2 className="page-section-heading">{t("Pourquoi agir ?")}</h2>
            <p className="page-copy">
              {t(
                "La Fondation part d’un constat : au Togo, les jeunes font face au chômage et au sous-emploi, aux difficultés d’accès aux soins, aux addictions et aux discriminations liées au genre ou au handicap. Elle souhaite rapprocher les opportunités des jeunes, en travaillant avec les communautés et en reliant santé, éducation, sport et insertion économique.",
              )}
            </p>
          </section>
          <div className="page-link-list">
            <Link className="button" href="/actions/">
              {t("Découvrir nos actions")}{" "}
              <span className="arrow">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </Link>
            <Link className="button button-light" href="/contact/">
              {t("Nous contacter")}{" "}
              <span className="arrow">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </main>
      <PageFooter links={["/documents/", "/contact/"]} />
    </>
  );
}
