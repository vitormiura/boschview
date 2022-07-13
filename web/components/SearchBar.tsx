import type { NextPage } from "next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Project } from "../common/types";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import projectsData from "../src/projects.json";
import ProjectMiniCard from "./ProjectMiniCard";
import { useRouter } from "next/router";

interface SearchBarProps {
  closeModal: Dispatch<SetStateAction<boolean>>;
}

const SearchBar: NextPage<SearchBarProps> = ({ closeModal }) => {
  const [data, setData] = useState<Project[]>([]);
  const [filteredData, setFilteredData] = useState(data);
  const router = useRouter();

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
          return (
            <div
              key={index}
              onClick={() => {
                closeModal(false); // Need to close the modal before navigating
                router.push(`/projects/${value.project_id}`);
              }}
            >
              <ProjectMiniCard project={value} />
            </div>
          );
        })}
      </Box>

      <Button variant="outlined" href="/projects">
        Ver mais resultados
      </Button>
    </Box>
  );
};

export default SearchBar;
