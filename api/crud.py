from sqlalchemy.orm import Session
import models
import schemas
from fastapi import File, UploadFile
import uuid
import shutil
import main


# async def imageUpload(file:UploadFile = File(...)):
#     file_location = f'media/{file.filename}'
#     with open(file_location, 'wb') as buffer:
#         shutil.copyfileobj(file.file,buffer) 
#     image = str('media/'+file.filename)
    
#     return image

def getProjectbyProjectId(db:Session, project_id: str):
    return db.query(models.Projects).filter(models.Projects.project_id == project_id).first()

def getProjectbyProjectName(db:Session, project_name: str):
    return db.query(models.Projects).filter(models.Projects.project_name == project_name).first()

def getProjects(db:Session, skip: int = 0, limit: int = 100):
    return db.query(models.Projects).offset(skip).limit(limit).all()

def getProjectsById(db:Session, sl_id: str):
    return db.query(models.Projects).filter(models.Projects.project_id == sl_id).first()

def returnID(db:Session, id: str):
    #print(db.query(models.Projects).filter(models.Projects.project_id == id).first())
    if db.query(models.Projects).filter(models.Projects.project_id == id).first() != None:
        return True
    return False

def generateUniqueUUID(db: Session):
    id = str(uuid.uuid4()).replace("-", "")
    while returnID(db, id):
        id = str(uuid.uuid4()).replace("-", "")
    return id

def newProject(db:Session, proj: schemas.ProjectAdd, main = main):

    project_details = models.Projects(
        project_id = generateUniqueUUID(db),
        project_name = proj.project_name,
        students = proj.students,
        area = proj.area,
        course = proj.course,
        #created_date = proj.created_date,
        description = proj.description,
        techs = proj.techs,
        contact = proj.contact,
        finish_ratio = proj.finish_ratio,
        status = proj.status,
        #image = main.imageUpload(),
    )
    
    db.add(project_details)
    db.commit()
    db.refresh(project_details)
    return models.Projects(**proj.dict())

def updateProject(db:Session, sl_id: str, details: schemas.UpdateProject):
    db.query(models.Projects).filter(models.Projects.project_id == sl_id).update(vars(details))
    db.commit()
    return db.query(models.Projects).filter(models.Projects.project_id == sl_id).first()

def deleteProject(db:Session, sl_id: str):
    try:
        db.query(models.Projects).filter(models.Projects.project_id == sl_id).delete()
        db.commit()
    except Exception as e:
        raise Exception(e)

