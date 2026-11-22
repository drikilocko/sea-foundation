"use client";

import LogoWatermark from "@/components/ui/LogoWatermark";
import CountUp from "@/components/ui/CountUp";
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
                <strong className="vision-stat-range">
                  <CountUp from={2000} to={2024} />
                  <i aria-hidden="true">–</i>
                  <CountUp from={2000} to={2028} delay={350} />
                </strong>
                <span>{t("Cinq années d’engagement")}</span>
              </div>
              <div className="vision-stat">
                <strong className="vision-stat-range">
                  <CountUp to={15} delay={150} />
                  <i aria-hidden="true">–</i>
                  <CountUp to={35} delay={500} />
                </strong>
                <span>{t("La jeunesse au centre de nos actions")}</span>
              </div>
              <div className="vision-stat">
                <strong><CountUp to={3} pad={2} delay={300} /></strong>
                <span>{t("Santé · éducation et sport · entrepreneuriat")}</span>
              </div>
              <div className="vision-stat">
                <strong><CountUp from={2000} to={2028} delay={450} /></strong>
                <span>{t("Horizon de notre vision pour la jeunesse")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
