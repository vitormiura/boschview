import { Box } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Project } from "../common/types";

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
    const logoExists = true;
    if (logoExists) {
      return (
        <Image
          width={50}
          height={50}
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nixos/nixos-original.svg"
        />
      );
    }

    return <p>{tech}</p>;
  };
  return (
    <Box sx={{ backgroundColor: "white", padding: "1rem" }}>{renderLogo()}</Box>
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
