import React from 'react';
import { motion } from 'framer-motion';
import { profile, socials } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import SectionHeader from './SectionHeader';
import { Mail, MapPin, Phone, FileDown, ArrowUpRight, LinkedinIcon, GithubIcon, WhatsappIcon } from './Icons';

const Contact = () => {
  const [ref, shown] = useReveal();

  // Le lien vit derrière l'icône : pas d'URL affichée
  const reseaux = [
    { label: 'Email', href: `mailto:${socials.email}`, Icon: Mail },
    { label: 'LinkedIn', href: socials.linkedin, Icon: LinkedinIcon },
    { label: 'GitHub', href: socials.github, Icon: GithubIcon },
    profile.phone && {
      label: 'WhatsApp',
      href: `https://wa.me/${profile.phone.replace(/\D/g, '')}`,
      Icon: WhatsappIcon,
    },
    profile.phone && { label: 'Téléphone', href: `tel:${profile.phone.replace(/\s/g, '')}`, Icon: Phone },
  ].filter(Boolean);

  return (
    <section id="contact" className="section contact">
      <div className="shell">
        <SectionHeader
          center
          kicker="Contact"
          title="Un projet en tête ?<br/>Construisons-le <em>ensemble</em>."
          lead="Une idée, un besoin, un défi technique ? Écrivez-moi, on en discute."
        />

        <div className="contact__zone" ref={ref}>
          <div className={`contact__lieu reveal ${shown ? 'is-in' : ''}`}>
            <MapPin size={15} /> {profile.location}
          </div>

          {/* Réseaux : une icône, un lien, rien de plus */}
          <div className={`contact__reseaux reveal ${shown ? 'is-in' : ''}`} data-delay="1">
            {reseaux.map(({ label, href, Icon }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="contact__rond"
                aria-label={label}
                title={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: 0.06 * i, duration: 0.45 }}
                whileHover={{ y: -5 }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>

          <div className={`contact__cta reveal ${shown ? 'is-in' : ''}`} data-delay="2">
            <a href={`mailto:${socials.email}`} className="btn btn--light">
              Écrire un email <Mail size={16} className="arr" />
            </a>
            {profile.cvUrl && (
              <>
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline-light"
                >
                  Consulter mon CV <ArrowUpRight size={16} className="arr" />
                </a>
                <a href={profile.cvUrl} download className="btn btn--outline-light">
                  Télécharger <FileDown size={16} className="arr" />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
