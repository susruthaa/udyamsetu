import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { ChannelPartner } from '../types';
import { InteractiveMap } from '../components/InteractiveMap';
import { MapPin, Phone, Mail, Clock, CheckCircle2, FileText, ShieldCheck, ChevronRight, ArrowRight } from 'lucide-react';

interface PartnersPageProps {
  navigate: (route: string) => void;
}

export const PartnersPage: React.FC<PartnersPageProps> = ({ navigate }) => {
  const { channelPartners, selectedPartner, setSelectedPartner, selectedScheme } = useJourney();
  const [activePartner, setActivePartner] = useState<ChannelPartner>(selectedPartner);

  const handleSelect = (partner: ChannelPartner) => {
    setActivePartner(partner);
    setSelectedPartner(partner);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
            Step 6 of 8 — Partner Locator
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-3">Find where to apply</h1>
          <p className="text-slate-600 text-xs mt-1">
            Find suitable partners and understand your next steps in Visakhapatnam, Andhra Pradesh.
          </p>
        </div>

        {/* Selected Scheme Badge */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap justify-between items-center text-xs shadow-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Target Option: <strong className="text-slate-900">{selectedScheme.name}</strong></span>
          </div>
          <span className="text-[11px] text-blue-800 bg-blue-100 px-3 py-1 rounded-full border border-blue-200 font-bold">
            Authorized Partner Channel Active
          </span>
        </div>

        {/* Top Interactive Map Section */}
        <InteractiveMap
          partners={channelPartners}
          selectedPartner={activePartner}
          onSelectPartner={handleSelect}
        />

        {/* Channel Partners List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side Cards Stack (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Verified District Application Partners
            </h3>

            {channelPartners.map(partner => {
              const isSelected = activePartner.id === partner.id;

              return (
                <div
                  key={partner.id}
                  onClick={() => handleSelect(partner)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-sm ${
                    isSelected
                      ? 'bg-white border-blue-700 ring-2 ring-blue-700/20 shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                          {partner.partnerType}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-200">
                          {partner.distanceKm} km away
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-slate-900">{partner.name}</h4>
                    </div>

                    {isSelected && (
                      <span className="shrink-0 bg-blue-700 text-white p-1.5 rounded-full shadow-xs">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mb-3 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span>{partner.address}</span>
                  </p>

                  <div className="flex flex-wrap gap-1.5 text-[11px] mb-3">
                    {partner.services.map((svc, i) => (
                      <span key={i} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 font-medium">
                        ✓ {svc}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side Partner Details & Application Steps (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase text-blue-700 tracking-wider block mb-1">
                Selected Partner Details
              </span>
              <h3 className="text-lg font-extrabold text-slate-900">{activePartner.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{activePartner.address}</p>
            </div>

            {/* Contact Info */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Phone: {activePartner.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Email: {activePartner.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Hours: {activePartner.operatingHours}</span>
              </div>
            </div>

            {/* Application Steps */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Next Steps at this Location
              </h4>

              <div className="space-y-2 text-xs">
                {activePartner.applicationSteps.map((step, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-2.5 text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-blue-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-xs">
                      {idx + 1}
                    </span>
                    <span className="leading-tight font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => navigate('/documents')}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Prepare Your Documents</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/application')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 rounded-full text-xs flex items-center justify-center gap-1.5 transition border border-slate-300"
              >
                <span>Proceed to Official Application Route</span>
                <ChevronRight className="w-4 h-4 text-blue-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
