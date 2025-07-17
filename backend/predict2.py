import joblib
import numpy as np

model = joblib.load("models/hair_model.pkl")
mlb = joblib.load("models/hair_mlb.pkl")
gender_encoder = joblib.load("models/hair_gender_encoder.pkl")
label_encoder = joblib.load("models/hair_label_encoder.pkl")

def predict_recommendation(gender: str, hair_concerns: list) -> str:
    gender_encoded = gender_encoder.transform([gender])[0]
    concerns_encoded = mlb.transform([hair_concerns])
    final_input = np.hstack([concerns_encoded, [[gender_encoded]]])
    pred = model.predict(final_input)
    return label_encoder.inverse_transform(pred)[0]