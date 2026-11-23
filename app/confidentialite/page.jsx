import UnderConstruction from "@/components/pages/UnderConstruction";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const page = {
  path: "/confidentialite/",
  title: "Confidentialité — SEA Foundation",
  description:
    "Informations sur la confidentialité et les données personnelles du site de SEA Foundation.",
  image: "/assets/images/terrain/supporters-tribune.webp",
};

export const metadata = buildMetadata(page);
export const viewport = { themeColor: "#f7f6f1" };

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(page)} />
      <UnderConstruction />
    </>
  );
}
