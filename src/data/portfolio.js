// ============================================================
// CONTENU DU PORTFOLIO — Alassane Gueye
// ============================================================

import dims from '../assets/images/dimensions.json';

// Captures des applications mobiles
import fm1 from '../assets/images/fm-1.webp';
import fm2 from '../assets/images/fm-2.webp';
import fm3 from '../assets/images/fm-3.webp';
import fm4 from '../assets/images/fm-4.webp';
import fm5 from '../assets/images/fm-5.webp';
import fm6 from '../assets/images/fm-6.webp';
import y1 from '../assets/images/y1.webp';
import y2 from '../assets/images/y2.webp';
import y3 from '../assets/images/y3.webp';
import y4 from '../assets/images/y4.webp';
import k1 from '../assets/images/k1.webp';
import k2 from '../assets/images/k2.webp';
import k3 from '../assets/images/k3.webp';
import k4 from '../assets/images/k4.webp';
import dashSigns1 from '../assets/images/dash-signs-1.webp';
import dashSigns2 from '../assets/images/dash-signs-2.webp';
import dashYobante1 from '../assets/images/dash-yobante-1.webp';
import dashYobante2 from '../assets/images/dash-yobante-2.webp';

// Projets web : site vitrine et portfolio photographe
import divinite1 from '../assets/images/divinite1.mp4';
import divinite2 from '../assets/images/divinite2.webp';
import divinite3 from '../assets/images/divinite3.webp';
import divinite4 from '../assets/images/divinite4.webp';
import portfolio1 from '../assets/images/Portfolio1.webp';
import portfolio2 from '../assets/images/Portfolio2.webp';
import portfolio3 from '../assets/images/Portfolio3.webp';
import portfolio4 from '../assets/images/portfolio4.webp';
import signs1 from '../assets/images/signs-1.webp';
import signs2 from '../assets/images/signs-2.webp';
import signs3 from '../assets/images/signs-3.webp';
import signs4 from '../assets/images/signs-4.webp';
import signs5 from '../assets/images/signs-5.webp';
import profilImg from '../assets/images/profil.jpeg';

export const profile = {
  name: 'Alassane GUEYE',
  firstName: 'Alassane',
  roles: [
    'Data Scientist Junior',
    'Développeur Full Stack Junior',
    'Développeur Mobile Flutter',
  ],
  role: 'Data Scientist & Développeur Full Stack',
  roleHero: ['Data Scientist', 'Full Stack'],
  status: 'Disponible pour de nouveaux projets',
  tagline: "Data Scientist et Développeur Full Stack & Mobile. De l'analyse de données aux applications web et Flutter, je construis des produits complets, modernes et utiles.",
  location: 'Ouakam, Dakar',
  email: 'alassanegpro@gmail.com',
  phone: '+221 77 592 93 90',
  links: {
    linkedin: 'https://www.linkedin.com/in/alassane-gueye-216302283',
    github: 'https://github.com/Alassanegueye',
    gitlab: null,
  },
  cvUrl: '/cv-alassane-gueye.pdf',
  photo: profilImg,
};

export const aboutNarrative = [
  'Je ne suis pas devenu développeur pour écrire du code.',
  'Je voulais comprendre comment les choses fonctionnent.',
  'Et apprendre à les construire.',
  'Aujourd\'hui, je navigue entre le frontend, le backend, le mobile et la data.',
  'Chaque projet est une excuse pour aller plus loin.',
];

