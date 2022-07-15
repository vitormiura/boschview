import { useState } from 'react';
import { useQuery } from 'react-query';
import { Button } from '@mui/material';

import reactLogo from './assets/react.svg';
import './App.css';
import { fetchAllProjects } from './common/functions';

function App() {
  //import.meta.env.VITE_API_URL
  const { isLoading, error, data } = useQuery('projects', fetchAllProjects);

  if (isLoading || data == undefined) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  console.log(data);

  return (
    <div className="App">
      <p>Hello World</p>
      <Button variant="contained">Hello World</Button>
    </div>
  );
}

export default App;
