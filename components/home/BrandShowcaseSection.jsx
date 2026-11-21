"use client";

import CountUp from "@/components/ui/CountUp";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function BrandShowcaseSection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="brand-showcase" aria-label="SEA Foundation en chiffres">
        <div className="brand-showcase__inner">
          <div className="brand-stats" aria-label="Repères de SEA Foundation">
            <div className="brand-stat">
              <strong aria-label={t("15–35 ans")}>
                <span aria-hidden="true">
                  <CountUp to={15} />
                  –
                  <CountUp to={35} />
                </span>
              </strong>
              <span>{t("ans au cœur de nos actions")}</span>
            </div>
            <div className="brand-stat">
              <strong aria-label={t("3 secteurs prioritaires")}>
                <CountUp to={3} aria-hidden="true" />
              </strong>
              <span>{t("secteurs prioritaires")}</span>
            </div>
            <div className="brand-stat">
              <strong aria-label={t("22 hectares")}>
                <span aria-hidden="true">
                  <CountUp to={22} /> ha
                </span>
              </strong>
              <span>{t("pour le site du projet agricole")}</span>
            </div>
            <div className="brand-stat">
              <strong aria-label={t("2024–2028, années d’engagement")}>
                <span aria-hidden="true">
                  <CountUp to={2024} />
                  –
                  <CountUp to={2028} from={2024} />
                </span>
              </strong>
              <span>{t("années d’engagement")}</span>
            </div>
          </div>
          <figure className="president-message">
            <img
              src="/assets/images/accueil/portrait-president.webp"
              alt="Emmanuel Sheyi Adebayor, président de SEA Foundation"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span className="eyebrow">{t("Le mot du président")}</span>
              <blockquote>
                {t(
                  "« Ensemble, nous pouvons bâtir un avenir meilleur pour la jeunesse togolaise. »",
                )}
              </blockquote>
              <cite>
                Emmanuel Sheyi Adebayor
                <br />
                {t("Président de SEA Foundation")}
              </cite>
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
