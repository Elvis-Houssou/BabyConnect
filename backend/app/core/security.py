import os
import secrets

from datetime import datetime, timedelta, timezone
from typing import Annotated

from jose import jwt, JWTError
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pwdlib import PasswordHash
from app.schemas.user import UserInDB
from app.schemas.refresh_token import RefreshTokenCreate
from app.models.user import User
from app.models.refresh_token import RefreshToken
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.config import settings


SECRET_KEY = settings.SECRET_KEY
if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY is not set")


ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
ACCESS_TOKEN_EXPIRE_DAYS = 30

password_hash = PasswordHash.recommended()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password, hashed_password):
    return password_hash.verify(plain_password, hashed_password)

def get_password_hash(password):
    return password_hash.hash(password)


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)

def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

# def create_access_token(data: dict, expires_delta: timedelta | None = None):
#     to_encode = data.copy()
#     expire = datetime.now(timezone.utc) + (
#         expires_delta or timedelta(minutes=15)
#     )
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

def create_access_token(user_id: int):
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": str(user_id), "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def refresh_access_token(db: Session, user_id: int):
    token = secrets.token_urlsafe(32)
    expires_at = datetime.now(timezone.utc) + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    
    refresh = RefreshToken(
        user_id = user_id,
        token = token,
        expires_at=expires_at,
    )
    
    db.add(refresh)
    db.commit()
    db.refresh(refresh)

    return token


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)], 
    db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload.get("sub"))
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.get(User, user_id)
    if not user or not user.is_active:
        raise HTTPException(status_code=401, detail="Inactive user")

    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
