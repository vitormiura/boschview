import { Box } from "@mui/material";
import type { NextPage } from "next";
import Link from "next/link";
import { Project } from "../common/types";

interface Props {
  project: Project;
}

const ProjectCard: NextPage<Props> = ({ project }) => {
  return (
    <Link href={`/projects/${project.title}`}>
      <Box
        sx={{
          backgroundColor: "white",
          paddingY: 2,
          paddingX: 4,
          height: 200,
          cursor: "pointer",
        }}
      >
        <h2>{project.title}</h2>
        <h3>Author: {project.author}</h3>
        <p>Language: {project.language}</p>
        <p>Country: {project.country}</p>
      </Box>
    </Link>
  );
};

export default ProjectCard;
