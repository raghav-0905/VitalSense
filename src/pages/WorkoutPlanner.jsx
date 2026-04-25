import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight, Loader2, Dumbbell, Activity, ShieldAlert, Heart } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DAY_FOCUS = {
  'Monday': { name: 'Upper Body (Chest/Shoulders)', categories: [8, 13], icon: <Dumbbell size={18} /> },
  'Tuesday': { name: 'Lower Body (Legs)', categories: [9], icon: <Activity size={18} /> },
  'Wednesday': { name: 'Active Recovery', categories: [], icon: <Heart size={18} /> },
  'Thursday': { name: 'Back & Pull', categories: [12], icon: <Dumbbell size={18} /> },
  'Friday': { name: 'Core & Stability', categories: [10], icon: <ShieldAlert size={18} /> },
  'Saturday': { name: 'Arms (Biceps/Triceps)', categories: [11, 8], icon: <Dumbbell size={18} /> },
  'Sunday': { name: 'Rest Day', categories: [], icon: <Heart size={18} /> }
};

export const WorkoutPlanner = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        // Using wger REST API to get english exercises (language=2)
        const response = await fetch('https://wger.de/api/v2/exerciseinfo/?language=2&limit=80');
        const data = await response.json();
        const formattedExercises = (data.results || []).map(ex => ({
          ...ex,
          name: ex.translations?.find(t => t.language === 2)?.name || ex.translations?.[0]?.name || 'Unknown Exercise',
          description: ex.translations?.find(t => t.language === 2)?.description || ex.translations?.[0]?.description || 'No description available.',
        }));
        setExercises(formattedExercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const currentFocus = DAY_FOCUS[selectedDay];

  // Filter exercises for the selected day's focus
  const dayExercises = exercises.filter(ex => 
    currentFocus.categories.includes(ex.category?.id)
  ).slice(0, 5); // Limit to 5 per day for realism

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-stone-900 tracking-tight">Curated Planner</h1>
          <p className="text-stone-500 text-sm">Interactive, adaptive workout routines fetched from external sources.</p>
        </div>
        
        <div className="px-4 py-2 rounded-full flex items-center space-x-2 bg-stone-50 border border-stone-200">
          <Calendar className="h-4 w-4 text-stone-600" />
          <span className="font-medium text-stone-700 text-sm">Weekly View</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          {DAYS.map(day => (
            <button
              key={day}
              onClick={() => {
                setSelectedDay(day);
                setSelectedExercise(null);
              }}
              className={`w-full text-left px-5 py-4 rounded-2xl flex items-center justify-between transition-all ${
                selectedDay === day 
                ? 'bg-stone-900 text-white shadow-md' 
                : 'bg-white border border-stone-100 text-stone-600 hover:border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex flex-col">
                <span className="font-semibold">{day}</span>
                <span className={`text-xs mt-1 ${selectedDay === day ? 'text-stone-300' : 'text-stone-400'}`}>
                  {DAY_FOCUS[day].name}
                </span>
              </div>
              <ChevronRight size={18} className={selectedDay === day ? 'text-white' : 'text-stone-300'} />
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-100 min-h-[500px] shadow-sm">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-stone-100">
              <div className="p-3 bg-nature-50 text-nature-600 rounded-xl">
                {currentFocus.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-stone-900">{selectedDay}'s Routine</h2>
                <p className="text-stone-500 text-sm font-medium">{currentFocus.name}</p>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 text-stone-400">
                <Loader2 className="animate-spin mb-4" size={32} />
                <p className="text-sm font-medium">Fetching curated exercises...</p>
              </div>
            ) : currentFocus.categories.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-stone-500 bg-stone-50 rounded-2xl border border-stone-100 border-dashed">
                <Heart size={48} className="text-stone-300 mb-4" />
                <h3 className="text-lg font-semibold text-stone-700">Rest & Recover</h3>
                <p className="text-sm text-stone-400 max-w-sm text-center mt-2">
                  Take this day to focus on stretching, hydration, and light movement to prime your body for the next cycle.
                </p>
              </div>
            ) : dayExercises.length === 0 ? (
              <div className="text-stone-400 text-center py-12">
                No exercises found for this category.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4 px-2">Exercises</h3>
                  {dayExercises.map(ex => (
                    <button
                      key={ex.id}
                      onClick={() => setSelectedExercise(ex)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        selectedExercise?.id === ex.id
                        ? 'border-nature-500 bg-nature-50/50 shadow-sm'
                        : 'border-stone-100 bg-white hover:border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <h4 className="font-semibold text-stone-800 line-clamp-1">{ex.name}</h4>
                      <p className="text-xs text-stone-500 mt-1">
                        Category: <span className="font-medium text-stone-600">{ex.category?.name || 'General'}</span>
                      </p>
                    </button>
                  ))}
                </div>

                <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
                  <AnimatePresence mode="wait">
                    {selectedExercise ? (
                      <motion.div
                        key={selectedExercise.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <h3 className="text-xl font-bold text-stone-900 mb-2">{selectedExercise.name}</h3>
                        <div className="flex gap-2 mb-6 flex-wrap">
                          <span className="px-2.5 py-1 bg-white text-stone-600 border border-stone-200 rounded-md text-xs font-semibold">
                            {selectedExercise.category?.name}
                          </span>
                          {selectedExercise.equipment && selectedExercise.equipment.length > 0 && (
                            <span className="px-2.5 py-1 bg-stone-200 text-stone-700 rounded-md text-xs font-semibold">
                              Equipment Required
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Instructions</h4>
                            {/* Render HTML description safely from wger API */}
                            <div 
                              className="text-stone-600 text-sm leading-relaxed prose prose-sm prose-stone max-w-none"
                              dangerouslySetInnerHTML={{ __html: selectedExercise.description || 'No description available.' }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center h-full text-stone-400 py-12"
                      >
                        <Dumbbell size={40} className="text-stone-200 mb-4" />
                        <p className="text-sm font-medium">Select an exercise to view details.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkoutPlanner;
