import React from 'react';
import { motion } from 'framer-motion';

export const AboutAndServices = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto px-4 py-16 lg:py-24">
    {/* About Section */}
    <div className="text-center max-w-3xl mx-auto mb-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--vs-text)] tracking-tight">The Science of Being</h1>
      <p className="text-lg md:text-xl text-[var(--vs-text-soft)] leading-relaxed">
        VitalSense combines Ayurvedic wellness principles with modern data analysis. We believe health is personal — not generic. By understanding your sleep, stress, and lifestyle patterns, we build a picture of your wellbeing that's unique to you.
      </p>
    </div>

    {/* Philosophy / Features Grid */}
    <div className="grid md:grid-cols-12 gap-8 mb-20">
      <div className="md:col-span-5 vs-panel-strong p-10 rounded-3xl text-[var(--vs-text)] flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-4 tracking-tight">Energy-Based Insights</h3>
        <p className="text-[var(--vs-text-soft)] leading-relaxed mb-8">
          Our approach tracks the relationship between cognitive strain, sleep quality, and constitutional balance to help you identify patterns before they become problems.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[rgba(255,248,241,0.84)] border border-[color:var(--vs-border)] flex items-center justify-center text-nature-700 font-bold shadow-sm">1</div>
            <span className="font-medium text-[var(--vs-text)]">Measure baselines</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[rgba(255,248,241,0.84)] border border-[color:var(--vs-border)] flex items-center justify-center text-nature-700 font-bold shadow-sm">2</div>
            <span className="font-medium text-[var(--vs-text)]">Track deviations</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[rgba(255,248,241,0.84)] border border-[color:var(--vs-border)] flex items-center justify-center text-nature-700 font-bold shadow-sm">3</div>
            <span className="font-medium text-[var(--vs-text)]">Apply interventions</span>
          </div>
        </div>
      </div>

      <div className="md:col-span-7 grid sm:grid-cols-2 gap-6">
        <div className="vs-panel-strong p-8 rounded-3xl flex flex-col hover:border-[color:var(--vs-border-strong)] transition-colors">
          <div className="w-12 h-12 bg-nature-50 text-nature-700 rounded-xl flex items-center justify-center mb-6 border border-[color:var(--vs-border)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
          <h2 className="text-xl font-bold mb-3 text-[var(--vs-text)]">For Individuals</h2>
          <p className="text-[var(--vs-text-soft)] mb-6 flex-grow text-sm leading-relaxed">Continuous tracking, personalized recommendations, and a clear picture of your health over time.</p>
          <ul className="space-y-2.5 text-sm text-[var(--vs-text-soft)] font-medium">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-nature-500" /> Burnout Risk Tracking</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-nature-500" /> Daily Streaks & Habits</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-nature-500" /> Guided Meditation</li>
          </ul>
        </div>
        
        <div className="vs-panel-strong p-8 rounded-3xl flex flex-col hover:border-[color:var(--vs-border-strong)] transition-colors">
          <div className="w-12 h-12 bg-[rgba(221,209,229,0.55)] text-nature-700 rounded-xl flex items-center justify-center mb-6 border border-[color:var(--vs-border)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h2 className="text-xl font-bold mb-3 text-[var(--vs-text)]">For Teams</h2>
          <p className="text-[var(--vs-text-soft)] mb-6 flex-grow text-sm leading-relaxed">Aggregate anonymized data to understand and improve your team's collective wellbeing.</p>
          <ul className="space-y-2.5 text-sm text-[var(--vs-text-soft)] font-medium">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-nature-400" /> Team Wellness Score</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-nature-400" /> Department Insights</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-nature-400" /> Group Challenges</li>
          </ul>
        </div>
      </div>
    </div>
  </motion.div>
);

export const Booking = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-md mx-auto px-4 py-20">
    <div className="vs-panel-strong p-8 rounded-2xl">
      <h2 className="text-xl font-semibold mb-2 text-[var(--vs-text)]">Book a Session</h2>
      <p className="text-[var(--vs-text-soft)] text-sm mb-6">Schedule a wellness consultation at one of our partner locations.</p>
      
      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Booking Confirmed!"); }}>
        <div>
          <label className="block text-sm font-medium text-[var(--vs-text-soft)] mb-1.5">Full Name</label>
          <input type="text" required className="w-full vs-input rounded-xl px-4 py-3 focus:outline-none focus:border-nature-400 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--vs-text-soft)] mb-1.5">Preferred Date</label>
          <input type="date" required className="w-full vs-input rounded-xl px-4 py-3 focus:outline-none focus:border-nature-400 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--vs-text-soft)] mb-1.5">Facility Location</label>
          <select className="w-full vs-input rounded-xl px-4 py-3 focus:outline-none focus:border-nature-400 transition-colors">
            <option>Downtown Vitality Center</option>
            <option>Westwood Holistic Clinic</option>
          </select>
        </div>
        <button type="submit" className="w-full py-3.5 bg-nature-700 hover:bg-nature-800 text-[var(--vs-cream)] rounded-xl font-medium mt-2 transition-colors shadow-[0_18px_40px_rgba(77,59,90,0.12)]">
          Confirm Appointment
        </button>
      </form>
    </div>
  </motion.div>
);

export const Profile = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto px-4 py-20 text-center text-[var(--vs-text-soft)]">
     <h1 className="text-2xl font-semibold text-[var(--vs-text)] mb-4">Your Profile</h1>
     <p>Past assessments, privacy settings, and connected device data will show up here.</p>
  </motion.div>
);
