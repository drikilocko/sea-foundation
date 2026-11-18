import CookiesContent from "@/components/pages/CookiesContent";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const page = {
  path: "/cookies/",
  title: "Cookies — SEA Foundation",
  description: "Informations sur les cookies et traceurs du site de SEA Foundation.",
  image: "/assets/images/accueil/hero-equipe-sea.jpg",
};

export const metadata = buildMetadata(page);
export const viewport = { themeColor: "#f7f6f1" };

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(page)} />
      <CookiesContent />
    </>
  );
}
