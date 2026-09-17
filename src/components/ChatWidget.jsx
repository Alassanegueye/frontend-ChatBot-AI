import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, RotateCcw } from 'lucide-react';
import { useChat } from '../hooks/useChat';

/**
 * ChatWidget — le témoin d'Alassane, accessible depuis toutes les pages.
 *
 * Une bulle flottante en bas à droite, accompagnée d'une accroche qui
 * apparaît après quelques secondes pour inviter à engager la conversation.
 * Les réponses viennent du backend FastAPI (POST /chat).
 */

const ACCROCHES = [
  'Je peux te parler de lui',
  'Pose-moi des questions sur Alassane',
  'Je dis ce que son CV ne dit pas',
];

/** Questions proposées au visiteur, reprises du premier chatbot. */
const QUESTIONS = [
  "Quelles sont réellement ses compétences techniques ?",
  "Parle-moi de ses projets en détail",
  "Pourquoi devrais-je le recruter plutôt qu'un autre ?",
  "Quels types de problèmes peut-il résoudre concrètement ?",
  "Est-il vraiment compétent ou juste bien présenté ?",
  "Explique-moi son projet phare comme si j'étais un décideur métier",
  "Quelles sont ses vraies faiblesses ?",
  "Quel est son parcours académique ?",
];

const ChatWidget = () => {
  const [ouvert, setOuvert] = useState(false);
  const [accroche, setAccroche] = useState(false);
  const [phrase, setPhrase] = useState(0);
  const [saisie, setSaisie] = useState('');

  const { messages, busy, reveil, sendMessage, addWelcomeMessage, resetChat } = useChat();
  const finRef = useRef(null);
  const champRef = useRef(null);

  // L'accroche apparaît une fois le visiteur installé, puis tourne
  useEffect(() => {
    if (ouvert) return;
    const debut = setTimeout(() => setAccroche(true), 4000);
    const rotation = setInterval(() => {
      setPhrase((p) => (p + 1) % ACCROCHES.length);
    }, 9000);
    return () => { clearTimeout(debut); clearInterval(rotation); };
  }, [ouvert]);

  // Message d'accueil à la première ouverture, focus sur le champ
  useEffect(() => {
    if (!ouvert) return;
    addWelcomeMessage();
    setAccroche(false);
    const t = setTimeout(() => champRef.current?.focus(), 250);
    return () => clearTimeout(t);
  }, [ouvert, addWelcomeMessage]);

  // La conversation reste collée au dernier message
  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, busy]);

  // Échap referme
  useEffect(() => {
    if (!ouvert) return;
    const onKey = (e) => { if (e.key === 'Escape') setOuvert(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [ouvert]);

  const envoyer = (e) => {
    e.preventDefault();
    if (!saisie.trim() || busy) return;
    sendMessage(saisie);
    setSaisie('');
  };

  return (
    <>
      {/* Bulle flottante */}
      <div className="chat__ancre">
        <AnimatePresence>
          {accroche && !ouvert && (
            <motion.div
              className="chat__accroche"
              initial={{ opacity: 0, y: 12, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={phrase}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  {ACCROCHES[phrase]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          className={`chat__boule ${ouvert ? 'is-open' : ''}`}
          onClick={() => setOuvert((v) => !v)}
          aria-expanded={ouvert}
          aria-label={ouvert ? 'Fermer la conversation' : 'Ouvrir la conversation'}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          animate={ouvert ? {} : { y: [0, -5, 0] }}
          transition={ouvert ? {} : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {ouvert ? <X size={22} /> : <Bot size={24} />}
          {!ouvert && <span className="chat__pastille" />}
        </motion.button>
      </div>

      {/* Questions suggérées, en colonne à gauche du panneau */}
      <AnimatePresence>
        {ouvert && (
          <motion.aside
            className="chat__questions"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 18 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Questions suggérées"
          >
            <p className="chat__questionsTitre">Questions pour le recruteur</p>
            {QUESTIONS.map((q, i) => (
              <motion.button
                type="button"
                key={q}
                className="chat__question"
                onClick={() => !busy && sendMessage(q)}
                disabled={busy}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.035, duration: 0.3 }}
              >
                {q}
              </motion.button>
            ))}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Panneau de conversation */}
      <AnimatePresence>
        {ouvert && (
          <motion.div
            className="chat__panneau"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Conversation avec l'IA du portfolio"
          >
            <header className="chat__entete">
              <span className="chat__avatar"><Bot size={18} /></span>
              <div className="chat__ident">
                <strong>Le témoin</strong>
                <span>Répond sur Alassane, sans complaisance</span>
              </div>
              <button
                type="button"
                className="chat__action"
                onClick={resetChat}
                aria-label="Recommencer la conversation"
                title="Recommencer"
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                className="chat__action"
                onClick={() => setOuvert(false)}
                aria-label="Fermer"
              >
                <X size={16} />
              </button>
            </header>

            <div className="chat__fil">
              {messages.map((m, i) => (
                <div key={i} className={`chat__bulle ${m.role === 'user' ? 'is-moi' : 'is-ia'}`}>
                  {m.content}
                </div>
              ))}

              {busy && (
                <div className="chat__bulle is-ia chat__attente" aria-live="polite">
                  <span /><span /><span />
                  {reveil && <em>le serveur se réveille, une minute environ</em>}
                </div>
              )}
              <div ref={finRef} />
            </div>

            <form className="chat__saisie" onSubmit={envoyer}>
              <input
                ref={champRef}
                type="text"
                value={saisie}
                onChange={(e) => setSaisie(e.target.value)}
                placeholder="Posez votre question…"
                aria-label="Votre message"
                disabled={busy}
              />
              <button type="submit" disabled={busy || !saisie.trim()} aria-label="Envoyer">
                <Send size={17} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
