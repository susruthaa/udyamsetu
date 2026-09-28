export type SocialCategory = 'General' | 'SC' | 'ST' | 'OBC' | 'EWS' | 'Minority';

export type BusinessType = 'New Business' | 'Existing Business';

export type BusinessCategory = 'Manufacturing' | 'Services' | 'Trading' | 'Agriculture / Allied' | 'Food Processing' | 'Handicrafts / Artisans' | 'Other';

export type FinancingPurpose = 'Start a business' | 'Expand existing business' | 'Purchase equipment' | 'Working capital' | 'Skill / livelihood support';

export interface UserProfile {
  fullName: string;
  age: number;
  state: string;
  district: string;
  socialCategory: SocialCategory;
  businessType: BusinessType;
  businessCategory: BusinessCategory;
  annualIncome: number;
  projectCost: number;
  requiredFinancing: number;
  primaryPurpose: FinancingPurpose;
  hasRegistration?: 'Yes' | 'No' | 'In Progress' | 'Not Sure';
  gender?: 'Male' | 'Female' | 'Transgender' | 'Prefer not to say';
  isRural?: boolean;
}

export interface Scheme {
  id: string;
  name: string;
  shortName: string;
  organization: string;
  ministry?: string;
  categoryTag: string;
  description: string;
  purpose: string;
  targetBeneficiary: string;
  officialSource: string;
  applicationUrl: string;
  eligibleCategories: SocialCategory[];
  supportedStates: string[]; // ['All'] or specific states
  minAge: number;
  maxAge: number;
  minLoan: number; // in INR
  maxLoan: number; // in INR
  subsidyPercentage?: number; // e.g. 15% to 35%
  interestRateText: string;
  interestRateMin: number;
  interestRateMax: number;
  tenureYearsMin: number;
  tenureYearsMax: number;
  moratoriumMonthsMax: number;
  ageCriteriaText: string;
  genderCriteriaText: string;
  categoryCriteriaText: string;
  incomeCriteriaText: string;
  businessCriteriaText: string;
  keyConditions: string[];
  documentsRequired: string[];
  applicationRoute: string;
  partnerTypes: string[];
  verifiedDate: string;
}

export type RuleStatus = 'PASS' | 'FAIL' | 'UNKNOWN';

export interface RuleCheckResult {
  ruleId: string;
  title: string;
  status: RuleStatus;
  detail: string;
  conditionText: string;
  userInputVal?: string | number;
}

export type MatchSuitability = 'SUITABLE' | 'POTENTIALLY_SUITABLE' | 'MORE_INFO_NEEDED' | 'NOT_SUITABLE';

export interface SchemeMatchResult {
  scheme: Scheme;
  suitability: MatchSuitability;
  score: number; // 0 - 100 prototype ranking score
  ruleResults: RuleCheckResult[];
  whyMatched: string[];
  whyFailed?: string[];
  missingInfo?: string[];
}

export interface ChannelPartner {
  id: string;
  name: string;
  partnerType: 'District Lead Bank' | 'State Channelizing Agency' | 'NBFC / MFI' | 'Public Sector Bank' | 'DIC Center';
  district: string;
  state: string;
  distanceKm: number;
  address: string;
  phone: string;
  email: string;
  operatingHours: string;
  lat: number;
  lng: number;
  services: string[];
  docsAccepted: string[];
  applicationSteps: string[];
  rating: number;
}

export interface RepaymentCalculation {
  projectCost: number;
  ownContribution: number;
  loanAmount: number;
  interestRate: number;
  tenureYears: number;
  moratoriumMonths: number;
  monthlyEmi: number;
  totalInterest: number;
  totalRepayment: number;
  monthlySchedule: Array<{
    month: number;
    principalPaid: number;
    interestPaid: number;
    remainingBalance: number;
  }>;
}

export interface DocumentItem {
  id: string;
  title: string;
  badge: 'Required' | 'Conditional' | 'Recommended';
  description: string;
  whyNeeded: string;
  status: 'prepared' | 'pending' | 'not_applicable';
  formatAllowed: string;
}
