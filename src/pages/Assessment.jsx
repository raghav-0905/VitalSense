import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sun, Coffee, Zap, Droplets, 
  Wind, Brain, ChevronRight, ChevronLeft, 
  Smile, Frown, Meh, AlertCircle,
  CheckCircle2, Sparkles, MessageCircle,
  ShieldAlert, ShieldCheck, Heart, Activity
} from 'lucide-react';
import { WellnessContext } from '../context/WellnessContext';
import { processAssessment } from '../utils/aiLogic';

const questions = [
  {
    id: 'sleep',
    title: 'How many hours do you sleep?',
    aiGreeting: "Rest is the bedrock of vitality. Let's look at your sleep pattern.",
    type: 'segmented_visual_picker',
    options: [4, 5, 6, 7, 8, 9, 10],
    optimalRange: [7, 8, 9],
    icons: { start: <Moon size={18} />, end: <Sun size={18} /> }
  },
  {
    id: 'stress',
    title: 'What is your current stress level?',
    aiGreeting: "Honesty here is key. How is your internal pressure?",
    type: 'visual_meter',
    min: 1,
    max: 10,
    labels: ['Calm', 'Balanced', 'High Stress']
  },
  {
    id: 'mood',
    title: 'Describe your overall mood today.',
    aiGreeting: "Emotional health is just as vital as physical.",
    type: 'visual_meter',
    min: 1,
    max: 10,
    labels: ['Heavy', 'Moderate', 'Radiant']
  },
  {
    id: 'activity',
    title: 'Your physical activity level?',
    aiGreeting: "Movement is medicine. How much did you move recently?",
    type: 'icon_card_selector',
    options: [
      { value: 'none', label: 'None', icon: <Coffee />, desc: 'Sedentary state' },
      { value: 'light', label: 'Light', icon: <Wind />, desc: 'Brief walks' },
      { value: 'moderate', label: 'Moderate', icon: <Zap />, desc: 'Active workout' },
      { value: 'intense', label: 'Intense', icon: <Zap />, desc: 'High performance' }
    ]
  },
  {
    id: 'water',
    title: 'Daily water intake?',
    aiGreeting: "Hydration fuels every cell. How many glasses so far?",
    type: 'incremental_visual_counter',
    unit: 'glasses',
    max: 12
  },
  {
    id: 'doshaProxy',
    title: 'Which body type resonates most?',
    aiGreeting: "Ayurveda categorizes us into unique constitutional archetypes.",
    type: 'info_card_selector',
    options: [
      { id: 'vata', title: 'Vata', items: ['Slim build', 'Quick thinker', 'Energetic'], color: 'border-blue-400 bg-blue-50' },
      { id: 'pitta', title: 'Pitta', items: ['Medium build', 'Fiery/Focused', 'Leader'], color: 'border-orange-400 bg-orange-50' },
      { id: 'kapha', title: 'Kapha', items: ['Solid build', 'Calm/Patient', 'Strong'], color: 'border-nature-400 bg-nature-50' }
    ]
  }
];

