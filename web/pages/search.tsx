import type { NextPage } from "next";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Data from "../src/data.json";

const Search: NextPage = () => {
  const [search, setSearch] = useState([]);

  useEffect(() => {
    setSearch(Data);
  }, []);

  const handleChange = (event: any) => {
    const newFilter = Data.filter((value) => {
      return value.title
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setSearch(newFilter);
    // setSearch(event.target.value);
  };

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
        }}
      >
        <TextField
          label="Something"
          variant="outlined"
          onChange={handleChange}
        />
        <div>
          {search.map((value) => {
            return <p>{value.title}</p>;
          })}
        </div>
      </Box>
    </div>
  );
};

export default Search;
