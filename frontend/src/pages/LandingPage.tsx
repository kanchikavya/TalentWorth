import React from 'react';
import { 
  Sparkles, 
  Sliders, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  DollarSign, 
  BrainCircuit, 
  GraduationCap,
  Globe
} from 'lucide-react';
import { LocationSearchSelect } from '../components/LocationSearchSelect';
import { useLocationContext } from '../context/LocationContext';

interface Props {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<Props> = ({ onNavigate }) => {
  const { globalLocation, setGlobalLocation, currencyConfig } = useLocationContext();

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20 blur-[130px] pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>Next-Gen Global Career Intelligence & Salary Science</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Know Your <span className="text-gradient-cyan">Market Value.</span><br />
              Predict Your <span className="text-gradient-purple">Career Future.</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              AI-powered salary predictions built from live job market signals, skill relevance validation, degree streams, and worldwide local currencies.
            </p>

            {/* Global Location & Currency Selector Card */}
            <div className="glass-panel p-4 rounded-2xl border-cyan-500/30 bg-slate-900/90 max-w-lg mx-auto space-y-2 shadow-2xl">
              <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Globe className="w-4 h-4" /> Select Your Location / City:
                </span>
                <span className="text-purple-300 font-mono">
                  Site Currency: {currencyConfig.code} ({currencyConfig.symbol})
                </span>
              </div>
              <LocationSearchSelect
                value={globalLocation}
                onChange={(loc) => setGlobalLocation(loc)}
              />
              <p className="text-[11px] text-slate-400 italic">
                Changing your location automatically updates all salary figures across the entire website to your local currency!
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate("predictor")}
                className="px-8 py-4 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition shadow-xl shadow-cyan-500/25 flex items-center gap-2"
              >
                <DollarSign className="w-4 h-4" />
                Launch AI Salary Predictor
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate("degree-advisor")}
                className="px-8 py-4 rounded-xl font-bold text-sm text-slate-200 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 transition flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                Student & Degree Advisor
              </button>
            </div>

            {/* Badges */}
            <div className="pt-6 flex flex-wrap justify-center items-center gap-8 text-slate-400 text-xs border-t border-slate-800/80 max-w-2xl mx-auto">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Real-Time Market Signals</span>
              </div>
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-purple-400" />
                <span>Strict Skill Relevance Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Worldwide Currency Support ({currencyConfig.code})</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Enterprise-Grade Intelligence Suite</h2>
          <p className="text-2xl font-black text-white">Everything You Need to Benchmark & Optimize Your Career</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={() => onNavigate("predictor")}
            className="glass-panel p-6 rounded-2xl border-slate-800 hover:border-cyan-500/40 transition cursor-pointer space-y-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">AI Dynamic Salary Predictor</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-variable machine learning prediction based on role, exact skills, experience level, degree stream, and local currency ({currencyConfig.code}).
            </p>
          </div>

          <div 
            onClick={() => onNavigate("degree-advisor")}
            className="glass-panel p-6 rounded-2xl border-slate-800 hover:border-purple-500/40 transition cursor-pointer space-y-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition">Student & Degree Advisor</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Career guidance for BCA, B.Tech (CSE, ECE, Mech, Civil), B.Arch, Medical, and Commerce graduates with an interactive AI Suggestion Box.
            </p>
          </div>

          <div 
            onClick={() => onNavigate("simulator")}
            className="glass-panel p-6 rounded-2xl border-slate-800 hover:border-blue-500/40 transition cursor-pointer space-y-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sliders className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition">What-If Career Simulator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Simulate adding new skills (AWS, PyTorch, Docker) across 40+ job roles to quantify exact salary impact before taking action.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
