import React from 'react';
import { ShieldCheck, Calculator, MapPin, ArrowRight, CheckCircle2, Building2, ChevronRight } from 'lucide-react';

interface LandingPageProps {
  navigate: (route: string) => void;
  loadDemoProfile?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      {/* SECTION 3: HERO SECTION */}
      <section className="relative bg-gradient-to-b from-white via-blue-50/50 to-white py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-blue-100/80 text-blue-800 border border-blue-200 text-xs font-bold shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              <span>Public Service Business Financing Platform</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
              Your guided journey to the{' '}
              <span className="text-blue-700 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-600">
                right financing option
              </span>{' '}
              for your business.
            </h1>

            <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal max-w-2xl">
              Tell us about your business, understand which financing options may fit, estimate your repayment, and find where to apply — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => navigate('/onboarding')}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-lg shadow-blue-700/25 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <a
                href="#how-it-helps"
                className="text-slate-700 hover:text-blue-700 font-semibold text-sm sm:text-base px-5 sm:px-6 py-3.5 sm:py-4 rounded-full flex items-center justify-center gap-1.5 transition hover:bg-blue-50 border border-slate-200 sm:border-transparent text-center"
              >
                <span>Learn How It Works</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Hero Right Visual Graphic Illustration */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xl">
              <svg className="w-full h-auto max-h-[220px] sm:max-h-none" viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="200" cy="160" r="130" fill="#EFF6FF" />
                <circle cx="200" cy="160" r="95" fill="#DBEAFE" fillOpacity="0.5" />

                <rect x="90" y="140" width="220" height="130" rx="12" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="4" />
                <path d="M70 140 L200 60 L330 140 Z" fill="#1D4ED8" />

                <rect x="175" y="200" width="50" height="70" rx="4" fill="#3B82F6" />
                <rect x="115" y="170" width="40" height="40" rx="6" fill="#93C5FD" />
                <rect x="245" y="170" width="40" height="40" rx="6" fill="#93C5FD" />

                <g transform="translate(40, 100)">
                  <rect width="90" height="70" rx="10" fill="#FFFFFF" stroke="#059669" strokeWidth="3" />
                  <path d="M20 25 H70 M20 40 H55" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="70" cy="50" r="10" fill="#10B981" />
                  <path d="M66 50 L69 53 L74 47" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                </g>

                <g transform="translate(270, 70)">
                  <rect width="90" height="70" rx="10" fill="#FFFFFF" stroke="#D97706" strokeWidth="3" />
                  <text x="18" y="35" fill="#D97706" fontSize="16" fontWeight="bold">₹ 5L</text>
                  <text x="18" y="52" fill="#6B7280" fontSize="10">Financing</text>
                </g>
              </svg>

              <div className="mt-3 sm:mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700 shrink-0" />
                <div>
                  <strong className="text-slate-900 font-semibold block text-xs">Public Service Guidance</strong>
                  Helping business owners find verified financing routes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: INTRODUCTION SECTION */}
      <section className="bg-blue-50/60 border-y border-blue-100 py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Business financing, made simpler.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
            Finding the right financing option can involve understanding eligibility, comparing schemes, estimating repayment and knowing where to apply. UDYAMSETU AI brings these steps together in one guided experience.
          </p>
        </div>
      </section>

      {/* SECTION 6: THREE CORE SERVICE CARDS */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Everything you need to take the next step.
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Explore schemes, estimate your repayment, and locate application channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <div className="card-gov card-gov-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl mb-5">
                  <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  Find the Right Scheme
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Tell us about your business and financing needs. We'll help identify options that may fit your requirements.
                </p>
              </div>
              <button
                onClick={() => navigate('/recommendations')}
                className="text-blue-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 hover:text-blue-800 transition pt-2"
              >
                <span>Explore Schemes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 2 */}
            <div className="card-gov card-gov-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl mb-5">
                  <Calculator className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  Understand Your Repayment
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Estimate your loan amount, own contribution, interest and monthly repayment before you apply.
                </p>
              </div>
              <button
                onClick={() => navigate('/calculator')}
                className="text-emerald-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 hover:text-emerald-800 transition pt-2"
              >
                <span>Calculate Repayment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 3 */}
            <div className="card-gov card-gov-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl mb-5">
                  <MapPin className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  Find Where to Apply
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Find suitable partners, understand the required documents and see the next steps.
                </p>
              </div>
              <button
                onClick={() => navigate('/partners')}
                className="text-amber-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 hover:text-amber-800 transition pt-2"
              >
                <span>Find a Partner</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: SIMPLE "HOW IT HELPS" SECTION */}
      <section id="how-it-helps" className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 sm:mb-12">
            From your first question to your next step.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: 'Tell us about your business', icon: Building2 },
              { label: 'Check your options', icon: ShieldCheck },
              { label: 'Understand your repayment', icon: Calculator },
              { label: 'Find where to apply', icon: MapPin },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-blue-50/60 border border-blue-100 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                  <div className="w-11 h-11 rounded-xl bg-blue-700 text-white flex items-center justify-center mb-3 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">{item.label}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 8: AI SECTION */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
              Conversational Assistance
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Just tell us what you need.
            </h2>
            <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
              You don't need to know which scheme to choose. Describe your business and financing needs in your own words, and UDYAMSETU AI helps you understand your options.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/profile')}
                className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 transition"
              >
                <span>Ask UDYAMSETU</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Conversational Preview Card */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl space-y-4">
            <div className="bg-blue-700 text-white p-3.5 sm:p-4 rounded-2xl rounded-tr-none text-xs leading-relaxed max-w-[90%] ml-auto shadow-xs">
              <p className="font-bold text-[10px] text-blue-200 mb-1">Business Owner</p>
              "I want to start a small food processing business and need around ₹5 lakh."
            </div>

            <div className="bg-slate-100 text-slate-800 p-3.5 sm:p-4 rounded-2xl rounded-tl-none text-xs leading-relaxed max-w-[90%] mr-auto border border-slate-200">
              <p className="font-bold text-[10px] text-blue-700 mb-1">UDYAMSETU AI</p>
              "Got it. You're looking to start a food processing business and need approximately ₹5 lakh."
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
              <span className="bg-blue-50 text-blue-800 px-2.5 py-1 rounded-lg border border-blue-200 font-semibold">
                Business: Food Processing
              </span>
              <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold">
                Purpose: Start a Business
              </span>
              <span className="bg-amber-50 text-amber-800 px-2.5 py-1 rounded-lg border border-amber-200 font-semibold">
                Amount: ₹5,00,000
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: TRUST SECTION */}
      <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Built to make financing easier to understand.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-4 font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2">EXPLAINABLE OPTIONS</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Understand why a financing option may fit your business based on clear criteria checks.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 font-bold">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2">CLEAR REPAYMENT ESTIMATES</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                See estimated contribution, interest rates, and monthly repayments before applying.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4 font-bold">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2">APPLICATION GUIDANCE</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Know what documents you need and where to continue your application with authorized partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: IMPORTANT DISCLAIMER */}
      <section className="bg-slate-100 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center text-xs text-slate-600">
          <p className="leading-relaxed">
            Recommendations and repayment figures are estimates based on available scheme information. Final eligibility, terms and approval are determined by the concerned authority or Channel Partner.
          </p>
        </div>
      </section>
    </div>
  );
};
