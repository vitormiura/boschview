import type { NextPage } from "next";
import { Notificate } from "../../common/types";
import ProjectForm from "../../components/Projects/ProjectForm";

const CreateProjectPage: NextPage<Notificate> = ({ notificate }) => {
  return <ProjectForm notificate={notificate} />;
};

export default CreateProjectPage;
