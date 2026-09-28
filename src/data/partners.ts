import { ChannelPartner } from '../types';

export const MOCK_CHANNEL_PARTNERS: ChannelPartner[] = [
  {
    id: 'partner-1',
    name: 'State Bank of India (SBI) - Main Branch & Lead Bank Office',
    partnerType: 'District Lead Bank',
    district: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    distanceKm: 2.4,
    address: 'Near Collectorate Junction, Siripuram, Visakhapatnam, Andhra Pradesh 530003',
    phone: '+91 891 256 4821',
    email: 'leadbank.vizag@sbi.co.in',
    operatingHours: ' Mon-Fri 10:00 AM - 4:00 PM',
    lat: 17.7231,
    lng: 83.3101,
    services: [
      'NSFDC Loan Portal Desk',
      'PMEGP & MUDRA Application Processing',
      'Document Pre-Verification',
      'MSME Credit Desk Counselling'
    ],
    docsAccepted: [
      'Aadhaar & PAN Card',
      'Caste Certificate',
      'DPR / Project Report',
      'Land / Lease Deed'
    ],
    applicationSteps: [
      'Step 1: Present UDYAMSETU AI summary code at Desk #4',
      'Step 2: Submit hardcopy documents for physical verification',
      'Step 3: Field verification & inspection by Bank Manager',
      'Step 4: Loan Sanction Letter issuance'
    ],
    rating: 4.8
  },
  {
    id: 'partner-2',
    name: 'AP Scheduled Castes Cooperative Finance Corp. Ltd. (APSCCFC)',
    partnerType: 'State Channelizing Agency',
    district: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    distanceKm: 4.1,
    address: 'Social Welfare Complex, MVP Colony Sector 4, Visakhapatnam, AP 530017',
    phone: '+91 891 278 1190',
    email: 'ed.apsccfc.vsp@ap.gov.in',
    operatingHours: 'Mon-Sat 10:30 AM - 5:00 PM',
    lat: 17.7412,
    lng: 83.3325,
    services: [
      'NSFDC & PM-SURAJ Direct Channelizer',
      'Government Subsidy Sanctioning',
      'Entrepreneurship Guidance & Training',
      'Category Certificate Validation'
    ],
    docsAccepted: [
      'Caste Certificate (Meeseva / Digital)',
      'Income Certificate',
      'Project Feasibility Report',
      'Bank Account Passbook Copy'
    ],
    applicationSteps: [
      'Step 1: Check eligibility with SCA Nodal Officer',
      'Step 2: Upload documents into State Social Welfare Portal',
      'Step 3: Approval by District Level Selection Committee (DLSC)',
      'Step 4: Forwarding recommendation to participating bank branch'
    ],
    rating: 4.9
  },
  {
    id: 'partner-3',
    name: 'District Industries Centre (DIC) - MSME Facilitation Cell',
    partnerType: 'DIC Center',
    district: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    distanceKm: 5.8,
    address: 'Industrial Estate, Kancharapalem, Visakhapatnam, AP 530008',
    phone: '+91 891 255 1044',
    email: 'gm.dic.vsp@ap.gov.in',
    operatingHours: 'Mon-Fri 10:00 AM - 5:00 PM',
    lat: 17.7305,
    lng: 83.2842,
    services: [
      'PMEGP Margin Money Subsidy Clearance',
      'Udyam MSME Registration Assistance',
      'Food Processing Subsidy Scheme Guidance',
      'Single Window Clearance'
    ],
    docsAccepted: [
      'Udyam Registration Certificate',
      'FSSAI License / Application Draft',
      'Machinery Purchase Quotations',
      'Aadhaar / Voter ID'
    ],
    applicationSteps: [
      'Step 1: Obtain DIC Clearance Certificate',
      'Step 2: Submit PMEGP online application reference',
      'Step 3: Interview with Task Force Committee',
      'Step 4: Bank loan sanctioning & margin release'
    ],
    rating: 4.7
  },
  {
    id: 'partner-4',
    name: 'NABARD Financial Services (NABFINS) / Regional Office',
    partnerType: 'NBFC / MFI',
    district: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    distanceKm: 7.2,
    address: 'Dwaraka Nagar 2nd Lane, Visakhapatnam, AP 530016',
    phone: '+91 891 259 8830',
    email: 'vizag@nabfins.org',
    operatingHours: 'Mon-Fri 9:30 AM - 5:30 PM',
    lat: 17.7275,
    lng: 83.3050,
    services: [
      'Micro-Enterprise Collateral-Free Financing',
      'Working Capital Loan Processing',
      'Rural Food Processing Support'
    ],
    docsAccepted: [
      'Identity & Address Proof',
      'Project Profile',
      'Bank Statement 1 Year'
    ],
    applicationSteps: [
      'Step 1: Direct application submission to NABFINS Executive',
      'Step 2: On-site business location assessment',
      'Step 3: Fast-track loan disbursement within 7 working days'
    ],
    rating: 4.6
  }
];
