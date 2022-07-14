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
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Project } from '../common/types';
import ProjectStack from './ProjectStack';

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
  const router = useRouter();

  let updateButton: string = 'Create project';
  if (isEdit) updateButton = 'Save changes';

  const fetchProjects = async (): Promise<Project> => {
    if (isEdit) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${isEdit.project_id}`
      ).then((res) => res.json());
      setInputName(response.project_name);
      setInputCourse(response.course);
      setInputContact(response.contact);
      setInputArea(response.area);
      setInputTechs(response.techs);
      setInputDescription(response.description);
      setInputTeam(response.students);
      setInputFinishRatio(response.finish_ratio);
      setInputStatus(response.status);
      console.log(response);
      return response;
    } else {
      const serverPing = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`).then((res) =>
        res.json()
      );
      return serverPing;
    }
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

  const saveChanges = async () => {
    const body: Project = {
      project_name: inputName,
      students: inputTeam,
      area: inputArea,
      course: inputCourse,
      created_date: Date.now().toString(),
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/update/?sl_id=${isEdit.project_id}`,
        {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      )
        .then((res) => res.json())
        .then((json) => console.log(json));
    } else {
      // use POST
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((json) => console.log(json));
    }

    router.push('/projects');
  };

  const addTech = (tech: string) => {
    if (inputTechs != '') {
      if (!inputTechs.split(';').includes(tech)) setInputTechs(`${inputTechs};${tech}`);
    } else {
      setInputTechs(tech);
    }

    console.log(inputTechs);
  };

  const deleteTech = (tech: string) => {
    setInputTechs(
      inputTechs
        .split(';')
        .filter((item) => item != tech)
        .join(';')
    );
    console.log(inputTechs);
  };

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
        <Button variant="contained" onClick={saveChanges} sx={{ gridColumn: 'span 3' }}>
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
        <Box>
          <p>Tech</p>
          <ProjectStack
            addTech={addTech}
            deleteTech={deleteTech}
            onEdit={true}
            stack={inputTechs}
          />
        </Box>

        {editOrCreateRender()}
      </Box>
    </Box>
  );
};

export default CreateEditProject;
