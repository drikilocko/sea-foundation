import UnderConstruction from "@/components/pages/UnderConstruction";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const page = {
  path: "/projet/",
  title: "Projet agrobusiness — SEA Foundation",
  description:
    "Découvrez le projet d’incubation de SEA Foundation pour l’insertion socioprofessionnelle des jeunes dans l’agrobusiness au Togo.",
  image: "/assets/images/terrain/echange-officiels-tente.webp",
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
