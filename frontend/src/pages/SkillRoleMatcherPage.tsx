import React, { useState } from 'react';
import { Target, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Zap, RefreshCw, Layers } from 'lucide-react';
import { api } from '../services/api';
import { MarketDataBadge } from '../components/MarketDataBadge';
import { SkillSearchSelect } from '../components/SkillSearchSelect';
import { useLocationContext } from '../context/LocationContext';

interface Props {
  onNavigate?: (page: string, role?: string) => void;
}

export const SkillRoleMatcherPage: React.FC<Props> = ({ onNavigate }) => {
  const { globalLocation, formatSalary } = useLocationContext();
  const [userSkills, setUserSkills] = useState<string[]>(["Python", "SQL / PostgreSQL", "PowerBI / Tableau"]);
  const [experience, setExperience] = useState<number>(0);
  const [matchResult, setMatchResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFindRoles = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (userSkills.length === 0) return;

    try {
      setLoading(true);
      const res = await api.matchRolesBySkills(userSkills, experience);
      setMatchResult(res);
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
            <Target className="w-4 h-4 text-cyan-400" />
            <span>Reverse Skill-to-Role Intelligence Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            AI Skill-to-Role <span className="text-gradient-cyan">Matcher</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Don't know which job role matches your skill portfolio? Select the skills you currently have, and our AI will recommend top target job roles.
          </p>
        </div>
        <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Input Form */}
        <div className="lg:col-span-5">
          <form onSubmit={handleFindRoles} className="glass-panel p-6 rounded-2xl border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Select Your Skills Portfolio
            </h3>

            {/* Searchable Multi-Select Skill Selector */}
            <div className="space-y-1.5 relative z-50">
              <label className="text-xs text-slate-400 font-medium">Select All Skills You Have:</label>
              <SkillSearchSelect
                selectedSkills={userSkills}
                onChange={(s) => setUserSkills(s)}
                placeholder="Search and select your skills (e.g. Python, SQL, AutoCAD, Embedded C)..."
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>Years of Experience:</span>
                <span className="text-cyan-400 font-bold">
                  {experience === 0 ? "0 Yrs (Fresh Graduate / Fresher)" : `${experience} Yrs`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={experience}
                onChange={(e) => setExperience(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 rounded-lg"
              />
            </div>

            <button
              type="submit"
              disabled={loading || userSkills.length === 0}
              className="w-full py-3.5 rounded-xl font-extrabold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              Find Matching Job Roles ({userSkills.length} Skills Selected)
            </button>
          </form>
        </div>

        {/* Right Recommended Job Roles Display */}
        <div className="lg:col-span-7 space-y-6">
          {!matchResult ? (
            <div className="glass-panel p-12 rounded-2xl border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/20">
                <Target className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-white">Skill-to-Role Matcher Ready</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Select your skills on the left and click <strong>"Find Matching Job Roles"</strong> to discover your best career options!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Top Recommended Job Roles ({matchResult.matches?.length || 0} Matches Found)
                </h3>
                <span className="text-xs text-cyan-400 font-mono font-bold">
                  Location: {globalLocation}
                </span>
              </div>

              {matchResult.matches?.length === 0 ? (
                <div className="p-6 rounded-2xl glass-panel border-amber-500/30 text-center text-xs text-amber-300">
                  No exact matching role found for these skills. Try adding core technical skills like Python, SQL, React, or AutoCAD.
                </div>
              ) : (
                matchResult.matches?.map((item: any, idx: number) => (
                  <div 
                    key={item.role}
                    className="glass-panel p-6 rounded-2xl border-slate-800 hover:border-cyan-500/40 transition space-y-4 bg-slate-900/90 relative overflow-hidden group"
                  >
                    {/* Role Title & Match Score */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 font-black text-sm flex items-center justify-center border border-cyan-500/20">
                          #{idx + 1}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-white text-base group-hover:text-cyan-300 transition">
                            {item.role}
                          </h4>
                          <span className="text-xs text-emerald-400 font-semibold">
                            {item.demand_level}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-2xl font-black text-gradient-cyan">{item.match_percentage}%</span>
                        <span className="text-[10px] text-slate-400 block font-semibold">Skill Compatibility</span>
                      </div>
                    </div>

                    {/* Match Progress Bar */}
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div 
                        className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.match_percentage}%` }}
                      ></div>
                    </div>

                    {/* Salary & Skill Breakdown */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-800/80">
                      <div className="space-y-1">
                        <span className="text-slate-400 font-medium">Estimated Market Compensation:</span>
                        <div className="text-lg font-black text-white text-gradient-cyan">
                          {formatSalary(item.estimated_salary)}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 font-medium">Matched Skills You Have:</span>
                        <div className="flex flex-wrap gap-1">
                          {item.matched_skills.map((sk: string) => (
                            <span key={sk} className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1 font-semibold">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Missing Skills Recommendation */}
                    {item.missing_skills?.length > 0 && (
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                        <span className="text-amber-400 font-bold flex items-center gap-1 text-[11px]">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> Learn These Next to Reach 100% Match:
                        </span>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {item.missing_skills.map((sk: string) => (
                            <span key={sk} className="text-[11px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              + {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick CTAs */}
                    <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800/60">
                      {onNavigate && (
                        <button
                          onClick={() => onNavigate("pulse")}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-cyan-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition flex items-center gap-1"
                        >
                          Inspect Market Pulse <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                        </button>
                      )}
                    </div>

                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
