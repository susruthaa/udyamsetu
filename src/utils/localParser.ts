import { UserProfile, SocialCategory, BusinessCategory, FinancingPurpose, BusinessType } from '../types';

export interface ParseResult {
  updatedProfile: UserProfile;
  extractedFields: Array<{ field: string; value: string; rawMatch: string }>;
  parsedSummary: string;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Telangana', 'Tamil Nadu', 'Karnataka', 'Kerala',
  'Maharashtra', 'Gujarat', 'Uttar Pradesh', 'Bihar', 'West Bengal',
  'Rajasthan', 'Madhya Pradesh', 'Delhi', 'Punjab', 'Haryana',
  'Odisha', 'Assam', 'Jharkhand', 'Chhattisgarh', 'Uttarakhand'
];

export function parseNaturalLanguageProfile(text: string, currentProfile: UserProfile): ParseResult {
  const input = text.toLowerCase();
  const extracted: Array<{ field: string; value: string; rawMatch: string }> = [];
  const updates: Partial<UserProfile> = {};

  // 1. Extract Age
  const ageMatch = input.match(/\b(\d{1,2})\s*(?:year|yr|years|yrs)?\s*(?:old)?\b/) ||
                   input.match(/\bage\s*(?:of|:)?\s*(\d{1,2})\b/);
  if (ageMatch) {
    const parsedAge = parseInt(ageMatch[1]);
    if (parsedAge >= 14 && parsedAge <= 90) {
      updates.age = parsedAge;
      extracted.push({ field: 'Age', value: `${parsedAge} years`, rawMatch: ageMatch[0] });
    }
  }

  // 2. Extract Gender
  if (/\b(woman|female|lady|women)\b/.test(input)) {
    updates.gender = 'Female';
    extracted.push({ field: 'Gender', value: 'Female', rawMatch: 'woman/female' });
  } else if (/\b(man|male|gentleman|men)\b/.test(input)) {
    updates.gender = 'Male';
    extracted.push({ field: 'Gender', value: 'Male', rawMatch: 'man/male' });
  } else if (/\b(transgender|trans)\b/.test(input)) {
    updates.gender = 'Transgender';
    extracted.push({ field: 'Gender', value: 'Transgender', rawMatch: 'transgender' });
  }

  // 3. Extract State
  for (const state of INDIAN_STATES) {
    if (input.includes(state.toLowerCase())) {
      updates.state = state;
      extracted.push({ field: 'State', value: state, rawMatch: state });
      break;
    }
  }

  // 4. Extract Social Category
  if (/\b(sc|scheduled caste)\b/.test(input)) {
    updates.socialCategory = 'SC';
    extracted.push({ field: 'Social Category', value: 'SC (Scheduled Caste)', rawMatch: 'SC' });
  } else if (/\b(st|scheduled tribe)\b/.test(input)) {
    updates.socialCategory = 'ST';
    extracted.push({ field: 'Social Category', value: 'ST (Scheduled Tribe)', rawMatch: 'ST' });
  } else if (/\b(obc|other backward)\b/.test(input)) {
    updates.socialCategory = 'OBC';
    extracted.push({ field: 'Social Category', value: 'OBC', rawMatch: 'OBC' });
  } else if (/\b(minority|muslim|christian|sikh|jain)\b/.test(input)) {
    updates.socialCategory = 'Minority';
    extracted.push({ field: 'Social Category', value: 'Minority', rawMatch: 'Minority' });
  } else if (/\b(ews|economically weaker)\b/.test(input)) {
    updates.socialCategory = 'EWS';
    extracted.push({ field: 'Social Category', value: 'EWS', rawMatch: 'EWS' });
  } else if (/\b(general|gen|unreserved)\b/.test(input)) {
    updates.socialCategory = 'General';
    extracted.push({ field: 'Social Category', value: 'General', rawMatch: 'General' });
  }

  // 5. Extract Loan Amount
  // Matches e.g. "3 lakh", "3.5 lakhs", "500000", "50 thousand", "10L", "₹5,00,000"
  let parsedAmount: number | null = null;

  const lakhMatch = input.match(/(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(?:lakh|lakhs|lac|lacs|l\b)/);
  const thousandMatch = input.match(/(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(?:thousand|k\b)/);
  const croreMatch = input.match(/(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(?:crore|crores|cr\b)/);
  const directAmountMatch = input.match(/(?:₹|rs\.?|inr)\s*(\d[\d,]{3,7})/);

  if (lakhMatch) {
    parsedAmount = Math.round(parseFloat(lakhMatch[1]) * 100000);
    extracted.push({ field: 'Required Loan', value: `₹${parsedAmount.toLocaleString('en-IN')}`, rawMatch: lakhMatch[0] });
  } else if (thousandMatch) {
    parsedAmount = Math.round(parseFloat(thousandMatch[1]) * 1000);
    extracted.push({ field: 'Required Loan', value: `₹${parsedAmount.toLocaleString('en-IN')}`, rawMatch: thousandMatch[0] });
  } else if (croreMatch) {
    parsedAmount = Math.round(parseFloat(croreMatch[1]) * 10000000);
    extracted.push({ field: 'Required Loan', value: `₹${parsedAmount.toLocaleString('en-IN')}`, rawMatch: croreMatch[0] });
  } else if (directAmountMatch) {
    parsedAmount = parseInt(directAmountMatch[1].replace(/,/g, ''));
    extracted.push({ field: 'Required Loan', value: `₹${parsedAmount.toLocaleString('en-IN')}`, rawMatch: directAmountMatch[0] });
  }

  if (parsedAmount && parsedAmount > 0) {
    updates.requiredFinancing = parsedAmount;
    updates.projectCost = Math.round(parsedAmount * 1.15); // Default estimated project cost
  }

  // 6. Extract Business Category / Sector
  if (/\b(tailor|tailoring|garment|cloth|apparel|textile|weaving|stitch)\b/.test(input)) {
    updates.businessCategory = 'Manufacturing';
    extracted.push({ field: 'Business Sector', value: 'Manufacturing (Tailoring & Garments)', rawMatch: 'tailoring/garment' });
  } else if (/\b(food|restaurant|bakery|snack|dairy|canteen|catering|spices|pickle)\b/.test(input)) {
    updates.businessCategory = 'Food Processing';
    extracted.push({ field: 'Business Sector', value: 'Food Processing', rawMatch: 'food/processing' });
  } else if (/\b(shop|retail|store|trading|kirana|merchant|grocery|wholesaler)\b/.test(input)) {
    updates.businessCategory = 'Trading';
    extracted.push({ field: 'Business Sector', value: 'Trading / Retail', rawMatch: 'shop/trading' });
  } else if (/\b(workshop|repair|service|salon|beauty|mechanic|it|cyber)\b/.test(input)) {
    updates.businessCategory = 'Services';
    extracted.push({ field: 'Business Sector', value: 'Services', rawMatch: 'service/repair' });
  } else if (/\b(artisan|handicraft|pottery|carpenter|blacksmith|goldsmith|sculpture)\b/.test(input)) {
    updates.businessCategory = 'Handicrafts / Artisans';
    extracted.push({ field: 'Business Sector', value: 'Handicrafts / Artisans', rawMatch: 'handicraft/artisan' });
  } else if (/\b(farm|agriculture|poultry|dairy farm|fishery|goat|cattle)\b/.test(input)) {
    updates.businessCategory = 'Agriculture / Allied';
    extracted.push({ field: 'Business Sector', value: 'Agriculture / Allied', rawMatch: 'agriculture/farming' });
  }

  // 7. Extract Business Stage / Type
  if (/\b(start|new|setup|launch|begin|open|create)\b/.test(input)) {
    updates.businessType = 'New Business';
    extracted.push({ field: 'Business Stage', value: 'New Business', rawMatch: 'start/setup' });
  } else if (/\b(expand|existing|grow|scale|upgrade|increase)\b/.test(input)) {
    updates.businessType = 'Existing Business';
    extracted.push({ field: 'Business Stage', value: 'Existing Business', rawMatch: 'expand/existing' });
  }

  // 8. Extract Purpose
  if (/\b(equipment|machine|machinery|tools|vehicle)\b/.test(input)) {
    updates.primaryPurpose = 'Purchase equipment';
    extracted.push({ field: 'Financing Purpose', value: 'Purchase equipment', rawMatch: 'equipment/machinery' });
  } else if (/\b(working capital|raw material|inventory|daily expense)\b/.test(input)) {
    updates.primaryPurpose = 'Working capital';
    extracted.push({ field: 'Financing Purpose', value: 'Working capital', rawMatch: 'working capital' });
  } else if (/\b(skill|training|livelihood)\b/.test(input)) {
    updates.primaryPurpose = 'Skill / livelihood support';
    extracted.push({ field: 'Financing Purpose', value: 'Skill / livelihood support', rawMatch: 'skill/livelihood' });
  } else if (updates.businessType === 'New Business') {
    updates.primaryPurpose = 'Start a business';
    extracted.push({ field: 'Financing Purpose', value: 'Start a business', rawMatch: 'new business setup' });
  } else if (updates.businessType === 'Existing Business') {
    updates.primaryPurpose = 'Expand existing business';
    extracted.push({ field: 'Financing Purpose', value: 'Expand existing business', rawMatch: 'expansion' });
  }

  const updatedProfile: UserProfile = { ...currentProfile, ...updates };

  const summary = extracted.length > 0
    ? `Extracted ${extracted.length} field(s): ${extracted.map(e => `${e.field}: ${e.value}`).join(', ')}.`
    : `Could not auto-extract specific fields. Please fill in the details manually.`;

  return {
    updatedProfile,
    extractedFields: extracted,
    parsedSummary: summary
  };
}
