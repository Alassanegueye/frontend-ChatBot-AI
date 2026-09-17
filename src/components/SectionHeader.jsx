import React from 'react';
import { useReveal } from '../hooks/useReveal';

/**
 * SectionHeader — en-tête éditorial réutilisable (kicker + titre + lead).
 */
const SectionHeader = ({ kicker, title, lead, center = false, id }) => {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${shown ? 'is-in' : ''} ${center ? 'section--center' : ''}`}
      id={id}
    >
      {kicker && <span className={`kicker ${center ? 'kicker--center' : ''}`}>{kicker}</span>}
      {title && <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />}
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
};

export default SectionHeader;
