import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Attendance } from '../../utils/Interface';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnalyticsProps {
  attendances: Attendance[]
}

const Analytics: React.FC<AnalyticsProps> = ({ attendances }) => {
  const presentCount = attendances.filter(item => item.status === 'Present').length;
  const absentCount = attendances.filter(item => item.status === 'Absent').length;

  const barData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: 'Attendance',
        data: [presentCount, absentCount],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [presentCount, absentCount],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Attendance Analytics',
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Attendance Distribution',
      },
    },
  };

  return (
    <div className="d-flex justify-content-between">
      <div style={{ marginBottom: '2rem', width: "40%" }}>
        <Bar data={barData} options={barOptions} />
      </div>
      <div style={{ marginBottom: '2rem', width: "40%" }}>
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  )
}

export default Analytics
