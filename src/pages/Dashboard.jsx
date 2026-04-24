import React, { useContext } from 'react';
import { WellnessContext } from '../context/WellnessContext';
import { motion } from 'framer-motion';
import { Activity, Flame, Heart, Zap, AlertTriangle, Calendar, Droplets } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const Dashboard = () => {
  const { userProfile, currentMetrics, streak, assessments } = useContext(WellnessContext);

  const historyData = assessments.slice(0, 7).reverse().map((a, i) => ({
    name: `Day ${i+1}`,
    score: a.scores?.wellnessScore || 60 + Math.random() * 30
  }));

  const activeChartData = historyData.length > 0 ? historyData : [
    { name: 'Mon', score: 65 }, { name: 'Tue', score: 68 }, 
    { name: 'Wed', score: 74 }, { name: 'Thu', score: 72 }, 
    { name: 'Fri', score: 85 }, { name: 'Sat', score: 82 }, 
    { name: 'Sun', score: 78 }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24"
    >
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black font-serif mb-2 text-slate-950 tracking-tight">Welcome back, {userProfile.name}</h1>
          <p className="text-slate-900 font-semibold opacity-60 italic">Your biometric baseline and vital trajectory.</p>
        </div>
        
        <div className="glass-card px-5 py-2.5 rounded-full flex items-center space-x-2 border-orange-200 bg-orange-50 shadow-sm">
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="font-bold text-orange-600">{streak.count} Day Streak</span>
        </div>
      </div>

      {currentMetrics.burnoutRisk && (
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8 border border-red-200 bg-red-50 p-5 rounded-2xl flex items-start space-x-4 shadow-sm"
        >
          <AlertTriangle className="h-6 w-6 text-red-500 shrink-0 mt-1" />
          <div>
            <h3 className="text-red-700 font-bold text-lg">High Burnout Risk Detected</h3>
            <p className="text-red-600/80 text-sm mt-1">
              Your recent assessment indicates critically high stress combined with low sleep. 
              Please prioritize rest immediately. We recommend scheduling an offline consultation.
            </p>
          </div>
        </motion.div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Score Card */}
        <div className="glass-card p-8 rounded-3xl lg:col-span-1 flex flex-col items-center justify-center relative overflow-hidden bg-white">
           <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-nature-400 to-blue-400" />
           <h3 className="text-slate-900 font-black mb-6 w-full text-center tracking-widest uppercase text-xs opacity-40">System Equilibrium</h3>
           
           <div className="relative flex items-center justify-center w-52 h-52 rounded-full border-[12px] border-slate-50/80 shadow-inner bg-slate-50">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle 
                  cx="50%" cy="50%" r="44%" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="10" 
                  className="text-nature-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-all duration-1000 ease-out"
                  strokeDasharray="276"
                  strokeDashoffset={276 - (276 * currentMetrics.wellnessScore) / 100}
                />
              </svg>
              <div className="text-center bg-white w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-sm border border-slate-100">
                <span className="text-5xl font-black text-slate-950 tracking-tighter">{currentMetrics.wellnessScore}</span>
                <span className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">Index</span>
              </div>
           </div>
        </div>

        {/* Sub Scores */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
          <ScoreCard title="Energy Levels" score={currentMetrics.energyScore} icon={<Zap className="text-yellow-500 h-6 w-6" />} color="bg-yellow-400" />
          <ScoreCard title="Physical Health" score={currentMetrics.physicalScore} icon={<Activity className="text-blue-500 h-6 w-6" />} color="bg-blue-400" />
          <ScoreCard title="Mental Health" score={currentMetrics.mentalScore} icon={<Heart className="text-pink-500 h-6 w-6" />} color="bg-pink-400" />
          <ScoreCard title="Emotional State" score={currentMetrics.emotionalScore} icon={<Droplets className="text-purple-500 h-6 w-6" />} color="bg-purple-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Column */}
        <div className="glass-card p-8 rounded-3xl bg-white/70">
          <h3 className="text-xl font-black mb-8 text-slate-900 tracking-tight">Wellness Trajectory</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeChartData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#cbd5e1" tick={{fill: '#475569'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#cbd5e1" tick={{fill: '#475569'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations Column */}
        <div className="space-y-6">
          <div className="glass-card p-8 rounded-3xl h-full bg-white/70">
            <h3 className="text-xl font-black mb-6 flex items-center">
              <span className="bg-gradient-to-r from-nature-700 to-blue-700 text-transparent bg-clip-text">Engineered Insights</span>
            </h3>
            
            <div className="space-y-4">
              {currentMetrics.recommendations.map((rec, i) => (
                <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm leading-relaxed text-slate-900 font-semibold">
                  <p>{rec}</p>
                </div>
              ))}
              {currentMetrics.recommendations.length === 0 && (
                <p className="text-slate-500 font-medium italic text-sm">Take an assessment to generate AI insights.</p>
              )}
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
};

const ScoreCard = ({ title, score, icon, color }) => (
  <div className="glass-card p-6 rounded-3xl flex flex-col justify-between bg-white/80 hover:bg-white transition-colors border border-white">
    <div className="flex justify-between items-start mb-6">
      <div className={`p-3 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm`}>
        {icon}
      </div>
      <span className="text-4xl font-black text-slate-950 tracking-tighter">{score}</span>
    </div>
    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${score}%` }} />
    </div>
    <h4 className="text-slate-900 text-[10px] mt-4 font-black tracking-widest uppercase opacity-40">{title}</h4>
  </div>
);

export default Dashboard;
