import React from 'react';
import { mobileApps, webProjects } from '../data/portfolio';
import SectionHeader from './SectionHeader';
import MediaCarousel from './MediaCarousel';
import { ArrowUpRight, Smartphone, Monitor } from './Icons';

/**
 * Projects — toutes les réalisations montrables, applications et sites.
 *
 * Les deux familles vivent dans la même section, séparées par un intertitre :
 * le visiteur parcourt l'ensemble sans changer de contexte.
 */

const Vitrine = ({ projet, captures, libelle, wide = false }) => (
  <div className="showcase" style={{ '--app-accent': projet.accent }}>
    <div className="showcase__intro">
      <span className="showcase__badge">{projet.badge}</span>
      <h3 className="showcase__name">{projet.name}</h3>
      <p className="showcase__tagline">{projet.tagline}</p>
      <div className="showcase__meta">
        {projet.client} — {projet.platforms}
      </div>
    </div>

    <MediaCarousel screens={captures} ratio={projet.ratio} wide={wide} label={libelle} />

    <div className="showcase__cta">
      <a href={`#projet/${projet.id}`} className="btn btn--primary">
        Voir le projet en détail <ArrowUpRight size={16} className="arr" />
      </a>
    </div>
  </div>
);

const Projects = () => (
  <section id="projects" className="section">
    <div className="shell">
      <SectionHeader
        kicker="Réalisations"
        title="Des projets qui <em>vivent</em>."
        lead="Applications mobiles et sites livrés pour des clients ou menés en indépendant. Chaque projet a sa fiche détaillée."
      />

      {/* Applications mobiles */}
      <div className="famille" id="mobile">
        <h3 className="famille__titre">
          <Smartphone size={18} /> Applications mobiles
          <span className="famille__compte">{mobileApps.length}</span>
        </h3>

        {mobileApps.map((app) => (
          <Vitrine
            key={app.id}
            projet={app}
            captures={app.screens}
            libelle={`Captures de l'application ${app.name}`}
          />
        ))}
      </div>

      {/* Sites web */}
      <div className="famille" id="web">
        <h3 className="famille__titre">
          <Monitor size={18} /> Sites web
          <span className="famille__compte">{webProjects.length}</span>
        </h3>

        {webProjects.map((project) => (
          <Vitrine
            key={project.id}
            projet={project}
            captures={project.screens}
            libelle={`Captures du site ${project.name}`}
            wide
          />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
