import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import projectData from "../../../src/projects.json";
import { Project } from "../../../common/types";
import { Button } from "@mui/material";

interface Props {
  project: Project;
}

const ProjectEditPage: NextPage = () => {
  const data = projectData[0];
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box sx={{ backgroundColor: "lightgray" }}>
      <p>Edit page {id}</p>
    </Box>
  );
};

export default ProjectEditPage;
