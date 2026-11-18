"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useHydrated } from "@/lib/useHydrated";

const STORAGE_KEY = "sea-foundation-cookie-preferences";
export const OPEN_COOKIE_SETTINGS_EVENT = "sea:open-cookie-settings";

function readSavedPreferences() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  const parsed = JSON.parse(saved);
  return parsed?.necessary === true && typeof parsed.analytics === "boolean" ? parsed : null;
}

function readInitialState() {
  if (typeof window === "undefined") return { saved: null, status: "" };
  try {
    return { saved: readSavedPreferences(), status: "" };
  } catch (error) {
    console.error("Impossible de lire les préférences de cookies:", error);
    return {
      saved: null,
      status: "Le navigateur ne permet pas de lire vos préférences enregistrées.",
    };
  }
}

export default function CookieConsent() {
  const { t } = useLanguage();
  const isHydrated = useHydrated();
  const bannerRef = useRef(null);
  const [initialState] = useState(readInitialState);
  const [isVisible, setIsVisible] = useState(!initialState.saved);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [saved, setSaved] = useState(initialState.saved);
  const [status, setStatus] = useState(initialState.status);

  useEffect(() => {
    const openSettings = () => {
      setIsVisible(true);
      setShowPreferences(true);
      setAnalytics(saved?.analytics === true);
      window.requestAnimationFrame(() => bannerRef.current?.focus({ preventScroll: true }));
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, [saved]);

  const savePreferences = (analyticsAllowed) => {
    const preferences = {
      necessary: true,
      analytics: analyticsAllowed,
      updatedAt: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      setSaved(preferences);
      setIsVisible(false);
    } catch (error) {
      console.error("Impossible d’enregistrer les préférences de cookies:", error);
      setStatus(
        "Impossible d’enregistrer votre choix. Vérifiez les paramètres de confidentialité du navigateur.",
      );
    }
  };

  if (!isHydrated) return null;

  return (
    <section
      ref={bannerRef}
      className="cookie-consent"
      aria-labelledby="cookie-consent-title"
      tabIndex={-1}
      hidden={!isVisible}
    >
      <span className="cookie-consent__eyebrow">{t("SEA FOUNDATION · CONFIDENTIALITÉ")}</span>
      <h2 id="cookie-consent-title">{t("Votre choix concernant les cookies")}</h2>
      <p>
        {t(
          "Le stockage nécessaire conserve votre choix. Aucun outil publicitaire ou de mesure d’audience n’est actuellement activé.",
        )}{" "}
        <Link href="/cookies/">{t("En savoir plus")}</Link>
      </p>
      <div className="cookie-consent__actions">
        <button type="button" onClick={() => savePreferences(false)}>
          {t("Tout refuser")}
        </button>
        <button
          type="button"
          aria-expanded={showPreferences}
          aria-controls="cookie-consent-preferences"
          onClick={() => {
            setShowPreferences((isOpen) => !isOpen);
            setAnalytics(saved?.analytics === true);
          }}
        >
          {t("Personnaliser")}
        </button>
        <button type="button" onClick={() => savePreferences(true)}>
          {t("Tout accepter")}
        </button>
      </div>
      <div
        className="cookie-consent__preferences"
        id="cookie-consent-preferences"
        hidden={!showPreferences}
      >
        <label>
          <input type="checkbox" checked disabled readOnly />{" "}
          {t("Stockage nécessaire de votre choix — toujours actif")}
        </label>
        <label>
          <input
            type="checkbox"
            checked={analytics}
            onChange={(event) => setAnalytics(event.target.checked)}
          />{" "}
          {t("Mesure d’audience — actuellement non activée")}
        </label>
        <p>
          {t(
            "Votre choix est conservé dans le stockage local de ce navigateur. Vous pourrez le modifier depuis la page Cookies.",
          )}
        </p>
        <div className="cookie-consent__actions">
          <button type="button" onClick={() => savePreferences(analytics)}>
            {t("Enregistrer mes choix")}
          </button>
        </div>
      </div>
      <p className="cookie-consent__status" role="status" aria-live="polite">
        {status ? t(status) : ""}
      </p>
    </section>
  );
}
