import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import projectData from "../../../src/projects.json";
import Image from "next/image";
import image1 from "../../../assets/image1.jpg";
import { Project } from "../../../common/types";
import ProjectStack from "../../../components/ProjectStack";
import { Button } from "@mui/material";

interface Props {
  project: Project;
}

const ProjectHeader: NextPage<Props> = ({ project }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#007bc0",
        display: "flex",
        gap: 2,
        padding: "2rem 10%",
        color: "white",
      }}
    >
      <Box>
        <Image
          style={{ borderRadius: "1rem" }}
          src={image1}
          width={500}
          height={300}
        />
      </Box>
      <Box sx={{}}>
        <h1>{project.project_name}</h1>
        <h3>Area: {project.area}</h3>
        <h3>Contato: {project.contact}</h3>
        <h3>Curso: </h3>
      </Box>
      <Box sx={{ marginLeft: "auto" }}>
        <Button
          variant="contained"
          color="info"
          href={`/projects/${project.project_id}/edit`}
        >
          Edit this page
        </Button>
      </Box>
    </Box>
  );
};

const ProjectContent: NextPage<Props> = ({ project }) => {
  return (
    <Box
      sx={{
        padding: "1rem 10%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <h2>Descrição</h2>
          <Box sx={{ backgroundColor: "white", padding: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus excepturi debitis est. Praesentium officiis deserunt,
            molestias nam aut corporis, asperiores natus vitae ab excepturi enim
            recusandae similique laborum. Eveniet, quaerat.
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <h2>Alunos</h2>
          <Box sx={{ backgroundColor: "white", padding: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus excepturi debitis est. Praesentium officiis deserunt,
            molestias nam aut corporis, asperiores natus vitae ab excepturi enim
            recusandae similique laborum. Eveniet, quaerat.
          </Box>
        </Box>
      </Box>
      <Box>
        <h2>Tecnologias</h2>
        <Box>
          <ProjectStack stack={project.techs.split(";")} />
        </Box>
      </Box>
    </Box>
  );
};

const ProjectPage: NextPage = () => {
  const data = projectData[0];
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box sx={{ backgroundColor: "lightgray" }}>
      <p>{id}</p>
      <ProjectHeader project={data} />
      <ProjectContent project={data} />
    </Box>
  );
};

export default ProjectPage;