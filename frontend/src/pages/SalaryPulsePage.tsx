import React, { useState, useEffect } from 'react';
import { TrendingUp, Activity, Flame, Users, Briefcase, Globe } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { api } from '../services/api';
import { MarketDataBadge } from '../components/MarketDataBadge';
import { RoleSearchSelect } from '../components/RoleSearchSelect';
import { LocationSearchSelect } from '../components/LocationSearchSelect';
import { useLocationContext } from '../context/LocationContext';

export const SalaryPulsePage: React.FC = () => {
  const { globalLocation, setGlobalLocation, currencyConfig, formatSalary } = useLocationContext();
  const [role, setRole] = useState("Software Engineer");
  const [pulseData, setPulseData] = useState<any>(null);

  useEffect(() => {
    fetchPulse();
  }, [role]);

  const fetchPulse = async () => {
    try {
      const res = await api.getMarketPulse(role);
      setPulseData(res.pulse || res);
    } catch (e) {
      console.error(e);
    }
  };

  const chartData = pulseData?.monthly_trend?.map((item: any) => ({
    month: item.month,
    Salary: Math.round((item.avg_salary * currencyConfig.rate) / (currencyConfig.code === 'INR' ? 100000 : 1)),
    Postings: item.postings
  })) || [
    { month: 'Jan', Salary: 10, Postings: 12000 },
    { month: 'Feb', Salary: 11, Postings: 14000 },
    { month: 'Mar', Salary: 12, Postings: 15500 },
    { month: 'Apr', Salary: 12.5, Postings: 17000 },
    { month: 'May', Salary: 13, Postings: 19000 },
    { month: 'Jun', Salary: 14, Postings: 22000 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Live Job Market Intelligence & Demand Tracker</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Live Salary <span className="text-gradient-cyan">Pulse Engine</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Search any target job role across IT, Core Engineering, Medical, Architecture, and Business to inspect live demand graphs and market compensation trends.
          </p>
        </div>
        <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
      </div>

      {/* Role & Location Search Bar - Explicit High Stacking Context (z-50) */}
      <div className="relative z-50 grid grid-cols-1 md:grid-cols-2 gap-4 glass-panel p-4 rounded-xl border-slate-800">
        <div className="space-y-1 relative z-50">
          <label className="text-xs font-bold text-slate-300">Search Target Job Role:</label>
          <RoleSearchSelect
            value={role}
            onChange={(r) => setRole(r)}
            placeholder="Search target job role (e.g. Data Analyst, Embedded Systems, Civil Site Engineer)..."
          />
        </div>

        <div className="space-y-1 relative z-50">
          <label className="text-xs font-bold text-slate-300">Select Currency / Location:</label>
          <LocationSearchSelect
            value={globalLocation}
            onChange={(loc) => setGlobalLocation(loc)}
          />
        </div>
      </div>

      {/* Primary Pulse Display Cards - Lower Stacking Context (z-10) */}
      {pulseData && (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-2 bg-slate-900/90">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Average Compensation</span>
              <Globe className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-white text-gradient-cyan">
              {formatSalary(pulseData.avg_salary || 85000)}
            </div>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-bold">
              +{pulseData.trend_30d || 3.8}% 30-Day Trend
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-2 bg-slate-900/90">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Expected Salary Range</span>
              <Briefcase className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-lg font-bold text-slate-200 truncate">
              {formatSalary(pulseData.min_salary || 65000)} – {formatSalary(pulseData.max_salary || 120000)}
            </div>
            <p className="text-[11px] text-purple-300 font-bold">
              +{pulseData.trend_1y || 12.4}% 1-Year Market Growth
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-2 bg-slate-900/90">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Active Job Postings</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white">
              {(pulseData.active_postings || 24000).toLocaleString()}
            </div>
            <p className="text-[11px] text-amber-300 font-bold">
              Hiring Momentum: +{pulseData.hiring_momentum || 14.5}%
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-2 bg-slate-900/90">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Market Demand Index</span>
              <Flame className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">
              {pulseData.demand_score || 88}/100
            </div>
            <p className="text-[11px] text-emerald-300 font-bold">
              {pulseData.market_pulse_status || "🔥 High Demand"}
            </p>
          </div>

        </div>
      )}

      {/* Historical Trend Recharts Graph */}
      <div className="relative z-10 glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Real-Time Compensation & Hiring Demand Trend ({role})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Historical 6-month trajectory formatted in {currencyConfig.code} ({currencyConfig.code === 'INR' ? 'LPA - Lakhs per Annum' : currencyConfig.code}).
            </p>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono font-bold self-start sm:self-auto">
            {role} Active Trend
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" textAnchor="end" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: '#38bdf8' }}
              />
              <Area type="monotone" dataKey="Salary" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#salaryGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
