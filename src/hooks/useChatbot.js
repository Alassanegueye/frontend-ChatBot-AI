import { useState, useEffect, useCallback, useRef } from 'react';
import { chatbotMessages } from '../data/portfolio';

export function useChatbot(activeSection) {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const messageTimerRef = useRef(null);
  const notificationTimerRef = useRef(null);

  // Changer le message quand la section change
  useEffect(() => {
    const messages = chatbotMessages[activeSection] || chatbotMessages.hero;
    setMessage(messages[0]);
    setMessageIndex(0);

    // Nettoyer les timers précédents
    if (messageTimerRef.current) clearInterval(messageTimerRef.current);
    if (notificationTimerRef.current) clearTimeout(notificationTimerRef.current);

    // Cycle des messages toutes les 8-12 secondes
    messageTimerRef.current = setInterval(() => {
      setMessageIndex((prev) => {
        const next = (prev + 1) % messages.length;
        return next;
      });
    }, 10000);

    // Notification après 5s d'inactivité
    notificationTimerRef.current = setTimeout(() => {
      setShowNotification(true);
    }, 5000);

    return () => {
      if (messageTimerRef.current) clearInterval(messageTimerRef.current);
      if (notificationTimerRef.current) clearTimeout(notificationTimerRef.current);
    };
  }, [activeSection]);

  // Mettre à jour le message affiché quand l'index change
  useEffect(() => {
    const messages = chatbotMessages[activeSection] || chatbotMessages.hero;
    if (messages[messageIndex]) {
      setMessage(messages[messageIndex]);
    }
  }, [messageIndex, activeSection]);

  const toggleChatbot = useCallback(() => {
    setIsOpen((prev) => !prev);
    setShowNotification(false);
  }, []);

  const closeChatbot = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Animation de "respiration" du bouton
  const [breathe, setBreathe] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setBreathe((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return {
    message,
    isOpen,
    toggleChatbot,
    closeChatbot,
    showNotification,
    setShowNotification,
    breathe,
  };
}

// Placeholder pour le futur vrai chatbot
export function useChatbotLogic() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { role: 'user', content: text, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulation de réponse (à remplacer par vraie API plus tard)
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1500));

    const responses = [
      "Le vrai chatbot n'est pas encore implémenté. Mais je suis là pour observer. ",
      "Alassane travaille dessus. Revenez plus tard.",
      "Pour l'instant, je ne fais que des messages prédéfinis. Mais j'ai de l'ambition.",
      "Une IA conversationnelle arrive. Patience.",
    ];

    const botMessage = {
      role: 'assistant',
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  }, [isLoading]);

  return { messages, input, setInput, isLoading, sendMessage };
}