import { Box, TextField } from "@mui/material";
import type { NextPage } from "next";

interface CreateEditProjectProps {
  isEdit: false | { project_id: string };
}

const CreateEditProject: NextPage<CreateEditProjectProps> = ({ isEdit }) => {
  const editOrCreate = () => {
    if (isEdit) {
      return (
        <div>
          <p>id: {isEdit.project_id}</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>Create new project</p>
        </div>
      );
    }
  };
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          width: "80%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 2fr",
          gridTemplateRows: "1fr 1fr 3fr 2fr",
          gap: 2,
        }}
      >
        <TextField variant="outlined" label="Name" />
        <TextField variant="outlined" label="Course" />
        <TextField variant="outlined" label="Start date" />
        <TextField variant="outlined" label="Contact" />
        <TextField variant="outlined" label="Area" />
        <Box sx={{ gridRow: "span 2", backgroundColor: "red" }}>Imagem</Box>
        <TextField
          variant="outlined"
          label="Description"
          sx={{ gridColumn: "span 2" }}
          multiline
          rows={6}
        />
        <TextField
          variant="outlined"
          label="Team"
          sx={{ gridColumn: "span 2" }}
          multiline
          rows={4}
        />
        {/* TECH STACK */}
        <Box>Tech</Box>

        {editOrCreate()}
      </Box>
    </Box>
  );
};

export default CreateEditProject;
