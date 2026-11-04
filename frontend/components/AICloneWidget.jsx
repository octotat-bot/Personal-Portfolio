import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { contactInfo } from '../data/content';

const SUGGESTIONS = [
  "What projects has Mukund built?",
  "What went wrong in RepoMind's retrieval?",
  "What's his tech stack?",
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
        rendered.push(<strong key={j} className="text-ink font-medium">{boldMatch[1]}</strong>);
        continue;
      }

      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        rendered.push(
          <a key={j} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="link-ed">
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
        <div key={i} className="flex items-start gap-3 my-1">
          <span aria-hidden className="text-ink-4 shrink-0">—</span>
          <span>{rendered}</span>
        </div>
      );
    }

    return <p key={i} className={line.trim() === '' ? 'h-2' : 'my-0.5'}>{rendered}</p>;
  });
}

function Message({ msg, streaming }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`py-2 flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      <span className="sr-only">{isUser ? 'You said:' : "Mukund's AI said:"}</span>
      <div className={`max-w-[88%] px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed ${isUser ? 'bg-accent text-white rounded-br-md' : 'bg-raised border border-rule text-ink-2 rounded-bl-md'}`}>
        {isUser ? msg.content : renderMarkdown(msg.content)}
        {streaming && !msg.content && <span className="text-ink-3">Thinking…</span>}
        {streaming && msg.content && (
          <span aria-hidden className="inline-block w-[7px] h-3.5 ml-0.5 bg-ink-3 align-middle animate-pulse" />
        )}
      </div>
    </div>
  );
}

function WelcomeView({ onSuggestionClick }) {
  return (
    <div className="flex-1 overflow-y-auto px-5 py-6">
      <p className="font-display font-semibold tracking-[-0.03em] text-[28px] leading-tight text-ink mb-3">Ask about my <span className="text-accent">work.</span></p>
      <p className="text-[13px] text-ink-3 leading-relaxed mb-7">
        Answers come only from the projects, timeline and contact details on this site.
        For anything else, email me.
      </p>
      <div className="eyebrow mb-2">Try asking</div>
      <ul>
        {SUGGESTIONS.map((s) => (
          <li key={s} className="mb-2">
            <button
              type="button"
              onClick={() => onSuggestionClick(s)}
              className="group w-full flex items-center justify-between gap-4 text-left text-[14px] text-ink-2 hover:text-accent px-4 py-3 min-h-[44px] rounded-2xl bg-raised border border-rule hover:border-accent transition-colors"
            >
              {s}
              <span aria-hidden className="text-ink-4 group-hover:text-ink transition-colors">→</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AICloneWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const close = useCallback(() => {
    setIsOpen(false);
    launcherRef.current?.focus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'end' });
  }, [messages, isTyping, reduceMotion]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  const sendMessage = useCallback(async (userMessage) => {
    if (!userMessage.trim() || isTyping) return;

    const updatedMessages = [...messages, { role: 'user', content: userMessage.trim() }];
    setMessages([...updatedMessages, { role: 'agent', content: '' }]);
    setInputValue('');
    setIsTyping(true);

    let responseText = '';
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
          })),
        }),
      });
      if (!res.ok) throw new Error('API Request Failed');
      responseText = (await res.json()).reply;
    } catch {
      responseText = `I'm having trouble connecting right now. Please try again in a moment, or email Mukund at ${contactInfo.email}.`;
    }

    const setLast = (content) =>
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { ...next[next.length - 1], content };
        return next;
      });

    if (reduceMotion) {
      setLast(responseText);
    } else {
      // Reveal the reply a few characters at a time.
      for (let i = 3; i < responseText.length + 3; i += 3) {
        setLast(responseText.slice(0, i));
        await new Promise((r) => setTimeout(r, 10 + Math.random() * 15));
      }
    }

    setIsTyping(false);
  }, [messages, isTyping, reduceMotion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const clearChat = () => {
    setMessages([]);
    setIsTyping(false);
    inputRef.current?.focus();
  };

  const isWelcome = messages.length === 0;

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="ai-chat"
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        className={`fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 btn-ed !shadow-lg ${isOpen ? '' : 'btn-ed-dark'}`}
      >
        {isOpen ? (
          <>Close <span aria-hidden>×</span></>
        ) : (
          <>
            <span aria-hidden className="w-2 h-2 rounded-full bg-[#7CF2A8]" />
            Ask my AI
          </>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-chat"
            role="dialog"
            aria-label="Chat with Mukund's AI"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-50 inset-x-3 bottom-[76px] md:inset-x-auto md:right-6 md:bottom-[84px] md:w-[400px] h-[min(560px,calc(100dvh-110px))] flex flex-col bg-surface border border-rule rounded-[24px] shadow-lg overflow-hidden"
          >
            <div className="flex items-center justify-between gap-4 pl-5 pr-2 h-14 border-b border-rule shrink-0">
              <div className="flex items-baseline gap-3 min-w-0">
                <span className="font-display font-semibold tracking-[-0.02em] text-lg text-ink whitespace-nowrap">Mukund's AI</span>
                <span className="eyebrow truncate">Gemini · site data only</span>
              </div>
              {!isWelcome && (
                <button
                  type="button"
                  onClick={clearChat}
                  className="eyebrow hover:text-ink transition-colors px-3 min-h-[44px]"
                >
                  Clear
                </button>
              )}
            </div>

            {isWelcome ? (
              <WelcomeView onSuggestionClick={sendMessage} />
            ) : (
              <div
                role="log"
                aria-live="polite"
                aria-busy={isTyping}
                className="flex-1 overflow-y-auto px-5"
              >
                {messages.map((msg, idx) => (
                  <Message
                    key={idx}
                    msg={msg}
                    streaming={isTyping && idx === messages.length - 1 && msg.role !== 'user'}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-end gap-3 px-5 pt-3 pb-4 border-t border-rule shrink-0">
              <label htmlFor="ai-chat-input" className="sr-only">Your question</label>
              <input
                id="ai-chat-input"
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isTyping ? 'Waiting for the reply…' : 'Ask about projects, stack, timeline…'}
                className="field-ed flex-1 md:!text-[13px]"
                disabled={isTyping}
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="btn-ed btn-ed-solid !px-4"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
