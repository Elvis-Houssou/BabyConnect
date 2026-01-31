from fastapi import Request
from datetime import timedelta

def set_cookie_for_env(response, type: str, access_token: str, request: Request):
    """
    Définir un cookie httpOnly adapté à l'environnement :
    - localhost → secure=False, samesite='lax'
    - prod / Vercel → secure=True, samesite='none'
    - Swagger UI → pareil que localhost
    """
    origin = request.headers.get("origin", "")
    is_local = "localhost" in origin
    is_swagger = "127.0.0.1" in origin or "localhost" in origin
    is_prod = not (is_local or is_swagger)

    if is_local or is_swagger:
        response.set_cookie(
            key=type,
            value=access_token,
            httponly=True,
            secure=False,
            samesite="lax",  # plus permissif pour tests locaux
            max_age=60 * 15,
        )
    elif is_prod:
        response.set_cookie(
            key=type,
            value=access_token,
            httponly=True,
            secure=True,
            samesite="none",  # nécessaire pour cross-domain prod
            max_age=60 * 15,
        )
