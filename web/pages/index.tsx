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
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p className={styles.teste}>teste</p>
      <Button variant="contained" onClick={() => router.push("/projects")}>
        See All Projects
      </Button>
      <ProjectDashboard allProjects={data} />
    </div>
  );
};

export default HomePage;
