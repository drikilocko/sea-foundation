"use client";

import LogoWatermark from "@/components/ui/LogoWatermark";
import PageFooter from "@/components/layout/PageFooter";
import PageHeader from "@/components/layout/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ContactContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader cover="/assets/images/contact/jeune-crepuscule.jpg" coverPosition="82% 22%">
        <span className="eyebrow">{t("Partenaires · Communautés · Jeunesse")}</span>
        <h1>{t("Échangeons autour de la jeunesse.")}</h1>
        <p>
          {t(
            "SEA Foundation compte sur le soutien, l’expertise et l’engagement de ses partenaires et des parties prenantes.",
          )}
        </p>
      </PageHeader>
      <main className="site-page-main">
        <div className="page-content contact-page-content">
          <LogoWatermark />
          <section
            className="page-callout page-callout--photo contact-callout"
            style={{
              "--callout-image": "url('/assets/images/terrain/joueurs-officiels-tente.webp')",
            }}
          >
            <span className="contact-callout__eyebrow">Restons en contact</span>
            <h2>{t("Contactez SEA Foundation")}</h2>
            <p>
              {t(
                "Pour toute demande d’information, de partenariat ou de participation aux actions, vous pouvez joindre la Fondation par courriel.",
              )}
            </p>
          </section>
          <section
            className="page-card-grid contact-method-grid"
            aria-label="Coordonnées de la Fondation"
          >
            <article className="page-card contact-method-card">
              <span className="contact-method-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3.5 6.5h17v11h-17z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m4.5 7.5 7.5 6 7.5-6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>{" "}
              <span>{t("Courriel")}</span>
              <h2>{t("Écrivez-nous")}</h2>
              <p>
                <a href="mailto:info@fondationsea.org">info@fondationsea.org</a>
              </p>
              <a className="about-link" href="mailto:info@fondationsea.org">
                {t("Envoyer un courriel")}{" "}
                <span className="arrow">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </a>
            </article>
            <article
              className="page-card page-card--photo contact-location-card"
              style={{
                "--project-card-image":
                  "url('/assets/images/articles/president-tournoi-tribune.webp')",
              }}
            >
              <span className="contact-method-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 10.2c0 5-7 10.3-7 10.3S5 15.2 5 10.2a7 7 0 1 1 14 0Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              </span>{" "}
              <span>{t("Localisation")}</span>
              <h2>{t("Au Togo")}</h2>
              <p>{t("Adidogomé · Togo")}</p>
              <a
                className="about-link"
                href="https://maps.google.com/?q=Adidogom%C3%A9%2C+Togo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir sur la carte{" "}
                <span className="arrow">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </a>
            </article>
          </section>
        </div>
      </main>
      <PageFooter links={["/inscription/", "/documents/"]} />
    </>
  );
}
