from sqlalchemy.orm import Session
import models
import schemas
import uuid

def getProjectbyProjectId(db:Session, project_id: str):
    return db.query(models.Projects).filter(models.Projects.project_id == project_id).first()

def getProjectbyProjectName(db:Session, project_name: str):
    return db.query(models.Projects).filter(models.Projects.project_name == project_name).first()

def getProjects(db:Session, skip: int = 0, limit: int = 100):
    return db.query(models.Projects).offset(skip).limit(limit).all()

def getProjectsById(db:Session, sl_id: str):
    return db.query(models.Projects).filter(models.Projects.project_id == sl_id).first()

def returnID(db:Session, id: str):
    if db.query(models.Projects).filter(models.Projects.project_id == id).first() != None:
        return True
    return False

def generateUniqueUUID(db: Session):
    id = str(uuid.uuid4()).replace("-", "")
    while returnID(db, id):
        id = str(uuid.uuid4()).replace("-", "")
    return id

def newProject(db:Session, proj: schemas.ProjectAdd, image_path: str):
    project_details = models.Projects(
        project_id = generateUniqueUUID(db),
        project_name = proj.project_name,
        students = proj.students,
        area = proj.area,
        course = proj.course,
        description = proj.description,
        techs = proj.techs,
        contact = proj.contact,
        finish_ratio = proj.finish_ratio,
        status = proj.status,
        image_path = image_path,
    )
    
    db.add(project_details)
    db.commit()
    db.refresh(project_details)
    return models.Projects(**proj.dict())

def newProjectWithoutImage(db:Session, proj: schemas.ProjectAdd):
    project_details = models.Projects(
        project_id = generateUniqueUUID(db),
        project_name = proj.project_name,
        students = proj.students,
        area = proj.area,
        course = proj.course,
        description = proj.description,
        techs = proj.techs,
        contact = proj.contact,
        finish_ratio = proj.finish_ratio,
        status = proj.status,
    )
    
    db.add(project_details)
    db.commit()
    db.refresh(project_details)
    return models.Projects(**proj.dict())

def updateProject(db:Session, sl_id: str, up: schemas.UpdateProject, img:str):
    up.imageSet(img)
    db.query(models.Projects).filter(models.Projects.project_id == sl_id).update(vars(up))
    db.commit()
    return db.query(models.Projects).filter(models.Projects.project_id == sl_id).first()

def updateProjectWithoutImage(db:Session, sl_id: str, up: schemas.UpdateProject):
    imagem = db.query(models.Projects).filter(models.Projects.project_id == sl_id).first()
    up.imageSet(str(imagem.image_path))
    db.query(models.Projects).filter(models.Projects.project_id == sl_id).update(vars(up))
    db.commit()
    return db.query(models.Projects).filter(models.Projects.project_id == sl_id).first()

def deleteProject(db:Session, sl_id: str):
    try:
        db.query(models.Projects).filter(models.Projects.project_id == sl_id).delete()
        db.commit()
    except Exception as e:
        raise Exception(e)