const Assessment = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    sleep: 7,
    stress: 3,
    mood: 8,
    activity: 'moderate',
    water: 6,
    doshaProxy: 'vata'
  });
  
  const [aiMessage, setAiMessage] = useState("");
  const [progressLabel, setProgressLabel] = useState("Getting started");
  
  const { addAssessment } = useContext(WellnessContext);
  const navigate = useNavigate();

  const currentQ = questions[step];
  const progressPercent = ((step + 1) / questions.length) * 100;

  useEffect(() => {
    updateAIMessage(currentQ.id, formData[currentQ.id]);
  }, [step]);

  useEffect(() => {
    if (progressPercent <= 25) setProgressLabel("Initial Phase");
    else if (progressPercent <= 50) setProgressLabel("Middle Phase");
    else if (progressPercent <= 75) setProgressLabel("Deep Diagnostics");
    else setProgressLabel("Compiling Assessment...");
  }, [progressPercent]);

  const updateAIMessage = (id, value) => {
    let msg = currentQ.aiGreeting;
    
    if (id === 'sleep') {
      if (value < 6) msg = "⚠️ Low sleep detected. We'll look at recovery strategies.";
      else if (value >= 7 && value <= 9) msg = "✅ Optimal sleep range. Great for tissue repair!";
    } else if (id === 'stress') {
      if (value > 7) msg = "🔥 High stress detected. We recommend grounding exercises.";
      else if (value < 4) msg = "🌿 Excellent. Your nervous system seems regulated.";
    } else if (id === 'water') {
      if (value < 5) msg = "💧 Hydration is low. Let's aim for 8+ glasses.";
      else msg = "🌊 Perfect. Keep that fluid balance steady.";
    }
    
    setAiMessage(msg);
  };

  const handleValueChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    updateAIMessage(id, value);
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(prev => prev + 1);
    } else {
      const results = processAssessment(formData);
      addAssessment(formData, results);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#f0f9f4] to-[#f1f8fc] overflow-hidden">
      
      <motion.div 
        layout
        className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.08)] overflow-hidden relative border border-slate-100"
      >
        <div className="h-2 w-full bg-slate-100 flex overflow-hidden">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${progressPercent}%` }}
             className="h-full bg-gradient-to-r from-nature-500 to-blue-500"
           />
        </div>

        <div className="p-8 md:p-14">
          
          <div className="flex justify-between items-center mb-12">
             <span className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] opacity-40">{progressLabel}</span>
             <span className="text-xs font-black text-slate-900 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-200 shadow-sm">{step + 1} / {questions.length}</span>
          </div>

          {/* AI Assistant Bubble */}
          <motion.div 
            key={`ai-${step}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-start gap-5 mb-12"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shrink-0 shadow-xl">
              <Sparkles size={24} />
            </div>
            <div className="bg-slate-50 rounded-3xl rounded-tl-none p-6 relative border border-slate-100 shadow-sm grow">
              <p className="text-slate-900 text-[15px] font-semibold leading-relaxed">{aiMessage}</p>
              <div className="absolute -left-2 top-0 w-4 h-4 bg-slate-50 rotate-45 border-l border-t border-slate-100" />
            </div>
          </motion.div>

          <h2 className="text-4xl font-serif font-black text-slate-900 mb-4 tracking-tight leading-tight">{currentQ.title}</h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="min-h-[240px] flex items-center justify-center py-4"
            >
              <DynamicInputRenderer 
                question={currentQ} 
                value={formData[currentQ.id]} 
                onChange={(val) => handleValueChange(currentQ.id, val)} 
              />
            </motion.div>
          </AnimatePresence>

          <ContextualFeedback id={currentQ.id} value={formData[currentQ.id]} />

          <div className="mt-14 flex justify-between items-center">
            <button 
              onClick={() => setStep(prev => Math.max(0, prev - 1))}
              className={`flex items-center gap-2 px-8 py-4 font-black text-slate-800 hover:bg-slate-50 rounded-full transition-all ${step === 0 ? 'invisible' : ''}`}
            >
              <ChevronLeft size={22} className="stroke-[3]" /> Back
            </button>
            
            <button 
              onClick={handleNext}
              className="flex items-center gap-3 px-12 py-5 bg-slate-900 text-white font-black rounded-full hover:shadow-[0_20px_40px_rgba(15,23,42,0.3)] hover:-translate-y-1 transition-all active:scale-95 shadow-xl"
            >
              <span>{step === questions.length - 1 ? 'Execute Engine' : 'Next Question'}</span>
              <ChevronRight size={22} className="stroke-[3]" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Sub Components ---

const DynamicInputRenderer = ({ question, value, onChange }) => {
  switch (question.type) {
    case 'segmented_visual_picker':
      return <SegmentedPicker question={question} value={value} onChange={onChange} />;
    case 'visual_meter':
      return <VisualMeter question={question} value={value} onChange={onChange} />;
    case 'icon_card_selector':
      return <IconCardSelector options={question.options} value={value} onChange={onChange} />;
    case 'incremental_visual_counter':
      return <WaterCounter value={value} onChange={onChange} />;
    case 'info_card_selector':
      return <InfoCardSelector options={question.options} value={value} onChange={onChange} />;
    default:
      return null;
  }
};

