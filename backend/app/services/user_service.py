from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from fastapi import HTTPException, status
from app.core.dependencies import bcrypt_context
from app.core.security import get_password_hash

def register_user(db: Session, user: UserCreate):
    # Vérification si l'email existe déjà
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    new_user = User(
        email = user.email, 
        first_name = user.first_name or None, 
        last_name = user.last_name or None, 
        phone = user.phone or None, 
        hashed_password = get_password_hash(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user
