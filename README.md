# BoschView - Web Application (Front-End)

## Development:

**Todo**

[x] Modal search box in Home page when clicking the search icon in header

[ ] Study about creating charts in react

[x] Improve page styling

**MVP:**

[ ] Show charts in a dashboard view in Home page (using chart.js or similar) (Projects p/area, most used technologies, number of students p/area etc...)

[x] Search projets by name, technology and area

[x] Display a page for each project, showing all related informations (students, area, description, tecnologies, finish ratio and current status)

[x] Add photo to project

[x] Add, edit and delete projects

[ ] Follow bosch brandguides

[ ] About us page

[ ] Local storage auth

**Post-MVP:**

- Students can add/edit/delete/view comments to indicate more information about the project finish ratio
- Working login and sign up users auth
- Project Rating
- Different types of users, normal vs admin
- Admin registration email confirmation
- Dark mode
- Display a page for each user, showing all related informations
- Display a page for each area, showing all related informations
- Export database to CSV

## Getting Started

1. First, install all project dependencies:

```bash
npm install
# or:
yarn
```

2. Then run the development server:

```bash
npm run dev
# or if you used yarn in the first step:
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your web browser.

***

# BoschView - Web Application (Back-End)

## Development:

**MVP:**

[x] Create initial project structure

[x] Do models, schemas, endpoints and CRUD of the API

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
- Admin registration email confirmation
- Export database to CSV
- Migrate database to PostgreSQL

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
4. Run the server with:

```bash
uvicorn main:app --reload
```

5. Open [http://localhost:8000](http://localhost:8000) with your web browser.

