import React from 'react';

const experiences = [
  {
    role: "Co-fondateur & Développeur Full Stack",
    company: "Africodex Digital",
    period: "Mars 2026 → Présent",
    location: "Dakar, Sénégal",
    tasks: [
      "Conception et développement d'applications web full stack (React, Node.js)",
      "Solutions digitales adaptées aux besoins clients",
      "Gestion technique et coordination de projets numériques",
    ],
  },
  {
    role: "Stagiaire Développeur IA Conversationnelle",
    company: "Sonatel",
    period: "Mai 2026 → Juil. 2026",
    location: "Mermoz, Dakar",
    tasks: [
      "Développement de chatbots et voicebots en production",
      "Automatisation des réponses et amélioration UX",
      "Traitement automatique des demandes clients",
    ],
  },
  {
    role: "Stagiaire Data Analyst – Customer Experience",
    company: "Sonatel",
    period: "Jan. 2026 → Avr. 2026",
    location: "Mermoz, Dakar",
    tasks: [
      "Analyse des données clients : tendances et points de friction",
      "Rapports de satisfaction client et suivi des actions correctives",
      "Recommandations basées sur les données à l'équipe CX",
    ],
  },
  {
    role: "Chargé de gestion administrative & relation client",
    company: "Nutrivie",
    period: "Nov. 2024 → Présent",
    location: "Ouakam, Dakar",
    tasks: [
      "Gestion des commandes, suivi client et facturation",
      "Coordination entre clients et équipes opérationnelles",
    ],
  },
];

const Experience = () => (
  <section className="timeline-section">
    <div className="eyebrow" style={{ marginBottom: '24px' }}>
      <span className="eyebrow-line" />
      <span className="eyebrow-text">Expériences professionnelles</span>
    </div>
    <div className="timeline">
      {experiences.map((exp, idx) => (
        <div key={idx} className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-content">
            <div className="tl-header">
              <div>
                <h4 className="tl-role">{exp.role}</h4>
                <span className="tl-company">{exp.company}</span>
              </div>
              <div className="tl-meta">
                <span className="tl-period">{exp.period}</span>
                <span className="tl-location">{exp.location}</span>
              </div>
            </div>
            <ul className="tl-tasks">
              {exp.tasks.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Experience;