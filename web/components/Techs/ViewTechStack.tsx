import { Avatar, Box, Chip } from "@mui/material";
import deviconsList from "../../assets/deviconsList.json";
import styles from "../../styles/components/ViewTechStack.module.scss";

export default function ViewTechStack({ stack }: { stack: string }) {
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

  if (stack == undefined || stack == "") return <></>;
  return (
    <Box className={styles.techStackGrid}>
      {stack.split(";").map((tech, index) => (
        <Chip key={index} label={tech} avatar={renderLogo(tech)} />
      ))}
    </Box>
  );
}
