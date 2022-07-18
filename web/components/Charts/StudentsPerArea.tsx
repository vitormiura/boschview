import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Project } from "../../common/types";

export default function StudentsPerArea({
  allProjects,
}: {
  allProjects: Project[];
}) {
  const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
  const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
  const uniqueArray = (array: string[]) => Array.from(new Set(array));
  return (
    <Bar
      options={{ responsive: true, maintainAspectRatio: false }}
      data={{
        labels: uniqueArray(allProjects.map((project) => project.area)),
        datasets: [
          {
            label: "Students per area",

            data: uniqueArray(allProjects.map((project) => project.area)).map(
              (area) => {
                const studentsByArea = allProjects.filter(
                  (project) => project.area == area
                );
                return studentsByArea
                  .map(
                    (uniqueProject) => uniqueProject.students.split(";").length
                  )
                  .reduce((a, b) => a + b);
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
