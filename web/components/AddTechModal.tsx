import type { NextPage } from 'next';
import { SetStateAction, useState } from 'react';
import Box from '@mui/material/Box';
import SearchBar from './SearchBar';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';
import Techs from '../src/techs.json';
import Image from 'next/image';
import { Button, TextField } from '@mui/material';

interface AddTechModalProps {
  addTech: (tech: string) => void;
}

const AddTechModal: NextPage<AddTechModalProps> = ({ addTech }) => {
  const [openModal, setOpenModal] = useState(false);
  const [otherTechName, setOtherTechName] = useState('');

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        onClick={() => setOpenModal(true)}
        sx={{
          backgroundColor: 'white',
          padding: '0.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 100,
          height: 100,
          cursor: 'pointer',
          ':hover': {
            backgroundColor: 'gray',
          },
        }}
      >
        <h1>+</h1>
      </Box>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: 700,
            height: 800,
            bgcolor: 'background.paper',
            border: 'none',
            outline: 'none',
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 6,
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
            }}
          >
            {Techs.map((tech, index) => (
              <Tech
                key={index}
                tech={tech}
                addTech={addTech}
                setOpenModal={setOpenModal}
              />
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
            }}
          >
            <TextField
              onChange={(e: any) => setOtherTechName(e.target.value)}
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              label="Other"
            />
            <Button
              onClick={() => {
                setOpenModal(false);
                addTech(otherTechName);
              }}
              sx={{ width: '30%' }}
              variant="contained"
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

interface TechProps {
  tech: { name: string; svg: string };
  addTech: (tech: string) => void;
  setOpenModal: (value: SetStateAction<boolean>) => void;
}

const Tech: NextPage<TechProps> = ({ tech, addTech, setOpenModal }) => {
  // apply some conditional rendering
  const renderLogo = () => <Image width={50} height={50} src={tech.svg} />;
  return (
    <Box
      onClick={() => {
        setOpenModal(false);
        addTech(tech.name);
      }}
      sx={{
        backgroundColor: 'lightgray',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ':hover': {
          backgroundColor: 'gray',
          color: 'white',
        },
        width: 100,
        height: 100,
        gap: 0.5,
      }}
    >
      <p>
        <b>{tech.name}</b>
      </p>
      {renderLogo()}
    </Box>
  );
};

export default AddTechModal;
