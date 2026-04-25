import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import WorkoutPlanner from './pages/WorkoutPlanner';
import { AboutAndServices, Booking, Profile } from './pages/StaticPages';

// Components
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import { FloatingTools } from './components/widgets/FloatingTools';

import { WellnessProvider } from './context/WellnessContext';

function App() {
  return (
    <WellnessProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[var(--vs-bg)] text-[var(--vs-text)] font-sans relative">
          <Navbar />
          <main className="flex-grow pt-24 z-10"> {/* Ensure content clears the navbar */}
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutAndServices />} />
                <Route path="/assessment" element={<Assessment />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/planner" element={<WorkoutPlanner />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <FloatingTools />
        </div>
      </Router>
    </WellnessProvider>
  );
}

export default App;
