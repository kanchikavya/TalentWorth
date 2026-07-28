import React, { useState } from 'react';
import { Sliders, Sparkles, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import { MarketDataBadge } from '../components/MarketDataBadge';
import { RoleSearchSelect } from '../components/RoleSearchSelect';
import { LocationSearchSelect } from '../components/LocationSearchSelect';
import { SkillSearchSelect } from '../components/SkillSearchSelect';
import { useLocationContext } from '../context/LocationContext';

export const WhatIfSimulatorPage: React.FC = () => {
  const { globalLocation, formatSalary } = useLocationContext();
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({
    job_role: "Software Engineer",
    base_experience: 3.0,
    location: globalLocation,
    current_skills: ["Python", "React"],
    added_skills: ["AWS", "Docker"],
    added_experience: 1.0,
    new_location: ""
  });

  const [simResult, setSimResult] = useState<any>(null);

  const handleSimulate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      setLoading(true);
      const res = await api.runSimulation({
        job_role: form.job_role,
        base_experience: form.base_experience,
        location: form.location || globalLocation,
        current_skills: form.current_skills,
        added_skills: form.added_skills,
        added_experience: form.added_experience,
        new_location: form.new_location || undefined
      });
      setSimResult(res.simulation || res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-1">
            <Sliders className="w-4 h-4" />
            <span>Counterfactual Career Simulation Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            What-If <span className="text-gradient-cyan">Career Simulator</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Simulate adding new skills (AWS, PyTorch, AutoCAD, Docker) or moving cities across 40+ job roles to quantify exact salary gains.
          </p>
        </div>
        <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Parameters */}
        <div className="lg:col-span-5">
          <form onSubmit={handleSimulate} className="glass-panel p-6 rounded-2xl border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              Configure Simulation Variables
            </h3>

            {/* Searchable Target Job Role */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Target Job Role (Search 40+ Jobs):</label>
              <RoleSearchSelect
                value={form.job_role}
                onChange={(r) => setForm({ ...form, job_role: r })}
                placeholder="Search target job role..."
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>Current Experience:</span>
                <span className="text-cyan-400 font-bold">{form.base_experience} Yrs</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                value={form.base_experience}
                onChange={(e) => setForm({ ...form, base_experience: parseFloat(e.target.value) })}
                className="w-full accent-cyan-400 bg-slate-800 rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Current Location:</label>
              <LocationSearchSelect
                value={form.location || globalLocation}
                onChange={(loc) => setForm({ ...form, location: loc })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Current Skills:</label>
              <SkillSearchSelect
                selectedSkills={form.current_skills}
                onChange={(skills) => setForm({ ...form, current_skills: skills })}
                placeholder="Select current skills..."
              />
            </div>

            <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 space-y-4">
              <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Simulate Future Upgrades:
              </span>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium">Simulate Skills to Learn:</label>
                <SkillSearchSelect
                  selectedSkills={form.added_skills}
                  onChange={(skills) => setForm({ ...form, added_skills: skills })}
                  placeholder="Search skills to add (e.g. AWS, PyTorch, Docker)..."
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300 font-medium">
                  <span>Simulate Additional Experience:</span>
                  <span className="text-purple-400 font-bold">+{form.added_experience} Yrs</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={form.added_experience}
                  onChange={(e) => setForm({ ...form, added_experience: parseFloat(e.target.value) })}
                  className="w-full accent-purple-400 bg-slate-800 rounded-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-extrabold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              Run Counterfactual Simulation
            </button>
          </form>
        </div>

        {/* Simulation Output Card */}
        <div className="lg:col-span-7 space-y-6">
          {!simResult ? (
            <div className="glass-panel p-12 rounded-2xl border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/20">
                <Sliders className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-white">Ready for Simulation</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Configure your job role and simulated skills upgrade on the left, then click <strong>"Run Counterfactual Simulation"</strong>.
              </p>
            </div>
          ) : (
            <div className="glass-panel p-6 rounded-2xl border-cyan-500/30 bg-slate-900/90 space-y-6 shadow-2xl">
              
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-slate-400 font-medium">Projected Compensation Increase</span>
                  <div className="text-3xl font-black text-emerald-400">
                    +{formatSalary(simResult.salary_difference || 24000)}
                    <span className="text-sm text-cyan-400 font-bold ml-2">({simResult.percentage_gain})</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 font-medium">Baseline vs Simulated</span>
                  <div className="text-sm font-bold text-slate-200">
                    {formatSalary(simResult.original_salary)} <ArrowRight className="inline w-3 h-3 text-cyan-400" /> {formatSalary(simResult.simulated_salary)}
                  </div>
                </div>
              </div>

              {/* Added Skills Impact Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Simulated Upgrade Value Contributions:
                </h4>
                <div className="space-y-2 text-xs">
                  {simResult.impact_breakdown?.map((item: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex justify-between items-center">
                      <span className="font-bold text-slate-200">{item.item}</span>
                      <span className="font-bold text-emerald-400 font-mono">{item.estimated_value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};
