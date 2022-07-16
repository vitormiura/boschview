import { Box, Button, Chip, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export default function EditTeam({
  team,
  addMember,
  deleteMember,
}: {
  team: string;
  addMember: (member: string) => void;
  deleteMember: (member: string) => void;
}) {
  const [member, setMember] = useState("");

  const AddButton = () => {
    return <Chip label={"+"} onClick={() => addMember(member)} />;
  };
  return (
    <div>
      {team.split(";").map((member, index) => (
        <Chip
          key={index}
          label={member}
          onDelete={() => deleteMember(member)}
          sx={{ height: 40 }}
        />
      ))}
      {/* <AddButton /> */}

      <TextField
        onChange={(e: any) => setMember(e.target.value)}
        rows={1}
        variant="outlined"
        size="small"
        placeholder="Insert a new member"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <AddButton />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
