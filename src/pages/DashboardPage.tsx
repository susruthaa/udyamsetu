import React from 'react';
import { useJourney } from '../context/JourneyContext';
import { UserCheck, ShieldCheck, Award, Calculator, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

interface DashboardPageProps {
  navigate: (route: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ navigate }) => {
  const { profile, selectedScheme, selectedPartner, documents } = useJourney();

  const preparedDocs = documents.filter(d => d.status === 'prepared').length;

  const steps = [
    { title: 'Profile', status: 'Completed', route: '/onboarding', icon: UserCheck, ok: true },
    { title: 'Eligibility', status: 'Checked', route: '/eligibility', icon: ShieldCheck, ok: true },
    { title: 'Scheme', status: 'Selected', route: '/recommendations', icon: Award, ok: true },
    { title: 'Repayment', status: 'Estimated', route: '/calculator', icon: Calculator, ok: true },
    { title: 'Partner', status: 'Found', route: '/partners', icon: MapPin, ok: true },
    { title: 'Next Step', status: 'Application', route: '/application', icon: CheckCircle2, ok: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200 mb-2 inline-block">
              Business Financing Guidance
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900">Your Financing Journey</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {profile.fullName} • {profile.businessCategory} ({profile.district}, {profile.state})
            </p>
          </div>

          <button
            onClick={() => navigate('/application')}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-6 py-3 rounded-full shadow-md flex items-center gap-1.5 transition"
          >
            <span>Continue Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-900">Journey Completion</span>
            <span className="font-bold text-blue-700">5 / 6 Steps Completed (83%)</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
            <div className="bg-blue-700 h-full w-[83%] transition-all duration-500" />
          </div>
        </div>

        {/* Journey Status Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {steps.map(s => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                onClick={() => navigate(s.route)}
                className="bg-white border border-slate-200 hover:border-blue-400 p-6 rounded-3xl transition cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-700 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    {s.ok ? (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {s.status}
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
                        {s.status}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-1">{s.title}</h3>
                  <p className="text-xs text-slate-500">Click to view step details.</p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-700 font-bold group-hover:text-blue-800">
                  <span>Open Step</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Journey Snapshot Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Active Journey Overview
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-slate-500 text-[11px] font-medium block">Selected Option</span>
              <span className="font-bold text-blue-700">{selectedScheme.shortName}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[11px] font-medium block">Loan Requirement</span>
              <span className="font-bold text-slate-900">₹{profile.requiredFinancing.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[11px] font-medium block">Channel Partner</span>
              <span className="font-bold text-slate-800">{selectedPartner.name.split('-')[0]}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[11px] font-medium block">Documents Checklist</span>
              <span className="font-bold text-emerald-700">{preparedDocs} / {documents.length} Prepared</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
