import ActionsContent from "@/components/pages/ActionsContent";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const page = {
  path: "/actions/",
  title: "Actions — SEA Foundation",
  description:
    "Les priorités et axes d’intervention du plan stratégique 2024–2028 de SEA Foundation.",
  image: "/assets/images/projet/elevage-agropastoral.webp",
};

export const metadata = buildMetadata(page);
export const viewport = { themeColor: "#102d50" };

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(page)} />
      <ActionsContent />
    </>
  );
}
