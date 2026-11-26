"use client";

import HeroSection from "@/components/home/HeroSection";
import SiteHeader from "@/components/layout/SiteHeader";

export default function HomeHeader() {
  return (
    <header className="topbar sea-hero-wrap">
      <div className="fixed-photo" aria-hidden="true">
        <div className="fixed-photo__img" />
      </div>
      <SiteHeader anchor="#accueil" />
      <HeroSection />
    </header>
  );
}
