"use client";

import LogoWatermark from "@/components/ui/LogoWatermark";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function VisionSection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="vision-section" id="vision">
        <LogoWatermark />
        <div className="vision-heading wrap">
          <span className="eyebrow">{t("Une ambition commune")}</span>
          <h2 className="section-heading">
            {t("Croire en une jeunesse qui")} <em>{t("fait avancer le Togo.")}</em>
          </h2>
        </div>
        <div className="vision">
          <div className="vision-panel">
            <div className="vision-copy">
              <h3 className="section-heading">
                {t("Les repères de notre ambition pour la jeunesse.")}
              </h3>
              <p>
                {t(
                  "À l’horizon 2028, la Fondation veut contribuer à améliorer les conditions de vie des jeunes grâce à des approches innovantes en santé, éducation et entrepreneuriat, et soutenir les objectifs de développement du Togo en matière de santé, d’éducation et de création d’emplois.",
                )}
              </p>
            </div>
            <div className="vision-stat-grid" aria-label="Repères de notre ambition">
              <div className="vision-stat">
                <strong>2024—28</strong>
                <span>{t("Cinq années d’engagement")}</span>
              </div>
              <div className="vision-stat">
                <strong>15–35</strong>
                <span>{t("La jeunesse au centre de nos actions")}</span>
              </div>
              <div className="vision-stat">
                <strong>03</strong>
                <span>{t("Santé · éducation et sport · entrepreneuriat")}</span>
              </div>
              <div className="vision-stat">
                <strong>2028</strong>
                <span>{t("Horizon de notre vision pour la jeunesse")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
