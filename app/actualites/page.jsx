import NewsContent from "@/components/pages/NewsContent";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const page = {
  path: "/actualites/",
  title: "Actualités — SEA Foundation",
  description: "Les actualités officielles de SEA Foundation.",
  image: "/assets/images/evenements/conference-prise-de-parole.webp",
};

export const metadata = buildMetadata(page);
export const viewport = { themeColor: "#102d50" };

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(page)} />
      <NewsContent />
    </>
  );
}
