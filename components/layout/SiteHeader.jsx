"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import LanguageToggle from "@/components/ui/LanguageToggle";
import SeaLogo from "@/components/ui/SeaLogo";
import { prefersReducedMotion, scheduleScrollEffects, subscribeToScroll } from "@/lib/scrollEffects";

const NAV_GROUPS = {
  actions: [
    { href: "/actions/", label: "Toutes nos actions" },
    { href: "/projet/", label: "Projet d’incubation agricole" },
  ],
  news: [
    { href: "/actualites/", label: "Toutes les actualités" },
    { href: "/articles/", label: "Articles" },
    { href: "/evenements/", label: "Événements" },
  ],
};

// Durée de l’agrandissement du fond, à garder égale à --menu-duration en CSS.
const MENU_DURATION = 620;
// Fondu final : le fond du menu se fond dans le fond de la barre, sans changement brusque.
const MENU_SETTLE = 340;

// En-tête unique du site : même logo, même navigation et même menu mobile sur toutes les pages.
// `anchor` désigne l’élément sous lequel la barre devient fixe (masquée en descendant,
// visible en remontant). Par défaut, c’est l’en-tête de page qui contient la barre.
export default function SiteHeader({ anchor, solid = false, overlay = false }) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const { lockScroll, unlockScroll } = useSmoothScroll();
  const slotRef = useRef(null);
  const panelRef = useRef(null);
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);
  const closeTimerRef = useRef(0);
  // closed → open (le fond s’agrandit, puis les liens apparaissent) → closing (le fond se
  // rétracte vers la barre) → settling (il se fond dans la barre) → closed
  const [menu, setMenu] = useState("closed");
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [scrollNav, setScrollNav] = useState("static");

  const isMenuOpen = menu !== "closed";

  const openMenu = useCallback(() => {
    const panel = panelRef.current;
    const rect = panel.getBoundingClientRect();
    const radius = parseFloat(window.getComputedStyle(panel).borderBottomLeftRadius) || 0;
    // Le fond part exactement du rectangle de la barre, puis s’étend vers le bas jusqu’à couvrir l’écran.
    panel.style.setProperty(
      "--menu-from",
      `inset(${Math.max(0, rect.top)}px ${window.innerWidth - rect.right}px ${window.innerHeight - rect.bottom}px ${rect.left}px round 0 0 ${radius}px ${radius}px)`,
    );
    panel.style.setProperty("--menu-top", `${Math.max(0, rect.bottom)}px`);
    panel.style.setProperty("--menu-panel-top", `${rect.top}px`);
    panel.style.setProperty("--menu-panel-left", `${rect.left}px`);
    panel.style.setProperty("--menu-panel-width", `${rect.width}px`);
    // La barre sort du flux pendant l’ouverture : son emplacement garde sa hauteur.
    slotRef.current.style.minHeight = `${panel.offsetHeight}px`;
    window.clearTimeout(closeTimerRef.current);
    setMenu("open");
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuActive(false);
    setMenu((current) => (current === "open" ? "closing" : current));
    panelRef.current
      ?.querySelectorAll(".sea-nav-group[open]")
      .forEach((group) => group.removeAttribute("open"));
  }, []);

  // Ouverture : la barre passe en mode plein écran à l’image suivante, pour que le fond
  // parte bien de sa taille d’origine avant de s’agrandir.
  useLayoutEffect(() => {
    if (menu !== "open") return undefined;
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setIsMenuActive(true)));
    return () => cancelAnimationFrame(frame);
  }, [menu]);

  useLayoutEffect(() => {
    if (menu === "closed") slotRef.current.style.minHeight = "";
  }, [menu]);

  // Fermeture : le fond se rétracte vers la barre, puis la barre reprend sa place.
  useEffect(() => {
    if (menu !== "closing") return undefined;
    closeTimerRef.current = window.setTimeout(
      () => setMenu(prefersReducedMotion() ? "closed" : "settling"),
      prefersReducedMotion() ? 0 : MENU_DURATION,
    );
    return () => window.clearTimeout(closeTimerRef.current);
  }, [menu]);

  useEffect(() => {
    if (menu !== "settling") return undefined;
    closeTimerRef.current = window.setTimeout(() => setMenu("closed"), MENU_SETTLE);
    return () => window.clearTimeout(closeTimerRef.current);
  }, [menu]);

  // Barre fixe : masquée en descendant, visible en remontant, une fois l’en-tête dépassé.
  useEffect(() => {
    const slot = slotRef.current;
    const panel = panelRef.current;
    const anchorElement =
      (anchor && document.querySelector(anchor)) || slot.closest("header") || slot;
    let previousY = window.scrollY;
    let anchorBottom = 0;
    let staticHeight = 0;

    const measure = () => {
      if (!panel.classList.contains("is-scroll-nav")) staticHeight = panel.offsetHeight;
      anchorBottom = anchorElement.getBoundingClientRect().bottom + window.scrollY;
      document.documentElement.style.setProperty("--header-panel-space", `${staticHeight}px`);
    };
    measure();

    const root = document.documentElement;
    const isStoryOpen = () => root.classList.contains("is-priority-story-open");

    const unsubscribe = subscribeToScroll(() => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;
      // Pendant une vue immersive (priorités, vidéos), la barre reste figée : le défilement
      // fait pour ramener une carte à l’écran ne doit ni la masquer ni la déplacer.
      if (isStoryOpen()) {
        previousY = currentY;
        return;
      }
      if (currentY < anchorBottom) setScrollNav("static");
      else if (delta < 0) setScrollNav("visible");
      else if (delta > 0) setScrollNav("hidden");
      previousY = currentY;
    });
    const onResize = () => {
      measure();
      scheduleScrollEffects();
    };
    // À l’ouverture d’une vue immersive, une barre masquée réapparaît et reste visible
    // jusqu’à la fin de la fermeture : elle ne glisse plus pendant l’animation de retour.
    const storyObserver = new MutationObserver(() => {
      if (isStoryOpen()) setScrollNav((state) => (state === "hidden" ? "visible" : state));
    });
    storyObserver.observe(root, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", onResize);
    scheduleScrollEffects();
    return () => {
      storyObserver.disconnect();
      unsubscribe();
      window.removeEventListener("resize", onResize);
    };
  }, [anchor]);

  // Tant que la barre est fixe, l’emplacement garde sa hauteur : la page ne saute pas.
  useLayoutEffect(() => {
    const slot = slotRef.current;
    if (scrollNav === "static") slot.style.height = "";
    else if (!slot.style.height) {
      slot.style.height = getComputedStyle(document.documentElement).getPropertyValue("--header-panel-space");
    }
  }, [scrollNav]);

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
          if (hover.matches && !group.contains(document.activeElement)) group.removeAttribute("open");
        },
        { signal },
      );
      group.addEventListener("focusin", () => hover.matches && group.setAttribute("open", ""), { signal });
      group.addEventListener(
        "focusout",
        (event) => {
          if (!hover.matches || group.contains(event.relatedTarget) || group.matches(":hover")) return;
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

  // Menu mobile : page figée, Échap pour fermer, fermeture automatique en passant sur grand écran.
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    lockScroll();
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      closeMenu();
      menuButtonRef.current?.focus();
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

  const panelClasses = [
    "sea-header-panel",
    solid && "is-solid",
    scrollNav !== "static" && "is-scroll-nav",
    scrollNav === "hidden" && "is-scroll-nav-hidden",
    isMenuOpen && "is-menu-open",
    isMenuActive && "is-menu-active",
    menu === "settling" && "is-menu-settling",
  ]
    .filter(Boolean)
    .join(" ");

  const onNavClick = (event) => {
    if (event.target instanceof Element && event.target.closest("a")) closeMenu();
  };

  const isCurrent = (href) => pathname === href;
  const isGroupCurrent = (links) => links.some(({ href }) => isCurrent(href));
  let order = 0;
  const reveal = () => ({ "--menu-i": order++ });

  return (
    <div ref={slotRef} className={`site-header-slot${overlay ? " site-header-slot--overlay" : ""}`}>
      <div ref={panelRef} className={panelClasses}>
        <span className="sea-menu-curtain" aria-hidden="true" />
        <div className="sea-topbar">
          <Link className="sea-brand-wrap" href="/" aria-label={t("Accueil")}>
            <SeaLogo className="sea-logo" label="Logo de SEA Foundation" fillOn="hover" />
          </Link>
          <button
            ref={menuButtonRef}
            className="sea-menu-toggle"
            type="button"
            aria-expanded={menu === "open"}
            aria-controls="primary-navigation"
            aria-label={t(menu === "open" ? "Fermer le menu" : "Ouvrir le menu")}
            onClick={() => (menu === "open" ? closeMenu() : openMenu())}
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
          <Link
            href="/"
            className={isCurrent("/") ? "active" : undefined}
            aria-current={isCurrent("/") ? "page" : undefined}
            style={reveal()}
          >
            {t("Accueil")}
          </Link>
          <Link
            href="/a-propos/"
            className={isCurrent("/a-propos/") ? "active" : undefined}
            aria-current={isCurrent("/a-propos/") ? "page" : undefined}
            style={reveal()}
          >
            {t("À Propos")}
          </Link>
          <details className={`sea-nav-group${isGroupCurrent(NAV_GROUPS.actions) ? " is-current" : ""}`} style={reveal()}>
            <summary>{t("Actions")}</summary>
            <div className="sea-subnav">
              {NAV_GROUPS.actions.map(({ href, label }) => (
                <Link key={href} href={href} aria-current={isCurrent(href) ? "page" : undefined}>
                  {t(label)}
                </Link>
              ))}
            </div>
          </details>
          <Link
            href="/inscription/"
            className={isCurrent("/inscription/") ? "active" : undefined}
            aria-current={isCurrent("/inscription/") ? "page" : undefined}
            style={reveal()}
          >
            {t("Inscription")}
          </Link>
          <details className={`sea-nav-group${isGroupCurrent(NAV_GROUPS.news) ? " is-current" : ""}`} style={reveal()}>
            <summary>{t("Actualités")}</summary>
            <div className="sea-subnav">
              {NAV_GROUPS.news.map(({ href, label }) => (
                <Link key={href} href={href} aria-current={isCurrent(href) ? "page" : undefined}>
                  {t(label)}
                </Link>
              ))}
            </div>
          </details>
          <Link
            className={`sea-nav-documents${isCurrent("/documents/") ? " active" : ""}`}
            href="/documents/"
            aria-current={isCurrent("/documents/") ? "page" : undefined}
            style={reveal()}
          >
            {t("Documents")}
          </Link>
          <Link
            href="/contact/"
            className={isCurrent("/contact/") ? "active" : undefined}
            aria-current={isCurrent("/contact/") ? "page" : undefined}
            style={reveal()}
          >
            {t("Contact")}
          </Link>
        </nav>
      </div>
    </div>
  );
}
