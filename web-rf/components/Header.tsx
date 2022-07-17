import { Box, Button, InputAdornment, Modal, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Notificate } from "../common/types";
import ModalSearch from "./ModalSearch";

export default function Header({
  notificate,
}: {
  notificate: Notificate["notificate"];
}) {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const handleKeyPress = useCallback((e: any) => {
    if ("key" in e && e.key.toLowerCase() === "q" && e.ctrlKey) {
      setOpenModal((prevState) => !prevState);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, setOpenModal, openModal]);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <Box onClick={() => router.push("/")}>
        <h2>Bosch</h2>
      </Box>
      <TextField
        InputProps={{
          startAdornment: <InputAdornment position="start">🔎</InputAdornment>,
        }}
        disabled
        variant="outlined"
        placeholder="Open with Ctrl Q"
        onClick={() => setOpenModal(true)}
      />
      <ModalSearch
        notificate={notificate}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
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
