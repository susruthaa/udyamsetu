import React, { useState, useEffect } from 'react';
import { useJourney } from '../context/JourneyContext';
import { evaluateSchemeRules } from '../utils/ruleEngine';
import { ShieldCheck, CheckCircle2, XCircle, HelpCircle, ArrowRight, Loader2 } from 'lucide-react';

interface EligibilityPageProps {
  navigate: (route: string) => void;
}

export const EligibilityPage: React.FC<EligibilityPageProps> = ({ navigate }) => {
  const { profile, selectedScheme } = useJourney();
  const [isEvaluating, setIsEvaluating] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const evaluationSteps = [
    'Understanding your business profile',
    'Checking eligibility conditions',
    'Verifying location and criteria',
    'Identifying suitable options'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev < evaluationSteps.length - 1) {
          return prev + 1;
        } else {
          setIsEvaluating(false);
          clearInterval(timer);
          return prev;
        }
      });
    }, 400);

    return () => clearInterval(timer);
  }, []);

  const result = evaluateSchemeRules(profile, selectedScheme);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
            Step 3 of 4 — Eligibility Verification
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-3">Check your eligibility</h1>
          <p className="text-slate-600 text-xs mt-1">
            Comparing your business inputs against official eligibility requirements.
          </p>
        </div>

        {/* Animated Processing Sequence */}
        {isEvaluating ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-lg text-center my-8 max-w-xl mx-auto">
            <Loader2 className="w-12 h-12 text-blue-700 animate-spin mx-auto mb-6" />
            <h3 className="font-bold text-lg text-slate-900 mb-6">Verifying Requirement Criteria...</h3>

            <div className="space-y-3 text-left text-xs max-w-md mx-auto">
              {evaluationSteps.map((step, idx) => (
                <div key={step} className="flex items-center gap-3">
                  {idx < currentStepIndex ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : idx === currentStepIndex ? (
                    <Loader2 className="w-4 h-4 text-blue-700 animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <span className={idx <= currentStepIndex ? 'text-slate-800 font-semibold' : 'text-slate-400'}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* Target Scheme Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">Target Option</span>
                <h2 className="text-xl font-bold text-slate-900">{selectedScheme.name}</h2>
                <p className="text-xs text-slate-500">{selectedScheme.organization}</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Suitable Option
                </span>
              </div>
            </div>

            {/* Rule Check Evaluation Cards Grid */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-lg space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-100 pb-3">
                Eligibility Condition Checks
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.ruleResults.map(rule => {
                  const isPass = rule.status === 'PASS';
                  const isFail = rule.status === 'FAIL';
                  const isUnknown = rule.status === 'UNKNOWN';

                  return (
                    <div
                      key={rule.ruleId}
                      className={`p-4 rounded-2xl border transition ${
                        isPass
                          ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                          : isFail
                          ? 'bg-rose-50/50 border-rose-200 text-slate-800'
                          : 'bg-amber-50/50 border-amber-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-slate-900">{rule.title}</span>
                        {isPass && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-md border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            PASS
                          </span>
                        )}
                        {isFail && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-md border border-rose-200">
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            FAIL
                          </span>
                        )}
                        {isUnknown && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-md border border-amber-200">
                            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                            UNKNOWN
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-semibold mb-1 text-slate-700">
                        {isPass && "✓ You meet this requirement."}
                        {isUnknown && "ℹ We need a little more information."}
                        {isFail && "⚠ This option does not currently match this requirement."}
                      </p>

                      <p className="text-xs text-slate-600 mb-2 leading-relaxed">{rule.detail}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-200">
                        <span>Condition: {rule.conditionText}</span>
                        <span className="font-semibold text-slate-800">{rule.userInputVal}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => navigate('/profile')}
                className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold px-5 py-3 rounded-full border border-slate-200 shadow-xs"
              >
                ← Back to Requirements
              </button>

              <button
                onClick={() => navigate('/recommendations')}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-700/20 flex items-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <span>View Suitable Options</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
