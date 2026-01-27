from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.guest import GuestCreate, GuestResponse
from app.core.database import get_db
from app.services.guest_service import register_guest

router = APIRouter(
    prefix="/guests",
    tags=["Guests"]
)

@router.post("/create", response_model=GuestResponse)
def create_guest(guest: GuestCreate, db: Session = Depends(get_db)):
    return register_guest(db, guest)
