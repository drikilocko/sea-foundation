"use client";

import QuotesCarousel from "@/components/home/QuotesCarousel";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function TestimonialsSection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="testimonials wrap" id="temoignages">
        <div className="testimonials-top">
          <div>
            <span className="eyebrow">{t("Paroles & engagements")}</span>
            <h2 className="section-heading">{t("Les idées qui guident l’action.")}</h2>
          </div>
          <p className="section-note">
            {t(
              "Ces cinq phrases résument la vision et les engagements de SEA Foundation pour la jeunesse.",
            )}
          </p>
        </div>
        <QuotesCarousel>
          <article className="quote-card">
            <div>
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>
                {t(
                  "« Les jeunes togolais en bonne santé, qui entreprennent et qui participent au développement. »",
                )}
              </blockquote>
            </div>
            <footer>
              <strong>{t("La vision de SEA Foundation")}</strong>
              SEA Foundation
            </footer>
          </article>
          <article className="quote-card">
            <div>
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>
                {t("« Nous sommes convaincus que l’éducation est la clé de l’autonomie. »")}
              </blockquote>
            </div>
            <footer>
              <strong>{t("Éducation")}</strong>
              {t("Engagement de SEA Foundation")}
            </footer>
          </article>
          <article className="quote-card">
            <div>
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>
                {t(
                  "« L’agriculture est un secteur clé pour la sécurité alimentaire et le développement économique. »",
                )}
              </blockquote>
            </div>
            <footer>
              <strong>{t("Agripreneuriat")}</strong>
              {t("Engagement de SEA Foundation")}
            </footer>
          </article>
          <article className="quote-card">
            <div>
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>
                {t("« La Fondation SEA fait de la redevabilité un principe consacré. »")}
              </blockquote>
            </div>
            <footer>
              <strong>{t("Transparence")}</strong>
              {t("Engagement de SEA Foundation")}
            </footer>
          </article>
          <article className="quote-card">
            <div>
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>
                {t(
                  "« Ensemble, nous pouvons bâtir un avenir meilleur pour la jeunesse togolaise. »",
                )}
              </blockquote>
            </div>
            <footer>
              <strong>Emmanuel Sheyi Adebayor</strong>
              {t("Mot du président")}
            </footer>
          </article>
        </QuotesCarousel>
      </section>
    </>
  );
}
