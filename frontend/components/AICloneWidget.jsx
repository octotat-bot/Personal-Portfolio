import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTIONS = [
  { text: "What projects has Mukund built?", icon: "🚀" },
  { text: "What's his tech stack?", icon: "⚡" },
  { text: "Tell me about his AI experience", icon: "🧠" },
  { text: "How can I contact him?", icon: "📬" },
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
        <div key={i} className="flex items-start gap-2.5 ml-1 my-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mt-1.5 shrink-0" />
          <span className="text-gray-300">{rendered}</span>
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
            className="w-[5px] h-[5px] rounded-full bg-blue-400"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
      </div>
      <motion.span
        className="text-[11px] text-gray-500 font-medium"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        thinking...
      </motion.span>
    </div>
  );
}

function MessageBubble({ msg, idx, isTyping, isLast }) {
  const isUser = msg.role === 'user';
  const showThinkingDots = isTyping && isLast && !isUser && !msg.content;
  const showCursor = isTyping && isLast && !isUser && msg.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 flex-shrink-0 mt-1 mr-2">
          <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
          </svg>
        </div>
      )}
      <div
        className={`max-w-[78%] px-4 py-3 text-[13px] leading-relaxed ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-br-md shadow-lg shadow-blue-500/10'
            : 'bg-white/[0.04] border border-white/[0.06] text-gray-300 rounded-2xl rounded-bl-md'
        }`}
      >
        {!isUser ? renderMarkdown(msg.content) : msg.content}
        {showThinkingDots && <ThinkingIndicator />}
        {showCursor && (
          <motion.span
            className="inline-block w-[2px] h-4 ml-0.5 bg-blue-400 align-middle rounded-full"
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
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-5"
      >
        <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
      </motion.div>

      <motion.h3
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="text-white text-base font-semibold mb-1"
      >
        Hey, I'm Mukund's AI
      </motion.h3>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="text-gray-500 text-xs text-center mb-6 max-w-[240px]"
      >
        Ask me anything about his projects, skills, or experience.
      </motion.p>

      <div className="w-full space-y-2">
        {SUGGESTIONS.map((s, i) => (
          <motion.button
            key={s.text}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.06, duration: 0.3 }}
            onClick={() => onSuggestionClick(s.text)}
            className="w-full flex items-center gap-3 text-left text-[13px] text-gray-400 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 hover:bg-white/[0.07] hover:border-white/[0.12] hover:text-gray-200 transition-all duration-200 cursor-pointer group"
          >
            <span className="text-sm opacity-60 group-hover:opacity-100 transition-opacity">{s.icon}</span>
            <span>{s.text}</span>
            <svg className="w-3.5 h-3.5 ml-auto text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  const [hasUnread, setHasUnread] = useState(false);
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
    if (isOpen) {
      inputRef.current?.focus();
      setHasUnread(false);
    }
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
    if (!isOpen) setHasUnread(true);
  }, [messages, isTyping, hasInteracted, isOpen]);

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
      <div className="fixed bottom-6 right-6 z-50">
        {/* Pulse ring */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500/20"
            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <motion.button
          aria-label={isOpen ? "Close chat" : "Open chat with Mukund's AI"}
          className="relative w-13 h-13 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
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
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </motion.svg>
            )}
          </AnimatePresence>

          {/* Unread badge */}
          {hasUnread && !isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-black"
            />
          )}
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-32px)] h-[560px] max-h-[75vh] bg-[#0a0a0f]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white leading-tight">Mukund's AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    <span className="text-[10px] text-gray-500">Online</span>
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
                    className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
                    title="New chat"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                    </svg>
                  </motion.button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages Area or Welcome */}
            {isWelcome ? (
              <WelcomeView onSuggestionClick={sendMessage} />
            ) : (
              <div
                ref={messagesContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-custom relative"
              >
                {messages.map((msg, idx) => (
                  <MessageBubble
                    key={idx}
                    msg={msg}
                    idx={idx}
                    isTyping={isTyping}
                    isLast={idx === messages.length - 1}
                  />
                ))}
                <div ref={messagesEndRef} />

                {/* Scroll to bottom */}
                <AnimatePresence>
                  {showScrollBtn && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={scrollToBottom}
                      className="sticky bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all cursor-pointer mx-auto"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Input Form */}
            <div className="p-3 border-t border-white/[0.06] bg-white/[0.02]">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isTyping ? "Waiting for response..." : "Ask me anything..."}
                  className="w-full bg-white/[0.04] text-white text-[13px] placeholder-gray-600 rounded-xl py-3 pl-4 pr-12 border border-white/[0.08] focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-blue-500/20 transition-all duration-200"
                  disabled={isTyping}
                />
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  aria-label="Send message"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-400 disabled:opacity-0 disabled:scale-75 disabled:pointer-events-none transition-all duration-200 flex items-center justify-center cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </motion.button>
              </form>
              <div className="flex items-center justify-between mt-2 px-1">
                <span className="text-[10px] text-gray-600">
                  Powered by Gemini
                </span>
                <span className="text-[10px] text-gray-700">
                  Esc to close
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
