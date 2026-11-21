"use client";

import PageFooter from "@/components/layout/PageFooter";
import PageHeader from "@/components/layout/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ContactContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader cover="/assets/images/contact/jeune-crepuscule.jpg">
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
          <section
            className="page-callout page-callout--photo contact-callout"
            style={{
              "--callout-image": "url('/assets/images/evenements/conference-prise-de-parole.webp')",
            }}
          >
            <span className="contact-callout__eyebrow">Restons en contact</span>
            <h2>{t("Contactez SEA Foundation")}</h2>
            <p>
              {t(
                "Pour toute demande d’information, de partenariat ou de participation aux actions, vous pouvez joindre la Fondation par courriel ou par téléphone.",
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
                <a href="mailto:info@fondationsea.com">info@fondationsea.com</a>
              </p>
              <a className="about-link" href="mailto:info@fondationsea.com">
                {t("Envoyer un courriel")}{" "}
                <span className="arrow">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </a>
            </article>
            <article className="page-card contact-method-card">
              <span className="contact-method-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7.1 3.8 4.5 5.2c-.8.5-.9 1.5-.7 2.4 1.4 5.8 5.9 10.3 11.7 11.7.9.2 1.9.1 2.4-.7l1.4-2.6-4.1-2.7-1.6 1.9a14.5 14.5 0 0 1-4.6-4.6l1.9-1.6-2.7-4.1Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>{" "}
              <span>{t("Téléphone")}</span>
              <h2>{t("Appelez-nous")}</h2>
              <p>
                <a href="tel:+22870162121">+228 70 16 21 21</a>
              </p>
              <a className="about-link" href="tel:+22870162121">
                {t("Appeler la Fondation")}{" "}
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
                  "url('/assets/images/accueil/portrait-president.webp')",
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
