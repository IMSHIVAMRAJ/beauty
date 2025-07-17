from pydantic import BaseModel
from typing import List

class RecommendationRequest(BaseModel):
    name:str
    phone:str
    gender: str
    skin_concerns: List[str]

class RecommendationResponse(BaseModel):
    recommended_service: str