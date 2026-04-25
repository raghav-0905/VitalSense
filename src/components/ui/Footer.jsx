import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight } from 'lucide-react';

const primaryLinks = [
  { label: 'Assessment', to: '/assessment' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Planner', to: '/planner' },
];

const secondaryLinks = [
  { label: 'About & Services', to: '/about' },
  { label: 'Book Session', to: '/booking' },
  { label: 'Profile', to: '/profile' },
];

const Footer = () => {
  return (
    <footer className="bg-[#2c2435] text-stone-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-white/8 py-24 text-center md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#cdbad9]">
            Start With VitalSense
          </p>
          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl md:leading-[1.02]">
            Stop guessing. Start understanding.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#c5b7c9] md:text-lg md:leading-8">
            Understand how sleep, stress, and energy patterns affect your wellbeing and get simple guidance that fits your routine.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/assessment"
              style={{ color: '#000000' }}
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-100 shadow-lg shadow-black/15"
            >
              Start assessment
            </Link>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#d8cedd] transition-colors hover:text-white"
            >
              Book session
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-12 border-b border-white/8 py-14 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div className="max-w-md">
            <Link to="/" className="inline-flex items-center gap-2 text-white">
              <span className="rounded-lg bg-white/10 p-2">
                <Activity className="h-5 w-5" />
              </span>
              <span className="text-lg font-semibold tracking-tight">VitalSense</span>
            </Link>

            <p className="mt-5 text-sm leading-7 text-[#c5b7c9]">
              A calm wellness platform for tracking patterns, spotting stress signals, and building better daily habits with more clarity.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9f93a8]">
              Explore
            </h3>
            <div className="mt-5 space-y-3">
              {primaryLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="block text-sm text-[#ddd3e2] transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9f93a8]">
              Company
            </h3>
            <div className="mt-5 space-y-3">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="block text-sm text-[#ddd3e2] transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="py-8 text-sm text-[#9f93a8] md:flex md:items-start md:justify-between md:gap-8">
          <p className="mb-3 md:mb-0">
            © {new Date().getFullYear()} VitalSense
          </p>
          <p className="max-w-3xl leading-7">
            VitalSense offers general wellness guidance for lifestyle awareness and habit support. It is not a diagnostic, treatment, or emergency medical service.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
