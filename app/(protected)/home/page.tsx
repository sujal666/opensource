
'use client'
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import ContributionGraph from './_components/ContributionGraph';
import { RecommendedIssues } from './_components/RecommendedIssues';
import LineChart from './_components/LineChart';
import LanguageChart from './_components/LanguageChart';
import { useGitHubData } from '@/context/GitHubDataContext';

export default function HomePage() {
  const { user, isSignedIn } = useUser();
  const { githubData, loading, error } = useGitHubData();

  useEffect(() => {
    const updateLeaderboard = async () => {
      if (!isSignedIn || !user) return;
      await fetch('/api/updateLeaderboard');
    };
    updateLeaderboard();
  }, [isSignedIn, user]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen w-full text-gray-800">Loading GitHub profile and stats...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen w-full text-red-500">Error: {error}</div>;
  }

  if (!githubData) {
    return <div className="flex items-center justify-center h-screen w-full text-gray-600 text-center p-4">No GitHub data available. Please ensure your GitHub account is linked via the profile section.</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="flex items-center mb-6">
        {githubData.avatar_url && (
          <img
            src={githubData.avatar_url}
            alt={`${githubData.login}'s avatar`}
            className="w-12 h-12 rounded-full mr-4"
          />
        )}
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome Back, {user ? (user.firstName || user.username || 'User') : 'User'}!
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 shadow-sm rounded-lg">
          <p className="text-gray-700">Total Commits:</p>
          <p className="text-2xl font-semibold text-blue-600">{githubData.totalCommits}</p>
        </div>
        <div className="bg-white p-4 shadow-sm rounded-lg">
          <p className="text-gray-700">Total Pull Requests:</p>
          <p className="text-2xl font-semibold text-green-600">{githubData.totalPullRequests}</p>
        </div>
        <div className="bg-white p-4 shadow-sm rounded-lg">
          <p className="text-gray-700">Total Issues Opened:</p>
          <p className="text-2xl font-semibold text-red-600">{githubData.totalIssues}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Line Chart */}
        {githubData.contributions && githubData.contributions.length > 0 && (
          <div className="bg-white border shadow-md p-4 rounded-lg flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Monthly Contributions (Last 12 Months)</h2>
            <div className="flex-grow">
              <LineChart contributions={githubData.contributions} />
            </div>
          </div>
        )}

        {/* Language Chart */}
        {githubData.languageCounts && Object.keys(githubData.languageCounts).length > 0 && (
          <div className="bg-white border shadow-md p-4 rounded-lg flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Top Languages</h2>
            <div className="flex-grow">
              <LanguageChart languageCounts={githubData.languageCounts} />
            </div>
          </div>
        )}
      </div>

      {/* Contribution Graph */}
      {githubData.contributions && githubData.contributions.length > 0 && (
        <div className="mb-6">
          <ContributionGraph contributions={githubData.contributions} totalCommits={githubData.totalCommits} />
        </div>
      )}

      {/* Recommended Issues */}
      {githubData.topLanguages && githubData.topLanguages.length > 0 && (
        <RecommendedIssues topLanguages={githubData.topLanguages} />
      )}
    </div>
  );
}
