import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { api } from '../services/api';
import { MarketDataBadge } from '../components/MarketDataBadge';

export const MarketShockDetectorPage: React.FC = () => {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await api.getMarketAlerts();
      setAlerts(res.alerts || []);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>AI-Powered Telemetry Alert System</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Job Market <span className="text-gradient-purple">Shock Detector</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Monitors real-time macro hiring spikes, skill demand surges, and sudden compensation shifts.
          </p>
        </div>
        <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
      </div>

      {/* Alert Timeline List */}
      <div className="space-y-4">
        {alerts.map((al) => (
          <div 
            key={al.id}
            className="glass-panel p-6 rounded-2xl border-slate-800 glass-card-hover flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-1 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{al.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {al.timestamp}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{al.detail}</p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Estimated Salary Impact</span>
              <div className={`text-xl font-black ${al.salary_impact.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>
                {al.salary_impact}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
