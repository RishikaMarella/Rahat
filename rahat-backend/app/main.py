from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from .ml_engine import predict_hazard_risk

app = FastAPI(
    title="Rahat - Landslide Early Warning & Disaster Management Engine",
    version="1.0.0"
)

# Enable CORS for Next.js frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for rapid SIH demonstration
incident_reports_db = []

class TelemetryPayload(BaseModel):
    rainfall_24h_mm: float
    soil_moisture_percentage: float
    slope_angle_deg: float
    elevation_m: float
    sector_name: Optional[str] = "Sector 04 (Hunthar Valley)"

class CitizenReportPayload(BaseModel):
    observation_type: str
    latitude: float = 23.7271
    longitude: float = 92.7176
    description: Optional[str] = None
    reporter_role: Optional[str] = "Citizen Scout"

@app.get("/")
def system_health():
    return {
        "status": "online",
        "system": "Rahat Early Warning & Disaster Response Engine",
        "version": "1.0.0"
    }

@app.post("/api/v1/assess-risk")
def assess_environmental_risk(data: TelemetryPayload):
    """Executes live Random Forest ML inference on incoming sensor telemetry."""
    risk_assessment = predict_hazard_risk(
        rainfall=data.rainfall_24h_mm,
        soil_moisture=data.soil_moisture_percentage,
        slope=data.slope_angle_deg,
        elevation=data.elevation_m
    )
    return {
        "sector": data.sector_name,
        "telemetry_inputs": data.dict(),
        "assessment": risk_assessment,
        "timestamp": datetime.utcnow().isoformat()
    }

@app.post("/api/v1/reports")
def submit_scout_report(report: CitizenReportPayload):
    """Ingests citizen and field officer observations with auto-coordinates."""
    new_entry = {
        "id": f"RPT-{len(incident_reports_db) + 101}",
        "observation_type": report.observation_type,
        "latitude": report.latitude,
        "longitude": report.longitude,
        "status": "LOGGED_SYNCED",
        "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    }
    incident_reports_db.append(new_entry)
    return {
        "status": "SUCCESS",
        "message": "Incident synced to Command Console",
        "report": new_entry
    }

@app.get("/api/v1/reports")
def list_all_scout_reports():
    """Retrieves all field incident reports for the authority console."""
    return {
        "total_reports": len(incident_reports_db),
        "reports": incident_reports_db
    }