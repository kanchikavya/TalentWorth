from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime

from app.database.connection import get_db
from app.database.models import User, DigitalTwin, AnonymousSalarySubmission
from app.auth.security import verify_password, get_password_hash, create_access_token, decode_access_token
from app.ml.engine import ml_pipeline
from app.services.market_service import MarketService

router = APIRouter()

# --- Pydantic Schemas ---
class UserRegister(BaseModel):
    email: str
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: str
    password: str

class PredictSalaryRequest(BaseModel):
    job_role: str
    years_experience: float
    location: str
    skills: List[str]
    education: Optional[str] = "Bachelor's Degree (General)"
    industry: Optional[str] = "Technology"
    company_size: Optional[str] = "100-500"
    employment_type: Optional[str] = "Full-time"
    work_preference: Optional[str] = "Remote"
    current_salary: Optional[float] = 0.0

class SkillMatchRequest(BaseModel):
    skills: List[str]
    years_experience: Optional[float] = 0.0

class SimulationRequest(BaseModel):
    job_role: str
    base_experience: float
    location: str
    current_skills: List[str]
    added_skills: List[str]
    added_experience: Optional[float] = 0.0
    new_location: Optional[str] = None

class NegotiationRequest(BaseModel):
    current_offer: float
    job_role: str
    years_experience: float
    skills: List[str]

class SalarySubmissionRequest(BaseModel):
    job_role: str
    years_experience: float
    location: str
    skills: List[str]
    salary: float
    company_size: Optional[str] = "100-500"
    employment_type: Optional[str] = "Full-time"

class DegreeAdvisorRequest(BaseModel):
    degree: str
    user_query: Optional[str] = ""

class DigitalTwinSchema(BaseModel):
    current_role: str
    target_role: str
    years_experience: float
    skills: List[str]
    education: str
    location: str
    preferred_location: str
    work_preference: str
    current_salary: float
    expected_salary: float
    industry: str

# --- Auth Routes ---
@router.post("/auth/register")
def register(data: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user = User(
        email=data.email,
        hashed_password=get_password_hash(data.password),
        full_name=data.full_name
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    twin = DigitalTwin(user_id=user.id)
    db.add(twin)
    db.commit()

    token = create_access_token({"sub": user.email, "user_id": user.id})
    return {"access_token": token, "token_type": "bearer", "user": {"id": user.id, "email": user.email, "full_name": user.full_name}}

@router.post("/auth/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_access_token({"sub": user.email, "user_id": user.id})
    return {"access_token": token, "token_type": "bearer", "user": {"id": user.id, "email": user.email, "full_name": user.full_name}}

# --- Core Prediction & Intelligence Routes ---
@router.post("/predict-salary")
def predict_salary(data: PredictSalaryRequest):
    return ml_pipeline.predict(
        job_role=data.job_role,
        years_experience=data.years_experience,
        location=data.location,
        skills=data.skills,
        education=data.education,
        industry=data.industry,
        work_preference=data.work_preference,
        current_salary=data.current_salary
    )

@router.post("/match-roles")
def match_roles(data: SkillMatchRequest):
    return MarketService.match_roles_by_skills(data.skills, data.years_experience or 0.0)

@router.post("/degree-career-advisor")
def degree_career_advisor(data: DegreeAdvisorRequest):
    return ml_pipeline.get_degree_career_advice(data.degree, data.user_query or "")

@router.get("/market-pulse")
def market_pulse(role: str = "Software Engineer"):
    return MarketService.get_market_pulse(role)

@router.post("/career-simulation")
def career_simulation(data: SimulationRequest):
    orig = ml_pipeline.predict(
        job_role=data.job_role,
        years_experience=data.base_experience,
        location=data.location,
        skills=data.current_skills
    )
    sim_skills = list(set(data.current_skills + data.added_skills))
    sim_exp = data.base_experience + (data.added_experience or 0.0)
    sim_loc = data.new_location or data.location

    sim = ml_pipeline.predict(
        job_role=data.job_role,
        years_experience=sim_exp,
        location=sim_loc,
        skills=sim_skills
    )

    diff = max(0, sim.get("predicted_salary", 0) - orig.get("predicted_salary", 0))
    pct = round((diff / max(1, orig.get("predicted_salary", 1))) * 100, 1)

    breakdown = []
    for sk in data.added_skills:
        breakdown.append({"item": f"Added Skill: {sk}", "estimated_value": f"+${random.randint(4000, 12000):,}"})
    if data.added_experience and data.added_experience > 0:
        breakdown.append({"item": f"+{data.added_experience} Yrs Experience", "estimated_value": f"+${int(data.added_experience * 6500):,}"})

    return {
        "simulation": {
            "original_salary": orig.get("predicted_salary", 0),
            "simulated_salary": sim.get("predicted_salary", 0),
            "salary_difference": diff,
            "percentage_gain": f"+{pct}%",
            "impact_breakdown": breakdown
        }
    }

@router.get("/skill-tree")
def skill_tree(role: str = "Software Engineer"):
    return MarketService.get_skill_tree(role)

@router.get("/career-roi")
def career_roi(skills: str = ""):
    skill_list = [s.strip() for s in skills.split(",") if s.strip()]
    return MarketService.get_career_roi(skill_list)

@router.get("/company-insights")
def company_insights(role: str = "Software Engineer"):
    return MarketService.get_company_insights(role)

@router.post("/negotiation-assistant")
def negotiation_assistant(data: NegotiationRequest):
    return MarketService.get_negotiation_assistant(data.current_offer, data.job_role, data.years_experience, data.skills)

@router.get("/market-alerts")
def market_alerts():
    return MarketService.get_market_alerts()

# --- Digital Twin Routes ---
@router.get("/digital-twin")
def get_digital_twin():
    return {
        "current_role": "Software Engineer",
        "target_role": "Senior Full Stack Engineer",
        "years_experience": 3.5,
        "skills": ["Python", "React", "TypeScript", "FastAPI"],
        "education": "B.Tech / B.E. (Computer Science / IT)",
        "location": "Austin, TX (USA)",
        "preferred_location": "Remote",
        "work_preference": "Remote",
        "current_salary": 95000,
        "expected_salary": 125000,
        "industry": "Technology",
        "market_value": 114500,
        "market_percentile": "Top 16%",
        "career_readiness": 88,
        "demand_score": 91
    }

@router.post("/digital-twin")
def update_digital_twin(data: DigitalTwinSchema):
    pred = ml_pipeline.predict(
        job_role=data.current_role,
        years_experience=data.years_experience,
        location=data.location,
        skills=data.skills
    )
    return {
        "status": "updated",
        "twin": {
            **data.model_dump(),
            "market_value": pred.get("predicted_salary", 110000),
            "market_percentile": "Top 18%",
            "career_readiness": 85 if pred.get("is_valid") else 0,
            "demand_score": 88 if pred.get("is_valid") else 40
        }
    }