export const skillsCategories = [
  {
    id: 'data',
    label: 'Data Science',
    title: 'Données & modèles',
    tag: 'Python',
    description:
      "Le cœur de ma formation : préparer une donnée exploitable, la faire parler, puis l'utiliser pour prédire.",
    color: 'bleu',
    icon: 'Brain',
    items: [
      { name: 'Python', level: 85 },
      { name: 'Pandas / NumPy', level: 80 },
      { name: 'Scikit-learn', level: 75 },
      { name: 'Machine Learning', level: 72 },
      { name: 'Nettoyage & préparation', level: 82 },
      { name: 'SQL', level: 80 },
    ],
  },
  {
    id: 'bi',
    label: 'Data & BI',
    title: 'Analyse & visualisation',
    tag: 'Power BI',
    description:
      'Transformer des chiffres en décisions : tableaux de bord, rapports de suivi et visualisations lisibles par des non-spécialistes.',
    color: 'vert',
    icon: 'ChartBar',
    items: [
      { name: 'Power BI', level: 75 },
      { name: 'Matplotlib / Seaborn', level: 78 },
      { name: 'Tableaux de bord', level: 78 },
      { name: 'Web scraping & APIs', level: 72 },
      { name: 'Streamlit', level: 70 },
    ],
  },
  {
    id: 'web',
    label: 'Développement Web',
    title: 'Applications web',
    tag: 'Full stack',
    description:
      "De l'interface à l'API : des applications complètes, avec un front soigné et un back documenté.",
    color: 'orange',
    icon: 'Code',
    items: [
      { name: 'React.js', level: 85 },
      { name: 'Angular', level: 72 },
      { name: 'HTML / CSS / Bootstrap', level: 88 },
      { name: 'Node.js', level: 80 },
      { name: 'Symfony', level: 72 },
      { name: 'API REST / API Platform', level: 80 },
    ],
  },
  {
    id: 'mobile',
    label: 'Développement Mobile',
    title: 'Applications mobiles',
    tag: 'Flutter',
    description:
      'Une base de code, deux plateformes : des applications Android et iOS branchées sur les mêmes API que le web.',
    color: 'vert',
    icon: 'Smartphone',
    items: [
      { name: 'Flutter / Dart', level: 82 },
      { name: 'Applications Android', level: 80 },
      { name: 'Consommation d\'API REST', level: 85 },
      { name: 'Android Studio', level: 75 },
    ],
  },
  {
    id: 'bdd',
    label: 'Bases de données',
    title: 'Données persistantes',
    tag: 'SQL & NoSQL',
    description:
      'Modéliser avant de coder : des schémas qui tiennent, des requêtes qui restent lisibles.',
    color: 'bleu',
    icon: 'Database',
    items: [
      { name: 'SQL', level: 82 },
      { name: 'MySQL', level: 80 },
      { name: 'PostgreSQL', level: 78 },
      { name: 'MongoDB', level: 68 },
    ],
  },
  {
    id: 'outils',
    label: 'Outils & Environnements',
    title: 'Outillage',
    tag: 'Workflow',
    description:
      'Ce qui fait tenir un projet au quotidien : versionner, tester ses API, reproduire un environnement.',
    color: 'gris',
    icon: 'Settings',
    items: [
      { name: 'Git / GitHub / GitLab', level: 88 },
      { name: 'Docker', level: 72 },
      { name: 'Postman / Bruno', level: 82 },
      { name: 'VS Code', level: 92 },
      { name: 'Linux', level: 70 },
    ],
  },
];

const projectsSource = [
  {
    id: 'lebalma',
    title: 'LEBALMA',
    tagline: 'Application web & mobile de gestion de services',
    stack: ['Angular', 'Symfony', 'API Platform', 'Flutter', 'PostgreSQL', 'Docker', 'GitLab CI'],
    images: {
      hero: null, // /projects/lebalma-hero.jpg
      desktop: null, // /projects/lebalma-desktop.png
      mobile: null, // /projects/lebalma-mobile.png
    },
    links: {
      live: null,
      repo: null,
    },
    featured: true,
    category: 'Full Stack',
  },
  {
    id: 'africodex',
    title: 'Africodex Digital',
    tagline: 'Solutions digitales sur mesure',
    stack: ['React', 'Node.js', 'Vue.js', 'PostgreSQL', 'Docker', 'AWS'],
    images: {
      hero: null,
      desktop: null,
      mobile: null,
    },
    links: {
      live: 'https://www.africodexdigital.com/',
      repo: null,
    },
    featured: false,
    category: 'Web App',
  },
  {
    id: 'sonatel-bots',
    title: 'Chatbots & Voicebots Sonatel',
    tagline: 'IA conversationnelle en production',
    stack: ['Python', 'FastAPI', 'Rasa', 'PostgreSQL', 'Docker', 'Kubernetes'],
    images: {
      hero: null,
      desktop: null,
      mobile: null,
    },
    links: {
      live: null,
      repo: null,
    },
    featured: false,
    category: 'IA / Chatbot',
  },
  {
    id: 'cx-dashboard',
    title: 'Dashboard Customer Experience',
    tagline: 'Analyse satisfaction client & data viz',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit', 'Power BI', 'PostgreSQL'],
    images: {
      hero: null,
      desktop: null,
      mobile: null,
    },
    links: {
      live: null,
      repo: null,
    },
    featured: false,
    category: 'Data / Dashboard',
  },
  {
    id: 'jendal',
    title: 'Jëndal Marketplace',
    tagline: 'Marketplace mobile multi-vendeurs',
    stack: ['Flutter', 'Dart', 'Riverpod', 'Node.js', 'Firebase', 'WebSocket'],
    images: {
      hero: null,
      desktop: null,
      mobile: null,
    },
    links: {
      live: null,
      repo: null,
    },
    featured: false,
    category: 'Mobile / Marketplace',
  },
];

