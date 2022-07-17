import { Box } from '@mui/material';
import type { NextPage } from 'next';
import { Project } from '../common/types';

interface Props {
  project: Project;
}

const ProjectMiniCard: NextPage<Props> = ({ project }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'lightgray',
        paddingY: 2,
        paddingX: 4,
        cursor: 'pointer',
      }}
    >
      <h2>{project.project_name}</h2>
      <p>Area: {project.area}</p>
      <p>Description: {project.description}</p>
    </Box>
  );
};

export default ProjectMiniCard;
