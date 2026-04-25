import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Moon, Sun, Coffee, Zap, Droplets, Wind, ChevronRight, ChevronLeft,
  Smile, Frown, Meh, CheckCircle2, Sparkles, ShieldAlert, Heart, Activity,
  AlertTriangle, Waves, CheckCircle, ExternalLink, ThumbsUp, ThumbsDown, ShieldCheck
} from 'lucide-react';
import { WellnessContext } from '../context/WellnessContext';
import { processAssessment } from '../utils/aiLogic';

const questions = [
  { id: 'sleep', title: 'How many hours do you sleep?', aiGreeting: "Rest is the foundation of good health. Let's start here.", type: 'segmented_visual_picker', options: [3,4,5,6,7,8,9,10,11,12], optimalRange: [7,8,9], icons: { start: <Moon size={16}/>, end: <Sun size={16}/> } },
  { id: 'stress1', title: 'Are you feeling overwhelmed today?', aiGreeting: "Stress often starts as a feeling of being 'too full'.", type: 'binary_selector' },
  { id: 'stress2', title: 'Experience muscle tension or headaches?', aiGreeting: "Your body often reflects what's going on in your mind.", type: 'binary_selector' },
  { id: 'stress3', title: 'Is it hard to switch off after work?', aiGreeting: "The transition from work to rest matters more than you think.", type: 'binary_selector' },
  { id: 'mood', title: 'How would you describe your mood?', aiGreeting: "Emotional health is just as important as physical.", type: 'icon_card_selector', options: [
    { value: 10, label: 'Great', icon: <Sun/>, desc: 'Feeling energized' },
    { value: 7, label: 'Good', icon: <Smile/>, desc: 'Steady and balanced' },
    { value: 4, label: 'Okay', icon: <Meh/>, desc: 'A bit flat' },
    { value: 1, label: 'Low', icon: <Frown/>, desc: 'Feeling heavy' }
  ]},
  { id: 'activity', title: 'How active have you been?', aiGreeting: "Movement makes a big difference.", type: 'icon_card_selector', options: [
    { value: 'none', label: 'None', icon: <Coffee/>, desc: 'Mostly sitting' },
    { value: 'light', label: 'Light', icon: <Wind/>, desc: 'Some walking' },
    { value: 'moderate', label: 'Moderate', icon: <Zap/>, desc: 'A good workout' },
    { value: 'intense', label: 'Intense', icon: <Zap/>, desc: 'Heavy training' }
  ]},
  { id: 'water', title: 'How much water have you had?', aiGreeting: "Hydration affects everything — energy, focus, mood.", type: 'incremental_visual_counter', unit: 'glasses', max: 12 },
  { id: 'doshaProxy', title: 'Which body type feels most like you?', aiGreeting: "Ayurveda describes three main body types. Which resonates?", type: 'info_card_selector', options: [
    { id: 'vata', title: 'Vata', items: ['Slim build','Quick thinker','Energetic'] },
    { id: 'pitta', title: 'Pitta', items: ['Medium build','Focused','Driven'] },
    { id: 'kapha', title: 'Kapha', items: ['Solid build','Calm','Patient'] },
    { id: 'unknown', title: "Not sure", items: ['Want to learn more'] }
  ]}
];

