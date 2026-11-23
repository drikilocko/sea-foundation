"use client";

import LogoWatermark from "@/components/ui/LogoWatermark";
import PageToc from "@/components/layout/PageToc";
import CookieSettingsLink from "@/components/layout/CookieSettingsLink";
import PageFooter from "@/components/layout/PageFooter";
import PageHeader from "@/components/layout/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function CookiesContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader compact>
        <span className="eyebrow">{t("Traceurs et préférences")}</span>
        <h1>{t("Cookies")}</h1>
        <p>{t("Informations sur les cookies utilisés par le site de SEA Foundation.")}</p>
      </PageHeader>
      <main className="site-page-main">
        <div className="page-content legal-document has-toc">
          <LogoWatermark />
          <PageToc />
          <section>
            <h2>{t("Fonctionnement actuel du site")}</h2>
            <p>
              {t(
                "Le site enregistre votre choix de consentement dans le stockage local du navigateur afin de ne pas réafficher le bandeau à chaque visite. Aucun outil publicitaire ni outil de mesure d’audience n’est actuellement activé. Ce stockage strictement nécessaire au maintien de votre choix ne peut pas être désactivé.",
              )}
            </p>
          </section>
          <section>
            <h2>{t("Services externes")}</h2>
            <p>
              {t(
                "Les polices de caractères sont chargées depuis Google Fonts. Le chargement de cette ressource implique une requête vers un service tiers, qui peut traiter des données techniques de connexion selon ses propres règles. Pour en savoir plus, consultez la",
              )}{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("politique de confidentialité de Google")}
              </a>
              .
            </p>
          </section>
          <section>
            <h2>{t("Contrôler les cookies")}</h2>
            <p>
              {t(
                "Vous pouvez modifier votre choix à tout moment depuis les paramètres de votre navigateur ou en rouvrant les préférences ci-dessous. Le comportement des services externes et de l’hébergeur peut évoluer indépendamment du code du site.",
              )}
            </p>
            <CookieSettingsLink className="button cookie-settings-link">
              {t("Gérer mes préférences")}
            </CookieSettingsLink>
          </section>
          <section>
            <h2>{t("Évolution")}</h2>
            <p>
              {t(
                "Si des cookies ou traceurs facultatifs sont ajoutés, cette page sera actualisée et votre consentement sera demandé avant leur activation.",
              )}
            </p>
          </section>
        </div>
      </main>
      <PageFooter links={["/", "/contact/"]} />
    </>
  );
}
