import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About & Services', path: '/about' },
    { name: 'Assessment', path: '/assessment' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Planner', path: '/planner' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 border-b shadow-[0_18px_50px_rgba(77,59,90,0.08)] bg-[rgba(250,244,236,0.82)] border-[color:var(--vs-border)] backdrop-blur-xl' : 'py-4 bg-[rgba(250,244,236,0.55)] backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-nature-700 group-hover:bg-nature-800 transition-colors p-1.5 rounded-lg shadow-[0_10px_24px_rgba(74,53,87,0.18)]">
              <Activity className="h-5 w-5 text-[var(--vs-cream)]" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-[var(--vs-text)]">VitalSense</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-nature-700 ${location.pathname === link.path ? 'text-nature-700' : 'text-[var(--vs-text-soft)]'}`}
              >
                {link.name}
              </Link>
            ))}
            
            <Link to="/booking" className="px-4 py-2 rounded-full bg-[rgba(255,248,241,0.8)] text-nature-700 hover:bg-[rgba(255,248,241,0.95)] border border-[color:var(--vs-border)] shadow-[0_12px_30px_rgba(77,59,90,0.07)] transition-all text-sm font-medium">
              Book Session
            </Link>
            
            <Link to="/profile" className="p-2 rounded-full hover:bg-[rgba(255,248,241,0.75)] text-[var(--vs-text-soft)] transition-colors">
              <User className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[var(--vs-text-soft)] hover:text-[var(--vs-text)]">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[rgba(250,244,236,0.96)] border-t border-[color:var(--vs-border)] backdrop-blur-xl"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[var(--vs-text-soft)] hover:text-nature-700 px-2 py-1 rounded-md hover:bg-[rgba(255,248,241,0.75)]"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/booking" onClick={() => setMobileMenuOpen(false)} className="text-nature-700 font-medium pt-4 border-t border-[color:var(--vs-border)] mt-2">Book a Session</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
