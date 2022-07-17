import { Button } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Notificate } from "../common/types";

const HomePage: NextPage<Notificate> = ({ notificate }) => {
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
