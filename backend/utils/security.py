import jwt
import datetime
from fastapi import Header, HTTPException, Depends
from passlib.context import CryptContext
from config import ADMIN_PASSWORD, JWT_SECRET

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Checks if the admin password in config is a bcrypt hash.
# If it is not, we can hash it dynamically or verify it as plaintext.
# For fallback convenience, we verify plaintext if it does not look like a bcrypt hash.
def verify_password(plain_password: str, hashed_or_plain_admin_password: str) -> bool:
    if hashed_or_plain_admin_password.startswith("$2b$") or hashed_or_plain_admin_password.startswith("$2a$"):
        return pwd_context.verify(plain_password, hashed_or_plain_admin_password)
    return plain_password == hashed_or_plain_admin_password

def create_access_token(data: dict, expires_delta: datetime.timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.utcnow() + expires_delta
    else:
        expire = datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm="HS256")
    return encoded_jwt

def get_admin_token(authorization: str = Header(None)) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authentication header")
    
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = payload.get("sub")
        if user != "admin":
            raise HTTPException(status_code=401, detail="Invalid token subject credentials")
        return token
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Authentication session token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid authentication token signature")
