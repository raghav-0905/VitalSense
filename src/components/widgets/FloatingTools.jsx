import React, { useState, useContext } from 'react';
import { MessageCircle, X, Wind, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WellnessContext } from '../../context/WellnessContext';

export const FloatingTools = () => {
  const { isChatOpen, setIsChatOpen, isMeditationOpen, setIsMeditationOpen } = useContext(WellnessContext);
  
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm Vital AI. How are you feeling today?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
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

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');

    // Rule-based dummy response
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let aiResponse = "I hear you. Remember that wellness is an ongoing practice.";
      
      if (lowerInput.includes('stress') || lowerInput.includes('anxi')) {
        aiResponse = "I sense elevated stress. Would you like to try a 1-minute breathing exercise using the meditation tool?";
      } else if (lowerInput.includes('sleep') || lowerInput.includes('tired')) {
        aiResponse = "Low energy can be tough. Prioritize hydration today and try to get to bed 30 minutes earlier tonight.";
      } else if (lowerInput.includes('workout') || lowerInput.includes('gym')) {
        aiResponse = "Great! Consistent physical activity is key. Check the weekly planner on your dashboard for recommended flows.";
      }

      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Action Buttons pinned strictly to bottom right */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <button 
          onClick={() => setIsMeditationOpen(true)}
          className="bg-nature-50 text-nature-600 hover:bg-nature-100 p-4 rounded-full shadow-lg border border-nature-200 transition-all flex items-center justify-center transform hover:scale-105"
          title="Meditation Mode"
        >
          <Wind className="w-6 h-6" />
        </button>
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-slate-900 border-none hover:bg-slate-800 text-white p-4 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.15)] transition-all flex items-center justify-center transform hover:scale-105"
          title="Vital AI Chat"
        >
          {isChatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-32 right-6 w-80 bg-white shadow-2xl rounded-2xl overflow-hidden z-[45] flex flex-col h-[400px] border border-slate-100"
          >
            <div className="bg-nature-50 p-4 font-bold border-b border-nature-100 flex justify-between items-center text-slate-800">
              <span className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-nature-600"/> Vital AI</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${msg.sender === 'user' ? 'bg-nature-600 text-white rounded-br-sm' : 'bg-white border border-slate-100 text-slate-700 rounded-bl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="How are you?"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-nature-500 focus:ring-1 focus:ring-nature-500 transition-all"
              />
              <button onClick={handleSend} className="p-2.5 bg-nature-600 text-white rounded-full hover:bg-nature-500 transition-colors">
                <Send className="w-4 h-4" />
              </button>
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
            className="fixed inset-0 z-[100] backdrop-blur-3xl flex items-center justify-center bg-white/90"
          >
            <button onClick={() => setIsMeditationOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 bg-white p-3 rounded-full shadow-md border border-slate-100 transition-all hover:scale-110">
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center flex flex-col items-center">
              <h2 className="text-4xl font-serif text-slate-800 mb-16">Breathe.</h2>
              
              <div className="relative w-64 h-64 flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0.1 }}
                  animate={{ scale: [0.5, 1.4, 1.4, 0.5], opacity: [0.1, 0.4, 0.4, 0.1] }}
                  transition={{ 
                    duration: 16,
                    repeat: Infinity,
                    times: [0, 0.25, 0.5, 1] 
                  }}
                  className="absolute w-full h-full rounded-full bg-nature-500 blur-2xl"
                />
                <motion.div 
                  initial={{ scale: 0.5 }}
                  animate={{ scale: [0.5, 1.2, 1.2, 0.5] }}
                  transition={{ 
                    duration: 16,
                    repeat: Infinity,
                    times: [0, 0.25, 0.5, 1]
                  }}
                  className="w-48 h-48 rounded-full border-2 border-nature-300 bg-white shadow-xl flex items-center justify-center relative z-10"
                >
                   <motion.span 
                    key={breathText}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-nature-600 font-serif italic text-2xl drop-shadow-sm"
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
