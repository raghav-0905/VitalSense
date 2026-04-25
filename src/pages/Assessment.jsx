import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Moon, Sun, Coffee, Zap, Droplets,
  Wind, Brain, ChevronRight, ChevronLeft,
  Smile, Frown, Meh, AlertCircle,
  CheckCircle2, Sparkles, MessageCircle,
  ShieldAlert, ShieldCheck, Heart, Activity,
  AlertTriangle, Flame, Leaf, Waves, CheckCircle,
  ExternalLink, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { WellnessContext } from '../context/WellnessContext';
import { processAssessment } from '../utils/aiLogic';

const questions = [
  {
    id: 'sleep',
    title: 'How many hours do you sleep?',
    aiGreeting: "Rest is the bedrock of vitality. Let's look at your sleep pattern.",
    type: 'segmented_visual_picker',
    options: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    optimalRange: [7, 8, 9],
    icons: { start: <Moon size={18} />, end: <Sun size={18} /> }
  },
  {
    id: 'stress1',
    title: 'Are you feeling overwhelmed today?',
    aiGreeting: "Stress often starts as a feeling of being 'too full'.",
    type: 'binary_selector'
  },
  {
    id: 'stress2',
    title: 'Experience muscle tension or headaches?',
    aiGreeting: "Your body often speaks what your mind holds back.",
    type: 'binary_selector'
  },
  {
    id: 'stress3',
    title: 'Is it hard to switch off after work?',
    aiGreeting: "The transition from 'do' to 'be' is crucial.",
    type: 'binary_selector'
  },
  {
    id: 'mood',
    title: 'Describe your overall mood today.',
    aiGreeting: "Emotional health is just as vital as physical.",
    type: 'icon_card_selector',
    options: [
      { value: 10, label: 'Radiant', icon: <Sun />, desc: 'Feeling great' },
      { value: 7, label: 'Balanced', icon: <Smile />, desc: 'Steady energy' },
      { value: 4, label: 'Meh', icon: <Meh />, desc: 'A bit flat' },
      { value: 1, label: 'Low', icon: <Frown />, desc: 'Feeling heavy' }
    ]
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
      { id: 'kapha', title: 'Kapha', items: ['Solid build', 'Calm/Patient', 'Strong'], color: 'border-nature-400 bg-nature-50' },
      { id: 'unknown', title: "I don't know", items: ['Not sure about my type', 'Want to learn more'], color: 'border-slate-400 bg-slate-50' }
    ]
  }
];

