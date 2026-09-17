import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import Lightbox from './Lightbox';

/**
 * MediaCarousel — défilement automatique de captures (mobile ou web).
 *
 * - Balayage tactile (swipe mobile vers la gauche / droite) réactif.
 * - Clic sur une photo / vidéo pour ouvrir en plein écran (Lightbox avec zoom).
 * - Avance seul, en boucle. Une capture peut demander à rester plus longtemps
 *   à l'écran via `hold`.
 * - Se met en pause au survol, au touch et au focus clavier.
 */
const MediaCarousel = ({
  screens,
  ratio = [768, 1376],
  interval = 2000,
  wide = false,
  label = 'Captures',
  index: indexImpose,
  onIndex,
}) => {
  const pilote = typeof indexImpose === 'number';
  const [indexLocal, setIndexLocal] = useState(0);
  const index = pilote ? indexImpose : indexLocal;

  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [offset, setOffset] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const videoRefs = useRef({});
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const count = screens.length;
  const setIndex = useCallback((v) => {
    const suivant = typeof v === 'function' ? v(index) : v;
    if (pilote) onIndex?.(suivant);
    else setIndexLocal(suivant);
  }, [pilote, onIndex, index]);

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count, setIndex]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // Touch handlers pour swipe tactile sur mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setPaused(false);
    const diff = touchStartX.current - touchEndX.current;
    const minDistance = 35;
    if (Math.abs(diff) > minDistance) {
      if (diff > 0) next();
      else prev();
    }
  };

  const openLightbox = (i) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  // Respect des préférences réduites
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // Centrage de la capture courante
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const center = () => {
      const slide = track.children[index];
      if (slide) setOffset(slide.offsetLeft + slide.offsetWidth / 2);
    };
    center();

    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(center);
    ro.observe(track);
    return () => ro.disconnect();
  }, [index, count]);

  // Contrôle des vidéos
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([i, el]) => {
      if (!el) return;
      if (Number(i) === index && visible && !lightboxOpen) {
        el.play?.().catch(() => {});
      } else {
        el.pause?.();
        if (Number(i) !== index) { try { el.currentTime = 0; } catch {} }
      }
    });
  }, [index, paused, visible, lightboxOpen]);

  // Pause d'intersection
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Défilement automatique
  useEffect(() => {
    if (pilote || reduced || paused || !visible || lightboxOpen) return;
    const wait = screens[index]?.hold || interval;
    const id = setTimeout(() => setIndexLocal((i) => (i + 1) % count), wait);
    return () => clearTimeout(id);
  }, [pilote, reduced, paused, visible, lightboxOpen, index, count, interval, screens]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  const current = screens[index];

  return (
    <>
      <div
        className={`pcar ${wide ? 'pcar--wide' : ''}`}
        ref={rootRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="group"
        aria-roledescription="carrousel"
        aria-label={label}
      >
        <div
          className="pcar__viewport"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="pcar__track"
            ref={trackRef}
            style={{ transform: `translateX(${-offset}px)` }}
          >
            {screens.map((s, i) => {
              const [w, h] = s.ratio || ratio;
              const paysage = w > h;
              return (
                <figure
                  className={`pcar__slide ${i === index ? 'is-active' : ''}`}
                  style={{ '--phone-ar': `${w} / ${h}` }}
                  key={s.title}
                  aria-hidden={i !== index}
                  onClick={() => openLightbox(i)}
                  title="Cliquer pour afficher en plein écran"
                >
                  <div className={paysage ? 'screen' : 'phone'}>
                    {s.type === 'video' ? (
                      <video
                        ref={(el) => { videoRefs.current[i] = el; }}
                        src={s.src}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={s.title}
                      />
                    ) : (
                      <img
                        src={s.src}
                        alt={s.title}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        draggable="false"
                      />
                    )}
                  </div>
                </figure>
              );
            })}
          </div>
        </div>

        <div className="pcar__caption" aria-live="polite">
          <span className="pcar__step">
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
          <strong className="pcar__title">{current.title}</strong>
          <p className="pcar__text">{current.caption}</p>
        </div>

        <div className="pcar__commandes">
          <button
            type="button"
            className="pcar__fleche"
            aria-label="Capture précédente"
            onClick={prev}
          >
            <ChevronLeft size={19} />
          </button>

          <div className="pcar__dots">
            {screens.map((s, i) => (
              <button
                type="button"
                key={s.title}
                className={`pcar__dot ${i === index ? 'is-active' : ''}`}
                aria-current={i === index}
                aria-label={`Voir la capture : ${s.title}`}
                onClick={() => go(i)}
              >
                <span className="pcar__dotFill" />
              </button>
            ))}
          </div>

          <button
            type="button"
            className="pcar__fleche"
            aria-label="Capture suivante"
            onClick={next}
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>

      {/* Lightbox plein écran */}
      <Lightbox
        items={screens}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
};

export default MediaCarousel;
