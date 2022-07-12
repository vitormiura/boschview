import type { NextPage } from "next";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import bookData from "../../src/data.json"; // Should fetch from api instead, react query is interesting
import projectsData from "../../src/projects.json"; // Should fetch from api instead, react query is interesting
import ProjectCard from "../../components/ProjectCard";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { Project } from "../../common/types";

import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";

const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch(
    "https://apeview-api-dev.herokuapp.com/projects"
  );
  return response.json();
};

const Projects: NextPage = () => {
  const [data, setData] = useState<Project[]>([]);
  const [filteredData, setFilteredData] = useState(data);
  const [searchFilter, setSearchFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");

  // let { isLoading, error, data: apiData } = useQuery("projects", fetchProjects);
  // isLoading = false; // debugging purposes
  // if (isLoading) return <CircularProgress />;
  // if (error) {
  //   console.log(error);
  //   return <p>An error ocurred</p>;
  // }
  // if (apiData == undefined) {
  //   return <p>Data could not be retrieved</p>;
  // }

  // console.log(apiData);

  useEffect(() => {
    setData(projectsData);
    setFilteredData(projectsData);
  }, []);

  const filterData = () => {
    const newData = data
      .filter((x: Project) =>
        x.project_name
          .toLowerCase()
          .includes(
            searchFilter === "" || searchFilter == undefined
              ? x.project_name.toLowerCase()
              : searchFilter.toLowerCase()
          )
      )
      .filter(
        (y: Project) =>
          y.area ==
          (areaFilter === "" || areaFilter == undefined ? y.area : areaFilter)
      );
    setFilteredData(newData);
  };

  const uniq = (a: string[]) => {
    return Array.from(new Set(a));
  };

  if (data == undefined) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgray",
        height: "auto",
        padding: 2,
        gap: 2,
      }}
    >
      <Box
        sx={{ width: "80%", display: "flex", gap: 2, flexDirection: "column" }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={uniq(data.map((value) => value.area))}
            renderInput={(params) => (
              <TextField {...params} label="Filter by Area" />
            )}
            onChange={(e: any, newValue: any) => setAreaFilter(newValue)}
            sx={{ width: "100%" }}
          />
        </Box>
        <TextField
          label="Search by name"
          variant="outlined"
          onChange={(e: any) => setSearchFilter(e.target.value)}
          sx={{ width: "100%" }}
        />
        <Button variant="contained" onClick={filterData}>
          Search
        </Button>
      </Box>

      <p>{filteredData.length} items found</p>

      <Box
        sx={{
          width: "80%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 2,
        }}
      >
        {filteredData.map((value, index) => {
          return <ProjectCard key={index} project={value} />;
        })}
      </Box>
    </Box>
  );
};

export default Projects;
