import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { MarketDataBadge } from '../components/MarketDataBadge';

export const CareerTimeMachinePage: React.FC = () => {
  const [role] = useState("Software Engineer");
  const [exp] = useState(3.5);
  const [currentSalary] = useState(95000);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchTimeMachine();
  }, [role, exp, currentSalary]);

  const fetchTimeMachine = async () => {
    try {
      const res = await api.getTimeMachine(role, exp, currentSalary);
      setData(res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold mb-1">
            <Clock className="w-4 h-4" />
            <span>Timeline Trajectory Simulator</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Career <span className="text-gradient-purple">Time Machine</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Simulate 6-month, 1-year, 2-year, and 5-year future career roadmaps and predicted market compensation.
          </p>
        </div>
        <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
      </div>

      {/* Timeline Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.scenarios?.map((sc: any) => (
          <div 
            key={sc.timeline}
            className="glass-panel p-6 rounded-2xl border-slate-800 glass-card-hover space-y-4 relative overflow-hidden"
          >
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">
                  Horizon: {sc.timeline}
                </span>
                <h3 className="text-xl font-bold text-white mt-2">{sc.projected_role}</h3>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Estimated Range</span>
                <div className="text-lg font-black text-emerald-400">{sc.projected_range}</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-300">Strategic Focus:</span>
              <p className="text-cyan-300 font-medium">{sc.focus}</p>
            </div>

            <div className="space-y-2 text-xs pt-2 border-t border-slate-800/80">
              <span className="font-bold text-slate-300">Recommended Action Plan:</span>
              <ul className="space-y-1">
                {sc.recommended_actions?.map((act: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
