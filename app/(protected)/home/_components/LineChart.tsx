
// 'use client'

// import React from 'react';
// import Chart from 'react-apexcharts';
// import { COLOR_2 } from '@/lib/constants/chart.constant';

// interface LineChartProps {
//   contributions: { date: string; count: number }[];
// }

// const processDataForChart = (contributions: { date: string; count: number }[]) => {
//   const monthlyData: { [key: string]: number } = {};

//   // Initialize the last 12 months with 0 contributions
//   const today = new Date();
//   for (let i = 11; i >= 0; i--) {
//     const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
//     const monthKey = d.toLocaleString('default', { month: 'short' });
//     monthlyData[monthKey] = 0;
//   }

//   contributions.forEach(c => {
//     const date = new Date(c.date);
//     const monthKey = date.toLocaleString('default', { month: 'short' });
//     if (monthlyData.hasOwnProperty(monthKey)) {
//         monthlyData[monthKey] += c.count;
//     }
//   });

//   return {
//     categories: Object.keys(monthlyData),
//     series: [
//       {
//         name: 'Contributions',
//         data: Object.values(monthlyData),
//       },
//     ],
//   };
// };

// const BasicLine = ({ contributions }: LineChartProps) => {
//     const chartData = processDataForChart(contributions);

//     return (
//         <Chart
//         height={300}
//             options={{
//                 chart: {
//                     type: 'line',
//                     zoom: {
//                         enabled: false,
//                     },
//                 },
//                 dataLabels: {
//                     enabled: false,
//                 },
//                 stroke: {
//                     curve: 'smooth',
//                     width: 3,
//                 },
//                 colors: [COLOR_2],
//                 xaxis: {
//                     categories: chartData.categories,
//                 },
//             }}
//             series={chartData.series}
//         />
//     )
// }

// export default BasicLine












'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { COLOR_2 } from '@/lib/constants/chart.constant';

interface LineChartProps {
  contributions: { date: string; count: number }[];
}

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const processDataForChart = (contributions: { date: string; count: number }[]) => {
  const monthlyData: { [key: string]: number } = {};

  const today = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthKey = d.toLocaleString('default', { month: 'short' });
    monthlyData[monthKey] = 0;
  }

  contributions.forEach(c => {
    const date = new Date(c.date);
    const monthKey = date.toLocaleString('default', { month: 'short' });
    if (monthlyData.hasOwnProperty(monthKey)) {
      monthlyData[monthKey] += c.count;
    }
  });

  return {
    categories: Object.keys(monthlyData),
    series: [
      {
        name: 'Contributions',
        data: Object.values(monthlyData),
      },
    ],
  };
};

const BasicLine = ({ contributions }: LineChartProps) => {
  const chartData = processDataForChart(contributions);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[320px]">
        <Chart
          options={{
            chart: {
              type: 'line',
              zoom: { enabled: false },
              toolbar: { show: false },
            },
            responsive: [
              {
                breakpoint: 768,
                options: {
                  chart: { width: '100%' },
                },
              },
            ],
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 3 },
            colors: [COLOR_2],
            xaxis: { categories: chartData.categories },
          }}
          series={chartData.series}
          type="line"
          height={300}
          width="100%"
        />
      </div>
    </div>
  );
};

export default BasicLine;