const SegmentedPicker = ({ question, value, onChange }) => (
  <div className="w-full">
    <div className="flex justify-between items-center px-4 mb-6 text-slate-900 font-black">
      <div className="opacity-30">{question.icons.start}</div>
      <div className="text-xl flex items-center gap-2">
         {value} <span className="text-xs uppercase tracking-widest opacity-40">Hours</span>
      </div>
      <div className="opacity-30">{question.icons.end}</div>
    </div>
    <div className="flex gap-2.5 p-3 bg-slate-50 border border-slate-100 rounded-3xl shadow-inner">
      {question.options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`flex-1 py-5 rounded-2xl font-black transition-all text-lg shadow-sm border-2 ${
            value === opt 
            ? 'bg-slate-900 text-white border-transparent transform scale-105 z-10' 
            : 'bg-white text-slate-900 border-transparent hover:bg-slate-100'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const VisualMeter = ({ question, value, onChange }) => {
  const getIcon = (val) => {
    if (val <= 3) return <ShieldCheck size={56} className="text-nature-600 drop-shadow-sm" />;
    if (val <= 7) return <Heart size={56} className="text-orange-500 drop-shadow-sm" />;
    return <ShieldAlert size={56} className="text-red-500 drop-shadow-sm transition-all animate-pulse" />;
  };

  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      <motion.div 
        key={value}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-10 bg-slate-50 p-8 rounded-[3rem] border border-slate-100 shadow-inner"
      >
        {getIcon(value)}
      </motion.div>
      
      <div className="w-full space-y-4">
        <div className="flex justify-between font-black text-slate-900 uppercase text-[10px] tracking-widest opacity-50 px-2">
            <span>{question.labels[0]}</span>
            <span>{question.labels[2]}</span>
        </div>
        <input 
          type="range" 
          min={question.min} 
          max={question.max} 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-slate-900 border-2 border-white shadow-sm"
        />
        <div className="text-center">
           <span className="text-4xl font-black text-slate-900">{value}</span>
           <span className="text-xs font-black text-slate-400 ml-2">INTENSITY</span>
        </div>
      </div>
    </div>
  );
};

const IconCardSelector = ({ options, value, onChange }) => (
  <div className="grid grid-cols-2 gap-5 w-full">
    {options.map(opt => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        className={`p-7 rounded-[2.5rem] border-4 transition-all text-left flex flex-col gap-4 group relative overflow-hidden active:scale-95 ${
          value === opt.value
          ? 'border-slate-900 bg-slate-50 shadow-2xl z-10'
          : 'border-slate-50 bg-slate-50 hover:border-slate-200 hover:bg-white'
        }`}
      >
        <div className={`p-4 rounded-[1.5rem] w-fit shadow-md ${value === opt.value ? 'bg-slate-900 text-white animate-bounce' : 'bg-white text-slate-300'}`}>
          {opt.icon}
        </div>
        <div>
          <h4 className="font-black text-xl text-slate-900 leading-tight mb-1">{opt.label}</h4>
          <p className="text-xs text-slate-950 font-bold opacity-30">{opt.desc}</p>
        </div>
        {value === opt.value && <div className="absolute top-4 right-4 text-slate-900"><CheckCircle2 size={24} /></div>}
      </button>
    ))}
  </div>
);

const WaterCounter = ({ value, onChange }) => (
  <div className="flex flex-col items-center w-full">
    <div className="grid grid-cols-6 gap-3 mb-10">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.button
          key={i}
          whileTap={{ scale: 0.85 }}
          onClick={() => onChange(i + 1)}
          className={`p-4 rounded-2xl transition-all border-2 ${
            i < value 
            ? 'bg-blue-500 text-white border-transparent shadow-lg scale-110' 
            : 'bg-white text-slate-100 border-slate-50 hover:border-slate-200'
          }`}
        >
          <Droplets size={24} />
        </motion.button>
      ))}
    </div>
    <div className="bg-slate-900 text-white px-8 py-3 rounded-full font-black text-2xl shadow-xl">
      {value} <span className="text-xs opacity-50 uppercase ml-2 tracking-tighter">Cups Logged</span>
    </div>
  </div>
);

const InfoCardSelector = ({ options, value, onChange }) => (
  <div className="flex flex-col gap-5 w-full">
    {options.map(opt => (
      <button
        key={opt.id}
        onClick={() => onChange(opt.id)}
        className={`p-7 rounded-[2.5rem] border-4 transition-all flex justify-between items-center group relative ${
          value === opt.id 
          ? 'border-slate-900 bg-white shadow-2xl -translate-y-2' 
          : 'border-slate-50 bg-slate-50 hover:border-slate-200'
        }`}
      >
         <div className="text-left">
            <h4 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{opt.title}</h4>
            <div className="flex flex-wrap gap-2">
              {opt.items.map(item => (
                <span key={item} className="text-[10px] uppercase font-black text-slate-900 bg-black/5 px-3 py-1 rounded-lg border border-black/5">
                  {item}
                </span>
              ))}
            </div>
         </div>
         <div className={`p-4 rounded-full transition-all ${value === opt.id ? 'bg-slate-900 text-white' : 'bg-white text-slate-100 shadow-sm'}`}>
            {value === opt.id ? <CheckCircle2 size={24} /> : <ChevronRight size={24} />}
         </div>
      </button>
    ))}
  </div>
);

const ContextualFeedback = ({ id, value }) => {
  if (id === 'sleep' && value >= 7 && value <= 9) return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-10 flex items-center justify-center gap-3 text-nature-700 font-black bg-nature-50 border border-nature-100 py-4 rounded-3xl shadow-sm">
      <CheckCircle2 size={22} /> CIRCADIAN RHYTHM BALANCED
    </motion.div>
  );
  if (id === 'stress' && value >= 7) return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-10 flex items-center justify-center gap-3 text-red-700 font-black bg-red-50 border border-red-100 py-4 rounded-3xl shadow-sm">
      <ShieldAlert size={22} className="animate-pulse" /> ADRENAL LOAD CRITICAL
    </motion.div>
  );
  return <div className="mt-10 h-[62px]" />;
};

export default Assessment;
