import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';
import { api } from '../services/api';
import { MarketDataBadge } from '../components/MarketDataBadge';

export const CompanyHeatmapPage: React.FC = () => {
  const [role, setRole] = useState("Software Engineer");
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    fetchCompanies();
  }, [role]);

  const fetchCompanies = async () => {
    try {
      const res = await api.getCompanyInsights(role);
      setCompanies(res.companies || []);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold mb-1">
            <Building2 className="w-4 h-4" />
            <span>Employer Pay Matrix & Remote Transparency</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Company Salary <span className="text-gradient-cyan">Heatmap</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Compare compensation tiers across FAANG, AI Unicorns, FinTech, and Enterprise employers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 outline-none"
          >
            <option value="Software Engineer">Software Engineer</option>
            <option value="AI Engineer">AI Engineer</option>
            <option value="Frontend Developer">Frontend Developer</option>
          </select>
          <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
        </div>
      </div>

      {/* Grid of Company Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((comp) => (
          <div 
            key={comp.company}
            className="glass-panel p-6 rounded-2xl border-slate-800 glass-card-hover space-y-4 relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {comp.tier}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{comp.company}</h3>
              </div>

              <div className="text-right">
                <span className="text-xs text-emerald-400 font-bold">{comp.trend} YoY</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400">Estimated Role Compensation</span>
              <div className="text-2xl font-black text-white text-gradient-cyan">
                ${comp.est_salary?.toLocaleString()} / yr
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-slate-950/40 text-slate-300">
                <span>Remote Setup:</span>
                <div className="font-semibold text-cyan-300">{comp.remote}</div>
              </div>

              <div className="p-2 rounded bg-slate-950/40 text-slate-300">
                <span>Open Positions:</span>
                <div className="font-semibold text-emerald-400">{comp.open_positions} roles</div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
