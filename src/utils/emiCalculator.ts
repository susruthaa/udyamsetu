import { RepaymentCalculation } from '../types';

export function calculateRepayment(
  projectCost: number,
  ownContribution: number,
  loanAmount: number,
  interestRateAnnual: number,
  tenureYears: number,
  moratoriumMonths: number = 0
): RepaymentCalculation {
  const r = interestRateAnnual / 12 / 100;
  const totalMonths = tenureYears * 12;
  const repaymentMonths = Math.max(1, totalMonths - moratoriumMonths);

  let monthlyEmi = 0;
  if (r > 0) {
    monthlyEmi = (loanAmount * r * Math.pow(1 + r, repaymentMonths)) / (Math.pow(1 + r, repaymentMonths) - 1);
  } else {
    monthlyEmi = loanAmount / repaymentMonths;
  }

  const monthlySchedule: RepaymentCalculation['monthlySchedule'] = [];
  let balance = loanAmount;
  let accumulatedInterest = 0;

  // Moratorium Months (interest accrued/paid)
  for (let m = 1; m <= moratoriumMonths; m++) {
    const interestForMonth = balance * r;
    accumulatedInterest += interestForMonth;
    monthlySchedule.push({
      month: m,
      principalPaid: 0,
      interestPaid: Math.round(interestForMonth),
      remainingBalance: Math.round(balance)
    });
  }

  // Active Repayment Months
  for (let m = moratoriumMonths + 1; m <= totalMonths; m++) {
    const interestForMonth = balance * r;
    const principalForMonth = Math.min(balance, monthlyEmi - interestForMonth);
    balance = Math.max(0, balance - principalForMonth);
    accumulatedInterest += interestForMonth;

    monthlySchedule.push({
      month: m,
      principalPaid: Math.round(principalForMonth),
      interestPaid: Math.round(interestForMonth),
      remainingBalance: Math.round(balance)
    });
  }

  const totalInterest = Math.round(accumulatedInterest);
  const totalRepayment = Math.round(loanAmount + totalInterest);

  return {
    projectCost,
    ownContribution,
    loanAmount,
    interestRate: interestRateAnnual,
    tenureYears,
    moratoriumMonths,
    monthlyEmi: Math.round(monthlyEmi),
    totalInterest,
    totalRepayment,
    monthlySchedule
  };
}
