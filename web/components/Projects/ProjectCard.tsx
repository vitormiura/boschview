import { Box } from "@mui/material";
import { Project } from "../../common/types";
import Link from "next/link";
import ViewTechStack from "../Techs/ViewTechStack";
import ViewTeam from "../Team/ViewTeam";
import styles from "../../styles/SearchProjectsPage.module.scss";
import miniStyles from "../../styles/components/ModalSearch.module.scss";

export default function ProjectCard({
  project,
  size,
  onClick,
}: {
  project: Project;
  size?: "small" | "normal";
  onClick?: (any?: any) => any;
}) {
  const renderStatus = () => {
    switch (project.status) {
      case "In Progress":
        return <h3 className={styles.yellow}>{project.status}</h3>;
      case "Done":
        return <h3 className={styles.green}>{project.status}</h3>;
      case "Implemented":
        return <h3 className={styles.blue}>{project.status}</h3>;
      default:
        return <h3>{project.status}</h3>;
    }
  };

  const renderCard = () => {
    if (size == undefined || size == "normal") {
      // normal size card style
      return (
        <Box className={styles.projectCard}>
          <Box>
            <h1>{project.project_name}</h1>
            <h2>Course: {project.course}</h2>
            <h4>Area: {project.area}</h4>
          </Box>

          {renderStatus()}

          <p>{project.description}</p>
          <Box>
            <h4>Technologies</h4>
            <ViewTechStack stack={project.techs} />
          </Box>

          <Box>
            <h4>Team</h4>
            <ViewTeam team={project.students} />
          </Box>
        </Box>
      );
    }
    if (size != undefined || size == "small") {
      // smool card
      return (
        <Box className={miniStyles.miniProjectCard}>
          <h2>{project.project_name}</h2>
          <h3>Course: {project.course}</h3>
          <p>Area: {project.area}</p>
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
