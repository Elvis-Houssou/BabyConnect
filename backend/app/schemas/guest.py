from pydantic import BaseModel, EmailStr
from typing import List
from datetime import datetime


class GuestBase(BaseModel):
    email: EmailStr

class GuestCreate(GuestBase):
    first_name: str
    last_name: str
    phone: str
    message: str | None
    number_of_guests: int | None



class GuestResponse(GuestBase):
    id: int
    first_name: str
    last_name: str
    phone: str

    model_config = {
        "from_attributes": True
    }

class GuestResponseAdmin(GuestBase):
    id: int
    first_name: str
    last_name: str
    phone: str
    message: str
    attending: bool
    number_of_guests: int
    created_at: datetime

    model_config = {
        "from_attributes": True
    }
    


class GuestListResponse(BaseModel):
    success: bool
    message: str
    guest: List[GuestResponseAdmin]