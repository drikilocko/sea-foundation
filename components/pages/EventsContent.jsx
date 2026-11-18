"use client";

import Link from "next/link";
import PageFooter from "@/components/layout/PageFooter";
import PageHeader from "@/components/layout/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function EventsContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader cover="/assets/images/evenements/conference-prise-de-parole.webp">
        <span className="eyebrow">{t("Sur le terrain")}</span>
        <h1>{t("Événements")}</h1>
        <p>
          {t(
            "Les rencontres, ateliers et initiatives qui font vivre les engagements de SEA Foundation.",
          )}
        </p>
      </PageHeader>
      <main className="site-page-main">
        <div className="page-content">
          <div className="page-notice">
            {t(
              "Retrouvez ici les événements datés présentés par SEA Foundation. Cette sélection reprend les informations déjà publiées sur le site.",
            )}
          </div>
          <section aria-labelledby="events-heading">
            <h2 className="page-section-heading" id="events-heading">
              {t("Rencontres & initiatives")}
            </h2>
            <div className="event-grid">
              <article className="event-card">
                <img
                  src="/assets/images/a-propos/equipe-fondation-terrain.jpg"
                  alt="Équipe de la Fondation SEA réunie sur le terrain"
                  loading="lazy"
                />
                <div className="event-card__body">
                  <div className="event-card__meta">
                    <span>{t("Formation · Innov’ert")}</span>
                    <time dateTime="2026-05-04">{t("4 mai 2026")}</time>
                  </div>
                  <h2>{t("Former les jeunes aux nouvelles pratiques agricoles")}</h2>
                  <p>
                    {t(
                      "Un projet de formation pour accompagner les jeunes vers de nouvelles pratiques agricoles et des compétences connectées.",
                    )}
                  </p>
                  <Link href="/actions/">
                    {t("Découvrir les actions")}{" "}
                    <span aria-hidden="true">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </article>
              <article className="event-card">
                <img
                  src="/assets/images/evenements/atelier-agricole.jpeg"
                  alt="Jeunes mains au travail dans une activité agricole"
                  loading="lazy"
                />
                <div className="event-card__body">
                  <div className="event-card__meta">
                    <span>{t("Atelier · Innov’ert")}</span>
                    <time dateTime="2026-04-22">{t("22 avril 2026")}</time>
                  </div>
                  <h2>{t("Valoriser les huiles usagées grâce à un atelier dédié")}</h2>
                  <p>
                    {t(
                      "Un atelier Innov’ert consacré à la transformation et à la valorisation des huiles usagées.",
                    )}
                  </p>
                  <Link href="/actions/">
                    {t("Découvrir les actions")}{" "}
                    <span aria-hidden="true">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </article>
              <article className="event-card">
                <img
                  src="/assets/images/evenements/conference-prise-de-parole.webp"
                  alt="Emmanuel Adebayor s’exprimant lors d’une rencontre"
                  loading="lazy"
                />
                <div className="event-card__body">
                  <div className="event-card__meta">
                    <span>{t("Conférence · SEA Foundation")}</span>
                    <time dateTime="2026-04-01">{t("1 avril 2026")}</time>
                  </div>
                  <h2>{t("Échanger autour des enjeux de gouvernance migratoire")}</h2>
                  <p>
                    {t(
                      "Une participation aux échanges consacrés aux enjeux de gouvernance migratoire.",
                    )}
                  </p>
                  <Link href="/actualites/">
                    {t("Voir les actualités")}{" "}
                    <span aria-hidden="true">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>
      <PageFooter links={["/actualites/", "/actions/", "/contact/"]} />
    </>
  );
}
