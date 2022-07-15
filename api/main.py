from http.client import ResponseNotReady
from urllib import response
from fastapi import FastAPI, Depends, HTTPException, File, UploadFile
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import models
import crud
import schemas
import shutil
from db_handler import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

origins = ["*"]


app = FastAPI(
    title = "BOSCH/ETS Project Manager (Made by ApeView)",
    version = "0.0.1"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

@app.get('/projects', response_model = list[schemas.Project])
def retrieveAllProjects(skip:int = 0, limit:int = 100, db:Session = Depends(get_db)):
    projects = crud.getProjects(db = db, skip = skip, limit = limit)
    return projects

@app.post('/projects/add/image')
async def imageUpload(file:UploadFile = File(...)):
    file_location = f'media/{file.filename}'
    with open(file_location, 'wb') as buffer:
        shutil.copyfileobj(file.file,buffer) 
    image = str('media/'+file.filename)
    
    return image

@app.get('/projects/{project_id}', response_model = schemas.Project)
def retrieveSingleProject(project_id:str, db:Session = Depends(get_db)):
    project = crud.getProjectbyProjectId(db=db, project_id=project_id)
    return project

@app.put('/projects/update/', response_model = schemas.Project)
def updateProject(sl_id:str, update_param:schemas.UpdateProject, db:Session = Depends(get_db)):
    details = crud.getProjectsById(db = db, sl_id = sl_id)
    if not details:
        raise HTTPException(status_code=400, detail=f'Nothing was found to update')
    return crud.updateProject(db = db, details = update_param, sl_id = sl_id)

@app.delete('/projects/delete/')
def deleteProject(sl_id:str, db:Session = Depends(get_db)):
    details = crud.getProjectsById(db = db, sl_id = sl_id)
    if not details:
        raise HTTPException(status_code = 400, detail=f'Nothing was found to delete')
    try:
        crud.deleteProject(db = db, sl_id = sl_id)
    except Exception as e:
        raise HTTPException(status_code = 400, detail=f'Unable to delete: {e}')
    return {'delete status':'success'}

@app.post('/projects/add/', response_model = schemas.ProjectAdd)
def newProject(project:schemas.ProjectAdd, db:Session = Depends(get_db)):
    project_name = crud.getProjectbyProjectName(db = db, project_name = project.project_name)
    if project_name:
        raise HTTPException(status_code=400, detail=f"Project: {project.project_name} is already on db as {project_name}")
    return crud.newProject(db = db, proj=project)