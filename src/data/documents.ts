import { DocumentItem } from '../types';

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Identity Proof (Aadhaar Card / PAN Card)',
    badge: 'Required',
    description: 'Government issued Aadhaar Card or PAN Card of the primary applicant.',
    whyNeeded: 'Required for identity verification and KYC compliance under government financing frameworks.',
    status: 'prepared',
    formatAllowed: 'PDF, JPG (Max 5MB)'
  },
  {
    id: 'doc-2',
    title: 'Caste / Social Category Certificate',
    badge: 'Required',
    description: 'Valid SC / ST / OBC category certificate issued by competent state authority (e.g. Meeseva / Digital Certificate).',
    whyNeeded: 'Mandatory for targeted schemes like NSFDC Term Loan and PM-SURAJ to verify category eligibility.',
    status: 'prepared',
    formatAllowed: 'PDF (Digital Verified)'
  },
  {
    id: 'doc-3',
    title: 'Proof of Business Premises / Address',
    badge: 'Required',
    description: 'Electricity bill, property tax receipt, or registered lease deed of the business unit location.',
    whyNeeded: 'Establishes spatial jurisdiction for District Lead Bank and State Channelizing Agency routing.',
    status: 'prepared',
    formatAllowed: 'PDF, JPG'
  },
  {
    id: 'doc-4',
    title: 'Detailed Project Report (DPR) / Cost Quotation',
    badge: 'Required',
    description: 'Summary of proposed food processing unit, machinery list with vendor quotations, raw material estimates, and projected income.',
    whyNeeded: 'Used by rule checks and bank managers to evaluate project viability and loan amount requirement.',
    status: 'prepared',
    formatAllowed: 'PDF, Excel/Word'
  },
  {
    id: 'doc-5',
    title: 'Bank Account Passbook / 6-Month Bank Statement',
    badge: 'Required',
    description: 'Primary savings or current account statement showing active financial records.',
    whyNeeded: 'Assesses financial history and ensures absence of prior loan default.',
    status: 'prepared',
    formatAllowed: 'PDF (Bank Generated)'
  },
  {
    id: 'doc-6',
    title: 'Udyam Registration Certificate',
    badge: 'Conditional',
    description: 'Official MSME Udyam Registration number or draft acknowledgment.',
    whyNeeded: 'Required for PMEGP subsidy claiming and priority sector MSME lending benefits.',
    status: 'pending',
    formatAllowed: 'PDF (Udyam Portal)'
  },
  {
    id: 'doc-7',
    title: 'Food Safety License (FSSAI) / NOC Draft',
    badge: 'Recommended',
    description: 'FSSAI Registration or draft application copy for food processing activities.',
    whyNeeded: 'Recommended for food processing ventures to ensure compliance before loan release.',
    status: 'pending',
    formatAllowed: 'PDF'
  }
];
