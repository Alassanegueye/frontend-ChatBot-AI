import React from 'react';
import { experiences } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import SectionHeader from './SectionHeader';

const Experience = () => {
  const [ref, shown] = useReveal();

  return (
    <section id="experience" className="section">
      <div className="shell">
        <SectionHeader
          kicker="Expériences"
          title="Du terrain au <em>produit</em>."
          lead="Chaque expérience a renforcé ma capacité à concevoir, développer et livrer des solutions concrètes."
        />

        <div className="tl" ref={ref}>
          {experiences.map((exp, i) => (
            <div
              className={`tl__item ${exp.current ? 'is-current' : ''} reveal ${shown ? 'is-in' : ''}`}
              data-delay={i + 1}
              key={i}
            >
              <div className="tl__dot" />
              <div className="tl__top">
                <div>
                  <h3 className="tl__role">
                    {exp.role}
                    {exp.current && <span className="badge-now">PRÉSENT</span>}
                  </h3>
                  <span className="tl__company">{exp.company}</span>
                </div>
                <span className="tl__meta">{exp.period} — {exp.location}</span>
              </div>
              <ul className="tl__tasks">
                {exp.tasks.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;