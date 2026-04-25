import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Heart, Sparkles, Activity, Calendar } from 'lucide-react';

const AUTO_ROTATE_MS = 3200;

const insightOptions = [
  {
    id: 'late-screen-time',
    label: 'Late screen time',
    tone: 'Higher stress load',
    blurb: 'Evening stimulation can keep your system activated longer and delay deeper recovery.',
    highlightColor: '#cdb58a',
    glowColor: 'rgba(208, 188, 149, 0.22)',
    curvePath: 'M0,30 C60,30 120,34 170,34 C194,34 206,24 218,-8 C226,-34 234,-84 242,-118 C248,-146 256,-150 264,-134 C274,-112 284,-62 296,-20 C308,20 324,54 344,72 C364,90 390,90 420,84',
  },
  {
    id: 'morning-walk',
    label: 'Morning walk',
    tone: 'Steadier energy',
    blurb: 'Light movement early in the day often supports calmer energy, better mood, and a more stable rhythm.',
    highlightColor: '#90afca',
    glowColor: 'rgba(143, 168, 198, 0.20)',
    curvePath: 'M0,34 C56,36 112,38 160,36 C186,34 206,18 222,-14 C234,-40 246,-54 260,-52 C276,-48 290,-20 304,10 C318,38 336,52 360,54 C382,56 402,52 420,50',
  },
  {
    id: 'breathing-reset',
    label: 'Breathing reset',
    tone: 'Faster recovery',
    blurb: 'Small recovery rituals during busy days can help the body settle and reduce mental overload.',
    highlightColor: '#88a6c6',
    glowColor: 'rgba(157, 145, 177, 0.18)',
    curvePath: 'M0,28 C60,28 118,28 170,20 C192,16 210,-2 224,-34 C234,-58 244,-70 256,-68 C270,-64 282,-38 296,-10 C310,18 328,28 354,28 C380,28 400,28 420,28',
  },
  {
    id: 'consistent-sleep',
    label: 'Consistent sleep',
    tone: 'Balanced recovery',
    blurb: 'A more consistent sleep window usually creates steadier recovery patterns across the whole week.',
    highlightColor: '#a18ebf',
    glowColor: 'rgba(178, 167, 196, 0.22)',
    curvePath: 'M0,30 C66,32 120,34 170,30 C194,28 212,12 226,-12 C236,-32 246,-42 258,-42 C272,-40 286,-20 300,4 C314,26 332,40 356,44 C382,48 402,44 420,42',
  },
];

const getAreaPath = (curvePath) => `${curvePath} L 420 240 L 0 240 Z`;

const quoteCards = [
  {
    quote: "Your time is limited, so don't waste it living someone else's life.",
    person: 'Steve Jobs',
    role: 'Apple co-founder',
  },
  {
    quote: "There is no such thing as failure. Failure is just life trying to move us in another direction.",
    person: 'Oprah Winfrey',
    role: 'Media leader',
  },
  {
    quote: "True leadership often happens with the smallest acts, in the most unexpected places, by the most unlikely individuals.",
    person: 'Michelle Obama',
    role: 'Author and former First Lady',
  },
  {
    quote: "One child, one teacher, one book and one pen can change the world.",
    person: 'Malala Yousafzai',
    role: 'Education activist',
  },
];

