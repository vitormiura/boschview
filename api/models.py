from datetime import datetime
import datetime
from sqlalchemy import Column, String, Integer, DateTime
from db_handler import Base

class Projects(Base):
    __tablename__ = "project"
    project_id = Column(String(255), primary_key=True)
    project_name = Column(String(255), index=True, nullable=True, unique=True)
    students = Column(String(255), index=True, nullable=True)
    area = Column(String(25), index=True, nullable=True)
    course = Column(String(50), index=True, nullable=True)
    created_date = Column(DateTime, default=datetime.datetime.utcnow, autoincrement=True, index=True, nullable=False)
    description = Column(String(255), index=True, nullable=True)
    techs = Column(String(255), index=True, nullable=True)
    contact = Column(String(255), index=True, nullable=True)
    finish_ratio = Column(Integer, index=True, nullable=True)
    status = Column(String(255), index=True, nullable=True)
    image_path  = Column(String(255), index=True, nullable=True)
