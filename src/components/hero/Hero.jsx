'use client';

import { motion } from 'framer-motion';
import { Code, Smartphone, Brain, Server, Settings, Sparkles } from 'lucide-react';
import { profile, skillsCategories } from '../../data/portfolio';
import { cn } from '../../lib/utils';

const techIcons = {
  Code, Smartphone, Brain, Server, Settings, Sparkles,
};

export function Hero() {
  const roles = profile.roles;
  const [visibleRoles, setVisibleRoles] = useState([]);

  // Animation séquentielle des rôles
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setVisibleRoles((prev) => {
        if (index < roles.length) {
          return [...prev, roles[index++]];
        }
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="section relative min-h-screen flex items-center justify-center overflow-hidden"
      data-theme="hero"
    >
      {/* Grille de fond animée */}
      <motion.div
        className="grid-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
      />

      {/* Particules flottantes subtiles */}
      <FloatingParticles count={15} color="accent" />

      <div className="container relative z-10 px-6 md:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Salutation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'expoOut' }}
            className="font-mono text-caption text-accent mb-8 tracking-widest"
          >
            HEY.
          </motion.p>

          {/* Nom */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: 'expoOut' }}
            className="font-display text-display-1 text-fg mb-6 leading-[0.9]"
          >
            JE SUIS{' '}
            <span className="gradient-text gradient-orange">{profile.firstName}</span>
            {' '}GUEYE
          </motion.h1>

          {/* Rôles animés */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'expoOut' }}
            className="min-h-[80px] mb-10 flex flex-col items-center gap-3"
          >
            {visibleRoles.map((role, i) => (
              <motion.p
                key={role}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.3, duration: 0.5, ease: 'expoOut' }}
                className="font-body text-body-lg text-fg-muted"
              >
                {role}
              </motion.p>
            ))}
            {!visibleRoles.length && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="font-body text-body-lg text-fg-muted"
              >
                {roles[0]}
              </motion.p>
            )}
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: 'expoOut' }}
            className="font-body text-body-lg text-fg-muted max-w-2xl mx-auto mb-16 leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          {/* Indicateurs de compétences */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8, ease: 'expoOut' }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
          >
            {skillsCategories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl',
                  'bg-noir-elevated border border-border',
                  'hover:border-accent/50 hover:bg-noir/50',
                  'transition-all duration-300 ease-expo-out',
                  'group'
                )}
                onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <techIcons[cat.icon]
                  className={cn('w-5 h-5 transition-colors duration-300', `text-${cat.color}`, 'group-hover:scale-110')}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="font-mono text-caption text-fg-muted group-hover:text-fg transition-colors">
                  {cat.label}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="mt-20 flex flex-col items-center gap-3 text-fg-subtle"
          >
            <p className="font-mono text-caption">SCROLL</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-6 bg-border rounded-full relative overflow-hidden"
            >
              <motion.div
                className="absolute w-full h-2 bg-accent top-full"
                animate={{ y: [-8, 8] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';

// Particules flottantes
function FloatingParticles({ count = 20, color = 'accent' }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={cn(
            'absolute rounded-full',
            `bg-${color}/20`
          )}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
            y: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
            opacity: [0.1, 0.5, 0.1],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}