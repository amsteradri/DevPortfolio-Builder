from authlib.integrations.starlette_client import OAuth
from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from .. import models
import os
from typing import Optional

# Configuración OAuth
oauth = OAuth()

google = oauth.register(
    name='google',
    client_id=os.getenv('GOOGLE_CLIENT_ID'),
    client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
    server_metadata_url='https://accounts.google.com/.well-known/openid_configuration',
    client_kwargs={
        'scope': 'openid email profile'
    }
)

class AuthService:
    @staticmethod
    def create_or_update_user(user_info: dict, db: Session) -> models.User:
        """Crear o actualizar usuario desde información de Google OAuth"""
        
        # Google puede devolver 'id' o 'sub' como identificador
        google_id = str(user_info.get('id') or user_info.get('sub'))
        
        print(f"Processing user: {user_info.get('email')} with Google ID: {google_id}")
        
        # Buscar usuario existente por Google ID o email
        existing_user = db.query(models.User).filter(
            (models.User.google_id == google_id) | 
            (models.User.email == user_info['email'])
        ).first()
        
        user_data = {
            'google_id': google_id,
            'email': user_info['email'],
            'name': user_info['name'],
            'given_name': user_info.get('given_name'),
            'family_name': user_info.get('family_name'),
            'picture': user_info.get('picture'),
            'locale': user_info.get('locale', 'es')
        }
        
        if existing_user:
            print(f"Updating existing user: {existing_user.email}")
            # Actualizar usuario existente
            for key, value in user_data.items():
                setattr(existing_user, key, value)
            db.commit()
            db.refresh(existing_user)
            return existing_user
        else:
            print(f"Creating new user: {user_info['email']}")
            # Crear nuevo usuario
            new_user = models.User(**user_data)
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            return new_user
    
    @staticmethod
    def get_user_by_google_id(google_id: str, db: Session) -> Optional[models.User]:
        """Obtener usuario por Google ID"""
        return db.query(models.User).filter(
            models.User.google_id == google_id
        ).first()
    
    @staticmethod
    def get_user_by_email(email: str, db: Session) -> Optional[models.User]:
        """Obtener usuario por email"""
        return db.query(models.User).filter(
            models.User.email == email
        ).first()