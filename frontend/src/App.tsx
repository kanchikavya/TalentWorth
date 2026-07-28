import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LocationProvider } from './context/LocationContext';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { SalaryPredictorPage } from './pages/SalaryPredictorPage';
import { SalaryPulsePage } from './pages/SalaryPulsePage';
import { WhatIfSimulatorPage } from './pages/WhatIfSimulatorPage';
import { SkillTreePage } from './pages/SkillTreePage';
import { CareerRoiPage } from './pages/CareerRoiPage';
import { SalaryWeatherPage } from './pages/SalaryWeatherPage';
import { CompanyHeatmapPage } from './pages/CompanyHeatmapPage';
import { NegotiationAiPage } from './pages/NegotiationAiPage';
import { MarketShockDetectorPage } from './pages/MarketShockDetectorPage';
import { SkillObsolescencePage } from './pages/SkillObsolescencePage';
import { DegreeAdvisorPage } from './pages/DegreeAdvisorPage';
import { SkillRoleMatcherPage } from './pages/SkillRoleMatcherPage';
import { LoginPage } from './pages/LoginPage';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [currentUser, setCurrentUser] = useState<{ id?: number; email: string; full_name: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("talent_worth_user");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    } else {
      const defaultUser = { id: 1, email: "kanchana@talentworth.io", full_name: "Kanchana" };
      setCurrentUser(defaultUser);
      localStorage.setItem("talent_worth_user", JSON.stringify(defaultUser));
    }
  }, []);

  const handleLoginSuccess = (user: { id?: number; email: string; full_name: string }) => {
    setCurrentUser(user);
    setActiveTab('digital-twin');
  };

  const handleLogout = () => {
    localStorage.removeItem("talent_worth_user");
    localStorage.removeItem("talent_worth_token");
    setCurrentUser(null);
    setActiveTab('login');
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage onNavigate={setActiveTab} />;
      case 'login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      case 'matcher':
        return <SkillRoleMatcherPage onNavigate={setActiveTab} />;
      case 'degree-advisor':
        return <DegreeAdvisorPage />;
      case 'digital-twin':
        return <DigitalTwinPage />;
      case 'predictor':
        return <SalaryPredictorPage />;
      case 'pulse':
        return <SalaryPulsePage />;
      case 'simulator':
        return <WhatIfSimulatorPage />;
      case 'skill-tree':
        return <SkillTreePage />;
      case 'roi':
        return <CareerRoiPage />;
      case 'weather':
        return <SalaryWeatherPage />;
      case 'company':
        return <CompanyHeatmapPage />;
      case 'negotiator':
        return <NegotiationAiPage />;
      case 'shocks':
        return <MarketShockDetectorPage />;
      case 'radar':
        return <SkillObsolescencePage />;
      default:
        return <LandingPage onNavigate={setActiveTab} />;
    }
  };

  return (
    <LocationProvider>
      <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          currentUser={currentUser}
          onLogout={handleLogout}
        />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </LocationProvider>
  );
}

export default App;
