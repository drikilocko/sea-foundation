import UnderConstruction from "@/components/pages/UnderConstruction";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const page = {
  path: "/contact/",
  title: "Contact — SEA Foundation",
  description: "Contacter la Fondation Sheyi Emmanuel Adebayor au Togo.",
  image: "/assets/images/contact/jeune-crepuscule.jpg",
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
