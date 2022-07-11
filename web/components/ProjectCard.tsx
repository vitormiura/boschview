import type { NextPage } from "next";
import { Project } from "../common/types";

interface Props {
  project: Project;
}

const ProjectCard: NextPage<Props> = ({ project }) => {
  return (
    <div>
      <h2>{project.title}</h2>
      <h3>Author: {project.author}</h3>
      <p>Language: {project.language}</p>
      <p>Country: {project.country}</p>
    </div>
  );
};

export default ProjectCard;
