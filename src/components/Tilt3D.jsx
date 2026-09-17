import React, { useRef, useState } from 'react';

/**
 * Tilt3D — incline son contenu vers la souris, en perspective.
 *
 * L'inclinaison reste faible par choix : elle doit se sentir sans se voir,
 * sinon le texte devient pénible à lire. Désactivée au clavier, au tactile
 * et quand l'utilisateur demande à réduire les animations.
 */
const Tilt3D = ({ children, force = 7, brillance = true, className = '', inner = '', ...props }) => {
  const ref = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0, mx: 50, my: 50, actif: false });

  const reduit =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const bouge = (e) => {
    if (reduit || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({
      x: (0.5 - py) * force * 2,
      y: (px - 0.5) * force * 2,
      mx: px * 100,
      my: py * 100,
      actif: true,
    });
  };

  const sort = () => setT((v) => ({ ...v, x: 0, y: 0, actif: false }));

  return (
    <div
      ref={ref}
      className={`tilt ${t.actif ? 'is-tilting' : ''} ${className}`}
      onMouseMove={bouge}
      onMouseLeave={sort}
      style={{
        '--rx': `${t.x}deg`,
        '--ry': `${t.y}deg`,
        '--mx': `${t.mx}%`,
        '--my': `${t.my}%`,
      }}
      {...props}
    >
      {/* c'est la carte elle-même qui s'incline, pas seulement son contenu */}
      <div className={`tilt__inner ${inner}`}>
        {children}
        {brillance && <span className="tilt__gloss" aria-hidden="true" />}
      </div>
    </div>
  );
};

export default Tilt3D;
