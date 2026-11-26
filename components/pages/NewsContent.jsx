"use client";

import LogoWatermark from "@/components/ui/LogoWatermark";
import NewsVideos from "@/components/news/NewsVideos";
import PageFooter from "@/components/layout/PageFooter";
import PageHeader from "@/components/layout/PageHeader";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function NewsContent() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader>
        <span className="eyebrow">{t("La vie de la Fondation")}</span>
        <h1>{t("Actualités")}</h1>
        <p>
          {t("Retrouvez ici les communications officielles et les nouvelles de SEA Foundation.")}
        </p>
      </PageHeader>
      <main className="site-page-main">
        <div className="page-content actualites-content">
          <LogoWatermark />
          <section>
            <h2 className="page-section-heading">{t("En vidéo")}</h2>
            <NewsVideos />
          </section>
        </div>
      </main>
      <PageFooter links={["/articles/", "/contact/"]} />
    </>
  );
}
