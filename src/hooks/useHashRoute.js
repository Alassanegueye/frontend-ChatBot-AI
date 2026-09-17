import { useEffect, useState } from 'react';

/**
 * useHashRoute — petite route basée sur le hash de l'URL.
 *
 * Permet d'ouvrir une fiche projet (#projet/signs) sans installer de router :
 * l'URL reste partageable et le bouton « précédent » du navigateur referme la fiche.
 *
 * Renvoie le hash sans le "#" (ex: "projet/signs"), ou '' si absent.
 */
export const useHashRoute = () => {
  const read = () =>
    typeof window === 'undefined' ? '' : window.location.hash.replace(/^#/, '');

  const [route, setRoute] = useState(read);

  useEffect(() => {
    const onChange = () => setRoute(read());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
};

/** Ferme la vue courante en retirant le hash, sans ajouter d'entrée d'historique. */
export const clearHash = () => {
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
};
