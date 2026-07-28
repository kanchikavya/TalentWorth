import React, { useState, useEffect } from 'react';
import { GraduationCap, Sparkles, BookOpen, Award, CheckCircle2, MessageSquare, Lightbulb, Search } from 'lucide-react';
import { api } from '../services/api';
import { MarketDataBadge } from '../components/MarketDataBadge';

export const DegreeAdvisorPage: React.FC = () => {
  const [selectedDegree, setSelectedDegree] = useState("BCA (Computer Applications)");
  const [advisorData, setAdvisorData] = useState<any>(null);
  const [degreeSearch, setDegreeSearch] = useState("");

  // Suggestion box state
  const [userQuery, setUserQuery] = useState("");
  const [customResponse, setCustomResponse] = useState<string | null>(null);

  const degreesList = [
    "BCA (Computer Applications)",
    "B.Tech / B.E. (Computer Science / IT)",
    "B.Tech / B.E. (Electronics & Comm - ECE)",
    "B.Tech / B.E. (Electrical - EEE)",
    "B.Tech / B.E. (Mechanical - MECH)",
    "B.Tech / B.E. (Civil)",
    "B.Tech / B.E. (Chemical / Biotech)",
    "B.Arch (Architecture)",
    "MBBS / Medical Degree",
    "B.Pharm / Pharm.D",
    "B.Com / BBA / MBA",
    "MCA (Master of Computer Applications)",
    "BSc (Computer Science / IT)"
  ];

  const filteredDegrees = degreesList.filter(d => 
    d.toLowerCase().includes(degreeSearch.toLowerCase())
  );

  useEffect(() => {
    fetchAdvice();
  }, [selectedDegree]);

  const fetchAdvice = async () => {
    try {
      const res = await api.getDegreeAdvisor(selectedDegree);
      setAdvisorData(res.recommendation);
    } catch (e) {
      console.error(e);
    }
  };

  const generateRelevantAnswer = (query: string, degree: string): string => {
    const q = query.toLowerCase();

    if (q.includes("robotics") || q.includes("automation")) {
      return `For your query regarding Robotics & Automation in ${degree}: The most critical skills to master are Python + ROS (Robot Operating System), C++ for microcontrollers, and basic CAD modelling (SolidWorks). Completing 2 hands-on hardware/simulation projects increases entry-level recruitment offers by ~35%.`;
    }

    if (q.includes("embedded") || q.includes("hardware") || q.includes("vlsi")) {
      return `Targeting Embedded & Hardware systems for ${degree}: Focus on Embedded C/C++, ARM Cortex microcontrollers, and Verilog/VHDL for FPGA. Companies like Texas Instruments, Qualcomm, and Intel heavily prioritize candidates with strong circuit debugging & RTOS experience.`;
    }

    if (q.includes("civil") || q.includes("building") || q.includes("revit") || q.includes("cad")) {
      return `Regarding Civil Engineering & Construction Tech for ${degree}: Master BIM (Building Information Modeling) using Autodesk Revit alongside structural software like STAAD Pro or ETABS. Combining civil domain knowledge with Python automation scripts for BIM unlocks high-paying BIM Coordinator and Design Engineer packages.`;
    }

    if (q.includes("bca") || q.includes("web") || q.includes("full stack") || q.includes("frontend")) {
      return `For Web Development & Software roles as a ${degree} student: Focus 70% of your time on mastering JavaScript/TypeScript, React.js, and Node.js or Python FastAPI. Deploying 3 live full-stack projects on Vercel/AWS along with a clean GitHub portfolio will position you on par with CSE B.Tech graduates in placements.`;
    }

    if (q.includes("placement") || q.includes("job") || q.includes("campus") || q.includes("interview") || q.includes("freshers")) {
      return `To crack top tier placements in ${degree}: 1) Build 2 real-world portfolio projects solving practical problems. 2) Practice Data Structures, Algorithms, and SQL regularly. 3) Learn cloud deployment basics (AWS or Docker). Over 85% of recruiters prioritize verifiable project work over pure GPA.`;
    }

    if (q.includes("salary") || q.includes("package") || q.includes("lpa") || q.includes("rupees")) {
      return `Starting Salary insights for ${degree}: Fresh graduates with strong practical skills earn between ₹4.5 LPA to ₹12.5 LPA depending on role specialization (higher for AI, Cloud, VLSI, and Full Stack). Adding in-demand certifications like AWS Cloud or PyTorch boosts starting offers by ₹2.0 to ₹3.5 LPA.`;
    }

    if (q.includes("medical") || q.includes("mbbs") || q.includes("clinical") || q.includes("doctor")) {
      return `For HealthTech & Medical Careers under ${degree}: The fastest growing interdisciplinary sectors are Clinical Data Analytics (using R/SAS), Medical AI Imaging (DICOM processing), and Healthcare Informatics. Medical graduates with basic data analytical skills command high advisory and healthtech product leadership packages.`;
    }

    if (q.includes("finance") || q.includes("mba") || q.includes("bba") || q.includes("b.com")) {
      return `For Finance & Management career growth in ${degree}: Master Financial Modeling, PowerBI / Tableau, and Advanced SQL. Tech-enabled financial analysts who can write SQL queries and automate reports earn 25-30% higher compensation than traditional accounting candidates.`;
    }

    return `Answer regarding "${query}" for ${degree}: To achieve the best career outcome, prioritize gaining practical hands-on proficiency in ${advisorData?.core_skills_to_learn?.[0] || 'Python & SQL'}. Building 2 verified projects and obtaining a industry-recognized certification will directly address your goal and improve recruitment responses.`;
  };

  const handleCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    const answer = generateRelevantAnswer(userQuery, selectedDegree);
    setCustomResponse(answer);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Student & Graduate Career Guidance Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Student & Degree <span className="text-gradient-cyan">Career Advisor</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Select your degree or stream (BCA, B.Tech CSE/ECE/Mech/Civil, B.Arch, Medical, MBA, B.Com) to discover target IT, Semi-IT, and Core jobs.
          </p>
        </div>
        <MarketDataBadge isDemo={true} updatedTime="Updated 2 hours ago" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Select Degree Stream */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              1. Select Your Degree / Stream
            </h3>

            {/* Search Bar for Degree Stream */}
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-lg p-2">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search degree (e.g. BCA, ECE, Civil, MBBS)..."
                value={degreeSearch}
                onChange={(e) => setDegreeSearch(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-200 outline-none"
              />
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {filteredDegrees.map((deg) => (
                <button
                  key={deg}
                  onClick={() => { setSelectedDegree(deg); setCustomResponse(null); }}
                  className={`w-full p-3 rounded-xl border text-xs font-semibold text-left transition flex justify-between items-center ${
                    selectedDegree === deg
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-500/10"
                      : "bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <span>{deg}</span>
                  {selectedDegree === deg && <span className="text-cyan-400 text-xs">✓ Active</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Suggestion Box */}
          <div className="glass-panel p-6 rounded-2xl border-purple-500/30 bg-purple-500/5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-purple-400" />
              2. Student Career Suggestion Box
            </h3>
            <p className="text-xs text-slate-300">
              Ask your specific career, skill, placement, or software question for <strong>{selectedDegree}</strong>:
            </p>

            <form onSubmit={handleCustomQuestion} className="space-y-3">
              <textarea
                rows={3}
                placeholder={`Type your exact question (e.g. "Should I learn Python for robotics in Mechanical?", "How to get placements in BCA?", "What salary in rupees can I expect?")`}
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl p-3 outline-none focus:border-purple-400 resize-none"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-300 hover:to-pink-300 transition flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
              >
                <Sparkles className="w-4 h-4" />
                Get Tailored AI Advice
              </button>
            </form>

            {customResponse && (
              <div className="p-4 rounded-xl bg-slate-950/90 border border-purple-500/30 text-xs text-purple-200 space-y-1.5 leading-relaxed">
                <div className="font-bold text-purple-300 flex items-center gap-1.5 border-b border-purple-500/20 pb-1.5">
                  <MessageSquare className="w-4 h-4 text-purple-400" /> Tailored AI Answer:
                </div>
                <p className="pt-1">{customResponse}</p>
              </div>
            )}
          </div>

        </div>

        {/* Right: Advisor Recommendations Output */}
        <div className="lg:col-span-7 space-y-6">
          {advisorData && (
            <>
              {/* Target Roles Card */}
              <div className="glass-panel p-6 rounded-2xl border-cyan-500/30 bg-slate-900/90 space-y-6">
                
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">Target Role Recommendations</span>
                    <h2 className="text-2xl font-black text-white">{selectedDegree}</h2>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-medium">Starting Salary Range</span>
                    <div className="text-lg font-bold text-emerald-400">{advisorData.estimated_starting_range}</div>
                  </div>
                </div>

                {/* IT Roles */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-cyan-400" />
                    Recommended IT & Tech Job Roles:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {advisorData.recommended_it_roles?.map((r: string) => (
                      <span key={r} className="text-xs px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Semi-IT & Core Roles */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    Recommended Semi-IT & Core Industry Roles:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {advisorData.recommended_semi_it_roles?.map((r: string) => (
                      <span key={r} className="text-xs px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommended Skills to Learn */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    High-Value Skills to Learn for Top Salary:
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {advisorData.core_skills_to_learn?.map((sk: string) => (
                      <div key={sk} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-200 font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        {sk}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* AI Strategic Career Advice Box */}
              <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Strategic Advisor Overview for {selectedDegree}:
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  {advisorData.career_advice}
                </p>
              </div>
            </>
          )}
        </div>

      </div>

    </div>
  );
};
