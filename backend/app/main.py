from fastapi import FastAPI

from app.routers import users

app = FastAPI(
    title="BabyConnect",
    version="1.0.0",
    description="Backend API for Baby Connect",
)

app.include_router(users.router)