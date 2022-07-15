import { Project } from './types';

export async function fetchAllProjects(
  useStateHook?: React.Dispatch<React.SetStateAction<any>>
): Promise<Project[] | void> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}`).then((res) =>
    res.json().catch((err) => console.error(err))
  );
  if (useStateHook) {
    console.log('There exists a hook!');
    useStateHook(response);
  }
  return response;
}

export async function fetchOneProject(project_id: string): Promise<Project> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${project_id}`).then(
    (res) => res.json().catch((err) => console.error(err))
  );
  return response;
}
