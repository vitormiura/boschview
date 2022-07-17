import { Button, CircularProgress } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Notificate, Project } from "../common/types";
import useFetch, { FetchResult } from "react-fetch-hook";
import ProjectDashboard from "../components/Charts/ProjectDashboard";

import styles from "../styles/Home.module.scss";

const HomePage: NextPage<Notificate> = ({ notificate }) => {
  const router = useRouter();
  const { isLoading, data, error }: FetchResult<Project[]> = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}`
  );

  if (error) return <div>Error</div>;
  if (isLoading || data == undefined) return <CircularProgress />;

  return (
    <div className={styles.container}>
      <h1>Welcome</h1>
      <Button variant="outlined" onClick={() => router.push("/projects")}>
        See All Projects
      </Button>
      <ProjectDashboard allProjects={data} />
    </div>
  );
};

export default HomePage;
