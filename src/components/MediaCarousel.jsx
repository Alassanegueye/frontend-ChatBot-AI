import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * MediaCarousel — défilement automatique de captures (mobile ou web).
 *
 * - Avance seul, en boucle. Une capture peut demander à rester plus longtemps
 *   à l'écran via `hold` (utile pour une vidéo, qu'on laisse se dérouler).
 * - Se met en pause au survol, au focus clavier et quand la section
 *   n'est plus visible à l'écran (pas d'animation dans le vide).
 * - Navigation manuelle via les pastilles ; les flèches ← → fonctionnent
 *   quand le carrousel a le focus.
 * - Respecte prefers-reduced-motion : plus d'avance automatique.
 *
 * Toutes les captures ont la même hauteur mais gardent leur format d'origine
 * (une même application peut mélanger des écrans capturés sur des appareils
 * différents). Le centrage est donc mesuré sur la piste plutôt que calculé
 * à partir d'une largeur unique.
 */
const MediaCarousel = ({
  screens,
  ratio = [768, 1376],
  interval = 2000,
  wide = false,
  label = 'Captures',
  index: indexImpose,       // piloté par le défilement quand la vitrine est épinglée
  onIndex,
}) => {
  const pilote = typeof indexImpose === 'number';
  const [indexLocal, setIndexLocal] = useState(0);
  const index = pilote ? indexImpose : indexLocal;

  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [offset, setOffset] = useState(0);
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const videoRefs = useRef({});

  const count = screens.length;
  const setIndex = useCallback((v) => {
    const suivant = typeof v === 'function' ? v(index) : v;
    if (pilote) onIndex?.(suivant);
    else setIndexLocal(suivant);
  }, [pilote, onIndex, index]);

  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count, setIndex]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // L'utilisateur a demandé à réduire les animations : on n'avance plus tout seul
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // Centre la capture courante, quelles que soient les largeurs voisines
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

  // La vidéo affichée tourne en boucle ; les autres sont remises à zéro
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([i, el]) => {
      if (!el) return;
      if (Number(i) === index && visible) {
        el.play?.().catch(() => {});
      } else {
        el.pause?.();
        if (Number(i) !== index) { try { el.currentTime = 0; } catch {} }
      }
    });
  }, [index, paused, visible]);

  // Pause quand la section sort de l'écran
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

  // Défilement automatique — inactif quand c'est la page qui fait avancer
  useEffect(() => {
    if (pilote || reduced || paused || !visible) return;
    const wait = screens[index]?.hold || interval;
    const id = setTimeout(() => setIndexLocal((i) => (i + 1) % count), wait);
    return () => clearTimeout(id);
  }, [pilote, reduced, paused, visible, index, count, interval, screens]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  const current = screens[index];

  return (
    <div
      className={`pcar ${wide ? 'pcar--wide' : ''}`}
      ref={rootRef}
      /* Pause au survol pour laisser lire ; un clic sur les commandes ne fige
         pas la lecture, elle reprend d'elle-même. */
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="group"
      aria-roledescription="carrousel"
      aria-label={label}
    >
      <div className="pcar__viewport">
        <div
          className="pcar__track"
          ref={trackRef}
          style={{ transform: `translateX(${-offset}px)` }}
        >
          {screens.map((s, i) => {
            const [w, h] = s.ratio || ratio;
            // une capture large est un ecran, une capture haute est un appareil
            const paysage = w > h;
            return (
              <figure
                className={`pcar__slide ${i === index ? 'is-active' : ''}`}
                style={{ '--phone-ar': `${w} / ${h}` }}
                key={s.title}
                aria-hidden={i !== index}
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

      {/* Le visiteur peut reprendre la main à tout moment */}
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
  );
};

export default MediaCarousel;
