from pymongo import MongoClient
from datetime import datetime

client = MongoClient("mongodb+srv://chaurasiayash2910:ZnFZjUajnFnNZi3s@cluster0.imvwitm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["skin_ai"]
collection = db["recommendations"]

def save_to_db(name: str, phone: str, gender: str, skin_concerns: list, recommendation: str):
    collection.insert_one({
        "name": name,
        "phone": phone,
        "gender": gender,
        "skin_concerns": skin_concerns,
        "recommended_service": recommendation,
        "timestamp": datetime.now()
})
def get_all_skin_recommendations():
    data = list(collection.find({}, {"_id": 0}))
    return data
