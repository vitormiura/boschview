from datetime import datetime
from pydantic import BaseModel


class ProjectBase(BaseModel):
    project_name: str
    students: str
    area: str
    created_date: datetime
    description: str
    techs: str

class ProjectAdd(ProjectBase):
    project_id: str
    
    class Config:
        orm_mode = True

class Project(ProjectAdd):
    id: int
    
    class Config:
        orm_mode = True
        
class UpdateProject(BaseModel):
    project_name: str
    students: str
    area: str
    created_date: datetime
    description: str
    techs: str
    
    class Config:
        orm_mode = True