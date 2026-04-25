import React, { useState, useContext } from 'react';
import { MessageCircle, X, Wind, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WellnessContext } from '../../context/WellnessContext';

export const FloatingTools = () => {
  const { isChatOpen, setIsChatOpen, isMeditationOpen, setIsMeditationOpen } = useContext(WellnessContext);
  
  const CHAT_OPTIONS = [
    { label: "I'm feeling stressed", response: "I hear you. When stress peaks, your breathing often becomes shallow. I recommend using the wind icon below for a 1-minute breathing exercise." },
    { label: "Trouble sleeping", response: "Sleep debt affects everything. Prioritize hydration today, limit caffeine, and try to avoid screens 30 minutes before bed tonight." },
    { label: "Need a quick workout", response: "Movement is medicine! Head over to the Planner tab to see your curated daily routine." },
    { label: "How to improve focus?", response: "Focus drops when we're fatigued. Take a 5-minute break away from your desk, stretch your legs, and drink a glass of water." }
  ];

  const [messages, setMessages] = useState([
    { text: "Hi there! I'm Vital AI. How can I support your wellbeing today?", sender: 'ai' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [breathText, setBreathText] = useState('Inhale');

  // Breathing cycle logic
  React.useEffect(() => {
    if (!isMeditationOpen) return;
    
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) % 16000;
      if (elapsed < 4000) setBreathText('Inhale');
      else if (elapsed < 8000) setBreathText('Hold');
      else setBreathText('Exhale');
    }, 100);
    
    return () => clearInterval(interval);
  }, [isMeditationOpen]);

  const handleOptionClick = (option) => {
    if (isTyping) return;
    
    setMessages(prev => [...prev, { text: option.label, sender: 'user' }]);
    setIsTyping(true);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { text: option.response, sender: 'ai' }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <button 
          onClick={() => setIsMeditationOpen(true)}
          className="bg-white text-nature-600 hover:bg-nature-50 p-3.5 rounded-full shadow-md border border-stone-100 transition-all"
          title="Meditation Mode"
        >
          <Wind className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-stone-900 hover:bg-stone-800 text-white p-3.5 rounded-full shadow-md transition-all"
          title="Vital AI Chat"
        >
          {isChatOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        </button>
      </div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-28 right-6 w-80 bg-white shadow-lg rounded-2xl overflow-hidden z-[45] flex flex-col h-[450px] border border-stone-100"
          >
            <div className="p-4 font-medium border-b border-stone-100 flex justify-between items-center text-stone-700">
              <span className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-nature-600"/> Vital AI</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${msg.sender === 'user' ? 'bg-nature-600 text-white rounded-br-md' : 'bg-white border border-stone-100 text-stone-600 rounded-bl-md'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl bg-white border border-stone-100 rounded-bl-md flex gap-1">
                    <span className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-3 border-t border-stone-100 bg-white space-y-2">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Suggested Topics</p>
              <div className="flex flex-col gap-2">
                {CHAT_OPTIONS.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => handleOptionClick(opt)}
                    disabled={isTyping}
                    className="text-left px-3 py-2 text-sm text-stone-600 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl transition-colors disabled:opacity-50"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meditation Modal */}
      <AnimatePresence>
        {isMeditationOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] backdrop-blur-2xl flex items-center justify-center bg-white/90"
          >
            <button onClick={() => setIsMeditationOpen(false)} className="absolute top-6 right-6 text-stone-400 hover:text-stone-700 bg-white p-2.5 rounded-full shadow-sm border border-stone-100 transition-all">
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center flex flex-col items-center">
              <h2 className="text-3xl font-semibold text-stone-700 mb-16">Breathe.</h2>
              
              <div className="relative w-56 h-56 flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0.1 }}
                  animate={{ scale: [0.5, 1.4, 1.4, 0.5], opacity: [0.1, 0.3, 0.3, 0.1] }}
                  transition={{ 
                    duration: 16,
                    repeat: Infinity,
                    times: [0, 0.25, 0.5, 1] 
                  }}
                  className="absolute w-full h-full rounded-full bg-nature-400 blur-2xl"
                />
                <motion.div 
                  initial={{ scale: 0.5 }}
                  animate={{ scale: [0.5, 1.2, 1.2, 0.5] }}
                  transition={{ 
                    duration: 16,
                    repeat: Infinity,
                    times: [0, 0.25, 0.5, 1]
                  }}
                  className="w-44 h-44 rounded-full border border-nature-200 bg-white shadow-sm flex items-center justify-center relative z-10"
                >
                   <motion.span 
                    key={breathText}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-nature-600 font-medium italic text-xl"
                   >
                     {breathText}
                   </motion.span>
                </motion.div>
              </div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
