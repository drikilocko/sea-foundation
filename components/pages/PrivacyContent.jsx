"use client";

import PageFooter from "@/components/layout/PageFooter";
import PageHeader from "@/components/layout/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function PrivacyContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader compact>
        <span className="eyebrow">{t("Données personnelles")}</span>
        <h1>{t("Confidentialité")}</h1>
        <p>
          {t(
            "Comment le site traite les informations lorsque vous prenez contact avec SEA Foundation.",
          )}
        </p>
      </PageHeader>
      <main className="site-page-main">
        <div className="page-content legal-document">
          <section>
            <h2>{t("Responsable du traitement")}</h2>
            <p>
              {t(
                "La Fondation Sheyi Emmanuel Adebayor (SEA Foundation), à Adidogomé au Togo, est l’interlocuteur pour les questions relatives aux informations communiquées par l’intermédiaire du site. Vous pouvez la joindre à",
              )}{" "}
              <a href="mailto:info@fondationsea.com">info@fondationsea.com</a>.
            </p>
          </section>
          <section>
            <h2>{t("Informations recueillies")}</h2>
            <p>
              {t(
                "Le site ne propose actuellement ni compte utilisateur ni formulaire de contact. Si vous choisissez d’écrire à la Fondation ou de l’appeler, les coordonnées et le contenu que vous communiquez sont transmis par votre propre service de messagerie ou opérateur, puis utilisés pour répondre à votre demande.",
              )}
            </p>
            <p>
              {t(
                "Le site charge également les polices Google Fonts depuis les serveurs de Google. Cette requête peut transmettre des données techniques, comme l’adresse IP, à ce fournisseur selon ses propres pratiques.",
              )}
            </p>
          </section>
          <section>
            <h2>{t("Utilisation et conservation")}</h2>
            <p>
              {t(
                "Les informations fournies lors d’un échange servent à traiter et suivre la demande correspondante. La Fondation doit définir et appliquer une durée de conservation adaptée à ses obligations et aux finalités de chaque échange.",
              )}
            </p>
          </section>
          <section>
            <h2>{t("Vos demandes")}</h2>
            <p>
              {t(
                "Pour toute question ou demande concernant les informations que vous avez transmises à la Fondation, contactez-la à",
              )}{" "}
              <a href="mailto:info@fondationsea.com">info@fondationsea.com</a>
              {t(". Les modalités applicables dépendent de la législation en vigueur.")}
            </p>
          </section>
          <section>
            <h2>{t("Mise à jour")}</h2>
            <p>
              {t(
                "Cette page décrit les fonctionnalités constatées sur le site au 4 novembre 2026. Elle devra être mise à jour si de nouveaux formulaires, outils de mesure ou services tiers sont ajoutés.",
              )}
            </p>
          </section>
        </div>
      </main>
      <PageFooter links={["/", "/contact/"]} />
    </>
  );
}
