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
          <h1 className="text-3xl font-bold mb-1 text-[var(--vs-text)] tracking-tight">Curated Planner</h1>
          <p className="text-[var(--vs-text-soft)] text-sm">Interactive, adaptive workout routines fetched from external sources.</p>
        </div>
        
        <div className="px-4 py-2 rounded-full flex items-center space-x-2 bg-[rgba(255,248,241,0.82)] border border-[color:var(--vs-border)] shadow-[0_12px_30px_rgba(77,59,90,0.06)]">
          <Calendar className="h-4 w-4 text-nature-700" />
          <span className="font-medium text-[var(--vs-text)] text-sm">Weekly View</span>
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
                ? 'bg-nature-700 text-[var(--vs-cream)] shadow-[0_18px_40px_rgba(77,59,90,0.14)]' 
                : 'vs-panel-strong text-[var(--vs-text-soft)] hover:border-[color:var(--vs-border-strong)] hover:bg-[rgba(255,248,241,0.95)]'
              }`}
            >
              <div className="flex flex-col">
                <span className="font-semibold">{day}</span>
                <span className={`text-xs mt-1 ${selectedDay === day ? 'text-[rgba(255,248,241,0.75)]' : 'text-[var(--vs-text-muted)]'}`}>
                  {DAY_FOCUS[day].name}
                </span>
              </div>
              <ChevronRight size={18} className={selectedDay === day ? 'text-[var(--vs-cream)]' : 'text-[var(--vs-text-muted)]'} />
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9">
          <div className="vs-panel-strong p-6 md:p-8 rounded-3xl min-h-[500px]">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[color:var(--vs-border)]">
              <div className="p-3 bg-nature-50 text-nature-700 rounded-xl border border-[color:var(--vs-border)]">
                {currentFocus.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--vs-text)]">{selectedDay}'s Routine</h2>
                <p className="text-[var(--vs-text-soft)] text-sm font-medium">{currentFocus.name}</p>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 text-[var(--vs-text-muted)]">
                <Loader2 className="animate-spin mb-4" size={32} />
                <p className="text-sm font-medium">Fetching curated exercises...</p>
              </div>
            ) : currentFocus.categories.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-[var(--vs-text-soft)] bg-[rgba(255,248,241,0.72)] rounded-2xl border border-[color:var(--vs-border)] border-dashed">
                <Heart size={48} className="text-[var(--vs-text-muted)] mb-4" />
                <h3 className="text-lg font-semibold text-[var(--vs-text)]">Rest & Recover</h3>
                <p className="text-sm text-[var(--vs-text-muted)] max-w-sm text-center mt-2">
                  Take this day to focus on stretching, hydration, and light movement to prime your body for the next cycle.
                </p>
              </div>
            ) : dayExercises.length === 0 ? (
              <div className="text-[var(--vs-text-muted)] text-center py-12">
                No exercises found for this category.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-[var(--vs-text-muted)] uppercase tracking-wider mb-4 px-2">Exercises</h3>
                  {dayExercises.map(ex => (
                    <button
                      key={ex.id}
                      onClick={() => setSelectedExercise(ex)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        selectedExercise?.id === ex.id
                        ? 'border-nature-400 bg-[rgba(221,209,229,0.35)] shadow-sm'
                        : 'border-[color:var(--vs-border)] bg-[rgba(255,248,241,0.72)] hover:border-[color:var(--vs-border-strong)] hover:bg-[rgba(255,248,241,0.96)]'
                      }`}
                    >
                      <h4 className="font-semibold text-[var(--vs-text)] line-clamp-1">{ex.name}</h4>
                      <p className="text-xs text-[var(--vs-text-soft)] mt-1">
                        Category: <span className="font-medium text-[var(--vs-text)]">{ex.category?.name || 'General'}</span>
                      </p>
                    </button>
                  ))}
                </div>

                <div className="bg-[rgba(255,248,241,0.72)] rounded-2xl p-6 border border-[color:var(--vs-border)]">
                  <AnimatePresence mode="wait">
                    {selectedExercise ? (
                      <motion.div
                        key={selectedExercise.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <h3 className="text-xl font-bold text-[var(--vs-text)] mb-2">{selectedExercise.name}</h3>
                        <div className="flex gap-2 mb-6 flex-wrap">
                          <span className="px-2.5 py-1 bg-[rgba(255,248,241,0.92)] text-[var(--vs-text-soft)] border border-[color:var(--vs-border)] rounded-md text-xs font-semibold">
                            {selectedExercise.category?.name}
                          </span>
                          {selectedExercise.equipment && selectedExercise.equipment.length > 0 && (
                            <span className="px-2.5 py-1 bg-[rgba(221,209,229,0.45)] text-[var(--vs-text)] rounded-md text-xs font-semibold">
                              Equipment Required
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-xs font-bold text-[var(--vs-text-muted)] uppercase tracking-wider mb-2">Instructions</h4>
                            {/* Render HTML description safely from wger API */}
                            <div 
                              className="text-[var(--vs-text-soft)] text-sm leading-relaxed prose prose-sm max-w-none [&_li]:text-[var(--vs-text-soft)] [&_p]:text-[var(--vs-text-soft)]"
                              dangerouslySetInnerHTML={{ __html: selectedExercise.description || 'No description available.' }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center h-full text-[var(--vs-text-muted)] py-12"
                      >
                        <Dumbbell size={40} className="text-[rgba(168,156,167,0.5)] mb-4" />
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
