import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from '@mui/material';
import type { NextPage } from 'next';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Project } from '../common/types';

interface CreateEditProjectProps {
  isEdit: false | { project_id: string };
}

const CreateEditProject: NextPage<CreateEditProjectProps> = ({ isEdit }) => {
  const [inputName, setInputName] = useState('');
  const [inputCourse, setInputCourse] = useState('');
  const [inputContact, setInputContact] = useState('');
  const [inputArea, setInputArea] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputTeam, setInputTeam] = useState('');
  const [inputTechs, setInputTechs] = useState('');
  const [inputFinishRatio, setInputFinishRatio] = useState(0);
  const [inputStatus, setInputStatus] = useState('');

  const saveChanges = () => {
    alert('saving..');
    const body: Project = {
      project_name: inputName,
      students: inputTeam,
      area: inputArea,
      course: inputCourse,
      create_date: '',
      description: inputDescription,
      techs: inputTechs,
      contact: inputContact,
      finish_ratio: inputFinishRatio,
      status: inputStatus,
      project_id: '',
    };

    console.log(body);

    if (isEdit) {
      // then use PUT
    } else {
      // use POST
    }
  };

  let updateButton: string = 'Create project';

  const editOrCreateRender = () => {
    if (isEdit) {
      return (
        <div>
          <p>id: {isEdit.project_id}</p>
        </div>
      );
    } else {
      return (
        <Box>
          <p>Create new project</p>
        </Box>
      );
    }
  };

  if (isEdit) {
    updateButton = 'Save changes';
    const fetchProjects = async (): Promise<Project> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${isEdit.project_id}`
      ).then((res) => res.json());
      setInputName(response.project_name);
      setInputCourse(response.course);
      setInputContact(response.contact);
      setInputArea(response.area);
      setInputDescription(response.description);
      setInputTeam(response.students);
      setInputFinishRatio(response.finish_ratio);
      setInputStatus(response.status);
      console.log(response);
      return response;
    };

    const { isLoading, error, data } = useQuery('oneProject', fetchProjects, {
      staleTime: Infinity,
      cacheTime: Infinity,
    });
    if (data == undefined) {
      if (isLoading) return <CircularProgress />;
      else return <p>Data could not be retrieved</p>;
    }
    if (error) {
      console.log(error);
      return <p>An error ocurred</p>;
    }
  }

  const handleInput = (e: any, hookSet: Dispatch<SetStateAction<any>>) => {
    hookSet(e.target.value);
    console.log(e.target.value);
  };

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}
    >
      <Box
        sx={{
          width: '80%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 2fr',
          gridTemplateRows: '1fr 1fr 1fr 1fr 2fr 2fr',
          gap: 2,
        }}
      >
        <Button variant="outlined" onClick={saveChanges} sx={{ gridColumn: 'span 3' }}>
          {updateButton}
        </Button>
        <TextField
          value={inputName}
          onChange={(e: any) => handleInput(e, setInputName)}
          variant="outlined"
          label="Name"
        />
        <TextField
          value={inputCourse}
          onChange={(e: any) => handleInput(e, setInputCourse)}
          variant="outlined"
          label="Course"
        />
        <Box>
          <p>Finish Ratio</p>
          <Slider
            valueLabelFormat={(value: number) => `${value}%`}
            valueLabelDisplay="on"
            value={inputFinishRatio}
            onChange={(e: any) => handleInput(e, setInputFinishRatio)}
            min={0}
            max={100}
          />
        </Box>
        <TextField
          value={inputContact}
          onChange={(e: any) => handleInput(e, setInputContact)}
          variant="outlined"
          label="Contact"
        />
        <TextField
          value={inputArea}
          onChange={(e: any) => handleInput(e, setInputArea)}
          variant="outlined"
          label="Area"
        />
        <Box sx={{ gridRow: 'span 3', backgroundColor: 'red' }}>Imagem</Box>
        <FormControl sx={{ gridColumn: 'span 2' }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            fullWidth
            labelId="status-label"
            label="Status"
            value={inputStatus}
            onChange={(e: any) => handleInput(e, setInputStatus)}
          >
            <MenuItem value={'Done'}>Done</MenuItem>
            <MenuItem value={'In Progress'}>In Progress</MenuItem>
            <MenuItem value={'Implemented'}>Implemented</MenuItem>
          </Select>
        </FormControl>

        <TextField
          value={inputDescription}
          onChange={(e: any) => handleInput(e, setInputDescription)}
          variant="outlined"
          label="Description"
          sx={{ gridColumn: 'span 2' }}
          multiline
          rows={4}
        />
        <TextField
          value={inputTeam}
          onChange={(e: any) => handleInput(e, setInputTeam)}
          variant="outlined"
          label="Team"
          sx={{ gridColumn: 'span 2' }}
          multiline
          rows={4}
        />
        {/* TECH STACK */}
        <Box>Tech</Box>

        {editOrCreateRender()}
      </Box>
    </Box>
  );
};

export default CreateEditProject;
