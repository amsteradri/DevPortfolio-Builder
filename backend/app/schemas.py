from pydantic import BaseModel
from typing import Dict, Any

class PortfolioBase(BaseModel):
    name: str
    content: Dict[str, Any]

class PortfolioCreate(PortfolioBase):
    pass

class Portfolio(PortfolioBase):
    id: int

    class Config:
        from_attributes = True 