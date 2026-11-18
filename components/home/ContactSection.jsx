"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ContactSection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="contact wrap" id="contact">
        <div className="contact-panel">
          <div className="contact-copy">
            <span className="eyebrow">{t("Partenaires · Communautés · Jeunesse")}</span>
            <h2 className="section-heading">{t("Soutenez une vision portée par la jeunesse.")}</h2>
            <p className="section-lead">
              {t(
                "Le plan de SEA Foundation compte sur le soutien, l’expertise et l’engagement de ses partenaires et des parties prenantes.",
              )}
            </p>
          </div>
          <div className="contact-actions">
            <a className="button button-light" href="mailto:info@fondationsea.com">
              {t("Nous écrire")}{" "}
              <span className="arrow">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </a>
            <div className="contact-details">
              <a href="tel:+22870162121">+228 70 16 21 21</a>{" "}
              <span>{t("Adidogomé · info@fondationsea.com")}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
