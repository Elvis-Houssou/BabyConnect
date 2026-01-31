from fastapi import APIRouter, Depends, HTTPException, status, Request

from datetime import datetime, timedelta, timezone
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse

from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserResponse
from app.schemas.token import Token, TokenData
from app.core.database import get_db

from app.core.security import authenticate_user, create_access_token, refresh_access_token, get_current_active_user, ACCESS_TOKEN_EXPIRE_MINUTES
from app.models.refresh_token import RefreshToken
from app.services.cookie_service import set_cookie_for_env

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post("/login")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    request: Request,
    db: Session = Depends(get_db)
) -> Token:
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(user.id)
    refresh_token = refresh_access_token(db, user.id)

    response = JSONResponse(content={"success": True, "message": "Login successful"})

    set_cookie_for_env(response, 'access_token', access_token, request)
    set_cookie_for_env(response, 'refresh_token', refresh_token, request)

    return response

@router.post("/logout")
async def logout(
    current_user: Annotated[User, Depends(get_current_active_user)],
    request: Request,
    db: Session = Depends(get_db),
):
    refresh_token = request.cookies.get("refresh_token")

    if refresh_token:
        db.query(RefreshToken).filter(
            RefreshToken.token == refresh_token
        ).delete()
        db.commit()

    response = JSONResponse(
        content={"success": True, "message": "Logout successful"}
    )

    response.delete_cookie(key="access_token")
    response.delete_cookie(key="refresh_token")
    return response


@router.get("/users/me/", response_model=UserResponse)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user

@router.post("/refresh")
async def refresh_access_token_endpoint(
    request: Request,
    db: Session = Depends(get_db)
):
    refresh_token = request.cookies.get("refresh_token")

    db_token = db.query(RefreshToken).filter_by(token=refresh_token, is_revoked=False).first()

    if not db_token or db_token.expires_at.replace(tzinfo=timezone.utc) < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")
    
    # Crée un nouvel access token
    new_access_token = create_access_token(db_token.user_id)
    
    response = JSONResponse({"message": "refreshed"})
    
    set_cookie_for_env(response, 'access_token', new_access_token, request)
    
    return response


@router.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return [{"item_id": "Foo", "owner": current_user.username}]