const experiencesSource = [
  {
    id: 'lebalma',
    role: 'Stagiaire Développeur Web Full Stack',
    company: 'LEBALMA',
    period: 'Août 2026 → Novembre 2026',
    enCours: true,
    location: 'Ouakam, Dakar',
    description:
      "Évolution et maintenance des applications web et mobiles existantes. Développement et documentation d'API, intégration des interfaces front-end. Correction des anomalies et mise en œuvre de nouvelles fonctionnalités. Collaboration avec l'équipe technique sur la qualité et la continuité des projets.",
    highlights: ['Angular + Symfony + Flutter', 'API Platform', 'Docker + GitLab', 'Équipe technique'],
  },
  {
    id: 'africodex',
    role: 'Co-fondateur & Développeur Full Stack',
    company: 'Africodex Digital',
    period: 'Mars 2026 → Présent',
    location: 'Dakar, Sénégal',
    description:
      "Conception et développement d'applications web et mobiles full stack. Mise en place de solutions digitales adaptées aux besoins des clients. Gestion technique et coordination des projets numériques.",
    highlights: ['React + Node.js', 'Flutter', 'Direction technique', 'Relation client'],
  },
  {
    id: 'sonatel-ia',
    role: 'Stagiaire Développeur IA Conversationnelle',
    company: 'Sonatel',
    period: 'Mai 2026 → Juillet 2026',
    location: 'Mermoz Baobab, Dakar',
    description:
      "Développement de solutions d'IA conversationnelle : chatbots et voicebots. Automatisation des réponses pour améliorer l'expérience utilisateur. Traitement automatique des demandes clients. Contribution à des projets d'IA appliquée en environnement entreprise.",
    highlights: ['Chatbots & voicebots', 'NLP', 'Automatisation', 'IA appliquée'],
  },
  {
    id: 'sonatel-data',
    role: 'Stagiaire Data Analyst — Customer Experience',
    company: 'Sonatel',
    period: 'Janvier 2026 → Avril 2026',
    location: 'Mermoz Baobab, Dakar',
    description:
      "Analyse des données clients pour identifier les tendances et les points de friction. Construction de rapports de suivi de la satisfaction et de l'efficacité des actions correctives. Recommandations fondées sur les données, en lien avec l'équipe expérience client.",
    highlights: ['Analyse client', 'Tableaux de bord', 'Recommandations', 'Satisfaction'],
  },
  {
    id: 'nutrivie',
    role: 'Chargé de gestion administrative & relation client',
    company: 'Nutrivie',
    period: 'Novembre 2024 → Présent',
    location: 'Ouakam, Dakar',
    description:
      "Gestion des flux de commandes et suivi client. Traitement et contrôle des factures. Suivi des paiements et gestion administrative. Coordination entre les clients et les équipes opérationnelles.",
    highlights: ['Suivi client', 'Facturation', 'Coordination'],
  },
];

export const journey = [
  {
    year: '2026',
    title: 'Data Scientist Bootcamp',
    org: 'GoMyCode — Point E, Dakar',
    kind: 'Formation',
    color: 'bleu',
    text: "Statistiques, Python, SQL, collecte et visualisation de données, machine learning et deep learning, jusqu'au déploiement d'applications avec Streamlit.",
  },
  {
    year: '2025',
    title: 'Licence Informatique de Gestion — Science des Données',
    org: 'Institut Africain de Management — Mermoz, Dakar',
    kind: 'Formation',
    color: 'orange',
    text: 'Business intelligence, programmation (Python, Java, C++, JavaScript, PHP), développement web, modélisation de bases de données, systèmes et réseaux.',
  },
  {
    year: '2022',
    title: 'Baccalauréat S2 — Sciences Naturelles',
    org: 'Lycée Amath Dansokho — Ouakam, Dakar',
    kind: 'Formation',
    color: 'gris',
    text: 'Série scientifique : la rigueur et la logique avant le code.',
  },
];

export const limits = [
  { title: 'Architecture système complexe', desc: 'Je conçois des APIs et services, mais l\'architecture distribuée à grande échelle (microservices, event-driven) reste un terrain d\'exploration.' },
  { title: 'DevOps avancé / K8s production', desc: 'Docker et CI/CD quotidiens maîtrisés. Kubernetes en production, Helm, operators, GitOps : en apprentissage actif.' },
  { title: 'ML Ops & Modèles en production', desc: 'Entraînement et expérimentation OK. Monitoring modèles, drift detection, A/B testing, feature stores : à approfondir.' },
  { title: 'Infrastructure Cloud (AWS/GCP)', desc: 'Déploiements basiques faits. Terraform, VPC, networking avancé, serverless, coûts : niveau junior.' },
  { title: 'Tests automatisés complets', desc: 'Unitaires et intégration faits. E2E (Playwright/Cypress), contract testing, mutation testing, coverage stratégies : à systématiser.' },
  { title: 'Accessibilité (a11y) avancée', desc: 'Bonnes pratiques de base. Audits WCAG 2.1 AA, tests lecteurs d\'écran, patterns ARIA complexes : en progression.' },
];

