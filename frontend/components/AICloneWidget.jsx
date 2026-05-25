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
             className="text-gray-300 hover:text-white underline underline-offset-2 transition-colors decoration-gray-600 hover:decoration-white">
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
        <div key={i} className="flex items-start gap-2.5 ml-1 my-1">
          <span className="w-1 h-1 rounded-full bg-gray-500 mt-2 shrink-0" />
          <span className="text-gray-400">{rendered}</span>
        </div>
      );
    }

    return <p key={i} className={line.trim() === '' ? 'h-2' : 'my-0.5'}>{rendered}</p>;
  });
}

function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-2 px-1 py-1.5">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gray-500"
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
      </div>
      <motion.span
        className="text-[10px] text-gray-600 uppercase tracking-wider"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Thinking
      </motion.span>
    </div>
  );
}

function MessageBubble({ msg, isTyping, isLast }) {
  const isUser = msg.role === 'user';
  const showThinkingDots = isTyping && isLast && !isUser && !msg.content;
  const showCursor = isTyping && isLast && !isUser && msg.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-1 mr-2.5">
          <span className="text-[8px] font-bold text-black tracking-wider">M</span>
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 text-[13px] leading-relaxed ${
          isUser
            ? 'bg-white text-black rounded-2xl rounded-br-sm'
            : 'bg-white/5 border border-white/10 text-gray-400 rounded-2xl rounded-bl-sm'
        }`}
      >
        {!isUser ? renderMarkdown(msg.content) : msg.content}
        {showThinkingDots && <ThinkingIndicator />}
        {showCursor && (
          <motion.span
            className="inline-block w-[2px] h-3.5 ml-0.5 bg-white/60 align-middle rounded-full"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "steps(2)" }}
          />
        )}
      </div>
    </motion.div>
  );
}

function WelcomeView({ onSuggestionClick }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-5"
      >
        <span className="text-lg font-bold text-black tracking-wider">M</span>
      </motion.div>

      <motion.p
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="text-[10px] text-gray-600 uppercase tracking-[0.3em] mb-2"
      >
        AI Agent
      </motion.p>
      <motion.h3
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="text-white text-base font-semibold mb-1"
      >
        Ask me anything
      </motion.h3>
      <motion.p
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="text-gray-600 text-xs text-center mb-8 max-w-[220px]"
      >
        Projects, skills, experience — I know it all.
      </motion.p>

      <div className="w-full space-y-2">
        {SUGGESTIONS.map((s, i) => (
          <motion.button
            key={s}
            initial={{ x: -16, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.25 + i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onSuggestionClick(s)}
            className="w-full flex items-center gap-3 text-left text-[13px] text-gray-500 border border-gray-900 hover:border-white/20 bg-transparent hover:bg-white/5 px-4 py-3 transition-all duration-300 cursor-pointer group"
          >
            <span className="flex-1">{s}</span>
            <svg className="w-3 h-3 text-gray-700 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default function AICloneWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 80);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

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

    if (!hasInteracted) setHasInteracted(true);

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
  }, [messages, isTyping, hasInteracted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const clearChat = () => {
    setMessages([]);
    setHasInteracted(false);
    setIsTyping(false);
  };

  const isWelcome = !hasInteracted && messages.length === 0;

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        aria-label={isOpen ? "Close chat" : "Open chat with Mukund's AI"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-5"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-32px)] h-[540px] max-h-[70vh] rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden border border-white/10"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02), rgba(255,255,255,0.03))',
              backdropFilter: 'blur(20px) saturate(150%)',
              WebkitBackdropFilter: 'blur(20px) saturate(150%)',
            }}
          >
            {/* Glass reflection layer */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />

            {/* Grid texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />

            {/* Header */}
            <div className="relative flex items-center justify-between px-5 py-3.5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <span className="text-[10px] font-bold text-black tracking-wider">M</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wide">Mukund's Agent</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    <span className="text-[10px] text-gray-600 uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {hasInteracted && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={clearChat}
                    aria-label="Clear chat"
                    className="text-[10px] text-gray-600 hover:text-white uppercase tracking-[0.2em] px-2 py-1 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    Clear
                  </motion.button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="p-2 text-gray-600 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages or Welcome */}
            {isWelcome ? (
              <WelcomeView onSuggestionClick={sendMessage} />
            ) : (
              <div
                ref={messagesContainerRef}
                onScroll={handleScroll}
                className="relative flex-1 overflow-y-auto p-5 space-y-4 scrollbar-custom"
              >
                {messages.map((msg, idx) => (
                  <MessageBubble
                    key={idx}
                    msg={msg}
                    isTyping={isTyping}
                    isLast={idx === messages.length - 1}
                  />
                ))}
                <div ref={messagesEndRef} />

                <AnimatePresence>
                  {showScrollBtn && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={scrollToBottom}
                      className="sticky bottom-2 mx-auto block w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Input */}
            <div className="relative p-4 border-t border-white/10">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isTyping ? "Waiting for response..." : "Ask about Mukund..."}
                  className="w-full bg-transparent text-white text-[13px] placeholder-gray-700 py-3 pl-0 pr-12 border-b border-gray-900 focus:border-white focus:outline-none transition-colors duration-300"
                  disabled={isTyping}
                />
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  aria-label="Send message"
                  className="absolute right-0 bottom-3 p-1.5 bg-white text-black rounded-full hover:scale-110 disabled:opacity-0 disabled:scale-75 disabled:pointer-events-none transition-all duration-300 flex items-center justify-center cursor-pointer"
                  whileTap={{ scale: 0.85 }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </form>
              <div className="flex items-center justify-between mt-2.5">
                <span className="text-[9px] text-gray-700 uppercase tracking-[0.2em]">Powered by Gemini</span>
                <span className="text-[9px] text-gray-800 uppercase tracking-[0.2em]">Esc to close</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
