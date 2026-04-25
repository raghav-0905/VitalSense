import React from 'react';
import { motion } from 'framer-motion';

export const About = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto px-4 py-20 text-center">
    <h1 className="text-4xl font-bold mb-8 text-stone-900">About VitalSense</h1>
    <p className="text-lg text-stone-500 leading-relaxed mb-10">
      VitalSense combines Ayurvedic wellness principles with modern data analysis. We believe health is personal — not generic. By understanding your sleep, stress, and lifestyle patterns, we build a picture of your wellbeing that's unique to you.
    </p>
    <div className="bg-white p-8 rounded-2xl text-left border border-stone-100">
      <h3 className="text-2xl font-semibold text-stone-800 mb-3">Energy-Based Insights</h3>
      <p className="text-stone-500 leading-relaxed">Our approach tracks the relationship between cognitive strain, sleep quality, and constitutional balance to help you identify patterns before they become problems.</p>
    </div>
  </motion.div>
);

export const Services = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-5xl mx-auto px-4 py-20">
    <h1 className="text-3xl font-bold mb-10 text-center text-stone-900">What We Offer</h1>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-8 rounded-2xl border border-stone-100">
        <h2 className="text-xl font-semibold mb-3 text-stone-800">For Individuals</h2>
        <p className="text-stone-500 mb-6 pb-6 border-b border-stone-100">Continuous tracking, personalized recommendations, and a clear picture of your health over time.</p>
        <ul className="space-y-3 text-sm text-stone-500">
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-nature-500" /> Burnout Risk Tracking</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-nature-500" /> Daily Streaks & Habits</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-nature-500" /> Guided Meditation</li>
        </ul>
      </div>
      <div className="bg-white p-8 rounded-2xl border border-stone-100">
        <h2 className="text-xl font-semibold mb-3 text-stone-800">For Teams</h2>
        <p className="text-stone-500 mb-6 pb-6 border-b border-stone-100">Aggregate anonymized data to understand and improve your team's wellbeing.</p>
        <ul className="space-y-3 text-sm text-stone-500">
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Team Wellness Score</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Department Insights</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Group Challenges</li>
        </ul>
      </div>
    </div>
  </motion.div>
);

export const Booking = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-md mx-auto px-4 py-20">
    <div className="bg-white p-8 rounded-2xl border border-stone-100">
      <h2 className="text-xl font-semibold mb-2 text-stone-800">Book a Session</h2>
      <p className="text-stone-500 text-sm mb-6">Schedule a wellness consultation at one of our partner locations.</p>
      
      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Booking Confirmed!"); }}>
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1.5">Full Name</label>
          <input type="text" required className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-800 focus:outline-none focus:border-nature-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1.5">Preferred Date</label>
          <input type="date" required className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-800 focus:outline-none focus:border-nature-500 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-600 mb-1.5">Facility Location</label>
          <select className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-800 focus:outline-none focus:border-nature-500 transition-colors">
            <option>Downtown Vitality Center</option>
            <option>Westwood Holistic Clinic</option>
          </select>
        </div>
        <button type="submit" className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium mt-2 transition-colors">
          Confirm Appointment
        </button>
      </form>
    </div>
  </motion.div>
);

export const Profile = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto px-4 py-20 text-center text-stone-500">
     <h1 className="text-2xl font-semibold text-stone-800 mb-4">Your Profile</h1>
     <p>Past assessments, privacy settings, and connected device data will show up here.</p>
  </motion.div>
);
