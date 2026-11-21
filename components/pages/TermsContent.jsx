"use client";

import PageFooter from "@/components/layout/PageFooter";
import PageHeader from "@/components/layout/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function TermsContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader compact>
        <span className="eyebrow">{t("Règles d’accès au site")}</span>
        <h1>{t("Conditions d’utilisation")}</h1>
        <p>{t("Les règles de consultation des informations publiées par SEA Foundation.")}</p>
      </PageHeader>
      <main className="site-page-main">
        <div className="page-content legal-document">
          <section>
            <h2>{t("Objet du site")}</h2>
            <p>
              {t(
                "Ce site présente la Fondation Sheyi Emmanuel Adebayor, ses orientations et ses actions. Les contenus sont fournis à titre informatif et ne remplacent pas les communications officielles de la Fondation.",
              )}
            </p>
          </section>
          <section>
            <h2>{t("Accès et disponibilité")}</h2>
            <p>
              {t(
                "La Fondation s’efforce de maintenir le site accessible et les informations à jour, sans garantir une disponibilité continue ni l’absence d’erreurs. Certaines informations peuvent évoluer ou être corrigées.",
              )}
            </p>
          </section>
          <section>
            <h2>{t("Utilisation des contenus")}</h2>
            <p>
              {t(
                "Vous pouvez consulter les contenus pour votre information personnelle. Toute reproduction, diffusion ou réutilisation doit respecter les droits applicables et les éventuelles conditions attachées aux contenus appartenant à des tiers.",
              )}
            </p>
          </section>
          <section>
            <h2>{t("Liens externes")}</h2>
            <p>
              {t(
                "Le site peut renvoyer vers des services ou ressources externes. SEA Foundation ne contrôle pas leur contenu ni leurs règles de confidentialité.",
              )}
            </p>
          </section>
          <section>
            <h2>{t("Contact et mises à jour")}</h2>
            <p>
              {t("Pour toute question concernant le site, contactez la Fondation à")}{" "}
              <a href="mailto:info@fondationsea.com">info@fondationsea.com</a>
              {t(
                ". Ces conditions peuvent être actualisées lorsque le site ou ses fonctionnalités évoluent.",
              )}
            </p>
          </section>
        </div>
      </main>
      <PageFooter links={["/", "/contact/"]} />
    </>
  );
}