const Assessment = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    sleep: 7,
    stress1: false,
    stress2: false,
    stress3: false,
    mood: 7,
    activity: 'moderate',
    water: 6,
    doshaProxy: 'vata'
  });

  const [aiMessage, setAiMessage] = useState({ text: "", icon: null });
  const [progressLabel, setProgressLabel] = useState("Getting started");
  const [showTriggerAlert, setShowTriggerAlert] = useState(false);

  const { addAssessment, setIsMeditationOpen, setIsChatOpen } = useContext(WellnessContext);
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
    let text = currentQ.aiGreeting;
    let icon = null;

    if (id === 'sleep') {
      if (value < 6) {
        text = "Low sleep detected. We'll look at recovery strategies.";
        icon = <AlertTriangle size={18} className="text-orange-500" />;
      }
      else if (value >= 7 && value <= 9) {
        text = "Optimal sleep range. Great for tissue repair!";
        icon = <CheckCircle size={18} className="text-nature-500" />;
      }
      else if (value > 9) {
        text = "Extended rest detected. This is great for deep neuro-regeneration.";
        icon = <Sparkles size={18} className="text-blue-400" />;
      }
    } else if (id.startsWith('stress')) {
      if (value) {
        text = "Acknowledged. We'll factor this into your recovery plan.";
        icon = <AlertTriangle size={18} className="text-orange-500" />;
      } else {
        text = "That's good to hear. One less load on your system.";
        icon = <CheckCircle size={18} className="text-nature-500" />;
      }
    } else if (id === 'water') {
      if (value < 5) {
        text = "Hydration is low. Let's aim for 8+ glasses.";
        icon = <Droplets size={18} className="text-blue-500" />;
      }
      else if (value >= 5 && value <= 8) {
        text = "Steady progress. Keep that fluid balance stable.";
        icon = <Waves size={18} className="text-blue-400" />;
      }
      else if (value > 8) {
        text = "Exceptional hydration! You're optimizing metabolic efficiency.";
        icon = <Activity size={18} className="text-nature-500" />;
      }
    }

    setAiMessage({ text, icon });
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
      
      // Auto-trigger help if scores are bad
      if (results.burnoutRisk || results.scores.wellnessScore < 50) {
        setShowTriggerAlert(true);
        
        setTimeout(() => {
          setShowTriggerAlert(false);
          setIsMeditationOpen(true);
          // Delay opening chat until they've had a moment or finished breathing
          setTimeout(() => {
            setIsChatOpen(true);
          }, 12000); 
        }, 4000);
      }
      
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#f0f9f4] to-[#f1f8fc] overflow-hidden">

      <motion.div
        layout
        className="w-full max-w-xl bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden relative border border-slate-100"
      >
        <div className="h-2 w-full bg-slate-100 flex overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-nature-500 to-blue-500"
          />
        </div>

        <div className="p-6 md:p-10">

          <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] opacity-40">{progressLabel}</span>
            <span className="text-[10px] font-black text-slate-900 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 shadow-sm">{step + 1} / {questions.length}</span>
          </div>

          {/* AI Assistant Bubble */}
          <motion.div
            key={`ai-${step}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-start gap-4 mb-8"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Sparkles size={20} />
            </div>
            <div className="bg-slate-50 rounded-2xl rounded-tl-none p-4 relative border border-slate-100 shadow-sm grow">
              <div className="flex items-start gap-2">
                {aiMessage.icon && <div className="mt-0.5 shrink-0">{aiMessage.icon}</div>}
                <p className="text-slate-900 text-[14px] font-semibold leading-relaxed">{aiMessage.text}</p>
              </div>
              <div className="absolute -left-2 top-0 w-3 h-3 bg-slate-50 rotate-45 border-l border-t border-slate-100" />
            </div>
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-serif font-black text-slate-900 mb-2 tracking-tight leading-tight">{currentQ.title}</h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="min-h-[180px] flex items-center justify-center py-2"
            >
              <DynamicInputRenderer
                question={currentQ}
                value={formData[currentQ.id]}
                onChange={(val) => handleValueChange(currentQ.id, val)}
              />
            </motion.div>
          </AnimatePresence>

          <ContextualFeedback id={currentQ.id} value={formData[currentQ.id]} formData={formData} />

          <div className="mt-10 flex justify-between items-center">
            <button
              onClick={() => setStep(prev => Math.max(0, prev - 1))}
              className={`flex items-center gap-2 px-6 py-3 font-black text-slate-800 hover:bg-slate-50 rounded-full transition-all text-sm ${step === 0 ? 'invisible' : ''}`}
            >
              <ChevronLeft size={18} className="stroke-[3]" /> Back
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-3 px-10 py-4 bg-slate-900 text-white font-black rounded-full hover:shadow-[0_15px_30px_rgba(15,23,42,0.2)] hover:-translate-y-1 transition-all active:scale-95 shadow-lg text-sm"
            >
              <span>{step === questions.length - 1 ? 'Execute Engine' : 'Next Question'}</span>
              <ChevronRight size={18} className="stroke-[3]" />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showTriggerAlert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white/80 backdrop-blur-2xl flex items-center justify-center p-8 text-center"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="max-w-md"
            >
              <div className="w-16 h-16 bg-nature-100 text-nature-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                <Wind size={32} />
              </div>
              <h3 className="text-3xl font-serif font-black text-slate-900 mb-4">Take a Moment.</h3>
              <p className="text-slate-600 font-semibold leading-relaxed">
                We've detected significant pressure in your vitals. 
                Before we continue, let's take a moment to reset your nervous system together.
              </p>
              <motion.div 
                className="mt-12 h-1 bg-nature-200 rounded-full overflow-hidden w-48 mx-auto"
              >
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4 }}
                  className="h-full bg-nature-600"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
    case 'binary_selector':
      return <BinarySelector value={value} onChange={onChange} />;
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
    <div className="flex justify-between items-center px-4 mb-4 text-slate-900 font-black">
      <div className="opacity-30">{question.icons.start}</div>
      <div className="text-lg flex items-center gap-2">
        {value} <span className="text-[10px] uppercase tracking-widest opacity-40">Hours</span>
      </div>
      <div className="opacity-30">{question.icons.end}</div>
    </div>
    <div className="flex gap-2 p-2 bg-slate-50 border border-slate-100 rounded-2xl shadow-inner">
      {question.options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`flex-1 py-4 rounded-xl font-black transition-all text-base shadow-sm border-2 ${value === opt
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
        className="mb-6 bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 shadow-inner"
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
          <span className="text-3xl font-black text-slate-900">{value}</span>
          <span className="text-[10px] font-black text-slate-400 ml-2">INTENSITY</span>
        </div>
      </div>
    </div>
  );
};

