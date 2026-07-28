import React from 'react';
import { Sun, CloudSun, CloudRain } from 'lucide-react';
import { MarketDataBadge } from '../components/MarketDataBadge';

export const SalaryWeatherPage: React.FC = () => {
  const rolesWeather = [
    {
      role: "AI Engineer",
      status: "☀️ Sunny Market",
      temp: "High Demand",
      icon: Sun,
      color: "text-amber-400",
      bg: "border-amber-500/30 bg-amber-500/5",
      desc: "Salaries expanding rapidly (+18.2% in 6m). High employer competition for candidate shortlist.",
      momentum: "+28%",
      active: "18,400 postings"
    },
    {
      role: "Software Engineer",
      status: "☀️ Sunny Market",
      temp: "High Demand",
      icon: Sun,
      color: "text-amber-400",
      bg: "border-amber-500/30 bg-amber-500/5",
      desc: "Robust hiring momentum (+14.5%). Strong demand for full-stack and cloud-native developers.",
      momentum: "+14.5%",
      active: "42,500 postings"
    },
    {
      role: "Frontend Developer",
      status: "🌤️ Stable Market",
      temp: "Moderate Demand",
      icon: CloudSun,
      color: "text-cyan-400",
      bg: "border-cyan-500/30 bg-cyan-500/5",
      desc: "Steady market conditions (+4.1% in 6m). High value placed on TypeScript and React performance optimization.",
      momentum: "+8.2%",
      active: "29,100 postings"
    },
    {
      role: "Legacy Maintenance Dev",
      status: "🌧️ Cooling Market",
      temp: "Declining Signal",
      icon: CloudRain,
      color: "text-blue-400",
      bg: "border-blue-500/30 bg-blue-500/5",
      desc: "Job posting volume down (-14%). Upskilling to modern cloud & API stacks highly recommended.",
      momentum: "-5.2%",
      active: "4,200 postings"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
            <Sun className="w-4 h-4" />
            <span>Playful Market Climate Visualization</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Salary <span className="text-gradient-purple">Weather</span> Dashboard
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Evaluates job posting volume, hiring velocity, and compensation momentum into market weather forecasts.
          </p>
        </div>
        <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
      </div>

      {/* Weather Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rolesWeather.map((w) => {
          const Icon = w.icon;
          return (
            <div 
              key={w.role}
              className={`glass-panel p-6 rounded-2xl border ${w.bg} space-y-4 glass-card-hover relative overflow-hidden`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs text-slate-400 font-semibold">{w.temp}</span>
                  <h3 className="text-2xl font-black text-white">{w.role}</h3>
                </div>

                <div className={`p-3 rounded-2xl bg-slate-950/80 border border-slate-800 ${w.color}`}>
                  <Icon className="w-8 h-8 animate-pulse" />
                </div>
              </div>

              <div className="flex items-center gap-2 text-lg font-bold text-slate-200">
                <span className={w.color}>{w.status}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {w.desc}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-800/80">
                <div className="p-2.5 rounded-lg bg-slate-950/60">
                  <span className="text-slate-400">Hiring Momentum</span>
                  <div className="font-bold text-emerald-400">{w.momentum}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/60">
                  <span className="text-slate-400">Open Opportunities</span>
                  <div className="font-bold text-cyan-400">{w.active}</div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
