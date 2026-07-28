import React from 'react';
import { Activity, Clock } from 'lucide-react';

interface Props {
  isDemo?: boolean;
  updatedTime?: string;
}

export const MarketDataBadge: React.FC<Props> = ({ isDemo = true, updatedTime = "Updated 2 hours ago" }) => {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-medium ${
        isDemo 
          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
      }`}>
        <Activity className="w-3.5 h-3.5 animate-pulse" />
        {isDemo ? "Demo Market Data" : "Live Market Signals"}
      </span>
      <span className="inline-flex items-center gap-1 text-slate-400">
        <Clock className="w-3 h-3" />
        {updatedTime}
      </span>
    </div>
  );
};
