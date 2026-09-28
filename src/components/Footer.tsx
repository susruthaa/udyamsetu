import React from 'react';
import { Compass, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 text-slate-700 border-t border-slate-200 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center text-white font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-slate-900 tracking-tight block leading-none">
                  UDYAMSETU AI
                </span>
                <span className="text-xs text-blue-700 font-semibold">Business Financing Guidance</span>
              </div>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed mt-3">
              Helping business owners understand financing options, repayment estimates, and application routes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li><a href="#/" className="hover:text-blue-700 transition">Home</a></li>
              <li><a href="#/" className="hover:text-blue-700 transition">About</a></li>
              <li><a href="#/recommendations" className="hover:text-blue-700 transition">Schemes</a></li>
              <li><a href="#/calculator" className="hover:text-blue-700 transition">Calculator</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li><a href="#/eligibility" className="hover:text-blue-700 transition">Eligibility Check</a></li>
              <li><a href="#/partners" className="hover:text-blue-700 transition">Partner Locator</a></li>
              <li><a href="#/documents" className="hover:text-blue-700 transition">Documents Guide</a></li>
              <li><a href="#/profile" className="hover:text-blue-700 transition">AI Assistant</a></li>
            </ul>
          </div>

          {/* Helpful Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Helpful Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li><a href="#/" className="hover:text-blue-700 transition">Privacy Policy</a></li>
              <li><a href="#/" className="hover:text-blue-700 transition">Terms of Service</a></li>
              <li><a href="#/" className="hover:text-blue-700 transition">Contact Us</a></li>
              <li><a href="#/dashboard" className="hover:text-blue-700 transition">User Dashboard</a></li>
            </ul>
          </div>
        </div>

        {/* Public Disclaimer Callout Box */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 text-xs text-slate-600 flex items-start gap-3 shadow-xs mb-8">
          <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-900 font-semibold">Important Disclaimer:</strong> Recommendations and repayment figures are estimates based on available scheme information. Final eligibility, terms, and approval are determined by the concerned authority or Channel Partner.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
          © 2026 UDYAMSETU AI • Public-Service Business Financing Guidance Platform.
        </div>
      </div>
    </footer>
  );
};
