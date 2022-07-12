import type { NextPage } from "next";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import styles from "../styles/Header.module.css";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import SearchBar from "./SearchBar";

const HeaderComponent: NextPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  console.log(router.pathname);
  if (router.pathname === "/projects") {
    return (
      <header className={styles.header}>
        <h1>Apeview Search</h1>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <h1>Apeview</h1>
        <Box
          onClick={() => setOpenModal(true)}
          sx={{
            backgroundColor: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          🎁
        </Box>
      </nav>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 700,
            height: 800,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 6,
          }}
        >
          <SearchBar />
          <Button variant="outlined" href="/projects">
            Ver mais resultados
          </Button>
        </Box>
      </Modal>
    </header>
  );
};

export default HeaderComponent;
