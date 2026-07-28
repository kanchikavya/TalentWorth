import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { api } from '../services/api';
import { MarketDataBadge } from '../components/MarketDataBadge';
import { formatSalaryByLocation } from '../utils/currency';

export const LocationArbitragePage: React.FC = () => {
  const [role, setRole] = useState("Software Engineer");
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    fetchArbitrage();
  }, [role]);

  const fetchArbitrage = async () => {
    try {
      const res = await api.getLocationArbitrage(role);
      setLocations(res.locations || []);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-1">
            <MapPin className="w-4 h-4" />
            <span>Global Compensation & Cost of Living Analyzer</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Location <span className="text-gradient-cyan">Arbitrage Calculator</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Compare gross pay, local taxes, rent index, and real purchasing power across worldwide tech hubs in local currencies.
          </p>
        </div>
        <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
      </div>

      <div className="glass-panel p-4 rounded-xl border-slate-800 flex items-center gap-4">
        <label className="text-xs font-bold text-slate-300">Select Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg p-2 outline-none focus:border-cyan-400 font-medium"
        >
          <option value="Software Engineer">Software Engineer</option>
          <option value="AI Engineer">AI Engineer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="Data Scientist">Data Scientist</option>
          <option value="DevOps Engineer">DevOps Engineer</option>
        </select>
      </div>

      <div className="glass-panel rounded-2xl border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Worldwide Tech Hub</th>
                <th className="px-6 py-4">Gross Compensation</th>
                <th className="px-6 py-4">Est. State Tax Rate</th>
                <th className="px-6 py-4">COL Index</th>
                <th className="px-6 py-4">Net Take-Home Pay</th>
                <th className="px-6 py-4">Real Purchasing Power</th>
                <th className="px-6 py-4 text-right">Arbitrage Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {locations.map((loc, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition">
                  <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    {loc.city}
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-200">{formatSalaryByLocation(loc.gross_salary, loc.city)}</td>
                  <td className="px-6 py-4 text-purple-300">{loc.estimated_state_tax}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {loc.cost_of_living_index}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-cyan-300 font-bold">{formatSalaryByLocation(loc.net_take_home, loc.city)}</td>
                  <td className="px-6 py-4 font-mono text-emerald-400 font-bold">{formatSalaryByLocation(loc.real_purchasing_power, loc.city)}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      loc.rating.includes("High Purchasing") 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      {loc.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
