"use client";

import PageFooter from "@/components/layout/PageFooter";
import PageHeader from "@/components/layout/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function LegalNoticeContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader compact>
        <span className="eyebrow">{t("Informations légales")}</span>
        <h1>{t("Mentions légales")}</h1>
        <p>{t("Informations relatives au site de la Fondation Sheyi Emmanuel Adebayor.")}</p>
      </PageHeader>
      <main className="site-page-main">
        <div className="page-content legal-document">
          <section>
            <h2>{t("Éditeur du site")}</h2>
            <p>
              <strong>{t("Éditeur :")}</strong>{" "}
              {t("Fondation Sheyi Emmanuel Adebayor (SEA Foundation).")}
            </p>
            <p>
              <strong>{t("Adresse communiquée :")}</strong> {t("Adidogomé, Togo.")}
            </p>
            <p>
              <strong>{t("Contact :")}</strong>{" "}
              <a href="mailto:info@fondationsea.com">info@fondationsea.com</a> ·{" "}
              <a href="tel:+22870162121">+228 70 16 21 21</a>.
            </p>
            <p>
              {t(
                "Les informations d’identification juridique de l’éditeur et le nom du responsable de publication sont à confirmer par la Fondation.",
              )}
            </p>
          </section>
          <section>
            <h2>{t("Hébergement")}</h2>
            <p>
              {t(
                "Le nom et les coordonnées de l’hébergeur du site doivent être renseignés par SEA Foundation.",
              )}
            </p>
          </section>
          <section>
            <h2>{t("Propriété intellectuelle")}</h2>
            <p>
              {t(
                "Les contenus de ce site sont présentés à titre informatif. Toute réutilisation doit respecter les droits applicables et les droits des auteurs ou titulaires concernés. Les éléments appartenant à des tiers restent soumis à leurs propres conditions d’utilisation.",
              )}
            </p>
          </section>
          <section>
            <h2>{t("Contact")}</h2>
            <p>
              {t("Pour toute question concernant le site ou ces mentions, écrivez à")}{" "}
              <a href="mailto:info@fondationsea.com">info@fondationsea.com</a>.
            </p>
          </section>
        </div>
      </main>
      <PageFooter links={["/", "/contact/"]} />
    </>
  );
}
