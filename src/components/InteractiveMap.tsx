import React from 'react';
import { ChannelPartner } from '../types';
import { MapPin, CheckCircle } from 'lucide-react';

interface InteractiveMapProps {
  partners: ChannelPartner[];
  selectedPartner: ChannelPartner;
  onSelectPartner: (partner: ChannelPartner) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  partners,
  selectedPartner,
  onSelectPartner
}) => {
  return (
    <div className="space-y-3">
      {/* Map Container */}
      <div className="relative w-full h-[280px] sm:h-[380px] md:h-[460px] bg-slate-100 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-md">
        {/* Map Header Badge */}
        <div className="absolute top-3 left-3 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl border border-slate-200 text-xs text-slate-800 flex items-center gap-2.5 shadow-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-700 animate-ping shrink-0" />
          <div>
            <p className="font-bold text-slate-900 text-xs sm:text-sm">Visakhapatnam District Map</p>
            <p className="text-slate-500 text-[10px] sm:text-[11px] hidden sm:block">4 Verified Partners Nearby</p>
          </div>
        </div>

        {/* SVG Map Graphic Canvas */}
        <div className="relative w-full h-full bg-blue-50/40 overflow-hidden">
          <svg className="w-full h-full object-cover" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ocean shape */}
            <path d="M550 0 C600 150 650 300 800 500 L800 0 Z" fill="#93C5FD" fillOpacity="0.4" />

            {/* Roads */}
            <path d="M 50 250 Q 300 200 750 350" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
            <path d="M 200 50 L 400 450" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
            <path d="M 100 400 L 600 100" stroke="#94A3B8" strokeWidth="3" strokeDasharray="6 6" />

            <text x="320" y="180" fill="#64748B" fontSize="10" fontWeight="bold">NH-16 Express</text>
            <text x="650" y="320" fill="#1D4ED8" fontSize="10" fontStyle="italic">Bay of Bengal</text>

            {/* User Location */}
            <g transform="translate(260, 220)">
              <circle r="20" fill="#2563EB" fillOpacity="0.2" className="animate-ping" />
              <circle r="10" fill="#1D4ED8" />
              <circle r="4" fill="#FFFFFF" />
              <text x="-35" y="24" fill="#1E4ED8" fontSize="11" fontWeight="bold">Your Location</text>
            </g>

            {/* Partner 1: SBI Lead Bank (2.4km) */}
            <g
              transform="translate(340, 190)"
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={() => onSelectPartner(partners[0])}
            >
              <circle r="16" fill={selectedPartner.id === partners[0].id ? '#1D4ED8' : '#93C5FD'} fillOpacity="0.5" />
              <path d="M0 -14 C-6 -14 -10 -10 -10 -4 C-10 4 0 14 0 14 C0 14 10 4 10 -4 C10 -10 6 -14 0 -14 Z" fill={selectedPartner.id === partners[0].id ? '#1D4ED8' : '#2563EB'} />
              <circle cy="-4" r="4" fill="#FFFFFF" />
              <text x="14" y="2" fill="#1E293B" fontSize="10" fontWeight="bold">SBI Lead Bank (2.4km)</text>
            </g>

            {/* Partner 2: APSCCFC (4.1km) */}
            <g
              transform="translate(420, 140)"
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={() => onSelectPartner(partners[1])}
            >
              <circle r="16" fill={selectedPartner.id === partners[1].id ? '#059669' : '#A7F3D0'} fillOpacity="0.5" />
              <path d="M0 -14 C-6 -14 -10 -10 -10 -4 C-10 4 0 14 0 14 C0 14 10 4 10 -4 C10 -10 6 -14 0 -14 Z" fill={selectedPartner.id === partners[1].id ? '#059669' : '#10B981'} />
              <circle cy="-4" r="4" fill="#FFFFFF" />
              <text x="14" y="2" fill="#065F46" fontSize="10" fontWeight="bold">APSCCFC (4.1km)</text>
            </g>

            {/* Partner 3: DIC Center (5.8km) */}
            <g
              transform="translate(180, 310)"
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={() => onSelectPartner(partners[2])}
            >
              <circle r="16" fill={selectedPartner.id === partners[2].id ? '#D97706' : '#FDE68A'} fillOpacity="0.5" />
              <path d="M0 -14 C-6 -14 -10 -10 -10 -4 C-10 4 0 14 0 14 C0 14 10 4 10 -4 C10 -10 6 -14 0 -14 Z" fill={selectedPartner.id === partners[2].id ? '#D97706' : '#F59E0B'} />
              <circle cy="-4" r="4" fill="#FFFFFF" />
              <text x="-100" y="2" fill="#92400E" fontSize="10" fontWeight="bold">DIC Cell (5.8km)</text>
            </g>

            {/* Partner 4: NABFINS (7.2km) */}
            <g
              transform="translate(490, 270)"
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={() => onSelectPartner(partners[3])}
            >
              <circle r="16" fill={selectedPartner.id === partners[3].id ? '#7C3AED' : '#DDD6FE'} fillOpacity="0.5" />
              <path d="M0 -14 C-6 -14 -10 -10 -10 -4 C-10 4 0 14 0 14 C0 14 10 4 10 -4 C10 -10 6 -14 0 -14 Z" fill={selectedPartner.id === partners[3].id ? '#7C3AED' : '#8B5CF6'} />
              <circle cy="-4" r="4" fill="#FFFFFF" />
              <text x="14" y="2" fill="#5B21B6" fontSize="10" fontWeight="bold">NABFINS (7.2km)</text>
            </g>
          </svg>
        </div>

        {/* Desktop Floating Overlay Card (sm:block) */}
        <div className="hidden sm:flex absolute bottom-4 left-4 right-4 z-20 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-lg justify-between items-center gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-slate-900 text-sm">{selectedPartner.name}</h4>
                <span className="text-[11px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold border border-blue-200">
                  {selectedPartner.partnerType}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{selectedPartner.address}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-xs">
            <div className="text-right">
              <span className="text-blue-700 font-bold block">{selectedPartner.distanceKm} km away</span>
            </div>
            <button
              onClick={() => onSelectPartner(selectedPartner)}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1 transition shadow-xs text-xs"
            >
              <span>Selected</span>
              <CheckCircle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Inline Partner Card (< sm breakpoint) */}
      <div className="sm:hidden bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-slate-900 text-xs truncate">{selectedPartner.name}</h4>
            <p className="text-[11px] text-blue-700 font-bold">{selectedPartner.distanceKm} km away • {selectedPartner.partnerType}</p>
          </div>
        </div>

        <button
          onClick={() => onSelectPartner(selectedPartner)}
          className="bg-blue-700 text-white font-bold px-3 py-1.5 rounded-full text-xs shrink-0 flex items-center gap-1"
        >
          <span>Selected</span>
          <CheckCircle className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
