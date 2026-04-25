import React, { useContext } from 'react';
import { WellnessContext } from '../context/WellnessContext';
import { motion } from 'framer-motion';
import { Activity, Flame, Heart, Zap, AlertTriangle, Droplets } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const scoreConfig = [
  { title: 'Energy', key: 'energyScore', iconColor: 'text-[#c9a56b]', fillColor: '#c9a56b' },
  { title: 'Physical', key: 'physicalScore', iconColor: 'text-[#8ba0c3]', fillColor: '#8ba0c3' },
  { title: 'Mental', key: 'mentalScore', iconColor: 'text-nature-500', fillColor: '#81668f' },
  { title: 'Emotional', key: 'emotionalScore', iconColor: 'text-[#ab97bf]', fillColor: '#ab97bf' },
];

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
          <h1 className="text-3xl font-bold mb-1 text-[var(--vs-text)] tracking-tight">Welcome back, {userProfile.name}</h1>
          <p className="text-[var(--vs-text-muted)] text-sm">Here's how you've been doing.</p>
        </div>
        
        <div className="px-4 py-2 rounded-full flex items-center space-x-2 bg-[rgba(255,248,241,0.82)] border border-[color:var(--vs-border)] shadow-[0_12px_30px_rgba(77,59,90,0.06)]">
          <Flame className="h-4 w-4 text-[#c9a56b]" />
          <span className="font-medium text-[var(--vs-text)] text-sm">{streak.count} day streak</span>
        </div>
      </div>

      {currentMetrics.burnoutRisk && (
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8 border border-[rgba(166,110,108,0.2)] bg-[rgba(186,128,124,0.08)] p-5 rounded-2xl flex items-start space-x-4"
        >
          <AlertTriangle className="h-5 w-5 text-[#b5726d] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-[#925452] font-semibold">High Burnout Risk</h3>
            <p className="text-[#925452]/85 text-sm mt-1">
              Your recent assessment shows high stress combined with low sleep. 
              Prioritize rest and consider scheduling a wellness consultation.
            </p>
          </div>
        </motion.div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {/* Main Score Card */}
        <div className="vs-panel-strong p-8 rounded-2xl lg:col-span-1 flex flex-col items-center justify-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-nature-400" />
           <h3 className="text-[var(--vs-text-muted)] font-medium mb-6 w-full text-center text-xs">Wellness Score</h3>
           
           <div className="relative flex items-center justify-center w-44 h-44 rounded-full border-8 border-[rgba(255,248,241,0.78)] bg-[rgba(255,248,241,0.8)]">
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
              <div className="text-center bg-[rgba(255,248,241,0.92)] w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-sm border border-[rgba(255,255,255,0.8)]">
                <span className="text-4xl font-bold text-[var(--vs-text)] tracking-tight">{currentMetrics.wellnessScore}</span>
                <span className="text-xs text-[var(--vs-text-muted)] mt-0.5">out of 100</span>
              </div>
           </div>
        </div>

        {/* Sub Scores */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-5">
          {scoreConfig.map((item) => (
            <ScoreCard
              key={item.key}
              title={item.title}
              score={currentMetrics[item.key]}
              icon={
                item.key === 'energyScore' ? <Zap className={`${item.iconColor} h-5 w-5`} /> :
                item.key === 'physicalScore' ? <Activity className={`${item.iconColor} h-5 w-5`} /> :
                item.key === 'mentalScore' ? <Heart className={`${item.iconColor} h-5 w-5`} /> :
                <Droplets className={`${item.iconColor} h-5 w-5`} />
              }
              fillColor={item.fillColor}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="vs-panel-strong p-8 rounded-2xl">
          <h3 className="text-lg font-semibold mb-6 text-[var(--vs-text)]">Trend</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeChartData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#81668f" stopOpacity={0.26}/>
                    <stop offset="95%" stopColor="#81668f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#d6cbd1" tick={{fill: '#a393a9', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#d6cbd1" tick={{fill: '#a393a9', fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#fff8f1', border: '1px solid rgba(82,61,98,0.12)', borderRadius: '14px', boxShadow: '0 12px 30px rgba(77,59,90,0.10)', fontSize: 13, color: '#4a3557' }} />
                <Area type="monotone" dataKey="score" stroke="#81668f" strokeWidth={2.5} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommendations */}
        <div className="vs-panel-strong p-8 rounded-2xl h-full">
          <h3 className="text-lg font-semibold mb-5 text-[var(--vs-text)]">Recommendations</h3>
          <div className="space-y-3">
            {currentMetrics.recommendations.map((rec, i) => (
              <div key={i} className="p-4 bg-[rgba(255,248,241,0.72)] border border-[color:var(--vs-border)] rounded-xl text-[var(--vs-text-soft)] text-sm leading-relaxed">
                <p>{rec}</p>
              </div>
            ))}
            {currentMetrics.recommendations.length === 0 && (
              <p className="text-[var(--vs-text-muted)] text-sm">Take an assessment to get personalized recommendations.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ScoreCard = ({ title, score, icon, fillColor }) => (
  <div className="vs-panel-strong p-5 rounded-2xl flex flex-col justify-between">
    <div className="flex justify-between items-start mb-5">
      <div className="p-2.5 rounded-xl bg-[rgba(255,248,241,0.82)] border border-[color:var(--vs-border)]">{icon}</div>
      <span className="text-3xl font-bold text-[var(--vs-text)] tracking-tight">{score}</span>
    </div>
    <div className="w-full bg-[rgba(221,209,229,0.45)] h-1.5 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: fillColor }} />
    </div>
    <h4 className="text-[var(--vs-text-muted)] text-xs mt-3 font-medium">{title}</h4>
  </div>
);

export default Dashboard;
