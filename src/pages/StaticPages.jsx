import React from 'react';
import { motion } from 'framer-motion';

export const About = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto px-4 py-20 text-center">
    <h1 className="text-5xl font-serif font-bold mb-8 text-nature-600">The Science of Being.</h1>
    <p className="text-xl text-slate-600 font-light leading-relaxed mb-8">
      VitalSense sits at the intersection of deeply rooted Ayurvedic principles and cutting-edge artificial intelligence. We believe that wellness is not a generic state, but a highly personalized equilibrium. By analyzing your physical and elemental inputs, our models construct a lifestyle blueprint tailored perfectly to your unique systemic needs.
    </p>
    <div className="glass-card p-8 rounded-2xl text-left mt-12 border-l-4 border-nature-500 bg-white/60">
      <h3 className="text-3xl font-serif font-semibold text-slate-800 mb-4">Energy-Based Diagnostics</h3>
      <p className="text-slate-600">Our conceptual energy tracking simulates the relationship between cognitive strain, circadian rhythms, and dosha imbalances to predict and mitigate long-term burnout.</p>
    </div>
  </motion.div>
);

export const Services = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto px-4 py-20">
    <h1 className="text-4xl font-serif font-bold mb-12 text-center text-slate-800">Tailored Ecosystems</h1>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="glass-card p-10 rounded-3xl relative overflow-hidden bg-white/60 shadow-lg border border-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-nature-500/10 rounded-bl-full rounded-tr-3xl" />
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Individual Equilibrium</h2>
        <p className="text-slate-600 mb-6 border-b border-black/5 pb-6">Continuous tracking, dynamic recommendations, and an evolving model of your personal health metrics.</p>
        <ul className="space-y-3 text-sm text-slate-600 font-medium">
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-nature-500" /> AI Burnout Prediction</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-nature-500" /> Daily Streaks & Habits</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-nature-500" /> Custom Meditation Sequences</li>
        </ul>
      </div>
      <div className="glass-card p-10 ml-0 md:ml-4 rounded-3xl relative overflow-hidden bg-white/60 shadow-lg border border-white hover:border-nature-500/20 transition-all">
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-tl-full rounded-br-3xl" />
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Corporate Blueprint</h2>
        <p className="text-slate-600 mb-6 border-b border-black/5 pb-6">Aggregate anonymized data to measure and enhance organizational well-being.</p>
        <ul className="space-y-3 text-sm text-slate-600 font-medium">
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Organization Health Index</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Department Risk Mapping</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Group Wellness Challenges</li>
        </ul>
      </div>
    </div>
  </motion.div>
);

export const Booking = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-md mx-auto px-4 py-20">
    <div className="glass-card p-8 rounded-3xl bg-white border border-slate-100 shadow-xl">
      <h2 className="text-2xl font-bold mb-2 text-slate-800">Book a Session</h2>
      <p className="text-slate-500 text-sm mb-6">Schedule a non-invasive physical assessment at our partner clinics.</p>
      
      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Booking Confirmed!"); }}>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Full Name</label>
          <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-nature-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Preferred Date</label>
          <input type="date" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-nature-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Facility Location</label>
          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-nature-500">
            <option>Downtown Vitality Center</option>
            <option>Westwood Holistic Clinic</option>
          </select>
        </div>
        <button type="submit" className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold mt-4 transition-colors shadow-lg">
          Confirm Appointment
        </button>
      </form>
    </div>
  </motion.div>
);

export const Profile = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto px-4 py-20 text-center text-slate-600">
     <h1 className="text-3xl font-bold text-slate-800 mb-4">User Profile</h1>
     <p>Historical assessment logs, privacy settings, and connected device data will appear here.</p>
  </motion.div>
);
