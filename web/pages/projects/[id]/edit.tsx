import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import { Project } from '../../../common/types';
import { Button } from '@mui/material';
import CreateEditProject from '../../../components/CreateEditProject';

interface Props {
  project: Project;
}

const ProjectEditPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (id == undefined) return <div>Project id not found</div>;

  return (
    <Box sx={{ backgroundColor: 'lightgray' }}>
      <p>Edit page</p>
      <CreateEditProject isEdit={{ project_id: id.toString() }} />
    </Box>
  );
};

export default ProjectEditPage;
