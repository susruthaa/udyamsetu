import React, { useState } from 'react';
import { useJourney, LanguageOption } from '../context/JourneyContext';
import { parseNaturalLanguageProfile } from '../utils/localParser';
import { MessageSquare, Send, CheckCircle2, Edit3, ArrowRight, Globe, Layers, Sparkles, ShieldCheck } from 'lucide-react';

interface ProfilePageProps {
  navigate: (route: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ navigate }) => {
  const { profile, updateProfile, chatMessages, addChatMessage, language, setLanguage } = useJourney();
  const [inputText, setInputText] = useState('');

  const quickPrompts = [
    'I am a 32 year old woman from Andhra Pradesh wanting to start a tailoring business with 3 lakh loan.',
    'I need ₹5 Lakh for purchasing equipment for my food processing unit in Telangana.',
    'Can I get a loan with concessional interest rates under SC category?'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    addChatMessage(text, 'user');
    if (!textToSend) setInputText('');

    // Parse natural language using local rule-based NLP
    const result = parseNaturalLanguageProfile(text, profile);
    updateProfile(result.updatedProfile);

    setTimeout(() => {
      const reply = result.extractedFields.length > 0
        ? `Got it! Local NLP parsed: ${result.extractedFields.map(f => `${f.field}: ${f.value}`).join(', ')}. Your business summary has been updated below.`
        : `Got it. Updated your requirement summary for a ${result.updatedProfile.businessCategory} project requesting ₹${result.updatedProfile.requiredFinancing.toLocaleString('en-IN')}.`;

      addChatMessage(reply, 'ai');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 mb-2">
              <Layers className="w-3.5 h-3.5 text-blue-700" />
              <span>Step 2 of 8 — Review & Refine Requirements</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Tell us what you need.</h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Describe your business and financing needs in plain words or refine your structured details.
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs self-start md:self-auto">
            <Globe className="w-4 h-4 text-blue-700" />
            <span className="text-xs text-slate-500 font-medium">Language:</span>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value as LanguageOption)}
              className="bg-transparent text-slate-800 font-semibold text-xs focus:outline-none cursor-pointer"
            >
              <option value="English">English</option>
              <option value="తెలుగు">తెలుగు (Telugu)</option>
              <option value="हिन्दी">हिन्दी (Hindi)</option>
            </select>
          </div>
        </div>

        {/* Grid Layout: Left Chat Assistant, Right Structured Facts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Left Column: Conversational Assistant UI */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl sm:rounded-3xl flex flex-col h-[420px] sm:h-[560px] shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-slate-50 px-4 sm:px-6 py-3.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">Smart Profile Assistant</h3>
                  <p className="text-[10px] sm:text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Local Pattern NLP (Zero API Key)
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
              {chatMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] sm:max-w-[85%] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-700 text-white rounded-br-none shadow-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <span className="font-bold text-[10px] opacity-80">
                        {msg.sender === 'user' ? profile.fullName : 'Smart Profile Assistant'}
                      </span>
                      <span className="text-[9px] opacity-60">{msg.timestamp}</span>
                    </div>
                    <p className="text-xs">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompts */}
            <div className="px-3 sm:px-4 py-2 bg-slate-100 border-t border-slate-200 flex items-center gap-2 overflow-x-auto">
              <span className="text-[10px] text-slate-500 font-bold shrink-0">Try typing:</span>
              {quickPrompts.map((qp, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(qp)}
                  className="text-[11px] bg-white hover:bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-slate-200 shrink-0 transition font-medium"
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2 sm:gap-3">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your requirement in plain words..."
                className="flex-1 bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-xl px-3.5 py-2.5 sm:py-3 focus:outline-none focus:border-blue-700 focus:bg-white"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold p-2.5 sm:p-3 rounded-xl transition shadow-md shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: We Understood Panel */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-700" />
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">Extracted Entrepreneur Profile:</h3>
                </div>
                <button
                  onClick={() => navigate('/onboarding')}
                  className="flex items-center gap-1 text-xs text-blue-700 hover:text-blue-800 font-semibold"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit details</span>
                </button>
              </div>

              <div className="space-y-2.5 sm:space-y-3 text-xs">
                <div className="bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Business Sector</span>
                  <div className="flex items-center gap-1.5 font-bold text-blue-900">
                    <span>{profile.businessCategory}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>

                <div className="bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Business Stage</span>
                  <div className="flex items-center gap-1.5 font-bold text-blue-900">
                    <span>{profile.businessType}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>

                <div className="bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Primary Purpose</span>
                  <div className="flex items-center gap-1.5 font-bold text-blue-900 min-w-0">
                    <span className="truncate">{profile.primaryPurpose}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>
                </div>

                <div className="bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Requested Loan</span>
                  <div className="flex items-center gap-1.5 font-bold text-amber-700">
                    <span>₹{profile.requiredFinancing.toLocaleString('en-IN')}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>

                <div className="bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Location</span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <span>{profile.district || 'Visakhapatnam'}, {profile.state}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>

                <div className="bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Applicant Profile</span>
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <span>{profile.socialCategory} Category ({profile.age} yrs, {profile.gender || 'Female'})</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="pt-5 border-t border-slate-100 mt-5">
              <button
                onClick={() => navigate('/eligibility')}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 sm:py-4 rounded-full shadow-lg shadow-blue-700/20 flex items-center justify-center gap-2 transition text-xs sm:text-sm"
              >
                <span>Check My Options</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
