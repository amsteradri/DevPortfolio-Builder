from sqlalchemy import text
from .database import engine
from . import models

def migrate_database():
    """Migrar la base de datos a la nueva estructura"""
    
    with engine.connect() as connection:
        try:
            # Verificar si la tabla portfolios existe y tiene las columnas correctas
            result = connection.execute(text("""
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = 'portfolios' AND table_schema = 'public';
            """))
            
            existing_columns = [row[0] for row in result.fetchall()]
            print(f"Columnas existentes en portfolios: {existing_columns}")
            
            # Si no existe la tabla portfolios, crearla
            if not existing_columns:
                print("Tabla portfolios no existe, creándola...")
                connection.execute(text("""
                    CREATE TABLE portfolios (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR NOT NULL,
                        content JSON,
                        user_id INTEGER NOT NULL REFERENCES users(id),
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                        updated_at TIMESTAMP WITH TIME ZONE
                    );
                """))
                connection.commit()
                print("Tabla portfolios creada exitosamente")
            
            # Verificar tabla users
            result = connection.execute(text("""
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = 'users' AND table_schema = 'public';
            """))
            
            user_columns = [row[0] for row in result.fetchall()]
            print(f"Columnas existentes en users: {user_columns}")
            
            # Crear tabla users si no existe
            if not user_columns:
                print("Tabla users no existe, creándola...")
                connection.execute(text("""
                    CREATE TABLE users (
                        id SERIAL PRIMARY KEY,
                        google_id VARCHAR UNIQUE NOT NULL,
                        email VARCHAR UNIQUE NOT NULL,
                        name VARCHAR NOT NULL,
                        given_name VARCHAR,
                        family_name VARCHAR,
                        picture VARCHAR,
                        locale VARCHAR,
                        is_active BOOLEAN DEFAULT TRUE,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                        updated_at TIMESTAMP WITH TIME ZONE
                    );
                """))
                connection.commit()
                print("Tabla users creada exitosamente")
            
            print("Migración completada exitosamente")
            
        except Exception as e:
            print(f"Error en migración: {e}")
            connection.rollback()

if __name__ == "__main__":
    migrate_database()