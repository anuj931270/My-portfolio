import os
import urllib.parse
from dotenv import load_dotenv
import pymysql
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Load environment variables from .env
load_dotenv()

# Read MySQL database details from .env
DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", os.getenv("DB_PASS", ""))
DB_NAME = os.getenv("DB_NAME", "portfolio_db")

# MySQL connection string using PyMySQL driver
# Supports either a direct DATABASE_URL / MYSQL_URL or individual DB parameters
raw_database_url = os.getenv("DATABASE_URL", os.getenv("MYSQL_URL", "")).strip()

if raw_database_url:
    if raw_database_url.startswith("mysql://"):
        DATABASE_URL = raw_database_url.replace("mysql://", "mysql+pymysql://", 1)
    else:
        DATABASE_URL = raw_database_url
else:
    # URL-encode password in case it contains special characters
    encoded_password = urllib.parse.quote_plus(DB_PASSWORD)
    DATABASE_URL = f"mysql+pymysql://{DB_USER}:{encoded_password}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# SQLAlchemy Engine with pre-ping to detect broken connections
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=3600,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def ensure_database_exists():
    """
    Connects to MySQL server and creates the target database
    if it does not already exist. Skips on managed cloud DBs where DB is pre-allocated.
    """
    if raw_database_url:
        return

    try:
        connection = pymysql.connect(
            host=DB_HOST,
            port=int(DB_PORT),
            user=DB_USER,
            password=DB_PASSWORD,
            charset="utf8mb4",
        )
        with connection.cursor() as cursor:
            cursor.execute(
                f"CREATE DATABASE IF NOT EXISTS `{DB_NAME}` "
                f"CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
            )
        connection.commit()
        connection.close()
        print(f"[Database] Verified/created database '{DB_NAME}' successfully.")
    except Exception as exc:
        print(f"[Database] Warning: Could not automatically create database '{DB_NAME}': {exc}")


def init_db():
    """
    Initializes the database and automatically creates all tables.
    """
    ensure_database_exists()
    Base.metadata.create_all(bind=engine)
    print("[Database] All tables created/verified successfully.")


def get_db():
    """
    FastAPI dependency yielding a SQLAlchemy database session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
