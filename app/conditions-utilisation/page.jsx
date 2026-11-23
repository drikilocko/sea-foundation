import TermsContent from "@/components/pages/TermsContent";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const page = {
  path: "/conditions-utilisation/",
  title: "Conditions d’utilisation — SEA Foundation",
  description: "Conditions d’utilisation du site de SEA Foundation.",
  image: "/assets/images/terrain/supporters-tribune.webp",
};

export const metadata = buildMetadata(page);
export const viewport = { themeColor: "#f7f6f1" };

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(page)} />
      <TermsContent />
    </>
  );
}
