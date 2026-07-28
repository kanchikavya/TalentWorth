import React, { useState, useEffect } from 'react';
import { ShieldAlert, Flame, CheckCircle, TrendingDown, Rocket, Info } from 'lucide-react';
import { api } from '../services/api';
import { MarketDataBadge } from '../components/MarketDataBadge';

export const SkillObsolescencePage: React.FC = () => {
  const [radar, setRadar] = useState<any>(null);

  useEffect(() => {
    fetchRadar();
  }, []);

  const fetchRadar = async () => {
    try {
      const res = await api.getSkillObsolescence();
      setRadar(res);
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
            <ShieldAlert className="w-4 h-4" />
            <span>Tech Obsolescence Matrix</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Skill <span className="text-gradient-purple">Obsolescence Radar</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Categorizes skills by market momentum: Growing, Stable, Declining demand, and Emerging frontiers.
          </p>
        </div>
        <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
      </div>

      {/* 4 Radar Quadrants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Growing */}
        <div className="glass-panel p-6 rounded-2xl border-emerald-500/30 bg-emerald-500/5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Flame className="w-5 h-5 text-emerald-400" />
              🔥 Accelerating & Growing
            </h3>
            <span className="text-xs text-emerald-400 font-bold">+24% Postings</span>
          </div>
          <div className="space-y-2">
            {radar?.growing_skills?.map((s: string) => (
              <div key={s} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs font-semibold text-slate-200">
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Stable */}
        <div className="glass-panel p-6 rounded-2xl border-cyan-500/30 bg-cyan-500/5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-cyan-400" />
              🟢 Core & Stable Foundation
            </h3>
            <span className="text-xs text-cyan-400 font-bold">High Baseline</span>
          </div>
          <div className="space-y-2">
            {radar?.stable_skills?.map((s: string) => (
              <div key={s} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs font-semibold text-slate-200">
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Declining */}
        <div className="glass-panel p-6 rounded-2xl border-amber-500/30 bg-amber-500/5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-amber-400" />
              ⚠️ Softening & Declining Demand
            </h3>
            <span className="text-xs text-amber-400 font-bold">Declining Postings</span>
          </div>
          <div className="space-y-2">
            {radar?.declining_skills?.map((s: string) => (
              <div key={s} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs font-semibold text-slate-200">
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Emerging */}
        <div className="glass-panel p-6 rounded-2xl border-purple-500/30 bg-purple-500/5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Rocket className="w-5 h-5 text-purple-400" />
              🚀 Emerging Next Frontier
            </h3>
            <span className="text-xs text-purple-400 font-bold">High Upside</span>
          </div>
          <div className="space-y-2">
            {radar?.emerging_skills?.map((s: string) => (
              <div key={s} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs font-semibold text-slate-200">
                {s}
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="p-4 rounded-xl glass-panel border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong>Responsible Data Policy:</strong> "Declining" status indicates softening relative demand in available public job postings and should not be interpreted as absolute technology obsolescence.
        </div>
      </div>

    </div>
  );
};
