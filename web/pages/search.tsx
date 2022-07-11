import type { NextPage } from "next";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import bookData from "../src/data.json"; // Should fetch from api instead, react query is interesting
import ProjectCard from "../components/ProjectCard";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { Project } from "../common/types";

const Search: NextPage = () => {
  const [data, setData] = useState<Project[]>([]);

  const [filteredData, setFilteredData] = useState(data);

  const [searchFilter, setSearchFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    setData(bookData);
    setFilteredData(bookData);
  }, []);

  const filterData = () => {
    console.log(countryFilter);
    const newData = data
      .filter((x: Project) =>
        x.title
          .toLowerCase()
          .includes(
            searchFilter == ""
              ? x.title.toLowerCase()
              : searchFilter.toLowerCase()
          )
      )
      .filter(
        (y: Project) =>
          y.country == (countryFilter == undefined ? y.country : countryFilter)
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
    <div>
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
        <Box sx={{ display: "flex", width: 768, gap: 2 }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={uniq(data.map((value) => value.country))}
            renderInput={(params) => <TextField {...params} label="country" />}
            onChange={(e: any, newValue: any) => setCountryFilter(newValue)}
            sx={{ width: "100%" }}
          />
        </Box>

        <TextField
          label="Something"
          variant="outlined"
          onChange={(e: any) => setSearchFilter(e.target.value)}
          sx={{ width: 768 }}
        />

        <Button variant="contained" onClick={filterData}>
          Search
        </Button>

        <Box
          sx={{
            backgroundColor: "lightblue",
            width: 768,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <p>{filteredData.length} items found</p>
          {filteredData.map((value, index) => {
            return <ProjectCard key={index} project={value} />;
          })}
        </Box>
      </Box>
    </div>
  );
};

export default Search;
