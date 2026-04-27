import React from 'react';

const formations = [
  {
    degree: "Data Scientist Bootcamp",
    school: "GoMyCode",
    period: "Sept. 2025 → Jan. 2026",
    location: "Point-E, Dakar",
    highlights: ["Python, ML, Deep Learning, Streamlit", "Clustering, réseaux neuronaux, chatbots", "Web scraping, APIs, dashboards interactifs"],
  },
  {
    degree: "Licence Informatique de Gestion — Science des Données",
    school: "Institut Africain de Management",
    period: "Nov. 2024 → Juil. 2025",
    location: "Mermoz, Dakar",
    highlights: ["Python, Java, JavaScript, PHP", "Machine Learning, BI, bases de données", "Linux, réseaux Cisco"],
  },
  {
    degree: "Baccalauréat S2 — Sciences Naturelles",
    school: "Lycée Amath Dansokho de Ouakam",
    period: "Oct. 2021 → Juil. 2022",
    location: "Dakar, Sénégal",
    highlights: [],
  },
];

const Education = () => (
  <section className="timeline-section">
    <div className="eyebrow" style={{ marginBottom: '24px' }}>
      <span className="eyebrow-line" />
      <span className="eyebrow-text">Formations</span>
    </div>
    <div className="edu-grid">
      {formations.map((f, idx) => (
        <div key={idx} className="edu-card">
          <div className="edu-top">
            <div>
              <h4 className="edu-degree">{f.degree}</h4>
              <span className="edu-school">{f.school}</span>
            </div>
            <div className="tl-meta">
              <span className="tl-period">{f.period}</span>
              <span className="tl-location">{f.location}</span>
            </div>
          </div>
          {f.highlights.length > 0 && (
            <ul className="edu-highlights">
              {f.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          )}
        </div>
      ))}
    </div>
  </section>
);

export default Education;