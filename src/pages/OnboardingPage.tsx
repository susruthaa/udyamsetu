import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { SocialCategory, BusinessType, BusinessCategory, FinancingPurpose } from '../types';
import { parseNaturalLanguageProfile } from '../utils/localParser';
import { User, IndianRupee, Briefcase, ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface OnboardingPageProps {
  navigate: (route: string) => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ navigate }) => {
  const { profile, updateProfile } = useJourney();

  const [nlInput, setNlInput] = useState('');
  const [extractedInfo, setExtractedInfo] = useState<string | null>(null);
  const [extractedFieldsList, setExtractedFieldsList] = useState<Array<{ field: string; value: string }>>([]);

  const states = [
    'Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu', 'Maharashtra',
    'Gujarat', 'Uttar Pradesh', 'Bihar', 'West Bengal', 'Rajasthan', 'Madhya Pradesh', 'Delhi'
  ];

  const socialCategories: SocialCategory[] = ['General', 'SC', 'ST', 'OBC', 'EWS', 'Minority'];
  const businessTypes: BusinessType[] = ['New Business', 'Existing Business'];
  const businessCategories: BusinessCategory[] = [
    'Food Processing', 'Manufacturing', 'Services', 'Trading', 'Agriculture / Allied', 'Handicrafts / Artisans'
  ];
  const financingPurposes: FinancingPurpose[] = [
    'Start a business', 'Expand existing business', 'Purchase equipment', 'Working capital', 'Skill / livelihood support'
  ];

  const handleNlParse = () => {
    if (!nlInput.trim()) return;
    const result = parseNaturalLanguageProfile(nlInput, profile);
    updateProfile(result.updatedProfile);
    setExtractedInfo(result.parsedSummary);
    setExtractedFieldsList(result.extractedFields);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header & Title */}
        <div className="text-center">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
            Step 1 of 8 — Entrepreneur Profile
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-3">Tell us about your business</h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Fill the form manually or use our local natural-language assistant to populate your profile.
          </p>
        </div>

        {/* Option B: Smart Profile Assistant Input Box */}
        <div className="bg-white border border-blue-200 rounded-3xl p-6 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">Smart Profile Assistant</h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Local Regex & Pattern NLP (Zero API Key)
            </span>
          </div>

          <p className="text-xs text-slate-600 mb-3">
            Describe your requirement in plain words (e.g., <em>"I am a 32 year old woman from Andhra Pradesh. I want to start a small tailoring business and need a loan of 3 lakh."</em>):
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="text"
              value={nlInput}
              onChange={e => setNlInput(e.target.value)}
              placeholder="e.g. I am a 32 year old woman from Andhra Pradesh looking for a 3 lakh loan to start a tailoring business..."
              className="flex-1 bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-blue-700 focus:bg-white"
            />
            <button
              type="button"
              onClick={handleNlParse}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition shrink-0 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Auto-Fill Form</span>
            </button>
          </div>

          {/* Extracted Fields Badges */}
          {extractedInfo && (
            <div className="mt-4 bg-blue-50/70 p-4 rounded-2xl border border-blue-100 space-y-2 animate-fade-in">
              <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Extracted Information Summary:</span>
              </div>
              <p className="text-xs text-slate-700">{extractedInfo}</p>
              {extractedFieldsList.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {extractedFieldsList.map((ef, idx) => (
                    <span key={idx} className="bg-white border border-blue-200 text-blue-800 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-2xs">
                      {ef.field}: <span className="text-slate-900">{ef.value}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Option A: Manual Structured Profile Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
          {/* Section 1: Personal Details */}
          <div>
            <h3 className="text-base font-bold text-blue-700 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
              <User className="w-5 h-5 text-blue-700" />
              1. Personal Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={e => updateProfile({ fullName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-blue-700 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Age (Years)</label>
                <input
                  type="number"
                  value={profile.age}
                  onChange={e => updateProfile({ age: parseInt(e.target.value) || 18 })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-blue-700 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Gender</label>
                <select
                  value={profile.gender || 'Female'}
                  onChange={e => updateProfile({ gender: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-blue-700 focus:bg-white"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Transgender">Transgender</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">State</label>
                <select
                  value={profile.state}
                  onChange={e => updateProfile({ state: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-blue-700 focus:bg-white"
                >
                  {states.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Social Category Cards */}
            <div className="mt-6">
              <label className="block text-xs font-bold text-slate-700 mb-2">Social Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                {socialCategories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => updateProfile({ socialCategory: cat })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border ${
                      profile.socialCategory === cat
                        ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Business Type & Category */}
          <div>
            <h3 className="text-base font-bold text-blue-700 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
              <Briefcase className="w-5 h-5 text-blue-700" />
              2. Business Type & Sector
            </h3>

            {/* Business Type */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 mb-2">Business Stage</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {businessTypes.map(bt => (
                  <div
                    key={bt}
                    onClick={() => updateProfile({ businessType: bt })}
                    className={`p-4 rounded-2xl border cursor-pointer transition ${
                      profile.businessType === bt
                        ? 'bg-blue-50 border-blue-700 text-blue-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900">{bt}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {bt === 'New Business' ? 'Starting a new business venture' : 'Expanding an existing enterprise'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Category Cards */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Business Sector</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {businessCategories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => updateProfile({ businessCategory: cat })}
                    className={`p-3 rounded-xl text-left border transition ${
                      profile.businessCategory === cat
                        ? 'bg-blue-700 text-white border-blue-700 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs">{cat}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Financing Requirements */}
          <div>
            <h3 className="text-base font-bold text-blue-700 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
              <IndianRupee className="w-5 h-5 text-blue-700" />
              3. Financing Requirements
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Annual Family Income (₹)</label>
                <input
                  type="number"
                  value={profile.annualIncome}
                  onChange={e => updateProfile({ annualIncome: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-blue-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Estimated Project Cost (₹)</label>
                <input
                  type="number"
                  value={profile.projectCost}
                  onChange={e => updateProfile({ projectCost: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-blue-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Required Loan Amount (₹)</label>
                <input
                  type="number"
                  value={profile.requiredFinancing}
                  onChange={e => updateProfile({ requiredFinancing: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-blue-700 focus:bg-white"
                />
              </div>
            </div>

            {/* Primary Purpose */}
            <div className="mt-6">
              <label className="block text-xs font-bold text-slate-700 mb-2">Primary Financing Purpose</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {financingPurposes.map(purp => (
                  <button
                    key={purp}
                    type="button"
                    onClick={() => updateProfile({ primaryPurpose: purp })}
                    className={`p-3 rounded-xl text-xs text-left border font-semibold transition ${
                      profile.primaryPurpose === purp
                        ? 'bg-blue-50 text-blue-900 border-blue-700 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {purp}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-700/20 flex items-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <span>Review Profile</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
