import UnderConstruction from "@/components/pages/UnderConstruction";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const page = {
  path: "/articles/",
  title: "Articles — SEA Foundation",
  description: "Dossiers thématiques sur la santé, l’éducation et l’entrepreneuriat des jeunes au Togo.",
  image: "/assets/images/terrain/supporters-tribune.webp",
};

export const metadata = buildMetadata(page);
export const viewport = { themeColor: "#102d50" };

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(page)} />
      <UnderConstruction />
    </>
  );
}
