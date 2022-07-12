import type { NextPage } from "next";
import { useState } from "react";
import Box from "@mui/material/Box";
import SearchBar from "./SearchBar";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";

const SearchModal: NextPage = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box>
      <Box
        onClick={() => setOpenModal(true)}
        sx={{
          cursor: "pointer",
          padding: 2,
        }}
      >
        🎁
      </Box>
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
    </Box>
  );
};

export default SearchModal;
