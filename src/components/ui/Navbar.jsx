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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-3 border-b border-stone-100 shadow-sm' : 'bg-white/60 backdrop-blur-sm py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-nature-600 group-hover:bg-nature-700 transition-colors p-1.5 rounded-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-stone-800">VitalSense</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-nature-600 ${location.pathname === link.path ? 'text-nature-600' : 'text-stone-500'}`}
              >
                {link.name}
              </Link>
            ))}
            
            <Link to="/booking" className="px-4 py-2 rounded-full bg-nature-50 text-nature-700 hover:bg-nature-100 transition-all text-sm font-medium">
              Book Session
            </Link>
            
            <Link to="/profile" className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors">
              <User className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-stone-500 hover:text-stone-800">
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
            className="md:hidden bg-white border-t border-stone-100"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-stone-600 hover:text-nature-600 px-2 py-1 rounded-md hover:bg-nature-50"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/booking" onClick={() => setMobileMenuOpen(false)} className="text-nature-600 font-medium pt-4 border-t border-stone-100 mt-2">Book a Session</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
