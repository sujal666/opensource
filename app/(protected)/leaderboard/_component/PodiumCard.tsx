
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Trophy, Medal, Crown } from 'lucide-react';

interface PodiumCardProps {
  user: {
    avatarUrl: string;
    githubUsername: string;
    totalContributions: number;
    totalIssues: number;
    totalPullRequests: number;
  };
  rank: number;
}

const PodiumCard = ({ user, rank }: PodiumCardProps) => {
  const rankIcons = {
    1: <Trophy className="w-8 h-8 text-yellow-500" />,
    2: <Medal className="w-8 h-8 text-gray-400" />,
    3: <Crown className="w-8 h-8 text-yellow-700" />,
  };

  return (
    <Card className={`relative overflow-hidden shadow-lg transition-transform hover:scale-105 bg-card`}>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Image src={user.avatarUrl} alt={user.githubUsername} width={48} height={48} className="rounded-full" />
          <div>
            <p className="font-bold text-lg">{user.githubUsername}</p>
            <p className="text-sm text-muted-foreground">@{user.githubUsername.toLowerCase()}</p>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          {(rankIcons as any)[rank]}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Contributions</p>
            <p className="text-xl font-bold">{user.totalContributions}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Issues</p>
            <p className="text-xl font-bold">{user.totalIssues}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Pull Requests</p>
            <p className="text-xl font-bold">{user.totalPullRequests}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PodiumCard;
