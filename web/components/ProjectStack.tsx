import { Box } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Project } from "../common/types";
import Techs from "../src/techs.json";

interface Props {
  stack: string[];
}

interface TechProps {
  tech: string;
}

const Tech: NextPage<TechProps> = ({ tech }) => {
  // apply some conditional rendering
  const renderLogo = () => {
    // if logo exists in json render logo

    const logoExists = Techs.map((value) => value.name).includes(tech);
    if (logoExists) {
      let techIcon = "";
      Techs.map((value) => {
        if (value.name == tech) {
          techIcon = value.svg;
          return;
        }
      });
      return <Image width={50} height={50} src={techIcon} />;
    }

    return <h2>{tech}</h2>;
  };
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 100,
      }}
    >
      {renderLogo()}
    </Box>
  );
};

const ProjectStack: NextPage<Props> = ({ stack }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
      }}
    >
      {stack.map((tech, index) => (
        <Tech key={index} tech={tech} />
      ))}
    </Box>
  );
};

export default ProjectStack;
