import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { Scheme } from '../types';
import { CheckCircle2, ChevronDown, ChevronUp, ArrowRight, Info, Sparkles, ExternalLink, Globe } from 'lucide-react';

interface RecommendationsPageProps {
  navigate: (route: string) => void;
}

export const RecommendationsPage: React.FC<RecommendationsPageProps> = ({ navigate }) => {
  const { evaluatedSchemes, setSelectedScheme } = useJourney();
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(evaluatedSchemes[0]?.scheme.id || null);

  const handleSelectScheme = (scheme: Scheme) => {
    setSelectedScheme(scheme);
    navigate(`/scheme/${scheme.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
            Step 4 of 8 — Suitable Options
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-3">Financing options that may fit your business</h1>
          <p className="text-slate-600 text-xs mt-1">
            Evaluated deterministically based on provided profile inputs and verified government guidelines.
          </p>
        </div>

        {/* Scheme Cards Stack */}
        <div className="space-y-6">
          {evaluatedSchemes.map(match => {
            const { scheme, suitability, whyMatched, whyFailed } = match;
            const isExpanded = expandedSchemeId === scheme.id;

            const isSuitable = suitability === 'SUITABLE';
            const isPotentially = suitability === 'POTENTIALLY_SUITABLE';

            return (
              <div
                key={scheme.id}
                className={`bg-white border rounded-3xl p-6 sm:p-8 transition-all shadow-md ${
                  isSuitable
                    ? 'border-blue-200 hover:border-blue-400'
                    : 'border-slate-200 opacity-95'
                }`}
              >
                {/* Scheme Header Row */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                        {scheme.categoryTag}
                      </span>
                      {isSuitable && (
                        <span className="text-[11px] font-bold px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Suitable Option
                        </span>
                      )}
                      {isPotentially && (
                        <span className="text-[11px] font-bold px-3 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                          <Info className="w-3.5 h-3.5 text-amber-600" />
                          More Information Needed
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900">{scheme.name}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">{scheme.organization}</p>
                  </div>

                  <div className="w-full md:w-auto flex items-center gap-2 justify-end">
                    {scheme.applicationUrl && (
                      <a
                        href={scheme.applicationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-3 rounded-full border border-slate-300 flex items-center gap-1 transition"
                      >
                        <Globe className="w-3.5 h-3.5 text-blue-700" />
                        <span>Official Portal</span>
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </a>
                    )}
                    <button
                      onClick={() => handleSelectScheme(scheme)}
                      className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-6 py-3 rounded-full shadow-md flex items-center gap-1.5 transition"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Who it may help */}
                <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-100 text-xs text-slate-700 mb-4 flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <strong className="text-slate-900 font-bold block mb-0.5">Who this option may help:</strong>
                    {scheme.purpose}
                  </div>
                  {scheme.officialSource && (
                    <span className="text-[10px] text-slate-500 font-medium bg-white px-2.5 py-1 rounded border border-slate-200">
                      Source: {scheme.officialSource}
                    </span>
                  )}
                </div>

                {/* Key Specs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-4">
                  <div>
                    <span className="text-slate-500 text-[11px] block font-medium">Indicative Loan Range</span>
                    <span className="font-bold text-slate-900">
                      ₹{(scheme.minLoan / 100000).toFixed(1)}L - ₹{(scheme.maxLoan / 100000).toFixed(1)}L
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block font-medium">Interest Rate</span>
                    <span className="font-bold text-blue-700">{scheme.interestRateText}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block font-medium">Tenure / Moratorium</span>
                    <span className="font-bold text-slate-800">{scheme.tenureYearsMax} Yrs ({scheme.moratoriumMonthsMax}m Holiday)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block font-medium">Eligible Category</span>
                    <span className="font-bold text-slate-800">{scheme.eligibleCategories.join(', ')}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {scheme.description}
                </p>

                {/* Expandable "Why this may fit" Section */}
                <div className="border-t border-slate-100 pt-3">
                  <button
                    onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
                    className="w-full flex items-center justify-between text-xs font-bold text-blue-700 hover:text-blue-800 py-1"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>WHY THIS MAY FIT YOUR BUSINESS</span>
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-700 animate-fade-in">
                      {whyMatched.map((reason, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{reason}</span>
                        </div>
                      ))}

                      {whyFailed && whyFailed.length > 0 && (
                        <div className="pt-2 border-t border-slate-200 text-amber-800 space-y-1">
                          <span className="font-bold block text-[11px]">Note on Scheme Bounds:</span>
                          {whyFailed.map((fail, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <span>{fail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
