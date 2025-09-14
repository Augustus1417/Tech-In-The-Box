from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings
from sqlalchemy.exc import OperationalError
import time

DATABASE_URI = f"mysql+pymysql://{settings.USERNAME}:{settings.PASSWORD}@{settings.HOSTNAME}/{settings.DATABASE}"

engine = create_engine (DATABASE_URI, echo=True)

for i in range(10):
    try:
        conn = engine.connect()
        conn.close()
        print("Database ready")
        break
    except OperationalError:
        print("Database not ready, retrying...")
        time.sleep(3)
else:
    raise Exception("Could not connect to the database")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally: db.close()
