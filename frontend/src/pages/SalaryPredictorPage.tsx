import React, { useState } from 'react';
import { Sparkles, BrainCircuit, Info, Globe, AlertCircle, AlertOctagon } from 'lucide-react';
import { api } from '../services/api';
import { MarketDataBadge } from '../components/MarketDataBadge';
import { LocationSearchSelect } from '../components/LocationSearchSelect';
import { RoleSearchSelect } from '../components/RoleSearchSelect';
import { SkillSearchSelect } from '../components/SkillSearchSelect';
import { formatSalaryByLocation, getCurrencyByLocation } from '../utils/currency';

export const SalaryPredictorPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  
  // Default values empty by default
  const [form, setForm] = useState({
    job_role: "",
    years_experience: 2.0,
    location: "",
    skills: [] as string[],
    education: "",
    work_preference: "Remote"
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const handlePredict = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setValidationError(null);

    if (!form.job_role) {
      setValidationError("Please select your target job role before running the engine.");
      return;
    }
    if (!form.location) {
      setValidationError("Please select or search your target location before running the engine.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.predictSalary({
        job_role: form.job_role,
        years_experience: form.years_experience,
        location: form.location,
        skills: form.skills,
        education: form.education || "Bachelor's Degree (General)",
        work_preference: form.work_preference
      });
      setPredictionResult(res);
      setHasCalculated(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const pred = predictionResult?.prediction;
  const currencyInfo = getCurrencyByLocation(form.location);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Multi-Variable Machine Learning Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Dynamic Salary <span className="text-gradient-cyan">Predictor</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Select your role, location, education stream, and skills, then click "Run Salary Prediction Engine" to calculate output.
          </p>
        </div>
        <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Form Column */}
        <div className="lg:col-span-5">
          <form onSubmit={handlePredict} className="glass-panel p-6 rounded-2xl border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex justify-between items-center">
              <span>Input Profile Variables</span>
              <span className="text-[10px] text-cyan-400 font-normal">All fields searchable</span>
            </h3>

            {validationError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Searchable Target Job Role */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Target Job Role (Searchable):</label>
              <RoleSearchSelect
                value={form.job_role}
                onChange={(role) => { setForm({ ...form, job_role: role }); setValidationError(null); }}
                placeholder="Select your target job role..."
              />
            </div>

            {/* Searchable Worldwide Location */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Worldwide Location Search:</label>
              <LocationSearchSelect
                value={form.location}
                onChange={(loc) => { setForm({ ...form, location: loc }); setValidationError(null); }}
              />
            </div>

            {/* Education Degree Stream */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Education / Degree Stream:</label>
              <select
                value={form.education}
                onChange={(e) => setForm({ ...form, education: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg p-2.5 outline-none focus:border-cyan-400"
              >
                <option value="">Select your degree stream...</option>
                <option value="BCA (Computer Applications)">BCA (Computer Applications)</option>
                <option value="B.Tech / B.E. (Computer Science / IT)">B.Tech / B.E. (Computer Science / IT)</option>
                <option value="B.Tech / B.E. (Electronics & Comm - ECE)">B.Tech / B.E. (Electronics & Comm - ECE)</option>
                <option value="B.Tech / B.E. (Electrical - EEE)">B.Tech / B.E. (Electrical - EEE)</option>
                <option value="B.Tech / B.E. (Mechanical - MECH)">B.Tech / B.E. (Mechanical - MECH)</option>
                <option value="B.Tech / B.E. (Civil)">B.Tech / B.E. (Civil)</option>
                <option value="B.Tech / B.E. (Chemical / Biotech)">B.Tech / B.E. (Chemical / Biotech)</option>
                <option value="B.Arch (Architecture)">B.Arch (Architecture)</option>
                <option value="MCA (Master of Computer Applications)">MCA (Master of Computer Applications)</option>
                <option value="BSc (Computer Science / IT)">BSc (Computer Science / IT)</option>
                <option value="MBBS / Medical Degree">MBBS / Medical Degree</option>
                <option value="B.Pharm / Pharm.D">B.Pharm / Pharm.D</option>
                <option value="B.Com (Commerce & Accounting)">B.Com (Commerce & Accounting)</option>
                <option value="BBA / MBA (Business Administration)">BBA / MBA (Business Administration)</option>
                <option value="Diploma in Engineering">Diploma in Engineering</option>
                <option value="Bachelor's Degree (General)">Bachelor's Degree (General)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>Experience:</span>
                  <span className="text-cyan-400 font-bold">{form.years_experience} Yrs</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={form.years_experience}
                  onChange={(e) => setForm({ ...form, years_experience: parseFloat(e.target.value) })}
                  className="w-full accent-cyan-400 bg-slate-800 rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Work Setup:</label>
                <select
                  value={form.work_preference}
                  onChange={(e) => setForm({ ...form, work_preference: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg p-2.5 outline-none"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
            </div>

            {/* Searchable Multi-Select Skill Selector */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Skills Portfolio (Search & Select):</label>
              <SkillSearchSelect
                selectedSkills={form.skills}
                onChange={(skills) => setForm({ ...form, skills })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-extrabold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {loading ? "Calculating Prediction..." : "Run Salary Prediction Engine"}
            </button>
          </form>
        </div>

        {/* Prediction Results & AI Explainability Panel */}
        <div className="lg:col-span-7 space-y-6">
          {!hasCalculated ? (
            <div className="glass-panel p-12 rounded-2xl border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/20">
                <BrainCircuit className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-white">Ready for Salary Prediction</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Select your target job role, location, and skills from the left panel, then click <strong>"Run Salary Prediction Engine"</strong> to calculate output.
              </p>
            </div>
          ) : pred && pred.is_valid === false ? (
            /* UNRELATED SKILLS WARNING CARD */
            <div className="glass-panel p-8 rounded-2xl border-red-500/40 bg-red-500/5 space-y-5 shadow-2xl">
              <div className="flex items-center gap-3 text-red-400 font-extrabold text-lg border-b border-red-500/20 pb-3">
                <AlertOctagon className="w-6 h-6 shrink-0" />
                <span>🚨 Skillset Mismatch — No Jobs Found</span>
              </div>
              
              <p className="text-xs text-slate-200 leading-relaxed font-medium bg-slate-950/80 p-4 rounded-xl border border-red-500/30">
                {pred.explanation || pred.message}
              </p>

              {pred.suggested_skills && pred.suggested_skills.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Recommended Core Skills required for {form.job_role}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {pred.suggested_skills.map((sk: string) => (
                      <span key={sk} className="text-xs px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold">
                        + {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            pred && pred.is_valid !== false && (
              <>
                {/* Primary Output Display */}
                <div className="glass-panel p-6 rounded-2xl border-cyan-500/30 bg-slate-900/90 space-y-6">
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
                        <Globe className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Predicted Real-Time Compensation ({currencyInfo.code}):</span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-black text-white text-gradient-cyan tracking-tight">
                        {formatSalaryByLocation(pred.predicted_salary, form.location)}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 font-medium">Expected Market Range</span>
                      <div className="text-base sm:text-lg font-bold text-slate-200">
                        {formatSalaryByLocation(pred.min_salary, form.location)} – {formatSalaryByLocation(pred.max_salary, form.location)}
                      </div>
                    </div>
                  </div>

                  {/* Score & Position Pill */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                      <span className="text-[11px] text-slate-400">Confidence Score</span>
                      <div className="text-xl font-bold text-cyan-400">{pred.confidence_score}%</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                      <span className="text-[11px] text-slate-400">Market Position</span>
                      <div className="text-xl font-bold text-emerald-400">{pred.market_position}</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                      <span className="text-[11px] text-slate-400">Local Currency</span>
                      <div className="text-xl font-bold text-purple-400">{currencyInfo.code}</div>
                    </div>
                  </div>

                  {/* Natural Language Explanation Box */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed space-y-2">
                    <div className="flex items-center gap-2 font-bold text-cyan-300">
                      <BrainCircuit className="w-4 h-4 text-cyan-400" />
                      AI Factor Explanation:
                    </div>
                    <p>{pred.explanation}</p>
                  </div>

                </div>

                {/* AI Explainability Contribution Breakdown */}
                <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Info className="w-4 h-4 text-cyan-400" />
                    Why this prediction? (Feature Contribution Breakdown)
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Years of Experience Impact ({form.years_experience} yrs)</span>
                        <span className="font-bold text-cyan-400">{pred.contributions?.experience_impact}</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Skills Portfolio Contribution ({form.skills.length} skills)</span>
                        <span className="font-bold text-purple-400">{pred.contributions?.skills_impact}</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-purple-400 h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Location Multiplier ({form.location || 'Selected Area'})</span>
                        <span className="font-bold text-emerald-400">{pred.contributions?.location_impact}</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Education & Industry Demand</span>
                        <span className="font-bold text-amber-400">{pred.contributions?.market_demand_impact}</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-amber-400 h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 pt-2 italic border-t border-slate-800/60">
                    Note: Feature contributions represent statistical feature weightings estimated by regression models and do not guarantee salary outcomes.
                  </p>
                </div>
              </>
            )
          )}
        </div>

      </div>

    </div>
  );
};
