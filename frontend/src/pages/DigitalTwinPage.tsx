import React, { useState, useEffect } from 'react';
import { User, CheckCircle2, Save, MapPin, Briefcase, RefreshCw, AlertOctagon } from 'lucide-react';
import { api } from '../services/api';
import { MarketDataBadge } from '../components/MarketDataBadge';
import { LocationSearchSelect } from '../components/LocationSearchSelect';
import { RoleSearchSelect } from '../components/RoleSearchSelect';
import { SkillSearchSelect } from '../components/SkillSearchSelect';
import { useLocationContext } from '../context/LocationContext';

const ROLE_CORE_SKILLS: Record<string, string[]> = {
  "Data Analyst": ["SQL / PostgreSQL", "Python", "PowerBI / Tableau", "Excel Advanced (VBA/Macros)", "Clinical Data Analysis (R/SAS)"],
  "Software Engineer": ["Python", "Java", "C++", "React", "TypeScript", "Node.js", "FastAPI", "Go", "Rust", "System Design", "SQL / PostgreSQL", "AWS", "Docker"],
  "Frontend Developer": ["React", "TypeScript", "JavaScript", "HTML/CSS", "CSS"],
  "Backend Developer": ["Python", "Java", "FastAPI", "Node.js", "SQL / PostgreSQL", "Go", "Rust", "Docker", "AWS"],
  "Full Stack Developer": ["React", "Node.js", "Python", "TypeScript", "SQL / PostgreSQL", "FastAPI", "AWS"],
  "Data Scientist": ["Python", "PyTorch", "TensorFlow", "SQL / PostgreSQL", "Generative AI"],
  "AI Engineer": ["Python", "PyTorch", "TensorFlow", "Generative AI"],
  "Embedded Systems Engineer (ECE)": ["Embedded C / C++", "Microcontrollers (ARM/ESP32)", "Verilog / VHDL"],
  "Mechanical Design Engineer (CAD/CAM)": ["AutoCAD / SolidWorks", "ANSYS Simulation"],
  "Civil Site Engineer": ["AutoCAD / SolidWorks", "STAAD Pro / ETABS Structural Analysis"],
  "BIM Modeler & Coordinator": ["Revit & BIM Modeling", "AutoCAD / SolidWorks"],
  "Financial Analyst": ["Financial Modeling & Valuation", "PowerBI / Tableau", "Excel Advanced (VBA/Macros)"]
};

