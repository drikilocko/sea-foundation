"use client";

import Link from "next/link";
import PageFooter from "@/components/layout/PageFooter";
import PageHeader from "@/components/layout/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function DocumentsContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader cover="/assets/images/documents/equipe-eleves-uniformes.jpg">
        <span className="eyebrow">{t("Ressources")}</span>
        <h1>{t("Documents de référence")}</h1>
        <p>{t("Repères et informations relatifs au plan stratégique de SEA Foundation.")}</p>
      </PageHeader>
      <main className="site-page-main">
        <div className="page-content">
          <section
            className="page-card page-card--photo"
            style={{
              "--project-card-image": "url('/assets/images/articles/rencontre-officielle.webp')",
            }}
          >
            <span>{t("Plan stratégique · 2024–2028")}</span>
            <h2 className="page-section-heading">{t("Le plan stratégique de SEA Foundation")}</h2>
            <p className="page-copy">
              {t(
                "Le plan couvre cinq ans et présente la vision de la Fondation, ses secteurs prioritaires, les axes d’intervention et les modalités de suivi et d’évaluation.",
              )}
            </p>
            <div className="page-notice">
              {t(
                "Le fichier PDF officiel n’est pas présent parmi les ressources disponibles sur ce site. Pour demander le document, contactez directement la Fondation.",
              )}
            </div>
            <div className="page-link-list">
              <a
                className="button"
                href="mailto:info@fondationsea.com?subject=Demande%20du%20plan%20strat%C3%A9gique%20SEA"
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
                <h3>{t("Planifier")}</h3>
                <p>{t("Décliner le plan quinquennal en plans de travail annuels.")}</p>
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
                <p>{t("Évaluer le plan au terme de la troisième année puis à la fin du cycle.")}</p>
              </article>
            </div>
          </section>
        </div>
      </main>
      <PageFooter links={["/articles/", "/contact/"]} />
    </>
  );
}
