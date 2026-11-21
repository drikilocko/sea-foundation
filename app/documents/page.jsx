import DocumentsContent from "@/components/pages/DocumentsContent";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const page = {
  path: "/documents/",
  title: "Documents — SEA Foundation",
  description:
    "Informations et ressources relatives au plan stratégique 2024–2028 de SEA Foundation.",
  image: "/assets/images/accueil/fond-jeunes-football.jpg",
};

export const metadata = buildMetadata(page);
export const viewport = { themeColor: "#102d50" };

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(page)} />
      <DocumentsContent />
    </>
  );
}
