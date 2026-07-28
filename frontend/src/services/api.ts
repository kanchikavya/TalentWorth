const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export interface PredictPayload {
  job_role: string;
  years_experience: number;
  location: string;
  skills: string[];
  education?: string;
  industry?: string;
  work_preference?: string;
  current_salary?: number;
}

export interface SimulationPayload {
  job_role: string;
  base_experience: number;
  location: string;
  current_skills: string[];
  added_skills: string[];
  added_experience?: number;
  new_location?: string;
}

export interface NegotiationPayload {
  current_offer: number;
  job_role: string;
  years_experience: number;
  skills: string[];
}

export interface SalarySubmissionPayload {
  job_role: string;
  years_experience: number;
  location: string;
  skills: string[];
  salary: number;
}

async function request(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("talent_worth_token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: "API Error" }));
      throw new Error(err.detail || "Server request failed");
    }
    return await res.json();
  } catch (error) {
    console.error(`API Call Error (${endpoint}):`, error);
    throw error;
  }
}

export const api = {
  // Auth
  register: (data: any) => request("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data: any) => request("/auth/login", { method: "POST", body: JSON.stringify(data) }),

  // Predictions & Intelligence
  predictSalary: (data: PredictPayload) => request("/predict-salary", { method: "POST", body: JSON.stringify(data) }),
  matchRolesBySkills: (skills: string[], exp: number = 0) => request("/match-roles", { method: "POST", body: JSON.stringify({ skills, years_experience: exp }) }),
  getDegreeAdvisor: (degree: string) => request("/degree-career-advisor", { method: "POST", body: JSON.stringify({ degree }) }),
  getMarketPulse: (role: string = "Software Engineer") => request(`/market-pulse?role=${encodeURIComponent(role)}`),
  getSalaryWeather: (role: string = "Software Engineer") => request(`/salary-weather?role=${encodeURIComponent(role)}`),
  runSimulation: (data: SimulationPayload) => request("/career-simulation", { method: "POST", body: JSON.stringify(data) }),
  getSkillTree: (role: string = "Software Engineer") => request(`/skill-tree?role=${encodeURIComponent(role)}`),
  getCareerRoi: (skills: string[] = []) => request(`/career-roi?skills=${encodeURIComponent(skills.join(","))}`),
  getLocationArbitrage: (role: string = "Software Engineer") => request(`/location-arbitrage?role=${encodeURIComponent(role)}`),
  getCompanyInsights: (role: string = "Software Engineer") => request(`/company-insights?role=${encodeURIComponent(role)}`),
  getNegotiation: (data: NegotiationPayload) => request("/negotiation-assistant", { method: "POST", body: JSON.stringify(data) }),
  getTimeMachine: (role: string, exp: number, salary: number) => 
    request(`/career-time-machine?role=${encodeURIComponent(role)}&exp=${exp}&current_salary=${salary}`, { method: "POST" }),
  getMarketAlerts: () => request("/market-alerts"),
  getSkillObsolescence: () => request("/skill-obsolescence"),
  submitSalary: (data: SalarySubmissionPayload) => request("/salary-submission", { method: "POST", body: JSON.stringify(data) }),
  getAnonymousInsights: () => request("/anonymous-salary-insights"),
  
  // Digital Twin
  getDigitalTwin: () => request("/digital-twin"),
  updateDigitalTwin: (data: any) => request("/digital-twin", { method: "POST", body: JSON.stringify(data) }),

  // Admin
  getAdminMetrics: () => request("/admin/metrics"),
};
