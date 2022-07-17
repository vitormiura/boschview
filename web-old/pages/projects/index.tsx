import type { NextPage } from 'next';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import ProjectCard from '../../components/ProjectCard';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { Project } from '../../common/types';

import { useQuery } from 'react-query';
import CircularProgress from '@mui/material/CircularProgress';

const Projects: NextPage = () => {
  const [filteredData, setFilteredData] = useState<Project[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');

  const [stackFilter, setStackFilter] = useState<string>('');

  const fetchProjects = async (): Promise<Project[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`).then((res) =>
      res.json()
    );
    setFilteredData(response);
    return response;
  };

  const filterData = () => {
    if (data == undefined) return;
    const newData = data
      .filter((x: Project) =>
        x.project_name
          .toLowerCase()
          .includes(
            searchFilter === '' || searchFilter == undefined
              ? x.project_name.toLowerCase()
              : searchFilter.toLowerCase()
          )
      )
      .filter(
        (y: Project) =>
          y.area == (areaFilter === '' || areaFilter == undefined ? y.area : areaFilter)
      )
      .filter(
        (z: Project) =>
          z.status ==
          (statusFilter === '' || statusFilter == undefined ? z.status : statusFilter)
      )
      .filter(
        (a: Project) =>
          a.course ==
          (courseFilter === '' || courseFilter == undefined ? a.course : courseFilter)
      )
      .filter((b: Project) =>
        stackFilter === '' || stackFilter == undefined ? b : b.techs.includes(stackFilter)
      );
    setFilteredData(newData);
  };

  const uniq = (a: string[]) => {
    return Array.from(new Set(a));
  };

  let { isLoading, error, data } = useQuery('projects', fetchProjects);
  if (data == undefined) {
    if (isLoading) return <CircularProgress />;
    else return <p>Data could not be retrieved</p>;
  }
  if (error) {
    console.log(error);
    return <p>An error ocurred</p>;
  }

  let techStackArr: string[] = [];

  data.forEach((project) => {
    project.techs.split(';').map((tech) => {
      techStackArr.push(tech);
    });
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        height: 'auto',
        padding: 2,
        gap: 2,
      }}
    >
      <Box sx={{ width: '80%', display: 'flex', gap: 2, flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Autocomplete
            disablePortal
            options={uniq(data.map((value) => value.area))}
            renderInput={(params) => <TextField {...params} label="Filter by Area" />}
            onInputChange={(e, newValue) => setAreaFilter(newValue)}
            sx={{ width: '100%' }}
          />
          <Autocomplete
            disablePortal
            options={uniq(data.map((value) => value.status))}
            renderInput={(params) => <TextField {...params} label="Filter by Status" />}
            onChange={(e: any, newValue: any) => setStatusFilter(newValue)}
            sx={{ width: '100%' }}
          />
          <Autocomplete
            disablePortal
            options={uniq(data.map((value) => value.course))}
            renderInput={(params) => <TextField {...params} label="Filter by Course" />}
            onChange={(e: any, newValue: any) => setCourseFilter(newValue)}
            sx={{ width: '100%' }}
          />

          <Autocomplete
            disablePortal
            options={uniq(techStackArr)}
            renderInput={(params) => <TextField {...params} label="Filter by Tech" />}
            onChange={(e: any, newValue: any) => {
              setStackFilter(newValue);
              console.log(newValue);
            }}
            sx={{ width: '100%' }}
          />
        </Box>
        <TextField
          label="Search by name"
          variant="outlined"
          onChange={(e: any) => setSearchFilter(e.target.value)}
          sx={{ width: '100%' }}
        />
        <Button variant="contained" onClick={filterData}>
          Search
        </Button>
      </Box>

      <p>{filteredData.length} items found</p>

      <Box
        sx={{
          width: '80%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 2,
        }}
      >
        {filteredData.map((value, index) => {
          return <ProjectCard key={index} project={value} />;
        })}
      </Box>
    </Box>
  );
};

export default Projects;
