import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Box from "@mui/material/Box";
import SearchModal from "./SearchModal";

const HeaderComponent: NextPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  console.log(router.pathname);

  const routerHeaderRender = () => {
    switch (router.pathname) {
      case "/projects":
        return (
          <Box
            sx={{
              gridColumn: "span 2",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h1>Search</h1>
            </Box>
            <Box></Box>
          </Box>
        );
        break;
      default:
        return (
          <Box
            sx={{
              gridColumn: "span 2",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>Dashboard</h1>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <SearchModal />
            </Box>
          </Box>
        );
        break;
    }
  };

  return (
    <header>
      <nav
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          height: 80,
          alignItems: "center",
          backgroundColor: "gray",
          padding: "0 10%",
        }}
      >
        {/* COMPANY LOGO */}
        <Box sx={{ display: "flex" }}>
          <h1>Apeview</h1>
        </Box>
        {routerHeaderRender()}
      </nav>
    </header>
  );
};

export default HeaderComponent;
