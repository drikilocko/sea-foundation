"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import LanguageToggle from "@/components/ui/LanguageToggle";
import SeaLogo from "@/components/ui/SeaLogo";
import { scheduleScrollEffects, subscribeToScroll } from "@/lib/scrollEffects";

const NAV_GROUPS = {
  actions: [
    { href: "/actions/", label: "Toutes nos actions" },
    { href: "/projet/", label: "Projet d’incubation agricole" },
  ],
  news: [
    { href: "/articles/", label: "Articles" },
    { href: "/evenements/", label: "Événements" },
  ],
};

export default function HomeHeader() {
  const { t } = useLanguage();
  const { lockScroll, unlockScroll } = useSmoothScroll();
  const panelRef = useRef(null);
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollNav, setScrollNav] = useState("static");

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    panelRef.current
      ?.querySelectorAll(".sea-nav-group[open]")
      .forEach((group) => group.removeAttribute("open"));
  }, []);

  // Barre de navigation : masquée en descendant, visible en remontant après le hero.
  useEffect(() => {
    const hero = document.getElementById("accueil");
    const wrap = panelRef.current?.closest(".sea-hero-wrap");
    if (!hero || !wrap) return undefined;

    const panelSpace = hero.getBoundingClientRect().top - wrap.getBoundingClientRect().top;
    wrap.style.setProperty("--header-panel-space", `${panelSpace}px`);
    let previousY = window.scrollY;
    let heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;

    const unsubscribe = subscribeToScroll(() => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;
      if (currentY < heroBottom) setScrollNav("static");
      else if (delta < 0) setScrollNav("visible");
      else if (delta > 0) setScrollNav("hidden");
      previousY = currentY;
    });
    const onResize = () => {
      heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
      scheduleScrollEffects();
    };
    window.addEventListener("resize", onResize);
    return () => {
      unsubscribe();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Sous-menus : ouverture au survol et au clavier sur ordinateur.
  useEffect(() => {
    const groups = [...(navRef.current?.querySelectorAll(".sea-nav-group") ?? [])];
    const hover = window.matchMedia("(min-width: 981px) and (hover: hover)");
    const controller = new AbortController();
    const { signal } = controller;

    groups.forEach((group) => {
      group.addEventListener(
        "pointerenter",
        (event) => {
          if (!hover.matches || event.pointerType === "touch") return;
          groups.forEach((other) => other !== group && other.removeAttribute("open"));
          group.setAttribute("open", "");
        },
        { signal },
      );
      group.addEventListener(
        "pointerleave",
        () => {
          if (hover.matches && !group.contains(document.activeElement)) {
            group.removeAttribute("open");
          }
        },
        { signal },
      );
      group.addEventListener(
        "focusin",
        () => hover.matches && group.setAttribute("open", ""),
        { signal },
      );
      group.addEventListener(
        "focusout",
        (event) => {
          if (!hover.matches || group.contains(event.relatedTarget) || group.matches(":hover")) {
            return;
          }
          group.removeAttribute("open");
        },
        { signal },
      );
    });
    hover.addEventListener(
      "change",
      (event) => !event.matches && groups.forEach((group) => group.removeAttribute("open")),
      { signal },
    );
    return () => controller.abort();
  }, []);

  // Menu mobile.
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    lockScroll();
    const onPointerDown = (event) => {
      if (!panelRef.current?.contains(event.target)) closeMenu();
    };
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      closeMenu();
      menuButtonRef.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 981px)");
    const onDesktop = (event) => event.matches && closeMenu();
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      unlockScroll();
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [isMenuOpen, closeMenu, lockScroll, unlockScroll]);

  const panelClasses = [
    "sea-header-panel",
    scrollNav !== "static" && "is-scroll-nav",
    scrollNav === "hidden" && "is-scroll-nav-hidden",
    isMenuOpen && "is-menu-open",
  ]
    .filter(Boolean)
    .join(" ");

  const onNavClick = (event) => {
    if (event.target instanceof Element && event.target.closest("a")) closeMenu();
  };

  return (
    <header className={`topbar sea-hero-wrap${scrollNav !== "static" ? " has-fixed-nav" : ""}`}>
      <div className="fixed-photo" aria-hidden="true">
        <div className="fixed-photo__img" />
      </div>
      <div ref={panelRef} className={panelClasses}>
        <div className="sea-topbar">
          <div className="sea-brand-wrap">
            <SeaLogo className="sea-logo" label="Logo de SEA Foundation" fillOn="hover" />
          </div>
          <button
            ref={menuButtonRef}
            className="sea-menu-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            aria-label={t(isMenuOpen ? "Fermer le menu" : "Ouvrir le menu")}
            onClick={() => (isMenuOpen ? closeMenu() : setIsMenuOpen(true))}
          >
            <span />
            <span />
          </button>
          <LanguageToggle />
        </div>

        <nav
          ref={navRef}
          className={`sea-nav${isMenuOpen ? " is-open" : ""}`}
          id="primary-navigation"
          aria-label={t("Navigation principale")}
          onClick={onNavClick}
        >
          <Link href="/" className="active" aria-current="page">
            {t("Accueil")}
          </Link>
          <Link href="/a-propos/">{t("À Propos")}</Link>
          <details className="sea-nav-group">
            <summary>{t("Actions")}</summary>
            <div className="sea-subnav">
              {NAV_GROUPS.actions.map(({ href, label }) => (
                <Link key={href} href={href}>
                  {t(label)}
                </Link>
              ))}
            </div>
          </details>
          <Link href="/inscription/">{t("Inscription")}</Link>
          <details className="sea-nav-group">
            <summary>{t("Actualités")}</summary>
            <div className="sea-subnav">
              {NAV_GROUPS.news.map(({ href, label }) => (
                <Link key={href} href={href}>
                  {t(label)}
                </Link>
              ))}
            </div>
          </details>
          <Link className="sea-nav-documents" href="/documents/">
            {t("Documents")}
          </Link>
          <Link href="/contact/">{t("Contact")}</Link>
        </nav>
      </div>

      <HeroSection />
    </header>
  );
}
