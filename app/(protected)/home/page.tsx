'use client'
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import ContributionGraph from './_components/ContributionGraph';
import { Achievements } from './_components/Achievements';
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
      await fetch('/api/updateLeaderboard'); // triggers update
    };
    updateLeaderboard();
  }, [isSignedIn, user]);

  if (loading) {
    return <div className="text-center text-gray-800 h-screen w-full">Loading GitHub profile and stats...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 h-screen w-full">Error: {error}</div>;
  }

  if (!githubData) {
    return <div className="text-center text-gray-600 h-screen w-full">No GitHub data available. Please ensure your GitHub account is linked. Please connect you github account through profile section</div>;
  }

  return (
    <div className="p-6 ">

      {/* heading */}
      <div className='flex items-center'>
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

          <div className="mt-4 mb-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4  shadow-sm">
            <p className="text-gray-700">Total Commits:</p>
            <p className="text-2xl font-semibold text-blue-600">{githubData.totalCommits}</p>
          </div>
          <div className="bg-white p-4  shadow-sm">
            <p className="text-gray-700">Total Pull Requests:</p>
            <p className="text-2xl font-semibold text-green-600">{githubData.totalPullRequests}</p>
          </div>
          <div className="bg-white p-4  shadow-sm">
            <p className="text-gray-700">Total Issues Opened:</p>
            <p className="text-2xl font-semibold text-red-600">{githubData.totalIssues}</p>
          </div>
        </div>
      </div>

   <div className="flex space-x-4 mb-6">
  {/* Contribution Line Chart */}
  {githubData.contributions && githubData.contributions.length > 0 && (
    <div className="flex-grow w-1/2">
      <div className="bg-white border shadow-md p-4 flex flex-col h-[400px]"> {/* Fixed height */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">Monthly Contributions (Last 12 Months)</h2>
        <div className="flex-grow h-full"> {/* Ensure chart uses full container height */}
          <LineChart contributions={githubData.contributions} />
        </div>
      </div>
    </div>
  )}

  {/* Language Chart */}
  {githubData.languageCounts && Object.keys(githubData.languageCounts).length > 0 && (
    <div className="flex-shrink-0 w-1/2">
      <div className="bg-white border shadow-md p-4 flex flex-col h-[400px]"> {/* Same fixed height */}
        <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Top Languages</h2>
        <div className="flex-grow h-full"> {/* Ensure chart uses full container height */}
          <LanguageChart languageCounts={githubData.languageCounts} />
        </div>
      </div>
    </div>
  )}
</div>


      {githubData.contributions && githubData.contributions.length > 0 && (
        <ContributionGraph contributions={githubData.contributions} totalCommits={githubData.totalCommits} />
      )}

      {/* {(githubData.totalCommits || githubData.totalPullRequests || githubData.totalIssues || githubData.totalStars) ? (
        <Achievements 
          totalCommits={githubData.totalCommits}
          totalPullRequests={githubData.totalPullRequests}
          totalIssues={githubData.totalIssues}
          totalStars={githubData.totalStars || 0} 
        />
      ) : null} */}

      {githubData.topLanguages && githubData.topLanguages.length > 0 && (
        <RecommendedIssues topLanguages={githubData.topLanguages} />
      )}

    </div>
  );
}


