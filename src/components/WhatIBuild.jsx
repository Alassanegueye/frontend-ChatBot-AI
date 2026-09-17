import React from 'react';
import { buildCapabilities } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import SectionHeader from './SectionHeader';
import Tilt3D from './Tilt3D';
import { ChevronRight } from 'lucide-react';

const WhatIBuild = () => {
  const [ref, shown] = useReveal();

  return (
    <section id="what-i-build" className="section">
      <div className="shell">
        <SectionHeader
          kicker="Ce que je sais construire"
          title="Du code à <em>l'expérience</em>."
          lead="Chaque capacité correspond à un type de produit que je peux concevoir, développer et livrer."
        />

        <div className="build__grid" ref={ref}>
          {buildCapabilities.map((cap, i) => {
            const wide = cap.id === 'automation';
            return (
              <Tilt3D
                className={`build-cell ${wide ? 'build-card--wide' : ''}`}
                inner="build-card"
                data-delay={(i % 3) + 1}
                key={cap.id}
                force={5}
              >
                <span className="build-card__label">{cap.label}</span>
                <h3 className="build-card__title">{cap.title}</h3>
                <p className="build-card__text">{cap.text}</p>
              </Tilt3D>
            );
          })}
          <article className="build-card build-card--feature" data-delay="4" key="feature">
            <span className="build-card__label build-card__chain">
              {['WEB', 'MOBILE', 'API', 'BACKEND'].map((e, k) => (
                <React.Fragment key={e}>
                  {k > 0 && <ChevronRight size={12} aria-hidden="true" />}
                  {e}
                </React.Fragment>
              ))}
            </span>
            <h3 className="build-card__title">Une chaîne technique cohérente</h3>
            <p className="build-card__text">
              Je ne fais pas que du frontend ou du backend : je relie les points.
              De l'interface utilisateur jusqu'à la donnée, en passant par l'API,
              le mobile et l'infrastructure — chaque pièce s'imbrique.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default WhatIBuild;