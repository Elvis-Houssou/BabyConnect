from fastapi import APIRouter, Depends
from typing import Annotated
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.schemas.guest import GuestCreate, GuestResponse, GuestListResponse
from app.models.guest import Guest
from app.models.user import User
from app.core.database import get_db
from app.services.guest_service import register_guest
from app.core.security import get_current_active_user

router = APIRouter(
    prefix="/guests",
    tags=["Guests"]
)

@router.post("/get", response_model=GuestListResponse)
def get_guest(
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    guests = db.query(Guest).all()

    
    if guests:
        return {
            "success": True,
            "message": "Invités récupérés avec succès",
            "guest": guests
        }
    else:
        return {
            "success": False,
            "message": "Aucun invité trouvé",
            "guest": []
        }


@router.post("/create", response_model=GuestResponse)
def create_guest(guest: GuestCreate, db: Session = Depends(get_db)):
    return register_guest(db, guest)

