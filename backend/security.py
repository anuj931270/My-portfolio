import os
import hashlib
import secrets
from datetime import datetime, timedelta, timezone
from typing import Optional
from dotenv import load_dotenv
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

load_dotenv()

# JWT Settings
JWT_SECRET_KEY = os.getenv(
    "JWT_SECRET_KEY", "anuj_pathak_portfolio_jwt_secret_key_default_fallback_2026"
)
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 1440))

# Admin Credentials
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "anuj_secure_admin_2026")

security_bearer = HTTPBearer(auto_error=False)


def hash_password(password: str, salt: Optional[str] = None) -> str:
    """
    Hashes a password using PBKDF2-HMAC-SHA256 with 100,000 iterations (OWASP standard).
    Format: 'pbkdf2:sha256:100000$<salt>$<hash>'
    """
    if not salt:
        salt = secrets.token_hex(16)
    key = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), salt.encode("utf-8"), 100000
    )
    return f"pbkdf2:sha256:100000${salt}${key.hex()}"


def verify_password(plain_password: str, stored_hash_or_plain: str) -> bool:
    """
    Verifies a plain password against a stored PBKDF2 hash or plain string constant-time.
    """
    if stored_hash_or_plain.startswith("pbkdf2:sha256:"):
        try:
            parts = stored_hash_or_plain.split("$")
            salt = parts[1]
            expected_key = parts[2]
            computed_key = hashlib.pbkdf2_hmac(
                "sha256", plain_password.encode("utf-8"), salt.encode("utf-8"), 100000
            ).hex()
            return secrets.compare_digest(computed_key, expected_key)
        except Exception:
            return False

    # Plain text constant-time fallback comparison
    return secrets.compare_digest(plain_password, stored_hash_or_plain)


def create_access_token(
    data: dict, expires_delta: Optional[timedelta] = None
) -> str:
    """
    Generates a cryptographically signed JSON Web Token (JWT) using HS256.
    """
    to_encode = data.copy()
    now = datetime.now(timezone.utc)
    if expires_delta:
        expire = now + expires_delta
    else:
        expire = now + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"iat": now, "exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> dict:
    """
    Decodes and validates a JWT token. Raises HTTPException on invalid/expired token.
    """
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token has expired. Please log in again.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token credentials.",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_admin(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_bearer),
) -> dict:
    """
    FastAPI dependency that enforces admin JWT authentication on protected endpoints.
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin authentication required. Bearer token missing.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = credentials.credentials
    payload = decode_access_token(token)
    username: str = payload.get("sub")

    if not username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload: Subject missing.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if username != ADMIN_USERNAME:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: Insufficient admin permissions.",
        )

    return {"username": username, "role": "admin"}

