import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { ApplicationModal } from '../components/ApplicationModal';
import { ShieldCheck, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';

interface ApplicationPageProps {
  navigate: (route: string) => void;
}

export const ApplicationPage: React.FC<ApplicationPageProps> = ({ navigate }) => {
  const { profile, selectedScheme, selectedPartner, documents } = useJourney();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const preparedDocs = documents.filter(d => d.status === 'prepared').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
            Step 8 of 8 — Next Steps
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-3">You're ready for the next step.</h1>
          <p className="text-slate-600 text-xs mt-1">
            Your financing route has been structured, checked, and mapped to an authorized Channel Partner.
          </p>
        </div>

        {/* Journey Summary Box */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            Financing Journey Summary
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">Profile Details</span>
                <span className="text-slate-600 text-[11px]">{profile.fullName} • {profile.businessCategory} ({profile.state})</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">Eligibility Check</span>
                <span className="text-slate-600 text-[11px]">Category ({profile.socialCategory}) & Age Requirements Met</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">Suitable Option Matched</span>
                <span className="text-slate-600 text-[11px]">{selectedScheme.shortName} ({selectedScheme.interestRateText})</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">Repayment Estimate</span>
                <span className="text-slate-600 text-[11px]">Loan Amount: ₹{profile.requiredFinancing.toLocaleString('en-IN')} (5 Yrs)</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">Channel Partner Found</span>
                <span className="text-slate-600 text-[11px]">{selectedPartner.name} ({selectedPartner.distanceKm} km)</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">Documents Checklist</span>
                <span className="text-slate-600 text-[11px]">{preparedDocs} of {documents.length} Documents Prepared</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Next Step Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">Recommended Next Step</span>
              <h3 className="font-bold text-slate-900 text-base">Contact Channel Partner & Submit Official Application</h3>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-700">
            <p><strong>Channel Partner:</strong> {selectedPartner.name}</p>
            <p><strong>Address:</strong> {selectedPartner.address}</p>
            <p><strong>Contact Helpline:</strong> {selectedPartner.phone}</p>
          </div>

          {/* Primary CTA Button */}
          <div className="pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-full shadow-lg shadow-blue-700/20 flex items-center justify-center gap-2 transition text-sm transform hover:-translate-y-0.5"
            >
              <span>Open Official Application Route</span>
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal */}
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          scheme={selectedScheme}
          partner={selectedPartner}
        />
      </div>
    </div>
  );
};
