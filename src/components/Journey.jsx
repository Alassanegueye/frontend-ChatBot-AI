import React from 'react';
import { journey } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import SectionHeader from './SectionHeader';

const Journey = () => {
  const [ref, shown] = useReveal();

  return (
    <section id="journey" className="section">
      <div className="shell">
        <SectionHeader
          kicker="Parcours"
          title="Une évolution <em>progressive</em>."
          lead="Formations, certifications, jalons techniques — chaque étape a construit le développeur que je suis aujourd'hui."
        />

        <div className="journey__grid" ref={ref}>
          {journey.map((j, i) => (
            <article className={`jcard reveal ${shown ? 'is-in' : ''}`} data-delay={i + 1} key={i}>
              <div className="jcard__year">{j.year}</div>
              <span className="jcard__kind">{j.kind}</span>
              <h3 className="jcard__title">{j.title}</h3>
              <span className="jcard__org">{j.org}</span>
              <p className="jcard__text">{j.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;