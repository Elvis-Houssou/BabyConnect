from sqlalchemy.orm import Session
from app.models.guest import Guest
from app.schemas.guest import GuestCreate
from fastapi import HTTPException, status

def register_guest(db: Session, guest: GuestCreate):
    # Vérification si l'email existe déjà
    existing_guest = db.query(Guest).filter(Guest.email == guest.email).first()
    if existing_guest:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    new_guest = Guest(
        email = guest.email, 
        first_name = guest.first_name,
        last_name = guest.last_name,
        phone = guest.phone or None,
        message = guest.message or None,
        number_of_guests = guest.number_of_guests or None
    )
    db.add(new_guest)
    db.commit()
    db.refresh(new_guest)

    return new_guest
