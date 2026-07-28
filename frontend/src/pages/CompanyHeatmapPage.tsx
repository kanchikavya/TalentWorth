import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';
import { api } from '../services/api';
import { MarketDataBadge } from '../components/MarketDataBadge';
import { RoleSearchSelect } from '../components/RoleSearchSelect';
import { useLocationContext } from '../context/LocationContext';

export const CompanyHeatmapPage: React.FC = () => {
  const { formatSalary } = useLocationContext();
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
            Compare compensation tiers across FAANG, AI Unicorns, FinTech, and Enterprise employers for 40+ job roles.
          </p>
        </div>

        <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
      </div>

      {/* Role Search Bar */}
      <div className="relative z-50 glass-panel p-4 rounded-xl border-slate-800 space-y-1">
        <label className="text-xs font-bold text-slate-300">Search Target Job Role:</label>
        <RoleSearchSelect
          value={role}
          onChange={(r) => setRole(r)}
          placeholder="Search job role (e.g. Data Analyst, Software Engineer, Embedded Systems)..."
        />
      </div>

      {/* Grid of Company Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((comp) => (
          <div 
            key={comp.company}
            className="glass-panel p-6 rounded-2xl border-slate-800 hover:border-cyan-500/40 transition space-y-4 relative overflow-hidden bg-slate-900/90"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">{comp.company}</h3>
                <span className="text-[10px] text-slate-400 font-mono">{comp.tier || "Enterprise Tier"}</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                {comp.level || "L4 / Senior"}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400">Average Base Pay ({role})</span>
              <div className="text-2xl font-black text-white text-gradient-cyan">
                {formatSalary(comp.avg_base || 135000)}
              </div>
              <p className="text-[11px] text-emerald-400 font-semibold">
                Expected Total Range: {formatSalary(comp.min_total || 110000)} – {formatSalary(comp.max_total || 175000)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 border-t border-slate-800 pt-3">
              <div>
                <span>Bonus / Stock: </span>
                <strong className="text-purple-400 font-bold">{comp.bonus_pct || "15%"}</strong>
              </div>
              <div>
                <span>Remote Policy: </span>
                <strong className="text-cyan-400 font-bold">{comp.remote_policy || "Flexible"}</strong>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
