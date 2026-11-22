"use client";

import LogoWatermark from "@/components/ui/LogoWatermark";
import Link from "next/link";
import PageFooter from "@/components/layout/PageFooter";
import PageHeader from "@/components/layout/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function DocumentsContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader cover="/assets/images/accueil/fond-jeunes-football.jpg">
        <span className="eyebrow">{t("Ressources")}</span>
        <h1>{t("Documents de référence")}</h1>
        <p>{t("Repères et informations sur les orientations et le suivi des actions de SEA Foundation.")}</p>
      </PageHeader>
      <main className="site-page-main">
        <div className="page-content">
          <LogoWatermark />
          <section
            className="page-card page-card--photo"
            style={{
              "--project-card-image": "url('/assets/images/articles/rencontre-officielle.webp')",
            }}
          >
            <span>{t("Orientations · 2024–2028")}</span>
            <h2 className="page-section-heading">{t("Les orientations de SEA Foundation")}</h2>
            <p className="page-copy">
              {t(
                "Sur cinq ans, la Fondation précise sa vision, ses secteurs prioritaires, ses axes d’intervention et la façon dont elle suit et évalue ses actions.",
              )}
            </p>
            <div className="page-notice">
              {t(
                "Le document officiel n’est pas encore disponible en téléchargement sur ce site. Pour le recevoir, contactez directement la Fondation.",
              )}
            </div>
            <div className="page-link-list">
              <a
                className="button"
                href="mailto:info@fondationsea.com?subject=Demande%20de%20document%20SEA%20Foundation"
              >
                {t("Demander le document")}{" "}
                <span className="arrow">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </a>
              <Link className="button button-light" href="/actions/">
                {t("Consulter les axes en ligne")}{" "}
                <span className="arrow">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </Link>
            </div>
          </section>
          <section>
            <h2 className="page-section-heading">{t("Repères de mise en œuvre")}</h2>
            <div className="page-card-grid">
              <article className="page-card">
                <h3>{t("Organiser")}</h3>
                <p>{t("Organiser les actions en programmes de travail annuels.")}</p>
              </article>
              <article className="page-card">
                <h3>{t("Suivre")}</h3>
                <p>
                  {t(
                    "Organiser des examens réguliers avec les pouvoirs publics, les partenaires et les bénéficiaires.",
                  )}
                </p>
              </article>
              <article className="page-card">
                <h3>{t("Évaluer")}</h3>
                <p>{t("Évaluer les actions au terme de la troisième année puis à la fin du cycle.")}</p>
              </article>
            </div>
          </section>
        </div>
      </main>
      <PageFooter links={["/articles/", "/contact/"]} />
    </>
  );
}
