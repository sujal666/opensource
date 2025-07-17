// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';

// interface LeaderboardUser {
//   userId: string;
//   githubUsername: string;
//   avatarUrl: string;
//   totalIssues: number;
//   totalPullRequests: number;
//   totalContributions: number;
//   totalScore?: number;
// }

// interface Props {
//   filter: string; // 'weekly' | 'monthly' | 'all'
// }

// export default function LeaderboardTable({ filter }: Props) {
//   const [users, setUsers] = useState<LeaderboardUser[]>([]);
//   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchLeaderboard = async () => {
// //       setLoading(true);
// //       const res = await fetch(`/api/leaderboard?filter=${filter}`);
// //       const data = await res.json();
// //       setUsers(data);
// //       setLoading(false);
// //     };
// //     fetchLeaderboard();
// //   }, [filter]);

// useEffect(() => {
//   const fetchLeaderboard = async () => {
//     setLoading(true);
//     const res = await fetch(`/api/leaderboard?filter=${filter}`);
//     const result = await res.json();
//     console.log('Leaderboard API result:', result);

//     if (Array.isArray(result.data)) {
//       setUsers(result.data);
//     } else {
//       console.error('Leaderboard API returned invalid data:', result);
//       setUsers([]);
//     }
//     setLoading(false);
//   };
//   fetchLeaderboard();
// }, [filter]);

//   const medal = (rank: number) => {
//     switch (rank) {
//       case 1: return '🥇';
//       case 2: return '🥈';
//       case 3: return '🥉';
//       default: return '';
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         users.map((user, index) => (
//           <div key={user.userId} className="flex items-center justify-between border p-4 rounded-md">
//             <div className="flex items-center space-x-4">
//               <span className="text-lg font-semibold">{index + 1}. {medal(index + 1)}</span>
//               <Image src={user.avatarUrl} alt={user.githubUsername} width={40} height={40} className="rounded-full" />
//               <span className="font-medium">{user.githubUsername}</span>
//             </div>
//             <div className="flex space-x-6">
//               <div>Contributions: {user.totalContributions}</div>
//               <div>Issues: {user.totalIssues}</div>
//               <div>PRs: {user.totalPullRequests}</div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Crown, Medal, Trophy } from 'lucide-react';

// interface LeaderboardUser {
//   userId: string;
//   githubUsername: string;
//   avatarUrl: string;
//   totalIssues: number;
//   totalPullRequests: number;
//   totalContributions: number;
//   totalScore?: number;
// }

// interface Props {
//   filter: string;
// }

// export default function LeaderboardTable({ filter }: Props) {
//   const [users, setUsers] = useState<LeaderboardUser[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`/api/leaderboard?filter=${filter}`);
//         const result = await res.json();
//         if (Array.isArray(result.data)) {
//           setUsers(result.data);
//         } else {
//           console.error('Leaderboard API returned invalid data:', result);
//           setUsers([]);
//         }
//       } catch (error) {
//         console.error('Failed to fetch leaderboard:', error);
//         setUsers([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLeaderboard();
//   }, [filter]);

//   const getMedalIcon = (rank: number) => {
//     switch (rank) {
//       case 1:
//         return <Trophy className="w-6 h-6 text-yellow-500" />;
//       case 2:
//         return <Medal className="w-6 h-6 text-gray-400" />;
//       case 3:
//         return <Crown className="w-6 h-6 text-yellow-700" />;
//       default:
//         return <span className="text-sm text-gray-500">{rank}</span>;
//     }
//   };

//   return (
//     <div className="rounded-lg border overflow-hidden">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-20 text-center">Rank</TableHead>
//             <TableHead>User</TableHead>
//             <TableHead className="text-center">Contributions</TableHead>
//             <TableHead className="text-center">Issues</TableHead>
//             <TableHead className="text-center">Pull Requests</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {loading ? (
//             Array.from({ length: 10 }).map((_, i) => (
//               <TableRow key={i}>
//                 <TableCell className="text-center"><Skeleton className="h-6 w-6 rounded-full" /></TableCell>
//                 <TableCell>
//                   <div className="flex items-center space-x-3">
//                     <Skeleton className="h-10 w-10 rounded-full" />
//                     <Skeleton className="h-4 w-32" />
//                   </div>
//                 </TableCell>
//                 <TableCell className="text-center"><Skeleton className="h-4 w-12 mx-auto" /></TableCell>
//                 <TableCell className="text-center"><Skeleton className="h-4 w-12 mx-auto" /></TableCell>
//                 <TableCell className="text-center"><Skeleton className="h-4 w-12 mx-auto" /></TableCell>
//               </TableRow>
//             ))
//           ) : users.length > 0 ? (
//             users.map((user, index) => (
//               <TableRow key={user.userId} className={index < 3 ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''}>
//                 <TableCell className="text-center font-bold text-lg">{getMedalIcon(index + 1)}</TableCell>
//                 <TableCell>
//                   <div className="flex items-center space-x-3">
//                     <Image src={user.avatarUrl} alt={user.githubUsername} width={40} height={40} className="rounded-full" />
//                     <span className="font-medium">{user.githubUsername}</span>
//                   </div>
//                 </TableCell>
//                 <TableCell className="text-center">
//                   <Badge variant="secondary">{user.totalContributions}</Badge>
//                 </TableCell>
//                 <TableCell className="text-center">
//                   <Badge variant="outline">{user.totalIssues}</Badge>
//                 </TableCell>
//                 <TableCell className="text-center">
//                   <Badge variant="outline">{user.totalPullRequests}</Badge>
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={5} className="text-center py-10">
//                 No data available for this period.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface LeaderboardUser {
  userId: string;
  githubUsername: string;
  avatarUrl: string;
  totalIssues: number;
  totalPullRequests: number;
  totalContributions: number;
}

interface Props {
  filter: string;
}

export default function LeaderboardTable({ filter }: Props) {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/leaderboard?filter=${filter}`);
        const result = await res.json();
        if (Array.isArray(result.data)) {
          setUsers(result.data);
        } else {
          console.error('Leaderboard API returned invalid data:', result);
          setUsers([]);
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [filter]);

  return (
    <div className="overflow-x-auto">
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>User</TableHead>
          <TableHead className="text-center">Contributions</TableHead>
          <TableHead className="text-center">Issues</TableHead>
          <TableHead className="text-center">Pull Requests</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-6 w-6 rounded-full" /></TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </TableCell>
              <TableCell className="text-center"><Skeleton className="h-4 w-12 mx-auto" /></TableCell>
              <TableCell className="text-center"><Skeleton className="h-4 w-12 mx-auto" /></TableCell>
              <TableCell className="text-center"><Skeleton className="h-4 w-12 mx-auto" /></TableCell>
            </TableRow>
          ))
        ) : users.length > 0 ? (
          users.map((user, index) => (
            <TableRow key={user.userId}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Image src={user.avatarUrl} alt={user.githubUsername} width={40} height={40} className="rounded-full" />
                  <div>
                    <p className="font-medium">{user.githubUsername}</p>
                    <p className="text-sm text-muted-foreground">ID: {user.userId.slice(0, 8)}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center font-medium">{user.totalContributions}</TableCell>
              <TableCell className="text-center font-medium">{user.totalIssues}</TableCell>
              <TableCell className="text-center font-medium">{user.totalPullRequests}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-10">
              No rankings to display.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    </div>
  );
}
