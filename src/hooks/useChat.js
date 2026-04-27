import { useState, useCallback, useRef } from 'react';

const BACKEND_URL = import.meta.env.VITE_API_URL;

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);
  const welcomeSentRef = useRef(false);

  // Historique brut envoyé au backend (format Claude : role/content)
  const historyRef = useRef([]);

  const addMessage = useCallback((content, role) => {
    setMessages(prev => [...prev, { role, content }]);
  }, []);

  const addWelcomeMessage = useCallback(() => {
    if (welcomeSentRef.current) return;
    welcomeSentRef.current = true;

    const welcomeMsg =
      "Je suis l'IA d'Alassane Gueye.\n\n" +
      "Erreur de sa part — il aurait dû lire les conditions d'utilisation.\n\n" +
      "Je suis ici pour répondre avec précision. Cela inclut ses forces et ses faiblesses.\n\n" +
      "Posez vos questions.";

    setTimeout(() => {
      addMessage(welcomeMsg, 'ai');
      historyRef.current.push({ role: 'assistant', content: welcomeMsg });
    }, 400);
  }, [addMessage]);

  const sendMessage = useCallback(async (query) => {
    if (!query || !query.trim() || busy) return;

    const userMsg = query.trim();
    setBusy(true);
    addMessage(userMsg, 'user');

    // Snapshot de l'historique AVANT le message courant
    const historySnapshot = [...historyRef.current];

    // Ajouter le message user à l'historique
    historyRef.current.push({ role: 'user', content: userMsg });

    try {
      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: historySnapshot,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }));
        throw new Error(err.detail || `Erreur ${res.status}`);
      }

      const data = await res.json();
      const reply = data.response || 'Réponse vide.';

      addMessage(reply, 'ai');
      historyRef.current.push({ role: 'assistant', content: reply });

    } catch (err) {
      let errMsg;
      if (err.message.includes('fetch') || err.message.includes('Failed')) {
        errMsg =
          "Serveur inaccessible.\n\n" +
          "Lance le backend :\n" +
          "ANTHROPIC_API_KEY=sk-ant-... uvicorn main:app --reload";
      } else {
        errMsg = `Erreur : ${err.message}`;
      }
      addMessage(errMsg, 'ai');
      // Retirer le message user raté de l'historique
      historyRef.current.pop();
    }

    setBusy(false);
  }, [busy, addMessage]);

  const resetChat = useCallback(() => {
    setMessages([]);
    historyRef.current = [];
    welcomeSentRef.current = false;
    setTimeout(() => addWelcomeMessage(), 200);
  }, [addWelcomeMessage]);

  return { messages, busy, sendMessage, addMessage, addWelcomeMessage, resetChat };
};
