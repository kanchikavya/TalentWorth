import React, { useState, useRef, useEffect } from 'react';
import { Briefcase, Search } from 'lucide-react';

export interface RoleCategory {
  category: string;
  roles: string[];
}

export const JOB_ROLE_CATEGORIES: RoleCategory[] = [
  {
    category: "💻 IT & Software Roles",
    roles: [
      "Software Engineer",
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Data Analyst",
      "Data Scientist",
      "AI Engineer",
      "Machine Learning Engineer",
      "DevOps Engineer",
      "Cloud Engineer",
      "Cybersecurity Engineer",
      "Web Developer (BCA/BSc)",
      "Database Administrator",
      "QA & Test Automation Engineer",
      "IT Support Specialist",
      "System Administrator"
    ]
  },
  {
    category: "⚙️ Core Engineering (ECE, Mech, Civil, EEE, B.Arch)",
    roles: [
      "Embedded Systems Engineer (ECE)",
      "VLSI Design Engineer (ECE)",
      "IoT & Automation Specialist",
      "Electrical Design Engineer (EEE)",
      "Power Systems Engineer (EEE)",
      "Mechanical Design Engineer (CAD/CAM)",
      "Robotics & Mechatronics Engineer",
      "Automotive Engineer (Mech)",
      "Civil Site Engineer",
      "Structural Engineer (Civil)",
      "BIM Modeler & Coordinator",
      "Architectural Designer (B.Arch)",
      "Urban Planner"
    ]
  },
  {
    category: "🩺 Medical & Healthcare",
    roles: [
      "General Physician / Doctor (MBBS)",
      "Medical Data Analyst / Informatics",
      "Clinical Research Associate",
      "Healthcare Administrator",
      "Pharmacist (B.Pharm/M.Pharm)",
      "Biotech Research Scientist"
    ]
  },
  {
    category: "📊 Business, Finance & Management",
    roles: [
      "Financial Analyst",
      "Investment Banker",
      "Business Analyst",
      "Digital Marketing Specialist",
      "HR Manager / Specialist",
      "Supply Chain & Operations Manager",
      "Product Manager"
    ]
  }
];

interface Props {
  value: string;
  onChange: (role: string) => void;
  placeholder?: string;
}

export const RoleSearchSelect: React.FC<Props> = ({ value, onChange, placeholder = "Select your target job role..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCategories = JOB_ROLE_CATEGORIES.map(cat => ({
    category: cat.category,
    roles: cat.roles.filter(r => r.toLowerCase().includes(searchTerm.toLowerCase()))
  })).filter(cat => cat.roles.length > 0);

  return (
    <div ref={containerRef} className="relative space-y-1 z-50">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg p-2.5 outline-none cursor-pointer flex items-center justify-between hover:border-cyan-400 transition"
      >
        <span className={`flex items-center gap-2 truncate ${!value ? 'text-slate-500' : 'text-slate-200 font-semibold'}`}>
          <Briefcase className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          {value || placeholder}
        </span>
        <span className="text-[10px] text-slate-400">▼</span>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full z-[100] w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden glass-panel max-h-72 flex flex-col">
          {/* Search Bar */}
          <div className="p-2 border-b border-slate-800 flex items-center gap-2 bg-slate-950">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search target role (e.g. Embedded, Full Stack, Civil, MBBS)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              className="w-full bg-transparent text-xs text-slate-200 border-none outline-none"
            />
          </div>

          <div className="overflow-y-auto max-h-60 py-1">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <div key={cat.category} className="space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-slate-950/95 sticky top-0 border-b border-slate-800/60 z-10">
                    {cat.category}
                  </div>
                  {cat.roles.map((r) => (
                    <div
                      key={r}
                      onClick={() => {
                        onChange(r);
                        setIsOpen(false);
                        setSearchTerm("");
                      }}
                      className={`px-4 py-2 text-xs cursor-pointer hover:bg-cyan-500/20 hover:text-cyan-300 transition ${
                        value === r ? "bg-cyan-500/10 text-cyan-400 font-bold" : "text-slate-300"
                      }`}
                    >
                      {r}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="px-3 py-3 text-xs text-slate-500 text-center">
                No matching role found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
