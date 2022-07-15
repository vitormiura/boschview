import { useParams } from 'react-router-dom';

export default function ProjectPage() {
  const params = useParams();
  return (
    <div>
      <p>{params.projectid}</p>
    </div>
  );
}
