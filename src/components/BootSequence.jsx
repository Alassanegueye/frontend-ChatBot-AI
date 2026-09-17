import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '../data/portfolio';

/**
 * BootSequence — le portfolio s'allume comme un appareil.
 *
 * Trois temps : le point d'amorçage, les lignes de démarrage qui défilent,
 * puis le nom qui se pose avant que l'écran ne s'ouvre sur le portfolio.
 *
 * La séquence ne se joue qu'une fois par session, peut être passée d'un clic
 * ou d'une touche, et s'efface complètement si l'utilisateur a demandé à
 * réduire les animations.
 */

const LIGNES = [
  'initialisation du portfolio',
  'chargement des projets',
  'applications mobiles · sites web',
  'prêt',
];

const BootSequence = ({ onDone }) => {
  const [etape, setEtape] = useState(0);
  const [sortie, setSortie] = useState(false);
  const fini = useRef(false);

  const terminer = () => {
    if (fini.current) return;
    fini.current = true;
    setSortie(true);
    setTimeout(onDone, 700);
  };

  // Quand le système demande moins d'animations, l'écran passe vite et sans mouvement
  const doux =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // Déroulé des lignes de démarrage
  useEffect(() => {
    const pas = doux ? [120, 400, 650, 900, 1150] : [420, 1250, 1750, 2250, 2700];
    const ids = pas.map((t, i) =>
      setTimeout(() => (i < pas.length - 1 ? setEtape(i + 1) : terminer()), t)
    );
    return () => ids.forEach(clearTimeout);
  }, [doux]);

  // On peut toujours court-circuiter
  useEffect(() => {
    const passer = () => terminer();
    window.addEventListener('keydown', passer);
    window.addEventListener('click', passer);
    return () => {
      window.removeEventListener('keydown', passer);
      window.removeEventListener('click', passer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!sortie && (
        <motion.div
          className="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* L'écran se referme vers le haut, comme un rideau */}
          <motion.div
            className="boot__inner"
            exit={{ scale: 1.08, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Amorçage : un point qui devient signal */}
            <motion.span
              className="boot__dot"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            />

            <motion.div
              className="boot__name"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: etape >= 1 ? 1 : 0, y: etape >= 1 ? 0 : 14 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {profile.name.split('').map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, filter: 'blur(6px)' }}
                  animate={etape >= 1 ? { opacity: 1, filter: 'blur(0px)' } : {}}
                  transition={{ delay: 0.25 + i * 0.03, duration: 0.4 }}
                >
                  {c === ' ' ? ' ' : c}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              className="boot__role"
              initial={{ opacity: 0 }}
              animate={{ opacity: etape >= 2 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {profile.role}
            </motion.p>

            {/* Progression */}
            <div className="boot__barre">
              <motion.span
                className="boot__jauge"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: Math.min(etape / (LIGNES.length - 1), 1) }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>

            <div className="boot__log" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.span
                  key={etape}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  {LIGNES[Math.min(etape, LIGNES.length - 1)]}
                </motion.span>
              </AnimatePresence>
            </div>

            <span className="boot__skip">Cliquez pour passer</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
