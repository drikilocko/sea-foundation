"use client";

import CurrentYear from "@/components/ui/CurrentYear";
import Link from "next/link";
import SeaLogo from "@/components/ui/SeaLogo";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function HomeFooter() {
  const { t } = useLanguage();
  return (
    <>
      <footer className="footer">
        <div className="footer-inner wrap">
          <div className="footer-grid">
            <nav className="footer-column" aria-label="Navigation du pied de page">
              <h2>{t("Explorer")}</h2>
              <a href="#accueil">{t("Accueil")}</a>
              <a href="#fondation">{t("Qui sommes-nous ?")}</a>
              <a href="#priorites">{t("Nos priorités")}</a>
              <a href="#engagements">{t("Nos engagements")}</a>
            </nav>
            <nav className="footer-column" aria-label="Domaines d’action de la Fondation">
              <h2>{t("Nos actions")}</h2>
              <a href="#priorites">{t("Santé & bien-être")}</a>
              <a href="#priorites">{t("Éducation & sport")}</a>
              <a href="#priorites">{t("Entrepreneuriat")}</a>
              <a href="#axes">{t("Découvrir nos actions")}</a>
            </nav>
            <div className="footer-column">
              <h2>{t("Nous contacter")}</h2>
              <a href="tel:+22870162121">+228 70 16 21 21</a>{" "}
              <a href="mailto:info@fondationsea.com">info@fondationsea.com</a>{" "}
              <span>{t("Adidogomé · Togo")}</span>
            </div>
            <div className="footer-column footer-invitation">
              <h2>{t("Agir ensemble")}</h2>
              <p>
                {t(
                  "Partenaires, communautés et jeunesse : faisons avancer une vision portée par les jeunes.",
                )}
              </p>
              <a className="footer-contact-link" href="#contact">
                {t("Soutenir cette vision")}{" "}
                <span aria-hidden="true">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
          <a
            className="footer-logo"
            href="#accueil"
            aria-label="SEA Foundation — retour à l’accueil"
          >
            <SeaLogo fillOn="view" />
          </a>
          <div className="footer-bottom">
            <span>
              © <CurrentYear /> SEA FOUNDATION · Sheyi Emmanuel Adebayor
            </span>
            <nav className="footer-legal-links" aria-label={t("Informations légales")}>
              <Link href="/mentions-legales/">{t("Mentions légales")}</Link>
              <Link href="/confidentialite/">{t("Confidentialité")}</Link>
              <Link href="/cookies/">{t("Cookies")}</Link>
              <Link href="/conditions-utilisation/">{t("Conditions d’utilisation")}</Link>
              <a href="#accueil">
                {t("Retour en haut")}{" "}
                <span aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 19V5M6 11l6-6 6 6" />
                  </svg>
                </span>
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
