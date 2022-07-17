import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Project } from "../../common/types";

export default function ProjectsPerStatus({
  allProjects,
}: {
  allProjects: Project[];
}) {
  const uniqueArray = (array: string[]) => Array.from(new Set(array));
  return (
    <Pie
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { title: { display: true, text: "Projects per Status" } },
      }}
      data={{
        labels: uniqueArray(allProjects.map((project) => project.status)),
        datasets: [
          {
            label: "Projects per status",
            data: uniqueArray(allProjects.map((project) => project.status)).map(
              (status) => {
                const projectsByArea = allProjects.filter(
                  (project) => project.status == status
                );
                return projectsByArea.length;
              }
            ),
          },
        ],
      }}
    />
  );
}
