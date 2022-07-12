import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const ProjectPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  let { isLoading, error, data } = useQuery("apiData", () =>
    fetch("https://jsonplaceholder.typicode.com/photos/1").then((res) =>
      res.json()
    )
  );

  isLoading = false;

  if (isLoading) return <CircularProgress />;
  if (error) {
    console.log(error);
    return <p>An error ocurred</p>;
  }

  return <div>{id}</div>;
};

export default ProjectPage;
