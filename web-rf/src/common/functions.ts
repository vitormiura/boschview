import { Project } from './types';

export async function fetchAllProjects(): Promise<Project[] | void> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}`).then((res) =>
    res.json().catch((err) => console.log(err))
  );
  return response;
}
