'use client';

import { motion } from 'framer-motion';
import { aboutNarrative, profile } from '../../data/portfolio';
import { cn } from '../../lib/utils';

export function About() {
  return (
    <section
      id="about"
      className="section relative overflow-hidden"
      data-theme="about"
    >
      <div className="grid-bg-light" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Colonne gauche - Narration */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'expoOut' }}
              className="space-y-6"
            >
              <p className="font-mono text-caption text-accent">À PROPOS</p>
              <h2 className="font-display text-display-2 text-fg leading-[1.0]">
                Je ne suis pas devenu développeur pour écrire du code.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'expoOut' }}
              className="space-y-6 text-body-lg text-fg-muted"
            >
              {aboutNarrative.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: 'expoOut' }}
                  className={cn(i === aboutNarrative.length - 1 && 'text-fg font-medium')}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>

            {/* Stats rapides */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.8, duration: 0.8, ease: 'expoOut' }}
              className="grid grid-cols-2 gap-4 pt-8 border-t border-border"
            >
              <StatItem value="3+" label="Années d'expérience" />
              <StatItem value="20+" label="Technologies" />
              <StatItem value="15+" label="Projets livrés" />
              <StatItem value="∞" label="Curiosité" />
            </motion.div>
          </div>

          {/* Colonne droite - Photo + Info */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'expoOut' }}
              className="relative"
            >
              {/* Photo principale */}
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden bg-bg-elevated border border-border">
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-fg-subtle p-8">
                    <div className="w-24 h-24 rounded-full border-2 border-border flex items-center justify-center">
                      <span className="text-4xl font-display font-bold text-fg-muted">{profile.firstName[0]}</span>
                    </div>
                    <p className="font-mono text-caption">Photo à venir</p>
                  </div>
                )}

                {/* Accents décoratifs */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-accent/30 rounded-full opacity-50" />
                <div className="absolute bottom-6 left-6 w-32 h-px bg-gradient-to-r from-accent to-transparent" />
              </div>

              {/* Badge flottant */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 md:-left-8 bg-accent text-noir px-5 py-3 rounded-2xl shadow-elevated"
              >
                <p className="font-mono text-caption text-noir">DISPONIBLE</p>
                <p className="font-body text-sm font-medium text-noir">Pour nouveaux projets</p>
              </motion.div>
            </motion.div>

            {/* Infos rapides */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'expoOut' }}
              className="mt-10 grid grid-cols-2 gap-4"
            >
              <InfoCard icon="MapPin" label="Localisation" value={profile.location} />
              <InfoCard icon="Mail" label="Email" value={profile.email} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, label }) {
  return (
    <div className="text-center p-4 bg-bg-elevated/50 border border-border/50 rounded-2xl">
      <p className="font-display text-display-3 text-accent">{value}</p>
      <p className="font-mono text-caption text-fg-subtle mt-1">{label}</p>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-bg-elevated border border-border rounded-2xl p-5 flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-accent" strokeWidth={2} />
      </div>
      <div>
        <p className="font-mono text-caption text-fg-subtle">{label}</p>
        <p className="font-body text-body text-fg mt-1">{value}</p>
      </div>
    </div>
  );
}

// Icons pour InfoCard
import { MapPin, Mail } from 'lucide-react';