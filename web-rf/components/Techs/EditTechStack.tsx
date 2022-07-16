import { Avatar, Box, Button, Chip, Modal, TextField } from "@mui/material";
import { useState } from "react";
import deviconsList from "../../assets/deviconsList.json";

export default function EditTechStack({
  stack,
  addTech,
  deleteTech,
}: {
  stack: string;
  addTech: (tech: string) => void;
  deleteTech: (tech: string) => void;
}) {
  // stack = "python;nextjs;react;fastapi";
  const [openModal, setOpenModal] = useState(false);
  const [otherTechName, setOtherTechName] = useState("");

  function renderLogo(tech: string) {
    const logoExistsOnFile = deviconsList
      .map((devicon) => devicon.name)
      .includes(tech);
    if (logoExistsOnFile) {
      return (
        <Avatar
          src={deviconsList.find((devicon) => devicon.name == tech)?.svg}
        />
      );
    }
  }

  const AddButton = () => {
    return <Chip label={"+"} onClick={() => setOpenModal(true)} />;
  };

  if (stack == undefined) return <></>;
  const renderStack = () => {
    if (stack != "") {
      return (
        <div>
          {stack.split(";").map((tech, index) => (
            <Chip
              key={index}
              label={tech}
              avatar={renderLogo(tech)}
              onDelete={() => deleteTech(tech)}
            />
          ))}
          <AddButton />
        </div>
      );
    } else return <AddButton />;
  };
  return (
    <div>
      {renderStack()}
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
            width: 400,
            height: 230,
            bgcolor: "background.paper",
            border: "none",
            outline: "none",
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            gap: 2,
            p: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              p: 1,
              gap: 1,
              overflowX: "scroll",
            }}
          >
            {deviconsList.map((devicon, index) => (
              <Chip
                key={index}
                label={devicon.name}
                avatar={renderLogo(devicon.name)}
                onClick={() => {
                  addTech(devicon.name);
                  setOpenModal(false);
                }}
              />
            ))}
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              onChange={(e: any) => setOtherTechName(e.target.value)}
              fullWidth
              multiline
              rows={1}
              variant="outlined"
              label="Other"
              size="small"
            />
            <Button
              onClick={() => {
                addTech(otherTechName);
                setOpenModal(false);
              }}
              variant="contained"
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
