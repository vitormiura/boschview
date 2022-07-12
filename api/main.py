from http.client import ResponseNotReady
from urllib import response
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import models
import crud
import schemas
from db_handler import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost",
    "http://localhost:8080",
    "https://apeview-api-dev-back.herokuapp.com/"
]


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
    project_id = crud.getProjectbyProjectId(db = db, project_id = project.project_id)
    if project_id:
        raise HTTPException(status_code=400, detail=f"Project ID: {project.project_id} is already on db: {project_id}")
    return crud.newProject(db = db, proj=project)