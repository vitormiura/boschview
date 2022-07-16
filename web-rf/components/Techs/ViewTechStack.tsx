import { Avatar, Chip } from "@mui/material";
import deviconsList from "../../assets/deviconsList.json";

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

  if (stack == undefined) return <></>;
  return (
    <div>
      {stack.split(";").map((tech, index) => (
        <Chip key={index} label={tech} avatar={renderLogo(tech)} />
      ))}
    </div>
  );
}
