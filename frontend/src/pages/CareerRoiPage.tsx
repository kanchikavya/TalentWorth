import React, { useState, useEffect } from 'react';
import { Award, Clock } from 'lucide-react';
import { api } from '../services/api';
import { MarketDataBadge } from '../components/MarketDataBadge';

export const CareerRoiPage: React.FC = () => {
  const [roiList, setRoiList] = useState<any[]>([]);

  useEffect(() => {
    fetchRoi();
  }, []);

  const fetchRoi = async () => {
    try {
      const res = await api.getCareerRoi(["Python", "React"]);
      setRoiList(res.skills_roi || []);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
            <Award className="w-4 h-4" />
            <span>Algorithmic Skill Investment Ranking</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Career <span className="text-gradient-cyan">ROI Engine</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Calculated score = (Salary Impact + Market Demand + Job Availability) / (Learning Hours + Cost).
          </p>
        </div>
        <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
      </div>

      {/* ROI Ranked List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roiList.map((item, idx) => (
          <div 
            key={item.skill}
            className="glass-panel p-6 rounded-2xl border-slate-800 glass-card-hover space-y-4 relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 font-extrabold text-xs flex items-center justify-center border border-cyan-500/20">
                  #{idx + 1}
                </span>
                <h3 className="font-bold text-white text-base">{item.skill}</h3>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Career ROI</span>
                <div className="text-2xl font-black text-emerald-400">{item.roi_score}/100</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800/80">
              <div className="p-2.5 rounded-lg bg-slate-950/60 space-y-0.5">
                <span className="text-slate-400">Est. Salary Impact</span>
                <div className="font-mono font-bold text-cyan-300">{item.estimated_salary_impact}</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/60 space-y-0.5">
                <span className="text-slate-400">Learning Time</span>
                <div className="font-bold text-purple-300 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {item.estimated_learning_time}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
              <span>Demand: <strong className="text-slate-200">{item.market_demand}</strong></span>
              <span>Cost: <strong className="text-slate-200">{item.learning_cost}</strong></span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
