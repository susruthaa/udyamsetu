import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { RepaymentCalculation } from '../types';

interface RepaymentChartProps {
  calculation: RepaymentCalculation;
}

export const RepaymentChart: React.FC<RepaymentChartProps> = ({ calculation }) => {
  const data = [
    { name: 'Own Contribution', value: calculation.ownContribution, color: '#059669' }, // Emerald Green
    { name: 'Loan Principal', value: calculation.loanAmount, color: '#1d4ed8' }, // Official Blue
    { name: 'Estimated Interest', value: calculation.totalInterest, color: '#d97706' }, // Amber
  ];

  const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 text-slate-800 shadow-md">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-base text-slate-900">Project Financing Breakdown</h3>
          <p className="text-xs text-slate-500">Ratio of Own Funds, Loan Amount & Interest</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
          Total Project: {formatCurrency(calculation.projectCost)}
        </span>
      </div>

      <div className="h-64 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any) => formatCurrency(Number(value || 0))}
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', color: '#0f172a', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span className="text-xs font-semibold text-slate-700">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Amortization Highlights */}
      <div className="grid grid-cols-3 gap-3 text-center mt-2 pt-4 border-t border-slate-100 text-xs">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <span className="text-slate-500 text-[11px] font-medium block">Own Fund</span>
          <span className="font-bold text-emerald-700 text-sm">{formatCurrency(calculation.ownContribution)}</span>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <span className="text-slate-500 text-[11px] font-medium block">Loan Borrowed</span>
          <span className="font-bold text-blue-700 text-sm">{formatCurrency(calculation.loanAmount)}</span>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <span className="text-slate-500 text-[11px] font-medium block">Interest ({calculation.tenureYears} yrs)</span>
          <span className="font-bold text-amber-700 text-sm">{formatCurrency(calculation.totalInterest)}</span>
        </div>
      </div>
    </div>
  );
};
