from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, Dict, Any

class UserBase(BaseModel):
    email: EmailStr
    name: str
    given_name: Optional[str] = None
    family_name: Optional[str] = None
    picture: Optional[str] = None
    locale: Optional[str] = None

class UserCreate(UserBase):
    google_id: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    given_name: Optional[str] = None
    family_name: Optional[str] = None
    picture: Optional[str] = None
    locale: Optional[str] = None

class User(UserBase):
    id: int
    google_id: str
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Esquemas existentes del Portfolio (actualizados)
class PortfolioBase(BaseModel):
    name: str
    content: Dict[str, Any]

class PortfolioCreate(PortfolioBase):
    user_id: Optional[int] = None

class Portfolio(PortfolioBase):
    id: int
    user_id: Optional[int] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True