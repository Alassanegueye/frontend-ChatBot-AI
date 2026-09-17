import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Smartphone, Monitor } from './Icons';
import Lightbox from './Lightbox';

/**
 * ProjectDetail — fiche projet plein écran, ouverte par-dessus le portfolio.
 */

const Galerie = ({ titre, Icone, ecrans, nom, ratioDefaut, onOpenLightbox }) => (
  <section className="fiche__galerie">
    <h2 className="fiche__galerieTitre">
      <Icone size={17} /> {titre}
      <span className="fiche__compte">{ecrans.length} écrans</span>
    </h2>

    <div className="fiche__ecrans">
      {ecrans.map((e, idx) => {
        const [w, h] = e.ratio || ratioDefaut;
        const paysage = w > h;
        return (
          <figure
            className={`fiche__ecran ${paysage ? 'is-large' : ''}`}
            key={e.title}
            style={{ '--phone-ar': `${w} / ${h}`, '--screen-ar': `${w} / ${h}` }}
            onClick={() => onOpenLightbox(ecrans, idx)}
            title="Cliquer pour afficher en plein écran"
          >
            <div className={paysage ? 'screen' : 'phone'}>
              {e.type === 'video' ? (
                <video src={e.src} controls muted loop playsInline preload="metadata" />
              ) : (
                <img src={e.src} alt={`${nom} — ${e.title}`} loading="lazy" />
              )}
            </div>
            <figcaption>
              <strong>{e.title}</strong>
              {e.caption}
            </figcaption>
          </figure>
        );
      })}
    </div>
  </section>
);

const ProjectDetail = ({ project, onClose }) => {
  const [lightboxState, setLightboxState] = useState({ isOpen: false, items: [], index: 0 });

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (lightboxState.isOpen) {
          setLightboxState((prev) => ({ ...prev, isOpen: false }));
        } else {
          onClose();
        }
      }
    };
    document.addEventListener('keydown', onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, lightboxState.isOpen]);

  const { links = {}, ratio = [768, 1376], wide = false, dashboard } = project;
  const livre = /livr/i.test(project.status || '');

  const openLightbox = (items, index) => {
    setLightboxState({ isOpen: true, items, index });
  };

  return (
    <div
      className="pdetail fiche"
      role="dialog"
      aria-modal="true"
      aria-label={`Projet ${project.name}`}
      style={{ '--app-accent': project.accent }}
    >
      <header className="pdetail__bar">
        <div className="shell pdetail__barInner">
          <button type="button" className="pdetail__back" onClick={onClose}>
            <ArrowLeft size={16} /> Retour au portfolio
          </button>
          <span className="pdetail__barName">{project.name}</span>
        </div>
      </header>

      <div className="pdetail__body">
        <div className="shell">

          {/* En-tête */}
          <div className="fiche__tete">
            <span className="pdetail__type">{project.type}</span>
            <h1 className="pdetail__title">{project.name}</h1>
            <p className="pdetail__tagline">{project.tagline}</p>

            <div className="fiche__etats">
              <span className={`fiche__etat ${livre ? 'is-livre' : 'is-encours'}`}>
                <span className="fiche__point" />
                {project.status}
              </span>
              <span className="fiche__plateformes">{project.platforms}</span>
            </div>
          </div>

          {/* Les écrans, d'abord */}
          <Galerie
            titre={wide ? 'Le site' : "L'application"}
            Icone={wide ? Monitor : Smartphone}
            ecrans={project.screens}
            nom={project.name}
            ratioDefaut={ratio}
            onOpenLightbox={openLightbox}
          />

          {/* Le tableau de bord */}
          {dashboard && (
            <Galerie
              titre="Le tableau de bord"
              Icone={Monitor}
              ecrans={dashboard.screens}
              nom={project.name}
              ratioDefaut={ratio}
              onOpenLightbox={openLightbox}
            />
          )}

          {/* Ce qu'est le projet */}
          <section className="fiche__bloc">
            <h2 className="fiche__k">Le projet</h2>
            <p className="fiche__texte">{project.description}</p>
          </section>

          {/* Pour qui il a été réalisé */}
          <section className="fiche__bloc">
            <h2 className="fiche__k">Réalisé pour</h2>
            <p className="fiche__client">{project.client}</p>
            {project.pourAfricodex && (
              <p className="fiche__mention">
                Projet mené pour un client d'<strong>Africodex Digital</strong>,
                structure dont je suis co-fondateur et développeur.
              </p>
            )}
          </section>

          {/* Avec quoi */}
          <section className="fiche__bloc">
            <h2 className="fiche__k">Technologies</h2>
            <div className="pdetail__stack">
              {project.stack.map((t) => (
                <span className="t" key={t}>{t}</span>
              ))}
            </div>
          </section>

          {/* Liens éventuels */}
          {(links.live || links.repo) && (
            <section className="fiche__bloc pdetail__links">
              {links.live && (
                <a href={links.live} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                  {wide ? 'Voir le site' : "Voir l'application"} <ArrowUpRight size={16} className="arr" />
                </a>
              )}
              {links.repo && (
                <a href={links.repo} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                  Code source <ArrowUpRight size={16} className="arr" />
                </a>
              )}
            </section>
          )}

          <div className="pdetail__foot">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              <ArrowLeft size={16} /> Retour au portfolio
            </button>
          </div>

        </div>
      </div>

      <Lightbox
        items={lightboxState.items}
        initialIndex={lightboxState.index}
        isOpen={lightboxState.isOpen}
        onClose={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default ProjectDetail;
