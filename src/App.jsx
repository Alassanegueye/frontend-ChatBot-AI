import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Education from './components/Education';
import WitnessIntro from './components/WitnessIntro';
import ChatSection from './components/ChatSection';
import Suggestions from './components/Suggestions';
import TestSection from './components/TestSection';
import Footer from './components/Footer';
import { useChat } from './hooks/useChat';
import './App.css';

function App() {
  const { messages, busy, sendMessage, addWelcomeMessage } = useChat();

  useEffect(() => {
    const htmlElement = document.documentElement;
    const originalScrollBehavior = htmlElement.style.scrollBehavior;
    htmlElement.style.scrollBehavior = 'auto';
    
    addWelcomeMessage();
    
    window.scrollTo(0, 0);
    
    setTimeout(() => {
      htmlElement.style.scrollBehavior = originalScrollBehavior;
    }, 100);
  }, []);

  return (
    <div id="root">
      <div className="wrap">
        <Hero />
        <Experience />
        <Education />
        <WitnessIntro />

        <ChatSection
          messages={messages}
          busy={busy}
          onSendMessage={sendMessage}
        />

        <Suggestions onSendMessage={sendMessage} />
        <TestSection onSendMessage={sendMessage} />
        <Footer />
      </div>
    </div>
  );
}

export default App;