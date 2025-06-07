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
    """Guardar o actualizar un portfolio"""
    print(f"Saving portfolio: {portfolio.name}")
    
    try:
        # Verificar si ya existe un portfolio con ese nombre
        existing_portfolio = db.query(models.Portfolio).filter(
            models.Portfolio.name == portfolio.name
        ).first()
        
        if existing_portfolio:
            print(f"Updating existing portfolio: {existing_portfolio.id}")
            # Actualizar portfolio existente
            existing_portfolio.content = portfolio.content
            db.commit()
            db.refresh(existing_portfolio)
            return existing_portfolio
        else:
            print(f"Creating new portfolio: {portfolio.name}")
            # Crear nuevo portfolio
            db_portfolio = models.Portfolio(
                name=portfolio.name,
                content=portfolio.content,
                user_id=portfolio.user_id
            )
            db.add(db_portfolio)
            db.commit()
            db.refresh(db_portfolio)
            return db_portfolio
            
    except Exception as e:
        print(f"Error saving portfolio: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error al guardar el portfolio: {str(e)}")

@app.get("/portfolio/{name}")
def get_portfolio(name: str, db: Session = Depends(database.get_db)):
    """Obtener un portfolio por nombre"""
    try:
        portfolio = db.query(models.Portfolio).filter(
            models.Portfolio.name == name
        ).first()
        
        if portfolio is None:
            raise HTTPException(status_code=404, detail="Portfolio not found")
        
        return portfolio
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting portfolio: {e}")
        raise HTTPException(status_code=500, detail="Error al obtener el portfolio")

@app.get("/portfolios/")
def list_portfolios(db: Session = Depends(database.get_db)):
    """Listar todos los portfolios"""
    try:
        portfolios = db.query(models.Portfolio).all()
        return portfolios
    except Exception as e:
        print(f"Error listing portfolios: {e}")
        raise HTTPException(status_code=500, detail="Error al listar portfolios")