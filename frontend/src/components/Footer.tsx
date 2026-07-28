import React from 'react';
import { ShieldAlert, Sparkles, Database } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/90 text-slate-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              TalentWorth
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              AI-powered dynamic salary prediction & career market intelligence platform analyzing live skill signals, location economics, and career momentum.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 mb-3">Core Features</h4>
            <ul className="space-y-2">
              <li>Career Digital Twin</li>
              <li>What-If Salary Simulator</li>
              <li>Salary Weather & Pulse</li>
              <li>Skill Tree & Career ROI</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-200 mb-3">Market Intelligence</h4>
            <ul className="space-y-2">
              <li>Location Arbitrage & Net Pay</li>
              <li>Company Salary Heatmap</li>
              <li>AI Salary Negotiator</li>
              <li>Job Market Shock Detector</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 mb-3">Platform Health</h4>
            <div className="flex items-center gap-2 text-slate-300">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>Data Engine: Active (Demo Mode)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Scikit-Learn ML Model R²: 0.91</span>
            </div>
          </div>
        </div>

        {/* Responsible AI Disclaimer Banner */}
        <div className="p-4 rounded-xl glass-panel border border-amber-500/20 bg-amber-500/5 text-amber-300/90 leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">Responsible AI & Transparency Notice: </span>
            Salary predictions and market values displayed on TalentWorth are mathematical model estimations calculated from public market datasets, statistical regression models, and user contributions. Actual employer compensation depends on individual interview performance, full equity/benefits packages, specific company budgets, and direct negotiation.
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px]">
          <p>© 2026 TalentWorth Inc. All rights reserved. Live Career Intelligence.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>API Status</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
