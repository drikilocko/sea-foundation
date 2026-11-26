import ChatWidget from "@/components/chat/ChatWidget";
import ClosingBackground from "@/components/home/ClosingBackground";
import HomeFooter from "@/components/home/HomeFooter";
import HomeHeader from "@/components/home/HomeHeader";
import AboutSection from "@/components/home/AboutSection";
import PrioritiesSection from "@/components/home/PrioritiesSection";
import ImpactSection from "@/components/home/ImpactSection";
import NewsSection from "@/components/home/NewsSection";
import AxesSection from "@/components/home/AxesSection";
import VisionSection from "@/components/home/VisionSection";
import ApproachSection from "@/components/home/ApproachSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PartnersSection from "@/components/home/PartnersSection";
import FaqSection from "@/components/home/FaqSection";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <HomeHeader />
      <main>
        <AboutSection />
        <PrioritiesSection />
        <ImpactSection />
        <NewsSection />
        <AxesSection />
        <VisionSection />
        <ApproachSection />
        <TestimonialsSection />
        <PartnersSection />
        <FaqSection />
        <ContactSection />
      </main>
      <HomeFooter />
      <ChatWidget />
      <ClosingBackground />
    </>
  );
}
