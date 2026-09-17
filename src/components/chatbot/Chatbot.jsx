'use client';

import { useState } from 'react';
import { ChatbotButton } from './ChatbotButton';
import { ChatbotPanel } from './ChatbotPanel';
import { useChatbot } from '../../hooks/useChatbot';

export function Chatbot({ activeSection }) {
  const [message, setMessage] = useState('');
  const chatbot = useChatbot(activeSection);

  // Synchroniser le message du hook avec l'état local pour l'affichage
  // (le hook gère la logique, le composant gère l'affichage)

  return (
    <>
      <ChatbotButton
        isOpen={chatbot.isOpen}
        onToggle={chatbot.toggleChatbot}
        breathe={chatbot.breathe}
        showNotification={chatbot.showNotification}
      >
        {/* Le message sera passé via props au ChatbotButton */}
      </ChatbotButton>

      <ChatbotPanel
        isOpen={chatbot.isOpen}
        onClose={chatbot.closeChatbot}
        activeSection={activeSection}
      />
    </>
  );
}

// Composant message pour le bouton (à utiliser dans ChatbotButton)
export function ChatbotMessageBubble({ message, showNotification }) {
  return (
    <motion.div
      key={message}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'expoOut' }}
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
      <p className="text-balance">{message}</p>
      {showNotification && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-2 -right-2 w-5 h-5 bg-orange text-noir
                     rounded-full flex items-center justify-center text-[10px] font-bold"
        >
          !
        </motion.span>
      )}
    </motion.div>
  );
}