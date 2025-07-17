import pandas as pd
import joblib

label_encoders = joblib.load("encoders/label_encoders.pkl")
mlb_skin = joblib.load("encoders/mlb_skin.pkl")
mlb_treatment = joblib.load("encoders/mlb_treatment.pkl")

def preprocess_input(data):
    try:
        gender = data.get("gender", "").strip().lower()
        event_type = data.get("event_type", "").strip().lower()

        df = pd.DataFrame([{
            "user_gender": gender,
            "event_type": event_type,
        }])

        for col in ["user_gender", "event_type"]:
            if df[col][0] not in label_encoders[col].classes_:
                raise ValueError(f"Invalid value for {col}: {df[col][0]}")
            df[col] = label_encoders[col].transform(df[col])

        skin_input = [i.strip().lower() for i in data.get("skin_concern", [])]
        treatment_input = [i.strip().lower() for i in data.get("treatment_area", [])]

        for s in skin_input:
            if s not in mlb_skin.classes_:
                raise ValueError(f"Invalid value for user_skin_concern: {s}")
        for t in treatment_input:
            if t not in mlb_treatment.classes_:
                raise ValueError(f"Invalid value for treatment_area: {t}")

        skin_vec = mlb_skin.transform([skin_input])
        treatment_vec = mlb_treatment.transform([treatment_input])

        final_input = pd.DataFrame(
            list(df.values[0]) + list(skin_vec[0]) + list(treatment_vec[0])
        ).T

        return final_input

    except Exception as e:
        raise ValueError(str(e))