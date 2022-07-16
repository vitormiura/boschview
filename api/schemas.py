from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class ProjectBase(BaseModel):
    project_name: str
    students: str
    area: str
    course: str
    description: Optional[str]
    techs: Optional[str]
    contact: str
    finish_ratio: int
    status: str

class ProjectAdd(ProjectBase):
    class Config:
        orm_mode = True

class Project(ProjectAdd):
    project_id: str
    created_date: datetime
    image_path: Optional[str]
    
    class Config:
        orm_mode = True
        
class UpdateProject(BaseModel):
    project_id: Optional[str]
    project_name: Optional[str]
    students: Optional[str]
    area: Optional[str]
    course: Optional[str]
    contact: Optional[str]
    description: Optional[str]
    techs: Optional[str]
    finish_ratio: Optional[int]
    status: Optional[str]
    image_path: Optional[str]

    def imageSet(self, newImg):
        self.image_path = newImg

    class Config:
        orm_mode = True

class UpdateProjectNoImage(BaseModel):
    project_id: Optional[str]
    project_name: Optional[str]
    students: Optional[str]
    area: Optional[str]
    course: Optional[str]
    contact: Optional[str]
    description: Optional[str]
    techs: Optional[str]
    finish_ratio: Optional[int]
    status: Optional[str]

    class Config:
        orm_mode = True