export const chatbotMessages = {
  hero: [
    'Tu veux vraiment savoir qui il est ?',
    'Ne pars pas tout de suite.',
    'Je pourrais te présenter Alassane... mais continue d\'abord.',
    'Il y a plus à voir.',
    'Tu viens juste d\'arriver.',
  ],
  about: [
    'Tu veux savoir qui est vraiment derrière le code ?',
    'Je pourrais te raconter son histoire.',
    'Mais je préfère que tu la découvres.',
    'Il n\'est pas arrivé ici par hasard.',
  ],
  skills: [
    'Une liste de technologies ne dit pas grand-chose.',
    'Regarde plutôt ce qu\'il construit avec.',
    'Impressionné par la liste ? Attends de voir les projets.',
    'Il sait beaucoup de choses. Pas tout.',
  ],
  projects: [
    'Voilà où ça devient intéressant.',
    'Regarde celui-là.',
    'Tu veux voir ce qu\'il sait vraiment faire ?',
    'Ne regarde pas seulement l\'interface.',
    'Regarde ce qu\'il y a derrière.',
  ],
  mobile: [
    'Oui, il ne fait pas que du web.',
    'Il construit aussi pour mobile.',
    'Tu pensais que c\'était uniquement un développeur web ?',
  ],
  ai: [
    'Enfin une section intéressante.',
    'Il aime bien faire parler les machines.',
    'C\'est probablement ici qu\'il s\'amuse le plus.',
    'Mais ne lui demande pas encore de tout automatiser.',
  ],
  devops: [
    'Le visiteur ne voit généralement pas cette partie.',
    'Mais c\'est souvent là que tout se joue.',
    'Ce que tu vois n\'est qu\'une partie du système.',
  ],
  limits: [
    'Enfin une section honnête.',
    'Non, il ne sait pas tout faire.',
    'Et c\'est probablement une bonne chose.',
    'Il apprend encore.',
    'Tu veux vraiment voir ses limites ?',
  ],
  contact: [
    'Tu es arrivé jusqu\'ici.',
    'Je pense que tu as vu suffisamment.',
    'Maintenant, tu peux lui parler.',
  ],
};

// ============================================================
// FORMATS CONSOMMÉS PAR LES COMPOSANTS
// Dérivés des données ci-dessus : une seule source de vérité.
// ============================================================

export const socials = {
  email: profile.email,
  linkedin: profile.links.linkedin,
  github: profile.links.github,
  gitlab: profile.links.gitlab,
  whatsapp: null, // ex: '+221770000000'
};

// Nombre d'entreprises distinctes traversées
const companiesCount = new Set(experiencesSource.map((e) => e.company)).size;

export const stats = [
  { value: `${projectsSource.length}+`, label: 'Projets livrés' },
  { value: `${companiesCount}`, label: 'Entreprises accompagnées' },
  { value: `${skillsCategories.length}`, label: 'Domaines techniques' },
  { value: '2 ans', label: "D'expérience" },
];

// Skills.jsx attend { title, tag, description, skills[] }
export const skillCategories = skillsCategories.map((cat) => ({
  id: cat.id,
  title: cat.title,
  tag: cat.tag,
  description: cat.description,
  skills: cat.items.map((item) => item.name),
}));

// WhatIBuild.jsx — 'automation' occupe la carte large
export const buildCapabilities = [
  {
    id: 'web',
    label: 'WEB',
    title: 'Applications web full stack',
    text: "De la maquette à la mise en production : interfaces React ou Angular, backend Node ou Symfony, base de données et déploiement.",
  },
  {
    id: 'mobile',
    label: 'MOBILE',
    title: 'Applications mobiles Flutter',
    text: "Une base de code, deux plateformes. Architecture claire, gestion d'état maîtrisée, mode hors ligne et publication sur les stores.",
  },
  {
    id: 'api',
    label: 'API & BACKEND',
    title: 'APIs et services métier',
    text: "Des APIs REST documentées, authentifiées et testées, pensées pour être consommées par plusieurs clients sans friction.",
  },
  {
    id: 'data',
    label: 'DATA & IA',
    title: 'Analyse de données et modèles',
    text: "Nettoyage, exploration, visualisation et modèles de machine learning — jusqu'aux dashboards que les équipes utilisent vraiment.",
  },
  {
    id: 'automation',
    label: 'AUTOMATISATION',
    title: 'Chatbots, voicebots et outils internes',
    text: "Des assistants conversationnels et des outils qui retirent le travail répétitif des mains des équipes, branchés sur les systèmes existants.",
  },
];

