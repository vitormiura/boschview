import type { NextPage } from "next";
import { Box, Button, CircularProgress } from "@mui/material";
import { Notificate, Project } from "../../../common/types";
import ViewTechStack from "../../../components/Techs/ViewTechStack";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ViewTeam from "../../../components/Team/ViewTeam";

const ProjectPage: NextPage<Notificate> = ({ notificate }) => {
  const router = useRouter();
  const projectid = router.query.projectid;

  console.log(projectid);

  const [data, setData] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        if (projectid == undefined) return;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/${projectid}`
        );
        setData(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        notificate(`Error: ${err.message}`, "error");
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [projectid]);

  if (error) return <div>Error</div>;
  if (loading || data == undefined) return <CircularProgress />;

  const renderImage = () => {
    if (data.image_path != undefined)
      return (
        <img alt={data.image_path} src={imageUrl} width={500} height={300} />
      );
  };

  const renderStack = () => {
    if (data.techs != undefined && data.techs != "")
      return (
        <Box>
          <h2>Stack</h2>
          <ViewTechStack stack={data.techs} />
        </Box>
      );
  };

  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/media/${data.image_path}`;

  return (
    <div>
      <p>{projectid}</p>
      <Box>
        {/* HEADER */}
        {renderImage()}
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
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              if (confirm("Are you sure you want to delete this project?"))
                axios.delete(
                  `${process.env.NEXT_PUBLIC_API_URL}/delete/?sl_id=${data.project_id}`
                );
              router.push("/projects");
            }}
          >
            Delete this page
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
            <ViewTeam team={data.students} />
          </Box>
          {renderStack()}
        </Box>
      </Box>
    </div>
  );
};

export default ProjectPage;
