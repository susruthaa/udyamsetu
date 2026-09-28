import { UserProfile } from '../types';

export const DEMO_USER_PROFILE: UserProfile = {
  fullName: 'Ravi Kumar',
  age: 32,
  state: 'Andhra Pradesh',
  district: 'Visakhapatnam',
  socialCategory: 'SC',
  businessType: 'New Business',
  businessCategory: 'Food Processing',
  annualIncome: 180000,
  projectCost: 500000,
  requiredFinancing: 450000,
  primaryPurpose: 'Start a business',
  hasRegistration: 'In Progress',
  gender: 'Male',
  isRural: true,
};

export const INITIAL_CHAT_MESSAGES = [
  {
    id: '1',
    sender: 'ai' as const,
    text: 'Namaste Ravi! Welcome to UDYAMSETU AI. I will help identify financing routes and schemes that match your profile and business needs.',
    timestamp: '10:00 AM',
  },
  {
    id: '2',
    sender: 'user' as const,
    text: 'I want around ₹5 lakh to start a small food processing unit in Visakhapatnam, Andhra Pradesh.',
    timestamp: '10:01 AM',
  },
  {
    id: '3',
    sender: 'ai' as const,
    text: 'Got it! I understand that you are looking for approximately ₹5,00,000 to set up a new Food Processing unit in Visakhapatnam, Andhra Pradesh.',
    timestamp: '10:01 AM',
  },
];
