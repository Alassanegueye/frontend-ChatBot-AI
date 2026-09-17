'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Bot } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ChatbotButton({ isOpen, onToggle, breathe, showNotification }) {
  return (
    <div className="fixed bottom-6 right-6 z-50" aria-label="Chatbot">
      {/* Message bubble au-dessus */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: 'expoOut' }}
            className="absolute bottom-16 right-0 w-max max-w-[280px] px-4 py-3
                       bg-noir-elevated border border-border rounded-2xl
                       text-fg text-body-sm shadow-elevated
                       before:absolute before:bottom-[-8px] before:right-6
                       before:w-2 before:h-2 before:bg-noir-elevated before:border-r before:border-b
                       before:border-border before:rotate-45"
            role="status"
            aria-live="polite"
          >
            <p className="font-mono text-caption text-fg-muted mb-1">CHATBOT</p>
            <p className="text-balance">{/* Message injecté par le parent */}</p>
            <AnimatePresence>
              {showNotification && (
                <motion.span
                  key="notif"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-orange text-noir
                             rounded-full flex items-center justify-center text-[10px] font-bold"
                >
                  !
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton principal */}
      <motion.button
        onClick={onToggle}
        className={cn(
          'relative w-14 h-14 md:w-16 md:h-16 rounded-2xl',
          'flex items-center justify-center',
          'bg-noir-elevated border border-border',
          'hover:border-accent/50',
          'shadow-elevated',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-noir',
          isOpen ? 'bg-accent border-accent' : ''
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ scale: breathe && !isOpen ? 1.02 : 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Fermer le chatbot' : 'Ouvrir le chatbot'}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="bot"
              initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4, ease: 'expoOut' }}
              className="text-2xl md:text-3xl text-accent"
            >
              <Bot className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2} />
            </motion.div>
          ) : (
            <motion.div
              key="close"
              initial={{ rotate: 180, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -180, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4, ease: 'expoOut' }}
              className="text-2xl md:text-3xl text-noir"
            >
              <X className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicateur d'activité subtil */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-vert rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.button>
    </div>
  );
}