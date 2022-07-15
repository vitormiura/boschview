import { Box } from '@mui/material';
import { Project } from '../../common/types';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.project_id}`}>
      <Box>
        <h1>{project.project_name}</h1>
        <h2>{project.course}</h2>
        <h3>{project.status}</h3>
        <h4>{project.area}</h4>
        <p>{project.description}</p>
        <p>{project.techs}</p>
      </Box>
    </Link>
  );
}
