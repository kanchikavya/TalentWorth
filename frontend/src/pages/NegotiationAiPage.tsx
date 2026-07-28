import React, { useState } from 'react';
import { MessageSquareCode, Copy, Check } from 'lucide-react';
import { api } from '../services/api';
import { MarketDataBadge } from '../components/MarketDataBadge';

export const NegotiationAiPage: React.FC = () => {
  const [offer, setOffer] = useState(75000);
  const [role, setRole] = useState("Software Engineer");
  const [exp, setExp] = useState(3.0);
  const [skills] = useState(["Python", "React", "AWS"]);

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
      setRes(data);
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
        
        {/* Left: Input Offer Form */}
        <div className="lg:col-span-4">
          <form onSubmit={handleNegotiate} className="glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              Offer Details
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Received Job Offer ($/yr):</label>
              <input
                type="number"
                step="1000"
                value={offer}
                onChange={(e) => setOffer(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg p-2.5 outline-none focus:border-cyan-400 font-mono font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Role:</label>
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
              <label className="text-xs text-slate-400 font-medium">Years of Experience:</label>
              <input
                type="number"
                step="0.5"
                value={exp}
                onChange={(e) => setExp(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg p-2.5 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition shadow-lg shadow-emerald-500/20"
            >
              {loading ? "Generating Strategy..." : "Generate AI Negotiation Script"}
            </button>
          </form>
        </div>

        {/* Right: AI Output Strategy Panel */}
        <div className="lg:col-span-8 space-y-6">
          {res && (
            <>
              {/* Target Range Box */}
              <div className="glass-panel p-6 rounded-2xl border-emerald-500/30 bg-slate-900/90 space-y-4">
                <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Recommended Counter Target</span>
                    <div className="text-3xl font-black text-emerald-400">
                      ${res.recommended_target?.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ year</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-medium">Suggested Negotiation Range</span>
                    <div className="text-base font-bold text-slate-200">{res.suggested_negotiation_range}</div>
                  </div>
                </div>

                {/* Evidence Points */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-200">Supporting Evidence & Positioning:</span>
                  <ul className="space-y-1.5">
                    {res.evidence_points?.map((pt: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Copyable Email Script Box */}
              <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Professional Negotiation Email Script
                  </h3>
                  <button
                    onClick={copyEmail}
                    className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy Email"}
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                  {res.email_script}
                </pre>
              </div>

              {/* Recruiter Response Playbook */}
              <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Recruiter Counter-Argument Playbook
                </h3>

                <div className="space-y-3">
                  {res.recruiter_response_playbook?.map((pb: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                      <div className="font-bold text-amber-400">Recruiter Objection: "{pb.recruiter_statement}"</div>
                      <div className="text-slate-300 leading-relaxed pl-3 border-l-2 border-cyan-400">
                        <strong>Suggested Response:</strong> {pb.response}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

      </div>

    </div>
  );
};
