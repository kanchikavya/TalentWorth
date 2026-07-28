import random
from typing import List, Dict, Any
from app.ml.engine import ml_pipeline, SKILL_VALUATIONS, LOCATION_MULTIPLIERS, ROLE_BASE_SALARIES, ROLE_CORE_SKILLS, EDUCATION_MULTIPLIERS

class MarketService:
    @staticmethod
    def get_market_pulse(role: str = "Software Engineer") -> Dict[str, Any]:
        base_sal = ROLE_BASE_SALARIES.get(role, 75000)
        
        # Calculate realistic range
        min_sal = round(base_sal * 0.78 / 500) * 500
        max_sal = round(base_sal * 1.42 / 500) * 500
        avg_sal = round(base_sal * 1.08 / 500) * 500

        # Deterministic hash for consistent metrics per role
        role_hash = sum(ord(c) for c in role)
        trend_30d = round(2.0 + (role_hash % 80) / 10.0, 1)
        trend_6m = round(5.0 + (role_hash % 150) / 10.0, 1)
        trend_1y = round(8.0 + (role_hash % 250) / 10.0, 1)
        active_postings = 12000 + (role_hash * 145) % 45000
        demand_score = min(99, max(65, 75 + (role_hash % 24)))
        competition_score = min(90, max(50, 60 + (role_hash % 30)))
        hiring_momentum = round(6.0 + (role_hash % 220) / 10.0, 1)

        weather = "Sunny" if demand_score >= 85 else "Stable"
        status = "🔥 High Demand" if demand_score >= 85 else "📈 Steady Hiring"

        monthly_trend = []
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
        for i, m in enumerate(months):
            factor = 0.92 + (i * 0.025) + ((role_hash * (i + 1)) % 5) / 100.0
            monthly_trend.append({
                "month": m,
                "avg_salary": round(avg_sal * factor / 500) * 500,
                "postings": int(active_postings * (0.85 + (i * 0.03)))
            })

        return {
            "role": role,
            "avg_salary": avg_sal,
            "min_salary": min_sal,
            "max_salary": max_sal,
            "trend_30d": trend_30d,
            "trend_6m": trend_6m,
            "trend_1y": trend_1y,
            "active_postings": active_postings,
            "demand_score": demand_score,
            "competition_score": competition_score,
            "hiring_momentum": hiring_momentum,
            "market_pulse_status": status,
            "weather": weather,
            "monthly_trend": monthly_trend
        }

    @staticmethod
    def match_roles_by_skills(skills: List[str], experience: float = 0.0) -> Dict[str, Any]:
        if not skills:
            return {"matches": []}

        user_skills_lower = [s.lower().strip() for s in skills]
        matched_roles = []

        for role_name, core_skills in ROLE_CORE_SKILLS.items():
            core_skills_lower = [cs.lower().strip() for cs in core_skills]
            
            matched_user_skills = []
            missing_skills = []

            for cs in core_skills:
                cs_lower = cs.lower().strip()
                if any(us in cs_lower or cs_lower in us for us in user_skills_lower):
                    matched_user_skills.append(cs)
                else:
                    missing_skills.append(cs)

            if len(matched_user_skills) > 0:
                match_pct = min(100, round((len(matched_user_skills) / max(1, len(core_skills))) * 100))
                base_salary = ROLE_BASE_SALARIES.get(role_name, 70000)
                exp_mult = 0.45 if experience == 0 else (0.45 + min(experience, 10) * 0.12)
                estimated_salary = round((base_salary * exp_mult) / 500) * 500

                matched_roles.append({
                    "role": role_name,
                    "match_percentage": match_pct,
                    "matched_skills": matched_user_skills,
                    "missing_skills": missing_skills[:3],
                    "estimated_salary": estimated_salary,
                    "demand_level": "🔥 High Demand" if match_pct >= 75 else "📈 Steady Hiring",
                    "core_required": core_skills[:4]
                })

        # Sort by match percentage descending
        matched_roles.sort(key=lambda x: x["match_percentage"], reverse=True)

        return {
            "evaluated_skills": skills,
            "experience": experience,
            "matches": matched_roles
        }

    @staticmethod
    def get_skill_tree(role: str = "Software Engineer") -> Dict[str, Any]:
        role_lower = role.lower()

        if "data analyst" in role_lower:
            return {
                "role": role,
                "recommended_next_skill": "Python (Pandas / NumPy)",
                "tree": [
                    {"id": 1, "name": "Excel Advanced (VBA/Macros)", "demand": "High", "difficulty": "Beginner", "salary_impact": "+12%", "relevance": 95, "postings": 45000},
                    {"id": 2, "name": "SQL & Relational Databases", "demand": "Critical", "difficulty": "Intermediate", "salary_impact": "+25%", "relevance": 98, "postings": 68000},
                    {"id": 3, "name": "PowerBI / Tableau Dashboards", "demand": "High", "difficulty": "Intermediate", "salary_impact": "+20%", "relevance": 92, "postings": 38000},
                    {"id": 4, "name": "Python for Data Analysis (Pandas)", "demand": "High", "difficulty": "Advanced", "salary_impact": "+30%", "relevance": 88, "postings": 52000}
                ]
            }
        else:
            return {
                "role": role,
                "recommended_next_skill": "System Design & Cloud Architecture",
                "tree": [
                    {"id": 1, "name": "Core Programming (Python/Java/C++)", "demand": "Critical", "difficulty": "Beginner", "salary_impact": "+15%", "relevance": 98, "postings": 95000},
                    {"id": 2, "name": "Data Structures & Algorithms", "demand": "High", "difficulty": "Intermediate", "salary_impact": "+22%", "relevance": 94, "postings": 85000},
                    {"id": 3, "name": "Web Frameworks (React / FastAPI / Node)", "demand": "High", "difficulty": "Intermediate", "salary_impact": "+28%", "relevance": 90, "postings": 72000},
                    {"id": 4, "name": "System Design & Cloud (AWS/Docker)", "demand": "Critical", "difficulty": "Advanced", "salary_impact": "+35%", "relevance": 96, "postings": 64000}
                ]
            }

    @staticmethod
    def get_career_roi(skills: List[str]) -> Dict[str, Any]:
        results = []
        skills_eval = skills if skills else ["Python", "AWS", "SQL / PostgreSQL", "React", "Docker"]
        
        for sk in skills_eval:
            val = SKILL_VALUATIONS.get(sk, 15000)
            roi_score = min(99, max(60, int(65 + (val / 1000))))
            results.append({
                "skill": sk,
                "roi_score": roi_score,
                "estimated_salary_impact": val,
                "estimated_learning_time": "4-8 Weeks",
                "market_demand": "High",
                "learning_cost": "Low ($150-$300)"
            })
        
        results.sort(key=lambda x: x["roi_score"], reverse=True)
        return {"skills_roi": results}

    @staticmethod
    def get_company_insights(role: str = "Software Engineer") -> Dict[str, Any]:
        base = ROLE_BASE_SALARIES.get(role, 75000)
        return {
            "role": role,
            "companies": [
                {"company": "Google", "tier": "FAANG / Tier 1", "level": "L4 Senior", "avg_base": int(base * 1.6), "min_total": int(base * 1.4), "max_total": int(base * 2.2), "bonus_pct": "20%", "remote_policy": "Hybrid"},
                {"company": "Microsoft", "tier": "FAANG / Tier 1", "level": "L62 Senior", "avg_base": int(base * 1.5), "min_total": int(base * 1.3), "max_total": int(base * 2.0), "bonus_pct": "18%", "remote_policy": "Flexible"},
                {"company": "Amazon", "tier": "FAANG / Tier 1", "level": "L5 Software Engineer", "avg_base": int(base * 1.55), "min_total": int(base * 1.35), "max_total": int(base * 2.1), "bonus_pct": "15%", "remote_policy": "In-Office"},
                {"company": "Stripe", "tier": "FinTech Unicorn", "level": "L3 Engineer", "avg_base": int(base * 1.45), "min_total": int(base * 1.25), "max_total": int(base * 1.9), "bonus_pct": "15%", "remote_policy": "Remote-First"},
                {"company": "OpenAI", "tier": "AI Research Lab", "level": "Member of Tech Staff", "avg_base": int(base * 2.1), "min_total": int(base * 1.8), "max_total": int(base * 3.0), "bonus_pct": "25%", "remote_policy": "Hybrid"},
                {"company": "Accenture", "tier": "IT Consulting Enterprise", "level": "Senior Analyst", "avg_base": int(base * 0.95), "min_total": int(base * 0.85), "max_total": int(base * 1.2), "bonus_pct": "10%", "remote_policy": "Client Site / Hybrid"}
            ]
        }

    @staticmethod
    def get_negotiation_assistant(current_offer: float, role: str, exp: float, skills: List[str]) -> Dict[str, Any]:
        base = ROLE_BASE_SALARIES.get(role, 75000)
        target = round(max(current_offer * 1.18, base * (0.5 + min(exp, 10) * 0.12) * 1.2) / 500) * 500

        script = f"""Dear Hiring Manager,

Thank you for extending the offer for the {role} position. Based on my {exp} years of specialized experience in {", ".join(skills[:3])}, market compensation benchmarks indicate a target compensation of ${target:,.0f}. I am enthusiastic about the opportunity and would love to align on ${target:,.0f} to finalize my acceptance.

Best regards,
[Your Name]"""

        return {
            "negotiation": {
                "current_offer": current_offer,
                "recommended_target": target,
                "increase_potential": f"+{round(((target - current_offer) / max(1, current_offer)) * 100, 1)}%",
                "email_script": script
            }
        }

    @staticmethod
    def get_market_alerts() -> Dict[str, Any]:
        return {
            "alerts": [
                {"id": 1, "title": "AI & Generative Modeling Skill Demand Spike", "timestamp": "1 hour ago", "type": "Demand Spike", "severity": "high", "detail": "Hiring listings requiring PyTorch and LLM Fine-Tuning surged by +34% globally over the last 30 days.", "salary_delta": 28000},
                {"id": 2, "title": "Embedded Systems & Automotive ECE Hiring Wave", "timestamp": "3 hours ago", "type": "Hiring Surge", "severity": "medium", "detail": "Autonomous vehicle and EV battery management systems added 4,500+ new listings across India and Germany.", "salary_delta": 18000},
                {"id": 3, "title": "Cloud Architecture & Infrastructure Optimization Shift", "timestamp": "5 hours ago", "type": "Market Shift", "severity": "medium", "detail": "AWS and FinOps cost optimization experience commands a 22% salary premium over general DevOps.", "salary_delta": 22000}
            ]
        }
