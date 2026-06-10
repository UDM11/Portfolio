from fastapi import APIRouter, HTTPException
from config import ADMIN_PASSWORD
from models import AdminLogin

router = APIRouter(prefix="/api/admin", tags=["admin"])

@router.post("/login")
async def admin_login(login: AdminLogin):
    if login.password == ADMIN_PASSWORD:
        return {"authenticated": True, "token": "admin-session-token-placeholder"}
    raise HTTPException(status_code=401, detail="Invalid admin password")