const BinarySelector = ({ value, onChange }) => (
  <div className="flex gap-4 w-full max-w-xs">
    <button
      onClick={() => onChange(true)}
      className={`flex-1 py-6 rounded-3xl border-4 transition-all flex flex-col items-center gap-3 ${value === true
          ? 'border-slate-900 bg-slate-900 text-white shadow-xl scale-105'
          : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'
        }`}
    >
      <ThumbsUp size={32} />
      <span className="font-black">YES</span>
    </button>
    <button
      onClick={() => onChange(false)}
      className={`flex-1 py-6 rounded-3xl border-4 transition-all flex flex-col items-center gap-3 ${value === false
          ? 'border-slate-900 bg-slate-900 text-white shadow-xl scale-105'
          : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'
        }`}
    >
      <ThumbsDown size={32} />
      <span className="font-black">NO</span>
    </button>
  </div>
);

const IconCardSelector = ({ options, value, onChange }) => (
  <div className="grid grid-cols-2 gap-4 w-full">
    {options.map(opt => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        className={`p-5 rounded-[2rem] border-4 transition-all text-left flex flex-col gap-3 group relative overflow-hidden active:scale-95 ${value === opt.value
            ? 'border-slate-900 bg-slate-50 shadow-xl z-10'
            : 'border-slate-50 bg-slate-50 hover:border-slate-200 hover:bg-white'
          }`}
      >
        <div className={`p-3 rounded-2xl w-fit shadow-md ${value === opt.value ? 'bg-slate-900 text-white animate-bounce' : 'bg-white text-slate-300'}`}>
          {opt.icon}
        </div>
        <div>
          <h4 className="font-black text-lg text-slate-900 leading-tight mb-1">{opt.label}</h4>
          <p className="text-[10px] text-slate-950 font-bold opacity-30">{opt.desc}</p>
        </div>
        {value === opt.value && <div className="absolute top-4 right-4 text-slate-900"><CheckCircle2 size={20} /></div>}
      </button>
    ))}
  </div>
);

const WaterCounter = ({ value, onChange }) => (
  <div className="flex flex-col items-center w-full">
    <div className="grid grid-cols-6 gap-2 mb-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.button
          key={i}
          whileTap={{ scale: 0.85 }}
          onClick={() => onChange(i + 1)}
          className={`p-3 rounded-xl transition-all border-2 ${i < value
              ? 'bg-blue-500 text-white border-transparent shadow-lg scale-110'
              : 'bg-white text-slate-100 border-slate-50 hover:border-slate-200'
            }`}
        >
          <Droplets size={20} />
        </motion.button>
      ))}
    </div>
    <div className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-black text-xl shadow-lg">
      {value} <span className="text-[10px] opacity-50 uppercase ml-2 tracking-tighter">Cups Logged</span>
    </div>
  </div>
);

