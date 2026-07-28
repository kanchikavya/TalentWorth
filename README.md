# 🚀 Talent Worth — AI-Powered Dynamic Salary Prediction & Career Intelligence Platform

**Talent Worth** is a modern full-stack web application designed to predict a user's expected salary based on live job market signals, skill demand, geographic economics, and career momentum.

Going far beyond static salary calculators, **Talent Worth** functions as a personal career digital twin, interactive salary simulator, negotiation assistant, and career growth roadmap engine.

---

## 🌟 Key & Signature Features

1. **Career Digital Twin (`/digital-twin`)**: Live replica of user profile evaluated continuously against active market data. Returns Market Value, Percentile (e.g. Top 16%), Readiness Score, and Demand Score.
2. **Dynamic Salary Predictor (`/predictor`)**: Multi-variable prediction engine powered by Scikit-Learn Random Forest regression models, complete with confidence scores and SHAP-like feature contribution explanations (% impact of experience, skills, location).
3. **Live Salary Pulse (`/pulse`)**: Real-time salary market dashboard displaying hiring momentum (+14.5%), active postings (42.5k), and 6-month historical salary trends via interactive Recharts.
4. **"What If?" Salary Simulator (`/simulator`)**: Signature interactive tool allowing users to toggle skills (e.g., +AWS, +Generative AI) or add experience and watch marginal annual salary gains recalculate live (`+$8,500/yr`).
5. **Salary Skill Tree (`/skill-tree`)**: Visual interactive node map connecting skill dependencies, salary impact, learning difficulty, and algorithmic "Recommended Next Skill".
6. **Career ROI Engine (`/roi`)**: Algorithmic ranking of skills by `ROI = (Salary Impact + Demand + Availability) / (Learning Hours + Cost)`.
7. **Salary Weather (`/weather`)**: Market climate dashboard categorizing job roles into ☀️ Sunny Market, 🌤️ Stable Market, 🌧️ Cooling Market, and ⛈️ Risky Market forecasts.
8. **Location Arbitrage & Net Pay (`/location`)**: Side-by-side geographic compensation analysis accounting for gross salary, state tax rates, average rent index, and real purchasing power across cities (Austin vs SF vs NYC vs Remote).
9. **Company Salary Heatmap (`/company`)**: Employer pay matrix comparing FAANG, AI Unicorns, FinTech, and Enterprise compensation tiers with remote work policy transparency.
10. **AI Salary Negotiation Assistant (`/negotiator`)**: Counter-offer copilot generating target negotiation ranges, recruiter objection playbooks, and copyable professional negotiation email scripts.
11. **Career Time Machine (`/time-machine`)**: Interactive timeline simulator projecting 6-month, 1-year, 2-year, and 5-year future career roadmaps.
12. **Job Market Shock Detector (`/shocks`)**: Telemetry alert system detecting macro hiring surges and skill demand spikes.
13. **Skill Obsolescence Radar (`/radar`)**: Categorized tech matrix highlighting Growing, Stable, Declining, and Emerging skill trends with responsible data disclaimers.
14. **Anonymous Salary Intelligence (`/anonymous`)**: Privacy-conscious community compensation submission pool using sample size threshold guardrails.
15. **Personal Command Center (`/dashboard`)**: Unified user workspace aggregating profile stats, twin evaluation, alerts, and recommended skills.
16. **Admin Dashboard (`/admin`)**: Telemetry panel monitoring platform health, predictions count, dataset freshness, and ML model evaluation metrics ($R^2$, MAE, RMSE).

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Recharts, Lucide React Icons.
- **Backend**: Python 3.10+, FastAPI, Pydantic, SQLAlchemy.
- **Machine Learning**: Scikit-Learn (RandomForestRegressor & GradientBoostingRegressor), Pandas, NumPy.
- **Database**: SQLite (Local development default), PostgreSQL compatible (Supabase / Neon).
- **Authentication**: JWT token authorization, password hashing (bcrypt).

---

## 🚀 Running Locally

### 1. Start the Backend API (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python main.py
```
*The FastAPI backend will start at `http://localhost:8000`. Interactive OpenAPI documentation will be accessible at `http://localhost:8000/docs`.*

### 2. Start the Frontend App (Vite React)
```bash
cd frontend
npm install
npm run dev
```
*Open `http://localhost:5173` in your browser.*

---

## 📊 Machine Learning Model Metrics

The underlying salary prediction model is trained on market datasets and evaluated using standard regression metrics:

| Metric | Baseline Value | Description |
| :--- | :--- | :--- |
| **Coefficient of Determination ($R^2$)** | **0.91** | 91% of salary variance explained by features |
| **Mean Absolute Error (MAE)** | **$4,250** | Average absolute variance from market benchmark |
| **Root Mean Squared Error (RMSE)** | **$5,800** | Penalizes extreme outliers |

---

## 🔒 Responsible AI & Legal Disclaimers

Salary predictions and market values generated on TalentWorth are mathematical model estimations calculated from public job postings, regression models, and aggregated user inputs. Compensation estimates do not constitute financial guarantees or official employment promises.
