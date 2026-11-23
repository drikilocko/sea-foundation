"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

const slugify = (text) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Sommaire fixe des pages longues : liste les titres de section (h2) de la page
// et surligne la section en cours de lecture.
export default function PageToc() {
  const { t, language } = useLanguage();
  const { scrollToY } = useSmoothScroll();
  const navRef = useRef(null);
  const [items, setItems] = useState([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const content = navRef.current?.closest(".page-content");
    if (!content) return undefined;
    const headings = [...content.querySelectorAll(":scope > section > h2")];
    headings.forEach((heading) => {
      if (!heading.id) heading.id = slugify(heading.textContent);
    });
    setItems(headings.map((heading) => ({ id: heading.id, label: heading.textContent })));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [language]);

  const goTo = (event, id) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    scrollToY(target.getBoundingClientRect().top + window.scrollY - 32);
    setActive(id);
  };

  return (
    <nav className="page-toc" ref={navRef} aria-label={t("Sur cette page")}>
      <p className="page-toc__title">{t("Sur cette page")}</p>
      <ol>
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              onClick={(event) => goTo(event, item.id)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