const InfoCardSelector = ({ options, value, onChange }) => (
  <div className="flex flex-col gap-4 w-full">
    {options.map(opt => (
      <button
        key={opt.id}
        onClick={() => onChange(opt.id)}
        className={`p-5 rounded-[2rem] border-4 transition-all flex justify-between items-center group relative ${value === opt.id
            ? 'border-slate-900 bg-white shadow-xl -translate-y-1'
            : 'border-slate-50 bg-slate-50 hover:border-slate-200'
          }`}
      >
        <div className="text-left">
          <h4 className="text-xl font-black text-slate-900 mb-2 tracking-tight">{opt.title}</h4>
          <div className="flex flex-wrap gap-2">
            {opt.items.map(item => (
              <span key={item} className="text-[9px] uppercase font-black text-slate-900 bg-black/5 px-2 py-0.5 rounded-md border border-black/5">
                {item}
              </span>
            ))}
          </div>
          {opt.id === 'unknown' && value === 'unknown' && (
            <a
              href="https://www.banyanbotanicals.com/pages/dosha-quiz"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 text-blue-600 font-black text-[10px] hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Take a Quiz to Find Out <ExternalLink size={12} />
            </a>
          )}
        </div>
        <div className={`p-3 rounded-full transition-all ${value === opt.id ? 'bg-slate-900 text-white' : 'bg-white text-slate-100 shadow-sm'}`}>
          {value === opt.id ? <CheckCircle2 size={20} /> : <ChevronRight size={20} />}
        </div>
      </button>
    ))}
  </div>
);

const ContextualFeedback = ({ id, value, formData }) => {
  if (id === 'sleep') {
    if (value < 5) return (
      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex items-center justify-center gap-2 text-red-700 font-black bg-red-50 border border-red-100 py-3 rounded-2xl shadow-sm text-xs">
        <ShieldAlert size={18} className="animate-pulse" /> CRITICAL SLEEP DEFICIT
      </motion.div>
    );
    if (value >= 5 && value <= 6) return (
      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex items-center justify-center gap-2 text-orange-700 font-black bg-orange-50 border border-orange-100 py-3 rounded-2xl shadow-sm text-xs">
        <AlertTriangle size={18} /> SLEEP DEBT ACCUMULATING
      </motion.div>
    );
    if (value >= 7 && value <= 9) return (
      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex items-center justify-center gap-2 text-nature-700 font-black bg-nature-50 border border-nature-100 py-3 rounded-2xl shadow-sm text-xs">
        <CheckCircle2 size={18} /> CIRCADIAN RHYTHM BALANCED
      </motion.div>
    );
    if (value >= 10) return (
      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex items-center justify-center gap-2 text-orange-700 font-black bg-orange-50 border border-orange-100 py-3 rounded-2xl shadow-sm text-xs">
        <Moon size={18} /> POTENTIAL HYPERSOMNIA
      </motion.div>
    );
  }

  if (id === 'water') {
    if (value < 4) return (
      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex items-center justify-center gap-2 text-red-700 font-black bg-red-50 border border-red-100 py-3 rounded-2xl shadow-sm text-xs">
        <Droplets size={18} className="animate-bounce" /> HYDRATION DEFICIT
      </motion.div>
    );
    if (value >= 10) return (
      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex items-center justify-center gap-2 text-blue-700 font-black bg-blue-50 border border-blue-100 py-3 rounded-2xl shadow-sm text-xs">
        <Waves size={18} /> PEAK HYDRATION ATTAINED
      </motion.div>
    );
  }

  // Custom stress logic for feedback
  const stressCount = (formData.stress1 ? 1 : 0) + (formData.stress2 ? 1 : 0) + (formData.stress3 ? 1 : 0);
  if (id.startsWith('stress') && stressCount >= 2) return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex items-center justify-center gap-2 text-red-700 font-black bg-red-50 border border-red-100 py-3 rounded-2xl shadow-sm text-xs">
      <ShieldAlert size={18} className="animate-pulse" /> ADRENAL LOAD CRITICAL
    </motion.div>
  );
  return <div className="mt-8 h-[50px]" />;
};

export default Assessment;
