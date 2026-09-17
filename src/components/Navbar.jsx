import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from './Icons';

const links = [
  { id: 'home', label: 'Accueil' },
  { id: 'about', label: 'À propos' },
  { id: 'skills', label: 'Compétences' },
  { id: 'projects', label: 'Projets' },
  { id: 'experience', label: 'Expérience' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 120;
      let current = 'home';
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.offsetTop <= pos) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__inner">
        <a href="#home" className="nav__brand" onClick={(e) => go(e, 'home')}>
          <span className="dot" /> Alassane GUEYE
        </a>

        <div className="nav__links">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav__link ${active === l.id ? 'is-active' : ''}`}
              onClick={(e) => go(e, l.id)}
            >
              {/* La pastille suit la section lue, au lieu de sauter d'un lien à l'autre */}
              {active === l.id && (
                <motion.span
                  className="nav__pill"
                  layoutId="nav-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="nav__label">{l.label}</span>
            </a>
          ))}
          <a href="#contact" className="nav__cta" onClick={(e) => go(e, 'contact')}>
            Travaillons ensemble
          </a>
        </div>

        <button
          className="nav__burger"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => go(e, l.id)}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.3 }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
