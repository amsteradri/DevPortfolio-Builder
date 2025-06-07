from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from authlib.integrations.starlette_client import OAuth
from .. import models, schemas, database
from ..services.auth import AuthService
import os
from urllib.parse import quote_plus, urlencode
import httpx
import secrets
import base64

router = APIRouter()

# Configurar OAuth manualmente sin server_metadata_url
oauth = OAuth()

oauth.register(
    name='google',
    client_id=os.getenv('GOOGLE_CLIENT_ID'),
    client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
    authorize_url='https://accounts.google.com/o/oauth2/v2/auth',
    access_token_url='https://oauth2.googleapis.com/token',
    client_kwargs={'scope': 'openid email profile'}
)

@router.get("/login")
async def login(request: Request):
    """Iniciar proceso de login con Google usando configuración manual"""
    try:
        # Generar state para seguridad
        state = base64.urlsafe_b64encode(secrets.token_bytes(32)).decode()
        
        # Parámetros para Google OAuth
        params = {
            'client_id': os.getenv('GOOGLE_CLIENT_ID'),
            'redirect_uri': 'http://localhost:8000/auth/callback',
            'scope': 'openid email profile',
            'response_type': 'code',
            'state': state,
            'access_type': 'offline',
            'prompt': 'consent'
        }
        
        # Guardar state en la sesión
        request.session['oauth_state'] = state
        
        # Construir URL de autorización
        auth_url = f"https://accounts.google.com/o/oauth2/v2/auth?{urlencode(params)}"
        
        print(f"Redirecting to: {auth_url}")
        return RedirectResponse(url=auth_url)
        
    except Exception as e:
        print(f"Error en login: {e}")
        return RedirectResponse(url=f"http://localhost:3000/auth/error?error={quote_plus(str(e))}")

@router.get("/callback")
async def auth_callback(
    request: Request, 
    code: str = None, 
    state: str = None,
    error: str = None,
    db: Session = Depends(database.get_db)
):
    """Callback de Google OAuth"""
    try:
        print(f"Callback received - Code: {bool(code)}, State: {state}, Error: {error}")
        
        if error:
            raise HTTPException(status_code=400, detail=f"OAuth error: {error}")
        
        if not code:
            raise HTTPException(status_code=400, detail="No authorization code received")
        
        # Verificar state para seguridad (opcional por ahora)
        # stored_state = request.session.get('oauth_state')
        # if state != stored_state:
        #     raise HTTPException(status_code=400, detail="Invalid state parameter")
        
        # Intercambiar código por token
        async with httpx.AsyncClient() as client:
            token_data = {
                'client_id': os.getenv('GOOGLE_CLIENT_ID'),
                'client_secret': os.getenv('GOOGLE_CLIENT_SECRET'),
                'code': code,
                'grant_type': 'authorization_code',
                'redirect_uri': 'http://localhost:8000/auth/callback'
            }
            
            token_response = await client.post(
                'https://oauth2.googleapis.com/token',
                data=token_data,
                headers={'Content-Type': 'application/x-www-form-urlencoded'}
            )
            
            if token_response.status_code != 200:
                print(f"Token error: {token_response.text}")
                raise HTTPException(status_code=400, detail="Failed to get access token")
            
            tokens = token_response.json()
            access_token = tokens.get('access_token')
            
            if not access_token:
                raise HTTPException(status_code=400, detail="No access token received")
            
            print(f"Access token received: {bool(access_token)}")
            
            # Obtener información del usuario
            user_response = await client.get(
                'https://www.googleapis.com/oauth2/v2/userinfo',
                headers={'Authorization': f'Bearer {access_token}'}
            )
            
            if user_response.status_code != 200:
                print(f"User info error: {user_response.text}")
                raise HTTPException(status_code=400, detail="Failed to get user info")
            
            user_info = user_response.json()
            print(f"User info received: {user_info.get('email', 'No email')}")
        
        if not user_info or not user_info.get('email'):
            raise HTTPException(status_code=400, detail="No se pudo obtener información del usuario")
        
        # Crear o actualizar usuario
        user = AuthService.create_or_update_user(user_info, db)
        print(f"User created/updated: {user.email}")
        
        # Limpiar state de la sesión
        request.session.pop('oauth_state', None)
        
        # Redirigir al frontend con información del usuario
        frontend_url = f"http://localhost:3000/auth/success?user_id={user.id}&name={quote_plus(user.name)}&email={quote_plus(user.email)}"
        return RedirectResponse(url=frontend_url)
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error en callback: {e}")
        return RedirectResponse(url=f"http://localhost:3000/auth/error?error={quote_plus(str(e))}")

@router.get("/logout")
async def logout(request: Request):
    """Cerrar sesión"""
    # Limpiar sesión
    request.session.clear()
    response = RedirectResponse(url="http://localhost:3000/")
    return response

@router.get("/me/{user_id}")
async def get_current_user(user_id: int, db: Session = Depends(database.get_db)):
    """Obtener información del usuario actual"""
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

@router.get("/users")
async def get_users(db: Session = Depends(database.get_db)):
    """Obtener todos los usuarios (para testing)"""
    users = db.query(models.User).all()
    return users

# Ruta de debug para verificar configuración
@router.get("/debug")
async def debug_oauth():
    """Debug de configuración OAuth"""
    return {
        "client_id": os.getenv('GOOGLE_CLIENT_ID', 'Not set')[:20] + "...",
        "has_client_secret": bool(os.getenv('GOOGLE_CLIENT_SECRET')),
        "redirect_uri": 'http://localhost:8000/auth/callback',
        "google_auth_url": "https://accounts.google.com/o/oauth2/v2/auth",
        "google_token_url": "https://oauth2.googleapis.com/token"
    }

@router.get("/test-google")
async def test_google_endpoints():
    """Probar conectividad con endpoints de Google"""
    results = {}
    
    async with httpx.AsyncClient() as client:
        try:
            # Probar endpoint de userinfo
            response = await client.get('https://www.googleapis.com/oauth2/v2/userinfo')
            results['userinfo_endpoint'] = {
                'status': response.status_code,
                'accessible': response.status_code == 401  # 401 es esperado sin token
            }
        except Exception as e:
            results['userinfo_endpoint'] = {'error': str(e)}
        
        try:
            # Probar endpoint de token
            response = await client.post('https://oauth2.googleapis.com/token')
            results['token_endpoint'] = {
                'status': response.status_code,
                'accessible': response.status_code == 400  # 400 es esperado sin parámetros
            }
        except Exception as e:
            results['token_endpoint'] = {'error': str(e)}
    
    return results