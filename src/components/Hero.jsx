import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { profile } from '../data/portfolio';
import Tilt3D from './Tilt3D';
import { ArrowUpRight, ArrowDown, User } from './Icons';

// Les mots du titre tombent les uns après les autres
const mots = {
  cache: {},
  montre: (i) => ({
    transition: { delayChildren: 0.15 + i * 0.06, staggerChildren: 0.05 },
  }),
};
const mot = {
  cache: { y: '110%', opacity: 0 },
  montre: { y: 0, opacity: 1, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

const Hero = () => {
  const doux = useReducedMotion();

  // La grille et la photo défilent moins vite que le texte
  const { scrollYProgress } = useScroll();
  const yGrille = useTransform(scrollYProgress, [0, 0.25], [0, 90]);
  const yPhoto = useTransform(scrollYProgress, [0, 0.25], [0, -46]);
  const opaciteHero = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  const lignes = [
    "Moi, c'est",
    "Alassane GUEYE.",
    "Je transforme les problèmes",
    "en produits vivants.",
  ];

  return (
    <section id="home" className="section section--flush hero">
      <div className="hero__glow hero__glow--1" aria-hidden="true" />
      <div className="hero__glow hero__glow--2" aria-hidden="true" />
      <motion.div
        className="hero__grid"
        aria-hidden="true"
        style={doux ? undefined : { y: yGrille }}
      />

      <div className="hero__inner shell">
        {/* Colonne texte */}
        <motion.div initial="cache" animate="montre" variants={mots}>
          {profile.status && (
            <motion.span
              className="hero__status"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="pulse" />
              {profile.status}
            </motion.span>
          )}

          <motion.p
            className="hero__eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.6 }}
          >
            {profile.location} — {profile.role}
          </motion.p>

          <h1>
            {lignes.filter(Boolean).map((l, i) => (
              <motion.span className="hero__ligne" key={l + i} custom={i} variants={mots}>
                <motion.span
                  className={i === 1 ? 'hl' : i > 1 ? 'line2' : ''}
                  variants={mot}
                >
                  {l}
                </motion.span>
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="hero__tag"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            <a href="#projects" className="btn btn--primary">
              Voir mes projets <ArrowUpRight size={16} className="arr" />
            </a>
            <a href="#contact" className="btn btn--ghost">
              Me contacter <ArrowUpRight size={16} className="arr" />
            </a>
            {profile.cvUrl && (
              <a href={profile.cvUrl} download className="btn btn--ghost">
                Télécharger le CV <ArrowDown size={16} className="arr" />
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Colonne photo */}
        <motion.div
          className="hero__photo"
          style={doux ? undefined : { y: yPhoto }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Tilt3D force={9} inner="photo-frame">
            {profile.photo ? (
              <>
                <img src={profile.photo} alt={profile.name} className="hero__img" />
                <div className="photo-overlay" />
                <span className="corner tl" /><span className="corner tr" />
                <span className="corner bl" /><span className="corner br" />
                <div className="hero__badge">
                  <span className="hero__badge-dot" />
                  <span>Data & Full Stack</span>
                </div>
              </>
            ) : (
              <>
                <span className="corner tl" /><span className="corner tr" />
                <span className="corner bl" /><span className="corner br" />
                <div className="ph-label">
                  <span className="ph-icon"><User size={20} /></span>
                  Votre photo
                </div>
              </>
            )}
          </Tilt3D>
          <div className="photo-cap">
            <span>Alassane GUEYE</span>
            <span>{profile.location}</span>
          </div>
        </motion.div>
      </div>

      {/* Invitation à descendre */}
      <motion.div className="hero__scroll" style={doux ? undefined : { opacity: opaciteHero }}>
        <span>Faites défiler</span>
        <motion.span
          className="hero__scrollLine"
          animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
