"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import SeaLogo from "@/components/ui/SeaLogo";

export default function NotFoundContent() {
  const { t } = useLanguage();

  return (
    <div className="not-found-page">
      <main className="not-found">
        <SeaLogo label="SEA Foundation" />
        <h1>404</h1>
        <p>{t("Cette page n’existe pas ou a été déplacée.")}</p>
        <Link className="button button-light" href="/">
          {t("Retour à l’accueil")}{" "}
          <span className="arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </span>
        </Link>
      </main>
    </div>
  );
}
