from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import users, auth, guests

app = FastAPI(
    title="BabyConnect",
    version="1.0.0",
    description="Backend API for Baby Connect",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "https://baby-connect-get9bsdz3-elvishoussou.vercel.app",
        "https://baby-connect-alpha.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(guests.router)