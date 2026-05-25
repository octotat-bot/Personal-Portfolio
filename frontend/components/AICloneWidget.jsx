import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTIONS = [
  "What projects has Mukund built?",
  "What's his tech stack?",
  "Tell me about his AI experience",
  "How can I contact him?",
];

function renderMarkdown(text) {
  if (!text) return null;

  return text.split('\n').map((line, i) => {
    const isBullet = /^[-•*]\s/.test(line.trim());
    const content = isBullet ? line.trim().replace(/^[-•*]\s/, '') : line;

    const parts = content.split(/(\*\*[^*]+\*\*|\[([^\]]+)\]\(([^)]+)\))/g);
    const rendered = [];
    for (let j = 0; j < parts.length; j++) {
      const part = parts[j];
      if (!part) continue;

      const boldMatch = part.match(/^\*\*(.+)\*\*$/);
      if (boldMatch) {
        rendered.push(<strong key={j} className="text-white font-semibold">{boldMatch[1]}</strong>);
        continue;
      }

      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        rendered.push(
          <a key={j} href={linkMatch[2]} target="_blank" rel="noopener noreferrer"
             className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">
            {linkMatch[1]}
          </a>
        );
        j += 2;
        continue;
      }

      rendered.push(<span key={j}>{part}</span>);
    }

    if (isBullet) {
      return (
        <div key={i} className="flex items-start gap-2 ml-1 my-0.5">
          <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 shrink-0" />
          <span>{rendered}</span>
        </div>
      );
    }

    return <p key={i} className={line.trim() === '' ? 'h-2' : 'my-0.5'}>{rendered}</p>;
  });
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-2">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-gray-400"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export default function AICloneWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'agent', content: "Hey! I'm Mukund's AI agent. Ask me about his projects, skills, or experience — or pick a question below." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const sendMessage = useCallback(async (userMessage) => {
    if (!userMessage.trim() || isTyping) return;

    setShowSuggestions(false);
    const updatedMessages = [...messages, { role: 'user', content: userMessage.trim() }];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    let responseText = "";
    try {
      const formattedHistory = updatedMessages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: formattedHistory })
      });

      if (!res.ok) throw new Error('API Request Failed');
      const data = await res.json();
      responseText = data.reply;
    } catch {
      responseText = "I'm having trouble connecting right now. Please try again in a moment, or reach out to Mukund directly at mangalmukund123@gmail.com";
    }

    setMessages(prev => [...prev, { role: 'agent', content: '' }]);

    let currentText = '';
    const chars = responseText.split('');
    const chunkSize = 3;

    for (let i = 0; i < chars.length; i += chunkSize) {
      currentText += chars.slice(i, i + chunkSize).join('');

      setMessages(prev => {
        const next = [...prev];
        next[next.length - 1] = { ...next[next.length - 1], content: currentText };
        return next;
      });

      await new Promise(r => setTimeout(r, 10 + Math.random() * 15));
    }

    setIsTyping(false);
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const clearChat = () => {
    setMessages([{ role: 'agent', content: "Chat cleared. What would you like to know about Mukund?" }]);
    setShowSuggestions(true);
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        aria-label={isOpen ? "Close chat" : "Open chat with Mukund's AI"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.4 }}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[70vh] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-black/40 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 flex items-center justify-center border border-white/20 shadow-lg">
                  <span className="text-[10px] font-bold text-white">AI</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wide">Mukund's Agent</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">Gemini 2.5 Flash</span>
                  </div>
                </div>
              </div>
              <button
                onClick={clearChat}
                aria-label="Clear chat"
                className="text-[10px] text-gray-500 hover:text-white font-mono uppercase tracking-wider px-2 py-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-custom bg-black/20">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'agent' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 flex items-center justify-center border border-white/20 flex-shrink-0 mt-1 mr-2.5">
                      <span className="text-[8px] font-bold text-white">AI</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-lg ${
                      msg.role === 'user'
                        ? 'bg-white text-black rounded-tr-sm'
                        : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm backdrop-blur-sm'
                    }`}
                  >
                    {msg.role === 'agent' ? renderMarkdown(msg.content) : msg.content}
                    {isTyping && idx === messages.length - 1 && msg.role === 'agent' && !msg.content && (
                      <ThinkingDots />
                    )}
                    {isTyping && idx === messages.length - 1 && msg.role === 'agent' && msg.content && (
                      <span className="inline-block w-1.5 h-4 ml-0.5 bg-gray-400 animate-pulse align-middle rounded-full" />
                    )}
                  </div>
                </div>
              ))}

              {/* Suggestion Chips */}
              {showSuggestions && !isTyping && messages.length <= 2 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs text-gray-300 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 bg-black/40 backdrop-blur-md border-t border-white/10">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about Mukund..."
                  className="w-full bg-white/5 text-white text-sm placeholder-gray-500 rounded-full py-3 pl-5 pr-12 border border-white/10 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all shadow-inner"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  aria-label="Send message"
                  className="absolute right-2 p-2 rounded-full bg-white text-black hover:bg-gray-200 disabled:opacity-0 disabled:scale-75 transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
              <p className="text-[9px] text-gray-600 text-center mt-2 font-mono">Powered by Gemini · Press Esc to close</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
