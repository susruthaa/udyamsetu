import React, { useState } from 'react';
import { useJourney, LanguageOption } from '../context/JourneyContext';
import { Compass, ArrowRight, Globe, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  navigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, navigate }) => {
  const { language, setLanguage } = useJourney();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { key: 'home', label: 'Home', route: '/' },
    { key: 'about', label: 'About', route: '/about' },
    { key: 'how-it-works', label: 'How It Works', route: '/how-it-works' },
    { key: 'schemes', label: 'Schemes', route: '/recommendations' },
    { key: 'services', label: 'Services', route: '/calculator' },
    { key: 'dashboard', label: 'Dashboard', route: '/dashboard' },
  ];

  const handleNavClick = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md text-slate-800 border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Branding & Tagline */}
        <div
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-700/20 group-hover:scale-105 transition-transform shrink-0">
            <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                UDYAMSETU
              </span>
              <span className="text-[10px] sm:text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded font-bold border border-blue-200">
                AI
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-wide">
              Business Financing Guidance
            </p>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.key}
                onClick={() => handleNavClick(link.route)}
                className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 font-bold'
                    : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Desktop Actions */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <Globe className="w-3.5 h-3.5 text-blue-700" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageOption)}
              className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer text-xs"
            >
              <option value="English">English ▼</option>
              <option value="తెలుగు">తెలుగు (Telugu)</option>
              <option value="हिन्दी">हिन्दी (Hindi)</option>
            </select>
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick('/onboarding')}
            className="bg-blue-700 hover:bg-blue-800 text-white text-xs lg:text-sm font-bold px-4 lg:px-5 py-2.5 rounded-full shadow-md shadow-blue-700/20 flex items-center gap-1.5 transition transform hover:-translate-y-0.5"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="p-2 rounded-xl text-slate-700 hover:text-blue-700 hover:bg-blue-50 transition border border-slate-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-fade-in shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNavClick(link.route)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  currentRoute === link.route
                    ? 'bg-blue-50 text-blue-700 border border-blue-100'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between bg-slate-100 p-3 rounded-xl text-xs text-slate-700 border border-slate-200">
              <span className="font-semibold flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-700" />
                Select Language:
              </span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageOption)}
                className="bg-white text-slate-800 font-bold px-2 py-1 rounded border border-slate-300 text-xs focus:outline-none"
              >
                <option value="English">English</option>
                <option value="తెలుగు">తెలుగు</option>
                <option value="हिन्दी">हिन्दी</option>
              </select>
            </div>

            <button
              onClick={() => handleNavClick('/onboarding')}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 text-sm transition"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
