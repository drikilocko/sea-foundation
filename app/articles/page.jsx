import ArticlesContent from "@/components/pages/ArticlesContent";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const page = {
  path: "/articles/",
  title: "Articles — SEA Foundation",
  description: "Dossiers thématiques inspirés du plan stratégique 2024–2028 de SEA Foundation.",
  image: "/assets/images/articles/rencontre-officielle.webp",
};

export const metadata = buildMetadata(page);
export const viewport = { themeColor: "#102d50" };

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(page)} />
      <ArticlesContent />
    </>
  );
}
