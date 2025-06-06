from sqlalchemy import Column, Integer, String, JSON
from .database import Base

class Portfolio(Base):
    __tablename__ = "portfolios"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    content = Column(JSON) 