import EventsContent from "@/components/pages/EventsContent";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const page = {
  path: "/evenements/",
  title: "Événements — SEA Foundation",
  description: "Retrouvez les événements et les initiatives de SEA Foundation.",
  image: "/assets/images/terrain/celebration-equipe.webp",
};

export const metadata = buildMetadata(page);
export const viewport = { themeColor: "#102d50" };

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(page)} />
      <EventsContent />
    </>
  );
}
