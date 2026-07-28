import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';

export const ALL_PRESET_SKILLS = [
  // IT & Tech
  "Python", "React", "TypeScript", "JavaScript", "FastAPI", "Node.js", "AWS", "Docker", "Kubernetes", 
  "PyTorch", "TensorFlow", "Generative AI", "System Design", "SQL / PostgreSQL", "Go", "Rust", "CI/CD", 
  "GraphQL", "Microservices", "Java", "C++", "HTML/CSS", "Git",

  // Core Engineering & Hardware (ECE, Mech, Civil, EEE)
  "AutoCAD / SolidWorks", "Revit & BIM Modeling", "Embedded C / C++", "Verilog / VHDL", "MATLAB & Simulink", 
  "PLC & SCADA Industrial Automation", "STAAD Pro / ETABS Structural Analysis", "GIS & Mapping Software", 
  "ANSYS Simulation", "Microcontrollers (ARM/ESP32)", "IoT Protocols (MQTT)", "ROS (Robot Operating System)",

  // Medical & Life Sciences
  "Clinical Data Analysis (R/SAS)", "Healthcare Informatics / EHR", "Medical Image Processing (DICOM/AI)", 
  "Good Clinical Practice (GCP)", "Pharmacovigilance", "Biotech Research", "Genomics Data",

  // Business, Finance & Analytics
  "Financial Modeling & Valuation", "PowerBI / Tableau", "Google Analytics & SEO", "Excel Advanced (VBA/Macros)", 
  "Agile / Scrum Master", "Product Analytics", "Supply Chain Optimization"
];

interface Props {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
  placeholder?: string;
}

export const SkillSearchSelect: React.FC<Props> = ({ selectedSkills, onChange, placeholder = "Search & select skills (e.g. AWS, AutoCAD, Python)..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSkills = ALL_PRESET_SKILLS.filter(sk =>
    sk.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedSkills.includes(sk)
  );

  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      onChange([...selectedSkills, skill]);
    }
    setSearchTerm("");
  };

  const removeSkill = (skill: string) => {
    onChange(selectedSkills.filter(s => s !== skill));
  };

  const handleCustomAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() && !selectedSkills.includes(searchTerm.trim())) {
      addSkill(searchTerm.trim());
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-lg p-2 focus-within:border-cyan-400">
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setIsOpen(true); }}
            onFocus={() => setIsOpen(true)}
            className="w-full bg-transparent text-xs text-slate-200 border-none outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleCustomAdd}
              className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-[10px] font-bold rounded hover:bg-cyan-500/30 shrink-0"
            >
              + Add Custom
            </button>
          )}
        </div>

        {isOpen && searchTerm.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden glass-panel max-h-48 flex flex-col">
            <div className="overflow-y-auto max-h-44 py-1">
              {filteredSkills.length > 0 ? (
                filteredSkills.map((sk) => (
                  <div
                    key={sk}
                    onClick={() => {
                      addSkill(sk);
                      setIsOpen(false);
                    }}
                    className="px-3 py-1.5 text-xs text-slate-300 cursor-pointer hover:bg-cyan-500/20 hover:text-cyan-300 transition flex items-center justify-between"
                  >
                    <span>{sk}</span>
                    <Plus className="w-3 h-3 text-cyan-400" />
                  </div>
                ))
              ) : (
                <div 
                  onClick={handleCustomAdd}
                  className="px-3 py-2 text-xs text-cyan-400 cursor-pointer hover:bg-cyan-500/10 text-center font-semibold"
                >
                  Press Enter to add custom skill "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Render Selected Skills Chips */}
      {selectedSkills.length > 0 ? (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {selectedSkills.map(sk => (
            <span key={sk} className="text-xs px-2.5 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700 flex items-center gap-1.5">
              {sk}
              <button type="button" onClick={() => removeSkill(sk)} className="text-slate-400 hover:text-red-400">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-slate-500 italic">No skills selected yet. Type above to search and select your skills.</p>
      )}
    </div>
  );
};
