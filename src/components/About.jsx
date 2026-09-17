import React from 'react';
import { motion } from 'framer-motion';
import { stats, aboutNarrative } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import { FolderOpen, Building2, Layers, Star, Code2 } from 'lucide-react';

/** Une icône et une teinte par chiffre, dans l'ordre des stats. */
const TEINTES = [
  { Icone: FolderOpen, ton: 'bleu' },
  { Icone: Building2, ton: 'vert' },
  { Icone: Layers, ton: 'violet' },
  { Icone: Star, ton: 'or' },
];

const About = () => {
  const [ref, shown] = useReveal();

  return (
    <section id="about" className="section apropos">
      <div className="shell">
        <span className="kicker">À propos</span>

        <div className="apropos__grid" ref={ref}>
          {/* Colonne de gauche : l'affirmation */}
          <div className={`apropos__gauche reveal ${shown ? 'is-in' : ''}`}>
            <h2 className="apropos__titre">
              Pas juste un<br />
              <em>développeur.</em><br />
              Un bâtisseur de produits.
            </h2>

            <p className="apropos__lead">
              Du premier ligne de code au déploiement, je couvre la chaîne
              complète — et j'étends sans cesse mon terrain de jeu.
            </p>

            <div className="apropos__encart">
              <span className="apropos__icone"><Code2 size={19} /></span>
              <p>
                Je conçois et développe des <em>expériences numériques</em> modernes —
                du frontend au backend, du web au mobile.
              </p>
            </div>
          </div>

          {/* Colonne de droite : le récit */}
          <div className={`apropos__droite reveal ${shown ? 'is-in' : ''}`} data-delay="1">
            <h3 className="apropos__sousTitre">Mon parcours</h3>
            <p>
              Je suis un développeur <strong>Full Stack</strong> qui a démarré côté web,
              puis a étendu ses compétences au <strong>mobile</strong> avec <strong>Flutter</strong>,
              aux <strong>API</strong> et aux environnements techniques. Ce qui me motive,
              c'est de voir une idée devenir une application réelle, déployable et
              agréable à utiliser.
            </p>
            <p>
              Je travaille aussi bien sur des interfaces que sur la logique métier,
              les données et les outils qui font tourner un projet au quotidien.
            </p>
          </div>
        </div>

        {/* Les chiffres, en une barre */}
        <div className="apropos__chiffres">
          {stats.map((s, i) => {
            const { Icone, ton } = TEINTES[i % TEINTES.length];
            return (
              <motion.div
                className="apropos__chiffre"
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={`apropos__pastille is-${ton}`}><Icone size={19} /></span>
                <span className="apropos__valeur">{s.value}</span>
                <span className="apropos__label">{s.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
