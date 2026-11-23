"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function FaqSection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="faq wrap" id="faq">
        <div className="faq-grid">
          <div className="faq-intro">
            <span className="eyebrow">{t("Questions fréquentes")}</span>
            <h2 className="section-heading">{t("Comprendre l’action de SEA.")}</h2>
            <p className="section-lead">
              {t(
                "Les réponses ci-dessous résument les grandes orientations de la Fondation pour 2024–2028.",
              )}
            </p>
          </div>
          <div className="faq-list">
            <details name="faq">
              <summary>{t("Sur quelle période la Fondation s’engage-t-elle ?")}</summary>
              <div className="faq-answer">
                <p>
                  {t(
                    "SEA Foundation s’engage sur cinq ans, de 2024 à 2028. Une évaluation est prévue au terme de la troisième année puis à la fin du cycle.",
                  )}
                </p>
              </div>
            </details>
            <details name="faq">
              <summary>{t("Quels sont les secteurs prioritaires de la Fondation ?")}</summary>
              <div className="faq-answer">
                <p>
                  {t(
                    "La Fondation retient trois secteurs prioritaires : la santé et le bien-être, l’éducation et le sport, et l’entrepreneuriat. L’agrobusiness est notamment développé dans l’axe consacré à l’entrepreneuriat des jeunes.",
                  )}
                </p>
              </div>
            </details>
            <details name="faq">
              <summary>{t("À qui s’adressent les actions prévues ?")}</summary>
              <div className="faq-answer">
                <p>
                  {t(
                    "La Fondation s’adresse principalement aux jeunes, avec une attention aux 15–35 ans et aux jeunes vulnérables, notamment les jeunes filles, les jeunes issus de milieux défavorisés et les jeunes en situation de handicap.",
                  )}
                </p>
              </div>
            </details>
            <details name="faq">
              <summary>{t("Quelles actions sont prévues pour l’éducation et le sport ?")}</summary>
              <div className="faq-answer">
                <p>
                  {t(
                    "La Fondation prévoit notamment un appui en fournitures scolaires, des programmes de bourses, le renforcement des capacités des éducateurs, des matériels didactiques et des infrastructures modernes. Elle vise aussi le sport en milieu scolaire et universitaire, les compétitions, les infrastructures sportives, les soft skills et les outils informatiques.",
                  )}
                </p>
              </div>
            </details>
            <details name="faq">
              <summary>{t("Comment les activités doivent-elles être suivies ?")}</summary>
              <div className="faq-answer">
                <p>
                  {t(
                    "La Fondation prévoit des programmes de travail annuels, un suivi semestriel, des examens annuels avec les pouvoirs publics, la consultation des bénéficiaires et des rapports annuels en accès libre. Deux évaluations sont prévues : au bout de la troisième année et à la fin du cycle.",
                  )}
                </p>
              </div>
            </details>
            <details name="faq">
              <summary>
                {t(
                  "Comment soutenir la Fondation ou devenir partenaire ?",
                )}
              </summary>
              <div className="faq-answer">
                <p>
                  {t(
                    "Institutions, entreprises, organisations et communautés peuvent proposer un partenariat, soutenir une action ou participer aux activités en écrivant à info@fondationsea.org. La Fondation privilégie les partenariats avec les acteurs du territoire pour rapprocher les opportunités des jeunes.",
                  )}
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