// Projects.jsx attend { name, type, technologies, image, mobileImage, liveUrl, repoUrl }
export const projects = projectsSource.map((p) => ({
  id: p.id,
  name: p.title,
  type: p.category,
  technologies: p.stack,
  image: p.images.desktop || p.images.hero,
  mobileImage: p.images.mobile,
  liveUrl: p.links.live,
  repoUrl: p.links.repo,
  featured: p.featured,
  tagline: p.tagline,
}));

// Experience.jsx attend { tasks[], current } — les tâches viennent des phrases de la description
export const experiences = experiencesSource.map((e) => ({
  ...e,
  current: e.enCours || /Présent/i.test(e.period),
  tasks: e.description
    .split(/\.\s+/)
    .map((t) => t.trim().replace(/\.$/, ''))
    .filter(Boolean),
}));



// ============================================================
// APPLICATIONS MOBILES — section Mobile + fiches détail (#projet/<id>)
// `ratio` = dimensions natives des captures, `accent` = couleur de l'app.
// ============================================================

export const mobileApps = [
  {
    id: 'signs',
    name: 'SIGNS',
    type: 'Application mobile',
    badge: 'Première application mobile',
    accent: '#111111',
    pourAfricodex: true,
    client: 'Africodex Digital',
    year: '2026',
    platforms: 'iOS & Android',
    status: 'Livré',
    tagline: 'Rédigez, signez et transmettez vos documents officiels depuis votre téléphone.',
    description:
      "Ma première application mobile livrée : une app Flutter qui transforme la paperasse administrative en quelques gestes. Contrats, baux, factures et quittances se remplissent depuis un modèle conforme, se signent électroniquement et partent au destinataire en PDF horodaté.",
    problem:
      "Au Sénégal, un contrat de bail ou une facture passe encore par un modèle Word bricolé, une imprimante, puis un déplacement pour faire signer. Le document circule sans trace, sans date fiable, et le moindre oubli de mention légale le fragilise.",
    solution:
      "Une application Flutter qui embarque des modèles juridiquement conformes, guide le remplissage champ par champ, génère le PDF côté serveur et applique une signature électronique horodatée. Le document part directement au destinataire, et chaque utilisateur garde ses pièces dans son espace.",
    results: [
      'Modèles conformes : contrats, baux, factures, quittances',
      'Génération PDF horodatée et partageable',
      'Signature électronique sur chaque document',
      'Deux profils : particulier et professionnel',
      'Connexion par téléphone (+221) ou par email',
      'Calculs automatiques HT / TVA / TTC en FCFA',
    ],
    stack: ['Flutter', 'Dart', 'Node.js', 'Sequelize', 'PostgreSQL', 'Cloudflare R2', 'Render', 'JWT'],
    links: { live: null, repo: null },
    ratio: dims['signs-1'],
    dashboard: {
      title: 'Le back-office',
      intro:
        "Derrière l'application, une console web permet de piloter la plateforme : suivi de la croissance des utilisateurs, volume de documents produits, et gestion fine de ce que chaque administrateur a le droit de consulter.",
      screens: [
        {
          src: dashSigns1,
          title: 'Pilotage de la plateforme',
          ratio: dims['dash-signs-1'],
          caption: 'Utilisateurs, contrats, factures et documents générés, filtrables par période, avec la répartition particuliers / indépendants / professionnels.',
        },
        {
          src: dashSigns2,
          title: 'Permissions des administrateurs',
          ratio: dims['dash-signs-2'],
          caption: "Chaque administrateur reçoit l'accès aux seules sections qui le concernent — sans sélection, il dispose d'un accès complet.",
        },
      ],
    },
    screens: [
      { src: signs1, ratio: dims['signs-1'], title: 'Lancement', caption: "L'identité SIGNS à l'ouverture de l'application." },
      { src: signs2, ratio: dims['signs-2'], title: 'Onboarding', caption: 'Trois promesses annoncées d’entrée : documents, factures, signature.' },
      { src: signs3, ratio: dims['signs-3'], title: 'Connexion', caption: 'Authentification par numéro sénégalais ou par email.' },
      { src: signs4, ratio: dims['signs-4'], title: 'Choix du profil', caption: "Particulier ou professionnel : l'expérience s'adapte ensuite." },
      { src: signs5, ratio: dims['signs-5'], title: 'Facture générée', caption: 'PDF horodaté, calculs HT / TVA / TTC en FCFA, prêt à partager.' },
    ],
  },

  {
    id: 'fait-maison',
    name: 'Fait Maison',
    type: 'Application mobile — Marketplace',
    badge: 'Marketplace de plats faits maison',
    accent: '#00A650',
    pourAfricodex: true,
    client: 'Projet personnel',
    year: '2026',
    platforms: 'iOS & Android',
    status: 'En développement',
    tagline: 'Gérez, vendez et commandez des produits faits avec amour.',
    description:
      "Une marketplace mobile qui relie les cuisiniers de quartier à leurs clients. D'un côté les boutiques publient leurs plats et suivent leurs commandes, de l'autre les clients parcourent ce qui se prépare près de chez eux, commandent et choisissent entre livraison et retrait.",
    problem:
      "Les cuisiniers qui vendent depuis chez eux travaillent par appels et messages : les commandes se perdent dans les conversations, les prix se répètent à chaque client, et rien ne permet de savoir ce qui a été vendu à la fin de la semaine.",
    solution:
      "Une application Flutter à deux faces bâtie sur la même base : un espace vendeur pour tenir sa boutique et son catalogue, un parcours client avec panier regroupé par boutique, choix du mode de réception et suivi de commande.",
    results: [
      'Catalogue organisé par boutique et par catégorie',
      'Panier regroupé par boutique, validation en quelques secondes',
      'Livraison à domicile ou retrait sur place, au choix',
      'Espace vendeur : boutique, produits, commandes',
      'Favoris et compteurs sur la page d’accueil',
      'Onboarding en trois écrans à la première ouverture',
    ],
    stack: ['Flutter', 'Dart', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'JWT'],
    links: { live: null, repo: null },
    ratio: dims['fm-1'],
    screens: [
      { src: fm1, ratio: dims['fm-1'], title: 'Lancement', caption: "L'identité Fait Maison à l'ouverture, en version 1.0.0." },
      { src: fm2, ratio: dims['fm-2'], title: 'Des plats faits maison', caption: 'Des repas préparés par des cuisiniers proches de chez soi.' },
      { src: fm3, ratio: dims['fm-3'], title: 'Commande en un instant', caption: 'Les plats s’ajoutent au panier, regroupés par boutique.' },
      { src: fm4, ratio: dims['fm-4'], title: 'Livraison ou retrait', caption: 'Recevoir chez soi ou récupérer en boutique, à son rythme.' },
      { src: fm5, ratio: dims['fm-5'], title: 'Connexion', caption: 'Un même accès pour les clients et pour les vendeurs.' },
      { src: fm6, ratio: dims['fm-6'], title: 'Accueil', caption: 'Offre en cours, compteurs et plats populaires près de soi.' },
    ],
  },

  {
    id: 'yobante-boutique',
    name: 'Yobante Boutique',
    type: 'Application mobile — E-commerce',
    badge: 'E-commerce mobile',
    accent: '#163A9E',
    pourAfricodex: true,
    client: 'Yobante',
    year: '2026',
    platforms: 'iOS & Android',
    status: 'En développement',
    tagline: 'Les courses et les bonnes affaires du quotidien, dans une seule application.',
    description:
      "L'application client d'une boutique en ligne sénégalaise : catalogue par univers, campagnes promotionnelles calées sur le calendrier local, panier et commande. Le catalogue se parcourt librement — la connexion n'intervient qu'au moment de payer.",
    problem:
      "Obliger un visiteur à créer un compte avant même de voir les prix fait fuir la majorité des acheteurs. Et sans mise en avant des campagnes saisonnières, les offres passent inaperçues auprès des clients qui les attendent.",
    solution:
      "Un parcours ouvert : le catalogue, les catégories et les promotions sont accessibles sans compte, et l'authentification n'arrive qu'au paiement. Les campagnes saisonnières occupent la une avec leurs dates, leurs remises et leurs conditions.",
    results: [
      'Consultation libre du catalogue, connexion au moment de payer',
      'Univers produits : frais, surgelés, hygiène, entretien, électroménager',
      'Campagnes saisonnières mises en avant (Magal, Tabaski)',
      'Promotions datées : prix barré, pourcentage, conditions',
      'Recherche par univers et par article',
      'Panier persistant et suivi de commande',
    ],
    stack: ['Flutter', 'Dart', 'Node.js', 'Sequelize', 'PostgreSQL', 'Socket.IO', 'Render', 'JWT'],
    links: { live: null, repo: null },
    ratio: dims['y1'],
    dashboard: {
      title: 'Le back-office',
      intro:
        "L'application mobile est alimentée par une console web : elle suit l'activité de la boutique en temps réel et, surtout, compose directement la vitrine que voient les clients — bannières, rayons et sections promotionnelles.",
      screens: [
        {
          src: dashYobante1,
          title: "Vue d'ensemble",
          ratio: dims['dash-yobante-1'],
          caption: "Chiffre d'affaires du mois, clients, vendeurs, commandes à traiter et promotions actives, avec les revenus par mois et les commandes par statut.",
        },
        {
          src: dashYobante2,
          title: "Composition de la page d'accueil",
          ratio: dims['dash-yobante-2'],
          caption: "Les bannières et les sections promos de l'application mobile se créent, se masquent et se réordonnent depuis cet écran.",
        },
      ],
    },
    screens: [
      { src: y1, ratio: dims['y1'], title: 'Accueil connecté', caption: 'La campagne du moment en une, puis les promos et les sélections.' },
      { src: y2, ratio: dims['y2'], title: 'Univers et promos à venir', caption: 'Les catégories, les campagnes annoncées et les garanties d’achat.' },
      { src: y3, ratio: dims['y3'], title: 'Recherche', caption: 'Entrée par univers : produits locaux, traiteur, mode, frais.' },
      { src: y4, ratio: dims['y4'], title: 'Promotion', caption: 'Prix barré, remise affichée et achat direct depuis la carte.' },
    ],
  },
  {
    id: 'kalaama-voice',
    name: 'Kalaama Voice',
    type: 'Application mobile — Voix & IA',
    badge: 'Assistant vocal en langues africaines',
    accent: '#3A2E8C',
    client: 'Projet personnel',
    year: '2026',
    platforms: 'iOS & Android',
    status: 'Livré',
    tagline: 'Comprendre et se faire comprendre dans sa langue, même sans savoir lire.',
    description:
      "Une application vocale pensée pour les langues africaines. Elle pose d'abord la seule question qui change tout — préfères-tu lire ou écouter ? — puis adapte tout le parcours à la réponse. Huit langues du continent sont proposées dès l'ouverture, et les utilisateurs peuvent contribuer avec leur voix pour enrichir le corpus.",
    problem:
      "Les interfaces numériques supposent toutes que l'utilisateur lit couramment, et dans une langue qui n'est presque jamais la sienne. Pour une large part de la population, cela ferme la porte d'entrée. Et les langues africaines restent quasi absentes des assistants vocaux, faute de données pour les entraîner.",
    solution:
      "Un parcours qui commence par demander si la personne préfère lire ou écouter, et se réorganise ensuite autour de ce choix : réponses lues à voix haute, navigation centrée sur un bouton micro. La collecte de voix est intégrée au produit et récompensée, pour construire le corpus qui manque à ces langues.",
    results: [
      'Parcours adapté aux personnes qui ne lisent pas',
      'Huit langues proposées : wolof, pulaar, bambara, swahili, yoruba, amharique, zulu, haoussa',
      'Réponses écoutées plutôt que lues, au choix de l’utilisateur',
      'Contribution vocale récompensée jusqu’à 25 000 FCFA',
      'Points et progression pour entretenir la participation',
      'Navigation ramenée à un bouton micro central',
    ],
    stack: ['Flutter', 'Dart', 'Speech-to-Text', 'Text-to-Speech', 'Python', 'LLM', 'Node.js', 'PostgreSQL'],
    links: { live: null, repo: null },
    ratio: dims['fm-1'],
    screens: [
      { src: k1, title: 'Lancement', ratio: dims['k1'], caption: "Le djembé de Kalaama Voice à l'ouverture." },
      { src: k2, title: 'Lire ou écouter', ratio: dims['k2'], caption: 'La première question posée, avant même la langue.' },
      { src: k3, title: 'Choix de la langue', ratio: dims['k3'], caption: 'Wolof, pulaar, bambara, swahili et quatre autres langues du continent.' },
      { src: k4, title: 'Accueil', ratio: dims['k4'], caption: 'Le micro au centre, et des points à gagner en contribuant.' },
    ],
  },
];


