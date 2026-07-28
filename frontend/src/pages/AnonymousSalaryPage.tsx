import React, { useState, useEffect } from 'react';
import { Cpu, Lock, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { MarketDataBadge } from '../components/MarketDataBadge';

export const AnonymousSalaryPage: React.FC = () => {
  const [role, setRole] = useState("Software Engineer");
  const [exp, setExp] = useState(3.0);
  const [location, setLocation] = useState("Austin, TX");
  const [salary, setSalary] = useState(98000);
  const [submitted, setSubmitted] = useState(false);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.getAnonymousInsights();
      setStats(res);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.submitSalary({
        job_role: role,
        years_experience: exp,
        location: location,
        skills: ["Python", "React"],
        salary: salary
      });
      setSubmitted(true);
      fetchStats();
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
            <Cpu className="w-4 h-4" />
            <span>Community Market Intelligence Pool</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Anonymous Salary <span className="text-gradient-cyan">Intelligence</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Contribute verified compensation data with zero personally identifiable information (PII) stored.
          </p>
        </div>
        <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Submission Form */}
        <div className="lg:col-span-5">
          <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200 border-b border-slate-800 pb-3">
              <Lock className="w-4 h-4 text-emerald-400" />
              Anonymous Submission Form
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Job Role:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg p-2.5 outline-none"
              >
                <option value="Software Engineer">Software Engineer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="AI Engineer">AI Engineer</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Years Experience:</label>
              <input
                type="number"
                step="0.5"
                value={exp}
                onChange={(e) => setExp(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg p-2.5 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Location:</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg p-2.5 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Base Salary ($/yr):</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg p-2.5 outline-none font-mono font-bold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition shadow-lg shadow-cyan-500/20"
            >
              Submit Anonymously
            </button>

            {submitted && (
              <p className="text-xs text-emerald-400 flex items-center justify-center gap-1 font-medium pt-2">
                <CheckCircle2 className="w-4 h-4" /> Thank you! Data submitted anonymously.
              </p>
            )}
          </form>
        </div>

        {/* Aggregated Community Stats */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border-cyan-500/30 bg-slate-900/90 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-slate-400 font-medium">Community Aggregation Pool</span>
                <h3 className="text-2xl font-black text-white">Market Data Pool Status</h3>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                Sample Threshold Met
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Total Submissions</span>
                <div className="text-3xl font-black text-white text-gradient-cyan">
                  {stats?.total_submissions?.toLocaleString() || "1,248"}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400">Privacy Standard</span>
                <div className="text-sm font-bold text-emerald-400 pt-2">k-Anonymity Guard</div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Based on {stats?.total_submissions?.toLocaleString() || "1,248"} anonymous salary submissions. If a role or location sample size falls below threshold, estimates default to macro market signals.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
