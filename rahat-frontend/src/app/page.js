"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  Navigation,
  PhoneCall,
  MapPin,
  Flame,
  Radio,
  ChevronRight,
  Layers,
  Compass,
  Volume2,
  CheckCircle2,
  Info
} from "lucide-react";

export default function RahatApp() {
  const [isAlertMode, setIsAlertMode] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [activeTab, setActiveTab] = useState("citizen");
  const [reportedIncident, setReportedIncident] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* 1. TOP APP HEADER */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Radio className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-wide text-white leading-tight">RAHAT</h1>
            <p className="text-[10px] text-slate-400 font-medium">Landslide Early Warning</p>
          </div>
        </div>

        {/* Presentation Live Simulator Toggle */}
        <button
          onClick={() => {
            setIsAlertMode(!isAlertMode);
            setIsNavigating(false);
          }}
          className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-all flex items-center space-x-1.5 ${
            isAlertMode
              ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isAlertMode ? "bg-rose-500 animate-ping" : "bg-emerald-400"}`} />
          <span>{isAlertMode ? "Simulate: High Risk" : "Simulate: Normal"}</span>
        </button>
      </header>

      {/* 2. MAIN SCROLLABLE CONTENT */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 py-4 space-y-4 pb-24">
        {/* TAB 1: CITIZEN SAFETY VIEW */}
        {activeTab === "citizen" && (
          <>
            {/* HERO STATUS CARD */}
            <div
              className={`rounded-3xl p-5 border transition-all duration-300 shadow-xl ${
                isAlertMode
                  ? "bg-gradient-to-b from-rose-950/60 to-slate-900 border-rose-600/40 shadow-rose-950/40"
                  : "bg-gradient-to-b from-emerald-950/40 to-slate-900 border-emerald-600/30 shadow-emerald-950/20"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isAlertMode ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    {isAlertMode ? (
                      <AlertTriangle className="w-7 h-7 stroke-[2.5]" />
                    ) : (
                      <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
                    )}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Current Status</span>
                    <h2 className="text-xl font-extrabold text-white tracking-tight">
                      {isAlertMode ? "CRITICAL RISK ALERT" : "YOU ARE SAFE"}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>Aizawl North Hill Sector</span>
                </div>
                <div className="font-semibold text-slate-400">
                  {isAlertMode ? (
                    <span className="text-rose-400">Slope Risk: 89%</span>
                  ) : (
                    <span className="text-emerald-400">Slope Risk: 12% (Stable)</span>
                  )}
                </div>
              </div>
            </div>

            {/* ACTION CARD: EVACUATION OR ADVICE */}
            {isAlertMode ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Navigation className="w-5 h-5 text-indigo-400" />
                    <h3 className="font-bold text-white text-sm">Nearest Relief Safe Haven</h3>
                  </div>
                  <span className="text-[11px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-medium">
                    1.2 km away
                  </span>
                </div>

                <div className="bg-slate-950/60 rounded-2xl p-3.5 border border-slate-800/80">
                  <p className="font-semibold text-white text-sm">Durtlang Ridge Center</p>
                  <p className="text-xs text-slate-400 mt-0.5">High ground • Capacity: 400 • Medical ready</p>
                </div>

                <button
                  onClick={() => setIsNavigating(!isNavigating)}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/30 transition-transform active:scale-[0.98]"
                >
                  <Compass className="w-4 h-4" />
                  <span>{isNavigating ? "ROUTE ACTIVE • TAP TO CLOSE" : "START SAFE EVACUATION ROUTE"}</span>
                </button>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg">
                <h3 className="font-bold text-white text-sm mb-2 flex items-center space-x-2">
                  <Info className="w-4 h-4 text-emerald-400" />
                  <span>Monsoon Safety Guidelines</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Heavy rains predicted tonight. Keep phone battery charged and avoid non-essential travel along high cut-slopes.
                </p>
              </div>
            )}

            {/* INTERACTIVE EMERGENCY MAP DISPLAY */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-lg overflow-hidden">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>Live Slope Terrain Radar</span>
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">Realtime</span>
              </div>

              <div className="relative w-full h-44 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-center overflow-hidden">
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: "radial-gradient(#475569 1px, transparent 1px)",
                    backgroundSize: "16px 16px"
                  }}
                />

                <div className={`absolute w-36 h-36 rounded-full border border-dashed transition-all duration-700 ${
                  isAlertMode ? "border-rose-500/50 bg-rose-500/10 animate-pulse" : "border-emerald-500/30 bg-emerald-500/5"
                }`} />

                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shadow-lg ${
                    isAlertMode ? "bg-rose-500 text-white" : "bg-emerald-500 text-slate-950"
                  }`}>
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span className="text-[10px] font-bold mt-1 bg-slate-900/90 px-2 py-0.5 rounded-full border border-slate-700 text-slate-200">
                    Your Location
                  </span>
                </div>

                {isAlertMode && (
                  <div className="absolute top-4 right-6 flex flex-col items-center z-10">
                    <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <span className="text-[9px] font-bold mt-0.5 text-indigo-300">Shelter (1.2km)</span>
                  </div>
                )}

                {isNavigating && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-indigo-400 stroke-2 stroke-dasharray-4">
                    <line x1="50%" y1="50%" x2="80%" y2="25%" strokeDasharray="4 4" className="animate-pulse" />
                  </svg>
                )}
              </div>
            </div>

            {/* QUICK CALL ACTION */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:112"
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-3.5 rounded-2xl flex items-center space-x-3 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Toll-free</p>
                  <p className="text-xs font-bold text-white">Emergency 112</p>
                </div>
              </a>

              <a
                href="tel:1077"
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-3.5 rounded-2xl flex items-center space-x-3 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Disaster Control</p>
                  <p className="text-xs font-bold text-white">SDMA 1077</p>
                </div>
              </a>
            </div>
          </>
        )}

        {/* TAB 2: CITIZEN REPORT / SOS */}
        {activeTab === "sos" && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg">
              <h2 className="text-base font-bold text-white mb-1">Report Slope Hazard</h2>
              <p className="text-xs text-slate-400 mb-4">Spotted a ground crack, rockfall, or water burst? Alert response teams in 1-tap.</p>

              {reportedIncident ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-xs font-bold text-white">Observation Synced Successfully</p>
                  <p className="text-[11px] text-slate-400">Coordinates sent to Disaster Control Room.</p>
                  <button
                    onClick={() => setReportedIncident(false)}
                    className="text-xs text-emerald-400 font-medium underline mt-2"
                  >
                    Report another issue
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {[
                    "Visible ground cracks or fissures on slope",
                    "Minor debris flow or rolling stones",
                    "Sudden muddy stream burst from hill",
                    "Trees or utility poles tilting"
                  ].map((hazard, index) => (
                    <button
                      key={index}
                      onClick={() => setReportedIncident(true)}
                      className="w-full text-left p-3 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-200 flex items-center justify-between transition-all"
                    >
                      <span>{hazard}</span>
                      <ChevronRight className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: AUTHORITY ADMIN VIEW */}
        {activeTab === "official" && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">Telemetry & AI Engine</h2>
                  <p className="text-xs text-slate-400">Random Forest Classifier • Live Sensors</p>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                  v2.4 Live
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 text-[10px]">24h Cumulative Rain</span>
                  <p className="text-base font-bold text-white mt-0.5">{isAlertMode ? "198 mm" : "14 mm"}</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 text-[10px]">Soil Saturation</span>
                  <p className="text-base font-bold text-white mt-0.5">{isAlertMode ? "91.4 %" : "28.1 %"}</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 text-[10px]">Slope Angle</span>
                  <p className="text-base font-bold text-white mt-0.5">42.5°</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-slate-400 text-[10px]">AI Prediction</span>
                  <p className={`text-base font-bold mt-0.5 ${isAlertMode ? "text-rose-400" : "text-emerald-400"}`}>
                    {isAlertMode ? "HIGH HAZARD" : "LOW RISK"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. MODERN MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 inset-x-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 max-w-md mx-auto px-6 py-2 flex items-center justify-around">
        <button
          onClick={() => setActiveTab("citizen")}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            activeTab === "citizen" ? "text-emerald-400" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-semibold">Safety</span>
        </button>

        <button
          onClick={() => setActiveTab("sos")}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            activeTab === "sos" ? "text-amber-400" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Flame className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-semibold">Report</span>
        </button>

        <button
          onClick={() => setActiveTab("official")}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            activeTab === "official" ? "text-indigo-400" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Layers className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-semibold">Telemetry</span>
        </button>
      </nav>
    </div>
  );
}
