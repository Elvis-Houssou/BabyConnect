from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr

class UserConnect(UserBase):
    password: str

class UserCreate(UserBase):
    first_name: str | None
    last_name: str | None
    phone: str | None
    password: str

class UserInDB(UserBase):
    id: int
    hashed_password: str
    is_active: bool
    
    model_config = {"from_attributes": True}



class UserResponse(UserBase):
    id: int
    is_active: bool

    model_config = {
        "from_attributes": True
    }
    