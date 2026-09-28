import React from 'react';
import { useJourney } from '../context/JourneyContext';
import { CheckCircle2, Clock, Info, ArrowRight } from 'lucide-react';

interface DocumentsPageProps {
  navigate: (route: string) => void;
}

export const DocumentsPage: React.FC<DocumentsPageProps> = ({ navigate }) => {
  const { documents, toggleDocumentStatus, selectedPartner } = useJourney();

  const preparedCount = documents.filter(d => d.status === 'prepared').length;
  const totalCount = documents.length;
  const progressPercent = Math.round((preparedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
            Step 7 of 8 — Document Guide
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-3">Prepare your documents</h1>
          <p className="text-slate-600 text-xs mt-1">
            Review and organize all required verification documents before visiting your Channel Partner.
          </p>
        </div>

        {/* Progress Tracker Banner */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 font-extrabold text-lg flex items-center justify-center shrink-0 border border-blue-200">
              {progressPercent}%
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">{preparedCount} of {totalCount} Documents Prepared</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Target Location: <strong className="text-slate-800">{selectedPartner.name}</strong>
              </p>
            </div>
          </div>

          <div className="w-full sm:w-64 bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
            <div
              className="bg-blue-700 h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Documents Stack */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-100 pb-3">
            Application Document Checklist
          </h3>

          <div className="space-y-4">
            {documents.map(doc => {
              const isPrepared = doc.status === 'prepared';

              return (
                <div
                  key={doc.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isPrepared
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border ${
                        doc.badge === 'Required'
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : doc.badge === 'Conditional'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-slate-200 text-slate-700 border-slate-300'
                      }`}>
                        {doc.badge}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900">{doc.title}</h4>
                    </div>

                    {/* Toggle Button */}
                    <button
                      onClick={() => toggleDocumentStatus(doc.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                        isPrepared
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                      }`}
                    >
                      {isPrepared ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Prepared ✓</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>Mark as Prepared</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mb-3">{doc.description}</p>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 font-semibold">Why needed: </strong>
                      {doc.whyNeeded}
                      <span className="text-[11px] text-slate-500 block mt-1 font-medium">Format: {doc.formatAllowed}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-between items-center pt-4">
          <button
            onClick={() => navigate('/partners')}
            className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold px-5 py-3 rounded-full border border-slate-200 shadow-xs"
          >
            ← Back to Partner Locator
          </button>

          <button
            onClick={() => navigate('/application')}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-700/20 flex items-center gap-2 transition transform hover:-translate-y-0.5"
          >
            <span>Continue to Next Steps</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
