import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';

const ChatSection = ({ messages, busy, onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '24px';
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 110) + 'px';
    }
  }, [inputValue]);

  useEffect(() => {
    setIsTyping(busy);
  }, [busy]);

  const handleSend = async () => {
    const msg = inputValue.trim();
    if (!msg || busy) return;
    setInputValue('');
    await onSendMessage(msg);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
  <section className="chat-section">
    
    {/* Header */}
    <div className="chat-top">
      <div className="chat-id">
        <div className="avatar-ring">
          <div className="avatar-inner">AG</div>
        </div>
        <div className="chat-meta">
          <h3>Témoin n°1 — IA d'Alassane Gueye</h3>
          <p>Mandat : révéler les faits. Sans parti pris. Ou presque.</p>
        </div>
      </div>
      <div className="status-live">
        <span className="dot-live" />
        Actif
      </div>
    </div>

    <div className="chat-box">
      <MessageList messages={messages} isTyping={isTyping} />
    </div>

    {/* Input */}
    <div className="input-area">
      <div className="input-wrap">
        <textarea
          ref={textareaRef}
          className="chat-textarea"
          placeholder="Interrogez le témoin..."
          rows="1"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={busy}
        />
        <button
          className="send-btn"
          onClick={handleSend}
          disabled={busy || !inputValue.trim()}
        >
          ↑
        </button>
      </div>
    </div>

  </section>
);
};

export default ChatSection;
