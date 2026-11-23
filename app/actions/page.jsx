import UnderConstruction from "@/components/pages/UnderConstruction";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const page = {
  path: "/actions/",
  title: "Actions — SEA Foundation",
  description:
    "Les priorités et axes d’intervention de SEA Foundation pour la jeunesse togolaise.",
  image: "/assets/images/terrain/equipes-alignees.webp",
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
