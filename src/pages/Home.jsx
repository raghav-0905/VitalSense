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
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-10">
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center space-x-2 bg-nature-50 rounded-full px-4 py-1.5 text-nature-700 text-sm font-medium mb-8"
            >
              <Sparkles className="h-3.5 w-3.5 text-nature-500" />
              <span>Wellness, simplified</span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-stone-900 mb-6 max-w-4xl"
            >
              Your wellness, <br/>
              <span className="text-nature-600">understood.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-stone-500 max-w-xl font-normal leading-relaxed mb-10"
            >
              VitalSense helps you track sleep, stress, and energy — then gives you simple, personalized recommendations to feel your best.
            </motion.p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center"
            >
              <Link to="/assessment" className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full font-medium transition-all shadow-sm hover:shadow-md">
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              
              <Link to="/booking" className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 bg-white text-stone-700 rounded-full font-medium hover:bg-stone-50 transition-all border border-stone-200">
                <Calendar className="mr-2 h-4 w-4 text-nature-600" />
                Book Session
              </Link>
            </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-nature-600 mb-3">How it works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900">Built around you</h2>
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
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl border border-stone-100 hover:-translate-y-1 transition-transform duration-300 hover:shadow-sm">
    <div className="bg-nature-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h4 className="text-lg font-semibold mb-3 text-stone-900">{title}</h4>
    <p className="text-stone-500 leading-relaxed text-[15px]">{desc}</p>
  </div>
);

export default Home;
