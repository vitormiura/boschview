import type { NextPage } from 'next';
import Head from 'next/head';
// import Image from "next/image";
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import GraphData from '../src/graph.json';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Dashboard from '../components/charts/Dashboard';
import { Project } from '../common/types';

const Home: NextPage = () => {
  const fetchProjects = async (): Promise<Project[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`).then((res) =>
      res.json()
    );
    return response;
  };

  const router = useRouter();
  const isAuthenticated: boolean = true;

  if (!isAuthenticated) {
    router.push('/login');
  }

  let { isLoading, error, data } = useQuery('projects', fetchProjects);
  if (data == undefined) {
    if (isLoading) return <CircularProgress />;
    else return <p>Data could not be retrieved</p>;
  }
  if (error) {
    console.log(error);
    return <p>An error ocurred</p>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Head>
        <title>Apeview | Home</title>
        <meta name="description" content="Apeview home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ width: '80%', padding: 2 }}>
        <h1>Welcome</h1>
        <Button variant="outlined" href="/projects">
          Todos os projetos
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Dashboard projects={data} />
        </Box>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
