'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { AwardIcon, GitPullRequestArrow, BugPlay, BookText, Star } from 'lucide-react';

interface AchievementProps {
  title: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
}

const AchievementCard: React.FC<AchievementProps> = ({ title, description, icon: Icon, unlocked }) => (
  <div className={cn(
    "p-4 rounded-lg shadow-sm flex items-center space-x-4",
    unlocked ? "bg-green-50 border border-green-200" : "bg-gray-100 border border-gray-200 opacity-60"
  )}>
    <div className={cn(
      "p-3 rounded-full",
      unlocked ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-500"
    )}>
      <Icon size={24} />
    </div>
    <div>
      <h3 className={cn("font-semibold", unlocked ? "text-gray-900" : "text-gray-600")}>{title}</h3>
      <p className={cn("text-sm", unlocked ? "text-gray-700" : "text-gray-500")}>{description}</p>
    </div>
  </div>
);

interface AchievementsProps {
  totalCommits: number;
  totalPullRequests: number;
  totalIssues: number;
  totalStars: number; // Assuming we'll fetch this later
}

export function Achievements({ totalCommits, totalPullRequests, totalIssues, totalStars }: AchievementsProps) {
  const achievementsList: AchievementProps[] = [
    {
      title: 'First Contributor',
      description: 'Made your first commit.',
      icon: AwardIcon,
      unlocked: totalCommits >= 1,
    },
    {
      title: 'Pull Request Pro',
      description: 'Opened 5 pull requests.',
      icon: GitPullRequestArrow,
      unlocked: totalPullRequests >= 5,
    },
    {
      title: 'Bug Hunter',
      description: 'Opened 3 issues.',
      icon: BugPlay,
      unlocked: totalIssues >= 3,
    },
    {
      title: 'Star Gazer',
      description: 'Starred 10 repositories.',
      icon: Star,
      unlocked: totalStars >= 10, // This will need to be passed down from page.tsx
    },
    {
      title: 'Documentation Dynamo',
      description: 'Contributed to documentation (placeholder).',
      icon: BookText,
      unlocked: false, // Placeholder, needs logic
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievementsList.map((achievement, index) => (
          <AchievementCard key={index} {...achievement} />
        ))}
      </div>
    </div>
  );
}
