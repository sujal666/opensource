"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Contribution {
  date: string;
  count: number;
}

interface ContributionGraphProps {
  contributions: Contribution[];
  totalCommits: number;
}

const getIntensityColor = (count: number) => {
  if (count === 0) return "bg-gray-800";
  if (count < 5) return "bg-green-800";
  if (count < 10) return "bg-green-600";
  if (count < 20) return "bg-green-400";
  return "bg-green-200";
};

const ContributionGraph: React.FC<ContributionGraphProps> = ({
  contributions, totalCommits
}) => {
  const today = new Date();
  const oneYearAgo = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  );

  const dateMap = new Map<string, number>();
  contributions.forEach((c) => dateMap.set(c.date, c.count));

  const graphData: { date: string; count: number }[] = [];
  let totalActiveDays = 0;
  let maxStreak = 0;
  let currentStreak = 0;

  for (let i = 0; i < 365; i++) {
    const date = new Date(oneYearAgo);
    date.setDate(oneYearAgo.getDate() + i);
    const dateString = date.toISOString().split("T")[0];
    const count = dateMap.get(dateString) || 0;
    graphData.push({ date: dateString, count });

    if (count > 0) {
      // totalSubmissions += count; // Removed as it's now passed as prop
      totalActiveDays++;
      currentStreak++;
    } else {
      maxStreak = Math.max(maxStreak, currentStreak);
      currentStreak = 0;
    }
  }
  maxStreak = Math.max(maxStreak, currentStreak);

  const weeks: { date: string; count: number; month: string }[][] = [];
  for (let i = 0; i < graphData.length; i += 7) {
    const week = graphData.slice(i, i + 7).map((day) => {
      const date = new Date(day.date);
      return { ...day, month: date.toLocaleString("default", { month: "short" }) };
    });
    weeks.push(week);
  }

  const monthLabels = [
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
  ];

  return (
    <div className="bg-gray-900 text-white p-4 sm:p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {totalCommits} submissions in the past one year
        </h2>
        <div className="flex items-center text-sm text-gray-400">
          <span>Total active days: {totalActiveDays}</span>
          <span className="mx-4">Max streak: {maxStreak}</span>
       
        </div>
      </div>

      <div className="flex overflow-x-auto pb-4">
        <div className="flex flex-col">
          <div className="flex">
            {/* {weeks.map((week, weekIdx) => {
              const firstDayOfMonth = week[0]?.month;
              const previousWeek = weeks[weekIdx - 1];
              const lastDayOfPreviousMonth = previousWeek?.[6]?.month;
              const monthChanged = firstDayOfMonth !== lastDayOfPreviousMonth;

              return (
                <div
                  key={weekIdx}
                  className={`flex flex-col gap-1 mx-0.5 ${
                    monthChanged ? "ml-4" : ""
                  }`}
                >
                  {week.map((day) => (
                    <TooltipProvider key={day.date}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`w-4 h-4 rounded-sm ${getIntensityColor(
                              day.count
                            )}`}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>
                            {day.count} contributions on{" "}
                            {new Date(day.date).toLocaleDateString()}
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              );
            })} */}
{weeks.map((week, weekIdx) => {
  // Check if this week contains the 1st of any month
  const containsFirstOfMonth = week.some((day) => {
    const dateObj = new Date(day.date);
    return dateObj.getDate() === 1;
  });

  return (
    <div
      key={weekIdx}
      className={`flex flex-col gap-1 mx-0.5 ${
        containsFirstOfMonth ? "ml-4" : ""
      }`}
    >
      {week.map((day) => (
        <TooltipProvider key={day.date}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={`w-4 h-4 rounded-sm ${getIntensityColor(
                  day.count
                )}`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <span>
                {day.count} contributions on{" "}
                {new Date(day.date).toLocaleDateString()}
              </span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
})}


          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            {monthLabels.map((month, i) => (
              <span key={i}>{month}</span>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ContributionGraph;