import { Box, Chip } from "@mui/material";
import styles from "../../styles/components/ViewTeam.module.scss";

export default function ViewTeam({ team }: { team: string }) {
  if (team == undefined || team == "") return <></>;
  return (
    <Box className={styles.teamGrid}>
      {team.split(";").map((member, index) => (
        <Chip key={index} label={member} />
      ))}
    </Box>
  );
}
