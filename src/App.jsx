import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import WhatIBuild from './components/WhatIBuild';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import BootSequence from './components/BootSequence';
import ChatWidget from './components/ChatWidget';
import { useHashRoute, clearHash } from './hooks/useHashRoute';
import { mobileApps, webProjects } from './data/portfolio';
import './App.css';

// Projets disposant d'une fiche détaillée, adressables via #projet/<id>
const detailedProjects = Object.fromEntries(
  [...mobileApps, ...webProjects].map((p) => [p.id, p])
);

/**
 * La séquence de démarrage se rejoue à chaque chargement de la page —
 * c'est le premier contact avec le portfolio, il doit avoir lieu à chaque fois.
 * Seule exception : l'arrivée directe sur une fiche projet, où l'écran
 * d'allumage n'aurait aucun sens.
 */
const dejaAllume = () => {
  if (typeof window === 'undefined') return true;
  return window.location.hash.startsWith('#projet/');
};

function App() {
  const route = useHashRoute();
  const detailId = route.startsWith('projet/') ? route.slice('projet/'.length) : null;
  const detailProject = detailId ? detailedProjects[detailId] : null;

  const [allume, setAllume] = useState(dejaAllume);

  // Barre de progression de lecture
  const { scrollYProgress } = useScroll();
  const avancee = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  // Enable smooth scroll after initial paint
  useEffect(() => {
    const htmlElement = document.documentElement;
    const originalScrollBehavior = htmlElement.style.scrollBehavior;
    htmlElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    setTimeout(() => {
      htmlElement.style.scrollBehavior = originalScrollBehavior;
      htmlElement.classList.add('smooth-scroll');
    }, 100);
  }, []);

  // Rien ne défile tant que l'appareil n'a pas fini de s'allumer
  useEffect(() => {
    document.body.style.overflow = allume ? '' : 'hidden';
  }, [allume]);

  // Filet de sécurité : le portfolio s'affiche quoi qu'il arrive
  useEffect(() => {
    if (allume) return;
    const secours = setTimeout(() => setAllume(true), 6000);
    return () => clearTimeout(secours);
  }, [allume]);

  const demarre = () => setAllume(true);

  return (
    <div id="root">
      {!allume && <BootSequence onDone={demarre} />}

      <motion.span className="scrollbar" style={{ scaleX: avancee }} aria-hidden="true" />

      <Navbar />
      <motion.main
        initial={false}
        animate={allume ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hero />
        <About />
        <Skills />
        <WhatIBuild />
        <Projects />
        <Experience />
        <Journey />
        <Contact />
      </motion.main>
      <Footer />

      {/* Le témoin, joignable depuis toute la page */}
      {allume && <ChatWidget />}

      {detailProject && (
        <ProjectDetail project={detailProject} onClose={clearHash} />
      )}
    </div>
  );
}

export default App;
