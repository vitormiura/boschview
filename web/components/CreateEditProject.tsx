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
    <div>
      <p>CreateEdit</p>
      {editOrCreate()}
    </div>
  );
};

export default CreateEditProject;
