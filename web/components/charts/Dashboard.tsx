import type { NextPage } from 'next';
import { Project } from '../../common/types';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';
ChartJS.register([
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
]);

interface DashboardProps {
  projects: Project[];
}

const Dashboard: NextPage<DashboardProps> = ({ projects }) => {
  console.log(projects);
  return (
    <div>
      <p>Barchart</p>
      <Bar
        options={{ responsive: true }}
        data={{
          labels: projects.map((project) => project.area),
          datasets: [
            {
              label: 'Students per area',
              data: projects.map((project) => project.students.split(';').length),
            },
          ],
        }}
      />
    </div>
  );
};

export default Dashboard;
