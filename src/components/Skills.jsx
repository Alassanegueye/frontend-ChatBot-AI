import React from 'react';
import { skillCategories } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import SectionHeader from './SectionHeader';
import Tilt3D from './Tilt3D';

const Skills = () => {
  const [ref, shown] = useReveal();

  return (
    <section id="skills" className="section">
      <div className="shell">
        <SectionHeader
          kicker="Compétences"
          title="Une chaîne <em>complète</em>,<br/>maîtrisée catégorie par catégorie."
          lead="Pas une simple liste de logos : voici comment j'articule mes compétences autour des produits que je construis."
        />

        <div className="skills__grid" ref={ref}>
          {skillCategories.map((cat, i) => (
            <Tilt3D
              className={`reveal ${shown ? 'is-in' : ''}`}
              inner="skill-card"
              data-delay={(i % 2) + 1}
              key={cat.id}
            >
              <div className="skill-card__top">
                <h3 className="skill-card__title">{cat.title}</h3>
                <span className="skill-card__tag">{cat.tag}</span>
              </div>
              <p className="skill-card__desc">{cat.description}</p>
              <div className="skill-card__list">
                {cat.skills.map((s) => (
                  <span className="chip" key={s}>{s}</span>
                ))}
              </div>
            </Tilt3D>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
