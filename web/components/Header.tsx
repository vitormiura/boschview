import { Box, Button, InputAdornment, Modal, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Notificate } from "../common/types";
import ModalSearch from "./ModalSearch";
import styles from "../styles/components/Header.module.scss";

export default function Header({
  notificate,
}: {
  notificate: Notificate["notificate"];
}) {
  const [openModal, setOpenModal] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
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

  const updateDimensions = () => {
    if (window.innerWidth > 900) {
      setPlaceholder("Ctrl Q to Quick Search");
    } else {
      setPlaceholder("");
    }
  };
  useEffect(() => {
    if (window.innerWidth > 900) {
      setPlaceholder("Ctrl Q to Quick Search");
    }
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <Box>
      <BoschLine />
      <Box className={styles.header}>
        {/* START */}
        <Box className={styles.start} onClick={() => router.push("/")}>
          <img className={styles.logo} src="logo_bosch.png" />
        </Box>

        {/* END */}
        <Box className={styles.end}>
          <TextField
            className={styles.searchBar}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img width={20} src="icon-pesquisa.svg" />
                </InputAdornment>
              ),
            }}
            disabled
            placeholder={placeholder}
            variant="outlined"
            onClick={() => setOpenModal(true)}
          />

          <Box className={styles.add} onClick={() => router.push("/login")}>
            <img height={"100%"} src="/icon-saida.svg" />
          </Box>

          <Button
            className={styles.add}
            variant="contained"
            size="small"
            onClick={() => router.push("/projects/create")}
          >
            <p style={{ fontSize: "40px" }}>+</p>
          </Button>

          <ModalSearch
            notificate={notificate}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </Box>
      </Box>
    </Box>
  );
}

function BoschLine() {
  return (
    <Box style={{ width: "100%", height: "0.5rem", display: "flex" }}>
      <img
        style={{ objectFit: "cover", width: "100%" }}
        src="Bosch-Supergraphic.svg"
      />
    </Box>
  );
}
