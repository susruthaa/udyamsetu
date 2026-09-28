import React from 'react';
import { Building2, ShieldCheck, Calculator, MapPin, ArrowRight, CheckCircle2, Info } from 'lucide-react';

interface HowItWorksPageProps {
  navigate: (route: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-white via-blue-50/50 to-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 border border-blue-200 text-xs font-bold shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-blue-700 shrink-0" />
            <span>Guided User Journey</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
            How UDYAMSETU AI works
          </h1>

          <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            From describing your business needs to understanding your options and finding where to apply — UDYAMSETU AI guides you through the journey.
          </p>
        </div>
      </section>

      {/* STAGE 1 */}
      <section className="bg-slate-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest block">STAGE 1</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              1. Tell us about your business
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Start by sharing basic information about your business, your requirements and what you need financing for.
            </p>

            {/* Examples of information */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Examples of information:</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-semibold">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">✓ Business type</div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">✓ Location</div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">✓ Business purpose</div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200">✓ Financing requirement</div>
                <div className="col-span-2 bg-white p-2.5 rounded-xl border border-slate-200">✓ Relevant profile details</div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate('/onboarding')}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md flex items-center gap-2 transition"
              >
                <span>Tell us what you need</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">Simple Business Profile</h4>
            <p className="text-xs text-slate-500">Provide personal & business parameters in a clean, guided form.</p>
          </div>
        </div>
      </section>

      {/* STAGE 2 */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest block">STAGE 2</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              2. Understand your options
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              You can describe your requirement in your own words. UDYAMSETU AI helps understand the information you provide and identifies financing options that may fit.
            </p>

            <div className="pt-4">
              <button
                onClick={() => navigate('/profile')}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md flex items-center gap-2 transition"
              >
                <span>Check My Options</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conversational Example Box */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-md space-y-3">
            <div className="bg-blue-700 text-white p-3.5 rounded-2xl rounded-tr-none text-xs leading-relaxed max-w-[90%] ml-auto">
              <p className="font-bold text-[10px] text-blue-200 mb-1">User</p>
              "I want to start a food processing business and need around ₹5 lakh."
            </div>

            <div className="bg-white text-slate-800 p-3.5 rounded-2xl rounded-tl-none text-xs leading-relaxed max-w-[90%] mr-auto border border-slate-200">
              <p className="font-bold text-[10px] text-blue-700 mb-1">UDYAMSETU</p>
              "We understand that you need approximately ₹5 lakh to start a food processing business."
            </div>
          </div>
        </div>
      </section>

      {/* STAGE 3 */}
      <section className="bg-slate-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest block">STAGE 3</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              3. Understand eligibility and repayment
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Available scheme conditions are checked against the information provided. Suitable options are explained, and the calculator helps you understand the estimated financing and repayment.
            </p>
          </div>

          {/* 2 Small Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">ELIGIBILITY</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                See which requirements are satisfied and why an option may fit.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">REPAYMENT</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Estimate loan amount, contribution, interest and monthly repayment.
              </p>
            </div>
          </div>

          {/* Important note */}
          <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100 text-xs text-slate-700 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <span>
              <strong>Note:</strong> Repayment figures are estimates and may differ from final approved terms.
            </span>
          </div>
        </div>
      </section>

      {/* STAGE 4 */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest block">STAGE 4</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              4. Know where to apply
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Once you identify an option, UDYAMSETU AI helps you understand the required documents and find a suitable application route or Channel Partner.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-semibold pt-2">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Required documents</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Partner information</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Application steps</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Official next step</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate('/partners')}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md flex items-center gap-2 transition"
              >
                <span>Find Where to Apply</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">Local Channel Partners</h4>
            <p className="text-xs text-slate-500">Find nearby lead bank branches and state agencies with distance and contact info.</p>
          </div>
        </div>
      </section>

      {/* FINAL HIGH-LEVEL JOURNEY VISUAL */}
      <section className="bg-slate-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Your Complete Financing Journey</h3>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 max-w-4xl mx-auto text-xs font-bold text-slate-900">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">Tell us about your business</div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">Understand your options</div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">Check eligibility</div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">Understand repayment</div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">Find where to apply</div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Ready to take the next step?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            Start with your business needs and let UDYAMSETU AI guide you through the available financing options.
          </p>

          <div className="pt-2">
            <button
              onClick={() => navigate('/onboarding')}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg shadow-blue-700/20 flex items-center justify-center gap-2 transition mx-auto"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
