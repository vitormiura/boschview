import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Notificate, Project } from "../common/types";
import ProjectCard from "./Projects/ProjectCard";
import styles from "../styles/components/ModalSearch.module.scss";

export default function ModalSearch({
  openModal,
  setOpenModal,
  notificate,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  notificate: Notificate["notificate"];
}) {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState<Project[]>([]);
  const [searchFilter, setSearchFilter] = useState("");

  const [allProjects, setAllProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`);
        setAllProjects(response.data);
        setFilteredData(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        notificate(`Error: ${err.message}`, "error");
        setAllProjects(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [notificate, openModal]);

  function filterData(searchFilter: string) {
    if (allProjects == undefined) return;
    setFilteredData(
      allProjects.filter((x: Project) =>
        x.project_name
          .toLowerCase()
          .includes(
            searchFilter === "" || searchFilter == undefined
              ? x.project_name.toLowerCase()
              : searchFilter.toLowerCase()
          )
      )
    );
  }

  if (error) return <div>Error</div>;
  if (loading || allProjects == undefined) return <CircularProgress />;

  return (
    <Modal
      open={openModal}
      onClose={() => {
        setSearchFilter("");
        setOpenModal(false);
      }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: 700,
          height: "90%",
          bgcolor: "background.paper",
          border: "none",
          outline: "none",
          boxShadow: 24,
          p: 6,
        }}
      >
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img width={30} src="/icon-pesquisa.svg" />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          value={searchFilter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchFilter(e.target.value);
            filterData(e.target.value);
          }}
          placeholder="Quick Search"
        />
        <Box className={styles.cardsGrid}>
          {filteredData.map((project, index) => (
            <ProjectCard
              onClick={() => setOpenModal(false)}
              size="small"
              key={index}
              project={project}
            />
          ))}
        </Box>
        <Button
          variant="outlined"
          onClick={() => {
            setOpenModal(false);
            router.push(`/projects?s=${searchFilter}`);
          }}
        >
          See more results
        </Button>
      </Box>
    </Modal>
  );
}
