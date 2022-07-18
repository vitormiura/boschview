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
  if (isLoading || data == undefined)
    return (
      <div
        style={{
          display: "flex",
          height: "80vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );

  return (
    <div className={styles.container}>
      <h1>Welcome</h1>
      <Button variant="outlined" onClick={() => router.push("/projects")}>
        See All Projects
      </Button>
      <Button
        sx={{ marginLeft: "1rem" }}
        variant="contained"
        onClick={() => router.push("/about")}
      >
        About us{" "}
        <img style={{ marginLeft: "0.7rem" }} width={25} src="/about_us.png" />
      </Button>
      <ProjectDashboard allProjects={data} />
    </div>
  );
};

export default HomePage;
