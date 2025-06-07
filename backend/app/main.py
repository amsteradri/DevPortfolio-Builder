from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, database
from .api import auth, portfolios
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

# Incluir rutas
app.include_router(auth.router, prefix="/auth", tags=["authentication"])
app.include_router(portfolios.router, prefix="/api/portfolios", tags=["portfolios"])

# Rutas básicas
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

# Ruta específica para /p/{name} - portfolios públicos
@app.get("/portfolio/{portfolio_name}", response_model=schemas.Portfolio)
def get_public_portfolio(portfolio_name: str, db: Session = Depends(database.get_db)):
    """Obtener portfolio para vista pública /p/{name}"""
    try:
        # Buscar por nombre exacto o similar
        portfolio = db.query(models.Portfolio).filter(
            models.Portfolio.name.ilike(f"%{portfolio_name}%")
        ).first()
        
        if not portfolio:
            raise HTTPException(status_code=404, detail="Portfolio no encontrado")
        
        return portfolio
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting public portfolio: {e}")
        raise HTTPException(status_code=500, detail="Error al obtener portfolio")