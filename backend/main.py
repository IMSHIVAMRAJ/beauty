#For Deployment Start command will be "Python main.py"
#For installing dependencies run "pip install -r requirements.txt"

from flask import Flask, request, jsonify
import joblib
import json
from preprocess import preprocess_input
from flask_cors import CORS
from predict import predict_service
from database.db import save_to_db
from schemas import RecommendationRequest, RecommendationResponse
from pydantic import ValidationError
from schemas2 import HairRequest
from predict2 import predict_recommendation
from database.mongodb import save_to_db1

app = Flask(__name__)
CORS(app, resources={r"/ai/*": {"origins": "http://localhost:5173"}})

model = joblib.load("models/beauty.pkl")
with open("service_mapper.json", "r") as f:
    service_map = json.load(f)

def match_services(preds):
    matched = []
    seen = set()

    for pred in preds:
        for key, val in service_map.items():
            if pred.lower() == key.lower() or pred.lower() in [t.lower() for t in val.get("tags", [])]:
                if val["name"] not in seen:
                    matched.append(val)
                    seen.add(val["name"])
                    break
        else:
            matched.append({
                "name": pred,
                "description": "No match found in service mapper.",
                "url": "#"
            })

    return matched

@app.route("/ai/analyze", methods=["POST"])
def analyze():
    try:
        user_input = request.get_json()
        X = preprocess_input(user_input)
        pred = model.predict(X)

        label_encoders = joblib.load("encoders/label_encoders.pkl")
        target_le = label_encoders["recommended_service"]
        label = target_le.inverse_transform(pred)

        matches = match_services(label)

        return jsonify({
            "status": "success",
            "predictions": list(label),
            "recommended_service": matches
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
    
@app.route("/ai/recommend", methods=["POST"])
def get_recommendation():
    try:
        data = request.get_json()

        validated_data = RecommendationRequest(**data)

        result = predict_service(validated_data.gender, validated_data.skin_concerns)
        save_to_db(validated_data.name,validated_data.phone,validated_data.gender, validated_data.skin_concerns, result)

        response = RecommendationResponse(recommended_service=result)
        return jsonify(response.dict())

    except ValidationError as ve:
        return jsonify({"error": ve.errors()}), 422
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/ai/hair-recommend", methods=["POST"])
def recommend():
    data = request.get_json()

    try:
        hair_request = HairRequest(**data)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
    name = hair_request.name
    phone = hair_request.phone
    gender = hair_request.gender.lower()
    hair_concerns = hair_request.hair_concerns

    prediction = predict_recommendation(gender, hair_concerns)
    save_to_db1({
        "name": name,
        "phone": phone,
        "gender": gender,
        "hair_concerns": hair_concerns,
        "recommended_service": prediction
    })

    return jsonify({"recommended_service": prediction})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)