// ============================================================
// PROJETS WEB — section Web + fiches détail (#projet/<id>)
// ============================================================

export const webProjects = [
  {
    id: 'mosquee-divinite',
    name: 'Mosquée de la Divinité',
    type: 'Site vitrine',
    badge: 'Site vitrine éditorial',
    accent: '#0E3B34',
    client: 'Mosquée de la Divinité — Ouakam',
    year: '2026',
    platforms: 'Web — responsive',
    status: 'Livré',
    tagline: "Raconter un monument, son histoire, et l'homme qui l'a rêvé.",
    description:
      "Un site vitrine pour l'un des monuments les plus photographiés du Sénégal, posé entre les falaises de Ouakam et l'Atlantique. Le parti pris est celui d'un livre plutôt que d'une brochure : une vidéo d'ouverture, le récit du fondateur, l'exposition permanente, et les informations dont un visiteur a réellement besoin avant de venir.",
    problem:
      "Un lieu que tout le monde photographie mais sur lequel on ne trouve presque rien en ligne. Les visiteurs arrivent sans savoir comment y accéder, quelle tenue porter, ni s'ils sont les bienvenus quand ils ne sont pas musulmans. Et l'histoire du lieu — une mosquée révélée en songe en 1973 — se transmettait surtout à l'oral.",
    solution:
      "Un site éditorial qui prend le temps de raconter : la biographie de Mouhamed Gorgui Seyni Gueye, la construction depuis le songe, l'exposition photographique permanente, puis un bloc pratique clair — adresse, accès, tenue, coordonnées — et une réponse explicite aux visiteurs non-musulmans.",
    results: [
      "Vidéo d'ouverture sur le monument et son littoral",
      'Biographie complète du fondateur, de 1926 à 2007',
      'Informations pratiques : adresse, accès, tenue, coordonnées',
      'Exposition permanente « Du Songe à la Mosquée »',
      'Accueil des visiteurs non-musulmans énoncé sans ambiguïté',
      'Composition éditoriale en typographie de livre',
    ],
    stack: ['React', 'Vite', 'CSS moderne', 'Animations au défilement'],
    links: { live: null, repo: null },
    wide: true,
    ratio: dims['divinite4'],
    screens: [
      {
        src: divinite1,
        type: 'video',
        title: 'Ouverture',
        ratio: [1906, 880],
        caption: 'La mosquée en vidéo dès les premières secondes, face à l’Atlantique.',
      },
      {
        src: divinite2,
        title: 'Le fondateur',
        ratio: dims['divinite2'],
        caption: 'Mouhamed Gorgui Seyni Gueye, dit Sangabi : la retraite spirituelle, le songe de 1973, le chantier.',
      },
      {
        src: divinite3,
        title: 'Venir sur place',
        ratio: dims['divinite3'],
        caption: 'Adresse, moyens d’accès, tenue requise et coordonnées, suivis d’une vue du site.',
      },
      {
        src: divinite4,
        title: "L'exposition",
        ratio: dims['divinite4'],
        caption: '« Du Songe à la Mosquée » : les archives du Mouvement Naby Allah en galerie.',
      },
    ],
  },

  {
    id: 'laz-design',
    name: 'Laz Design',
    type: 'Site portfolio',
    badge: 'Portfolio photographe',
    accent: '#111111',
    client: 'Laz Design — photographe & créateur visuel',
    year: '2026',
    platforms: 'Web — responsive',
    status: 'Livré',
    tagline: 'Des images qui donnent envie de s’arrêter.',
    description:
      "Le site d'un photographe et créateur visuel basé à Ouakam. Direction artistique en noir et blanc, typographie condensée, et une règle simple tenue d'un bout à l'autre : rien ne doit passer devant les photos.",
    problem:
      "Un photographe qui vit de son image ne peut pas s'en remettre à un feed : le flux écrase les séries, mélange les univers et ne donne aucune porte d'entrée professionnelle. Une marque qui cherche un prestataire n'y trouve ni le périmètre des prestations, ni de quoi juger la cohérence d'un travail.",
    solution:
      "Un site qui sépare clairement les trois univers — communication, photographie, création graphique — et présente le travail par séries plutôt qu'en vrac. Le noir et blanc de l'interface laisse la couleur aux images, et le contact reste accessible depuis n'importe quel écran.",
    results: [
      'Trois univers distincts : communication, photographies, design',
      'Galerie par séries : portraits, studio, événements, produits',
      'Direction artistique noir et blanc, typographie condensée',
      'Sections dédiées aux affiches et aux vidéos',
      'Réseaux sociaux et prise de contact toujours à portée',
      'Statut de disponibilité affiché dès l’en-tête',
    ],
    stack: ['React', 'Vite', 'CSS moderne', 'Animations au défilement'],
    links: { live: null, repo: null },
    wide: true,
    ratio: dims['Portfolio1'],
    screens: [
      {
        src: portfolio1,
        title: 'Ouverture',
        ratio: dims['Portfolio1'],
        caption: 'Présentation directe, statut de disponibilité et accès immédiat au portfolio.',
      },
      {
        src: portfolio2,
        title: 'Les univers',
        ratio: dims['Portfolio2'],
        caption: 'Communication, photographies, et un troisième pôle annoncé comme à venir.',
      },
      {
        src: portfolio3,
        title: 'La galerie',
        ratio: dims['Portfolio3'],
        caption: 'Les séries présentées en grille, sur fond noir pour laisser parler les images.',
      },
      {
        src: portfolio4,
        title: 'Chaque image a son histoire',
        ratio: dims['portfolio4'],
        caption: 'Une bascule pleine largeur qui introduit la galerie complète.',
      },
    ],
  },
];
