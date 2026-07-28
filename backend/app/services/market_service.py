import random
from typing import List, Dict, Any
from app.ml.engine import ml_pipeline, SKILL_VALUATIONS, LOCATION_MULTIPLIERS, ROLE_BASE_SALARIES, EDUCATION_MULTIPLIERS

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

        # Generate 6-month historical monthly trend points for graph
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
    def get_skill_tree(role: str = "Software Engineer") -> Dict[str, Any]:
        role_lower = role.lower()

        if "data analyst" in role_lower:
            tree = [
                {"id": "sql_core", "name": "SQL & Relational Databases", "demand": "Crucial", "relevance": 98, "salary_impact": "+$4,000", "difficulty": "Low", "postings": 58000, "children": ["bi_tools", "python_data"]},
                {"id": "bi_tools", "name": "PowerBI / Tableau Visualization", "demand": "High", "relevance": 92, "salary_impact": "+$5,500", "difficulty": "Medium", "postings": 42000, "children": ["excel_adv"]},
                {"id": "excel_adv", "name": "Advanced Excel (VBA/Macros)", "demand": "High", "relevance": 88, "salary_impact": "+$3,500", "difficulty": "Low-Medium", "postings": 38000, "children": []},
                {"id": "python_data", "name": "Python for Data Analysis (Pandas/NumPy)", "demand": "Explosive", "relevance": 96, "salary_impact": "+$7,500", "difficulty": "Medium", "postings": 49000, "children": ["stats_ml"]},
                {"id": "stats_ml", "name": "Statistical Modeling & Predictive Analytics", "demand": "Very High", "relevance": 90, "salary_impact": "+$9,000", "difficulty": "High", "postings": 28000, "children": []}
            ]
            next_skill = "Python for Data Analysis (Pandas/NumPy)"

        elif "embedded" in role_lower or "ece" in role_lower:
            tree = [
                {"id": "embedded_c", "name": "Embedded C / C++", "demand": "Crucial", "relevance": 98, "salary_impact": "+$7,500", "difficulty": "Medium", "postings": 32000, "children": ["arm_mcu", "verilog"]},
                {"id": "arm_mcu", "name": "ARM Cortex & Microcontrollers (ESP32/STM32)", "demand": "High", "relevance": 94, "salary_impact": "+$6,000", "difficulty": "Medium", "postings": 24000, "children": ["rtos"]},
                {"id": "rtos", "name": "Real-Time Operating Systems (FreeRTOS)", "demand": "Very High", "relevance": 91, "salary_impact": "+$8,500", "difficulty": "High", "postings": 18000, "children": []},
                {"id": "verilog", "name": "Verilog / VHDL (FPGA Design)", "demand": "Explosive", "relevance": 95, "salary_impact": "+$9,000", "difficulty": "High", "postings": 16000, "children": []}
            ]
            next_skill = "Real-Time Operating Systems (FreeRTOS)"

        elif "mechanical" in role_lower or "cad" in role_lower:
            tree = [
                {"id": "autocad", "name": "AutoCAD & SOLIDWORKS 3D CAD", "demand": "Crucial", "relevance": 96, "salary_impact": "+$5,500", "difficulty": "Medium", "postings": 36000, "children": ["ansys", "plc"]},
                {"id": "ansys", "name": "ANSYS FEA & Thermal Simulation", "demand": "High", "relevance": 90, "salary_impact": "+$7,000", "difficulty": "High", "postings": 22000, "children": []},
                {"id": "plc", "name": "PLC & SCADA Industrial Automation", "demand": "Very High", "relevance": 93, "salary_impact": "+$7,500", "difficulty": "Medium-High", "postings": 28000, "children": []}
            ]
            next_skill = "PLC & SCADA Industrial Automation"

        elif "civil" in role_lower or "bim" in role_lower:
            tree = [
                {"id": "revit", "name": "Autodesk Revit & BIM Modeling", "demand": "Crucial", "relevance": 97, "salary_impact": "+$6,500", "difficulty": "Medium", "postings": 31000, "children": ["staad", "gis"]},
                {"id": "staad", "name": "STAAD Pro & ETABS Structural Analysis", "demand": "High", "relevance": 92, "salary_impact": "+$6,800", "difficulty": "High", "postings": 21000, "children": []},
                {"id": "gis", "name": "GIS & Spatial Mapping Software", "demand": "High", "relevance": 88, "salary_impact": "+$5,000", "difficulty": "Medium", "postings": 19000, "children": []}
            ]
            next_skill = "STAAD Pro & ETABS Structural Analysis"

        elif "ai" in role_lower or "machine learning" in role_lower:
            tree = [
                {"id": "python_core", "name": "Python & Data Science Stack", "demand": "Crucial", "relevance": 99, "salary_impact": "+$6,000", "difficulty": "Low", "postings": 62000, "children": ["pytorch", "gen_ai"]},
                {"id": "pytorch", "name": "PyTorch / TensorFlow Deep Learning", "demand": "Explosive", "relevance": 97, "salary_impact": "+$12,000", "difficulty": "High", "postings": 34000, "children": ["mlops"]},
                {"id": "gen_ai", "name": "Generative AI & LLM Fine-Tuning", "demand": "Explosive", "relevance": 99, "salary_impact": "+$15,000", "difficulty": "High", "postings": 29000, "children": []},
                {"id": "mlops", "name": "MLOps & Model Deployment (AWS SageMaker)", "demand": "Very High", "relevance": 93, "salary_impact": "+$10,000", "difficulty": "High", "postings": 21000, "children": []}
            ]
            next_skill = "Generative AI & LLM Fine-Tuning"

        elif "finance" in role_lower or "business" in role_lower:
            tree = [
                {"id": "excel_fin", "name": "Advanced Excel & Financial Modeling", "demand": "Crucial", "relevance": 97, "salary_impact": "+$6,500", "difficulty": "Medium", "postings": 45000, "children": ["powerbi", "sql_fin"]},
                {"id": "powerbi", "name": "PowerBI / Tableau Business Analytics", "demand": "High", "relevance": 92, "salary_impact": "+$5,500", "difficulty": "Medium", "postings": 38000, "children": []},
                {"id": "sql_fin", "name": "SQL Data Analytics for Business", "demand": "Very High", "relevance": 94, "salary_impact": "+$7,000", "difficulty": "Medium", "postings": 41000, "children": []}
            ]
            next_skill = "PowerBI / Tableau Business Analytics"

        else: # Default Software Engineer / Full Stack
            tree = [
                {"id": "core_lang", "name": "Python / JavaScript / TypeScript", "demand": "High", "relevance": 95, "salary_impact": "+$5,000", "difficulty": "Low", "postings": 55000, "children": ["backend_fw", "cloud_infra", "ai_ml"]},
                {"id": "backend_fw", "name": "React / FastAPI / Node.js", "demand": "High", "relevance": 90, "salary_impact": "+$4,500", "difficulty": "Medium", "postings": 38000, "children": ["database"]},
                {"id": "database", "name": "PostgreSQL & System Design", "demand": "Very High", "relevance": 94, "salary_impact": "+$9,000", "difficulty": "Medium-High", "postings": 42000, "children": []},
                {"id": "cloud_infra", "name": "AWS & Cloud Infrastructure", "demand": "Crucial", "relevance": 96, "salary_impact": "+$8,500", "difficulty": "Medium", "postings": 52000, "children": ["containers"]},
                {"id": "containers", "name": "Docker & Kubernetes", "demand": "High", "relevance": 91, "salary_impact": "+$7,000", "difficulty": "High", "postings": 34000, "children": []},
                {"id": "ai_ml", "name": "Generative AI & PyTorch", "demand": "Explosive", "relevance": 99, "salary_impact": "+$15,000", "difficulty": "High", "postings": 28000, "children": []}
            ]
            next_skill = "AWS & Cloud Infrastructure"

        return {
            "role": role,
            "tree": tree,
            "recommended_next_skill": next_skill
        }

    @staticmethod
    def get_degree_advisor_recommendation(degree: str) -> Dict[str, Any]:
        degree_map = {
            "BCA (Computer Applications)": {
                "recommended_it_roles": ["Web Developer (BCA/BSc)", "Full Stack Developer", "Data Analyst", "Database Administrator"],
                "recommended_semi_it_roles": ["IT Support Specialist", "QA & Test Automation Engineer", "Digital Marketing Specialist"],
                "core_skills_to_learn": ["JavaScript & React", "Python & SQL", "Cloud Basics (AWS)", "Git & System Admin"],
                "estimated_starting_range": "₹4,20,000 – ₹7,80,000 / yr",
                "career_advice": "With a BCA degree, building hands-on portfolio projects in React, Python, and SQL is the fastest pathway to high-paying IT roles. Adding AWS or DevOps certification increases entry-level salary by ~18%."
            },
            "B.Tech / B.E. (Computer Science / IT)": {
                "recommended_it_roles": ["Software Engineer", "Full Stack Developer", "AI Engineer", "Cloud Engineer", "Cybersecurity Engineer"],
                "recommended_semi_it_roles": ["Product Manager", "System Administrator", "Data Scientist"],
                "core_skills_to_learn": ["System Design & Microservices", "AWS / Docker / Kubernetes", "PyTorch / Generative AI", "Rust / Go"],
                "estimated_starting_range": "₹5,50,000 – ₹12,50,000 / yr",
                "career_advice": "As a CSE graduate, mastering Distributed Systems, Data Structures, and Cloud Architecture (AWS/GCP) unlocks top tier product engineering salaries."
            },
            "B.Tech / B.E. (Electronics & Comm - ECE)": {
                "recommended_it_roles": ["Embedded Systems Engineer (ECE)", "VLSI Design Engineer (ECE)", "IoT & Automation Specialist"],
                "recommended_semi_it_roles": ["Software Engineer", "Telecom & Network Engineer", "Robotics Engineer"],
                "core_skills_to_learn": ["Embedded C / C++", "Verilog / VHDL", "Python & Microcontrollers (ARM/ESP32)", "IoT Protocols (MQTT/CoAP)"],
                "estimated_starting_range": "₹4,80,000 – ₹9,80,000 / yr",
                "career_advice": "ECE students have a unique advantage in Hardware-Software synergy. Mastering Embedded C and VLSI opens high-demand semiconductor & IoT hardware-software roles."
            },
            "B.Tech / B.E. (Mechanical - MECH)": {
                "recommended_it_roles": ["Robotics & Mechatronics Engineer", "Mechanical Design Engineer (CAD/CAM)", "Automotive Engineer"],
                "recommended_semi_it_roles": ["PLC & SCADA Industrial Automation", "Data Analyst (Industrial/Manufacturing)", "Product Manager"],
                "core_skills_to_learn": ["SolidWorks / ANSYS", "Python for Data Analysis", "PLC Automation", "ROS (Robot Operating System)"],
                "estimated_starting_range": "₹4,50,000 – ₹8,20,000 / yr",
                "career_advice": "Mechanical engineers can bridge into Semi-IT via Industrial Automation, Robotics, or CAD/CAM simulation software design."
            },
            "B.Tech / B.E. (Civil)": {
                "recommended_it_roles": ["BIM Modeler & Coordinator", "Structural Engineer (Civil)", "Civil Site Engineer"],
                "recommended_semi_it_roles": ["GIS & Spatial Analyst", "Project Manager", "Construction Data Analyst"],
                "core_skills_to_learn": ["AutoCAD & Revit", "STAAD Pro / ETABS", "GIS & Spatial Data", "Python for BIM Scripts"],
                "estimated_starting_range": "₹4,20,000 – ₹7,50,000 / yr",
                "career_advice": "Civil engineering graduates are in high demand for Smart Infrastructure and BIM (Building Information Modeling) automation using Revit and Python spatial analytics."
            },
            "B.Arch (Architecture)": {
                "recommended_it_roles": ["Architectural Designer (B.Arch)", "BIM Modeler & Coordinator", "Urban Planner"],
                "recommended_semi_it_roles": ["3D Visualization Specialist", "UX/UI Spatial Designer"],
                "core_skills_to_learn": ["Revit Architecture", "Rhino & Grasshopper Parametric", "3ds Max & V-Ray", "Unreal Engine Architectural Viz"],
                "estimated_starting_range": "₹4,50,000 – ₹8,50,000 / yr",
                "career_advice": "B.Arch students can double their market value by combining architectural design with 3D real-time visualization (Unreal Engine) or Parametric BIM design."
            },
            "MBBS / Medical Degree": {
                "recommended_it_roles": ["General Physician / Doctor (MBBS)", "Medical Data Analyst / Informatics", "Clinical Research Associate"],
                "recommended_semi_it_roles": ["Healthcare Administrator", "Biotech Research Scientist", "HealthTech Product Manager"],
                "core_skills_to_learn": ["Healthcare Informatics (EHR/FHIR)", "Clinical Data Analysis (R/SAS)", "AI Medical Imaging (DICOM)", "Health Regulations (HIPAA/FDA)"],
                "estimated_starting_range": "₹8,50,000 – ₹18,00,000 / yr",
                "career_advice": "Medical degree holders are increasingly entering HealthTech & Medical Informatics. Combining clinical knowledge with AI Medical Data Analysis commands premium salaries."
            },
            "B.Com / BBA / MBA": {
                "recommended_it_roles": ["Financial Analyst", "Investment Banker", "Business Analyst", "Product Manager"],
                "recommended_semi_it_roles": ["Digital Marketing Specialist", "HR Manager / Specialist", "Supply Chain Manager"],
                "core_skills_to_learn": ["Financial Modeling", "PowerBI & Tableau", "Python for Finance", "Advanced Excel & SQL"],
                "estimated_starting_range": "₹4,80,000 – ₹12,00,000 / yr",
                "career_advice": "Management & Commerce students achieve highest career ROI by mastering Business Analytics tools (SQL + PowerBI/Tableau) alongside Financial Modeling."
            }
        }

        default_res = {
            "recommended_it_roles": ["Software Engineer", "Full Stack Developer", "Data Analyst", "Business Analyst"],
            "recommended_semi_it_roles": ["IT Support Specialist", "Digital Marketing Specialist", "Project Coordinator"],
            "core_skills_to_learn": ["Python & Data Analysis", "SQL & Relational Databases", "Web Technologies", "Cloud Computing Basics"],
            "estimated_starting_range": "₹4,50,000 – ₹8,50,000 / yr",
            "career_advice": "Building strong foundational digital skills in Data Analysis, SQL, and Web Frameworks creates versatile high-earning career options across IT and Non-IT industries."
        }

        return degree_map.get(degree, default_res)

    @staticmethod
    def run_what_if_simulation(
        job_role: str,
        base_exp: float,
        location: str,
        current_skills: List[str],
        added_skills: List[str],
        added_exp: float = 0.0,
        new_location: str = None
    ) -> Dict[str, Any]:
        
        target_location = new_location if new_location else location
        base_pred = ml_pipeline.predict(job_role, base_exp, location, current_skills)
        
        all_skills = list(set(current_skills + added_skills))
        sim_exp = base_exp + added_exp
        sim_pred = ml_pipeline.predict(job_role, sim_exp, target_location, all_skills)

        salary_diff = sim_pred["predicted_salary"] - base_pred["predicted_salary"]
        percentage_gain = round((salary_diff / max(1, base_pred["predicted_salary"])) * 100, 1)

        return {
            "original_salary": base_pred["predicted_salary"],
            "simulated_salary": sim_pred["predicted_salary"],
            "salary_difference": salary_diff,
            "percentage_gain": f"+{percentage_gain}%" if percentage_gain >= 0 else f"{percentage_gain}%",
            "added_skills": added_skills,
            "added_experience": added_exp,
            "new_location": target_location,
            "impact_breakdown": [
                {"item": skill, "estimated_value": f"+${SKILL_VALUATIONS.get(skill, 4000):,.0f}"} for skill in added_skills
            ] + ([{"item": f"+{added_exp} yrs Experience", "estimated_value": f"+${added_exp * 6400:,.0f}"}] if added_exp > 0 else []),
            "disclaimer": "Simulations represent non-binding mathematical model estimations."
        }

    @staticmethod
    def get_career_roi(user_skills: List[str]) -> List[Dict[str, Any]]:
        all_skills = [
            {"skill": "Generative AI", "val": 11000, "hours": 90, "cost": "Low", "demand": "Explosive"},
            {"skill": "AWS Cloud", "val": 6500, "hours": 60, "cost": "Low", "demand": "High"},
            {"skill": "Rust Programming", "val": 7500, "hours": 100, "cost": "Low", "demand": "High"},
            {"skill": "Kubernetes", "val": 5500, "hours": 70, "cost": "Low", "demand": "High"},
            {"skill": "System Design", "val": 7500, "hours": 80, "cost": "Low", "demand": "Very High"},
            {"skill": "Docker", "val": 3500, "hours": 25, "cost": "Low", "demand": "High"},
            {"skill": "PyTorch", "val": 9500, "hours": 110, "cost": "Medium", "demand": "High"}
        ]
        
        result = []
        for s in all_skills:
            if s["skill"] not in user_skills:
                roi_score = int(round((s["val"] / s["hours"]) * 0.5 + 40))
                roi_score = min(99, max(50, roi_score))
                result.append({
                    "skill": s["skill"],
                    "estimated_salary_impact": f"+${s['val']:,.0f}",
                    "estimated_learning_time": f"{s['hours']} hours",
                    "learning_cost": s["cost"],
                    "market_demand": s["demand"],
                    "roi_score": roi_score
                })
        
        return sorted(result, key=lambda x: x["roi_score"], reverse=True)

    @staticmethod
    def get_location_arbitrage(role: str) -> List[Dict[str, Any]]:
        cities = [
            {"city": "Austin, TX (USA)", "base_sal": 115000, "col_index": 100, "state_tax": "0%", "rent_index": 72},
            {"city": "San Francisco, CA (USA)", "base_sal": 155000, "col_index": 178, "state_tax": "9.3%", "rent_index": 165},
            {"city": "New York, NY (USA)", "base_sal": 148000, "col_index": 182, "state_tax": "6.8%", "rent_index": 175},
            {"city": "London (UK)", "base_sal": 110000, "col_index": 120, "state_tax": "20%", "rent_index": 115},
            {"city": "Zurich (Switzerland)", "base_sal": 150000, "col_index": 140, "state_tax": "12%", "rent_index": 130},
            {"city": "Tokyo (Japan)", "base_sal": 95000, "col_index": 90, "state_tax": "10%", "rent_index": 80},
            {"city": "Singapore", "base_sal": 125000, "col_index": 125, "state_tax": "11%", "rent_index": 135},
            {"city": "Bangalore (India)", "base_sal": 45000, "col_index": 35, "state_tax": "15%", "rent_index": 25},
            {"city": "Berlin (Germany)", "base_sal": 98000, "col_index": 95, "state_tax": "30%", "rent_index": 82},
            {"city": "Sydney (Australia)", "base_sal": 118000, "col_index": 115, "state_tax": "22%", "rent_index": 110},
            {"city": "Remote (Global USD)", "base_sal": 120000, "col_index": 95, "state_tax": "Varies", "rent_index": 65},
        ]
        
        output = []
        for c in cities:
            gross = c["base_sal"]
            tax_rate = 0.22 if c["state_tax"] == "0%" else 0.28
            net_pay = gross * (1 - tax_rate)
            real_purchasing_power = round((net_pay / c["col_index"]) * 100, -2)

            output.append({
                "city": c["city"],
                "gross_salary": gross,
                "cost_of_living_index": c["col_index"],
                "estimated_state_tax": c["state_tax"],
                "est_monthly_rent": f"${int(c['rent_index'] * 18):,}",
                "net_take_home": round(net_pay, -2),
                "real_purchasing_power": real_purchasing_power,
                "rating": "High Purchasing Power" if real_purchasing_power > 85000 else "Standard Cost Area"
            })
        return sorted(output, key=lambda x: x["real_purchasing_power"], reverse=True)

    @staticmethod
    def get_company_heatmap(role: str) -> List[Dict[str, Any]]:
        return [
            {"company": "Google", "est_salary": 165000, "tier": "FAANG", "open_positions": 140, "remote": "Hybrid", "trend": "+12%"},
            {"company": "Meta", "est_salary": 162000, "tier": "FAANG", "open_positions": 115, "remote": "Hybrid", "trend": "+10%"},
            {"company": "Anthropic", "est_salary": 185000, "tier": "AI Unicorn", "open_positions": 45, "remote": "Full Remote", "trend": "+28%"},
            {"company": "OpenAI", "est_salary": 195000, "tier": "AI Unicorn", "open_positions": 38, "remote": "Hybrid", "trend": "+32%"},
            {"company": "Stripe", "est_salary": 152000, "tier": "FinTech Unicorn", "open_positions": 62, "remote": "Full Remote", "trend": "+8%"},
            {"company": "Amazon", "est_salary": 145000, "tier": "FAANG", "open_positions": 310, "remote": "On-site/Hybrid", "trend": "+5%"},
            {"company": "Microsoft", "est_salary": 148000, "tier": "Big Tech", "open_positions": 220, "remote": "Hybrid", "trend": "+7%"}
        ]

    @staticmethod
    def generate_negotiation(current_offer: float, role: str, experience: float, skills: List[str]) -> Dict[str, Any]:
        target_min = round(current_offer * 1.08, -3)
        target_ideal = round(current_offer * 1.15, -3)
        target_stretch = round(current_offer * 1.22, -3)

        email_template = (
            f"Subject: Salary Negotiation - {role} Position\n\n"
            f"Dear Hiring Team,\n\n"
            f"Thank you for extending the offer of ${current_offer:,.0f} for the {role} position. "
            f"I am extremely enthusiastic about joining the team.\n\n"
            f"Based on current market data for candidates with my {experience:.1f} years of experience "
            f"and specialized skills in {', '.join(skills[:3]) if skills else 'modern tech stack'}, "
            f"the average market range for this role sits between ${target_min:,.0f} and ${target_stretch:,.0f}. "
            f"Would you be open to adjusting the base salary to ${target_ideal:,.0f} to align with these market signals?\n\n"
            f"Best regards,\n[Your Name]"
        )

        counter_talking_points = [
            f"Emphasize immediate productivity due to your hands-on proficiency in {', '.join(skills[:2]) if skills else 'core stack'}.",
            f"Reference current market percentile data showing ${target_ideal:,.0f} as competitive for your experience level.",
            "If base salary is rigid, inquire about performance bonuses, signing bonuses, or equity grants."
        ]

        return {
            "current_offer": current_offer,
            "suggested_negotiation_range": f"${target_min:,.0f} – ${target_stretch:,.0f}",
            "recommended_target": target_ideal,
            "evidence_points": counter_talking_points,
            "email_script": email_template,
            "recruiter_response_playbook": [
                {"recruiter_statement": "Budget is capped for this role.", "response": "Understandable. Is there flexibility in sign-on bonus, flexible remote days, or an accelerated 6-month performance review?"},
                {"recruiter_statement": "This is our standard offer for your experience level.", "response": "I appreciate that. Given my specific expertise in high-demand skills like AWS/Generative AI, I deliver accelerated business impact."}
            ]
        }

    @staticmethod
    def get_time_machine_scenarios(current_role: str, exp: float, current_salary: float) -> Dict[str, Any]:
        return {
            "current_state": {"role": current_role, "exp": exp, "salary": current_salary},
            "scenarios": [
                {
                    "timeline": "6 Months",
                    "focus": "Skill Upskilling (Cloud & AWS)",
                    "projected_role": f"Senior {current_role}",
                    "projected_range": f"${current_salary * 1.12:,.0f} – ${current_salary * 1.22:,.0f}",
                    "recommended_actions": ["Obtain AWS Solutions Architect Certification", "Master Docker container deployment"]
                },
                {
                    "timeline": "1 Year",
                    "focus": "Full Stack Mastery + System Architecture",
                    "projected_role": "Lead / Staff Software Engineer",
                    "projected_range": f"${current_salary * 1.25:,.0f} – ${current_salary * 1.40:,.0f}",
                    "recommended_actions": ["Lead distributed system redesign", "Mentor junior developers & manage team sprints"]
                },
                {
                    "timeline": "2 Years",
                    "focus": "AI Engineering Specialization",
                    "projected_role": "AI Solutions Architect",
                    "projected_range": f"${current_salary * 1.45:,.0f} – ${current_salary * 1.70:,.0f}",
                    "recommended_actions": ["Implement LLM fine-tuning & RAG architectures", "Drive cross-departmental AI automation"]
                },
                {
                    "timeline": "5 Years",
                    "focus": "Principal Leadership / Executive Tech",
                    "projected_role": "Principal Engineer / VP of Tech",
                    "projected_range": f"${current_salary * 1.80:,.0f} – ${current_salary * 2.30:,.0f}",
                    "recommended_actions": ["Scale engineering teams from 10 to 50+", "Oversee tech strategy and enterprise infrastructure"]
                }
            ]
        }

    @staticmethod
    def get_market_shocks() -> List[Dict[str, Any]]:
        return [
            {
                "id": "alert-1",
                "severity": "High",
                "title": "🚨 Generative AI & PyTorch Skill Demand Spike",
                "detail": "Job postings requiring LLM & PyTorch skills increased by +42% over the last 30 days.",
                "salary_impact": "+18.5%",
                "timestamp": "2 hours ago"
            },
            {
                "id": "alert-2",
                "severity": "Medium",
                "title": "📈 Remote Cloud Architecture Hiring Acceleration",
                "detail": "AWS Solutions Architect remote hiring momentum jumped by +22% across mid-stage tech startups.",
                "salary_impact": "+12.0%",
                "timestamp": "5 hours ago"
            },
            {
                "id": "alert-3",
                "severity": "Info",
                "title": "⚠️ Legacy Monolith Maintenance Demand Softening",
                "detail": "Declining job postings for traditional legacy monolithic setups (-14%). Transition to microservices recommended.",
                "salary_impact": "-5.2%",
                "timestamp": "1 day ago"
            }
        ]

    @staticmethod
    def get_skill_obsolescence_radar() -> Dict[str, List[str]]:
        return {
            "growing_skills": ["Generative AI & LLMs", "PyTorch / TensorFlow", "AWS Cloud Infrastructure", "Rust", "FastAPI & Modern Python"],
            "stable_skills": ["React / Next.js", "TypeScript", "PostgreSQL / SQL", "Docker / Kubernetes", "System Design"],
            "declining_skills": ["jQuery", "Legacy Monolithic PHP (Pre-8.0)", "SVN Version Control", "Manual QA Testing (Without Automation)"],
            "emerging_skills": ["Agentic AI Frameworks", "MLOps & Model Monitoring", "WebAssembly (Wasm)", "Vector Databases (Pinecone/Qdrant)"]
        }
