import { Chip } from "@mui/material";

export default function ViewTeam({ team }: { team: string }) {
  return (
    <div>
      {team.split(";").map((member, index) => (
        <Chip key={index} label={member} />
      ))}
    </div>
  );
}
