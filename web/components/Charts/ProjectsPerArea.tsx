import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Project } from "../../common/types";

export default function ProjectsPerArea({
  allProjects,
}: {
  allProjects: Project[];
}) {
  const uniqueArray = (array: string[]) => Array.from(new Set(array));
  const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
  const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

  return (
    <Pie
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { title: { display: true, text: "Projects per area" } },
      }}
      data={{
        labels: uniqueArray(allProjects.map((project) => project.area)),
        datasets: [
          {
            label: "Projects per area",
            data: uniqueArray(allProjects.map((project) => project.area)).map(
              (area) => {
                const projectsByArea = allProjects.filter(
                  (project) => project.area == area
                );
                return projectsByArea.length;
              }
            ),
            backgroundColor: [
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
              randomRGB(),
            ],
          },
        ],
      }}
    />
  );
}
