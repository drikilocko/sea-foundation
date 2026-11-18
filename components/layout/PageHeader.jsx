"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import LanguageToggle from "@/components/ui/LanguageToggle";
import SeaLogo from "@/components/ui/SeaLogo";
import { COMPACT_NAVIGATION, MAIN_NAVIGATION, PAGE_LABELS } from "@/lib/site";

export default function PageHeader({ cover, compact = false, children }) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const { lockScroll, unlockScroll } = useSmoothScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = compact ? COMPACT_NAVIGATION : MAIN_NAVIGATION;

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    lockScroll();
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };
    const desktop = window.matchMedia("(min-width: 981px)");
    const onDesktop = (event) => event.matches && closeMenu();
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      unlockScroll();
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [isMenuOpen, closeMenu, lockScroll, unlockScroll]);

  return (
    <header
      className={`site-page-header${isMenuOpen ? " is-menu-open" : ""}`}
      style={cover ? { "--page-cover": `url('${cover}')` } : undefined}
    >
      <div className="site-page-header__inner">
        <div className="site-page-top">
          <Link className="site-page-brand" href="/" aria-label="SEA Foundation">
            <SeaLogo fillOn="hover" />
          </Link>
          <button
            className="site-page-menu-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="site-page-navigation"
            aria-label={t(isMenuOpen ? "Fermer le menu" : "Ouvrir le menu")}
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
          </button>
          <nav
            className={`site-page-nav${isMenuOpen ? " is-open" : ""}`}
            id="site-page-navigation"
            aria-label={t("Navigation principale")}
          >
            {links.map((href) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                onClick={closeMenu}
              >
                {t(PAGE_LABELS[href])}
              </Link>
            ))}
          </nav>
          <LanguageToggle />
        </div>
      </div>
      <div className="site-page-intro">{children}</div>
    </header>
  );
}
