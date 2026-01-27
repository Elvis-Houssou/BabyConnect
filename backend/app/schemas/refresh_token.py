from pydantic import BaseModel

class RefreshTokenBase(BaseModel):
    user_id: int

class RefreshTokenCreate(RefreshTokenBase):
    token: str
    expires_at: str

class RefreshTokenUpdate(RefreshTokenBase):
    is_revoked: bool