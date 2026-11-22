"use client";

import LogoWatermark from "@/components/ui/LogoWatermark";
import KindnessStatement from "@/components/home/KindnessStatement";
import PriorityCards from "@/components/home/PriorityCards";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function PrioritiesSection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="priorities" id="priorites">
        <LogoWatermark />
        <div className="wrap">
          <KindnessStatement />
          <div className="priorities-top">
            <div>
              <span className="eyebrow">{t("Nos priorités 2024–2028")}</span>
              <h2 className="section-heading">
                {t("Cinq priorités pour la jeunesse togolaise.")}
              </h2>
            </div>
            <p className="section-lead">
              {t(
                "La Fondation agit dans trois secteurs prioritaires. Les cinq cartes ci-dessous présentent ces axes et leurs principaux domaines d’intervention.",
              )}
            </p>
          </div>
          <PriorityCards />
        </div>
      </section>
    </>
  );
}
