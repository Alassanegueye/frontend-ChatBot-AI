import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

/**
 * Lightbox — Visualiseur Plein Écran pour images & vidéos.
 * Supporte le balayage tactile (swipe mobile), les flèches clavier et le bouton fermer.
 */
const Lightbox = ({ items = [], initialIndex = 0, isOpen = false, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, items.length]);

  if (!isOpen || !items.length) return null;

  const count = items.length;
  const current = items[currentIndex] || items[0];

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % count);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + count) % count);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        goNext(); // Glissement vers la gauche -> suivant
      } else {
        goPrev(); // Glissement vers la droite -> précédent
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        {/* Bouton Fermer */}
        <button
          type="button"
          className="lightbox__close"
          onClick={onClose}
          aria-label="Fermer la vue plein écran"
        >
          <X size={24} />
        </button>

        {/* Boutons de navigation */}
        {count > 1 && (
          <>
            <button
              type="button"
              className="lightbox__nav lightbox__nav--prev"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Image précédente"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              type="button"
              className="lightbox__nav lightbox__nav--next"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="Image suivante"
            >
              <ChevronRight size={28} />
            </button>
          </>
        )}

        {/* Zone de contenu principale avec événements tactiles */}
        <div
          className="lightbox__content"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="lightbox__media-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              {current.type === 'video' ? (
                <video
                  src={current.src}
                  controls
                  autoPlay
                  loop
                  className="lightbox__media"
                />
              ) : (
                <img
                  src={current.src}
                  alt={current.title || 'Image plein écran'}
                  className="lightbox__media"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Légende & Compteur */}
          <div className="lightbox__info">
            <div className="lightbox__counter">
              {String(currentIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </div>
            {current.title && <h3 className="lightbox__title">{current.title}</h3>}
            {current.caption && <p className="lightbox__caption">{current.caption}</p>}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
