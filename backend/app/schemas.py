from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, Dict, Any, List

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

# Esquemas del Portfolio
class PortfolioBase(BaseModel):
    name: str
    content: Dict[Any, Any]

class PortfolioCreate(PortfolioBase):
    user_id: int  # Ahora es obligatorio

class PortfolioUpdate(BaseModel):
    name: Optional[str] = None
    content: Optional[Dict[Any, Any]] = None

class Portfolio(PortfolioBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Schema para User con portfolios
class UserWithPortfolios(User):
    portfolios: List[Portfolio] = []

    class Config:
        from_attributes = True