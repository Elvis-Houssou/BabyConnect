from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime
from app.core.database import Base
from sqlalchemy.sql import func

class Guest(Base):
    __tablename__ = "guests"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(Text, nullable=False)
    last_name = Column(Text, nullable=False)
    email = Column(Text, unique=True, index=True, nullable=False)
    phone = Column(Text, nullable=True)
    message = Column(Text, nullable=True)
    attending = Column(Boolean, server_default="true", nullable=False)
    number_of_guests = Column(Integer, server_default="1", nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
