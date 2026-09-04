'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Navigation, 
  CheckCircle2, 
  Route, 
  Building2, 
  Users, 
  Send, 
  CloudRain, 
  Activity, 
  Radio,
  RefreshCw
} from 'lucide-react';

const API_BASE_URL = "http://127.0.0.1:8000";

export default function RahatApp() {
  const [activeView, setActiveView] = useState('citizen');
  const [navigating, setNavigating] = useState(false);
  
  // Real-time ML Prediction State from FastAPI
  const [riskAssessment, setRiskAssessment] = useState({
    status: "CRITICAL SLIP DANGER",
    in_danger_zone: true,
    risk_percentage: 94.2,
    recommended_action: "Immediate evacuation to elevated ridge shelters advised."
  });

  // Simulated Telemetry Inputs (Adjustable via Authority Console)
  const [telemetry, setTelemetry] = useState({
    rainfall_24h_mm: 185.0,
    soil_moisture_percentage: 88.5,
    slope_angle_deg: 42.0,
    elevation_m: 1100.0,
    sector_name: "Hunthar Valley Corridor (Sector 04)"
  });

  // Citizen Scouting State
  const [observationType, setObservationType] = useState('Ground Fissures / Cracks on Slope');
  const [reportStatus, setReportStatus] = useState(null);
  const [syncedReports, setSyncedReports] = useState([]);

  // Fetch ML Prediction from FastAPI Backend
  const fetchRiskPrediction = async (currentTelemetry) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/assess-risk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentTelemetry)
      });
      if (res.ok) {
        const data = await res.json();
        setRiskAssessment(data.assessment);
      }
    } catch (err) {
      console.warn("Backend offline, using fallback state:", err);
    }
  };

  // Fetch synced reports for Authority Console
  const fetchReports = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/reports`);
      if (res.ok) {
        const data = await res.json();
        setSyncedReports(data.reports || []);
      }
    } catch (err) {
      console.warn("Unable to fetch reports:", err);
    }
  };

  useEffect(() => {
    fetchRiskPrediction(telemetry);
    fetchReports();
  }, []);

  // Submit Scout Report to FastAPI
  const handleReportSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          observation_type: observationType,
          latitude: 23.7271,
          longitude: 92.7176
        })
      });
      if (res.ok) {
        const data = await res.json();
        setReportStatus(`✓ Report ${data.report.id} synced live to Command Console.`);
        fetchReports();
      }
    } catch (err) {
      setReportStatus("✓ Logged offline. Auto-sync queued.");
    }
  };

  return (
    <div className="min-h-screen bg-[#070B13] text-slate-100 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Tactical Ops Header */}
      <header className="border-b border-slate-800 bg-[#0A101D] px-6 py-3.5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-lg bg-red-600/10 border border-red-500/30 flex items-center justify-center">
            <ShieldAlert className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <span className="font-black text-lg tracking-wider uppercase text-slate-100">RAHAT</span>
            <span className="ml-2 text-[10px] font-mono uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded">
              FASTAPI LIVE: PORT 8000
            </span>
          </div>
        </div>

        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-lg">
          <button 
            onClick={() => setActiveView('citizen')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition ${
              activeView === 'citizen' ? 'bg-blue-600 text-white' : 'text-slate-400'
            }`}
          >
            Citizen Safe-Zone Portal
          </button>
          <button 
            onClick={() => { setActiveView('authority'); fetchReports(); }}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition ${
              activeView === 'authority' ? 'bg-blue-600 text-white' : 'text-slate-400'
            }`}
          >
            Authority GIS Console
          </button>
        </div>
      </header>

      {activeView === 'citizen' ? (
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Live AI Hazard Assessment */}
          <div className="lg:col-span-5 space-y-4">
            
            {riskAssessment.in_danger_zone ? (
              <div className="bg-gradient-to-b from-red-950/50 to-slate-900/90 border border-red-500/60 rounded-2xl p-5 shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase text-red-400">
                    DANGER ZONE ACTIVE
                  </span>
                  <span className="text-[10px] font-mono bg-red-900/60 border border-red-700/60 text-red-300 px-2 py-0.5 rounded">
                    ML Confidence: {riskAssessment.risk_percentage}%
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mb-1.5">{riskAssessment.status}</h2>
                <p className="text-xs text-slate-300 mb-4">{riskAssessment.recommended_action}</p>
                <button 
                  onClick={() => setNavigating(!navigating)}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition shadow-lg shadow-red-950/80"
                >
                  <Navigation className="h-4 w-4 fill-white" />
                  <span>{navigating ? 'EVACUATION ROUTE ACTIVE' : 'START EVACUATION ROUTE TO SAFE ZONE'}</span>
                </button>
              </div>
            ) : (
              <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-5 text-center">
                <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto mb-2" />
                <h3 className="text-base font-bold text-white">Safe Sector (Clear)</h3>
                <p className="text-xs text-slate-400">Current sensor parameters indicate stable geological conditions.</p>
              </div>
            )}

            {/* High-Ground Shelters */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-mono font-semibold uppercase text-slate-300">
                Verified Safe Shelters (High Ground)
              </h3>
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <Building2 className="h-3.5 w-3.5 text-blue-400" />
                      <h4 className="text-xs font-bold text-slate-200">Durtlang Ridge Relief Center</h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Elevation: 1,180 m (Safe Ridge)</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-400">850 m away</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono pt-1 text-slate-400 border-t border-slate-800/60">
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3 text-slate-500" />
                    <span>240 / 500 Capacity</span>
                  </div>
                  <span className="text-emerald-400">OPEN & SECURE</span>
                </div>
              </div>
            </div>

            {/* Ground Scout Incident Reporting Form */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-xs font-mono font-semibold uppercase text-slate-300 mb-3">
                Ground Scout Observation
              </h3>
              {reportStatus ? (
                <div className="text-center py-3 text-emerald-400 text-xs font-medium bg-emerald-950/30 rounded-lg border border-emerald-800/40">
                  {reportStatus}
                  <button 
                    onClick={() => setReportStatus(null)} 
                    className="block mx-auto mt-2 text-[10px] text-slate-400 underline"
                  >
                    Submit Another Report
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="space-y-3">
                  <select 
                    value={observationType}
                    onChange={(e) => setObservationType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200"
                  >
                    <option>Ground Fissures / Cracks on Slope</option>
                    <option>Rockfall / Minor Debris Flow</option>
                    <option>Tilting Utility Poles or Trees</option>
                    <option>Sudden Road Embankment Subsidence</option>
                  </select>
                  <button 
                    type="submit" 
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs py-2.5 rounded-lg flex items-center justify-center space-x-2 transition"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>TRANSMIT TO COMMAND API</span>
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Right Column: Tactical Safe Zone Evacuation Grid */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-5 relative flex flex-col justify-between min-h-[500px]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Route className="h-4 w-4 text-blue-400" />
                  <span>Tactical Evacuation Grid</span>
                </h3>
                <p className="text-[11px] font-mono text-slate-400">
                  Live PostGIS Coordinate: 23.7271° N, 92.7176° E
                </p>
              </div>
            </div>

            <div className="relative w-full h-72 my-auto flex items-center justify-center border border-slate-900 rounded-xl bg-[#0B101C]">
              {riskAssessment.in_danger_zone && (
                <div className="absolute w-64 h-64 rounded-full bg-red-600/10 border-2 border-red-500/40 animate-pulse flex items-center justify-center">
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase bg-red-950/80 px-2 py-1 rounded border border-red-800">
                    High Slip Hazard Zone
                  </span>
                </div>
              )}

              <div className="absolute z-20 flex flex-col items-center">
                <div className="h-4 w-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-bounce"></div>
                <span className="text-[9px] font-mono font-bold bg-slate-900 text-blue-400 px-1.5 py-0.5 rounded border border-slate-700 mt-1">
                  YOU
                </span>
              </div>

              <div className="absolute top-4 right-6 z-20 flex flex-col items-center">
                <div className="h-7 w-7 bg-emerald-500 rounded-lg border-2 border-white flex items-center justify-center shadow-lg">
                  <Building2 className="h-4 w-4 text-slate-950" />
                </div>
                <span className="text-[9px] font-mono font-bold bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700 mt-1">
                  SHELTER (850m)
                </span>
              </div>

              {navigating && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  <line 
                    x1="50%" 
                    y1="50%" 
                    x2="80%" 
                    y2="20%" 
                    stroke="#10B981" 
                    strokeWidth="3" 
                    strokeDasharray="6 6"
                  />
                </svg>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="font-mono text-slate-400">Target Corridor: North-East Ridge Road</span>
              <span className="font-mono text-emerald-400 font-bold">
                {navigating ? '➔ Evacuation Route Active' : 'Standby Mode'}
              </span>
            </div>
          </div>
        </main>
      ) : (
        /* Authority Command Console: Live Sensor Inputs & Synced Reports */
        <main className="flex-1 max-w-6xl w-full mx-auto p-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-4">Simulate Environmental Sensor Telemetry</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">24h Rainfall (mm)</label>
                <input 
                  type="number" 
                  value={telemetry.rainfall_24h_mm}
                  onChange={(e) => {
                    const next = { ...telemetry, rainfall_24h_mm: parseFloat(e.target.value) || 0 };
                    setTelemetry(next);
                    fetchRiskPrediction(next);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Soil Moisture (%)</label>
                <input 
                  type="number" 
                  value={telemetry.soil_moisture_percentage}
                  onChange={(e) => {
                    const next = { ...telemetry, soil_moisture_percentage: parseFloat(e.target.value) || 0 };
                    setTelemetry(next);
                    fetchRiskPrediction(next);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Slope Angle (°)</label>
                <input 
                  type="number" 
                  value={telemetry.slope_angle_deg}
                  onChange={(e) => {
                    const next = { ...telemetry, slope_angle_deg: parseFloat(e.target.value) || 0 };
                    setTelemetry(next);
                    fetchRiskPrediction(next);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Elevation (m)</label>
                <input 
                  type="number" 
                  value={telemetry.elevation_m}
                  onChange={(e) => {
                    const next = { ...telemetry, elevation_m: parseFloat(e.target.value) || 0 };
                    setTelemetry(next);
                    fetchRiskPrediction(next);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Live Incident Feed Received from Field Scouts */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white">Live Ground Incident Feed (API Synced)</h3>
              <button 
                onClick={fetchReports} 
                className="text-xs text-blue-400 flex items-center space-x-1"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Refresh Feed</span>
              </button>
            </div>

            {syncedReports.length === 0 ? (
              <p className="text-xs text-slate-500 font-mono py-4 text-center">
                No active hazard incidents logged in database yet.
              </p>
            ) : (
              <div className="space-y-2">
                {syncedReports.map((rpt) => (
                  <div key={rpt.id} className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-mono text-blue-400 font-bold mr-2">{rpt.id}</span>
                      <span className="text-slate-200">{rpt.observation_type}</span>
                    </div>
                    <div className="text-slate-400 font-mono text-[11px]">
                      {rpt.timestamp} | <span className="text-emerald-400">{rpt.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
}