import React from 'react';
import { useJourney } from '../context/JourneyContext';
import { evaluateSchemeRules } from '../utils/ruleEngine';
import { CheckCircle2, Calculator, MapPin, ShieldCheck, FileText, ChevronRight, HelpCircle, ArrowRight, ExternalLink, Globe } from 'lucide-react';

interface SchemeDetailPageProps {
  navigate: (route: string) => void;
}

export const SchemeDetailPage: React.FC<SchemeDetailPageProps> = ({ navigate }) => {
  const { selectedScheme, profile } = useJourney();
  const evaluation = evaluateSchemeRules(profile, selectedScheme);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Header Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
              {selectedScheme.categoryTag}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Suitable Based on Provided Profile
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{selectedScheme.name}</h1>
          <p className="text-xs text-slate-500 mb-6">
            {selectedScheme.organization} • {selectedScheme.ministry || 'Government of India'}
          </p>

          {/* Official Source Banner */}
          <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-blue-700 shrink-0" />
              <div>
                <span className="text-[11px] font-bold text-blue-800 uppercase block">Official Data Source:</span>
                <span className="text-slate-800 font-semibold">{selectedScheme.officialSource || 'Official Government Portal'}</span>
              </div>
            </div>

            {selectedScheme.applicationUrl && (
              <a
                href={selectedScheme.applicationUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition shrink-0 shadow-xs"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 text-[11px] block font-medium">Interest Rate</span>
              <span className="font-bold text-blue-700 text-sm">{selectedScheme.interestRateText}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[11px] block font-medium">Max Loan Limit</span>
              <span className="font-bold text-slate-900 text-sm">₹{(selectedScheme.maxLoan / 100000).toFixed(1)} Lakhs</span>
            </div>
            <div>
              <span className="text-slate-500 text-[11px] block font-medium">Tenure Range</span>
              <span className="font-bold text-slate-800 text-sm">{selectedScheme.tenureYearsMin}-{selectedScheme.tenureYearsMax} Years</span>
            </div>
            <div>
              <span className="text-slate-500 text-[11px] block font-medium">Moratorium</span>
              <span className="font-bold text-amber-700 text-sm">{selectedScheme.moratoriumMonthsMax} Months</span>
            </div>
          </div>
        </div>

        {/* Eligibility Verification Checklist Breakdown */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-5 h-5 text-blue-700" />
            Requirement Checklist Results
          </h3>

          <div className="space-y-3 text-xs">
            {evaluation.ruleResults.map(rr => (
              <div
                key={rr.ruleId}
                className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-slate-900 block">{rr.title}</span>
                  <span className="text-slate-600 text-[11px]">{rr.detail}</span>
                </div>
                <div className="shrink-0">
                  {rr.status === 'PASS' ? (
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Met
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                      {rr.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheme Details Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overview & Purpose */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
            <h3 className="text-xs font-bold text-blue-700 uppercase tracking-wider">Overview & Target Beneficiary</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{selectedScheme.description}</p>
            <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-100 text-xs text-slate-700">
              <strong className="text-slate-900 block mb-1">Target Beneficiaries:</strong>
              <p>{selectedScheme.targetBeneficiary || selectedScheme.purpose}</p>
            </div>
          </div>

          {/* Key Eligibility Conditions */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
            <h3 className="text-xs font-bold text-blue-700 uppercase tracking-wider">Key Requirements</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              {selectedScheme.keyConditions.map((cond, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Required Documents */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md">
          <h3 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-700" />
            Documents Required for Application
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {selectedScheme.documentsRequired.map((doc, idx) => (
              <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Next Step</h4>
            <p className="text-xs text-slate-500">Estimate your EMI repayment terms or locate your Channel Partner.</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate('/calculator')}
              className="flex-1 sm:flex-none bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-6 py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 transition"
            >
              <Calculator className="w-4 h-4" />
              <span>Understand Your Repayment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/partners')}
              className="flex-1 sm:flex-none bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-6 py-3.5 rounded-full border border-slate-300 flex items-center justify-center gap-2 transition"
            >
              <MapPin className="w-4 h-4 text-blue-700" />
              <span>Find Where to Apply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
