import { useState } from 'react';
import { useQuery } from 'react-query';
import { Routes, Route, Link } from 'react-router-dom';

import reactLogo from './assets/react.svg';
import './App.css';
import { fetchAllProjects } from './common/functions';
import HomePage from './pages/HomePage';
import HeaderComponent from './components/HeaderComponent';

function App() {
  //import.meta.env.VITE_API_URL
  const { isLoading, error, data } = useQuery('projects', fetchAllProjects);

  if (isLoading || data == undefined) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  console.log(data);

  return (
    <div className="App">
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
