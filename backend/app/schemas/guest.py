from pydantic import BaseModel, EmailStr

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
    