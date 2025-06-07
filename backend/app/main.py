from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, database
from .api import auth
from .migrate import migrate_database
from starlette.middleware.sessions import SessionMiddleware
import os

# Ejecutar migración antes de crear las tablas
print("Ejecutando migración de base de datos...")
migrate_database()

# Crear tablas con el nuevo esquema
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="DevPortfolio Builder API")

# Añadir middleware de sesiones (necesario para OAuth)
app.add_middleware(
    SessionMiddleware, 
    secret_key=os.getenv('SECRET_KEY', 'fallback-secret-key'),
    max_age=86400  # 24 horas
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas de autenticación
app.include_router(auth.router, prefix="/auth", tags=["authentication"])

# Rutas existentes
@app.get("/")
def read_root():
    return {"message": "DevPortfolio Builder API"}

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "google_client_id": os.getenv('GOOGLE_CLIENT_ID', 'Not configured'),
        "has_secret": bool(os.getenv('GOOGLE_CLIENT_SECRET')),
        "database_connected": True
    }

@app.post("/portfolio/save/", response_model=schemas.Portfolio)
def save_portfolio(portfolio: schemas.PortfolioCreate, db: Session = Depends(database.get_db)):
    existing_portfolio = db.query(models.Portfolio).filter(models.Portfolio.name == portfolio.name).first()
    
    if existing_portfolio:
        existing_portfolio.content = portfolio.content
        db.commit()
        db.refresh(existing_portfolio)
        return existing_portfolio
    else:
        db_portfolio = models.Portfolio(**portfolio.dict())
        db.add(db_portfolio)
        db.commit()
        db.refresh(db_portfolio)
        return db_portfolio

@app.get("/portfolio/{name}")
def get_portfolio(name: str, db: Session = Depends(database.get_db)):
    portfolio = db.query(models.Portfolio).filter(models.Portfolio.name == name).first()
    if portfolio is None:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return portfolio