
from pymongo import MongoClient

client = MongoClient("mongodb+srv://chaurasiayash2910:nt7mkuHY3MPh3mTv@cluster0.u56jiog.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["hair_analysis"]
collection = db["hair_recommendations"]

def save_to_db1(data: dict):
    collection.insert_one(data)

def get_all_hair_recommendations():
    data = list(collection.find({}, {"_id": 0}))  # _id chhupake clean data bhej raha
    return data
