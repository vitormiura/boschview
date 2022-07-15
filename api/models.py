from datetime import datetime
from email.mime import image
from email.policy import default
from sqlite3 import Date
import datetime
from xmlrpc.client import Boolean
from sqlalchemy import Column, String, Integer, DateTime
from sqlalchemy_utils import URLType
from sqlalchemy.dialects.postgresql import UUID
from db_handler import Base

class Projects(Base):
    __tablename__ = "project"
    project_id = Column(String(255), primary_key=True)
    project_name = Column(String(255), index=True, nullable=False)
    students = Column(String(255), index=True, nullable=False)
    area = Column(String(25), index=True, nullable=False)
    course = Column(String(50), index=True, nullable=False)
    created_date = Column(DateTime, default=datetime.datetime.utcnow, autoincrement=True, index=True, nullable=False)
    description = Column(String(255), index=True, nullable=False)
    techs = Column(String(255), index=True, nullable=False)
    contact = Column(String(255), index=True, nullable=False)
    finish_ratio = Column(Integer, index=True, nullable=False)
    status = Column(String(255), index=True, nullable=False)
    image = Column(URLType, index=True, nullable=True)
