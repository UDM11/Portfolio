from fastapi import APIRouter, HTTPException, Request
from config import ADMIN_PASSWORD
from models import AdminLogin
from utils.security import verify_password, create_access_token
import datetime
import time
from collections import defaultdict

router = APIRouter(prefix="/api/admin", tags=["admin"])

# IP-based rate limiting for login attempts
# Max 5 attempts per minute per IP
login_rate_limits = defaultdict(list)

def check_login_rate_limit(request: Request):
    ip = request.client.host if request.client else "unknown"
    now = time.time()
    login_rate_limits[ip] = [t for t in login_rate_limits[ip] if now - t < 60]
    
    if len(login_rate_limits[ip]) >= 5:
        raise HTTPException(
            status_code=429, 
            detail="Too many login attempts. Please wait a minute before trying again."
        )
    
    login_rate_limits[ip].append(now)

@router.post("/login")
async def admin_login(login: AdminLogin, request: Request):
    check_login_rate_limit(request)
    if verify_password(login.password, ADMIN_PASSWORD):
        access_token = create_access_token(
            data={"sub": "admin"},
            expires_delta=datetime.timedelta(hours=24)
        )
        return {"authenticated": True, "token": access_token}
    raise HTTPException(status_code=401, detail="Invalid admin credentials")
