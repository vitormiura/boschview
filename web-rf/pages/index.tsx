import { Button } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const HomePage: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <p>teste</p>
      <Button variant="contained" onClick={() => router.push("/projects")}>
        See All Projects
      </Button>
    </div>
  );
};

export default HomePage;
