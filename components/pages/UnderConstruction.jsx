"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import LogoWatermark from "@/components/ui/LogoWatermark";
import { LOGO_COLOR } from "@/lib/site";

// Page provisoire affichée sur toutes les pages sauf l'accueil.
export default function UnderConstruction() {
  const { t } = useLanguage();
  return (
    <main className="construction">
      <LogoWatermark />
      <div className="construction__inner">
        <img className="construction__logo" src={LOGO_COLOR} alt="SEA Foundation" />
        <h1 className="construction__title">{t("Page en construction")}</h1>
        <Link className="construction__back" href="/">
          {t("Retour à l’accueil")}
        </Link>
      </div>
    </main>
  );
}
