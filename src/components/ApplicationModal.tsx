import React from 'react';
import { ShieldCheck, ExternalLink, Info, X } from 'lucide-react';
import { ChannelPartner, Scheme } from '../types';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  scheme: Scheme;
  partner: ChannelPartner;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  scheme,
  partner
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 text-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              Official Application Channel
            </span>
            <h3 className="text-lg font-bold text-slate-900">Official Portal Redirection</h3>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 text-xs text-slate-700 mb-5">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-slate-500 font-medium">Target Option:</span>
            <span className="font-bold text-blue-900">{scheme.shortName}</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-slate-500 font-medium">Channel Partner:</span>
            <span className="font-bold text-slate-900">{partner.name}</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-slate-500 font-medium">Route Type:</span>
            <span className="font-semibold text-slate-800">{scheme.applicationRoute}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">Location:</span>
            <span className="text-slate-800 font-semibold">{partner.district}, {partner.state}</span>
          </div>
        </div>

        <div className="bg-blue-50/70 rounded-2xl p-3.5 border border-blue-100 text-xs text-blue-900 flex items-start gap-2.5 mb-6">
          <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold mb-0.5 text-blue-800">Demo Prototype Note:</strong>
            In a live environment, this button securely forwards your verified information bundle to the official portal (e.g. NSFDC / PM-SURAJ / District Lead Bank).
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-full text-xs transition border border-slate-200"
          >
            Back to Journey
          </button>

          <a
            href={scheme.applicationUrl || 'https://www.kviconline.gov.in/pmegp/'}
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
            className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-full text-xs flex items-center justify-center gap-1.5 transition shadow-md"
          >
            <span>Open Official Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
