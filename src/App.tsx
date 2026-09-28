import React, { useState, useEffect } from 'react';
import { JourneyProvider, useJourney } from './context/JourneyContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProgressStepper } from './components/ProgressStepper';

import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { ProfilePage } from './pages/ProfilePage';
import { EligibilityPage } from './pages/EligibilityPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { SchemeDetailPage } from './pages/SchemeDetailPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { PartnersPage } from './pages/PartnersPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { ApplicationPage } from './pages/ApplicationPage';
import { DashboardPage } from './pages/DashboardPage';

const AppContent: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.hash ? window.location.hash.replace('#', '') : '/';
  });

  const { loadDemoProfile } = useJourney();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentRoute(hash || '/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: string) => {
    window.location.hash = route;
    setCurrentRoute(route);
    window.scrollTo(0, 0);
  };

  // Determine current step index for ProgressStepper when inside active financing journey
  const getStepIndex = (route: string) => {
    if (route.startsWith('/onboarding')) return 0;
    if (route.startsWith('/profile')) return 1;
    if (route.startsWith('/eligibility')) return 2;
    if (route.startsWith('/recommendations') || route.startsWith('/scheme')) return 3;
    if (route.startsWith('/calculator')) return 4;
    if (route.startsWith('/partners')) return 5;
    if (route.startsWith('/documents')) return 6;
    if (route.startsWith('/application')) return 7;
    return -1;
  };

  const currentStepIdx = getStepIndex(currentRoute);

  const renderPage = () => {
    if (currentRoute === '/' || currentRoute === '') {
      return <LandingPage navigate={navigate} loadDemoProfile={loadDemoProfile} />;
    }
    if (currentRoute === '/about') {
      return <AboutPage navigate={navigate} />;
    }
    if (currentRoute === '/how-it-works') {
      return <HowItWorksPage navigate={navigate} />;
    }
    if (currentRoute === '/onboarding') {
      return <OnboardingPage navigate={navigate} />;
    }
    if (currentRoute === '/profile') {
      return <ProfilePage navigate={navigate} />;
    }
    if (currentRoute === '/eligibility') {
      return <EligibilityPage navigate={navigate} />;
    }
    if (currentRoute === '/recommendations') {
      return <RecommendationsPage navigate={navigate} />;
    }
    if (currentRoute.startsWith('/scheme')) {
      return <SchemeDetailPage navigate={navigate} />;
    }
    if (currentRoute === '/calculator') {
      return <CalculatorPage navigate={navigate} />;
    }
    if (currentRoute === '/partners') {
      return <PartnersPage navigate={navigate} />;
    }
    if (currentRoute === '/documents') {
      return <DocumentsPage navigate={navigate} />;
    }
    if (currentRoute === '/application') {
      return <ApplicationPage navigate={navigate} />;
    }
    if (currentRoute === '/dashboard') {
      return <DashboardPage navigate={navigate} />;
    }

    return <LandingPage navigate={navigate} loadDemoProfile={loadDemoProfile} />;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      <Navbar currentRoute={currentRoute} navigate={navigate} />

      {/* Show Progress Stepper when inside active financing journey */}
      {currentStepIdx >= 0 && (
        <ProgressStepper currentStepIndex={currentStepIdx} navigate={navigate} />
      )}

      <main className="flex-1">{renderPage()}</main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <JourneyProvider>
      <AppContent />
    </JourneyProvider>
  );
}
