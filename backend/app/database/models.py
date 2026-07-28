from sqlalchemy import Column, Integer, String, Float, DateTime, Text, Boolean, JSON, ForeignKey
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    digital_twin = relationship("DigitalTwin", back_populates="user", uselist=False)


class DigitalTwin(Base):
    __tablename__ = "digital_twins"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    current_role = Column(String, default="Software Engineer")
    target_role = Column(String, default="Senior Full Stack Engineer")
    years_experience = Column(Float, default=3.0)
    skills = Column(JSON, default=list)  # list of strings
    education = Column(String, default="Bachelor's in CS")
    location = Column(String, default="Austin, TX")
    preferred_location = Column(String, default="Remote")
    work_preference = Column(String, default="Remote") # Remote, Hybrid, On-site
    current_salary = Column(Float, default=95000.0)
    expected_salary = Column(Float, default=125000.0)
    industry = Column(String, default="Technology")
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="digital_twin")


class AnonymousSalarySubmission(Base):
    __tablename__ = "anonymous_salary_submissions"

    id = Column(Integer, primary_key=True, index=True)
    job_role = Column(String, nullable=False, index=True)
    years_experience = Column(Float, nullable=False)
    location = Column(String, nullable=False)
    skills = Column(JSON, default=list)
    salary = Column(Float, nullable=False)
    company_size = Column(String, default="100-500")
    employment_type = Column(String, default="Full-time")
    created_at = Column(DateTime, default=datetime.utcnow)


class MarketJobSignal(Base):
    __tablename__ = "market_job_signals"

    id = Column(Integer, primary_key=True, index=True)
    job_role = Column(String, unique=True, index=True)
    avg_salary = Column(Float)
    min_salary = Column(Float)
    max_salary = Column(Float)
    trend_30d = Column(Float) # e.g. +3.2
    trend_6m = Column(Float) # e.g. +7.5
    trend_1y = Column(Float) # e.g. +12.4
    active_postings = Column(Integer)
    demand_score = Column(Integer) # 0 to 100
    competition_score = Column(Integer) # 0 to 100
    hiring_momentum = Column(Float) # e.g. +18.5
    market_weather = Column(String) # Sunny, Stable, Cooling, Risky
    updated_at = Column(DateTime, default=datetime.utcnow)


class CompanySalaryData(Base):
    __tablename__ = "company_salary_data"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String, index=True)
    job_role = Column(String, index=True)
    est_salary = Column(Float)
    demand_level = Column(String)
    open_positions = Column(Integer)
    remote_avail = Column(String)
    skill_reqs = Column(JSON, default=list)
    salary_trend = Column(String)
