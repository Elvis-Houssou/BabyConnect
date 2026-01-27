from fastapi import APIRouter, Depends, HTTPException, status

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

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = authenticate_user(User, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token( data={"sub": user.id})
    refresh_token = refresh_access_token(get_db, user.id)

    response = JSONResponse(content={
        "access_token": access_token,
        "token_type": "bearer",
        "refresh_token": refresh_token
    })
    # return Token(access_token=access_token, token_type="bearer")
    return response


@router.get("/users/me/", response_model=UserResponse)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user

@router.post("/refresh")
async def refresh_access_token_endpoint(
    refresh_token: str,
    db: Session = Depends(get_db)
):
    db_token = db.query(RefreshToken).filter_by(token=refresh_token, is_revoked=False).first()
    if not db_token or db_token.expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")
    
    # Crée un nouvel access token
    new_access_token = create_access_token(data={"sub": db_token.user_id})
    
    return {"access_token": new_access_token, "token_type": "bearer"}


@router.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return [{"item_id": "Foo", "owner": current_user.username}]