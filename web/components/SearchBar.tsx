import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Project } from "../common/types";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import projectsData from "../src/projects.json";
import ProjectMiniCard from "./ProjectMiniCard";

const SearchBar: NextPage = () => {
  const [data, setData] = useState<Project[]>([]);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setData(projectsData);
    setFilteredData(projectsData);
  }, []);

  const filterData = (searchFilter: string) => {
    const newData = data.filter((x: Project) =>
      x.project_name
        .toLowerCase()
        .includes(
          searchFilter === "" || searchFilter == undefined
            ? x.project_name.toLowerCase()
            : searchFilter.toLowerCase()
        )
    );
    setFilteredData(newData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <h1>Search here: </h1>
      <TextField
        label="Search by name"
        variant="outlined"
        onChange={(e: any) => {
          filterData(e.target.value);
        }}
        sx={{ width: "100%" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
          gap: 2,
        }}
      >
        {filteredData.map((value, index) => {
          return <ProjectMiniCard key={index} project={value} />;
        })}
      </Box>

      <Button variant="outlined" href="/projects">
        Ver mais resultados
      </Button>
    </Box>
  );
};

export default SearchBar;
