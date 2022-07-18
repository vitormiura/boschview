import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Project } from "../../common/types";

export default function ProjectStatusPerArea({
  allProjects,
}: {
  allProjects: Project[];
}) {
  const uniqueArray = (array: string[]) => Array.from(new Set(array));
  return (
    <Bar
      options={{
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          legend: {
            position: "right" as const,
          },
          title: {
            display: true,
            text: "Project Status per Area",
          },
        },
      }}
      data={{
        labels: uniqueArray(allProjects.map((project) => project.area)),
        datasets: [
          {
            label: "In Progress",
            data: uniqueArray(allProjects.map((project) => project.area)).map(
              (area) => {
                const projectsByStatus = allProjects.filter(
                  (project) => project.area == area
                );
                return projectsByStatus.filter(
                  (uniqueProject) => uniqueProject.status == "In Progress"
                ).length;
              }
            ),
            backgroundColor: ["#fcea47"],
          },
          {
            label: "Done",
            data: uniqueArray(allProjects.map((project) => project.area)).map(
              (area) => {
                const projectsByStatus = allProjects.filter(
                  (project) => project.area == area
                );
                return projectsByStatus.filter(
                  (uniqueProject) => uniqueProject.status == "Done"
                ).length;
              }
            ),
            backgroundColor: ["#7df562"],
          },
          {
            label: "Implemented",
            data: uniqueArray(allProjects.map((project) => project.area)).map(
              (area) => {
                const projectsByStatus = allProjects.filter(
                  (project) => project.area == area
                );
                return projectsByStatus.filter(
                  (uniqueProject) => uniqueProject.status == "Implemented"
                ).length;
              }
            ),
            backgroundColor: ["#478cfc"],
          },
        ],
      }}
    />
  );
}
