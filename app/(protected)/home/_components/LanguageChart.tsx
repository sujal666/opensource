'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5 } from '@/lib/constants/chart.constant';

interface LanguageChartProps {
  languageCounts: { [key: string]: number };
}

// ✅ Dynamically import react-apexcharts with SSR disabled
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SimpleDonut = ({ languageCounts }: LanguageChartProps) => {
  const languages = Object.keys(languageCounts);
  const seriesData = Object.values(languageCounts);

  const chartOptions = {
    labels: languages,
    colors: [COLOR_1, COLOR_2, COLOR_3, COLOR_4, COLOR_5],
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            width: '100%',
          },
          legend: {
            position: 'bottom',
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            width: '100%',
          },
          legend: {
            position: 'bottom',
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%',
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    legend: {
      position: 'right',
      offsetY: 0,
      height: 230,
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opts: any) {
        return opts.w.config.series[opts.seriesIndex];
      },
      dropShadow: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
              label: 'Repos',
              formatter: function (w: any) {
                return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
              },
            },
          },
        },
      },
    },
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[320px]">
        <Chart
          //@ts-ignore
          options={chartOptions}
          series={seriesData}
          type="donut"
          height={300}
          width="100%"
        />
      </div>
    </div>
  );
};

export default SimpleDonut;
