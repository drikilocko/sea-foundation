"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import CurrentYear from "@/components/ui/CurrentYear";
import SeaLogo from "@/components/ui/SeaLogo";
import { LEGAL_LINKS, PAGE_LABELS } from "@/lib/site";

export default function PageFooter({ links = [] }) {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-inner wrap">
        <Link className="brand" href="/">
          <SeaLogo className="brand-mark" fillOn="view" />
        </Link>
        <div className="footer-links">
          {[...links, ...LEGAL_LINKS].map((href) => (
            <Link key={href} href={href}>
              {t(PAGE_LABELS[href])}
            </Link>
          ))}
        </div>
        <span className="footer-copy">
          © <CurrentYear /> SEA FOUNDATION
        </span>
      </div>
    </footer>
  );
}
