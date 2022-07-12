from email.policy import default
from xmlrpc.client import Boolean
from sqlalchemy import Column, String, Integer, Boolean
from db_handler import Base

class Projects(Base):
    __tablename__ = "project"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True, nullable=False)
    #project_id = Column(String, unique=True, index=True, nullable=False)
    project_name = Column(String(255), index=True, nullable=False)
    students = Column(String(255), index=True, nullable=False)
    area = Column(String(25), index=True, nullable=False)
    #date = Column(Integer, index=True, nullable=False)
    description = Column(String(255), index=True, nullable=False)
    techs = Column(String(255), index=True, nullable=False)
