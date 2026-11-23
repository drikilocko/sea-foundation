"use client";

import LogoWatermark from "@/components/ui/LogoWatermark";
import PageFooter from "@/components/layout/PageFooter";
import PageHeader from "@/components/layout/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function RegistrationContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader cover="/assets/images/articles/president-tournoi-tribune.webp">
        <span className="eyebrow">{t("S’engager avec SEA")}</span>
        <h1>{t("Votre engagement peut faire la différence.")}</h1>
        <p>
          {t(
            "Vous souhaitez participer aux actions de la Fondation ou recevoir des informations ? Écrivez-nous pour connaître les modalités disponibles.",
          )}
        </p>
      </PageHeader>
      <main className="site-page-main">
        <div className="page-content">
          <LogoWatermark />
          <section
            className="page-callout page-callout--photo"
            style={{
              "--callout-image": "url('/assets/images/accueil/fond-jeunes-football.jpg')",
            }}
          >
            <h2>{t("Manifestez votre intérêt auprès de la Fondation.")}</h2>
            <p>
              {t(
                "Cette page ne dispose pas encore d’un formulaire d’inscription ou d’un portail de compte. Pour éviter de recueillir vos données sans dispositif sécurisé, contactez directement l’équipe SEA par courriel.",
              )}
            </p>
            <a
              className="button button-light"
              href="mailto:info@fondationsea.com?subject=Demande%20d'information%20-%20Fondation%20SEA"
            >
              {t("Écrire à la Fondation")}{" "}
              <span className="arrow">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </a>
          </section>
          <section>
            <h2 className="page-section-heading">{t("Comment prendre contact ?")}</h2>
            <div className="page-card-grid">
              <article className="page-card">
                <span>01</span>
                <h3>{t("Présentez votre demande")}</h3>
                <p>
                  {t(
                    "Indiquez si votre démarche concerne la participation aux actions, un partenariat ou la réception d’informations.",
                  )}
                </p>
              </article>
              <article className="page-card">
                <span>02</span>
                <h3>{t("Échangez avec l’équipe")}</h3>
                <p>
                  {t(
                    "L’équipe pourra vous renseigner sur les possibilités et les modalités en vigueur.",
                  )}
                </p>
              </article>
              <article className="page-card">
                <span>03</span>
                <h3>{t("Suivez les informations officielles")}</h3>
                <p>
                  {t(
                    "Les communications et les informations confirmées seront publiées dans la rubrique Actualités.",
                  )}
                </p>
              </article>
            </div>
          </section>
        </div>
      </main>
      <PageFooter links={["/actions/", "/contact/"]} />
    </>
  );
}
