from datetime import datetime
from pydantic import BaseModel

class ProjectBase(BaseModel):
    project_name: str
    students: str
    area: str
    course: str
    description: str
    techs: str
    contact: str
    finish_ratio: int
    status: str

class ProjectAdd(ProjectBase):
    class Config:
        orm_mode = True

class Project(ProjectAdd):
    project_id: str
    created_date: datetime
    image_path: str
    
    class Config:
        orm_mode = True
        
class UpdateProject(BaseModel):
    project_id: str
    project_name: str
    students: str
    area: str
    course: str
    contact: str
    description: str
    techs: str
    finish_ratio: int
    status: str
    image_path: str

    def imageSet(self, newImg):
        self.image_path = newImg

    class Config:
        orm_mode = True
