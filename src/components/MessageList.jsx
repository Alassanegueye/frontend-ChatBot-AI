import React, { useRef, useEffect } from 'react';

const MessageList = ({ messages, isTyping }) => {
  const endRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isTyping]);

  return (
    <div className="messages">
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

      <div ref={endRef} />
    </div>
  );
};

export default MessageList;