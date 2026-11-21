import HomePage from "@/components/home/HomePage";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";

const page = {
  path: "/",
  title: "SEA Foundation | Fondation Sheyi Emmanuel Adebayor au Togo",
  description:
    "SEA Foundation agit pour une jeunesse togolaise en bonne santé, qui entreprend et participe activement au développement du Togo.",
  image: "/assets/images/accueil/hero-tournoi-accueil-joueurs.webp",
};

export const metadata = buildMetadata(page);
export const viewport = { themeColor: "#f7f6f1" };

export default function Page() {
  return (
    <>
      <JsonLd data={organizationJsonLd(page)} />
      <HomePage />
    </>
  );
}
