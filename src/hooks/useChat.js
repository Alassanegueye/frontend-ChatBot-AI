import { useState, useCallback, useRef } from 'react';

/**
 * useChat — dialogue avec le backend FastAPI déployé sur Render.
 *
 * Particularité de l'hébergement : une instance gratuite Render s'endort
 * après quelques minutes sans trafic et met une trentaine de secondes à
 * se réveiller. Le hook en tient compte : il réveille le service dès
 * l'ouverture du chat, laisse au premier appel le temps d'aboutir, et
 * signale l'attente au lieu de la faire passer pour une panne.
 */

const BACKEND_URL = import.meta.env.VITE_API_URL;

const DELAI_REVEIL = 75000;   // premier appel : le serveur peut dormir
const DELAI_NORMAL = 45000;   // ensuite, il répond vite

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);
  const [reveil, setReveil] = useState(false);   // le serveur est en train de se lever

  const welcomeSentRef = useRef(false);
  const historyRef = useRef([]);
  const eveilleRef = useRef(false);

  const addMessage = useCallback((content, role) => {
    setMessages(prev => [...prev, { role, content }]);
  }, []);

  /** Réveille l'instance pendant que le visiteur lit le message d'accueil. */
  const reveiller = useCallback(async () => {
    if (eveilleRef.current || !BACKEND_URL) return;
    eveilleRef.current = true;
    try {
      await fetch(`${BACKEND_URL}/`, { method: 'GET', signal: AbortSignal.timeout(DELAI_REVEIL) });
    } catch {
      eveilleRef.current = false;   // on réessaiera au premier message
    }
  }, []);

  const addWelcomeMessage = useCallback(() => {
    if (welcomeSentRef.current) return;
    welcomeSentRef.current = true;

    const welcomeMsg =
      "Je suis l'IA d'Alassane Gueye.\n\n" +
      "Erreur de sa part — il aurait dû lire les conditions d'utilisation.\n\n" +
      "Je suis ici pour répondre avec précision. Cela inclut ses forces et ses faiblesses.\n\n" +
      "Posez vos questions.";

    addMessage(welcomeMsg, 'ai');
    historyRef.current.push({ role: 'assistant', content: welcomeMsg });

    reveiller();
  }, [addMessage, reveiller]);

  const sendMessage = useCallback(async (query) => {
    if (!query || !query.trim() || busy) return;

    if (!BACKEND_URL) {
      addMessage(
        "Configuration incomplète : l'adresse du serveur n'est pas renseignée.\n\n" +
        "Définissez VITE_API_URL dans l'environnement de build.",
        'ai'
      );
      return;
    }

    const userMsg = query.trim();
    setBusy(true);
    addMessage(userMsg, 'user');

    const historySnapshot = [...historyRef.current];
    historyRef.current.push({ role: 'user', content: userMsg });

    // Premier échange : on prévient que le serveur peut mettre du temps
    const premier = !eveilleRef.current;
    if (premier) setReveil(true);

    const appel = (delai) =>
      fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: historySnapshot }),
        signal: AbortSignal.timeout(delai),
      });

    try {
      let res;
      try {
        res = await appel(premier ? DELAI_REVEIL : DELAI_NORMAL);
      } catch (premiereErreur) {
        // Un échec réseau sur instance endormie : une seconde tentative suffit souvent
        if (premiereErreur.name === 'TimeoutError' || premiereErreur.name === 'TypeError') {
          res = await appel(DELAI_REVEIL);
        } else {
          throw premiereErreur;
        }
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }));
        throw new Error(err.detail || `Erreur ${res.status}`);
      }

      const data = await res.json();
      const reply = data.response || 'Réponse vide.';

      eveilleRef.current = true;
      addMessage(reply, 'ai');
      historyRef.current.push({ role: 'assistant', content: reply });

    } catch (err) {
      let errMsg;

      if (err.name === 'TimeoutError') {
        errMsg =
          "Le serveur met trop de temps à répondre.\n\n" +
          "L'hébergement se met en veille après une période sans visite : " +
          "la première question peut demander une minute. Réessayez.";
      } else if (err.name === 'TypeError' || /fetch|Failed|NetworkError/i.test(err.message)) {
        errMsg =
          "Serveur injoignable pour le moment.\n\n" +
          "Réessayez dans quelques instants — ou écrivez directement à " +
          "alassanegpro@gmail.com.";
      } else {
        errMsg = `Erreur : ${err.message}`;
      }

      addMessage(errMsg, 'ai');
      historyRef.current.pop();
    }

    setReveil(false);
    setBusy(false);
  }, [busy, addMessage]);

  const resetChat = useCallback(() => {
    setMessages([]);
    historyRef.current = [];
    welcomeSentRef.current = false;
    addWelcomeMessage();
  }, [addWelcomeMessage]);

  return {
    messages,
    busy,
    reveil,
    sendMessage,
    addMessage,
    addWelcomeMessage,
    resetChat,
  };
};
