from pydantic import BaseModel
from typing import List

class HairRequest(BaseModel):
    name: str
    phone: str
    gender: str
    hair_concerns: List[str]