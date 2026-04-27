import React, { useRef, useEffect } from 'react';

const MessageList = ({ messages, isTyping }) => {
  const containerRef = useRef(null);
  const hasUserInteracted = useRef(false);

  useEffect(() => {
    // Ne pas scroller au chargement initial (welcome message)
    if (!hasUserInteracted.current) {
      hasUserInteracted.current = messages.length > 1;
      return;
    }

    // Scroller uniquement à l'intérieur du conteneur, jamais la page
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <div className="messages" ref={containerRef}>
      {messages.map((msg, idx) => (
        <div key={idx} className={`mrow ${msg.role}`}>
          <div className={`mav ${msg.role}`}>
            {msg.role === 'ai' ? 'AG' : 'R'}
          </div>
          <div className={`mbub ${msg.role}`}>
            {msg.content}
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="mrow ai">
          <div className="mav ai">AG</div>
          <div className="mbub ai">
            <div className="typing-bub">
              <div className="tdot" />
              <div className="tdot" />
              <div className="tdot" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;