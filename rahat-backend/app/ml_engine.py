import os
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier

MODEL_FILE = os.path.join(os.path.dirname(__file__), "landslide_model.joblib")

def train_and_export_model():
    """Trains a baseline landslide vulnerability model using geotechnical features."""
    np.random.seed(42)
    n_samples = 2000

    # Features: [Rainfall_24h_mm, Soil_Moisture_Pct, Slope_Angle_Deg, Elevation_m]
    rainfall = np.random.uniform(10, 350, n_samples)
    soil_moisture = np.random.uniform(20, 98, n_samples)
    slope = np.random.uniform(5, 65, n_samples)
    elevation = np.random.uniform(300, 2500, n_samples)

    combined_factor = (
        (rainfall / 350.0) * 0.45 +
        (soil_moisture / 98.0) * 0.35 +
        (slope / 65.0) * 0.20
    )

    labels = np.zeros(n_samples, dtype=int)
    labels[combined_factor >= 0.45] = 1
    labels[combined_factor >= 0.72] = 2

    X = np.column_stack([rainfall, soil_moisture, slope, elevation])
    y = labels

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)

    joblib.dump(model, MODEL_FILE)
    print("Landslide ML Model trained and saved successfully.")
    return model

def predict_hazard_risk(rainfall: float, soil_moisture: float, slope: float, elevation: float):
    if not os.path.exists(MODEL_FILE):
        model = train_and_export_model()
    else:
        model = joblib.load(MODEL_FILE)

    features = np.array([[rainfall, soil_moisture, slope, elevation]])
    pred_class = int(model.predict(features)[0])
    probabilities = model.predict_proba(features)[0]
    confidence = float(np.max(probabilities))

    categories = ["SAFE SECTOR", "ELEVATED RISK", "CRITICAL SLIP DANGER"]
    
    if pred_class == 2:
        action = "Immediate evacuation to elevated ridge shelters advised."
    elif pred_class == 1:
        action = "Monitor localized rainfall trends."
    else:
        action = "Normal operational status."

    return {
        "status": categories[pred_class],
        "in_danger_zone": (pred_class == 2),
        "risk_percentage": round(confidence * 100.0, 1),
        "recommended_action": action
    }

if __name__ == "__main__":
    train_and_export_model()