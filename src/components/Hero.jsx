import React, { useEffect, useState } from 'react';

const phrases = [
  "Je travaille avec Alassane depuis longtemps.",
  " Ce que je vais vous dire, il ne m'a pas demandé de le dire.",
];

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (phraseIndex >= phrases.length) return;
    const currentPhrase = phrases[phraseIndex];

    if (charIndex < currentPhrase.length) {
      const t = setTimeout(() => {
        setDisplayText(prev => prev + currentPhrase[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 42);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setPhraseIndex(prev => prev + 1);
        setCharIndex(0);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [charIndex, phraseIndex]);

  return (
    <section className="hero">
      <div className="eyebrow">
        <span className="eyebrow-line" />
        <span className="eyebrow-text">Témoignage sous serment</span>
      </div>

      <h1>
        Je connais Alassane.<br />
        La <span className="truth">vérité</span>, sans concession.
      </h1>

      <p className="hero-sub">
        <span>{displayText}</span>
        <span className="tw-cursor" />
      </p>

        {/* Badges de stack */}
      <div className="stack-badges">
        {['Python', 'React.js', 'Machine Learning', 'Node.js', 'SQL', 'Power BI', 'Streamlit'].map(s => (
          <span key={s} className="badge">{s}</span>
        ))}
      </div>

      <div className="cta-row">
        <a
          href="/Curriculum Vitae- Alassane GUEYE.pdf"
          download
          className="btn btn-gold"
        >
          Télécharger le CV <span className="btn-arrow">↓</span>
        </a>
        <a
          href="https://www.linkedin.com/in/alassane-gueye-216302283"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          LinkedIn <span className="btn-arrow">↗</span>
        </a>
        <a
          href="https://github.com/Alassanegueye"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          GitHub <span className="btn-arrow">↗</span>
        </a>

        <a
          href="https://www.africodexdigital.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          Africodex Digital <span className="btn-arrow">↗</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
