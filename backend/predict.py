import joblib
import numpy as np

model = joblib.load("models/skin_model.pkl")
gender_encoder = joblib.load("models/gender_encoder.pkl")
sc_encoder = joblib.load("models/skin_concern_encoder.pkl")
service_encoder = joblib.load("models/service_encoder.pkl")

def predict_service(gender: str, skin_concerns: list) -> str:
    g_encoded = gender_encoder.transform([gender])[0]
    sc_encoded = sc_encoder.transform([skin_concerns])[0]
    final_input = np.hstack([[g_encoded], sc_encoded])
    pred = model.predict([final_input])[0]
    return service_encoder.inverse_transform([pred])[0]