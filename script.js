    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const currentScript = document.currentScript;
    let lenisInstance = null;
    const scrollEffects = new Set();
    let scrollEffectsFrame = 0;
    const scheduleScrollEffects = () => {
      if (scrollEffectsFrame) return;
      scrollEffectsFrame = window.requestAnimationFrame(() => {
        scrollEffectsFrame = 0;
        scrollEffects.forEach((effect) => effect());
      });
    };
    const onScroll = (effect) => {
      scrollEffects.add(effect);
      if (scrollEffects.size === 1) {
        window.addEventListener("scroll", scheduleScrollEffects, { passive: true });
      }
    };
    const useSmoothScroll = !motionPreference.matches
      && !window.matchMedia("(pointer: coarse)").matches
      && navigator.hardwareConcurrency > 4
      && !navigator.connection?.saveData;

    if (useSmoothScroll) {
      const lenisScript = document.createElement("script");
      lenisScript.src = "https://cdn.jsdelivr.net/npm/lenis@1.3.11/dist/lenis.min.js";
      lenisScript.async = true;
      lenisScript.addEventListener("load", () => {
        if (typeof window.Lenis !== "function") {
          console.error("Lenis was loaded, but its constructor is unavailable.");
          return;
        }
        lenisInstance = new window.Lenis({
          autoRaf: true,
          duration: 0.5,
          lerp: 0.2,
          smoothWheel: true,
          syncTouch: false,
          wheelMultiplier: 1,
        });
        if (document.body.style.overflow === "hidden") lenisInstance.stop();
      });
      lenisScript.addEventListener("error", () => {
        console.error("Lenis could not be loaded; native browser scrolling remains enabled.");
      });
      document.head.append(lenisScript);
    }

    const englishCopy = new Map(Object.entries({
      "SEA Foundation — Le potentiel de la jeunesse, notre avenir": "SEA Foundation — The potential of youth is our future",
      "Actions — SEA Foundation": "Our work — SEA Foundation",
      "À Propos — SEA Foundation": "About — SEA Foundation",
      "Articles — SEA Foundation": "Articles — SEA Foundation",
      "Confidentialité — SEA Foundation": "Privacy — SEA Foundation",
      "Actualités — SEA Foundation": "News — SEA Foundation",
      "Conditions d’utilisation — SEA Foundation": "Terms of use — SEA Foundation",
      "Contact — SEA Foundation": "Contact — SEA Foundation",
      "Cookies — SEA Foundation": "Cookies — SEA Foundation",
      "Événements — SEA Foundation": "Events — SEA Foundation",
      "Inscription — SEA Foundation": "Registration — SEA Foundation",
      "Mentions légales — SEA Foundation": "Legal notice — SEA Foundation",
      "Documents — SEA Foundation": "Resources — SEA Foundation",
      "Les priorités et axes d’intervention du plan stratégique 2024–2028 de SEA Foundation.": "The priorities and areas of work in SEA Foundation's 2024–2028 strategic plan.",
      "Découvrez la Fondation Sheyi Emmanuel Adebayor, sa mission et sa vision pour la jeunesse togolaise.": "Learn about the Sheyi Emmanuel Adebayor Foundation, its mission and vision for young people in Togo.",
      "Dossiers thématiques inspirés du plan stratégique 2024–2028 de SEA Foundation.": "Feature articles based on SEA Foundation's 2024–2028 strategic plan.",
      "Informations sur la confidentialité et les données personnelles du site de SEA Foundation.": "Information about privacy and personal data on the SEA Foundation website.",
      "Les actualités officielles de SEA Foundation.": "Official news from SEA Foundation.",
      "Conditions d’utilisation du site de SEA Foundation.": "Terms of use for the SEA Foundation website.",
      "Contacter la Fondation Sheyi Emmanuel Adebayor au Togo.": "Contact the Sheyi Emmanuel Adebayor Foundation in Togo.",
      "Informations sur les cookies et traceurs du site de SEA Foundation.": "Information about cookies and trackers on the SEA Foundation website.",
      "Retrouvez les événements et les initiatives de SEA Foundation.": "Explore SEA Foundation events and initiatives.",
      "Contactez SEA Foundation pour manifester votre intérêt et connaître les possibilités de participation.": "Contact SEA Foundation to express your interest and learn how to participate.",
      "Mentions légales du site de SEA Foundation.": "Legal notice for the SEA Foundation website.",
      "Informations et ressources relatives au plan stratégique 2024–2028 de SEA Foundation.": "Information and resources about SEA Foundation's 2024–2028 strategic plan.",
      "Rejoindre": "Get involved",
      "Nous contacter": "Contact us",
      "Le mot du président": "A message from the president",
      "ans au cœur de nos actions": "year olds at the heart of our work",
      "secteurs prioritaires": "priority areas",
      "pour le site du projet agricole": "for the agricultural project site",
      "plan stratégique": "strategic plan",
      "Accueil": "Home",
      "À Propos": "About",
      "Présentation": "Overview",
      "Notre vision": "Our vision",
      "Questions fréquentes": "Frequently asked questions",
      "Actions": "Our work",
      "Toutes nos actions": "All our work",
      "Santé & bien-être": "Health & well-being",
      "Éducation & sport": "Education & sport",
      "Entrepreneuriat": "Entrepreneurship",
      "Agrobusiness": "Agribusiness",
      "Inclusion des jeunes": "Youth inclusion",
      "Inscription": "Registration",
      "Actualités": "News",
      "À la une": "Highlights",
      "Articles": "Articles",
      "Événements": "Events",
      "Documents": "Resources",
      "Contact": "Contact",
      "Des jeunes, par les jeunes, pour les jeunes.": "By young people, for young people.",
      "L’Afrique de demain": "Tomorrow's Africa",
      "commence avec nous.": "starts with us.",
      "SEA Foundation agit pour une jeunesse togolaise en bonne santé, qui entreprend et participe activement au développement du Togo.": "SEA Foundation works for healthy young people in Togo who can build businesses and actively contribute to the country's development.",
      "Votre talent a sa place.": "Your talent belongs here.",
      "Votre engagement peut faire la différence.": "Your commitment can make a difference.",
      "SEA Action": "SEA Action",
      "Votre chemin vers un changement concret.": "Your path to meaningful change.",
      "Les dernières actualités": "The latest news",
      "Formation · Innov’ert": "Training · Innov’ert",
      "Former les jeunes aux nouvelles pratiques agricoles": "Training young people in new agricultural practices",
      "Atelier · Innov’ert": "Workshop · Innov’ert",
      "Valoriser les huiles usagées grâce à un atelier dédié": "Repurposing used oils through a dedicated workshop",
      "Conférence": "Conference",
      "Échanger autour des enjeux de gouvernance migratoire": "Discussing migration governance challenges",
      "Agir pour la jeunesse": "Taking action for young people",
      "Santé · éducation · entrepreneuriat": "Health · education · entrepreneurship",
      "Qui sommes-nous ?": "Who are we?",
      "Nous découvrir": "Discover us",
      "À propos de la Fondation": "About the Foundation",
      "Notre mission": "Our mission",
      "Nos actions": "Our work",
      "Toutes les actions": "All our work",
      "Nos actualités": "Our news",
      "Nos événements": "Our events",
      "Nos documents": "Our resources",
      "S’inscrire": "Register",
      "En savoir plus": "Learn more",
      "Lire la suite": "Read more",
      "Télécharger": "Download",
      "Télécharger le document": "Download the document",
      "Aucun événement n’est disponible pour le moment.": "No events are available at the moment.",
      "Aucune actualité n’est disponible pour le moment.": "No news is available at the moment.",
      "Une jeunesse en bonne santé, qui entreprend et participe au développement.": "Healthy young people who build businesses and contribute to development.",
      "Notre vision": "Our vision",
      "Qui sommes-nous": "Who we are",
      "Notre engagement": "Our commitment",
      "Comment participer ?": "How can I participate?",
      "Contactez-nous": "Contact us",
      "Votre nom": "Your name",
      "Votre adresse e-mail": "Your email address",
      "Votre message": "Your message",
      "Envoyer": "Send",
      "Merci pour votre message.": "Thank you for your message.",
      "Une fondation engagée pour la jeunesse togolaise.": "A foundation committed to the young people of Togo.",
      "La Fondation Sheyi Emmanuel Adebayor promeut": "The Sheyi Emmanuel Adebayor Foundation promotes",
      "l’éducation, la santé et l’entrepreneuriat des jeunes au Togo.": "education, health and entrepreneurship for young people in Togo.",
      "Le plan s’appuie sur l’engagement de son président et porte la vision d’une jeunesse en bonne santé, entreprenante et actrice du développement.": "The plan builds on the commitment of its president and champions a vision of healthy, enterprising young people who help shape development.",
      "Découvrir notre vision": "Discover our vision",
      "Pourquoi agir ?": "Why take action?",
      "Le potentiel est immense. Les obstacles aussi.": "The potential is immense. So are the challenges.",
      "Au Togo, chômage, sous-emploi, difficultés d’accès aux soins, addictions et discriminations fragilisent les jeunes, en ville comme en milieu rural.": "In Togo, unemployment, underemployment, barriers to healthcare, addiction and discrimination affect young people in both urban and rural areas.",
      "La réponse de la Fondation :": "The Foundation's response:",
      "rapprocher les opportunités en reliant santé, éducation, sport et insertion économique avec les communautés et les dispositifs nationaux.": "bring opportunities closer by connecting health, education, sport and economic inclusion with communities and national programmes.",
      "15–35 ans": "Ages 15–35",
      "Tranche d’âge au cœur des actions de SEA Foundation.": "The age group at the heart of SEA Foundation's work.",
      "Habitants recensés au RGPH-5 de novembre 2022, selon le plan stratégique.": "People recorded in the November 2022 fifth national census, as cited in the strategic plan.",
      "Chômage et sous-emploi des jeunes de 15 à 34 ans, chiffres rapportés dans le plan.": "Youth unemployment and underemployment rates for ages 15–34, as reported in the plan.",
      "Répartition entre zones rurales et urbaines selon les données citées dans le plan.": "Rural and urban population split, according to the data cited in the plan.",
      "Chiffres tels qu’ils figurent dans le plan stratégique ; ils correspondent aux années et sources indiquées dans le document, et ne sont pas présentés comme des données actuelles.": "Figures are reproduced from the strategic plan and reflect the years and sources cited there; they are not presented as current data.",
      "Nos domaines d’action": "Our areas of work",
      "Chaque": "Every",
      "jeune": "young person",
      "mérite": "deserves",
      "une": "a",
      "chance,": "chance,",
      "un": "caring",
      "accompagnement": "support",
      "bienveillant": "",
      "et": "and",
      "la": "the",
      "liberté": "freedom",
      "de": "to",
      "construire": "shape",
      "son": "their",
      "avenir.": "future.",
      "Nos priorités 2024–2028": "Our 2024–2028 priorities",
      "Cinq priorités déclinées du plan stratégique.": "Five priorities drawn from the strategic plan.",
      "Le plan retient trois secteurs prioritaires. Les cinq cartes ci-dessous distinguent ces axes et certains domaines d’intervention décrits dans le document.": "The plan identifies three priority sectors. The five cards below highlight these areas and related fields of work described in the document.",
      "01 / PRENDRE SOIN": "01 / CARE",
      "Faciliter les soins primaires, une alimentation nutritive et la prévention des maladies pour les jeunes vulnérables.": "Improve access to primary care, nutritious food and disease prevention for vulnerable young people.",
      "Découvrir les actions": "Explore our work",
      "02 / APPRENDRE": "02 / LEARN",
      "Soutenir les bourses et les enseignants, encourager le sport scolaire et préparer les jeunes à l’emploi.": "Support scholarships and educators, promote school sports and prepare young people for work.",
      "03 / ENTREPRENDRE": "03 / BUILD A BUSINESS",
      "Incuber les projets, former à la mobilisation de fonds et soutenir l’insertion socioprofessionnelle.": "Incubate projects, build fundraising skills and support professional integration.",
      "04 / INNOVER": "04 / INNOVATE",
      "Agriculture & agrobusiness": "Agriculture & agribusiness",
      "Former des agripreneurs et les accompagner dans différents maillons de la chaîne agricole.": "Train agripreneurs and support them across different parts of the agricultural value chain.",
      "05 / INCLURE": "05 / INCLUDE",
      "Inclusion & transparence": "Inclusion & transparency",
      "Promouvoir l’équité de genre, l’inclusion du handicap et le libre accès aux rapports annuels.": "Promote gender equity, disability inclusion and open access to annual reports.",
      "Actualités": "News",
      "Les nouvelles de SEA Foundation.": "The latest from SEA Foundation.",
      "Les dernières nouvelles et initiatives de SEA Foundation.": "The latest news and initiatives from SEA Foundation.",
      "Formation": "Training",
      "Atelier": "Workshop",
      "Actualité": "News",
      "Titre à préciser pour cet article.": "Article title to be confirmed.",
      "Découvrir": "Discover",
      "Voir tous les événements": "See all events",
      "Ce que prévoit le plan": "What the plan sets out",
      "Des objectifs précis, des actions sur le terrain.": "Clear goals, action on the ground.",
      "Les trois axes du plan 2024–2028 détaillent comment les priorités deviennent des programmes, des accompagnements et des opportunités concrètes.": "The three pillars of the 2024–2028 plan show how priorities become programmes, support and tangible opportunities.",
      "Axe 01 · Santé": "Pillar 01 · Health",
      "Renforcer la résilience sanitaire des jeunes": "Strengthen young people's health and resilience",
      "Les actions prévues": "Planned actions",
      "Axe 02 · Éducation & sport": "Pillar 02 · Education & sport",
      "Faire de l’apprentissage un tremplin": "Make learning a springboard",
      "Axe 03 · Entrepreneuriat": "Pillar 03 · Entrepreneurship",
      "Transformer les idées en activités durables": "Turn ideas into sustainable ventures",
      "Une ambition commune": "A shared ambition",
      "Croire en une jeunesse qui": "Believe in young people who",
      "fait avancer le Togo.": "move Togo forward.",
      "Les repères de notre ambition pour la jeunesse.": "Our vision for young people.",
      "Un plan stratégique sur cinq ans": "A five-year strategic plan",
      "La jeunesse au centre de nos actions": "Young people at the heart of our work",
      "Santé · éducation et sport · entrepreneuriat": "Health · education and sport · entrepreneurship",
      "Notre manière d’agir": "How we work",
      "Des actions proches des jeunes, des résultats qui comptent.": "Work rooted in communities. Results that matter.",
      "Faire participer les jeunes": "Meaningful youth participation",
      "Renforcer les systèmes sociaux": "Strengthen social systems",
      "Promouvoir l’équité et l’inclusion": "Promote equity and inclusion",
      "Communiquer sur des faits": "Communicate with evidence",
      "Anticiper les risques": "Anticipate risks",
      "Rendre compte des résultats": "Report on results",
      "Paroles & engagements": "Voices & commitments",
      "Les idées qui guident l’action.": "The ideas that guide our work.",
      "Partenariats envisagés": "Potential partnerships",
      "Avancer avec les forces du territoire.": "Moving forward with local partners.",
      "Ministère de l’Agriculture": "Ministry of Agriculture",
      "Élevage et Développement rural": "Livestock and rural development",
      "Formation agricole": "Agricultural training",
      "Enseignement supérieur et formation": "Higher education and training",
      "Programme des Nations unies pour le développement": "United Nations Development Programme",
      "Agence française de développement": "French Development Agency",
      "Entreprise": "Company",
      "Questions fréquentes": "Frequently asked questions",
      "Comprendre le plan SEA.": "Understanding the SEA plan.",
      "Quelle est la période couverte par le plan ?": "What period does the plan cover?",
      "Quels sont les secteurs prioritaires de la Fondation ?": "What are the Foundation's priority sectors?",
      "À qui s’adressent les actions prévues ?": "Who are the planned actions for?",
      "Quelles actions sont prévues pour l’éducation et le sport ?": "What actions are planned for education and sport?",
      "Comment les activités doivent-elles être suivies ?": "How will activities be monitored?",
      "La page présente-t-elle des témoignages de bénéficiaires ou des logos officiels ?": "Does this page show beneficiary testimonials or official partner logos?",
      "Partenaires · Communautés · Jeunesse": "Partners · Communities · Youth",
      "Soutenez une vision portée par la jeunesse.": "Support a vision led by young people.",
      "Nous écrire": "Write to us",
      "Explorer": "Explore",
      "Qui sommes-nous ?": "Who we are",
      "Nos priorités": "Our priorities",
      "Nos engagements": "Our commitments",
      "Nos actions": "Our work",
      "Nous contacter": "Contact us",
      "Agir ensemble": "Take action together",
      "Soutenir cette vision": "Support this vision",
      "Mentions légales": "Legal notice",
      "Confidentialité": "Privacy",
      "Cookies": "Cookies",
      "Conditions d’utilisation": "Terms of use",
      "Retour en haut ↑": "Back to top ↑",
      "Un avenir à construire ensemble.": "Building a future together.",
      "Un assistant pour vous orienter vers nos programmes, nos actions et les possibilités d’engagement.": "An assistant to help you explore our programmes, work and ways to get involved.",
      "Accompagnement · Engagement · Avenir": "Support · Commitment · Future",
      "ASSISTANT VIRTUEL": "VIRTUAL ASSISTANT",
      "Comment pouvons-nous vous aider ?": "How can we help?",
      "Bonjour ! Je peux vous renseigner sur les actions de SEA Foundation et les possibilités d’engagement.": "Hello! I can tell you about SEA Foundation's work and ways to get involved.",
      "Votre message": "Your message",
      "Assistant IA · vérifiez les informations importantes auprès de la Fondation.": "AI assistant · please verify important information with the Foundation.",
      "Besoin d’aide ?": "Need help?",
      "Fermer l’assistant": "Close assistant",
      "Fermer le chatbot": "Close chat",
      "Écrivez votre message…": "Write your message…",
      "Préférences de confidentialité": "Privacy preferences",
      "SEA FOUNDATION · CONFIDENTIALITÉ": "SEA FOUNDATION · PRIVACY",
      "Votre choix concernant les cookies": "Your cookie choices",
      "En savoir plus": "Learn more",
      "Tout refuser": "Reject all",
      "Personnaliser": "Customize",
      "Tout accepter": "Accept all",
      "Stockage nécessaire de votre choix — toujours actif": "Essential storage for your choice — always active",
      "Mesure d’audience — actuellement non activée": "Analytics — currently disabled",
      "Enregistrer mes choix": "Save my choices",
      "Contacter SEA Foundation sur WhatsApp": "Contact SEA Foundation on WhatsApp",
      "Envoyer un e-mail": "Send an email",
      "Navigation principale": "Main navigation",
      "Informations légales": "Legal information",
      "Le plan stratégique de SEA Foundation couvre cinq ans, de 2024 à 2028. Le document prévoit son évaluation au terme de la troisième année puis à la fin du cycle.": "SEA Foundation's strategic plan covers five years, from 2024 to 2028. The plan is to be evaluated at the end of the third year and again at the end of the cycle.",
      "Le document retient trois secteurs prioritaires : la santé et le bien-être, l’éducation et le sport, et l’entrepreneuriat. L’agrobusiness est notamment développé dans l’axe consacré à l’entrepreneuriat des jeunes.": "The plan identifies three priority sectors: health and well-being, education and sport, and entrepreneurship. Agribusiness is covered under the youth entrepreneurship pillar.",
      "Le plan se concentre principalement sur les jeunes, avec une attention aux 15–35 ans et aux jeunes vulnérables. Il cite notamment les jeunes filles, les jeunes issus de milieux défavorisés et les jeunes en situation de handicap.": "The plan focuses primarily on young people, especially those aged 15–35 and young people in vulnerable situations. It specifically mentions girls, young people from disadvantaged backgrounds and young people with disabilities.",
      "Le plan prévoit notamment un appui en fournitures scolaires, des programmes de bourses, le renforcement des capacités des éducateurs, des matériels didactiques et des infrastructures modernes. Il vise aussi le sport en milieu scolaire et universitaire, les compétitions, les infrastructures sportives, les soft skills et les outils informatiques.": "The plan includes support with school supplies and scholarships, educator development, learning materials and modern infrastructure. It also covers school and university sports, competitions, sports facilities, soft skills and digital tools.",
      "Le document prévoit des plans de travail annuels, un suivi semestriel, des examens annuels avec les pouvoirs publics, la consultation des bénéficiaires et des rapports annuels en accès libre. Deux évaluations du plan sont prévues : au bout de la troisième année et à la fin du cycle.": "The plan provides for annual work plans, twice-yearly monitoring, annual reviews with public authorities, consultation with beneficiaries and publicly available annual reports. Two evaluations are planned: at the end of year three and at the end of the cycle.",
      "Non. Le texte fourni ne contient pas de témoignages de bénéficiaires ni de logos de partenaires confirmés. Les citations affichées sont attribuées au plan ou au mot du président, et le carrousel présente uniquement des catégories de partenaires citées dans le document.": "No. The source text contains neither beneficiary testimonials nor confirmed partner logos. The quotations are attributed to the plan or the president's message, and the carousel shows only categories of potential partners mentioned in the document.",
      "Le document ne contient pas de témoignages de bénéficiaires. Ces cinq cartes reprennent donc des extraits et des engagements du plan, sans les attribuer à des personnes qui n’y sont pas citées.": "The source document contains no beneficiary testimonials. These five cards therefore quote the plan and its commitments without attributing them to people who are not named in it.",
      "« Les jeunes togolais en bonne santé, qui entreprennent et qui participent au développement. »": "“Healthy young people in Togo who build businesses and take part in development.”",
      "« Nous sommes convaincus que l’éducation est la clé de l’autonomie. »": "“We believe education is the key to independence.”",
      "« L’agriculture est un secteur clé pour la sécurité alimentaire et le développement économique. »": "“Agriculture is a key sector for food security and economic development.”",
      "« La Fondation SEA fait de la redevabilité un principe consacré. »": "“SEA Foundation is firmly committed to accountability.”",
      "« Ensemble, nous pouvons bâtir un avenir meilleur pour la jeunesse togolaise. »": "“Together, we can build a better future for young people in Togo.”",
      "La vision de SEA Foundation": "SEA Foundation's vision",
      "Plan stratégique 2024–2028": "2024–2028 strategic plan",
      "Extrait du plan stratégique 2024–2028": "Excerpt from the 2024–2028 strategic plan",
      "Agripreneuriat": "Agripreneurship",
      "Transparence": "Transparency",
      "Mot du président, plan stratégique 2024–2028": "President's message, 2024–2028 strategic plan",
      "FAR": "FAR",
      "Logo présent dans les ressources du site": "Logo included in the website resources",
      "Les logos proviennent des ressources du site. Leur présence ici n’affirme pas l’existence d’un partenariat en cours avec SEA Foundation.": "These logos come from the website's resources. Their presence here does not imply an active partnership with SEA Foundation.",
      "Les réponses ci-dessous résument les informations indiquées dans le plan stratégique 2024–2028.": "The answers below summarize information from the 2024–2028 strategic plan.",
      "Partenaires · Communautés · Jeunesse": "Partners · Communities · Youth",
      "Le plan de SEA Foundation compte sur le soutien, l’expertise et l’engagement de ses partenaires et des parties prenantes.": "SEA Foundation's plan relies on the support, expertise and commitment of its partners and stakeholders.",
      "Adidogomé · Togo": "Adidogomé · Togo",
      "Partenaires, communautés et jeunesse : faisons avancer une vision portée par les jeunes.": "Partners, communities and young people: let's move forward with a vision led by youth.",
      "Soutenir le sport scolaire et universitaire, les compétitions et les infrastructures ; utiliser le football pour la sensibilisation à la santé et la promotion de l’excellence.": "Support school and university sports, competitions and facilities; use football to raise health awareness and promote excellence.",
      "Renforcer les compétences numériques et les savoir-être (soft skills) pour préparer les jeunes diplômés à l’emploi.": "Build digital and soft skills to prepare young graduates for employment.",
      "Le plan relie ces interventions aux objectifs d’éducation de qualité (ODD 4) et de consolidation de la paix (ODD 16).": "The plan links these activities to quality education (SDG 4) and peacebuilding (SDG 16).",
      "Faire de l’entrepreneuriat un levier d’intégration économique et sociale, et soutenir la création d’emplois décents.": "Use entrepreneurship to promote economic and social inclusion and support the creation of decent jobs.",
      "Développer l’incubation et l’insertion socioprofessionnelle des jeunes en agrobusiness.": "Develop incubation and professional inclusion for young people in agribusiness.",
      "Former et informer les jeunes pour développer des activités à différents niveaux de la chaîne agricole, dont les secteurs agro-sylvo-pastoral et halieutique.": "Train and inform young people so they can work across the agricultural value chain, including agro-sylvo-pastoral and fisheries sectors.",
      "Accompagner la création d’agro-entreprises et former les porteurs de projets agricoles à la levée de fonds.": "Support the creation of agricultural businesses and train agricultural project leaders in fundraising.",
      "Renforcer la mobilisation et la gestion des fonds pour les initiatives des jeunes, en se focalisant sur les résultats et la transparence.": "Strengthen fundraising and financial management for youth initiatives, focusing on results and transparency.",
      "Soutenir les initiatives innovantes des jeunes dans l’agriculture, le numérique, l’éducation et la santé.": "Support innovative youth initiatives in agriculture, digital technology, education and health.",
      "Développer des champions nationaux choisis par des processus compétitifs transparents.": "Develop national champions selected through transparent competitive processes.",
      "Le plan relie cet axe à l’ODD 8 (emploi décent) et à l’ODD 1 (réduction de la pauvreté), et souligne l’équité de genre, l’inclusion du handicap et les effets positifs pour l’environnement.": "The plan links this pillar to SDG 8 (decent work) and SDG 1 (poverty reduction), and emphasizes gender equity, disability inclusion and positive environmental impact.",
      "À l’horizon 2028, la Fondation veut contribuer à améliorer les conditions de vie des jeunes grâce à des approches innovantes en santé, éducation et entrepreneuriat. Le plan entend aussi soutenir les objectifs de développement du Togo en matière de santé, d’éducation et de création d’emplois.": "By 2028, the Foundation aims to improve young people's living conditions through innovative approaches to health, education and entrepreneurship. The plan also seeks to support Togo's development goals in health, education and job creation.",
      "Horizon du plan stratégique et de sa vision pour la jeunesse": "The strategic plan's horizon and vision for young people",
      "La confiance se construit sur le terrain : avec les acteurs locaux, à l’écoute des jeunes et dans la durée.": "Trust is built on the ground: with local partners, by listening to young people and through long-term commitment.",
      "Associer les 15–35 ans comme acteurs du changement et leur donner une place dans les décisions qui les concernent.": "Engage 15–35-year-olds as agents of change and give them a voice in decisions that affect them.",
      "Agir auprès des individus et des communautés, notamment par la communication et la lutte contre les normes sociales préjudiciables.": "Work with individuals and communities, including through communication and by challenging harmful social norms.",
      "Accorder une attention fondamentale à l’égalité de genre et à l’inclusion des jeunes en situation de handicap.": "Make gender equality and the inclusion of young people with disabilities a fundamental priority.",
      "Utiliser les données pour le plaidoyer, sensibiliser et contribuer à la conception des politiques et des programmes.": "Use data for advocacy, awareness-raising and the design of policies and programmes.",
      "Identifier dans les plans annuels les risques qui peuvent freiner les activités et prévoir des mesures d’atténuation.": "Identify risks that could hinder activities in annual plans and prepare mitigation measures.",
      "Partager les rapports annuels, consulter les bénéficiaires et utiliser les évaluations pour ajuster les actions.": "Share annual reports, consult beneficiaries and use evaluations to adapt activities.",
      "Un plan stratégique sur cinq ans": "A five-year strategic plan",
      "La jeunesse au centre de nos actions": "Young people at the heart of our work",
      "Horizon du plan stratégique et de sa vision pour la jeunesse": "The strategic plan's horizon and vision for young people",
      "Le potentiel est immense. Les obstacles aussi.": "The potential is immense. So are the challenges.",
      "Chaque jeune mérite une chance, un accompagnement bienveillant et la liberté de construire son avenir.": "Every young person deserves a chance, caring support and the freedom to shape their future.",
      "Santé": "Health",
      "Entrepreneuriat": "Entrepreneurship",
      "Soutenir cette vision": "Support this vision",
      "Togo": "Togo",
      "Plan stratégique 2024–2028": "2024–2028 strategic plan",
      "4 mai 2026": "May 4, 2026",
      "22 avril 2026": "April 22, 2026",
      "1 avril 2026": "April 1, 2026",
      "Conférences": "Conferences",
      "Améliorer le bien-être physique et mental des jeunes de 15 à 35 ans, en particulier ceux qui sont vulnérables ou éloignés des services.": "Improve the physical and mental well-being of young people aged 15–35, especially those who are vulnerable or have limited access to services.",
      "Soutenir l’accès aux soins de santé primaires en milieu urbain comme rural, y compris pour les jeunes en situation précaire ou de crise humanitaire.": "Support access to primary healthcare in urban and rural areas, including for young people in precarious situations or humanitarian crises.",
      "Favoriser l’accès à une alimentation saine et nutritive.": "Promote access to healthy, nutritious food.",
      "Prévenir les maladies et la malnutrition, et contribuer à éviter les décès évitables, y compris ceux liés au VIH.": "Prevent disease and malnutrition, and help avoid preventable deaths, including those related to HIV.",
      "Soutenir les familles et les communautés ; prendre en compte l’inclusion sociale, le genre et le changement climatique.": "Support families and communities while taking social inclusion, gender and climate change into account.",
      "Favoriser la santé physique et mentale dans un environnement propice au bien-être.": "Promote physical and mental health in an environment that supports well-being.",
      "Le plan inscrit ces interventions en lien avec les stratégies nationales de santé et de nutrition.": "The plan aligns these activities with national health and nutrition strategies.",
      "Mettre l’éducation et le sport au service de l’autonomie, de la santé et de l’insertion professionnelle des jeunes.": "Use education and sport to support young people's independence, health and professional inclusion.",
      "Renforcer la formation des jeunes issus de milieux défavorisés, y compris ceux en situation de handicap.": "Strengthen training for young people from disadvantaged backgrounds, including those with disabilities.",
      "Soutenir les élèves vulnérables ou méritants en fournitures et par des bourses, selon des critères d’excellence et de vulnérabilité.": "Support vulnerable or high-achieving students with school supplies and scholarships, based on criteria of excellence and vulnerability.",
      "Renforcer les capacités des éducateurs et appuyer les matériels didactiques et infrastructures modernes.": "Build educators' skills and support teaching materials and modern facilities.",
      "Développer le réseau universitaire, public et privé, et encourager les filières STEM, l’entrepreneuriat et l’agrobusiness.": "Develop public and private university networks and encourage STEM fields, entrepreneurship and agribusiness.",
      "Éducation": "Education",
      "La Fondation Sheyi Emmanuel Adebayor promeut des actions innovantes en santé, éducation et entrepreneuriat des jeunes au Togo.": "The Sheyi Emmanuel Adebayor Foundation promotes innovative initiatives in health, education and youth entrepreneurship in Togo.",
      "Faciliter l’accès aux soins primaires, à une alimentation nutritive et à la prévention des maladies, notamment pour les jeunes vulnérables.": "Improve access to primary care, nutritious food and disease prevention, particularly for vulnerable young people.",
      "Soutenir l’apprentissage par la formation, les bourses, le renforcement des capacités des éducateurs et le sport scolaire et universitaire.": "Support learning through training, scholarships, educator development, and school and university sports.",
      "Accompagner l’incubation, l’insertion socioprofessionnelle et les initiatives innovantes des jeunes, notamment dans les chaînes agricoles.": "Support incubation, professional inclusion and innovative youth initiatives, particularly across agricultural value chains.",
      "Utiliser les données pour le plaidoyer, la sensibilisation et la conception des politiques et des programmes.": "Use data for advocacy, awareness-raising and the design of policies and programmes.",
      "La vie de la Fondation": "Life at the Foundation",
      "Retrouvez ici les communications officielles et les nouvelles de SEA Foundation.": "Find official announcements and news from SEA Foundation here.",
      "Découvrir nos actions": "Explore our work",
      "Voir les actions": "View our work",
      "Données personnelles": "Personal data",
      "Contactez SEA Foundation": "Contact SEA Foundation",
      "Traceurs et préférences": "Trackers and preferences",
      "Sur le terrain": "On the ground",
      "Formation · Innov’ert": "Training · Innov'ert",
      "Atelier · Innov’ert": "Workshop · Innov'ert",
      "Conférence · OJA": "Conference · OJA",
      "S’engager avec SEA": "Get involved with SEA",
      "Adidogomé · info@fondationsea.com": "Adidogomé · info@fondationsea.com",
      "Le plan couvre cinq ans et présente la vision de la Fondation, ses secteurs prioritaires, les axes d’intervention et les modalités de suivi et d’évaluation.": "The five-year plan sets out the Foundation's vision, priority sectors, areas of work, and monitoring and evaluation approach.",
      "Les règles de consultation des informations publiées par SEA Foundation.": "Rules for accessing information published by SEA Foundation.",
      "Les rencontres, ateliers et initiatives qui font vivre les engagements de SEA Foundation.": "Meetings, workshops and initiatives that bring SEA Foundation's commitments to life.",
      "Les textes ci-dessous sont des synthèses thématiques du plan stratégique, et non des témoignages ni des articles d’actualité datés.": "The texts below are thematic summaries of the strategic plan, not testimonials or dated news articles.",
      "La page présente-t-elle des témoignages de bénéficiaires ou des logos officiels ?": "Does this page show beneficiary testimonials or official partner logos?",
      "Les actualités institutionnelles datées seront publiées dès leur communication officielle.": "Dated institutional news will be published once officially announced.",
      "En attendant, découvrez quatre repères issus du plan stratégique 2024–2028, ou consultez les": "In the meantime, explore four highlights from the 2024–2028 strategic plan, or browse",
      "événements déjà présentés": "previously featured events",
      "À suivre dans le plan SEA": "From the SEA plan",
      "Rapprocher les jeunes des soins et de la prévention.": "Bringing young people closer to healthcare and prevention.",
      "Le plan prévoit de renforcer l’accès aux soins primaires ainsi que la prévention et le bien-être physique et mental.": "The plan aims to improve access to primary care, prevention, and physical and mental well-being.",
      "Découvrir l’axe santé": "Explore the health pillar",
      "Faire de l’apprentissage un tremplin.": "Making learning a springboard.",
      "Bourses, soutien éducatif et sport scolaire contribuent à l’autonomie et à l’insertion des jeunes.": "Scholarships, educational support and school sports help young people build independence and find opportunities.",
      "Découvrir l’axe éducation": "Explore the education pillar",
      "Accompagner les initiatives des jeunes.": "Supporting youth-led initiatives.",
      "Incubation, formation et accompagnement des projets doivent soutenir l’insertion économique, notamment en agrobusiness.": "Incubation, training and project support are intended to promote economic inclusion, particularly in agribusiness.",
      "Découvrir l’axe entrepreneuriat": "Explore the entrepreneurship pillar",
      "Suivi & transparence": "Monitoring & transparency",
      "Partager les résultats et apprendre du terrain.": "Sharing results and learning from experience.",
      "Le plan prévoit un suivi régulier, la consultation des bénéficiaires et des rapports annuels en accès libre.": "The plan provides for regular monitoring, consultation with beneficiaries and openly available annual reports.",
      "Voir les documents": "View resources",
      "Voir les actions du plan": "Explore the plan's activities",
      "Comprendre les enjeux": "Understanding the issues",
      "Articles & dossiers": "Articles & features",
      "Des repères thématiques tirés du plan stratégique de SEA Foundation 2024–2028.": "Thematic insights from SEA Foundation's 2024–2028 strategic plan.",
      "Dossier · Santé et bien-être": "Feature · Health and well-being",
      "Rapprocher les jeunes des soins et de la prévention": "Bringing young people closer to healthcare and prevention",
      "Le plan place la santé des jeunes au centre de son action. Il prévoit de soutenir l’accès aux soins primaires, la nutrition et la prévention, en tenant compte des vulnérabilités et des réalités des milieux de vie.": "The plan puts young people's health at the centre of its work. It aims to support access to primary care, nutrition and prevention while taking vulnerabilities and living conditions into account.",
      "Dossier · Éducation & sport": "Feature · Education & sport",
      "La formation, les bourses, le renforcement des capacités des éducateurs et le sport scolaire doivent contribuer à l’autonomie, au bien-être et à la préparation des jeunes à la vie professionnelle.": "Training, scholarships, educator development and school sports are intended to foster independence, well-being and preparation for working life.",
      "Dossier · Entrepreneuriat": "Feature · Entrepreneurship",
      "Soutenir les initiatives économiques des jeunes": "Supporting young people's business initiatives",
      "La Fondation souhaite développer l’incubation et l’insertion socioprofessionnelle, en particulier dans l’agrobusiness, et soutenir des initiatives innovantes dans plusieurs secteurs porteurs.": "The Foundation aims to develop incubation and professional inclusion, particularly in agribusiness, and support innovative initiatives across several promising sectors.",
      "Consulter les axes d’intervention": "Explore the areas of work",
      "Les objectifs et les actions prévues sont détaillés dans la rubrique dédiée au plan stratégique.": "The objectives and planned activities are detailed in the strategic plan section.",
      "Des priorités, des actions sur le terrain.": "Priorities translated into action.",
      "Le plan de SEA Foundation organise ses interventions autour de trois secteurs prioritaires et de principes transversaux.": "SEA Foundation's plan organizes its work around three priority sectors and cross-cutting principles.",
      "Nos priorités": "Our priorities",
      "01 · Santé": "01 · Health",
      "02 · Éducation": "02 · Education",
      "03 · Entrepreneuriat": "03 · Entrepreneurship",
      "Entrepreneuriat & agrobusiness": "Entrepreneurship & agribusiness",
      "Une mise en œuvre inclusive": "An inclusive approach",
      "Suivre les actions et partager les résultats.": "Monitoring activities and sharing results.",
      "Le plan prévoit des plans de travail annuels, un suivi régulier avec les partenaires, la consultation des bénéficiaires et des évaluations du cycle.": "The plan provides for annual work plans, regular monitoring with partners, consultation with beneficiaries and end-of-cycle evaluations.",
      "Voir les documents": "View resources",
      "La Fondation met la jeunesse au cœur de sa vision. Son plan stratégique 2024–2028 entend améliorer les conditions de vie des jeunes grâce à des approches innovantes en santé, éducation et entrepreneuriat.": "The Foundation puts young people at the heart of its vision. Its 2024–2028 strategic plan aims to improve their living conditions through innovative approaches to health, education and entrepreneurship.",
      "À l’horizon 2028, la Fondation veut contribuer aux objectifs de développement du Togo en matière de santé, d’éducation et de création d’emplois. Le plan accorde une attention particulière aux jeunes de 15 à 35 ans.": "By 2028, the Foundation aims to contribute to Togo's development goals in health, education and job creation. The plan pays particular attention to young people aged 15–35.",
      "Un plan sur cinq ans": "A five-year plan",
      "Une vision stratégique déclinée en priorités et en axes d’intervention.": "A strategic vision translated into priorities and areas of work.",
      "La jeunesse au centre": "Young people at the centre",
      "Les jeunes sont au cœur des actions et de la vision de SEA Foundation.": "Young people are at the heart of SEA Foundation's work and vision.",
      "03 secteurs": "03 sectors",
      "Santé, éducation et entrepreneuriat": "Health, education and entrepreneurship",
      "Trois secteurs prioritaires pour rapprocher les opportunités des jeunes.": "Three priority sectors to bring opportunities closer to young people.",
      "Le plan stratégique part d’un constat : au Togo, les jeunes font face au chômage et au sous-emploi, aux difficultés d’accès aux soins, aux addictions et aux discriminations liées au genre ou au handicap. La Fondation souhaite rapprocher les opportunités des jeunes, en travaillant avec les communautés et en reliant santé, éducation, sport et insertion économique.": "The strategic plan starts from the reality that young people in Togo face unemployment and underemployment, barriers to healthcare, addiction, and discrimination related to gender or disability. The Foundation aims to bring opportunities closer by working with communities and connecting health, education, sport and economic inclusion.",
      "Pour toute demande d’information, de partenariat ou de participation aux actions, vous pouvez joindre la Fondation par courriel ou par téléphone.": "For information, partnership enquiries or to take part in our work, you can contact the Foundation by email or phone.",
      "Courriel": "Email",
      "Écrivez-nous": "Email us",
      "Envoyer un courriel": "Send an email",
      "Téléphone": "Phone",
      "Appelez-nous": "Call us",
      "Appeler la Fondation": "Call the Foundation",
      "Localisation": "Location",
      "Au Togo": "In Togo",
      "Ressources": "Resources",
      "Documents de référence": "Reference documents",
      "Repères et informations relatifs au plan stratégique de SEA Foundation.": "Highlights and information about SEA Foundation's strategic plan.",
      "Plan stratégique · 2024–2028": "Strategic plan · 2024–2028",
      "Le plan stratégique de SEA Foundation": "SEA Foundation's strategic plan",
      "Le fichier PDF officiel n’est pas présent parmi les ressources disponibles sur ce site. Pour demander le document, contactez directement la Fondation.": "The official PDF is not among the resources currently available on this website. To request a copy, please contact the Foundation directly.",
      "Demander le document": "Request the document",
      "Consulter les axes en ligne": "View the plan online",
      "Repères de mise en œuvre": "Implementation milestones",
      "Planifier": "Plan",
      "Décliner le plan quinquennal en plans de travail annuels.": "Translate the five-year plan into annual work plans.",
      "Suivre": "Monitor",
      "Organiser des examens réguliers avec les pouvoirs publics, les partenaires et les bénéficiaires.": "Hold regular reviews with public authorities, partners and beneficiaries.",
      "Évaluer": "Evaluate",
      "Évaluer le plan au terme de la troisième année puis à la fin du cycle.": "Evaluate the plan at the end of the third year and again at the end of the cycle.",
      "Votre engagement peut faire la différence.": "Your commitment can make a difference.",
      "Vous souhaitez participer aux actions de la Fondation ou recevoir des informations ? Écrivez-nous pour connaître les modalités disponibles.": "Would you like to take part in the Foundation's work or receive information? Contact us to learn about the options available.",
      "Manifestez votre intérêt auprès de la Fondation.": "Register your interest with the Foundation.",
      "Cette page ne dispose pas encore d’un formulaire d’inscription ou d’un portail de compte. Pour éviter de recueillir vos données sans dispositif sécurisé, contactez directement l’équipe SEA par courriel ou téléphone.": "This page does not yet have a registration form or account portal. To avoid collecting your information without a secure system, please contact the SEA team directly by email or phone.",
      "Écrire à la Fondation": "Write to the Foundation",
      "Comment prendre contact ?": "How to get in touch",
      "Présentez votre demande": "Tell us what you need",
      "Indiquez si votre démarche concerne la participation aux actions, un partenariat ou la réception d’informations.": "Let us know whether you are interested in taking part in our work, forming a partnership or receiving information.",
      "Échangez avec l’équipe": "Talk with the team",
      "L’équipe pourra vous renseigner sur les possibilités et les modalités en vigueur.": "The team can provide information about current opportunities and arrangements.",
      "Suivez les informations officielles": "Follow official updates",
      "Les communications et les informations confirmées seront publiées dans la rubrique Actualités.": "Official announcements and confirmed information will be published in the News section.",
      "Règles d’accès au site": "Website access rules",
      "Les règles de consultation des informations publiées par SEA Foundation.": "Rules for accessing information published by SEA Foundation.",
      "Objet du site": "Purpose of the website",
      "Ce site présente la Fondation Sheyi Emmanuel Adebayor, ses orientations, ses actions et des informations relatives à son plan stratégique. Les contenus sont fournis à titre informatif et ne remplacent pas les communications officielles de la Fondation.": "This website presents the Sheyi Emmanuel Adebayor Foundation, its direction, activities and information about its strategic plan. Content is provided for information and does not replace official communications from the Foundation.",
      "Accès et disponibilité": "Access and availability",
      "La Fondation s’efforce de maintenir le site accessible et les informations à jour, sans garantir une disponibilité continue ni l’absence d’erreurs. Certaines informations peuvent évoluer ou être corrigées.": "The Foundation works to keep the website accessible and its information current, but cannot guarantee uninterrupted availability or error-free content. Some information may change or be corrected.",
      "Utilisation des contenus": "Use of content",
      "Vous pouvez consulter les contenus pour votre information personnelle. Toute reproduction, diffusion ou réutilisation doit respecter les droits applicables et les éventuelles conditions attachées aux contenus appartenant à des tiers.": "You may view the content for personal information. Any reproduction, distribution or reuse must respect applicable rights and any conditions attached to third-party content.",
      "Liens externes": "External links",
      "Le site peut renvoyer vers des services ou ressources externes. SEA Foundation ne contrôle pas leur contenu ni leurs règles de confidentialité.": "This website may link to external services or resources. SEA Foundation does not control their content or privacy practices.",
      "Contact et mises à jour": "Contact and updates",
      "Pour toute question concernant le site, contactez la Fondation à": "For questions about this website, contact the Foundation at",
      ". Ces conditions peuvent être actualisées lorsque le site ou ses fonctionnalités évoluent.": ". These terms may be updated as the website or its features change.",
      "Comment le site traite les informations lorsque vous prenez contact avec SEA Foundation.": "How this website handles information when you contact SEA Foundation.",
      "Responsable du traitement": "Data controller",
      "La Fondation Sheyi Emmanuel Adebayor (SEA Foundation), à Adidogomé au Togo, est l’interlocuteur pour les questions relatives aux informations communiquées par l’intermédiaire du site. Vous pouvez la joindre à": "The Sheyi Emmanuel Adebayor Foundation (SEA Foundation), in Adidogomé, Togo, handles questions about information shared through this website. You can contact the Foundation at",
      "Informations recueillies": "Information collected",
      "Le site ne propose actuellement ni compte utilisateur ni formulaire de contact. Si vous choisissez d’écrire à la Fondation ou de l’appeler, les coordonnées et le contenu que vous communiquez sont transmis par votre propre service de messagerie ou opérateur, puis utilisés pour répondre à votre demande.": "This website currently offers neither user accounts nor a contact form. If you choose to email or call the Foundation, the contact details and information you provide are transmitted through your own email service or phone provider and then used to respond to your request.",
      "Le site charge également les polices Google Fonts depuis les serveurs de Google. Cette requête peut transmettre des données techniques, comme l’adresse IP, à ce fournisseur selon ses propres pratiques.": "This website also loads Google Fonts from Google's servers. This request may send technical data, such as your IP address, to that provider under its own practices.",
      "Utilisation et conservation": "Use and retention",
      "Les informations fournies lors d’un échange servent à traiter et suivre la demande correspondante. La Fondation doit définir et appliquer une durée de conservation adaptée à ses obligations et aux finalités de chaque échange.": "Information provided during an exchange is used to handle and follow up on the related request. The Foundation should define and apply a retention period appropriate to its obligations and the purpose of each exchange.",
      "Vos demandes": "Your requests",
      "Pour toute question ou demande concernant les informations que vous avez transmises à la Fondation, contactez-la à": "For questions or requests about information you have shared with the Foundation, contact it at",
      ". Les modalités applicables dépendent de la législation en vigueur.": ". Applicable procedures depend on current legislation.",
      "Mise à jour": "Last updated",
      "Cette page décrit les fonctionnalités constatées sur le site au 4 novembre 2026. Elle devra être mise à jour si de nouveaux formulaires, outils de mesure ou services tiers sont ajoutés.": "This page describes the features observed on the website as of 4 November 2026. It should be updated if new forms, analytics tools or third-party services are added.",
      "Informations sur les cookies utilisés par le site de SEA Foundation.": "Information about cookies used by the SEA Foundation website.",
      "Fonctionnement actuel du site": "How the website currently works",
      "Le site enregistre votre choix de consentement dans le stockage local du navigateur afin de ne pas réafficher le bandeau à chaque visite. Aucun outil publicitaire ni outil de mesure d’audience n’est actuellement activé. Ce stockage strictement nécessaire au maintien de votre choix ne peut pas être désactivé.": "The website saves your consent choice in your browser's local storage so the banner does not reappear on every visit. No advertising or analytics tools are currently enabled. This storage is essential to remember your choice and cannot be disabled.",
      "Services externes": "External services",
      "Les polices de caractères sont chargées depuis Google Fonts. Le chargement de cette ressource implique une requête vers un service tiers, qui peut traiter des données techniques de connexion selon ses propres règles. Pour en savoir plus, consultez la": "Fonts are loaded from Google Fonts. This resource makes a request to a third-party service, which may process technical connection data under its own policies. To learn more, read Google's",
      "politique de confidentialité de Google": "privacy policy",
      "Contrôler les cookies": "Manage cookies",
      "Vous pouvez modifier votre choix à tout moment depuis les paramètres de votre navigateur ou en rouvrant les préférences ci-dessous. Le comportement des services externes et de l’hébergeur peut évoluer indépendamment du code du site.": "You can change your choice at any time in your browser settings or by reopening the preferences below. External services and hosting providers may change independently of this website's code.",
      "Gérer mes préférences": "Manage my preferences",
      "Évolution": "Changes",
      "Si des cookies ou traceurs facultatifs sont ajoutés, cette page sera actualisée et votre consentement sera demandé avant leur activation.": "If optional cookies or trackers are added, this page will be updated and your consent will be requested before they are enabled.",
      "Informations relatives au site de la Fondation Sheyi Emmanuel Adebayor.": "Information about the Sheyi Emmanuel Adebayor Foundation website.",
      "Éditeur du site": "Website publisher",
      "Éditeur :": "Publisher:",
      "Fondation Sheyi Emmanuel Adebayor (SEA Foundation).": "Sheyi Emmanuel Adebayor Foundation (SEA Foundation).",
      "Adresse communiquée :": "Address provided:",
      "Adidogomé, Togo.": "Adidogomé, Togo.",
      "Contact :": "Contact:",
      "Les informations d’identification juridique de l’éditeur et le nom du responsable de publication sont à confirmer par la Fondation.": "The Foundation must confirm the publisher's legal identification details and the name of the publication director.",
      "Hébergement": "Hosting",
      "Le nom et les coordonnées de l’hébergeur du site doivent être renseignés par SEA Foundation.": "SEA Foundation must provide the website host's name and contact details.",
      "Propriété intellectuelle": "Intellectual property",
      "Les contenus de ce site sont présentés à titre informatif. Toute réutilisation doit respecter les droits applicables et les droits des auteurs ou titulaires concernés. Les éléments appartenant à des tiers restent soumis à leurs propres conditions d’utilisation.": "Content on this website is provided for information. Any reuse must respect applicable rights and the rights of the relevant authors or owners. Third-party material remains subject to its own terms of use.",
      "Pour toute question concernant le site ou ces mentions, écrivez à": "For questions about the website or this legal notice, email",
      "Échangeons autour de la jeunesse.": "Let's talk about young people.",
      "SEA Foundation compte sur le soutien, l’expertise et l’engagement de ses partenaires et des parties prenantes.": "SEA Foundation relies on the support, expertise and commitment of its partners and stakeholders.",
      "Pour toute demande d’information, de partenariat ou de participation aux actions, vous pouvez joindre la Fondation par courriel ou par téléphone.": "For information, partnership enquiries or to take part in our work, contact the Foundation by email or phone.",
      "Les rencontres, ateliers et initiatives qui font vivre les engagements de SEA Foundation.": "Meetings, workshops and initiatives that bring SEA Foundation's commitments to life.",
      "Retrouvez ici les événements datés présentés par SEA Foundation. Cette sélection reprend les informations déjà publiées sur le site.": "Find dated events featured by SEA Foundation here. This selection reflects information already published on the website.",
      "Rencontres & initiatives": "Events & initiatives",
      "Un projet de formation pour accompagner les jeunes vers de nouvelles pratiques agricoles et des compétences connectées.": "A training project helping young people develop new agricultural practices and digital skills.",
      "Un atelier Innov’ert consacré à la transformation et à la valorisation des huiles usagées.": "An Innov'ert workshop focused on processing and recovering used oils.",
      "Une participation aux échanges consacrés aux enjeux de gouvernance migratoire.": "Participation in discussions on migration governance.",
      "Voir les actualités": "View news",
      "Vous souhaitez participer aux actions de la Fondation ou recevoir des informations ? Écrivez-nous pour connaître les modalités disponibles.": "Would you like to take part in the Foundation's work or receive information? Contact us to learn about the options available.",
      "Comment prendre contact ?": "How to get in touch",
      "Les priorités et axes d’intervention du plan stratégique 2024–2028 de SEA Foundation.": "The priorities and areas of work in SEA Foundation's 2024–2028 strategic plan.",
      "Les objectifs et les actions prévues sont détaillés dans la rubrique dédiée au plan stratégique.": "Objectives and planned activities are detailed in the strategic plan section.",
    }));
    const originalTextNodes = new WeakMap();
    const originalAttributes = new WeakMap();
    let siteLanguage = "fr";

    try {
      const savedLanguage = window.localStorage.getItem("sea-foundation-language");
      if (savedLanguage === "en" || savedLanguage === "fr") siteLanguage = savedLanguage;
    } catch (error) {
      console.error("Impossible de lire la langue enregistrée:", error);
    }

    const applySiteLanguage = (language) => {
      siteLanguage = language;
      document.documentElement.lang = language;

      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          if (node.parentElement?.closest("script, style, svg, [data-language-toggle]")) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      });

      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
        const original = originalTextNodes.get(node);
        if (language === "fr") {
          node.nodeValue = original;
          continue;
        }
        const trimmed = original.trim();
        const translation = englishCopy.get(trimmed);
        if (englishCopy.has(trimmed)) {
          const leading = original.match(/^\s*/)[0];
          const trailing = original.match(/\s*$/)[0];
          node.nodeValue = `${leading}${translation}${trailing}`;
        }
      }

      document.querySelectorAll("body *").forEach((element) => {
        if (element.matches("[data-language-toggle], script, style")) return;
        ["aria-label", "placeholder", "title", "alt"].forEach((attribute) => {
          if (!element.hasAttribute(attribute)) return;
          let attributes = originalAttributes.get(element);
          if (!attributes) {
            attributes = new Map();
            originalAttributes.set(element, attributes);
          }
          if (!attributes.has(attribute)) attributes.set(attribute, element.getAttribute(attribute));
          const original = attributes.get(attribute);
          element.setAttribute(attribute, language === "en" ? (englishCopy.get(original) || original) : original);
        });
      });

      const titleTranslation = englishCopy.get(document.title);
      if (!document.documentElement.dataset.originalTitle) {
        document.documentElement.dataset.originalTitle = document.title;
      }
      document.title = language === "en"
        ? titleTranslation || document.documentElement.dataset.originalTitle
        : document.documentElement.dataset.originalTitle;
      const description = document.querySelector('meta[name="description"]');
      if (description) {
        if (!description.dataset.originalContent) description.dataset.originalContent = description.content;
        description.content = language === "en"
          ? englishCopy.get(description.dataset.originalContent) || description.dataset.originalContent
          : description.dataset.originalContent;
      }

      document.querySelectorAll("[data-language-toggle]").forEach((button) => {
        button.textContent = language === "en" ? "FR" : "EN";
        button.setAttribute("aria-label", language === "en" ? "Switch the site to French" : "Switch the site to English");
        button.setAttribute("title", language === "en" ? "Français" : "English");
      });

      try {
        window.localStorage.setItem("sea-foundation-language", language);
      } catch (error) {
        console.error("Impossible d’enregistrer la langue choisie:", error);
      }
    };

    document.querySelectorAll("#primary-navigation, .site-page-nav").forEach((navigation) => {
      const placement = navigation.id === "primary-navigation"
        ? document.querySelector(".sea-topbar")
        : navigation.closest(".site-page-top");
      if (!placement) return;
      if (navigation.id !== "primary-navigation") {
        navigation.id = "site-page-navigation";
        const menuButton = document.createElement("button");
        menuButton.className = "site-page-menu-toggle";
        menuButton.type = "button";
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-controls", navigation.id);
        menuButton.setAttribute("aria-label", "Ouvrir le menu");
        menuButton.innerHTML = "<span></span><span></span>";
        menuButton.addEventListener("click", () => {
          const isOpen = menuButton.getAttribute("aria-expanded") === "true";
          menuButton.setAttribute("aria-expanded", String(!isOpen));
          menuButton.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
          navigation.classList.toggle("is-open", !isOpen);
        });
        navigation.addEventListener("click", (event) => {
          if (event.target instanceof Element && event.target.closest("a")) {
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Ouvrir le menu");
            navigation.classList.remove("is-open");
          }
        });
        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Ouvrir le menu");
            navigation.classList.remove("is-open");
            menuButton.focus();
          }
        });
        window.matchMedia("(min-width: 981px)").addEventListener("change", (event) => {
          if (event.matches) {
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Ouvrir le menu");
            navigation.classList.remove("is-open");
          }
        });
        placement.insertBefore(menuButton, navigation);
      }
      const languageButton = document.createElement("button");
      languageButton.className = "site-language-toggle";
      languageButton.type = "button";
      languageButton.dataset.languageToggle = "";
      languageButton.addEventListener("click", () => {
        applySiteLanguage(siteLanguage === "fr" ? "en" : "fr");
      });
      placement.append(languageButton);
    });

    const cookiePreferenceKey = "sea-foundation-cookie-preferences";
    const cookieBanner = document.createElement("section");
    cookieBanner.className = "cookie-consent";
    cookieBanner.setAttribute("aria-label", "Préférences de confidentialité");
    cookieBanner.setAttribute("aria-labelledby", "cookie-consent-title");
    cookieBanner.tabIndex = -1;
    cookieBanner.innerHTML = `
      <span class="cookie-consent__eyebrow">SEA FOUNDATION · CONFIDENTIALITÉ</span>
      <h2 id="cookie-consent-title">Votre choix concernant les cookies</h2>
      <p>Le stockage nécessaire conserve votre choix. Aucun outil publicitaire ou de mesure d’audience n’est actuellement activé. <a data-cookie-policy-link>En savoir plus</a></p>
      <div class="cookie-consent__actions">
        <button type="button" data-cookie-reject>Tout refuser</button>
        <button type="button" data-cookie-customize aria-expanded="false" aria-controls="cookie-consent-preferences">Personnaliser</button>
        <button type="button" data-cookie-accept>Tout accepter</button>
      </div>
      <div class="cookie-consent__preferences" id="cookie-consent-preferences" hidden>
        <label><input type="checkbox" checked disabled> Stockage nécessaire de votre choix — toujours actif</label>
        <label><input type="checkbox" data-cookie-analytics> Mesure d’audience — actuellement non activée</label>
        <p>Votre choix est conservé dans le stockage local de ce navigateur. Vous pourrez le modifier depuis la page Cookies.</p>
        <div class="cookie-consent__actions">
          <button type="button" data-cookie-save>Enregistrer mes choix</button>
        </div>
      </div>
      <p class="cookie-consent__status" data-cookie-status role="status" aria-live="polite"></p>
    `;
    document.body.append(cookieBanner);
    applySiteLanguage(siteLanguage);

    const cookiePolicyLink = cookieBanner.querySelector("[data-cookie-policy-link]");
    const cookieCustomizeButton = cookieBanner.querySelector("[data-cookie-customize]");
    const cookiePreferencesPanel = cookieBanner.querySelector("#cookie-consent-preferences");
    const cookieAnalyticsInput = cookieBanner.querySelector("[data-cookie-analytics]");
    const cookieStatus = cookieBanner.querySelector("[data-cookie-status]");
    let savedCookiePreferences = null;

    if (cookiePolicyLink instanceof HTMLAnchorElement) {
      cookiePolicyLink.href = currentScript instanceof HTMLScriptElement
        ? new URL("cookies/index.html", currentScript.src).href
        : "cookies/index.html";
    }

    try {
      const savedPreferences = window.localStorage.getItem(cookiePreferenceKey);
      if (savedPreferences) {
        const parsedPreferences = JSON.parse(savedPreferences);
        if (
          parsedPreferences
          && parsedPreferences.necessary === true
          && typeof parsedPreferences.analytics === "boolean"
        ) {
          savedCookiePreferences = parsedPreferences;
          cookieBanner.hidden = true;
        }
      }
    } catch (error) {
      console.error("Impossible de lire les préférences de cookies:", error);
      if (cookieStatus instanceof HTMLElement) {
        cookieStatus.textContent = "Le navigateur ne permet pas de lire vos préférences enregistrées.";
      }
    }

    const saveCookiePreferences = (analytics) => {
      const preferences = {
        necessary: true,
        analytics,
        updatedAt: new Date().toISOString(),
      };
      try {
        window.localStorage.setItem(cookiePreferenceKey, JSON.stringify(preferences));
        savedCookiePreferences = preferences;
        cookieBanner.hidden = true;
      } catch (error) {
        console.error("Impossible d’enregistrer les préférences de cookies:", error);
        if (cookieStatus instanceof HTMLElement) {
          cookieStatus.textContent = "Impossible d’enregistrer votre choix. Vérifiez les paramètres de confidentialité du navigateur.";
        }
      }
    };

    cookieBanner.querySelector("[data-cookie-accept]")?.addEventListener("click", () => {
      saveCookiePreferences(true);
    });
    cookieBanner.querySelector("[data-cookie-reject]")?.addEventListener("click", () => {
      saveCookiePreferences(false);
    });
    cookieCustomizeButton?.addEventListener("click", () => {
      const isOpen = cookieCustomizeButton.getAttribute("aria-expanded") === "true";
      cookieCustomizeButton.setAttribute("aria-expanded", String(!isOpen));
      if (cookiePreferencesPanel instanceof HTMLElement) cookiePreferencesPanel.hidden = isOpen;
      if (cookieAnalyticsInput instanceof HTMLInputElement) {
        cookieAnalyticsInput.checked = savedCookiePreferences?.analytics === true;
      }
    });
    cookieBanner.querySelector("[data-cookie-save]")?.addEventListener("click", () => {
      saveCookiePreferences(cookieAnalyticsInput instanceof HTMLInputElement && cookieAnalyticsInput.checked);
    });
    document.addEventListener("click", (event) => {
      if (!(event.target instanceof Element) || !event.target.closest("[data-cookie-open-settings]")) return;
      event.preventDefault();
      cookieBanner.hidden = false;
      if (cookiePreferencesPanel instanceof HTMLElement) cookiePreferencesPanel.hidden = false;
      if (cookieCustomizeButton instanceof HTMLButtonElement) {
        cookieCustomizeButton.setAttribute("aria-expanded", "true");
      }
      if (cookieAnalyticsInput instanceof HTMLInputElement) {
        cookieAnalyticsInput.checked = savedCookiePreferences?.analytics === true;
      }
      cookieBanner.focus({ preventScroll: true });
    });

    if (currentScript instanceof HTMLScriptElement) {
      const preloaderVisitKey = "sea-foundation-preloader-visited";
      let isRepeatVisit = false;
      try {
        isRepeatVisit = window.sessionStorage.getItem(preloaderVisitKey) === "true";
      } catch (error) {
        console.error("Impossible de lire l’état du préchargeur:", error);
      }

      const preloader = document.createElement("div");
      preloader.className = `site-preloader is-loading${isRepeatVisit ? " is-visited" : ""}`;
      preloader.setAttribute("aria-hidden", "true");
      const preloaderStartedAt = performance.now();
      const preloaderLineDuration = 3000;

      const loadingLine = document.createElement("span");
      loadingLine.className = "site-preloader__line";
      const logo = document.createElement("span");
      logo.className = "site-preloader__logo";
      logo.setAttribute("role", "img");
      logo.setAttribute("aria-label", "SEA Foundation");
      const whiteLogo = document.createElement("img");
      whiteLogo.className = "site-preloader__logo-base";
      whiteLogo.src = new URL("asset/1.png", currentScript.src).href;
      whiteLogo.alt = "";
      const colorLogo = document.createElement("img");
      colorLogo.className = "site-preloader__logo-color";
      colorLogo.src = new URL("asset/3.png", currentScript.src).href;
      colorLogo.alt = "";
      logo.append(whiteLogo, colorLogo);

      const errorPanel = document.createElement("div");
      errorPanel.className = "site-preloader__error";
      errorPanel.hidden = true;
      errorPanel.setAttribute("role", "alert");
      const errorTitle = document.createElement("h1");
      errorTitle.textContent = "Connexion impossible";
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Les premières images du site n’ont pas pu être chargées. Vérifiez votre connexion, puis actualisez la page.";
      const retryButton = document.createElement("button");
      retryButton.className = "site-preloader__retry";
      retryButton.type = "button";
      retryButton.textContent = "Actualiser";
      retryButton.addEventListener("click", () => window.location.reload());
      errorPanel.append(errorTitle, errorMessage, retryButton);

      preloader.append(loadingLine, logo, errorPanel);
      document.body.prepend(preloader);
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const collectFirstScreenImages = () => {
        const imageUrls = new Set([whiteLogo.src, colorLogo.src]);
        const sections = document.querySelectorAll(".sea-hero-wrap, #fondation");
        const backgroundUrlPattern = /url\((?:"([^"]+)"|'([^']+)'|([^)]*))\)/g;

        sections.forEach((section) => {
          const elements = [section, ...section.querySelectorAll("*")];
          elements.forEach((element) => {
            if (element instanceof HTMLImageElement) {
              const isHiddenSlide = element.closest("[aria-hidden='true']");
              if (!isHiddenSlide && (element.currentSrc || element.src)) {
                imageUrls.add(element.currentSrc || element.src);
              }
            }

            ["", "::before", "::after"].forEach((pseudoElement) => {
              const backgroundImage = window.getComputedStyle(element, pseudoElement).backgroundImage;
              for (const match of backgroundImage.matchAll(backgroundUrlPattern)) {
                const url = match[1] || match[2] || match[3];
                if (url) imageUrls.add(new URL(url.trim(), document.baseURI).href);
              }
            });
          });
        });

        return Array.from(imageUrls);
      };

      const loadImage = (src) => new Promise((resolve, reject) => {
        const image = new Image();
        const timeout = window.setTimeout(() => {
          reject(new Error(`Timed out loading ${src}`));
        }, 12000);
        const fail = () => {
          window.clearTimeout(timeout);
          reject(new Error(`Could not load ${src}`));
        };
        image.onerror = fail;
        image.onload = () => {
          if (!image.naturalWidth) {
            fail();
            return;
          }
          const decode = typeof image.decode === "function"
            ? Promise.resolve().then(() => image.decode())
            : Promise.resolve();
          decode.then(() => {
            window.clearTimeout(timeout);
            resolve();
          }, fail);
        };
        image.src = src;
        if (image.complete && image.naturalWidth) image.onload();
      });

      const openSite = () => {
        preloader.classList.add("is-opening");
        let preloaderRemoved = false;
        const removePreloader = () => {
          if (preloaderRemoved) return;
          preloaderRemoved = true;
          document.body.style.overflow = previousOverflow;
          lenisInstance?.start();
          preloader.remove();
        };
        preloader.addEventListener("transitionend", (event) => {
          if (event.target === preloader && event.propertyName === "transform") {
            removePreloader();
          }
        });
        window.setTimeout(removePreloader, isRepeatVisit ? 500 : motionPreference.matches ? 100 : 1600);
      };

      Promise.all(collectFirstScreenImages().map(loadImage)).then(() => {
        try {
          window.sessionStorage.setItem(preloaderVisitKey, "true");
        } catch (error) {
          console.error("Impossible d’enregistrer l’état du préchargeur:", error);
        }

        const showLogo = () => {
          preloader.classList.remove("is-loading");
          preloader.classList.add("is-logo-visible", "is-logo-colored");
          if (motionPreference.matches) {
            window.setTimeout(openSite, 100);
            return;
          }
          window.setTimeout(openSite, isRepeatVisit ? 550 : 3000);
        };

        if (motionPreference.matches) {
          showLogo();
          return;
        }

        if (isRepeatVisit) {
          showLogo();
          return;
        }

        const lineTimeRemaining = Math.max(0, preloaderLineDuration - (performance.now() - preloaderStartedAt));
        window.setTimeout(showLogo, lineTimeRemaining);
      }).catch((error) => {
        console.error("The first two sections could not be loaded.", error);
        preloader.classList.remove("is-loading");
        preloader.classList.add("has-error");
        preloader.removeAttribute("aria-hidden");
        loadingLine.hidden = true;
        logo.hidden = true;
        errorPanel.hidden = false;
        retryButton.focus({ preventScroll: true });
      });
    }

    const headerLogos = document.querySelectorAll(".sea-brand-wrap .sea-logo, .site-page-brand .sea-logo-fill");
    headerLogos.forEach((logo) => {
      const fillLogo = () => logo.classList.add("is-logo-filled");
      logo.addEventListener("pointerenter", fillLogo, { once: true });
      logo.closest("a")?.addEventListener("focus", fillLogo, { once: true });
    });

    const logosOnView = document.querySelectorAll(".footer .brand-mark, .footer-logo .sea-logo-fill, .brand-showcase .sea-logo-fill");
    if ("IntersectionObserver" in window) {
      const logoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-logo-filled");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.15 });
      logosOnView.forEach((logo) => logoObserver.observe(logo));
    } else {
      logosOnView.forEach((logo) => logo.classList.add("is-logo-filled"));
    }

    const chatPanel = document.querySelector("#ai-chat-panel");
    const chatAside = document.querySelector(".ai-chat");
    const chatBackdrop = document.querySelector("[data-chat-backdrop]");
    const chatOpenButton = document.querySelector("[data-chat-open]");
    const chatCloseButton = document.querySelector("[data-chat-close]");
    const chatForm = document.querySelector("[data-chat-form]");
    const chatInput = document.querySelector("#ai-chat-input");
    const chatMessages = document.querySelector("[data-chat-messages]");

    if (
      chatPanel instanceof HTMLElement
      && chatAside instanceof HTMLElement
      && chatBackdrop instanceof HTMLButtonElement
      && chatOpenButton instanceof HTMLButtonElement
      && chatCloseButton instanceof HTMLButtonElement
      && chatForm instanceof HTMLFormElement
      && chatInput instanceof HTMLInputElement
      && chatMessages instanceof HTMLElement
    ) {
      const chatHistory = [];
      let previousBodyOverflow = "";

      const setChatOpen = (isOpen) => {
        chatPanel.hidden = !isOpen;
        chatBackdrop.hidden = !isOpen;
        chatAside.classList.toggle("is-open", isOpen);
        chatOpenButton.setAttribute("aria-expanded", String(isOpen));
        if (isOpen) {
          previousBodyOverflow = document.body.style.overflow;
          document.body.style.overflow = "hidden";
          lenisInstance?.stop();
          chatPanel.scrollTop = 0;
          chatInput.focus({ preventScroll: true });
        } else {
          document.body.style.overflow = previousBodyOverflow;
          if (!document.body.style.overflow) lenisInstance?.start();
          chatOpenButton.focus();
        }
      };

      const addChatMessage = (content, className) => {
        const message = document.createElement("p");
        message.className = `ai-chat-message ${className}`;
        message.textContent = content;
        chatMessages.append(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return message;
      };

      const addThinkingMessage = () => {
        const message = document.createElement("p");
        message.className = "ai-chat-message ai-chat-message--assistant ai-chat-thinking";
        message.setAttribute("role", "status");
        message.setAttribute("aria-label", siteLanguage === "en" ? "Assistant is replying" : "L’assistant prépare sa réponse");
        for (let index = 0; index < 3; index += 1) {
          const dot = document.createElement("span");
          dot.className = "ai-chat-thinking__dot";
          dot.setAttribute("aria-hidden", "true");
          message.append(dot);
        }
        chatMessages.append(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return message;
      };

      const revealAssistantReply = (message, reply) => {
        const fragment = document.createDocumentFragment();
        let wordIndex = 0;
        reply.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            fragment.append(document.createTextNode(part));
            return;
          }
          const word = document.createElement("span");
          word.className = "ai-chat-word";
          word.style.setProperty("--word-delay", `${Math.min(wordIndex * 12, 420)}ms`);
          word.textContent = part;
          fragment.append(word);
          wordIndex += 1;
        });
        message.replaceChildren(fragment);
        message.removeAttribute("role");
        message.removeAttribute("aria-label");
        message.setAttribute("aria-label", reply);
        message.classList.add("ai-chat-message--revealing");
        requestAnimationFrame(() => message.classList.add("is-visible"));
        chatMessages.scrollTop = chatMessages.scrollHeight;
      };

      chatOpenButton.addEventListener("click", () => setChatOpen(true));
      chatCloseButton.addEventListener("click", () => setChatOpen(false));
      chatBackdrop.addEventListener("click", () => setChatOpen(false));

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !chatPanel.hidden) {
          setChatOpen(false);
          return;
        }

        if (event.key !== "Tab" || chatPanel.hidden) return;
        const focusableElements = [...chatPanel.querySelectorAll(
          "button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])"
        )].filter((element) => element instanceof HTMLElement && element.getClientRects().length > 0);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (!firstElement || !lastElement) return;
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      });

      chatForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const content = chatInput.value.trim();
        if (!content) return;

        chatInput.value = "";
        addChatMessage(content, "ai-chat-message--user");
        const submitButton = chatForm.querySelector('button[type="submit"]');
        if (submitButton instanceof HTMLButtonElement) submitButton.disabled = true;
        const pendingMessage = addThinkingMessage();

        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              language: siteLanguage,
              messages: [...chatHistory, { role: "user", content }],
            }),
          });
          const result = await response.json();
          if (!response.ok) {
            const apiMessage = typeof result?.error?.message === "string"
              ? result.error.message
              : `La requête a échoué (HTTP ${response.status}).`;
            throw new Error(apiMessage);
          }

          const reply = result?.reply;
          if (typeof reply !== "string" || !reply.trim()) {
            throw new Error("L’IA n’a pas renvoyé de réponse. Réessayez dans un instant.");
          }

          revealAssistantReply(pendingMessage, reply.trim());
          chatHistory.push({ role: "user", content }, { role: "assistant", content: reply.trim() });
          if (chatHistory.length > 16) chatHistory.splice(0, chatHistory.length - 16);
        } catch (error) {
          pendingMessage.classList.add("ai-chat-message--error");
          pendingMessage.textContent = error instanceof TypeError
            ? siteLanguage === "en"
              ? "Unable to reach the server. Run “npm start”, then open the site at http://127.0.0.1:4173/."
              : "Impossible de contacter le serveur. Lancez-le avec « npm start », puis ouvrez le site sur http://127.0.0.1:4173/."
            : error instanceof Error
              ? `Impossible de contacter l’assistant : ${error.message}`
              : siteLanguage === "en"
                ? "Unable to contact the assistant. Check that the server is running."
                : "Impossible de contacter l’assistant. Vérifiez que le serveur est démarré.";
        } finally {
          if (submitButton instanceof HTMLButtonElement) submitButton.disabled = false;
          chatInput.focus({ preventScroll: true });
        }
      });
    }

    const kindnessStatement = document.querySelector(".kindness-statement");

    if (kindnessStatement) {
      const kindnessWords = Array.from(kindnessStatement.querySelectorAll("span"));

      const updateKindnessReveal = () => {
        if (motionPreference.matches) {
          kindnessWords.forEach((word) => word.style.setProperty("--word-reveal", "1"));
          return;
        }

        const bounds = kindnessStatement.getBoundingClientRect();
        const start = window.innerHeight * .82;
        const finish = window.innerHeight * .18;
        const progress = Math.min(Math.max((start - bounds.top) / (bounds.height + start - finish), 0), 1);
        const revealRange = kindnessWords.length + 1;

        kindnessWords.forEach((word, index) => {
          const reveal = Math.min(Math.max(progress * revealRange - index, 0), 1);
          word.style.setProperty("--word-reveal", String(.18 + reveal * .82));
        });
      };

      onScroll(updateKindnessReveal);
      window.addEventListener("resize", updateKindnessReveal);
      motionPreference.addEventListener("change", updateKindnessReveal);
      updateKindnessReveal();
    }

    const responsiveMenuButton = document.querySelector(".sea-menu-toggle");
    const primaryNavigation = document.querySelector("#primary-navigation");
    const responsiveHeader = document.querySelector(".sea-header-panel");
    const desktopNavHover = window.matchMedia("(min-width: 981px) and (hover: hover)");
    const desktopNavGroups = primaryNavigation?.querySelectorAll(".sea-nav-group");

    desktopNavGroups?.forEach((group) => {
      group.addEventListener("pointerenter", (event) => {
        if (!desktopNavHover.matches || event.pointerType === "touch") return;
        desktopNavGroups.forEach((otherGroup) => {
          if (otherGroup !== group) otherGroup.removeAttribute("open");
        });
        group.setAttribute("open", "");
      });

      group.addEventListener("pointerleave", () => {
        if (!desktopNavHover.matches || group.contains(document.activeElement)) return;
        group.removeAttribute("open");
      });

      group.addEventListener("focusin", () => {
        if (desktopNavHover.matches) group.setAttribute("open", "");
      });

      group.addEventListener("focusout", (event) => {
        if (
          !desktopNavHover.matches
          || group.contains(event.relatedTarget)
          || group.matches(":hover")
        ) return;
        group.removeAttribute("open");
      });
    });

    desktopNavHover.addEventListener("change", (event) => {
      if (!event.matches) {
        desktopNavGroups?.forEach((group) => group.removeAttribute("open"));
      }
    });

    if (responsiveMenuButton && primaryNavigation) {
      let previousMenuBodyOverflow = "";
      const closeResponsiveMenu = () => {
        responsiveMenuButton.setAttribute("aria-expanded", "false");
        responsiveMenuButton.setAttribute("aria-label", "Ouvrir le menu");
        primaryNavigation.classList.remove("is-open");
        responsiveHeader?.classList.remove("is-menu-open");
        responsiveHeader?.querySelectorAll(".sea-nav-group[open]").forEach((group) => {
          group.removeAttribute("open");
        });
        document.body.style.overflow = previousMenuBodyOverflow;
        if (!document.body.style.overflow) lenisInstance?.start();
      };

      responsiveMenuButton.addEventListener("click", () => {
        const isOpen = responsiveMenuButton.getAttribute("aria-expanded") === "true";
        responsiveMenuButton.setAttribute("aria-expanded", String(!isOpen));
        responsiveMenuButton.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
        primaryNavigation.classList.toggle("is-open", !isOpen);
        responsiveHeader?.classList.toggle("is-menu-open", !isOpen);
        if (!isOpen) {
          previousMenuBodyOverflow = document.body.style.overflow;
          document.body.style.overflow = "hidden";
          lenisInstance?.stop();
        } else {
          document.body.style.overflow = previousMenuBodyOverflow;
          if (!document.body.style.overflow) lenisInstance?.start();
        }
      });

      primaryNavigation.addEventListener("click", (event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
          closeResponsiveMenu();
        }
      });

      document.addEventListener("pointerdown", (event) => {
        if (
          responsiveMenuButton.getAttribute("aria-expanded") === "true"
          && event.target instanceof Node
          && !responsiveHeader?.contains(event.target)
        ) {
          closeResponsiveMenu();
        }
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && responsiveMenuButton.getAttribute("aria-expanded") === "true") {
          closeResponsiveMenu();
          responsiveMenuButton.focus();
        }
      });

      window.matchMedia("(min-width: 981px)").addEventListener("change", (event) => {
        if (event.matches) closeResponsiveMenu();
      });
    }

    const revealTargets = document.querySelectorAll('main [class*="-card"]:not(.partner-card)');

    if (!motionPreference.matches && revealTargets.length) {
      if ("IntersectionObserver" in window) {
        document.body.classList.add("has-reveal");
        const revealObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

        revealTargets.forEach((target, index) => {
          target.classList.add("reveal-item");
          if (target.matches("[class*=\"-card\"]")) {
            target.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
          }
          revealObserver.observe(target);
        });
      } else {
        revealTargets.forEach((target) => target.classList.add("is-revealed"));
      }
    }

    const menuButton = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const yearNode = document.querySelector("#year");
    const scrollProgress = document.querySelector(".scroll-progress");
    const heroSection = document.querySelector("#accueil");
    const headerPanel = document.querySelector(".sea-header-panel");
    const setMenuIcon = (isOpen) => {
      if (!(menuButton instanceof HTMLButtonElement)) return;
      const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      icon.setAttribute("viewBox", "0 0 24 24");
      icon.setAttribute("aria-hidden", "true");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", isOpen ? "M6 6 18 18M18 6 6 18" : "M4 6h16M4 12h16M4 18h16");
      icon.append(path);
      menuButton.replaceChildren(icon);
    };

    if (heroSection && headerPanel) {
      const headerWrap = headerPanel.closest(".sea-hero-wrap");
      const headerPanelSpace = headerWrap
        ? heroSection.getBoundingClientRect().top - headerWrap.getBoundingClientRect().top
        : headerPanel.offsetHeight;
      if (headerWrap) {
        headerWrap.style.setProperty("--header-panel-space", `${headerPanelSpace}px`);
      }

      let previousScrollY = window.scrollY;
      let heroBottom = heroSection.getBoundingClientRect().bottom + window.scrollY;

      onScroll(() => {
        const currentScrollY = window.scrollY;
        const isPastHero = currentScrollY >= heroBottom;
        const scrollDelta = currentScrollY - previousScrollY;

        if (!isPastHero) {
          headerPanel.classList.remove("is-scroll-nav", "is-scroll-nav-hidden");
          headerWrap?.classList.remove("has-fixed-nav");
        } else if (scrollDelta < 0) {
          headerPanel.classList.add("is-scroll-nav");
          headerPanel.classList.remove("is-scroll-nav-hidden");
          headerWrap?.classList.add("has-fixed-nav");
        } else if (scrollDelta > 0) {
          headerPanel.classList.add("is-scroll-nav", "is-scroll-nav-hidden");
          headerWrap?.classList.add("has-fixed-nav");
        }
        previousScrollY = currentScrollY;
      });
      window.addEventListener("resize", () => {
        heroBottom = heroSection.getBoundingClientRect().bottom + window.scrollY;
        scheduleScrollEffects();
      });
    }
    const faqSection = document.querySelector("#faq");
    const footer = document.querySelector(".footer");

    if (faqSection && footer) {
      const updateClosingBackground = () => {
        const faqTop = faqSection.getBoundingClientRect().top;
        const footerBottom = footer.getBoundingClientRect().bottom;
        document.body.classList.toggle(
          "closing-background-active",
          faqTop < window.innerHeight && footerBottom > 0
        );
      };

      onScroll(updateClosingBackground);
      window.addEventListener("resize", updateClosingBackground);
      updateClosingBackground();
    }

    const closeMenu = () => {
      if (!menuButton || !navLinks) return;
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Ouvrir le menu");
      setMenuIcon(false);
      navLinks.classList.remove("open");
      navLinks.querySelectorAll("details[open]").forEach((dropdown) => {
        dropdown.open = false;
      });
    };

    if (menuButton && navLinks) {
      menuButton.addEventListener("click", () => {
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
        setMenuIcon(!isOpen);
        navLinks.classList.toggle("open", !isOpen);
      });

      navLinks.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
          closeMenu();
        }
      });
    }

    if (yearNode) {
      yearNode.textContent = new Date().getFullYear();
    }

    const partnerTrack = document.querySelector("#partner-track");

    if (partnerTrack) {
      const originalCards = Array.from(partnerTrack.children);
      const originalGroup = document.createElement("div");
      originalGroup.className = "partner-track__group";
      originalCards.forEach((card) => originalGroup.append(card));

      const duplicateGroup = document.createElement("div");
      duplicateGroup.className = "partner-track__group";
      duplicateGroup.setAttribute("aria-hidden", "true");
      const duplicateCards = document.createDocumentFragment();
      originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.querySelectorAll("img").forEach((image) => {
          image.alt = "";
          image.draggable = false;
        });
        duplicateCards.append(clone);
      });
      duplicateGroup.append(duplicateCards);
      partnerTrack.replaceChildren(originalGroup, duplicateGroup);
      partnerTrack.querySelectorAll("img").forEach((image) => {
        image.draggable = false;
      });
    }

    document.querySelectorAll("[data-slide][aria-controls]").forEach((button) => {
      button.addEventListener("click", () => {
        const track = document.getElementById(button.getAttribute("aria-controls"));
        if (!track) return;
        const direction = button.dataset.slide === "next" ? 1 : -1;
        const cards = Array.from(track.children);
        const trackLeft = track.getBoundingClientRect().left;
        const target = direction > 0
          ? cards.find((card) => card.getBoundingClientRect().left > trackLeft + 8)
          : cards.slice().reverse().find((card) => card.getBoundingClientRect().left < trackLeft - 8);
        if (!target) return;
        const targetLeft = track.scrollLeft + target.getBoundingClientRect().left - trackLeft;
        track.scrollTo({ left: targetLeft, behavior: "smooth" });
      });
    });

    const newsSlider = document.querySelector("[data-news-slider]");
    if (newsSlider) {
      const newsSlides = Array.from(newsSlider.querySelectorAll("[data-news-slide]"));
      const newsDots = Array.from(newsSlider.querySelectorAll("[data-news-go]"));
      let activeNewsIndex = newsSlides.findIndex((slide) => slide.classList.contains("is-active"));
      if (activeNewsIndex < 0) activeNewsIndex = 0;

      const showNewsSlide = (index) => {
        activeNewsIndex = (index + newsSlides.length) % newsSlides.length;
        newsSlides.forEach((slide, slideIndex) => {
          const isActive = slideIndex === activeNewsIndex;
          slide.classList.toggle("is-active", isActive);
          slide.setAttribute("aria-hidden", String(!isActive));
        });
        newsDots.forEach((dot, dotIndex) => {
          if (dotIndex === activeNewsIndex) {
            dot.setAttribute("aria-current", "true");
          } else {
            dot.removeAttribute("aria-current");
          }
        });
      };

      newsSlider.querySelector("[data-news-previous]")?.addEventListener("click", () => {
        showNewsSlide(activeNewsIndex - 1);
      });
      newsSlider.querySelector("[data-news-next]")?.addEventListener("click", () => {
        showNewsSlide(activeNewsIndex + 1);
      });
      newsDots.forEach((dot) => {
        dot.addEventListener("click", () => {
          showNewsSlide(Number(dot.dataset.newsGo));
        });
      });
    }

    const priorityTrack = document.querySelector("#priority-track");
    if (priorityTrack) {
      const priorityCards = Array.from(priorityTrack.querySelectorAll(".priority-card"));
      const desktopLayout = window.matchMedia("(min-width: 741px)");

      const activatePriority = (card) => {
        if (!desktopLayout.matches) return;
        priorityCards.forEach((priorityCard) => {
          const isActive = priorityCard === card;
          priorityCard.classList.toggle("priority-card--active", isActive);
          priorityCard.setAttribute("aria-expanded", String(isActive));
        });

        requestAnimationFrame(() => {
          const trackBounds = priorityTrack.getBoundingClientRect();
          const cardBounds = card.getBoundingClientRect();
          if (cardBounds.left < trackBounds.left) {
            priorityTrack.scrollBy({ left: cardBounds.left - trackBounds.left, behavior: "smooth" });
          } else if (cardBounds.right > trackBounds.right) {
            priorityTrack.scrollBy({ left: cardBounds.right - trackBounds.right, behavior: "smooth" });
          }
        });
      };

      priorityCards.forEach((card) => {
        card.addEventListener("click", (event) => {
          if (!event.target.closest("a")) activatePriority(card);
        });
        card.addEventListener("keydown", (event) => {
          if ((event.key === "Enter" || event.key === " ") && event.target === card) {
            event.preventDefault();
            activatePriority(card);
          }
        });
      });
    }

    if (scrollProgress) {
      const updateScrollProgress = () => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0
          ? Math.min(window.scrollY / scrollableHeight, 1)
          : 0;
        scrollProgress.style.setProperty("--scroll-progress", `${progress * 100}%`);

      };

      onScroll(updateScrollProgress);
      window.addEventListener("resize", updateScrollProgress);
      updateScrollProgress();
    }
