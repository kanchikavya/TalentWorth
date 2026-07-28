import React, { useState, useEffect } from 'react';
import { GitFork, Sparkles, Layers } from 'lucide-react';
import { api } from '../services/api';
import { MarketDataBadge } from '../components/MarketDataBadge';
import { RoleSearchSelect } from '../components/RoleSearchSelect';

export const SkillTreePage: React.FC = () => {
  const [role, setRole] = useState("Software Engineer");
  const [treeData, setTreeData] = useState<any>(null);

  useEffect(() => {
    fetchTree();
  }, [role]);

  const fetchTree = async () => {
    try {
      const res = await api.getSkillTree(role);
      setTreeData(res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-1">
            <GitFork className="w-4 h-4" />
            <span>Interactive Skill Progression Architecture</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Career Skill <span className="text-gradient-cyan">Tree Map</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Search any target job role across IT, Core Engineering, Medical, Architecture, and Business to visualize its customized skill roadmap.
          </p>
        </div>
        <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
      </div>

      {/* Role Search Bar - Explicit High Stacking Context (z-50) */}
      <div className="relative z-50 glass-panel p-4 rounded-xl border-slate-800 space-y-1">
        <label className="text-xs font-bold text-slate-300">Search Target Job Role:</label>
        <RoleSearchSelect
          value={role}
          onChange={(r) => setRole(r)}
          placeholder="Search job role (e.g. Data Analyst, Embedded Systems, Mechanical Design, Software Engineer)..."
        />
      </div>

      {treeData && (
        <div className="relative z-10 space-y-6">
          
          {/* Top Recommendation Banner */}
          <div className="glass-panel p-6 rounded-2xl border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-cyan-950/30 to-slate-900/90 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/30 shrink-0">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">AI Priority Upgrade for {role}</span>
                <h3 className="text-lg font-black text-white">
                  Next Recommended Skill: <span className="text-gradient-cyan">{treeData.recommended_next_skill}</span>
                </h3>
              </div>
            </div>

            <div className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-emerald-400 font-bold font-mono">
              Estimated Value Impact: +15% to +25% Salary
            </div>
          </div>

          {/* Skill Tree Map Nodes */}
          <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Skill Progression Architecture ({role})
              </h3>
              <span className="text-xs text-slate-400">{treeData.tree?.length || 0} Core Skill Nodes</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {treeData.tree?.map((node: any, idx: number) => (
                <div 
                  key={node.id || idx}
                  className="p-5 rounded-xl glass-panel border-slate-800 bg-slate-950/70 hover:border-cyan-500/40 transition space-y-3 relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                      Node #{idx + 1}
                    </span>
                    <span className="text-xs font-black text-emerald-400 font-mono">
                      {node.salary_impact}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-100 text-sm group-hover:text-cyan-300 transition">
                    {node.name}
                  </h4>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 border-t border-slate-800/60 pt-2">
                    <div>
                      <span>Demand Level: </span>
                      <strong className="text-cyan-400 font-bold">{node.demand}</strong>
                    </div>
                    <div>
                      <span>Relevance: </span>
                      <strong className="text-purple-400 font-bold">{node.relevance}%</strong>
                    </div>
                    <div>
                      <span>Difficulty: </span>
                      <strong className="text-slate-300 font-medium">{node.difficulty}</strong>
                    </div>
                    <div>
                      <span>Postings: </span>
                      <strong className="text-slate-300 font-medium">{(node.postings || 25000).toLocaleString()}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
