import UnderConstruction from "@/components/pages/UnderConstruction";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const page = {
  path: "/inscription/",
  title: "Inscription — SEA Foundation",
  description:
    "Contactez SEA Foundation pour manifester votre intérêt et connaître les possibilités de participation.",
  image: "/assets/images/articles/president-tournoi-tribune.webp",
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
