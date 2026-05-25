import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aboutContent, skills, projects, contactInfo } from '../data/content';

// Simple keyword-based local RAG simulation
const getSimulatedResponse = (input) => {
  const lowerInput = input.toLowerCase();
  const normalizedInput = lowerInput.replace(/[\s\-_]/g, '');
  
  // 1. Dynamic Project Matching
  const matchedProject = projects.find(p => normalizedInput.includes(p.title.toLowerCase().replace(/[\s\-_]/g, '')));
  if (matchedProject) {
    const techString = matchedProject.technologies.join(', ');
    return `${matchedProject.title} is one of Mukund's standout projects! It's a ${matchedProject.category} system. ${matchedProject.description} He built it using ${techString}.`;
  }

  // 2. Dynamic Skill/Category Matching
  const matchedSkill = skills.find(s => normalizedInput.includes(s.category.toLowerCase().replace(/[\s\-_]/g, '')) || s.technologies.some(t => normalizedInput.includes(t.toLowerCase().replace(/[\s\-_]/g, ''))));
  if (matchedSkill) {
    const techList = matchedSkill.technologies.join(', ');
    return `Mukund is highly proficient in ${matchedSkill.category}. His stack includes ${techList}. ${matchedSkill.description}`;
  }
  
  // 3. General Intents
  if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('build') || lowerInput.includes('portfolio')) {
    const featured = projects.filter(p => p.featured).map(p => p.title).join(', ');
    return `Mukund has built several production-grade systems, including ${featured}. His focus is usually on Agentic AI, RAG, and high-performance real-time architectures. Name a specific project if you want to know the tech stack!`;
  }
  
  if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('stack')) {
    const topSkills = skills.map(s => s.category).join(' and ');
    return `My core expertise lies in ${topSkills}. I'm particularly dangerous with LangGraph, React, and Python. I treat software engineering like a craft.`;
  }

  if (lowerInput.includes('leet') || lowerInput.includes('dsa') || lowerInput.includes('algo') || lowerInput.includes('code')) {
    return `Algorithms are my playground. I've crushed over 225 LeetCode problems and can optimize complex logic on the fly. Speed and efficiency are non-negotiable.`;
  }

  if (lowerInput.includes('contact') || lowerInput.includes('hire') || lowerInput.includes('email') || lowerInput.includes('reach')) {
    return `You can reach out directly at ${contactInfo.email}. I'm currently open to roles involving AI Engineering and Agentic workflows. Let's build something impossible.`;
  }

  if (lowerInput.includes('who') || lowerInput.includes('about') || lowerInput.includes('mukund')) {
    return aboutContent.description;
  }
  
  if (lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('hey')) {
    return `Hello! I am Mukund's autonomous agent. Ask me about his tech stack, his latest AI projects, or how to get in touch.`;
  }

  return `Interesting question. I'm primarily trained on Mukund's resume, projects, and skills. You can ask me about his tech stack, his latest AI projects, or how to get in touch!`;
};

export default function AICloneWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'agent', content: "Hi there! I'm Mukund's AI assistant. Ask me anything about his experience, projects, or tech stack." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    // Simulate network delay
    await new Promise(r => setTimeout(r, 600));

    const responseText = getSimulatedResponse(userMessage);
    
    // Simulate streaming
    setMessages(prev => [...prev, { role: 'agent', content: '' }]);
    
    let currentText = '';
    const chars = responseText.split('');
    
    // Batch characters to reduce React state updates and improve efficiency
    const chunkSize = 3; 
    
    for (let i = 0; i < chars.length; i += chunkSize) {
      const chunk = chars.slice(i, i + chunkSize).join('');
      currentText += chunk;
      
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = currentText;
        return newMessages;
      });
      
      // Faster typing delay for better UX
      await new Promise(r => setTimeout(r, 10 + Math.random() * 15));
    }
    
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform"
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

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[500px] max-h-[70vh] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Elegant Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 flex items-center justify-center border border-white/20 shadow-lg">
                  <span className="text-[10px] font-bold text-white">AI</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wide">Mukund's Agent</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">Online & ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-custom bg-black/20">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'agent' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 flex items-center justify-center border border-white/20 flex-shrink-0 mt-1 mr-3">
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
                    {msg.content}
                    {isTyping && idx === messages.length - 1 && msg.role === 'agent' && (
                      <span className="inline-block w-1.5 h-4 ml-1.5 bg-gray-400 animate-pulse align-middle rounded-full" />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 bg-black/40 backdrop-blur-md border-t border-white/10">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full bg-white/5 text-white text-sm placeholder-gray-500 rounded-full py-3 pl-5 pr-12 border border-white/10 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all shadow-inner"
                  disabled={isTyping}
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 p-2 rounded-full bg-white text-black hover:bg-gray-200 disabled:opacity-0 disabled:scale-75 transition-all duration-300 flex items-center justify-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
