import React from 'react';
import { motion } from 'framer-motion';

export const AboutAndServices = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto px-4 py-16 lg:py-24">
    {/* About Section */}
    <div className="text-center max-w-3xl mx-auto mb-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-stone-900 tracking-tight">The Science of Being</h1>
      <p className="text-lg md:text-xl text-stone-500 leading-relaxed">
        VitalSense combines Ayurvedic wellness principles with modern data analysis. We believe health is personal — not generic. By understanding your sleep, stress, and lifestyle patterns, we build a picture of your wellbeing that's unique to you.
      </p>
    </div>

    {/* Philosophy / Features Grid */}
    <div className="grid md:grid-cols-12 gap-8 mb-20">
      <div className="md:col-span-5 bg-stone-50 p-10 rounded-3xl border border-stone-100 text-stone-800 flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-4 tracking-tight">Energy-Based Insights</h3>
        <p className="text-stone-500 leading-relaxed mb-8">
          Our approach tracks the relationship between cognitive strain, sleep quality, and constitutional balance to help you identify patterns before they become problems.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-nature-600 font-bold shadow-sm">1</div>
            <span className="font-medium text-stone-700">Measure baselines</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-nature-600 font-bold shadow-sm">2</div>
            <span className="font-medium text-stone-700">Track deviations</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-nature-600 font-bold shadow-sm">3</div>
            <span className="font-medium text-stone-700">Apply interventions</span>
          </div>
        </div>
      </div>

      <div className="md:col-span-7 grid sm:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-stone-100 flex flex-col hover:border-stone-200 transition-colors">
          <div className="w-12 h-12 bg-nature-50 text-nature-600 rounded-xl flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
          <h2 className="text-xl font-bold mb-3 text-stone-800">For Individuals</h2>
          <p className="text-stone-500 mb-6 flex-grow text-sm leading-relaxed">Continuous tracking, personalized recommendations, and a clear picture of your health over time.</p>
          <ul className="space-y-2.5 text-sm text-stone-600 font-medium">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-nature-500" /> Burnout Risk Tracking</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-nature-500" /> Daily Streaks & Habits</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-nature-500" /> Guided Meditation</li>
          </ul>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-stone-100 flex flex-col hover:border-stone-200 transition-colors">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h2 className="text-xl font-bold mb-3 text-stone-800">For Teams</h2>
          <p className="text-stone-500 mb-6 flex-grow text-sm leading-relaxed">Aggregate anonymized data to understand and improve your team's collective wellbeing.</p>
          <ul className="space-y-2.5 text-sm text-stone-600 font-medium">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Team Wellness Score</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Department Insights</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Group Challenges</li>
          </ul>
        </div>
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
