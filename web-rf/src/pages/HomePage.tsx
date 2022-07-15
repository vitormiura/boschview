import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <p>Home Page</p>
      <Button variant="contained" onClick={() => navigate('/projects')}>
        Search Projects
      </Button>
    </div>
  );
}
