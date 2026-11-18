import RegistrationContent from "@/components/pages/RegistrationContent";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const page = {
  path: "/inscription/",
  title: "Inscription — SEA Foundation",
  description:
    "Contactez SEA Foundation pour manifester votre intérêt et connaître les possibilités de participation.",
  image: "/assets/images/projet/elevage-agropastoral.webp",
};

export const metadata = buildMetadata(page);
export const viewport = { themeColor: "#102d50" };

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(page)} />
      <RegistrationContent />
    </>
  );
}
