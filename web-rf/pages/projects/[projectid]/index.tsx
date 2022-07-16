import type { NextPage } from "next";
import { Box, Button, CircularProgress } from "@mui/material";
import { Project } from "../../../common/types";
import ViewTechStack from "../../../components/Techs/ViewTechStack";
import useFetch, { FetchResult } from "react-fetch-hook";
import { useRouter } from "next/router";

const ProjectPage: NextPage = () => {
  const router = useRouter();
  const projectid = router.query.projectid;

  if (projectid === undefined) return <div>Failed to retrieve data</div>;

  const { isLoading, data, error }: FetchResult<Project> = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${projectid}`
  );
  if (isLoading || data == undefined) return <CircularProgress />;
  if (error) return <div>Error</div>;

  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/media/${data.image_path}`;

  return (
    <div>
      <p>{projectid}</p>
      <Box>
        {/* HEADER */}
        <img alt={data.image_path} src={imageUrl} width={500} height={300} />
        <Box>
          <h1>{data.project_name}</h1>
          <h3>Area: {data.area}</h3>
          <h3>Contato: {data.contact}</h3>
          <h3>Curso: {data.course}</h3>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="info"
            href={`/projects/${data.project_id}/edit`}
          >
            Edit this page
          </Button>
        </Box>
      </Box>
      <Box>
        {/* ARTICLE */}
        <Box>
          <Box>
            <h2>Descrição</h2>
            <Box>{data.description}</Box>
          </Box>
          <Box>
            <h2>Alunos</h2>
            <Box>{data.students}</Box>
          </Box>
          <Box>
            <ViewTechStack stack={data.techs} />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ProjectPage;
