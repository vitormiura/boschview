# Apeview - Web Application (Back-End)

## Development:

**MVP:**

[x] Create initial project structure

[x] Do models, schemas,endpoints and CRUD of the API

[x] Implement image to projects database

[x] Deploy API to heroku

[x] Test all endpoints

[x] Create a script to auto generate the documentation 

**Post-MVP:**

- Implement tables for students, projects and admins (ManytoMany relationship)
- Make possible to add multiple images to a project (Image array)
- Students rating to each project
- Login and sign up users auth
- A single table to show info to the dashboards
- Admin registration emaial confirmation
- Export database to CSV

## Getting Started

1. First, create virtual environment:

```bash
py -m venv venv
# or:
python3 -m venv /path/to/new/virtual/environment
```

2. Activate venv:

```bash
#in windows
.\venv\Scripts\activate 
# or if you using linux distros:
source venv/bin/activate
```

3. Install all packages:

```bash
pip install -r .\requirements.txt
```

4. Open [http://localhost:8000](http://localhost:8000) with your web browser.
