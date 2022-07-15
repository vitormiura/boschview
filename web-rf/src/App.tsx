import { useState } from 'react';
import { useQuery } from 'react-query';
import { Routes, Route, Link } from 'react-router-dom';

import reactLogo from './assets/react.svg';
import './App.css';
import { fetchAllProjects } from './common/functions';
import HomePage from './pages/HomePage';
import HeaderComponent from './components/HeaderComponent';
import SearchProjectsPage from './pages/SearchProjectsPage';
import ProjectPage from './pages/Projects/ProjectPage';
import EditProjectPage from './pages/Projects/EditProjectPage';
import CreateProjectPage from './pages/Projects/CreateProjectPage';
import LoginPage from './pages/Auth/LoginPage';
import SignUpPage from './pages/Auth/SignupPage';
import AboutUs from './pages/AboutUsPage';

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/projects" element={<SearchProjectsPage />} />
        <Route path="/projects/create" element={<CreateProjectPage />} />
        <Route path="/projects/:projectid" element={<ProjectPage />} />
        <Route path="/projects/:projectid/edit" element={<EditProjectPage />} />
      </Routes>
    </div>
  );
}

export default App;
