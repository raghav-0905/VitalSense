import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import { About, Services, Booking, Profile } from './pages/StaticPages';

// Components
import Navbar from './components/ui/Navbar';
import { FloatingTools } from './components/widgets/FloatingTools';

import { WellnessProvider } from './context/WellnessContext';

function App() {
  return (
    <WellnessProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-stone-800 font-sans selection:bg-nature-500 selection:text-white relative">
          <Navbar />
          <main className="flex-grow pt-24 z-10"> {/* Ensure content clears the navbar */}
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/assessment" element={<Assessment />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </AnimatePresence>
          </main>
          <FloatingTools />
        </div>
      </Router>
    </WellnessProvider>
  );
}

export default App;
