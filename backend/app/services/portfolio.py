from sqlalchemy.orm import Session
from .. import models, schemas
from typing import List, Optional

class PortfolioService:
    @staticmethod
    def get_user_portfolios(user_id: int, db: Session) -> List[models.Portfolio]:
        """Obtener todos los portfolios de un usuario"""
        return db.query(models.Portfolio).filter(
            models.Portfolio.user_id == user_id
        ).order_by(models.Portfolio.updated_at.desc()).all()
    
    @staticmethod
    def create_portfolio(portfolio_data: schemas.PortfolioCreate, db: Session) -> models.Portfolio:
        """Crear un nuevo portfolio"""
        db_portfolio = models.Portfolio(**portfolio_data.dict())
        db.add(db_portfolio)
        db.commit()
        db.refresh(db_portfolio)
        return db_portfolio
    
    @staticmethod
    def update_portfolio(portfolio_id: int, update_data: dict, db: Session) -> Optional[models.Portfolio]:
        """Actualizar un portfolio existente"""
        portfolio = db.query(models.Portfolio).filter(
            models.Portfolio.id == portfolio_id
        ).first()
        
        if not portfolio:
            return None
        
        for key, value in update_data.items():
            setattr(portfolio, key, value)
        
        db.commit()
        db.refresh(portfolio)
        return portfolio
    
    @staticmethod
    def delete_portfolio(portfolio_id: int, db: Session) -> bool:
        """Eliminar un portfolio"""
        portfolio = db.query(models.Portfolio).filter(
            models.Portfolio.id == portfolio_id
        ).first()
        
        if not portfolio:
            return False
        
        db.delete(portfolio)
        db.commit()
        return True