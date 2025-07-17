'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import LeaderboardTable from './_component/LeaderboardTable';
import PodiumCard from './_component/PodiumCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserCheck, Code, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useGitHubData } from '@/context/GitHubDataContext';
import { Badge } from '@/components/ui/badge';

interface LeaderboardUser {
  userId: string;
  githubUsername: string;
  avatarUrl: string;
  totalIssues: number;
  totalPullRequests: number;
  totalContributions: number;
}

const StatCard = ({ icon, title, value, label }: { icon: React.ReactNode, title: string, value: React.ReactNode, label?: string }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {label && <p className="text-xs text-muted-foreground">{label}</p>}
    </CardContent>
  </Card>
);

const colors = [
  'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900',
  'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-900',
  'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:hover:bg-yellow-900',
  'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900',
  'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-900',
  'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:hover:bg-purple-900',
  'bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900/50 dark:text-pink-300 dark:hover:bg-pink-900',
  'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
];

export default function LeaderboardPage() {
  const { user, isSignedIn } = useUser();
  const { githubData, loading: githubLoading } = useGitHubData();
  const [filter, setFilter] = useState('all');
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [podiumUsers, setPodiumUsers] = useState<LeaderboardUser[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);
  const [currentUserData, setCurrentUserData] = useState<LeaderboardUser | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const updateAndFetchLeaderboard = async () => {
      if (isSignedIn) {
        await fetch('/api/updateLeaderboard');
      }

      try {
        const res = await fetch(`/api/leaderboard?filter=${filter}`);
        const result = await res.json();
        setUsers(result.data || []);

        if (Array.isArray(result.data)) {
          //@ts-ignore
          const sortedUsers = result.data.sort((a, b) => b.totalContributions - a.totalContributions);
          setUsers(sortedUsers);
          setPodiumUsers(sortedUsers.slice(0, 3));

          if (user) {
            //@ts-ignore
            const index = sortedUsers.findIndex(u => u.userId === user.id);
            if (index !== -1) {
              setCurrentUserRank(index + 1);
              setCurrentUserData(sortedUsers[index]);
            } else {
              setCurrentUserRank(null);
              setCurrentUserData(null);
            }
          }
        } else {
          setUsers([]);
          setPodiumUsers([]);
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
        setUsers([]);
        setPodiumUsers([]);
      }
    };

    updateAndFetchLeaderboard();
  }, [filter, isSignedIn, user]);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setTotalUsers(data.totalUsers);
      } catch (error) {
        console.error('Failed to fetch total users:', error);
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold">Leaderboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {githubLoading ? (
          <Card className="flex items-center justify-center p-6">
            <Loader2 className="h-6 w-6 animate-spin" />
          </Card>
        ) : currentUserData ? (
          <Card>
            <CardHeader>
              <CardTitle>Your Rank</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
              <Image src={currentUserData.avatarUrl} alt={currentUserData.githubUsername} width={48} height={48} className="rounded-full" />
              <div>
                <p className="font-bold">{currentUserData.githubUsername}</p>
                <p className="text-sm text-muted-foreground">Rank: {currentUserRank ? `#${currentUserRank}` : 'N/A'}</p>
              </div>
              <div className="text-right flex-grow">
                <p className="text-sm text-muted-foreground">Contributions</p>
                <p className="text-lg font-bold">{currentUserData.totalContributions}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <StatCard
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            title="Your Rank"
            value={'N/A'}
            label="Based on all-time contributions"
          />
        )}

        <StatCard
          icon={<UserCheck className="h-4 w-4 text-muted-foreground" />}
          title="Total Participants"
          value={totalUsers}
          label="Across all registered users"
        />

        {githubLoading ? (
          <Card className="flex items-center justify-center p-6">
            <Loader2 className="h-6 w-6 animate-spin" />
          </Card>
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Your Top Languages</CardTitle>
              <Code className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {githubData?.topLanguages?.map((lang: string, index: number) => (
                  <Badge
                    key={lang}
                    variant="outline"
                    className={`px-2 py-1 text-xs font-semibold transition-colors border-0 ${colors[index % colors.length]}`}
                  >
                    {lang}
                  </Badge>
                )) || <p className="text-sm text-muted-foreground">N/A</p>}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Podium Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {podiumUsers.map((podiumUser, index) => (
          <PodiumCard key={podiumUser.userId} user={podiumUser} rank={index + 1} />
        ))}
      </div>

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>Global Ranking</CardTitle>
            <div className="flex flex-wrap gap-2">
              {['all', 'monthly', 'weekly'].map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? 'default' : 'outline'}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <LeaderboardTable filter={filter} />
        </CardContent>
      </Card>
    </div>
  );
}
