import { useParams } from 'react-router-dom';

export default function EditProjectPage() {
  const params = useParams();
  return (
    <div>
      <p>Editing a project</p>
      <p>{params.projectid}</p>
    </div>
  );
}
