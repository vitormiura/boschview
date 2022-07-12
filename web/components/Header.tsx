import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Box from "@mui/material/Box";
import SearchModal from "./SearchModal";
import Link from "next/link";

const HeaderComponent: NextPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  console.log(router.pathname);

  const routerHeaderRender = () => {
    switch (router.pathname) {
      case "/projects":
        return (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h1>Search Projects</h1>
            </Box>
          </Box>
        );
        break;
      case "/projects/[id]":
        return (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h1>Project</h1>
            </Box>
            <Box></Box>
          </Box>
        );
        break;
      default:
        return (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>Dashboard</h1>
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
        <Link href={"/"}>
          <Box
            sx={{
              display: "flex",
              cursor: "pointer",
              ":hover": { color: "white" },
            }}
          >
            <h1>Apeview</h1>
          </Box>
        </Link>
        {routerHeaderRender()}
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <SearchModal />
        </Box>
      </nav>
    </header>
  );
};

export default HeaderComponent;
