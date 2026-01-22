from sqlalchemy.orm import Session
from app.models.user import User
from fastapi import HTTPException, status

def register_user(db: Session, email: str, password: str):
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    new_user = User(
        email = email, 
        hashed_password = bcrypt_context.hash(password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user