const Home = () => {
  const [activeInsightIndex, setActiveInsightIndex] = useState(2);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setActiveInsightIndex((current) => (current + 1) % insightOptions.length);
    }, AUTO_ROTATE_MS);

    return () => window.clearTimeout(timerId);
  }, [activeInsightIndex]);

  const activeInsight = insightOptions[activeInsightIndex];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className=""
    >
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-10">
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center space-x-2 bg-[rgba(255,248,241,0.82)] border border-[color:var(--vs-border)] rounded-full px-4 py-1.5 text-nature-700 text-sm font-medium mb-8"
            >
              <Sparkles className="h-3.5 w-3.5 text-nature-500" />
              <span>Wellness, simplified</span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-[var(--vs-text)] mb-6 max-w-4xl"
            >
              Your wellness, <br/>
              <span className="text-nature-600">understood.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-[var(--vs-text-soft)] max-w-xl font-normal leading-relaxed mb-10"
            >
              VitalSense helps you track sleep, stress, and energy — then gives you simple, personalized recommendations to feel your best.
            </motion.p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center"
            >
              <Link to="/assessment" style={{ color: '#ffffff' }} className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 bg-nature-700 hover:bg-nature-800 text-white! [&>*]:text-white! rounded-full font-medium transition-all shadow-[0_18px_40px_rgba(77,59,90,0.12)] hover:shadow-[0_24px_50px_rgba(77,59,90,0.18)]">
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              
              <Link to="/booking" className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 bg-[rgba(255,248,241,0.82)] text-[var(--vs-text)] rounded-full font-medium hover:bg-[rgba(255,248,241,0.95)] transition-all border border-[color:var(--vs-border)] shadow-[0_16px_40px_rgba(77,59,90,0.06)]">
                <Calendar className="mr-2 h-4 w-4 text-nature-600" />
                Book Session
              </Link>
            </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
            <div>
              <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.28em] text-[var(--vs-text-soft)] mb-6">
                Stop guessing
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-[var(--vs-text)] max-w-2xl">
                Wellness patterns are personal. Your routine should be too.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[var(--vs-text-soft)] max-w-2xl">
                VitalSense turns everyday signals like sleep, stress, and energy into guidance that actually fits your body, not generic advice.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[var(--vs-text-muted)] max-w-xl">
                Explore how simple routines can shift your recovery curve, then get personalized next steps on your assessment.
              </p>
              <Link
                to="/assessment"
                className="mt-8 inline-flex items-center gap-2 text-lg font-medium text-nature-700 hover:text-nature-800 transition-colors"
              >
                Start assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative rounded-[2rem] border border-[color:var(--vs-border)] bg-[linear-gradient(180deg,rgba(115,101,133,0.96),rgba(94,82,111,0.96))] p-5 sm:p-7 shadow-[0_30px_90px_rgba(77,59,90,0.16)] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(244,236,226,0.15),transparent_24%),radial-gradient(circle_at_78%_76%,rgba(237,216,184,0.12),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0))]" />

              <div className="relative">
                <div
                  className="absolute inset-x-10 top-3 h-56 rounded-full blur-3xl transition-all duration-500"
                  style={{ backgroundColor: activeInsight.glowColor }}
                />

                <div className="relative h-[400px] sm:h-[440px] rounded-[1.75rem] border border-white/10 bg-[rgba(80,69,96,0.3)] backdrop-blur-sm overflow-hidden">
                  <svg
                    viewBox="0 -232 420 472"
                    className="pointer-events-none absolute inset-x-4 top-[-20px] h-[248px] sm:top-[-26px] sm:h-[280px] w-[calc(100%-2rem)]"
                  >
                    <defs>
                      <linearGradient id="insightAreaGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#efe5d8" stopOpacity="0.16" />
                        <stop offset="100%" stopColor="#efe5d8" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="insightLineGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                        <stop offset="0%" stopColor="#f1e8dc" />
                        <stop offset="50%" stopColor="#f1e8dc" />
                        <stop offset="58%" stopColor={activeInsight.highlightColor} />
                        <stop offset="70%" stopColor="#f1e8dc" />
                        <stop offset="100%" stopColor="#f1e8dc" />
                      </linearGradient>
                      <filter id="chartGlow" x="-20%" y="-80%" width="140%" height="240%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    <motion.g
                      key={activeInsight.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, ease: 'easeOut' }}
                    >
                      <path
                        d={getAreaPath(activeInsight.curvePath)}
                        fill="url(#insightAreaGradient)"
                      />
                      <motion.path
                        d={activeInsight.curvePath}
                        fill="none"
                        stroke="url(#insightLineGradient)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#chartGlow)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.9, ease: 'easeInOut' }}
                      />
                    </motion.g>
                  </svg>

                  <div className="absolute bottom-9 left-1/2 w-full max-w-[24rem] -translate-x-1/2 px-4 text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#ded2e5] mb-4">
                      {activeInsight.tone}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                      {insightOptions.map((option, index) => {
                        const isActive = index === activeInsightIndex;

                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setActiveInsightIndex(index)}
                            className={`relative overflow-hidden rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all duration-300 ${
                              isActive
                                ? 'border-[rgba(255,255,255,0.22)] bg-[var(--vs-cream)] text-[var(--vs-text)] shadow-lg shadow-black/10'
                                : 'border-white/10 bg-[rgba(255,248,241,0.08)] text-[#ede4ef] hover:border-white/20 hover:text-white'
                            } focus:outline-none focus-visible:outline-none`}
                          >
                            {isActive && (
                              <span className="absolute inset-x-2 bottom-1 h-[2px] rounded-full bg-[rgba(74,53,87,0.08)]">
                                <motion.span
                                  key={activeInsight.id}
                                  className="block h-full rounded-full bg-[#2d7ff9]"
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: 1 }}
                                  transition={{ duration: AUTO_ROTATE_MS / 1000, ease: 'linear' }}
                                  style={{ transformOrigin: 'left center' }}
                                />
                              </span>
                            )}
                            {option.label}
                          </button>
                        );
                      })}
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-[#e7ddea] max-w-md mx-auto">
                      {activeInsight.blurb}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-nature-700 mb-3">How it works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--vs-text)]">Built around you</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Brain className="h-6 w-6 text-nature-600" />}
            title="Mental Wellness"
            desc="Track your stress levels, cognitive load, and emotional patterns over time."
          />
          <FeatureCard 
            icon={<Heart className="h-6 w-6 text-nature-600" />}
            title="Physical Health"
            desc="Understand how sleep, activity, and nutrition affect how you feel day to day."
          />
          <FeatureCard 
            icon={<Activity className="h-6 w-6 text-nature-600" />}
            title="Personalized Tips"
            desc="Get daily recommendations adapted to your body's unique needs and rhythms."
          />
        </div>
      </section>

      <section className="mt-10 bg-[#3a3145] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#cdbad9] mb-4">
              Motivation Wall
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-5">
              Words from people everyone knows
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-[#d7ccd9]">
              A few timeless reminders from iconic voices to keep visitors inspired while they explore VitalSense.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {quoteCards.map((item) => (
              <div
                key={item.person}
                className="min-h-[280px] rounded-[1.75rem] bg-[rgba(255,248,241,0.96)] border border-white/40 p-6 md:p-7 flex flex-col shadow-[0_20px_55px_rgba(17,10,24,0.12)]"
              >
                <div className="text-6xl leading-none text-[rgba(129,102,143,0.18)] font-serif mb-6">
                  "
                </div>
                <p className="text-[15px] leading-7 text-[var(--vs-text)] flex-1">
                  {item.quote}
                </p>
                <div className="pt-6 mt-6 border-t border-[rgba(74,53,87,0.08)]">
                  <p className="text-sm font-semibold text-[var(--vs-text)]">{item.person}</p>
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--vs-text-muted)] mt-2">
                    {item.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="vs-panel-strong p-8 rounded-2xl hover:-translate-y-1 transition-transform duration-300 hover:shadow-[0_24px_60px_rgba(77,59,90,0.1)]">
    <div className="bg-nature-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-[color:var(--vs-border)]">
      {icon}
    </div>
    <h4 className="text-lg font-semibold mb-3 text-[var(--vs-text)]">{title}</h4>
    <p className="text-[var(--vs-text-soft)] leading-relaxed text-[15px]">{desc}</p>
  </div>
);

export default Home;
