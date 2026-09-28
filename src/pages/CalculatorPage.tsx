import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { calculateRepayment } from '../utils/emiCalculator';
import { RepaymentChart } from '../components/RepaymentChart';
import { Calculator, MapPin, Info, ArrowRight } from 'lucide-react';

interface CalculatorPageProps {
  navigate: (route: string) => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ navigate }) => {
  const { profile, selectedScheme } = useJourney();

  const [projectCost, setProjectCost] = useState(profile.projectCost || 500000);
  const [ownContribution, setOwnContribution] = useState(Math.round(projectCost * 0.1));
  const [interestRate, setInterestRate] = useState(selectedScheme.interestRateMin || 6.0);
  const [tenureYears, setTenureYears] = useState(5);
  const [moratoriumMonths, setMoratoriumMonths] = useState(6);

  const loanAmount = Math.max(0, projectCost - ownContribution);
  const calculation = calculateRepayment(projectCost, ownContribution, loanAmount, interestRate, tenureYears, moratoriumMonths);

  const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
            Step 5 of 8 — Financial Calculator
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-3">Understand your repayment</h1>
          <p className="text-slate-600 text-xs mt-1">
            Estimate your loan amount, own contribution, interest and monthly repayment before you apply.
          </p>
        </div>

        {/* Selected Option Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-700 uppercase">Selected Option</span>
              <h3 className="font-bold text-slate-900 text-sm">{selectedScheme.name}</h3>
            </div>
          </div>
          <div className="text-right text-xs">
            <span className="text-slate-500 block">Indicative Interest Rate</span>
            <span className="font-bold text-emerald-700 text-sm">{selectedScheme.interestRateText}</span>
          </div>
        </div>

        {/* Main Grid: Inputs vs Calculation Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Controls (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-6">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              Financing Inputs
            </h3>

            {/* Project Cost Slider */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-600 font-medium">Estimated Project Cost</span>
                <span className="font-bold text-slate-900 font-mono text-sm">{formatCurrency(projectCost)}</span>
              </div>
              <input
                type="range"
                min={100000}
                max={2000000}
                step={25000}
                value={projectCost}
                onChange={e => {
                  const val = parseInt(e.target.value);
                  setProjectCost(val);
                  setOwnContribution(Math.round(val * 0.1));
                }}
                className="w-full accent-blue-700 bg-slate-100 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Own Contribution Slider */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-600 font-medium">Own Contribution ({(ownContribution / projectCost * 100).toFixed(0)}%)</span>
                <span className="font-bold text-blue-700 font-mono text-sm">{formatCurrency(ownContribution)}</span>
              </div>
              <input
                type="range"
                min={projectCost * 0.05}
                max={projectCost * 0.35}
                step={5000}
                value={ownContribution}
                onChange={e => setOwnContribution(parseInt(e.target.value))}
                className="w-full accent-blue-700 bg-slate-100 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-600 font-medium">Annual Interest Rate</span>
                <span className="font-bold text-emerald-700 font-mono text-sm">{interestRate.toFixed(1)}% p.a.</span>
              </div>
              <input
                type="range"
                min={4.0}
                max={12.0}
                step={0.25}
                value={interestRate}
                onChange={e => setInterestRate(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 bg-slate-100 rounded-lg cursor-pointer h-2"
              />
            </div>

            {/* Tenure Buttons */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Repayment Tenure</label>
              <div className="grid grid-cols-3 gap-3">
                {[3, 5, 7].map(yrs => (
                  <button
                    key={yrs}
                    onClick={() => setTenureYears(yrs)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition border ${
                      tenureYears === yrs
                        ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {yrs} Years
                  </button>
                ))}
              </div>
            </div>

            {/* Moratorium Buttons */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Holiday Moratorium Period</label>
              <div className="grid grid-cols-3 gap-3">
                {[0, 3, 6].map(m => (
                  <button
                    key={m}
                    onClick={() => setMoratoriumMonths(m)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition border ${
                      moratoriumMonths === m
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {m === 0 ? 'No Moratorium' : `${m} Months`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Results & Visual (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Calculation Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                Estimated Repayment Results
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium block">Required Loan Amount</span>
                  <span className="font-extrabold text-xl text-slate-900 font-mono">{formatCurrency(calculation.loanAmount)}</span>
                </div>

                <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100">
                  <span className="text-[11px] text-blue-700 font-medium block">Estimated Monthly Repayment</span>
                  <span className="font-extrabold text-xl text-blue-800 font-mono">{formatCurrency(calculation.monthlyEmi)}/mo</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-600">Estimated Total Interest:</span>
                  <span className="font-bold text-amber-700">{formatCurrency(calculation.totalInterest)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-600">Estimated Total Repayment:</span>
                  <span className="font-bold text-slate-900">{formatCurrency(calculation.totalRepayment)}</span>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 text-[11px] text-slate-600 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Estimate only:</strong> Actual terms, exact processing fees, and final repayment schedules are determined by the concerned authority or Channel Partner.
                </span>
              </div>
            </div>

            {/* Repayment Chart Component */}
            <RepaymentChart calculation={calculation} />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-end pt-4">
          <button
            onClick={() => navigate('/partners')}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-700/20 flex items-center gap-2 transition transform hover:-translate-y-0.5"
          >
            <span>Find Where to Apply</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
