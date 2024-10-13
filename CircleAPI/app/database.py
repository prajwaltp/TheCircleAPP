from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from app.settings import get_settings

settings=get_settings()

load_dotenv()
import os
DB_URL = "mysql+pymysql://root:root@localhost:3307/circledb"
engine = create_engine(DB_URL,echo=True)
SessionLocal = sessionmaker(autocommit=False,autoflush=False, bind=engine)

Base = declarative_base()