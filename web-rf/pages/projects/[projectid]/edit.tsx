import type { NextPage } from "next";
import { useRouter } from "next/router";
import ProjectForm from "../../../components/Projects/ProjectForm";

const EditProjectPage: NextPage = () => {
  const router = useRouter();
  const projectid = router.query.projectid;

  if (projectid == undefined) return <div>Project not found</div>;

  return (
    <div>
      <p>EditProjectPage</p>
      <ProjectForm project_id={projectid.toString()} />
    </div>
  );
};

export default EditProjectPage;
