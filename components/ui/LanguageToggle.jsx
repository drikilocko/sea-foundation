"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const isEnglish = language === "en";

  return (
    <button
      className="site-language-toggle"
      type="button"
      data-language-toggle=""
      aria-label={isEnglish ? "Switch the site to French" : "Switch the site to English"}
      title={isEnglish ? "Français" : "English"}
      onClick={toggleLanguage}
    >
      {isEnglish ? "FR" : "EN"}
    </button>
  );
}
