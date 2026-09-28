import { UserProfile, Scheme, SchemeMatchResult, RuleCheckResult } from '../types';

export function evaluateSchemeRules(profile: UserProfile, scheme: Scheme): SchemeMatchResult {
  const ruleResults: RuleCheckResult[] = [];
  const whyMatched: string[] = [];
  const whyFailed: string[] = [];
  const missingInfo: string[] = [];

  // -------------------------------------------------------------
  // Rule 1: Age Criterion Check
  // -------------------------------------------------------------
  const agePass = profile.age >= scheme.minAge && profile.age <= scheme.maxAge;
  ruleResults.push({
    ruleId: 'age_check',
    title: 'Applicant Age Eligibility',
    status: agePass ? 'PASS' : 'FAIL',
    detail: agePass
      ? `Your age (${profile.age} yrs) satisfies the required age bounds (${scheme.minAge}-${scheme.maxAge} yrs).`
      : `Your age (${profile.age} yrs) is outside the scheme's permitted age range (${scheme.minAge}-${scheme.maxAge} yrs).`,
    conditionText: scheme.ageCriteriaText || `Age between ${scheme.minAge} and ${scheme.maxAge} years`,
    userInputVal: `${profile.age} years`
  });
  if (agePass) {
    whyMatched.push(`Applicant age (${profile.age} yrs) meets scheme criteria (${scheme.minAge} to ${scheme.maxAge} years).`);
  } else {
    whyFailed.push(`Age ${profile.age} yrs does not meet scheme age bounds (${scheme.minAge}-${scheme.maxAge} yrs).`);
  }

  // -------------------------------------------------------------
  // Rule 2: Social Category Eligibility Check
  // -------------------------------------------------------------
  const isCategorySupported =
    scheme.eligibleCategories.includes(profile.socialCategory) ||
    scheme.eligibleCategories.includes('General'); // General implies open to all

  ruleResults.push({
    ruleId: 'category_check',
    title: 'Social Category Eligibility',
    status: isCategorySupported ? 'PASS' : 'FAIL',
    detail: isCategorySupported
      ? `Your category (${profile.socialCategory}) is eligible under this scheme.`
      : `This scheme is specifically designated for ${scheme.eligibleCategories.join(', ')} category applicants.`,
    conditionText: scheme.categoryCriteriaText || `Eligible Categories: ${scheme.eligibleCategories.join(', ')}`,
    userInputVal: profile.socialCategory
  });
  if (isCategorySupported) {
    whyMatched.push(`Category (${profile.socialCategory}) matches eligible target categories.`);
  } else {
    whyFailed.push(`Scheme requires category ${scheme.eligibleCategories.join(', ')} (you selected ${profile.socialCategory}).`);
  }

  // -------------------------------------------------------------
  // Rule 3: Financing Amount Range Check
  // -------------------------------------------------------------
  const reqFin = profile.requiredFinancing;
  const isAmountPass = reqFin >= scheme.minLoan && reqFin <= scheme.maxLoan;
  ruleResults.push({
    ruleId: 'amount_check',
    title: 'Loan Amount Range Compatibility',
    status: isAmountPass ? 'PASS' : 'FAIL',
    detail: isAmountPass
      ? `Your requested financing (₹${reqFin.toLocaleString('en-IN')}) is within the scheme range (₹${scheme.minLoan.toLocaleString('en-IN')} to ₹${scheme.maxLoan.toLocaleString('en-IN')}).`
      : reqFin < scheme.minLoan
      ? `Requested loan (₹${reqFin.toLocaleString('en-IN')}) is below the minimum scheme limit (₹${scheme.minLoan.toLocaleString('en-IN')}).`
      : `Requested loan (₹${reqFin.toLocaleString('en-IN')}) exceeds maximum scheme ceiling (₹${scheme.maxLoan.toLocaleString('en-IN')}).`,
    conditionText: `Loan amount between ₹${(scheme.minLoan / 100000).toFixed(1)}L and ₹${(scheme.maxLoan / 100000).toFixed(1)}L`,
    userInputVal: `₹${reqFin.toLocaleString('en-IN')}`
  });
  if (isAmountPass) {
    whyMatched.push(`Requested loan amount (₹${reqFin.toLocaleString('en-IN')}) is within scheme limits.`);
  } else {
    whyFailed.push(`Requested loan ₹${reqFin.toLocaleString('en-IN')} is outside permitted bounds (₹${scheme.minLoan.toLocaleString('en-IN')} - ₹${scheme.maxLoan.toLocaleString('en-IN')}).`);
  }

  // -------------------------------------------------------------
  // Rule 4: Business Sector & Stage Check
  // -------------------------------------------------------------
  const isManufacturingOnly = scheme.id === 'pmegp-scheme' && profile.projectCost > 2000000 && profile.businessCategory !== 'Manufacturing';
  const isPurposeSupported = !isManufacturingOnly;
  
  ruleResults.push({
    ruleId: 'purpose_check',
    title: 'Business Sector & Stage Compatibility',
    status: isPurposeSupported ? 'PASS' : 'FAIL',
    detail: isPurposeSupported
      ? `Your sector (${profile.businessCategory}) and stage (${profile.businessType}) match the scheme scope.`
      : `Projects above ₹20 Lakh under PMEGP require manufacturing sector units.`,
    conditionText: scheme.businessCriteriaText || `Supported for ${profile.businessCategory} (${profile.businessType})`,
    userInputVal: `${profile.businessCategory} — ${profile.primaryPurpose}`
  });
  if (isPurposeSupported) {
    whyMatched.push(`Business sector (${profile.businessCategory}) and purpose (${profile.primaryPurpose}) align with scheme objectives.`);
  } else {
    whyFailed.push(`Sector ${profile.businessCategory} is not eligible for the requested loan ceiling under this scheme.`);
  }

  // -------------------------------------------------------------
  // Rule 5: Geographic / Location Coverage Check
  // -------------------------------------------------------------
  const isStateSupported = scheme.supportedStates.includes('All') || scheme.supportedStates.includes(profile.state);
  ruleResults.push({
    ruleId: 'location_check',
    title: 'State & Geographic Coverage',
    status: isStateSupported ? 'PASS' : 'FAIL',
    detail: isStateSupported
      ? `Scheme operates actively in your state (${profile.state}).`
      : `Scheme is not currently available in ${profile.state}.`,
    conditionText: `Active in ${profile.state}`,
    userInputVal: `${profile.district || 'District'}, ${profile.state}`
  });
  if (isStateSupported) {
    whyMatched.push(`Location (${profile.state}) is covered under national/state rollout.`);
  } else {
    whyFailed.push(`Scheme is not active in ${profile.state}.`);
  }

  // -------------------------------------------------------------
  // Rule 6: Annual Family Income Verification Check
  // -------------------------------------------------------------
  let incomeStatus: 'PASS' | 'FAIL' | 'UNKNOWN' = 'UNKNOWN';
  let incomeDetail = 'Annual family income requires verification against official income certificate / IT returns.';
  
  if (profile.annualIncome > 0) {
    if (scheme.incomeCriteriaText.toLowerCase().includes('no upper') || profile.annualIncome <= 800000) {
      incomeStatus = 'PASS';
      incomeDetail = `Stated annual family income (₹${profile.annualIncome.toLocaleString('en-IN')}) satisfies scheme criteria.`;
      whyMatched.push(`Stated income (₹${profile.annualIncome.toLocaleString('en-IN')}) is within eligible bounds.`);
    } else {
      incomeStatus = 'FAIL';
      incomeDetail = `Stated annual family income (₹${profile.annualIncome.toLocaleString('en-IN')}) exceeds the ceiling limit for concessional benefit.`;
      whyFailed.push(`Annual income ₹${profile.annualIncome.toLocaleString('en-IN')} exceeds concessional threshold.`);
    }
  } else {
    incomeStatus = 'UNKNOWN';
    missingInfo.push('Please provide your verified annual family income certificate details.');
  }

  ruleResults.push({
    ruleId: 'income_check',
    title: 'Annual Income Verification',
    status: incomeStatus,
    detail: incomeDetail,
    conditionText: scheme.incomeCriteriaText || 'Income certificate / Income tax return required',
    userInputVal: profile.annualIncome > 0 ? `₹${profile.annualIncome.toLocaleString('en-IN')}` : 'Not provided'
  });

  // -------------------------------------------------------------
  // Rule 7: Business Registration Status Check
  // -------------------------------------------------------------
  if (!profile.hasRegistration || profile.hasRegistration === 'Not Sure') {
    ruleResults.push({
      ruleId: 'registration_check',
      title: 'Udyam Registration Status',
      status: 'UNKNOWN',
      detail: 'Udyam MSME Registration status needs to be verified before final sanction.',
      conditionText: 'Free Udyam Registration (udyamregistration.gov.in) required prior to loan release',
      userInputVal: profile.hasRegistration || 'Pending verification'
    });
    missingInfo.push('Udyam MSME registration status needs to be verified.');
  } else {
    ruleResults.push({
      ruleId: 'registration_check',
      title: 'Udyam Registration Status',
      status: 'PASS',
      detail: `Business registration status verified as ${profile.hasRegistration}.`,
      conditionText: 'Udyam MSME Registration verified',
      userInputVal: profile.hasRegistration
    });
    whyMatched.push(`Udyam MSME registration status verified as ${profile.hasRegistration}.`);
  }

  // Calculate deterministically
  const passCount = ruleResults.filter(r => r.status === 'PASS').length;
  const failCount = ruleResults.filter(r => r.status === 'FAIL').length;
  const totalRules = ruleResults.length;

  // Determine suitability cleanly
  let suitability: SchemeMatchResult['suitability'] = 'SUITABLE';
  if (failCount >= 2) {
    suitability = 'NOT_SUITABLE';
  } else if (failCount === 1) {
    suitability = 'POTENTIALLY_SUITABLE';
  } else if (missingInfo.length > 0) {
    suitability = 'MORE_INFO_NEEDED';
  } else {
    suitability = 'SUITABLE';
  }

  // Deterministic rule score (0-100) based on pass ratio without fake claims
  const calculatedScore = Math.round((passCount / totalRules) * 100);

  return {
    scheme,
    suitability,
    score: calculatedScore,
    ruleResults,
    whyMatched,
    whyFailed,
    missingInfo
  };
}

export function evaluateAllSchemes(profile: UserProfile, schemes: Scheme[]): SchemeMatchResult[] {
  return schemes
    .map(scheme => evaluateSchemeRules(profile, scheme))
    .sort((a, b) => b.score - a.score);
}
