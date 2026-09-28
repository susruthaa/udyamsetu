import React from 'react';
import { ShieldCheck, Calculator, MapPin, ArrowRight, Building2, CheckCircle2, ChevronRight, Info, Layers } from 'lucide-react';

interface AboutPageProps {
  navigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      {/* SECTION 1 — HERO */}
      <section className="relative bg-gradient-to-b from-white via-blue-50/50 to-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 border border-blue-200 text-xs font-bold shadow-2xs">
              <Building2 className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              <span>About UDYAMSETU AI</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
              Making business financing{' '}
              <span className="text-blue-700 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-600">
                easier to understand.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal max-w-2xl">
              UDYAMSETU AI brings scheme discovery, eligibility guidance, repayment estimates and application guidance together in one guided experience.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => navigate('/onboarding')}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-lg shadow-blue-700/25 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={() => navigate('/how-it-works')}
                className="text-slate-700 hover:text-blue-700 font-semibold text-sm sm:text-base px-5 sm:px-6 py-3.5 sm:py-4 rounded-full flex items-center justify-center gap-1.5 transition hover:bg-blue-50 border border-slate-200 sm:border-transparent text-center"
              >
                <span>See How It Works</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero Right Visual Vector Graphic Illustration */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xl">
              <svg className="w-full h-auto max-h-[220px] sm:max-h-none" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="200" cy="150" r="120" fill="#EFF6FF" />
                <circle cx="200" cy="150" r="85" fill="#DBEAFE" fillOpacity="0.5" />

                <rect x="100" y="80" width="200" height="150" rx="16" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="4" />
                <path d="M120 120 H280 M120 150 H240 M120 180 H200" stroke="#93C5FD" strokeWidth="6" strokeLinecap="round" />

                <g transform="translate(230, 160)">
                  <circle r="30" fill="#1D4ED8" />
                  <path d="M-10 0 L-2 8 L12 -6" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                <g transform="translate(60, 190)">
                  <rect width="90" height="60" rx="10" fill="#FFFFFF" stroke="#059669" strokeWidth="3" />
                  <text x="15" y="35" fill="#059669" fontSize="14" fontWeight="bold">Verified</text>
                </g>
              </svg>

              <div className="mt-3 sm:mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700 shrink-0" />
                <div>
                  <strong className="text-slate-900 font-semibold block text-xs">Public Service Platform</strong>
                  Integrated financing discovery and guidance.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHAT IS UDYAMSETU AI? */}
      <section className="bg-slate-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            What is UDYAMSETU AI?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
            UDYAMSETU AI is a guided financing platform designed to help business owners understand their financing options and take the next step with greater clarity.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
            Instead of having to figure out which scheme may fit, what the repayment could look like, and where to apply separately, UDYAMSETU AI brings these parts together into one guided journey.
          </p>

          {/* Simple Visual Flow */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: 'Business Need', icon: Building2 },
              { label: 'Financing Options', icon: ShieldCheck },
              { label: 'Repayment Understanding', icon: Calculator },
              { label: 'Application Guidance', icon: MapPin },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-900 text-xs">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3 — THE PROBLEM */}
      <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why is financing difficult to navigate?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 font-bold">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2">Finding the right option</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  There are multiple financing schemes and options, making it difficult to know where to start.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 font-bold">
                  2
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2">Understanding eligibility</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Eligibility conditions can depend on several details about the applicant and the business.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 font-bold">
                  3
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2">Understanding repayment</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Loan amount, contribution, interest and repayment terms can be difficult to understand before applying.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 font-bold">
                  4
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2">Knowing where to apply</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  After identifying an option, applicants may still need clarity about documents, partners and next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHAT UDYAMSETU AI BRINGS TOGETHER */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              One guided journey.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest block mb-3">01</span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  SMART SCHEME RECOMMENDER
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Understand your business needs and identify financing options that may fit your profile.
                </p>
              </div>
              <button
                onClick={() => navigate('/recommendations')}
                className="text-blue-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 hover:text-blue-800 transition pt-6"
              >
                <span>Explore Schemes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest block mb-3">02</span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  FINANCIAL CALCULATOR
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Estimate loan amount, own contribution, interest and repayment before applying.
                </p>
              </div>
              <button
                onClick={() => navigate('/calculator')}
                className="text-emerald-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 hover:text-emerald-800 transition pt-6"
              >
                <span>Calculate Repayment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold text-amber-700 uppercase tracking-widest block mb-3">03</span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                  CHANNEL PARTNER LOCATOR
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Find suitable application partners, understand required documents and see the next steps.
                </p>
              </div>
              <button
                onClick={() => navigate('/partners')}
                className="text-amber-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 hover:text-amber-800 transition pt-6"
              >
                <span>Find a Partner</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — OUR APPROACH */}
      <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
            <Layers className="w-3.5 h-3.5 text-blue-700" />
            <span>Our Approach</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            AI understands. Rules verify.
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            <p>
              UDYAMSETU AI uses AI to understand information provided by the business owner and convert it into structured details.
            </p>
            <p>
              Eligibility is then checked using defined scheme conditions. The system can explain why an option may fit based on the information provided.
            </p>
          </div>

          {/* Simple Visual */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-5 gap-3 max-w-3xl mx-auto text-xs font-bold text-slate-900">
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">Your information</div>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">AI understands needs</div>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">Scheme conditions checked</div>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">Suitable options shown</div>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">Repayment + guidance</div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — IMPORTANT NOTE */}
      <section className="bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 text-xs text-slate-700 flex items-start gap-3 shadow-xs">
            <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Public Service Note:</strong> UDYAMSETU AI provides guidance and estimates based on available scheme information. Final eligibility, terms and approval are determined by the concerned authority or Channel Partner.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT PAGE END CTA */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Ready to explore your options?
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/onboarding')}
              className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg shadow-blue-700/20 flex items-center justify-center gap-2 transition"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/how-it-works')}
              className="w-full sm:w-auto text-slate-700 hover:text-blue-700 font-semibold text-sm px-6 py-4 rounded-full flex items-center justify-center gap-1.5 transition hover:bg-blue-50 border border-slate-200"
            >
              <span>See How It Works</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
