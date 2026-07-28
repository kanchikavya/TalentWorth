import os
import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.database.connection import init_db, SessionLocal
from app.seed.seed_data import seed_initial_data
from app.api.endpoints import router as api_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    db = SessionLocal()
    try:
        seed_initial_data(db)
    finally:
        db.close()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Talent Worth - AI-Powered Dynamic Salary Prediction & Career Intelligence Platform API",
    lifespan=lifespan
)

# Enable CORS for Frontend development & production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_PREFIX)

@app.get("/")
def root():
    return {
        "message": "Welcome to Talent Worth API - Live Career Market Intelligence Engine",
        "docs": "/docs",
        "version": settings.VERSION
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
