import AboutContent from "@/components/pages/AboutContent";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const page = {
  path: "/a-propos/",
  title: "À Propos — SEA Foundation",
  description:
    "Découvrez la Fondation Sheyi Emmanuel Adebayor, sa mission et sa vision pour la jeunesse togolaise.",
  image: "/assets/images/terrain/arrivee-officiels-terrain.webp",
};

export const metadata = buildMetadata(page);
export const viewport = { themeColor: "#102d50" };

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(page)} />
      <AboutContent />
    </>
  );
}
