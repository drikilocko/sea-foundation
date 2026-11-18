"use client";

import { OPEN_COOKIE_SETTINGS_EVENT } from "@/components/layout/CookieConsent";

export default function CookieSettingsLink({ children, ...props }) {
  return (
    <button
      type="button"
      {...props}
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
    >
      {children}
    </button>
  );
}
