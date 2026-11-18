"use client";

import PartnerTrack from "@/components/home/PartnerTrack";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function PartnersSection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="partners" id="partenaires">
        <div className="wrap">
          <div className="partners-top">
            <div>
              <span className="eyebrow">{t("Partenariats envisagés")}</span>
              <h2 className="section-heading">{t("Avancer avec les forces du territoire.")}</h2>
            </div>
          </div>
          <div className="partner-slider">
            <PartnerTrack />
          </div>
          <p className="partners-caption">
            {t(
              "Les logos proviennent des ressources du site. Leur présence ici n’affirme pas l’existence d’un partenariat en cours avec SEA Foundation.",
            )}
          </p>
        </div>
      </section>
    </>
  );
}
