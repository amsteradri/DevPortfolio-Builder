from sqlalchemy import text
from .database import engine
from . import models

def migrate_database():
    """Migrar la base de datos a la nueva estructura"""
    
    with engine.connect() as connection:
        try:
            # Verificar si la tabla users existe
            result = connection.execute(text("""
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = 'users' AND table_schema = 'public';
            """))
            
            existing_columns = [row[0] for row in result.fetchall()]
            print(f"Columnas existentes en users: {existing_columns}")
            
            # Columnas requeridas
            required_columns = {
                'id': 'SERIAL PRIMARY KEY',
                'google_id': 'VARCHAR UNIQUE NOT NULL',
                'email': 'VARCHAR UNIQUE NOT NULL',
                'name': 'VARCHAR NOT NULL',
                'given_name': 'VARCHAR',
                'family_name': 'VARCHAR',
                'picture': 'VARCHAR',
                'locale': 'VARCHAR',
                'is_active': 'BOOLEAN DEFAULT TRUE',
                'created_at': 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
                'updated_at': 'TIMESTAMP WITH TIME ZONE'
            }
            
            # Si la tabla no existe, crearla
            if not existing_columns:
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
                return
            
            # Añadir columnas faltantes
            for column, definition in required_columns.items():
                if column not in existing_columns:
                    print(f"Añadiendo columna: {column}")
                    try:
                        if column == 'name':
                            # Añadir columna name con valor por defecto
                            connection.execute(text(f"ALTER TABLE users ADD COLUMN {column} VARCHAR NOT NULL DEFAULT 'Usuario'"))
                        elif column == 'is_active':
                            connection.execute(text(f"ALTER TABLE users ADD COLUMN {column} BOOLEAN DEFAULT TRUE"))
                        elif column == 'created_at':
                            connection.execute(text(f"ALTER TABLE users ADD COLUMN {column} TIMESTAMP WITH TIME ZONE DEFAULT NOW()"))
                        elif column == 'updated_at':
                            connection.execute(text(f"ALTER TABLE users ADD COLUMN {column} TIMESTAMP WITH TIME ZONE"))
                        else:
                            connection.execute(text(f"ALTER TABLE users ADD COLUMN {column} VARCHAR"))
                        
                        connection.commit()
                        print(f"Columna {column} añadida exitosamente")
                    except Exception as e:
                        print(f"Error añadiendo columna {column}: {e}")
                        connection.rollback()
            
            print("Migración completada")
            
        except Exception as e:
            print(f"Error en migración: {e}")
            connection.rollback()

if __name__ == "__main__":
    migrate_database()