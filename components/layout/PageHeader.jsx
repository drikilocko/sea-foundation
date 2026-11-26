"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { PAGE_LABELS } from "@/lib/site";

// Bandeau des pages secondaires : même barre de navigation que l’accueil, puis le titre de la page.
export default function PageHeader({ cover, children, coverPosition }) {
  const { t } = useLanguage();
  const pathname = usePathname();

  return (
    <header
      className={`site-page-header${cover ? "" : " site-page-header--plain"}`}
      style={
        cover
          ? {
              "--page-cover": `url('${cover}')`,
              ...(coverPosition && { "--page-cover-position": coverPosition }),
            }
          : undefined
      }
    >
      <SiteHeader />
      <div className="site-page-intro">
        <nav className="site-page-breadcrumb" aria-label={t("Fil d’Ariane")}>
          <Link href="/">{t("Accueil")}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{t(PAGE_LABELS[pathname] ?? "")}</span>
        </nav>
        {children}
      </div>
    </header>
  );
}
