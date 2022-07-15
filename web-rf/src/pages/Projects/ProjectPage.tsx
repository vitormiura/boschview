import { Box, Button, CircularProgress } from '@mui/material';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchOneProject } from '../../common/functions';
import { Project } from '../../common/types';

export default function ProjectPage() {
  const params = useParams();
  const projectid = params.projectid;
  if (projectid === undefined) return <div>Failed to retrieve data</div>;

  const { isLoading, error, data } = useQuery('project', () =>
    fetchOneProject(projectid)
  );

  console.log(data);

  if (isLoading || data == undefined) return <CircularProgress />;
  if (error) return <div>Error</div>;

  const imageUrl = `${import.meta.env.VITE_API_URL}/media/${data.image_path}`;

  return (
    <div>
      <p>{params.projectid}</p>
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
        </Box>
      </Box>
    </div>
  );
}
