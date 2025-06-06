from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
import time
from fastapi.middleware.cors import CORSMiddleware
from . import models, schemas, database

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Función para esperar a que la base de datos esté lista
def wait_for_db():
    max_retries = 5
    retry_interval = 5
    for i in range(max_retries):
        try:
            # Intentar crear las tablas
            models.Base.metadata.create_all(bind=database.engine)
            return
        except Exception as e:
            if i == max_retries - 1:
                raise e
            print(f"Esperando a que la base de datos esté lista... Intento {i + 1}/{max_retries}")
            time.sleep(retry_interval)

# Esperar a que la base de datos esté lista al iniciar
wait_for_db()

@app.post("/portfolio/", response_model=schemas.Portfolio)
def create_portfolio(portfolio: schemas.PortfolioCreate, db: Session = Depends(database.get_db)):
    db_portfolio = models.Portfolio(**portfolio.model_dump())
    try:
        db.add(db_portfolio)
        db.commit()
        db.refresh(db_portfolio)
        return db_portfolio
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail="El nombre del portfolio ya existe")

@app.get("/portfolio/{name}")
def get_portfolio(name: str, db: Session = Depends(database.get_db)):
    try:
        portfolio = db.query(models.Portfolio).filter(models.Portfolio.name == name).first()
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio no encontrado")
        return portfolio
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/portfolios/", response_model=List[schemas.Portfolio])
def get_portfolios(db: Session = Depends(database.get_db)):
    try:
        portfolios = db.query(models.Portfolio).all()
        return portfolios
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Nuevo endpoint para guardar el portfolio completo
@app.post("/portfolio/save/")
def save_portfolio(portfolio: Dict[str, Any], db: Session = Depends(database.get_db)):
    try:
        # Verificar si ya existe un portfolio con el mismo nombre
        existing_portfolio = db.query(models.Portfolio).filter(models.Portfolio.name == portfolio["name"]).first()
        
        if existing_portfolio:
            # Actualizar el portfolio existente
            existing_portfolio.content = portfolio
            db.commit()
            return {"message": "Portfolio actualizado correctamente"}
        else:
            # Crear un nuevo portfolio
            new_portfolio = models.Portfolio(
                name=portfolio["name"],
                content=portfolio
            )
            db.add(new_portfolio)
            db.commit()
            return {"message": "Portfolio creado correctamente"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e)) 