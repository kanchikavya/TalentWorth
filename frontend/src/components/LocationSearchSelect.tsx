import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';

export const GLOBAL_LOCATIONS = [
  // North America
  "Austin, TX (USA)",
  "San Francisco, CA (USA)",
  "New York, NY (USA)",
  "Seattle, WA (USA)",
  "Boston, MA (USA)",
  "Chicago, IL (USA)",
  "Denver, CO (USA)",
  "Los Angeles, CA (USA)",
  "Toronto (Canada)",
  "Vancouver (Canada)",
  "Montreal (Canada)",

  // Europe
  "London (UK)",
  "Zurich (Switzerland)",
  "Amsterdam (Netherlands)",
  "Berlin (Germany)",
  "Munich (Germany)",
  "Paris (France)",
  "Dublin (Ireland)",
  "Stockholm (Sweden)",
  "Madrid (Spain)",
  "Warsaw (Poland)",

  // Asia-Pacific
  "Bangalore (India)",
  "Hyderabad (India)",
  "Mumbai (India)",
  "Delhi NCR (India)",
  "Tokyo (Japan)",
  "Singapore",
  "Sydney (Australia)",
  "Melbourne (Australia)",
  "Seoul (South Korea)",
  "Hong Kong",
  "Taipei (Taiwan)",

  // Middle East & Africa
  "Dubai (UAE)",
  "Tel Aviv (Israel)",
  "Riyadh (Saudi Arabia)",
  "Cape Town (South Africa)",

  // Latin America
  "Sao Paulo (Brazil)",
  "Mexico City (Mexico)",
  "Buenos Aires (Argentina)",

  // Remote
  "Remote (Global USD)",
  "Remote (US Rates)",
  "Remote (Europe Rates)",
  "Remote (Asia Rates)"
];

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export const LocationSearchSelect: React.FC<Props> = ({ value, onChange }) => {
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

  const filteredLocations = GLOBAL_LOCATIONS.filter(loc =>
    loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={containerRef} className="relative space-y-1 z-50">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg p-2.5 outline-none cursor-pointer flex items-center justify-between hover:border-cyan-400 transition"
      >
        <span className="flex items-center gap-2 truncate font-medium">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          {value || "Select or search location..."}
        </span>
        <span className="text-[10px] text-slate-400">▼</span>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full z-[100] w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden glass-panel max-h-72 flex flex-col">
          {/* Search bar inside dropdown */}
          <div className="p-2 border-b border-slate-800 flex items-center gap-2 bg-slate-950">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search worldwide city (e.g. Bangalore, London, Tokyo)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              className="w-full bg-transparent text-xs text-slate-200 border-none outline-none"
            />
          </div>

          <div className="overflow-y-auto max-h-60 py-1">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc) => (
                <div
                  key={loc}
                  onClick={() => {
                    onChange(loc);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className={`px-4 py-2 text-xs cursor-pointer hover:bg-cyan-500/20 hover:text-cyan-300 transition ${
                    value === loc ? "bg-cyan-500/10 text-cyan-400 font-bold" : "text-slate-300"
                  }`}
                >
                  {loc}
                </div>
              ))
            ) : (
              <div className="px-3 py-3 text-xs text-slate-500 text-center">
                No matching location.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
