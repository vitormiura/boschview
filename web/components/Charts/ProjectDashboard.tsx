import { Box, Button } from "@mui/material";
import { Project } from "../../common/types";

import "chart.js/auto";

import StudentsPerArea from "./StudentsPerArea";
import ProjectsPerArea from "./ProjectsPerArea";
import MostUsedTech from "./MostUsedTech";
import ProjectStatusPerArea from "./ProjectStatusPerArea";
import ProjectsPerStatus from "./ProjectsPerStatus";

export default function ProjectDashboard({
  allProjects,
}: {
  allProjects: Project[];
}) {
  const uniqueArray = (array: string[]) => Array.from(new Set(array));
  const uniqueAllStudents = uniqueArray(
    allProjects.map((project) => project.students.split(";")).flat(1)
  );

  const uniqueAllAreas = uniqueArray(
    allProjects.map((project) => project.area)
  );

  const uniqueAllCourses = uniqueArray(
    allProjects.map((project) => project.course)
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h2>Dashboard</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "200px 200px 200px",
          height: "100%",
          backgroundColor: "lightgray",
          position: "relative",
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <StudentsPerArea allProjects={allProjects} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <ProjectsPerArea allProjects={allProjects} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <ProjectsPerStatus allProjects={allProjects} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <MostUsedTech allProjects={allProjects} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <ProjectStatusPerArea allProjects={allProjects} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Box>Students:{uniqueAllStudents.length}</Box>
          <Box>Projects: {allProjects.length}</Box>
          <Box>Areas: {uniqueAllAreas.length}</Box>
          <Box>Courses: {uniqueAllCourses.length}</Box>
        </Box>
      </div>
    </div>
  );
}
