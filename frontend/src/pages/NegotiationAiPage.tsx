import React, { useState } from 'react';
import { MessageSquareCode, Copy, Check, Zap, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { MarketDataBadge } from '../components/MarketDataBadge';
import { RoleSearchSelect } from '../components/RoleSearchSelect';
import { SkillSearchSelect } from '../components/SkillSearchSelect';
import { useLocationContext } from '../context/LocationContext';

export const NegotiationAiPage: React.FC = () => {
  const { globalLocation, formatSalary } = useLocationContext();
  const [offer, setOffer] = useState(75000);
  const [role, setRole] = useState("Software Engineer");
  const [exp, setExp] = useState(3.0);
  const [skills, setSkills] = useState(["Python", "React", "AWS"]);

  const [res, setRes] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleNegotiate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      setLoading(true);
      const data = await api.getNegotiation({
        current_offer: offer,
        job_role: role,
        years_experience: exp,
        skills: skills
      });
      setRes(data.negotiation || data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = () => {
    if (res?.email_script) {
      navigator.clipboard.writeText(res.email_script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
            <MessageSquareCode className="w-4 h-4" />
            <span>AI Salary Counter-Offer Copilot</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            AI Salary <span className="text-gradient-cyan">Negotiation Assistant</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Generate evidence-backed negotiation targets, recruiter counter-response playbooks, and customizable email scripts.
          </p>
        </div>
        <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Input Form */}
        <div className="lg:col-span-5">
          <form onSubmit={handleNegotiate} className="glass-panel p-6 rounded-2xl border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              Offer & Role Context
            </h3>

            {/* Role Search */}
            <div className="space-y-1.5 relative z-50">
              <label className="text-xs text-slate-400 font-medium">Target Job Role (Search 40+ Jobs):</label>
              <RoleSearchSelect
                value={role}
                onChange={(r) => setRole(r)}
                placeholder="Select job role..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Current Offered Salary (USD equivalent):</label>
              <input
                type="number"
                step="5000"
                value={offer}
                onChange={(e) => setOffer(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg p-2.5 focus:border-cyan-400 outline-none"
              />
              <span className="text-[10px] text-cyan-400 block">
                Formats as: {formatSalary(offer)} in {globalLocation}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>Years of Experience:</span>
                <span className="text-cyan-400 font-bold">{exp} Yrs</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                value={exp}
                onChange={(e) => setExp(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Core Skills Portfolio:</label>
              <SkillSearchSelect
                selectedSkills={skills}
                onChange={(s) => setSkills(s)}
                placeholder="Select core skills..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-extrabold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              {loading ? "Generating Strategy..." : <><Zap className="w-4 h-4" /> Generate Counter-Offer Strategy</>}
            </button>
          </form>
        </div>

        {/* Right Output Strategy */}
        <div className="lg:col-span-7 space-y-6">
          {!res ? (
            <div className="glass-panel p-12 rounded-2xl border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                <MessageSquareCode className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-white">Negotiation Assistant Ready</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Enter your job role and offered salary on the left, then click <strong>"Generate Counter-Offer Strategy"</strong>.
              </p>
            </div>
          ) : (
            <div className="glass-panel p-6 rounded-2xl border-emerald-500/30 bg-slate-900/90 space-y-6 shadow-2xl">
              
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-slate-400 font-medium">Recommended Counter Target</span>
                  <div className="text-3xl font-black text-emerald-400">
                    {formatSalary(res.recommended_target || offer * 1.18)}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 font-medium">Current Offer vs Target</span>
                  <div className="text-sm font-bold text-slate-200">
                    {formatSalary(offer)} <ArrowRight className="inline w-3 h-3 text-emerald-400" /> {formatSalary(res.recommended_target || offer * 1.18)}
                  </div>
                </div>
              </div>

              {/* Counter-Offer Email Script */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white uppercase tracking-wider">Customizable Recruiter Email Script:</label>
                  <button
                    onClick={copyEmail}
                    className="px-3 py-1 rounded-lg text-xs font-bold text-cyan-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy Script"}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {res.email_script || `Dear Hiring Team,\n\nThank you for extending the offer for the ${role} position. Based on my ${exp} years of specialized experience in ${skills.join(", ")}, market compensation benchmarks for ${globalLocation} indicate a target salary range of ${formatSalary(res.recommended_target || offer * 1.18)}. I am extremely excited about joining and would love to align on ${formatSalary(res.recommended_target || offer * 1.18)}.\n\nBest regards,\n[Your Name]`}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};
