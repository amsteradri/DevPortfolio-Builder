from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from .. import models, schemas, database
from ..services.portfolio import PortfolioService
from typing import List

router = APIRouter()

@router.get("/user/{user_id}", response_model=List[schemas.Portfolio])
def get_user_portfolios(user_id: int, db: Session = Depends(database.get_db)):
    """Obtener todos los portfolios de un usuario"""
    try:
        portfolios = db.query(models.Portfolio).filter(
            models.Portfolio.user_id == user_id
        ).order_by(desc(models.Portfolio.updated_at)).all()
        
        return portfolios
    except Exception as e:
        print(f"Error getting user portfolios: {e}")
        raise HTTPException(status_code=500, detail="Error al obtener portfolios")

@router.post("/", response_model=schemas.Portfolio)
def create_portfolio(portfolio: schemas.PortfolioCreate, db: Session = Depends(database.get_db)):
    """Crear un nuevo portfolio"""
    try:
        # Verificar que el usuario existe
        if portfolio.user_id:
            user = db.query(models.User).filter(models.User.id == portfolio.user_id).first()
            if not user:
                raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
        # Verificar que no existe un portfolio con el mismo nombre para este usuario
        existing = db.query(models.Portfolio).filter(
            models.Portfolio.name == portfolio.name,
            models.Portfolio.user_id == portfolio.user_id
        ).first()
        
        if existing:
            raise HTTPException(status_code=400, detail="Ya tienes un portfolio con este nombre")
        
        # Crear el portfolio
        db_portfolio = models.Portfolio(
            name=portfolio.name,
            content=portfolio.content,
            user_id=portfolio.user_id
        )
        
        db.add(db_portfolio)
        db.commit()
        db.refresh(db_portfolio)
        
        return db_portfolio
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error creating portfolio: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Error al crear portfolio")

@router.get("/{portfolio_id}", response_model=schemas.Portfolio)
def get_portfolio(portfolio_id: int, db: Session = Depends(database.get_db)):
    """Obtener un portfolio por ID"""
    try:
        portfolio = db.query(models.Portfolio).filter(
            models.Portfolio.id == portfolio_id
        ).first()
        
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio no encontrado")
        
        return portfolio
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting portfolio: {e}")
        raise HTTPException(status_code=500, detail="Error al obtener portfolio")

@router.get("/name/{portfolio_name}", response_model=schemas.Portfolio)
def get_portfolio_by_name(portfolio_name: str, db: Session = Depends(database.get_db)):
    """Obtener un portfolio por nombre - PARA /p/{name}"""
    try:
        portfolio = db.query(models.Portfolio).filter(
            models.Portfolio.name.ilike(f"%{portfolio_name}%")
        ).first()
        
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio no encontrado")
        
        return portfolio
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting portfolio by name: {e}")
        raise HTTPException(status_code=500, detail="Error al obtener portfolio")

@router.put("/{portfolio_id}", response_model=schemas.Portfolio)
def update_portfolio(
    portfolio_id: int, 
    portfolio_update: schemas.PortfolioUpdate, 
    db: Session = Depends(database.get_db)
):
    """Actualizar un portfolio existente"""
    try:
        portfolio = db.query(models.Portfolio).filter(
            models.Portfolio.id == portfolio_id
        ).first()
        
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio no encontrado")
        
        # Actualizar campos
        update_data = portfolio_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(portfolio, field, value)
        
        # Actualizar timestamp manualmente
        from sqlalchemy.sql import func
        portfolio.updated_at = func.now()
        
        db.commit()
        db.refresh(portfolio)
        
        print(f"Portfolio {portfolio_id} actualizado exitosamente")
        return portfolio
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error updating portfolio: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Error al actualizar portfolio")

@router.delete("/{portfolio_id}")
def delete_portfolio(portfolio_id: int, db: Session = Depends(database.get_db)):
    """Eliminar un portfolio"""
    try:
        portfolio = db.query(models.Portfolio).filter(
            models.Portfolio.id == portfolio_id
        ).first()
        
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio no encontrado")
        
        db.delete(portfolio)
        db.commit()
        
        return {"message": "Portfolio eliminado exitosamente"}
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error deleting portfolio: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Error al eliminar portfolio")

@router.post("/{portfolio_id}/duplicate", response_model=schemas.Portfolio)
def duplicate_portfolio(portfolio_id: int, db: Session = Depends(database.get_db)):
    """Duplicar un portfolio existente"""
    try:
        original = db.query(models.Portfolio).filter(
            models.Portfolio.id == portfolio_id
        ).first()
        
        if not original:
            raise HTTPException(status_code=404, detail="Portfolio no encontrado")
        
        # Generar nombre único para la copia
        base_name = f"{original.name} - Copia"
        counter = 1
        new_name = base_name
        
        while db.query(models.Portfolio).filter(
            models.Portfolio.name == new_name,
            models.Portfolio.user_id == original.user_id
        ).first():
            counter += 1
            new_name = f"{base_name} ({counter})"
        
        # Crear la copia
        duplicate = models.Portfolio(
            name=new_name,
            content=original.content,
            user_id=original.user_id
        )
        
        db.add(duplicate)
        db.commit()
        db.refresh(duplicate)
        
        return duplicate
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error duplicating portfolio: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Error al duplicar portfolio")