import React, { useContext } from 'react';
import { WellnessContext } from '../context/WellnessContext';
import { motion } from 'framer-motion';
import { Activity, Flame, Heart, Zap, AlertTriangle, Droplets } from 'lucide-react';
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
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24"
    >
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-stone-900 tracking-tight">Welcome back, {userProfile.name}</h1>
          <p className="text-stone-400 text-sm">Here's how you've been doing.</p>
        </div>
        
        <div className="px-4 py-2 rounded-full flex items-center space-x-2 bg-amber-50 border border-amber-100">
          <Flame className="h-4 w-4 text-amber-500" />
          <span className="font-medium text-amber-700 text-sm">{streak.count} day streak</span>
        </div>
      </div>

      {currentMetrics.burnoutRisk && (
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8 border border-red-100 bg-red-50 p-5 rounded-2xl flex items-start space-x-4"
        >
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-red-700 font-semibold">High Burnout Risk</h3>
            <p className="text-red-600/80 text-sm mt-1">
              Your recent assessment shows high stress combined with low sleep. 
              Prioritize rest and consider scheduling a wellness consultation.
            </p>
          </div>
        </motion.div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {/* Main Score Card */}
        <div className="bg-white p-8 rounded-2xl border border-stone-100 lg:col-span-1 flex flex-col items-center justify-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-nature-400" />
           <h3 className="text-stone-400 font-medium mb-6 w-full text-center text-xs">Wellness Score</h3>
           
           <div className="relative flex items-center justify-center w-44 h-44 rounded-full border-8 border-stone-50 bg-stone-50">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle 
                  cx="50%" cy="50%" r="44%" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  className="text-nature-500 transition-all duration-1000 ease-out"
                  strokeDasharray="276"
                  strokeDashoffset={276 - (276 * currentMetrics.wellnessScore) / 100}
                />
              </svg>
              <div className="text-center bg-white w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-sm border border-stone-50">
                <span className="text-4xl font-bold text-stone-900 tracking-tight">{currentMetrics.wellnessScore}</span>
                <span className="text-xs text-stone-400 mt-0.5">out of 100</span>
              </div>
           </div>
        </div>

        {/* Sub Scores */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-5">
          <ScoreCard title="Energy" score={currentMetrics.energyScore} icon={<Zap className="text-amber-500 h-5 w-5" />} color="bg-amber-400" />
          <ScoreCard title="Physical" score={currentMetrics.physicalScore} icon={<Activity className="text-blue-500 h-5 w-5" />} color="bg-blue-400" />
          <ScoreCard title="Mental" score={currentMetrics.mentalScore} icon={<Heart className="text-pink-500 h-5 w-5" />} color="bg-pink-400" />
          <ScoreCard title="Emotional" score={currentMetrics.emotionalScore} icon={<Droplets className="text-violet-500 h-5 w-5" />} color="bg-violet-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-white p-8 rounded-2xl border border-stone-100">
          <h3 className="text-lg font-semibold mb-6 text-stone-800">Trend</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeChartData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#d6d3d1" tick={{fill: '#a8a29e', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#d6d3d1" tick={{fill: '#a8a29e', fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e7e5e4', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', fontSize: 13 }} />
                <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white p-8 rounded-2xl border border-stone-100 h-full">
          <h3 className="text-lg font-semibold mb-5 text-stone-800">Recommendations</h3>
          <div className="space-y-3">
            {currentMetrics.recommendations.map((rec, i) => (
              <div key={i} className="p-4 bg-stone-50 rounded-xl text-stone-600 text-sm leading-relaxed">
                <p>{rec}</p>
              </div>
            ))}
            {currentMetrics.recommendations.length === 0 && (
              <p className="text-stone-400 text-sm">Take an assessment to get personalized recommendations.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ScoreCard = ({ title, score, icon, color }) => (
  <div className="bg-white p-5 rounded-2xl border border-stone-100 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-5">
      <div className="p-2.5 rounded-xl bg-stone-50">{icon}</div>
      <span className="text-3xl font-bold text-stone-900 tracking-tight">{score}</span>
    </div>
    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${score}%` }} />
    </div>
    <h4 className="text-stone-400 text-xs mt-3 font-medium">{title}</h4>
  </div>
);

export default Dashboard;
