"use client";

import LogoWatermark from "@/components/ui/LogoWatermark";
import Link from "next/link";
import PageFooter from "@/components/layout/PageFooter";
import PageHeader from "@/components/layout/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function NewsContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader cover="/assets/images/evenements/conference-prise-de-parole.webp">
        <span className="eyebrow">{t("La vie de la Fondation")}</span>
        <h1>{t("Actualités")}</h1>
        <p>
          {t("Retrouvez ici les communications officielles et les nouvelles de SEA Foundation.")}
        </p>
      </PageHeader>
      <main className="site-page-main">
        <div className="page-content actualites-content">
          <LogoWatermark />
          <div className="page-notice">
            <strong>
              {t(
                "Les actualités institutionnelles datées seront publiées dès leur communication officielle.",
              )}
            </strong>
            <br />
            {t(
              "En attendant, découvrez quatre repères de notre action, ou consultez les",
            )}{" "}
            <Link href="/evenements/">{t("événements déjà présentés")}</Link>.
          </div>
          <section>
            <h2 className="page-section-heading">{t("À suivre chez SEA")}</h2>
            <div className="news-grid">
              <article
                className="news-card"
                style={{
                  "--news-card-image": "url('/assets/images/actions/sante-vaccination.jpg')",
                }}
              >
                <span className="news-card-index">01</span>
                <span className="news-card-label">{t("Santé & bien-être")}</span>
                <h3>{t("Rapprocher les jeunes des soins et de la prévention.")}</h3>
                <p>
                  {t(
                    "La Fondation veut renforcer l’accès aux soins primaires ainsi que la prévention et le bien-être physique et mental.",
                  )}
                </p>
                <Link href="/actions/">
                  {t("Découvrir l’axe santé")}{" "}
                  <span aria-hidden="true">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </span>
                </Link>
              </article>
              <article
                className="news-card"
                style={{ "--news-card-image": "url('/assets/images/accueil/tournoi-salut-officiels.webp')" }}
              >
                <span className="news-card-index">02</span>
                <span className="news-card-label">{t("Éducation & sport")}</span>
                <h3>{t("Faire de l’apprentissage un tremplin.")}</h3>
                <p>
                  {t(
                    "Bourses, soutien éducatif et sport scolaire contribuent à l’autonomie et à l’insertion des jeunes.",
                  )}
                </p>
                <Link href="/actions/">
                  {t("Découvrir l’axe éducation")}{" "}
                  <span aria-hidden="true">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </span>
                </Link>
              </article>
              <article
                className="news-card"
                style={{
                  "--news-card-image": "url('/assets/images/projet/elevage-agropastoral.webp')",
                }}
              >
                <span className="news-card-index">03</span>
                <span className="news-card-label">{t("Entrepreneuriat")}</span>
                <h3>{t("Accompagner les initiatives des jeunes.")}</h3>
                <p>
                  {t(
                    "Incubation, formation et accompagnement des projets doivent soutenir l’insertion économique, notamment en agrobusiness.",
                  )}
                </p>
                <Link href="/actions/">
                  {t("Découvrir l’axe entrepreneuriat")}{" "}
                  <span aria-hidden="true">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </span>
                </Link>
              </article>
              <article
                className="news-card"
                style={{
                  "--news-card-image": "url('/assets/images/articles/rencontre-officielle.webp')",
                }}
              >
                <span className="news-card-index">04</span>
                <span className="news-card-label">{t("Suivi & transparence")}</span>
                <h3>{t("Partager les résultats et apprendre du terrain.")}</h3>
                <p>
                  {t(
                    "La Fondation prévoit un suivi régulier, la consultation des bénéficiaires et des rapports annuels en accès libre.",
                  )}
                </p>
                <Link href="/documents/">
                  {t("Voir les documents")}{" "}
                  <span aria-hidden="true">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </span>
                </Link>
              </article>
            </div>
            <div className="news-more-wrap">
              <Link className="button news-more" href="/actions/">
                {t("Voir nos actions")}{" "}
                <span className="arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <PageFooter links={["/articles/", "/contact/"]} />
    </>
  );
}
