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
            <h2 className="section-heading">{t("Comprendre le plan SEA.")}</h2>
            <p className="section-lead">
              {t(
                "Les réponses ci-dessous résument les informations indiquées dans le plan stratégique 2024–2028.",
              )}
            </p>
          </div>
          <div className="faq-list">
            <details>
              <summary>{t("Quelle est la période couverte par le plan ?")}</summary>
              <div className="faq-answer">
                <p>
                  {t(
                    "Le plan stratégique de SEA Foundation couvre cinq ans, de 2024 à 2028. Le document prévoit son évaluation au terme de la troisième année puis à la fin du cycle.",
                  )}
                </p>
              </div>
            </details>
            <details>
              <summary>{t("Quels sont les secteurs prioritaires de la Fondation ?")}</summary>
              <div className="faq-answer">
                <p>
                  {t(
                    "Le document retient trois secteurs prioritaires : la santé et le bien-être, l’éducation et le sport, et l’entrepreneuriat. L’agrobusiness est notamment développé dans l’axe consacré à l’entrepreneuriat des jeunes.",
                  )}
                </p>
              </div>
            </details>
            <details>
              <summary>{t("À qui s’adressent les actions prévues ?")}</summary>
              <div className="faq-answer">
                <p>
                  {t(
                    "Le plan se concentre principalement sur les jeunes, avec une attention aux 15–35 ans et aux jeunes vulnérables. Il cite notamment les jeunes filles, les jeunes issus de milieux défavorisés et les jeunes en situation de handicap.",
                  )}
                </p>
              </div>
            </details>
            <details>
              <summary>{t("Quelles actions sont prévues pour l’éducation et le sport ?")}</summary>
              <div className="faq-answer">
                <p>
                  {t(
                    "Le plan prévoit notamment un appui en fournitures scolaires, des programmes de bourses, le renforcement des capacités des éducateurs, des matériels didactiques et des infrastructures modernes. Il vise aussi le sport en milieu scolaire et universitaire, les compétitions, les infrastructures sportives, les soft skills et les outils informatiques.",
                  )}
                </p>
              </div>
            </details>
            <details>
              <summary>{t("Comment les activités doivent-elles être suivies ?")}</summary>
              <div className="faq-answer">
                <p>
                  {t(
                    "Le document prévoit des plans de travail annuels, un suivi semestriel, des examens annuels avec les pouvoirs publics, la consultation des bénéficiaires et des rapports annuels en accès libre. Deux évaluations du plan sont prévues : au bout de la troisième année et à la fin du cycle.",
                  )}
                </p>
              </div>
            </details>
            <details>
              <summary>
                {t(
                  "La page présente-t-elle des témoignages de bénéficiaires ou des logos officiels ?",
                )}
              </summary>
              <div className="faq-answer">
                <p>
                  {t(
                    "Non. Le texte fourni ne contient pas de témoignages de bénéficiaires ni de logos de partenaires confirmés. Les citations affichées sont attribuées au plan ou au mot du président, et le carrousel présente uniquement des catégories de partenaires citées dans le document.",
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
