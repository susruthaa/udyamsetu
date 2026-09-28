import React, { createContext, useContext, useState } from 'react';
import { UserProfile, Scheme, ChannelPartner, DocumentItem, SchemeMatchResult } from '../types';
import { DEMO_USER_PROFILE, INITIAL_CHAT_MESSAGES } from '../data/demoProfile';
import { MOCK_SCHEMES } from '../data/schemes';
import { MOCK_CHANNEL_PARTNERS } from '../data/partners';
import { INITIAL_DOCUMENTS } from '../data/documents';
import { evaluateAllSchemes, evaluateSchemeRules } from '../utils/ruleEngine';

export type LanguageOption = 'English' | 'తెలుగు' | 'हिन्दी';

interface JourneyContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  loadDemoProfile: () => void;

  schemes: Scheme[];
  evaluatedSchemes: SchemeMatchResult[];
  selectedScheme: Scheme;
  setSelectedScheme: (scheme: Scheme) => void;

  channelPartners: ChannelPartner[];
  selectedPartner: ChannelPartner;
  setSelectedPartner: (partner: ChannelPartner) => void;

  documents: DocumentItem[];
  toggleDocumentStatus: (docId: string) => void;

  chatMessages: Array<{ id: string; sender: 'ai' | 'user'; text: string; timestamp: string }>;
  addChatMessage: (text: string, sender: 'ai' | 'user') => void;

  language: LanguageOption;
  setLanguage: (lang: LanguageOption) => void;

  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;

  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export const JourneyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(DEMO_USER_PROFILE);
  const [schemes] = useState<Scheme[]>(MOCK_SCHEMES);
  const [selectedScheme, setSelectedScheme] = useState<Scheme>(MOCK_SCHEMES[0]); // NSFDC Term Loan
  const [channelPartners] = useState<ChannelPartner[]>(MOCK_CHANNEL_PARTNERS);
  const [selectedPartner, setSelectedPartner] = useState<ChannelPartner>(MOCK_CHANNEL_PARTNERS[0]);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT_MESSAGES);
  const [language, setLanguage] = useState<LanguageOption>('English');
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [activeTab, setActiveTab] = useState('landing');

  const evaluatedSchemes = evaluateAllSchemes(profile, schemes);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => {
      const next = { ...prev, ...updates };
      // update required financing default if project cost changes
      if (updates.projectCost && !updates.requiredFinancing) {
        next.requiredFinancing = Math.round(updates.projectCost * 0.9);
      }
      return next;
    });
  };

  const loadDemoProfile = () => {
    setProfile(DEMO_USER_PROFILE);
    setSelectedScheme(MOCK_SCHEMES[0]);
    setSelectedPartner(MOCK_CHANNEL_PARTNERS[0]);
    setDocuments(INITIAL_DOCUMENTS);
    setChatMessages(INITIAL_CHAT_MESSAGES);
    setIsDemoMode(true);
  };

  const toggleDocumentStatus = (docId: string) => {
    setDocuments(prev =>
      prev.map(d => {
        if (d.id === docId) {
          const nextStatus = d.status === 'prepared' ? 'pending' : 'prepared';
          return { ...d, status: nextStatus };
        }
        return d;
      })
    );
  };

  const addChatMessage = (text: string, sender: 'ai' | 'user') => {
    const newMsg = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  return (
    <JourneyContext.Provider
      value={{
        profile,
        updateProfile,
        loadDemoProfile,
        schemes,
        evaluatedSchemes,
        selectedScheme,
        setSelectedScheme,
        channelPartners,
        selectedPartner,
        setSelectedPartner,
        documents,
        toggleDocumentStatus,
        chatMessages,
        addChatMessage,
        language,
        setLanguage,
        isDemoMode,
        setIsDemoMode,
        activeTab,
        setActiveTab
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
};

export const useJourney = () => {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
};