export const DigitalTwinPage: React.FC = () => {
  const { globalLocation, formatSalary } = useLocationContext();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [twin, setTwin] = useState<any>({
    current_role: "Software Engineer",
    target_role: "Senior Full Stack Engineer",
    years_experience: 3.5,
    skills: ["Python", "React", "TypeScript", "FastAPI"],
    education: "B.Tech / B.E. (Computer Science / IT)",
    location: globalLocation,
    preferred_location: "Remote",
    work_preference: "Remote",
    current_salary: 95000,
    expected_salary: 125000,
    industry: "Technology",
    market_value: 114500,
    market_percentile: "Top 16%",
    career_readiness: 88,
    demand_score: 91
  });

  useEffect(() => {
    fetchTwin();
  }, []);

  const fetchTwin = async () => {
    try {
      setLoading(true);
      const res = await api.getDigitalTwin();
      setTwin(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.updateDigitalTwin(twin);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      fetchTwin();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Check if skills match core requirements for the current role
  const requiredCore = ROLE_CORE_SKILLS[twin.current_role] || [];
  const userSkills: string[] = twin.skills || [];
  
  let isSkillValid = true;
  if (userSkills.length > 0 && requiredCore.length > 0) {
    isSkillValid = userSkills.some(us => 
      requiredCore.some(rc => us.toLowerCase().includes(rc.toLowerCase()) || rc.toLowerCase().includes(us.toLowerCase()))
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-1">
            <User className="w-4 h-4" />
            <span>Personal Career Digital Twin</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Your Career <span className="text-gradient-cyan">Digital Twin</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Continuous real-time evaluation of your skills, experience, and location against live market data.
          </p>
        </div>
        <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Digital Twin Card Visualization */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border-cyan-500/30 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950 relative overflow-hidden space-y-6 shadow-2xl">
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-lg text-white">
                    DT
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{twin.current_role}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" /> {twin.location || globalLocation}
                  </p>
                </div>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono font-semibold">
                Twin Active
              </span>
            </div>

            {/* SKILLSET INSUFFICIENT WARNING BANNER */}
            {!isSkillValid && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-xs text-red-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-red-400 text-sm">
                  <AlertOctagon className="w-4 h-4" /> Skillset Insufficient / No Jobs
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300">
                  The entered skills [{userSkills.join(", ")}] do not meet core requirements for a <strong>{twin.current_role}</strong>. Employers require skills like {requiredCore.slice(0, 3).join(", ")}.
                </p>
              </div>
            )}

            {/* Core Evaluated Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl glass-panel border-slate-800 bg-slate-950/60 text-center space-y-1">
                <p className="text-[11px] text-slate-400 font-medium">Estimated Market Value</p>
                <div className={`text-xl font-black ${isSkillValid ? 'text-white text-gradient-cyan' : 'text-red-400 text-sm font-bold'}`}>
                  {isSkillValid ? formatSalary(twin.market_value || 114500) : "Skills Insufficient"}
                </div>
                <p className="text-[10px] text-slate-400">Location: {twin.location || globalLocation}</p>
              </div>

              <div className="p-4 rounded-xl glass-panel border-slate-800 bg-slate-950/60 text-center space-y-1">
                <p className="text-[11px] text-slate-400 font-medium">Market Percentile</p>
                <div className="text-xl font-black text-purple-400">
                  {isSkillValid ? (twin.market_percentile || "Top 18%") : "N/A"}
                </div>
                <p className="text-[10px] text-purple-300">vs {twin.current_role} peers</p>
              </div>

              <div className="p-4 rounded-xl glass-panel border-slate-800 bg-slate-950/60 text-center space-y-1">
                <p className="text-[11px] text-slate-400 font-medium">Career Readiness</p>
                <div className={`text-xl font-black ${isSkillValid ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isSkillValid ? `${twin.career_readiness || 88}/100` : "0/100"}
                </div>
                <p className="text-[10px] text-slate-400">Target: {twin.target_role}</p>
              </div>

              <div className="p-4 rounded-xl glass-panel border-slate-800 bg-slate-950/60 text-center space-y-1">
                <p className="text-[11px] text-slate-400 font-medium">Market Demand Score</p>
                <div className="text-xl font-black text-amber-400">
                  {isSkillValid ? `${twin.demand_score || 91}/100` : "Low Alignment"}
                </div>
                <p className="text-[10px] text-amber-300/80">Hiring Signal</p>
              </div>
            </div>

            {/* Current Skills Badge Display */}
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-semibold">Evaluated Skill Matrix:</label>
              <div className="flex flex-wrap gap-1.5">
                {(twin.skills || []).map((sk: string) => (
                  <span key={sk} className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 text-cyan-300 border border-slate-700">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right: Digital Twin Settings Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSave} className="glass-panel p-6 rounded-2xl border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              Configure Profile Variables
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Current Job Role (Searchable):</label>
                <RoleSearchSelect
                  value={twin.current_role}
                  onChange={(r) => setTwin({ ...twin, current_role: r })}
                  placeholder="Select current job role..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Target Role:</label>
                <input
                  type="text"
                  value={twin.target_role}
                  onChange={(e) => setTwin({ ...twin, target_role: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg p-2.5 focus:border-cyan-400 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Years of Experience:</label>
                <input
                  type="number"
                  step="0.5"
                  value={twin.years_experience}
                  onChange={(e) => setTwin({ ...twin, years_experience: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg p-2.5 focus:border-cyan-400 outline-none"
                />
              </div>

              {/* Worldwide Location Search Select */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Location Search:</label>
                <LocationSearchSelect
                  value={twin.location || globalLocation}
                  onChange={(loc) => setTwin({ ...twin, location: loc })}
                />
              </div>

            </div>

            {/* Searchable Multi-Select Skill Selector */}
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-medium">Skills Portfolio (Search & Select):</label>
              <SkillSearchSelect
                selectedSkills={twin.skills || []}
                onChange={(skills) => setTwin({ ...twin, skills })}
              />
            </div>

            {/* Save CTA */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-800">
              <span className="text-xs text-slate-400">
                {saved && <span className="text-emerald-400 flex items-center gap-1 font-medium"><CheckCircle2 className="w-4 h-4" /> Twin Evaluated & Saved!</span>}
              </span>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition flex items-center gap-2"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Re-evaluate Digital Twin
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
};
