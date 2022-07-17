from fastapi import FastAPI, Depends, HTTPException, File, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import models
import crud
import schemas
import shutil
from db_handler import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title = "BOSCH/ETS Project Manager (Made by ApeView)",
    version = "0.0.1"
)

origins = ["*"]

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

@app.get('/projects/{project_id}', response_model = schemas.Project)
def retrieveSingleProject(project_id:str, db:Session = Depends(get_db)):
    project = crud.getProjectbyProjectId(db=db, project_id=project_id)
    return project

@app.delete('/projects/delete/')
def deleteProject(sl_id:str, db:Session = Depends(get_db)):
    details = crud.getProjectsById(db = db, sl_id = sl_id)
    if not details:
        raise HTTPException(status_code = 404, detail=f'Nothing was found to delete')
    try:
        crud.deleteProject(db = db, sl_id = sl_id)
    except Exception as e:
        raise HTTPException(status_code = 500, detail=f'Unable to delete: {e}')
    return {'delete status':'success'}

@app.get('/projects/media/{image_path}')
def get_image(image_path):
    return FileResponse(f'media/{image_path}')

@app.post('/projects/add')
async def upload_accept_file(options: schemas.ProjectAdd = Depends(), data: UploadFile = File(default=None), db:Session = Depends(get_db)):
    project_name = crud.getProjectbyProjectName(db = db, project_name = options.project_name)
    if project_name:
        raise HTTPException(status_code=409, detail=f"Project: {options.project_name} is already on db: {project_name}")
    if data != None:
        file_location = f'media/{data.filename}'
        specialChars = "!@#$%^&*()" 
        for specialChar in specialChars:
            x = file_location.replace(specialChar,'')
        with open(x, 'wb') as buffer:
            shutil.copyfileobj(data.file,buffer) 
        return crud.newProject(db = db, proj=options, image_path=data.filename.replace('#',''))
    return crud.newProjectWithoutImage(db=db, proj=options)

@app.put('/projects/update', response_model = schemas.Project)
async def updateProject(options:schemas.UpdateProject = Depends(), db:Session = Depends(get_db), data: UploadFile = File(default=None)):
    details = crud.getProjectbyProjectId(db = db, project_id = options.project_id)
    if not details:
        raise HTTPException(status_code=404, detail=f'Nothing was found to update')
    if data != None:
        file_location = f'media/{data.filename}'
        specialChars = "!@#$%^&*()" 
        for specialChar in specialChars:
            x = file_location.replace(specialChar,'')
        with open(x, 'wb') as buffer:
            shutil.copyfileobj(data.file,buffer)
        return crud.updateProject(db = db, up = options, sl_id = options.project_id, img=data.filename.replace('#',''))
    return crud.updateProjectWithoutImage(db = db, up = options, sl_id = options.project_id)