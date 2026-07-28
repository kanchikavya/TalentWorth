import React, { useState } from 'react';
import { Sparkles, User, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

interface Props {
  onLoginSuccess: (user: { id?: number; email: string; full_name: string }) => void;
}

export const LoginPage: React.FC<Props> = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || (isRegister && !fullName)) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      if (isRegister) {
        const res = await api.register({ email, password, full_name: fullName });
        localStorage.setItem("talent_worth_token", res.access_token);
        localStorage.setItem("talent_worth_user", JSON.stringify(res.user));
        onLoginSuccess(res.user);
      } else {
        const res = await api.login({ email, password });
        localStorage.setItem("talent_worth_token", res.access_token);
        localStorage.setItem("talent_worth_user", JSON.stringify(res.user));
        onLoginSuccess(res.user);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const demoUser = { id: 1, email: "user@talentworth.io", full_name: fullName || "Kanchana" };
    localStorage.setItem("talent_worth_user", JSON.stringify(demoUser));
    localStorage.setItem("talent_worth_token", "demo_token_12345");
    onLoginSuccess(demoUser);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="glass-panel p-8 rounded-3xl border-cyan-500/30 bg-slate-900/90 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 mx-auto mb-2 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-xs text-slate-400">
            {isRegister 
              ? "Join TalentWorth to save your career profile & digital twin."
              : "Sign in to access personalized salary predictions & AI insights."}
          </p>
        </div>

        {/* Toggle Login / Register Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setIsRegister(false); setError(null); }}
            className={`py-2 rounded-lg transition ${!isRegister ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setError(null); }}
            className={`py-2 rounded-lg transition ${isRegister ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300 text-center font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isRegister && (
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-medium">Full Name / Profile Name:</label>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-xl p-2.5 focus-within:border-cyan-400">
                <User className="w-4 h-4 text-cyan-400 shrink-0" />
                <input
                  type="text"
                  placeholder="e.g. Kanchana"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-transparent text-xs text-slate-200 outline-none"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Email Address:</label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-xl p-2.5 focus-within:border-cyan-400">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-200 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Password:</label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-xl p-2.5 focus-within:border-cyan-400">
              <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-200 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-extrabold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
          >
            {loading ? "Authenticating..." : isRegister ? "Create Account & Sign In" : "Sign In to TalentWorth"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Login */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-cyan-300 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Quick Demo Sign In (Instant Access)
          </button>
        </div>

      </div>
    </div>
  );
};
