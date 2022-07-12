#from http.client import ResponseNotReady
#from urllib import response
from fastapi import FastAPI, Depends, HTTPException
from api.db_handler import SessionLocal
#from sqlalchemy.orm import Session
import crud
import models
import schemas
from db_handler import SessionLocal, engine 

import models

app = FastAPI(
    title = "BOSCH/ETS Project Manager (Made by ApeView)",
    version = "0.0.1"
)

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()