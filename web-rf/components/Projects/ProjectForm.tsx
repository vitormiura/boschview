import { StyledOptions } from "@emotion/styled";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Project } from "../../common/types";
import EditTechStack from "../Techs/EditTechStack";

interface ProjectFormProps {
  project_id?: string;
}

export default function ProjectForm({ project_id }: ProjectFormProps) {
  // project_id = "d07a3266369f4d7bb290e30204cd05ad";
  const [inputProject, setInputProject] = useState<Project>({
    project_name: "",
    students: "",
    area: "",
    course: "",
    created_date: "",
    description: "",
    techs: "",
    contact: "",
    finish_ratio: 0,
    status: "",
    project_id: "",
    image_path: "",
  });
  const [inputImage, setInputImage] = useState<any>(undefined);

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (project_id != undefined) {
      console.log("> editing existing project page");
      const getData = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/${project_id}`
          );

          setInputProject(response.data);
          setError(null);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      getData();
    }
  }, [project_id]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("submiting..");

    console.log(inputProject);
    const formData = new FormData();

    if (inputImage != undefined) {
      console.log("there exists an image");
      formData.append("data", inputImage, inputImage.name.replace("#", ""));
    } else {
      formData.append("data", "");
    }
    console.log("form data: " + formData);

    if (project_id != undefined) {
      console.log("Updating project");
      const response = axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/update`, formData, {
          params: inputProject,
        })
        .then(() => router.push("/projects"))
        .catch((err) => console.log(err));

      console.log(response);
    } else {
      console.log("Adding new project");
      const response = axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/add`, formData, {
          params: inputProject,
        })
        .then(() => router.push("/projects"))
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setInputProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileName = () => {
    if (inputImage != undefined) return <p>{inputImage.name}</p>;
    if (inputProject != undefined) return <p>{inputProject.image_path}</p>;
  };

  const renderImage = () => {
    if (inputImage != undefined)
      return <img src={URL.createObjectURL(inputImage)} />;

    return (
      <img
        src={`${process.env.NEXT_PUBLIC_API_URL}/media/${inputProject.image_path}`}
      />
    );
  };

  const addTech = (tech: string) => {
    if (inputProject.techs == "") {
      setInputProject((prevState) => ({
        ...prevState,
        ["techs"]: tech,
      }));
    } else {
      if (!inputProject.techs.split(";").includes(tech))
        setInputProject((prevState) => ({
          ...prevState,
          ["techs"]: `${inputProject.techs};${tech}`,
        }));
    }
  };

  const deleteTech = (tech: string) => {
    setInputProject((prevState) => ({
      ...prevState,
      ["techs"]: inputProject.techs
        .split(";")
        .filter((item) => item != tech)
        .join(";"),
    }));
  };

  if (project_id != undefined) {
    if (loading || inputProject == undefined) return <CircularProgress />;
    if (error) return <div>Error</div>;
  }

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
        onSubmit={handleSubmit}
      >
        <TextField
          required
          name="project_name"
          label={"Name"}
          onChange={handleChange}
          value={inputProject.project_name}
        />

        <TextField
          required
          name="course"
          label={"Course"}
          onChange={handleChange}
          value={inputProject.course}
        />
        <Box>
          <p>Finish Ratio</p>
          <Slider
            valueLabelFormat={(value: number) => `${value}%`}
            valueLabelDisplay="on"
            value={inputProject.finish_ratio}
            name="finish_ratio"
            onChange={handleChange}
            step={10}
            marks
            min={0}
            max={100}
          />
        </Box>

        <TextField
          required
          name="contact"
          label={"Contact"}
          onChange={handleChange}
          value={inputProject.contact}
        />
        <TextField
          required
          name="area"
          label={"Area"}
          onChange={handleChange}
          value={inputProject.area}
        />
        <Button variant="contained" component="label">
          Upload / file: {fileName()}
          <input
            onChange={(e: any) => {
              setInputImage(e.target.files[0]);
            }}
            id="input-file"
            hidden
            accept="image/*"
            multiple
            type="file"
          />
        </Button>

        {renderImage()}

        <FormControl sx={{ gridColumn: "span 2" }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            fullWidth
            name="status"
            labelId="status-label"
            label="Status"
            value={inputProject.status}
            onChange={handleChange}
          >
            <MenuItem value={"Done"}>Done</MenuItem>
            <MenuItem value={"In Progress"}>In Progress</MenuItem>
            <MenuItem value={"Implemented"}>Implemented</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="description"
          label={"Description"}
          onChange={handleChange}
          value={inputProject.description}
          multiline
          rows={4}
        />
        <TextField
          required
          name="students"
          label={"Team"}
          onChange={handleChange}
          value={inputProject.students}
        />

        <EditTechStack
          stack={inputProject.techs}
          addTech={addTech}
          deleteTech={deleteTech}
        />

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
