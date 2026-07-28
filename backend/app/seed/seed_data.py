from sqlalchemy.orm import Session
from app.database.models import User, DigitalTwin, MarketJobSignal, CompanySalaryData
from app.auth.security import get_password_hash
from datetime import datetime

def seed_initial_data(db: Session):
    # Check if data already exists
    if db.query(User).filter(User.email == "demo@talentworth.io").first():
        return

    # Seed Demo User
    demo_user = User(
        email="demo@talentworth.io",
        hashed_password=get_password_hash("demo1234"),
        full_name="Alex Mercer"
    )
    db.add(demo_user)
    db.commit()
    db.refresh(demo_user)

    # Seed Demo Digital Twin
    demo_twin = DigitalTwin(
        user_id=demo_user.id,
        current_role="Software Engineer",
        target_role="Senior Full Stack Engineer",
        years_experience=3.5,
        skills=["Python", "React", "TypeScript", "FastAPI", "SQL"],
        education="Bachelor's in CS",
        location="Austin, TX",
        preferred_location="Remote",
        work_preference="Remote",
        current_salary=95000.0,
        expected_salary=125000.0,
        industry="Technology"
    )
    db.add(demo_twin)

    # Seed Market Signals
    signals = [
        MarketJobSignal(
            job_role="Software Engineer",
            avg_salary=98500,
            min_salary=78000,
            max_salary=135000,
            trend_30d=3.8,
            trend_6m=7.2,
            trend_1y=12.4,
            active_postings=42500,
            demand_score=88,
            competition_score=64,
            hiring_momentum=14.5,
            market_weather="Sunny"
        ),
        MarketJobSignal(
            job_role="AI Engineer",
            avg_salary=142000,
            min_salary=110000,
            max_salary=195000,
            trend_30d=8.4,
            trend_6m=18.2,
            trend_1y=34.0,
            active_postings=18400,
            demand_score=96,
            competition_score=78,
            hiring_momentum=28.0,
            market_weather="Sunny"
        ),
        MarketJobSignal(
            job_role="Frontend Developer",
            avg_salary=89000,
            min_salary=68000,
            max_salary=120000,
            trend_30d=1.5,
            trend_6m=4.1,
            trend_1y=8.0,
            active_postings=29100,
            demand_score=75,
            competition_score=70,
            hiring_momentum=8.2,
            market_weather="Stable"
        )
    ]
    for s in signals:
        db.add(s)

    db.commit()
    print("Successfully seeded Talent Worth database!")
