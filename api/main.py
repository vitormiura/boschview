#from http.client import ResponseNotReady
#from urllib import response
from fastapi import FastAPI, Depends, HTTPException
#from sqlalchemy.orm import Session

import models

app = FastAPI(
    title = "BOSCH/ETS Project Manager (Made by ApeView)",
    version = "0.0.1"
)