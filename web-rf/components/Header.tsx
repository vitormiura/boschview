import { Box, Button, InputAdornment, Modal, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import ModalSearch from "./ModalSearch";

export default function Header() {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  return (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <Box onClick={() => router.push("/")}>
        <p>Header?</p>
      </Box>
      <TextField
        InputProps={{
          startAdornment: <InputAdornment position="start">🔎</InputAdornment>,
        }}
        variant="outlined"
        placeholder="Ctrl K to Quick Search"
        onClick={() => setOpenModal(true)}
      />
      <ModalSearch openModal={openModal} setOpenModal={setOpenModal} />
      <Button
        variant="contained"
        size="small"
        onClick={() => router.push("/projects/create")}
      >
        Create new project
      </Button>
    </Box>
  );
}
