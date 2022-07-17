import { Box } from "@mui/material";
import { Project } from "../../common/types";
import Link from "next/link";
import ViewTechStack from "../Techs/ViewTechStack";
import ViewTeam from "../Team/ViewTeam";

export default function ProjectCard({
  project,
  size,
  onClick,
}: {
  project: Project;
  size?: "small" | "normal";
  onClick?: (any?: any) => any;
}) {
  const renderCard = () => {
    if (size == undefined || size == "normal") {
      // normal size card style
      return (
        <Box>
          <h1>{project.project_name}</h1>
          <h2>{project.course}</h2>
          <h3>{project.status}</h3>
          <h4>{project.area}</h4>
          <p>{project.description}</p>
          <ViewTechStack stack={project.techs} />
          <ViewTeam team={project.students} />
        </Box>
      );
    }
    if (size != undefined || size == "small") {
      // smool card
      return (
        <Box>
          <h2>{project.project_name}</h2>
          <h3>{project.course}</h3>
          <p>{project.area}</p>
          <p>{project.description}</p>
        </Box>
      );
    }
  };
  if (onClick != undefined)
    return (
      <Link href={`/projects/${project.project_id}`}>
        <Box onClick={onClick}>{renderCard()}</Box>
      </Link>
    );
  else
    return <Link href={`/projects/${project.project_id}`}>{renderCard()}</Link>;
}
