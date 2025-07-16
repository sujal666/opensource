
'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

interface ContributionLineChartProps {
  contributions: { date: string; count: number }[];
}

const processDataForChart = (contributions: { date: string; count: number }[]) => {
  const monthlyData: { [key: string]: number } = {};

  // Initialize the last 12 months with 0 contributions
  const today = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthKey = d.toISOString().slice(0, 7); // YYYY-MM
    monthlyData[monthKey] = 0;
  }

  contributions.forEach(c => {
    const date = new Date(c.date);
    const monthKey = date.toISOString().slice(0, 7); // YYYY-MM
    if (monthlyData.hasOwnProperty(monthKey)) {
        monthlyData[monthKey] += c.count;
    }
  });

  return Object.keys(monthlyData).map(month => ({
    date: month,
    contributions: monthlyData[month],
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export function ContributionLineChart({ contributions }: ContributionLineChartProps) {
  const { theme } = useTheme();
  const chartData = processDataForChart(contributions);

  return (
    <div className="w-full h-full">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#ccc'} />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => new Date(date + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
            stroke={theme === 'dark' ? '#fff' : '#000'}
          />
          <YAxis stroke={theme === 'dark' ? '#fff' : '#000'} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: theme === 'dark' ? '#333' : '#fff', 
              borderColor: theme === 'dark' ? '#555' : '#ccc' 
            }} 
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="contributions" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
