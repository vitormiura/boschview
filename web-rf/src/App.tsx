import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { useQuery } from 'react-query';
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
    </div>
  );
}

export default App;
