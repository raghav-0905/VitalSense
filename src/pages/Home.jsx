import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Heart, Sparkles, Activity, Calendar } from 'lucide-react';

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pb-20"
    >
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-mesh-light pt-10">
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md rounded-full px-5 py-2 border border-black/5 text-nature-700 text-sm font-semibold mb-8 shadow-sm"
            >
              <Sparkles className="h-4 w-4 text-nature-500" />
              <span>A New Era of Wellness</span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-serif font-black tracking-tight leading-[1.05] text-slate-950 mb-6 max-w-5xl"
            >
              Holistic Health, <br/>
              <span className="text-nature-700">Quantified.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-slate-900 max-w-2xl font-medium leading-relaxed mb-10 opacity-80"
            >
              Your personal equilibrium dashboard. VitalSense unifies cutting-edge analytics with mindful practices to deliver precise, actionable wellness insights.
            </motion.p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto justify-center"
            >
              <Link to="/assessment" className="w-full sm:w-auto flex items-center justify-center px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link to="/booking" className="w-full sm:w-auto flex items-center justify-center px-10 py-4 bg-white text-slate-950 rounded-full font-black hover:bg-slate-50 transition-all border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                <Calendar className="mr-2 h-5 w-5 text-nature-700" />
                Book Session
              </Link>
            </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-nature-600 tracking-widest uppercase mb-4">Core Principles</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Data-Driven, Human-Centric</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Brain className="h-8 w-8 text-nature-600" />}
            title="Mental Resilience"
            desc="Track stress levels, cognitive load, and emotional well-being using our predictive burnout modeling interface."
          />
          <FeatureCard 
            icon={<Heart className="h-8 w-8 text-nature-600" />}
            title="Physical Vitality"
            desc="Actionable insights on sleep, activity, and nutrition directly mapped to your body's specific baseline needs."
          />
          <FeatureCard 
            icon={<Activity className="h-8 w-8 text-nature-600" />}
            title="Mindful Synergies"
            desc="Ancient balance mapped. We adapt our daily recommendations based on your unique physiological proxy patterns."
          />
        </div>
      </section>
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="glass-card p-10 rounded-3xl hover:-translate-y-2 transition-transform duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] group bg-white">
    <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-slate-100 group-hover:scale-110 transition-transform shadow-sm">
      {icon}
    </div>
    <h4 className="text-2xl font-black mb-4 text-slate-950">{title}</h4>
    <p className="text-slate-900 leading-relaxed font-semibold opacity-60">{desc}</p>
  </div>
);

export default Home;
