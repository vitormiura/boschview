import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import { Project } from '../../common/types';
import { Button } from '@mui/material';
import CreateEditProject from '../../components/CreateEditProject';

const ProjectCreatePage: NextPage = () => {
  return (
    <Box sx={{ backgroundColor: 'lightgray' }}>
      <p>Create page</p>
      <CreateEditProject isEdit={false} />
    </Box>
  );
};

export default ProjectCreatePage;
