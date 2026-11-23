import { preload } from "react-dom";
import HomePage from "@/components/home/HomePage";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";
import { HERO_IMAGE } from "@/lib/site";

const page = {
  path: "/",
  title: "SEA Foundation | Fondation Sheyi Emmanuel Adebayor au Togo",
  description:
    "SEA Foundation agit pour une jeunesse togolaise en bonne santé, qui entreprend et participe activement au développement du Togo.",
  image: HERO_IMAGE,
};

export const metadata = buildMetadata(page);
export const viewport = { themeColor: "#f7f6f1" };

export default function Page() {
  // La photo du héros est en arrière-plan CSS : on la demande dès le HTML, en priorité.
  preload(HERO_IMAGE, { as: "image", fetchPriority: "high" });
  return (
    <>
      <JsonLd data={organizationJsonLd(page)} />
      <HomePage />
    </>
  );
}
