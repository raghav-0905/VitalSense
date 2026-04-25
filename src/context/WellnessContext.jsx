import React, { createContext, useState, useEffect } from 'react';

export const WellnessContext = createContext();

export const WellnessProvider = ({ children }) => {
  // Load initial state from LocalStorage if available
  const loadState = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [userProfile, setUserProfile] = useState(() => loadState('vs_profile', {
    name: 'Guest User',
    company: 'VitalSense Demo',
  }));

  const [assessments, setAssessments] = useState(() => loadState('vs_assessments', []));
  const [streak, setStreak] = useState(() => loadState('vs_streak', { count: 0, lastDate: null }));
  
  // Dashboard mock metrics (calculated from assessments)
  const [currentMetrics, setCurrentMetrics] = useState({
    wellnessScore: 0,
    energyScore: 0,
    physicalScore: 0,
    mentalScore: 0,
    emotionalScore: 0,
    burnoutRisk: false,
    recommendations: []
  });

  const [isMeditationOpen, setIsMeditationOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Save to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem('vs_profile', JSON.stringify(userProfile));
    localStorage.setItem('vs_assessments', JSON.stringify(assessments));
    localStorage.setItem('vs_streak', JSON.stringify(streak));
  }, [userProfile, assessments, streak]);

  // Method to add new assessment
  const addAssessment = (data, results) => {
    const newAssessment = {
      id: Date.now(),
      date: new Date().toISOString(),
      inputs: data,
      scores: results.scores,
    };
    
    setAssessments(prev => [newAssessment, ...prev]);
    
    // Update streak logic
    const today = new Date().toDateString();
    if (streak.lastDate !== today) {
      // Check if it's consecutive
      const lastDateObj = new Date(streak.lastDate);
      const yesterdayDateObj = new Date();
      yesterdayDateObj.setDate(yesterdayDateObj.getDate() - 1);
      
      if (lastDateObj.toDateString() === yesterdayDateObj.toDateString()) {
        setStreak({ count: streak.count + 1, lastDate: today });
      } else {
        setStreak({ count: 1, lastDate: today });
      }
    }

    setCurrentMetrics({
      ...results.scores,
      burnoutRisk: results.burnoutRisk,
      recommendations: results.recommendations
    });
  };

  // On mount, if there are past assessments, set current metrics to the latest one
  useEffect(() => {
    if (assessments.length > 0) {
      const latest = assessments[0]; // descending order assumed
      setCurrentMetrics({
         ...latest.scores,
         burnoutRisk: latest.inputs?.stress >= 7 && latest.inputs?.sleep <= 5,
         recommendations: [] // we can regenerate them or just mock
      });
    } else {
        // Initial Demo data to make dashboard look good initially
        setCurrentMetrics({
            wellnessScore: 78,
            energyScore: 65,
            physicalScore: 82,
            mentalScore: 60,
            emotionalScore: 75,
            burnoutRisk: false,
            recommendations: ["Increase pure hydration by 2 glasses today.", "Consider a 10-minute mindfulness session before sleep."]
        });
        setStreak({ count: 3, lastDate: new Date().toDateString() });
    }
  }, []);

  return (
    <WellnessContext.Provider value={{
      userProfile, setUserProfile,
      assessments, addAssessment,
      streak,
      currentMetrics,
      isMeditationOpen, setIsMeditationOpen,
      isChatOpen, setIsChatOpen
    }}>
      {children}
    </WellnessContext.Provider>
  );
};
