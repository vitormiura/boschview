import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Project } from "../../common/types";

export default function MostUsedTech({
  allProjects,
}: {
  allProjects: Project[];
}) {
  const uniqueArray = (array: string[]) => Array.from(new Set(array));
  const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
  const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

  const uniqueAllTechs = uniqueArray(
    allProjects.map((project) => project.techs.split(";")).flat(1)
  );

  const data = {
    labels: uniqueAllTechs,
    datasets: [
      {
        data: uniqueArray(uniqueAllTechs).map((uniqueTech) => {
          const techsByProjects = allProjects.filter((project) =>
            project.techs.split(";").includes(uniqueTech)
          ).length;
          return techsByProjects;
        }),
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
  };

  return (
    <Pie
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { title: { display: true, text: "Most used technologies" } },
      }}
      data={data}
    />
  );
}
