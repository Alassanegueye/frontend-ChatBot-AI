import React from 'react';
import { ImageIcon } from './Icons';

/**
 * ImagePlaceholder — emplacement image professionnel et remplaçable.
 *
 * - Si `src` est renseigné : affiche l'image réelle (object-fit: cover).
 * - Sinon : affiche un placeholder élégant avec libellé (ex: "PROJECT SCREENSHOT").
 *
 * Pour ajouter une image plus tard : placez le fichier dans /public
 * et passez src="/votre-image.png". Le ratio reste stable (prop `ratio`).
 */
const ImagePlaceholder = ({ src, ratio, label = 'IMAGE', Icon = ImageIcon, className = '' }) => {
  return (
    <div className={`ph ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      {src ? (
        <img src={src} alt={label} loading="lazy" />
      ) : (
        <span className="ph__label">
          <span className="ic"><Icon size={16} /></span>
          {label}
        </span>
      )}
    </div>
  );
};

export default ImagePlaceholder;
