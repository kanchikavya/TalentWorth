import React from 'react';
import { 
  TrendingUp, 
  Sliders, 
  GitFork, 
  Building2, 
  MessageSquareCode, 
  AlertTriangle, 
  ShieldAlert, 
  User,
  Sparkles,
  Award,
  GraduationCap,
  LogOut,
  LogIn,
  Globe,
  Target
} from 'lucide-react';
import { MarketDataBadge } from './MarketDataBadge';
import { LocationSearchSelect } from './LocationSearchSelect';
import { useLocationContext } from '../context/LocationContext';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: { id?: number; email: string; full_name: string } | null;
  onLogout: () => void;
}

export const Navbar: React.FC<Props> = ({ activeTab, setActiveTab, currentUser, onLogout }) => {
  const { globalLocation, setGlobalLocation, currencyConfig } = useLocationContext();

  const mainNav = [
    { id: 'matcher', label: 'Skill-to-Role Matcher', icon: Target },
    { id: 'degree-advisor', label: 'Degree Advisor & Suggestions', icon: GraduationCap },
    { id: 'digital-twin', label: 'Digital Twin', icon: User },
    { id: 'predictor', label: 'AI Predictor', icon: Sparkles },
    { id: 'simulator', label: 'What-If Simulator', icon: Sliders },
    { id: 'pulse', label: 'Salary Pulse', icon: TrendingUp },
    { id: 'skill-tree', label: 'Skill Tree', icon: GitFork },
    { id: 'roi', label: 'Career ROI', icon: Award },
    { id: 'company', label: 'Companies', icon: Building2 },
    { id: 'negotiator', label: 'AI Negotiator', icon: MessageSquareCode },
    { id: 'shocks', label: 'Market Shocks', icon: AlertTriangle },
    { id: 'radar', label: 'Obsolescence Radar', icon: ShieldAlert }
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-2.5 md:py-0 md:h-16 gap-3 md:gap-0">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white">Talent<span className="text-gradient-cyan">Worth</span></span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">AI 2.0</span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">Live Career Market Intelligence</p>
            </div>
          </div>

          {/* Right Global Location, Currency & Profile Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Site-Wide Global Location Selector */}
            <div className="w-48 sm:w-56">
              <LocationSearchSelect
                value={globalLocation}
                onChange={(loc) => setGlobalLocation(loc)}
              />
            </div>

            {/* Currency Pill */}
            <span className="text-xs px-2.5 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono font-bold flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              {currencyConfig.code} ({currencyConfig.symbol})
            </span>

            <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
            
            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1.5 pr-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-black text-slate-950 text-xs">
                  {(currentUser.full_name || "User").charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-slate-200 leading-tight">{currentUser.full_name || "Kanchana"}</p>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-1 text-slate-400 hover:text-red-400 transition ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('login')}
                className="px-3 py-1.5 rounded-xl text-xs font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Horizontal Scrollable Nav Links */}
        <div className="flex items-center space-x-1 overflow-x-auto py-2 no-scrollbar border-t border-slate-800/40 text-xs">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