const Assessment = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ sleep:7, stress1:false, stress2:false, stress3:false, mood:7, activity:'moderate', water:6, doshaProxy:'vata' });
  const [aiMessage, setAiMessage] = useState({ text: "", icon: null });
  const [progressLabel, setProgressLabel] = useState("Getting started");
  const [showTriggerAlert, setShowTriggerAlert] = useState(false);
  const { addAssessment, setIsMeditationOpen, setIsChatOpen } = useContext(WellnessContext);
  const navigate = useNavigate();
  const currentQ = questions[step];
  const progressPercent = ((step + 1) / questions.length) * 100;

  useEffect(() => { updateAIMessage(currentQ.id, formData[currentQ.id]); }, [step]);
  useEffect(() => {
    if (progressPercent <= 25) setProgressLabel("Getting started");
    else if (progressPercent <= 50) setProgressLabel("Halfway there");
    else if (progressPercent <= 75) setProgressLabel("Almost done");
    else setProgressLabel("Wrapping up");
  }, [progressPercent]);

  const updateAIMessage = (id, value) => {
    let text = currentQ.aiGreeting, icon = null;
    if (id === 'sleep') {
      if (value < 6) { text = "That's on the low side. We'll look at ways to improve your rest."; icon = <AlertTriangle size={16} className="text-amber-500"/>; }
      else if (value >= 7 && value <= 9) { text = "That's a healthy range — great for recovery."; icon = <CheckCircle size={16} className="text-nature-500"/>; }
      else if (value > 9) { text = "Plenty of rest! Oversleeping can sometimes signal something too."; icon = <Sparkles size={16} className="text-blue-400"/>; }
    } else if (id.startsWith('stress')) {
      if (value) { text = "Noted — we'll factor this into your plan."; icon = <AlertTriangle size={16} className="text-amber-500"/>; }
      else { text = "That's good to hear."; icon = <CheckCircle size={16} className="text-nature-500"/>; }
    } else if (id === 'water') {
      if (value < 5) { text = "A bit low — try to aim for 8 glasses."; icon = <Droplets size={16} className="text-blue-500"/>; }
      else if (value >= 5 && value <= 8) { text = "Good progress, keep it up."; icon = <Waves size={16} className="text-blue-400"/>; }
      else if (value > 8) { text = "Excellent hydration!"; icon = <Activity size={16} className="text-nature-500"/>; }
    }
    setAiMessage({ text, icon });
  };

  const handleValueChange = (id, value) => { setFormData(prev => ({...prev, [id]: value})); updateAIMessage(id, value); };

  const handleNext = () => {
    if (step < questions.length - 1) { setStep(prev => prev + 1); }
    else {
      const results = processAssessment(formData);
      addAssessment(formData, results);
      if (results.burnoutRisk || results.scores.wellnessScore < 50) {
        setShowTriggerAlert(true);
        setTimeout(() => { 
          setShowTriggerAlert(false); 
          navigate('/dashboard');
          setIsMeditationOpen(true); 
          setTimeout(() => { setIsChatOpen(true); }, 12000); 
        }, 4000);
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      <motion.div layout className="w-full max-w-xl bg-white rounded-2xl shadow-sm overflow-hidden relative border border-stone-100">
        <div className="h-1 w-full bg-stone-100 flex overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} className="h-full bg-nature-500" />
        </div>
        <div className="p-6 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs text-stone-400 font-medium">{progressLabel}</span>
            <span className="text-xs text-stone-500 font-medium px-2.5 py-1 bg-stone-50 rounded-full">{step + 1} / {questions.length}</span>
          </div>
          <motion.div key={`ai-${step}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-start gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-nature-50 flex items-center justify-center text-nature-600 shrink-0"><Sparkles size={16}/></div>
            <div className="bg-stone-50 rounded-2xl rounded-tl-md p-3.5 grow">
              <div className="flex items-start gap-2">
                {aiMessage.icon && <div className="mt-0.5 shrink-0">{aiMessage.icon}</div>}
                <p className="text-stone-600 text-sm leading-relaxed">{aiMessage.text}</p>
              </div>
            </div>
          </motion.div>
          <h2 className="text-xl md:text-2xl font-semibold text-stone-800 mb-2 tracking-tight">{currentQ.title}</h2>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="min-h-[180px] flex items-center justify-center py-2">
              <DynamicInputRenderer question={currentQ} value={formData[currentQ.id]} onChange={(val) => handleValueChange(currentQ.id, val)} />
            </motion.div>
          </AnimatePresence>
          <ContextualFeedback id={currentQ.id} value={formData[currentQ.id]} formData={formData} />
          <div className="mt-8 flex justify-between items-center">
            <button onClick={() => setStep(prev => Math.max(0, prev-1))} className={`flex items-center gap-1.5 px-5 py-2.5 font-medium text-stone-500 hover:text-stone-700 hover:bg-stone-50 rounded-full transition-all text-sm ${step === 0 ? 'invisible' : ''}`}>
              <ChevronLeft size={16}/> Back
            </button>
            <button onClick={handleNext} className="flex items-center gap-2 px-8 py-3 bg-stone-900 text-white font-medium rounded-full hover:bg-stone-800 transition-all text-sm">
              <span>{step === questions.length - 1 ? 'See My Results' : 'Continue'}</span><ChevronRight size={16}/>
            </button>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showTriggerAlert && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-white/90 backdrop-blur-xl flex items-center justify-center p-8 text-center">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-sm">
              <div className="w-14 h-14 bg-nature-50 text-nature-600 rounded-full flex items-center justify-center mx-auto mb-6"><Wind size={28}/></div>
              <h3 className="text-2xl font-semibold text-stone-800 mb-3">Take a moment.</h3>
              <p className="text-stone-500 leading-relaxed">It looks like you're carrying a lot right now. Let's take a short break to reset.</p>
              <motion.div className="mt-10 h-0.5 bg-stone-100 rounded-full overflow-hidden w-40 mx-auto">
                <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 4 }} className="h-full bg-nature-500"/>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DynamicInputRenderer = ({ question, value, onChange }) => {
  switch (question.type) {
    case 'segmented_visual_picker': return <SegmentedPicker question={question} value={value} onChange={onChange}/>;
    case 'visual_meter': return <VisualMeter question={question} value={value} onChange={onChange}/>;
    case 'binary_selector': return <BinarySelector value={value} onChange={onChange}/>;
    case 'icon_card_selector': return <IconCardSelector options={question.options} value={value} onChange={onChange}/>;
    case 'incremental_visual_counter': return <WaterCounter value={value} onChange={onChange}/>;
    case 'info_card_selector': return <InfoCardSelector options={question.options} value={value} onChange={onChange}/>;
    default: return null;
  }
};

const SegmentedPicker = ({ question, value, onChange }) => (
  <div className="w-full">
    <div className="flex justify-between items-center px-2 mb-3 text-stone-500">
      <div className="opacity-40">{question.icons.start}</div>
      <div className="text-base font-semibold text-stone-800 flex items-center gap-1.5">{value} <span className="text-xs font-normal text-stone-400">hours</span></div>
      <div className="opacity-40">{question.icons.end}</div>
    </div>
    <div className="flex gap-1.5 p-1.5 bg-stone-50 rounded-xl">
      {question.options.map(opt => (
        <button key={opt} onClick={() => onChange(opt)} className={`flex-1 py-3 rounded-lg font-medium transition-all text-sm ${value === opt ? 'bg-stone-900 text-white shadow-sm' : 'bg-transparent text-stone-500 hover:bg-stone-100'}`}>{opt}</button>
      ))}
    </div>
  </div>
);

const VisualMeter = ({ question, value, onChange }) => {
  const getIcon = (val) => {
    if (val <= 3) return <ShieldCheck size={48} className="text-nature-600"/>;
    if (val <= 7) return <Heart size={48} className="text-orange-500"/>;
    return <ShieldAlert size={48} className="text-red-500"/>;
  };
  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      <motion.div key={value} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-6 bg-stone-50 p-5 rounded-2xl">{getIcon(value)}</motion.div>
      <div className="w-full space-y-3">
        <div className="flex justify-between text-stone-400 text-xs px-1"><span>{question.labels[0]}</span><span>{question.labels[2]}</span></div>
        <input type="range" min={question.min} max={question.max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full h-2 bg-stone-100 rounded-full appearance-none cursor-pointer accent-stone-900"/>
        <div className="text-center"><span className="text-2xl font-bold text-stone-800">{value}</span></div>
      </div>
    </div>
  );
};

const BinarySelector = ({ value, onChange }) => (
  <div className="flex gap-3 w-full max-w-xs">
    <button onClick={() => onChange(true)} className={`flex-1 py-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2.5 ${value === true ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-100 bg-stone-50 text-stone-400 hover:border-stone-200'}`}>
      <ThumbsUp size={26}/><span className="font-medium text-sm">Yes</span>
    </button>
    <button onClick={() => onChange(false)} className={`flex-1 py-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2.5 ${value === false ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-100 bg-stone-50 text-stone-400 hover:border-stone-200'}`}>
      <ThumbsDown size={26}/><span className="font-medium text-sm">No</span>
    </button>
  </div>
);

const IconCardSelector = ({ options, value, onChange }) => (
  <div className="grid grid-cols-2 gap-3 w-full">
    {options.map(opt => (
      <button key={opt.value} onClick={() => onChange(opt.value)} className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-2.5 relative overflow-hidden active:scale-[0.98] ${value === opt.value ? 'border-stone-800 bg-stone-50' : 'border-stone-100 bg-stone-50 hover:border-stone-200 hover:bg-white'}`}>
        <div className={`p-2.5 rounded-xl w-fit ${value === opt.value ? 'bg-stone-900 text-white' : 'bg-white text-stone-300'}`}>{opt.icon}</div>
        <div>
          <h4 className="font-semibold text-stone-800 leading-tight mb-0.5">{opt.label}</h4>
          <p className="text-xs text-stone-400">{opt.desc}</p>
        </div>
        {value === opt.value && <div className="absolute top-3 right-3 text-stone-700"><CheckCircle2 size={18}/></div>}
      </button>
    ))}
  </div>
);

const WaterCounter = ({ value, onChange }) => (
  <div className="flex flex-col items-center w-full">
    <div className="grid grid-cols-6 gap-2 mb-5">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.button key={i} whileTap={{ scale: 0.9 }} onClick={() => onChange(i + 1)} className={`p-2.5 rounded-lg transition-all ${i < value ? 'bg-blue-500 text-white shadow-sm' : 'bg-stone-50 text-stone-200 hover:bg-stone-100'}`}>
          <Droplets size={18}/>
        </motion.button>
      ))}
    </div>
    <div className="bg-stone-800 text-white px-5 py-2 rounded-full font-medium text-base">{value} <span className="text-xs text-stone-400 ml-1">glasses</span></div>
  </div>
);

const InfoCardSelector = ({ options, value, onChange }) => (
  <div className="flex flex-col gap-3 w-full">
    {options.map(opt => (
      <button key={opt.id} onClick={() => onChange(opt.id)} className={`p-4 rounded-2xl border-2 transition-all flex justify-between items-center ${value === opt.id ? 'border-stone-800 bg-white shadow-sm' : 'border-stone-100 bg-stone-50 hover:border-stone-200'}`}>
        <div className="text-left">
          <h4 className="text-lg font-semibold text-stone-800 mb-1.5">{opt.title}</h4>
          <div className="flex flex-wrap gap-1.5">
            {opt.items.map(item => (<span key={item} className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">{item}</span>))}
          </div>
          {opt.id === 'unknown' && value === 'unknown' && (
            <a href="https://www.banyanbotanicals.com/pages/dosha-quiz" target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-1.5 text-blue-600 font-medium text-xs hover:underline" onClick={(e) => e.stopPropagation()}>
              Take a quiz to find out <ExternalLink size={11}/>
            </a>
          )}
        </div>
        <div className={`p-2 rounded-full transition-all ${value === opt.id ? 'bg-stone-900 text-white' : 'bg-white text-stone-200'}`}>
          {value === opt.id ? <CheckCircle2 size={18}/> : <ChevronRight size={18}/>}
        </div>
      </button>
    ))}
  </div>
);

const ContextualFeedback = ({ id, value, formData }) => {
  const base = "mt-6 flex items-center justify-center gap-2 font-medium py-2.5 rounded-xl text-xs";
  if (id === 'sleep') {
    if (value < 5) return <motion.div initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} className={`${base} text-red-600 bg-red-50 border border-red-100`}><ShieldAlert size={15}/> You might need more rest</motion.div>;
    if (value <= 6) return <motion.div initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} className={`${base} text-amber-600 bg-amber-50 border border-amber-100`}><AlertTriangle size={15}/> A bit more sleep could help</motion.div>;
    if (value <= 9) return <motion.div initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} className={`${base} text-nature-600 bg-nature-50 border border-nature-100`}><CheckCircle2 size={15}/> Great sleep habits</motion.div>;
    if (value >= 10) return <motion.div initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} className={`${base} text-amber-600 bg-amber-50 border border-amber-100`}><Moon size={15}/> That's quite a lot of sleep</motion.div>;
  }
  if (id === 'water') {
    if (value < 4) return <motion.div initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} className={`${base} text-red-600 bg-red-50 border border-red-100`}><Droplets size={15}/> Try to drink more water today</motion.div>;
    if (value >= 10) return <motion.div initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} className={`${base} text-blue-600 bg-blue-50 border border-blue-100`}><Waves size={15}/> Well hydrated!</motion.div>;
  }
  const stressCount = (formData.stress1?1:0) + (formData.stress2?1:0) + (formData.stress3?1:0);
  if (id.startsWith('stress') && stressCount >= 2) return <motion.div initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} className={`${base} text-red-600 bg-red-50 border border-red-100`}><ShieldAlert size={15}/> You seem quite stressed</motion.div>;
  return <div className="mt-6 h-[40px]"/>;
};

export default Assessment;
