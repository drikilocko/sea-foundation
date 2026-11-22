"use client";

import LogoWatermark from "@/components/ui/LogoWatermark";
import CountUp from "@/components/ui/CountUp";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function BrandShowcaseSection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="brand-showcase" aria-label="SEA Foundation en chiffres">
        <LogoWatermark />
        <div className="brand-showcase__inner">
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
