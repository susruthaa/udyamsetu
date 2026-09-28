import React from 'react';
import { UserCheck, MessageSquare, ShieldCheck, Award, Calculator, MapPin, FileCheck, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProgressStepperProps {
  currentStepIndex: number;
  navigate: (route: string) => void;
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStepIndex, navigate }) => {
  const steps = [
    { title: '1. Profile', short: 'Profile', icon: UserCheck, route: '/onboarding' },
    { title: '2. AI Facts', short: 'AI Facts', icon: MessageSquare, route: '/profile' },
    { title: '3. Eligibility', short: 'Eligibility', icon: ShieldCheck, route: '/eligibility' },
    { title: '4. Schemes', short: 'Schemes', icon: Award, route: '/recommendations' },
    { title: '5. Calculator', short: 'Repayment', icon: Calculator, route: '/calculator' },
    { title: '6. Partner', short: 'Partner', icon: MapPin, route: '/partners' },
    { title: '7. Documents', short: 'Documents', icon: FileCheck, route: '/documents' },
    { title: '8. Application', short: 'Apply', icon: CheckCircle2, route: '/application' },
  ];

  const currentStep = steps[currentStepIndex] || steps[0];
  const CurrentIcon = currentStep.icon;

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      navigate(steps[currentStepIndex - 1].route);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      navigate(steps[currentStepIndex + 1].route);
    }
  };

  return (
    <div className="bg-blue-50/80 border-b border-blue-100 text-slate-700 py-2.5 px-4 shadow-xs sticky top-16 sm:top-20 z-40 backdrop-blur-md">
      {/* Mobile Compact Responsive Indicator (< 768px) */}
      <div className="md:hidden max-w-md mx-auto flex items-center justify-between text-xs">
        <button
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className={`p-1.5 rounded-lg border transition ${
            currentStepIndex === 0
              ? 'opacity-40 border-slate-200 text-slate-400 cursor-not-allowed'
              : 'border-slate-300 text-slate-700 hover:bg-white bg-white/80'
          }`}
          aria-label="Previous step"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 font-bold text-slate-900 bg-white px-3.5 py-1.5 rounded-full border border-blue-200 shadow-xs">
          <CurrentIcon className="w-4 h-4 text-blue-700 shrink-0" />
          <span>Step {currentStepIndex + 1} of 8: {currentStep.short}</span>
        </div>

        <button
          onClick={handleNext}
          disabled={currentStepIndex === steps.length - 1}
          className={`p-1.5 rounded-lg border transition ${
            currentStepIndex === steps.length - 1
              ? 'opacity-40 border-slate-200 text-slate-400 cursor-not-allowed'
              : 'border-slate-300 text-slate-700 hover:bg-white bg-white/80'
          }`}
          aria-label="Next step"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Desktop Full 8-Step Pill Stepper (>= 768px) */}
      <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between gap-2 overflow-x-auto">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <React.Fragment key={step.title}>
              <button
                onClick={() => navigate(step.route)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  isCurrent
                    ? 'bg-blue-700 text-white font-bold shadow-md shadow-blue-700/20 scale-105'
                    : isCompleted
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 hover:bg-emerald-200/70'
                    : 'bg-white text-slate-600 hover:text-blue-700 hover:bg-blue-100/50 border border-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : isCompleted ? 'text-emerald-700' : 'text-slate-500'}`} />
                <span>{step.title}</span>
              </button>
              {idx < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 max-w-[24px] ${
                    idx < currentStepIndex ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
