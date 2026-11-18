"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { englishCopy } from "@/content/en";

const STORAGE_KEY = "sea-foundation-language";
const frenchCopy = new Map(Object.entries(englishCopy).map(([fr, en]) => [en, fr]));

const listeners = new Set();
let memoryLanguage = null;

function readLanguage() {
  if (memoryLanguage) return memoryLanguage;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "fr";
  } catch (error) {
    console.error("Impossible de lire la langue enregistrée:", error);
    return "fr";
  }
}

function writeLanguage(language) {
  memoryLanguage = language;
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch (error) {
    console.error("Impossible d’enregistrer la langue choisie:", error);
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const LanguageContext = createContext({
  language: "fr",
  t: (text) => text,
  toggleLanguage: () => {},
});

const translateHeadText = (text, language) =>
  language === "en" ? (englishCopy[text] ?? text) : (frenchCopy.get(text) ?? text);

export function LanguageProvider({ children }) {
  const language = useSyncExternalStore(subscribe, readLanguage, () => "fr");

  useEffect(() => {
    document.documentElement.lang = language;

    const updateHead = () => {
      const title = translateHeadText(document.title, language);
      if (title !== document.title) document.title = title;
      const description = document.querySelector('meta[name="description"]');
      if (description) {
        const content = translateHeadText(description.content, language);
        if (content !== description.content) description.content = content;
      }
    };

    updateHead();
    const observer = new MutationObserver(updateHead);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [language]);

  const toggleLanguage = useCallback(() => {
    writeLanguage(readLanguage() === "fr" ? "en" : "fr");
  }, []);

  const t = useCallback(
    (text) => (language === "en" ? (englishCopy[text] ?? text) : text),
    [language],
  );

  const value = useMemo(() => ({ language, t, toggleLanguage }), [language, t, toggleLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
