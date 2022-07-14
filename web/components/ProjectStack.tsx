import { Box } from '@mui/material';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '../common/types';
import Techs from '../src/techs.json';
import AddTechModal from './AddTechModal';

interface Props {
  stack: string;
  onEdit: boolean;
  deleteTech?: (tech: string) => void; // actually a function that modify states lmao
  addTech?: (tech: string) => void;
}

interface TechProps {
  tech: string;
  onEdit: boolean;
  deleteTech: any;
}

const Tech: NextPage<TechProps> = ({ tech, onEdit, deleteTech }) => {
  // apply some conditional rendering
  const renderLogo = () => {
    // if logo exists in json render logo

    const logoExists = Techs.map((value) => value.name).includes(tech);
    if (logoExists) {
      let techIcon = '';
      Techs.map((value) => {
        if (value.name == tech) {
          techIcon = value.svg;
          return;
        }
      });
      return <Image width={50} height={50} src={techIcon} />;
    }

    return <h2>{tech}</h2>;
  };

  if (onEdit) {
    return (
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '0.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 100,
          height: 100,
        }}
      >
        {renderLogo()}
        <Box
          onClick={() => deleteTech(tech)}
          sx={{ marginLeft: 'auto', marginBottom: 'auto', cursor: 'pointer' }}
        >
          🗑️
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 100,
        height: 100,
      }}
    >
      {renderLogo()}
    </Box>
  );
};

const ProjectStack: NextPage<Props> = ({ stack, onEdit, deleteTech, addTech }) => {
  console.log('teste');

  const renderModalButton = () => {
    if (onEdit && addTech != undefined) {
      return <AddTechModal addTech={addTech} />;
    }
  };

  const renderTechStack = () => {
    if (stack != '') {
      return (
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          {stack.split(';').map((tech, index) => (
            <Tech key={index} tech={tech} onEdit={onEdit} deleteTech={deleteTech} />
          ))}
          {renderModalButton()}
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          {renderModalButton()}
        </Box>
      );
    }
  };

  return <Box>{renderTechStack()}</Box>;
};

export default ProjectStack;
