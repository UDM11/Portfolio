from fastapi import APIRouter, HTTPException
from config import ADMIN_PASSWORD
from models import AdminLogin
from utils.security import verify_password, create_access_token
import datetime

router = APIRouter(prefix="/api/admin", tags=["admin"])

@router.post("/login")
async def admin_login(login: AdminLogin):
    if verify_password(login.password, ADMIN_PASSWORD):
        access_token = create_access_token(
            data={"sub": "admin"},
            expires_delta=datetime.timedelta(hours=24)
        )
        return {"authenticated": True, "token": access_token}
    raise HTTPException(status_code=401, detail="Invalid admin credentials")
