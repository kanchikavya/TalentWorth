import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  User, 
  GitFork, 
  MapPin, 
  Flame 
} from 'lucide-react';
import { api } from '../services/api';
import { MarketDataBadge } from '../components/MarketDataBadge';
import { formatSalaryByLocation } from '../utils/currency';

interface Props {
  onNavigate: (page: string) => void;
}

export const UserDashboardPage: React.FC<Props> = ({ onNavigate }) => {
  const [twin, setTwin] = useState<any>(null);

  useEffect(() => {
    fetchTwin();
  }, []);

  const fetchTwin = async () => {
    try {
      const res = await api.getDigitalTwin();
      setTwin(res);
    } catch (e) {
      console.error(e);
    }
  };

  const userLocation = twin?.location || "Austin, TX (USA)";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-6 rounded-2xl border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Personalized Career Command Center</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="text-gradient-cyan">Alex Mercer</span>
          </h1>
          <p className="text-slate-400 text-xs">
            Role: <strong className="text-slate-200">{twin?.current_role || "Software Engineer"}</strong> | Location: <strong className="text-slate-200">{userLocation}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
          <button
            onClick={() => onNavigate("digital-twin")}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
          >
            <User className="w-4 h-4" /> Edit Digital Twin
          </button>
        </div>
      </div>

      {/* Primary Telemetry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Your Market Value</span>
          <div className="text-xl sm:text-2xl font-black text-white text-gradient-cyan">
            {formatSalaryByLocation(twin?.market_value || 114500, userLocation)}
          </div>
          <span className="text-[10px] text-emerald-400 font-medium">+18.5% Growth Potential</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Market Percentile</span>
          <div className="text-xl sm:text-2xl font-black text-purple-400">
            {twin?.market_percentile || "Top 16%"}
          </div>
          <span className="text-[10px] text-purple-300">vs {twin?.current_role || "Software Engineer"}</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Career Readiness</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-400">
            {twin?.career_readiness || 88}/100
          </div>
          <span className="text-[10px] text-slate-400">Target: {twin?.target_role || "Senior Full Stack"}</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Market Temperature</span>
          <div className="text-xl sm:text-2xl font-black text-amber-400 flex items-center gap-1">
            <Flame className="w-6 h-6 animate-pulse text-amber-400" /> Hot
          </div>
          <span className="text-[10px] text-amber-300/80">High Hiring Momentum</span>
        </div>

      </div>

      {/* Quick Launch Tools Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Career Intelligence Suite</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div 
            onClick={() => onNavigate("predictor")}
            className="glass-panel p-4 rounded-xl border-slate-800 hover:border-cyan-500/40 transition cursor-pointer space-y-2 group"
          >
            <Sparkles className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-slate-200 text-xs">AI Salary Predictor</h4>
            <p className="text-[11px] text-slate-400">Predict custom market value with skill checks.</p>
          </div>

          <div 
            onClick={() => onNavigate("pulse")}
            className="glass-panel p-4 rounded-xl border-slate-800 hover:border-cyan-500/40 transition cursor-pointer space-y-2 group"
          >
            <TrendingUp className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-slate-200 text-xs">Salary Pulse Engine</h4>
            <p className="text-[11px] text-slate-400">Search 40+ jobs & view live demand graphs.</p>
          </div>

          <div 
            onClick={() => onNavigate("skill-tree")}
            className="glass-panel p-4 rounded-xl border-slate-800 hover:border-purple-500/40 transition cursor-pointer space-y-2 group"
          >
            <GitFork className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-slate-200 text-xs">Career Skill Tree</h4>
            <p className="text-[11px] text-slate-400">View skill progression map for any job role.</p>
          </div>

          <div 
            onClick={() => onNavigate("location")}
            className="glass-panel p-4 rounded-xl border-slate-800 hover:border-emerald-500/40 transition cursor-pointer space-y-2 group"
          >
            <MapPin className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-slate-200 text-xs">Location Arbitrage</h4>
            <p className="text-[11px] text-slate-400">Compare purchasing power in local currencies.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
