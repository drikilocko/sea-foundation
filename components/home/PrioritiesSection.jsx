"use client";

import KindnessStatement from "@/components/home/KindnessStatement";
import PriorityCards from "@/components/home/PriorityCards";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function PrioritiesSection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="priorities" id="priorites">
        <div className="wrap">
          <KindnessStatement />
          <div className="priorities-top">
            <div>
              <span className="eyebrow">{t("Nos priorités 2024–2028")}</span>
              <h2 className="section-heading">
                {t("Cinq priorités déclinées du plan stratégique.")}
              </h2>
            </div>
            <p className="section-lead">
              {t(
                "Le plan retient trois secteurs prioritaires. Les cinq cartes ci-dessous distinguent ces axes et certains domaines d’intervention décrits dans le document.",
              )}
            </p>
          </div>
          <PriorityCards />
        </div>
      </section>
    </>
  );
}
