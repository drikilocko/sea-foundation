import ProjectContent from "@/components/pages/ProjectContent";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const page = {
  path: "/projet/",
  title: "Projet agrobusiness — SEA Foundation",
  description:
    "Découvrez le projet d’incubation de SEA Foundation pour l’insertion socioprofessionnelle des jeunes dans l’agrobusiness au Togo.",
  image: "/assets/images/projet/elevage-agropastoral.webp",
};

export const metadata = buildMetadata(page);
export const viewport = { themeColor: "#102d50" };

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(page)} />
      <ProjectContent />
    </>
  );
}
