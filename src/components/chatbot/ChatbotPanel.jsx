'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { useChatbotLogic } from '../../hooks/useChatbot';

export function ChatbotPanel({ isOpen, onClose, activeSection }) {
  const { messages, input, setInput, isLoading, sendMessage } = useChatbotLogic();
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-noir/60 backdrop-blur-sm z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'expoOut' }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-md md:max-w-lg
                       h-[60vh] max-h-[700px] flex flex-col
                       bg-noir-elevated border border-border rounded-3xl
                       shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6)]
                       overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Chatbot - Bientôt disponible"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-accent" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-display text-heading-2 text-fg">Chatbot</p>
                  <p className="font-mono text-caption text-fg-subtle">Bientôt disponible • v0.1</p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl bg-bg-elevated border border-border
                           text-fg-muted hover:text-fg hover:border-accent/50
                           transition-colors duration-200"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ scrollbarWidth: 'thin' }}>
              <AnimatePresence>
                {messages.length === 0 ? (
                  <motion.div
                    key="welcome"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: 'expoOut' }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-accent" strokeWidth={2} />
                    </div>
                    <div className="bg-bg-elevated border border-border rounded-2xl p-4 max-w-[85%]">
                      <p className="text-fg-muted text-body-sm mb-3">
                        <span className="text-accent font-mono text-caption">SYSTÈME</span>
                        {' — Le chatbot IA n\'est pas encore développé.'}
                      </p>
                      <p className="text-fg text-body">
                        Cette interface est un placeholder. Le véritable chatbot conversationnel
                        sera intégré dans une prochaine version avec :
                      </p>
                      <ul className="mt-3 space-y-2 text-fg-muted text-body-sm">
                        {[
                          'Mémoire conversationnelle persistante',
                          'Connaissance complète du portfolio',
                          'Réponses contextuelles par section',
                          'Capacité à montrer des projets/démos',
                          'Mode vocal (Web Speech API)',
                        ].map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-vert-soft flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-fg-subtle text-body-sm font-mono text-caption">
                        Revenez plus tard pour discuter avec la vraie IA.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  messages.map((msg, i) => (
                    <motion.div
                      key={msg.timestamp}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4, ease: 'expoOut' }}
                      className={cn('flex items-start gap-3', msg.role === 'user' && 'flex-row-reverse')}
                    >
                      <div className={cn(
                        'w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5',
                        msg.role === 'user'
                          ? 'bg-bleu/20'
                          : 'bg-accent/20'
                      )}>
                        {msg.role === 'user' ? (
                          <Sparkles className="w-4 h-4 text-bleu" strokeWidth={2} />
                        ) : (
                          <Bot className="w-4 h-4 text-accent" strokeWidth={2} />
                        )}
                      </div>
                      <div className={cn(
                        'bg-bg-elevated border border-border rounded-2xl p-4 max-w-[85%]',
                        msg.role === 'user' && 'border-bleu/30 bg-bleu/5'
                      )}>
                        <p className={cn('text-body', msg.role === 'user' ? 'text-fg' : 'text-fg')}>
                          {msg.content}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-accent" strokeWidth={2} />
                  </div>
                  <div className="bg-bg-elevated border border-border rounded-2xl p-4">
                    <div className="flex gap-1 items-center">
                      <motion.span
                        className="w-2 h-2 bg-accent/50 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-accent/50 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-accent/50 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-5 border-t border-border">
              <div className="flex items-end gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Écrivez un message... (démo seulement)"
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-bg border border-border rounded-xl
                             text-fg placeholder-fg-subtle
                             focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors duration-200"
                  aria-label="Message"
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'p-3 rounded-xl flex items-center justify-center transition-colors duration-200',
                    'bg-accent text-noir hover:bg-accent/90',
                    'disabled:opacity-40 disabled:cursor-not-allowed'
                  )}
                  aria-label="Envoyer"
                >
                  <Send className="w-5 h-5" strokeWidth={2.5} />
                </motion.button>
              </div>
              <p className="mt-2 text-center font-mono text-caption text-fg-subtle">
                Version démo — Aucune IA connectée
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}