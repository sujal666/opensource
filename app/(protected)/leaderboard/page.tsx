// 'use client';

// import { useEffect, useState } from 'react';
// import { useAuth } from '@clerk/nextjs';

// interface User {
//   id: string;
//   name: string;
//   imageUrl: string;
//   contributions: number;
//   issuesSolved: number;
//   rank: number;
//   score: number;
// }

// export default function LeaderboardPage() {
//   const { userId } = useAuth();
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('weekly');

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`/api/leaderboard?filter=${filter}`);
//         const data = await response.json();
//         setUsers(data);
//       } catch (error) {
//         console.error('Failed to fetch leaderboard', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaderboard();
//   }, [filter]);

//   const currentUser = users.find(user => user.id === userId);

//   return (
//     <div className="p-6 bg-gray-900 text-white min-h-screen">
//       <h1 className="text-4xl font-bold mb-6 text-center text-purple-400">Leaderboard</h1>

//       {!loading && currentUser && (
//         <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 max-w-2xl mx-auto">
//           <h2 className="text-2xl font-bold mb-4 text-center text-purple-300">Your Stats</h2>
//           <div className="flex justify-around items-center">
//             <div className="text-center">
//               <p className="text-gray-400 text-lg">Your Rank</p>
//               <p className="text-3xl font-bold text-purple-400">{currentUser.rank}</p>
//             </div>
//             <div className="text-center">
//               <p className="text-gray-400 text-lg">Contributions</p>
//               <p className="text-3xl font-bold text-green-400">{currentUser.contributions}</p>
//             </div>
//             <div className="text-center">
//               <p className="text-gray-400 text-lg">Issues Solved</p>
//               <p className="text-3xl font-bold text-red-400">{currentUser.issuesSolved}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
//         <div className="flex justify-center items-center mb-6 space-x-4">
//           <h2 className="text-2xl font-bold text-purple-300">Rankings</h2>
//           <div className="flex space-x-2 bg-gray-700 p-1 rounded-full">
//             <button onClick={() => setFilter('daily')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'daily' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-purple-700'}`}>Daily</button>
//             <button onClick={() => setFilter('weekly')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'weekly' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-purple-700'}`}>Weekly</button>
//             <button onClick={() => setFilter('monthly')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'monthly' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-purple-700'}`}>Monthly</button>
//           </div>
//         </div>

//         {loading ? (
//           <div className="text-center py-8">Loading leaderboard...</div>
//         ) : (
//           <table className="w-full text-left">
//             <thead className="bg-gray-700">
//               <tr>
//                 <th className="p-4 rounded-l-lg">Rank</th>
//                 <th>User</th>
//                 <th>Contributions</th>
//                 <th className="rounded-r-lg">Issues Solved</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/50">
//                   <td className="p-4 font-bold text-lg text-purple-400">{user.rank}</td>
//                   <td className="flex items-center py-2">
//                     <img src={user.imageUrl} alt={user.name} className="w-10 h-10 rounded-full mr-4" />
//                     <span className="font-semibold">{user.name}</span>
//                   </td>
//                   <td className="text-green-400">{user.contributions}</td>
//                   <td className="text-red-400">{user.issuesSolved}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }



// // File: app/leaderboard/page.tsx

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
// }

// export default function LeaderboardPage() {
//   const [users, setUsers] = useState<LeaderboardUser[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       setLoading(true);
//       const res = await fetch('/api/leaderboard');
//       const data = await res.json();
//       setUsers(data);
//       setLoading(false);
//     };

//     fetchLeaderboard();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="space-y-4">
//           {users.map((user, index) => (
//             <div key={user.userId} className="flex items-center justify-between border p-4 rounded-md">
//               <div className="flex items-center space-x-4">
//                 <span className="text-lg font-semibold">{index + 1}.</span>
//                 <Image src={user.avatarUrl} alt={user.githubUsername} width={40} height={40} className="rounded-full" />
//                 <span className="font-medium">{user.githubUsername}</span>
//               </div>
//               <div className="flex space-x-6">
//                 <div>Total Contributions: {user.totalContributions}</div>
//                 <div>Issues: {user.totalIssues}</div>
//                 <div>PRs: {user.totalPullRequests}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



// // File: app/leaderboard/page.tsx
// //working 
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
// }

// export default function LeaderboardPage() {
//   const [users, setUsers] = useState<LeaderboardUser[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       setLoading(true);
//       const res = await fetch(`/api/leaderboard?page=${page}&limit=10`);
//       const data = await res.json();
//       setUsers(data.data);
//       setTotalPages(data.totalPages);
//       setLoading(false);
//     };
//     fetchLeaderboard();
//   }, [page]);

//   const medal = (rank: number) => {
//     switch (rank) {
//       case 1: return '🥇';
//       case 2: return '🥈';
//       case 3: return '🥉';
//       default: return '';
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="space-y-4">
//           {users.map((user, index) => (
//             <div key={user.userId} className="flex items-center justify-between border p-4 rounded-md">
//               <div className="flex items-center space-x-4">
//                 <span className="text-lg font-semibold">{(page - 1) * 10 + index + 1}. {medal((page - 1) * 10 + index + 1)}</span>
//                 <Image src={user.avatarUrl} alt={user.githubUsername} width={40} height={40} className="rounded-full" />
//                 <span className="font-medium">{user.githubUsername}</span>
//               </div>
//               <div className="flex space-x-6">
//                 <div>Contributions: {user.totalContributions}</div>
//                 <div>Issues: {user.totalIssues}</div>
//                 <div>PRs: {user.totalPullRequests}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Pagination Controls */}
//       <div className="flex justify-between mt-4">
//         <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Previous</button>
//         <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Next</button>
//       </div>
//     </div>
//   );
// }



// 'use client';

// import { useEffect, useState } from 'react';
// import { useUser } from '@clerk/nextjs';

// import Image from 'next/image';
// import LeaderboardTable from './_component/LeaderboardTable';

// interface LeaderboardUser {
//   userId: string;
//   githubUsername: string;
//   avatarUrl: string;
//   totalIssues: number;
//   totalPullRequests: number;
//   totalContributions: number;
// }

// export default function LeaderboardPage() {
//   const { user, isSignedIn } = useUser();
//   const [filter, setFilter] = useState('all');
//   const [users, setUsers] = useState<LeaderboardUser[]>([]);
//   const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);
//   const [currentUserData, setCurrentUserData] = useState<LeaderboardUser | null>(null);

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       const res = await fetch(`/api/leaderboard?filter=${filter}`);
//       const data: LeaderboardUser[] = await res.json();
//       setUsers(data);

//       if (isSignedIn && user) {
//         const index = data.findIndex(u => u.userId === user.id);
//         if (index !== -1) {
//           setCurrentUserRank(index + 1);
//           setCurrentUserData(data[index]);
//         } else {
//           setCurrentUserRank(null);
//           setCurrentUserData(null);
//         }
//       }
//     };

//     fetchLeaderboard();
//   }, [filter, isSignedIn, user]);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>

//       {/* Current User Summary */}
//       {currentUserData ? (
//         <div className="border p-4 rounded-md mb-6">
//           <h2 className="text-xl font-semibold mb-2">Your Stats</h2>
//           <div className="flex items-center space-x-4">
//             <Image src={currentUserData.avatarUrl} alt={currentUserData.githubUsername} width={50} height={50} className="rounded-full" />
//             <div>
//               <p><strong>Rank:</strong> {currentUserRank}</p>
//               <p><strong>Contributions:</strong> {currentUserData.totalContributions}</p>
//               <p><strong>Issues:</strong> {currentUserData.totalIssues}</p>
//               <p><strong>PRs:</strong> {currentUserData.totalPullRequests}</p>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p className="mb-6">You are not ranked yet. Start contributing to appear here.</p>
//       )}

//       {/* Filters */}
//       <div className="mb-4">
//         <button onClick={() => setFilter('weekly')} className={`px-4 py-2 mr-2 rounded ${filter === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Weekly</button>
//         <button onClick={() => setFilter('monthly')} className={`px-4 py-2 mr-2 rounded ${filter === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Monthly</button>
//         <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>All-time</button>
//       </div>

//       {/* Leaderboard Table */}
//       <LeaderboardTable filter={filter} />
//     </div>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import { useUser } from '@clerk/nextjs';

// import Image from 'next/image';
// import LeaderboardTable from './_component/LeaderboardTable';

// interface LeaderboardUser {
//   userId: string;
//   githubUsername: string;
//   avatarUrl: string;
//   totalIssues: number;
//   totalPullRequests: number;
//   totalContributions: number;
// }

// export default function LeaderboardPage() {
//   const { user, isSignedIn } = useUser();
//   const [filter, setFilter] = useState('all');
//   const [users, setUsers] = useState<LeaderboardUser[]>([]);
//   const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);
//   const [currentUserData, setCurrentUserData] = useState<LeaderboardUser | null>(null);

//   // useEffect(() => {
//   //   const fetchLeaderboard = async () => {
//   //     const res = await fetch(`/api/leaderboard?filter=${filter}`);
//   //     const data: LeaderboardUser[] = await res.json();
//   //     setUsers(data);

//   //     if (isSignedIn && user) {
//   //       const index = data.findIndex(u => u.userId === user.id);
//   //       if (index !== -1) {
//   //         setCurrentUserRank(index + 1);
//   //         setCurrentUserData(data[index]);
//   //       } else {
//   //         setCurrentUserRank(null);
//   //         setCurrentUserData(null);
//   //       }
//   //     }
//   //   };

//   //   fetchLeaderboard();
//   // }, [filter, isSignedIn, user]);

//   useEffect(() => {
//   const fetchLeaderboard = async () => {
//     const res = await fetch(`/api/leaderboard?filter=${filter}`);
//     const result = await res.json();

//     if (Array.isArray(result.data)) {
//       setUsers(result.data);

//       if (isSignedIn && user) {
//         const index = result.data.findIndex(u => u.userId === user.id);
//         if (index !== -1) {
//           setCurrentUserRank(index + 1);
//           setCurrentUserData(result.data[index]);
//         } else {
//           setCurrentUserRank(null);
//           setCurrentUserData(null);
//         }
//       }
//     } else {
//       console.error('Leaderboard API did not return a data array:', result);
//       setUsers([]);
//       setCurrentUserRank(null);
//       setCurrentUserData(null);
//     }
//   };

//   fetchLeaderboard();
// }, [filter, isSignedIn, user]);

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>

//       {/* Current User Summary */}
//       {currentUserData ? (
//         <div className="border p-4 rounded-lg mb-8 bg-gray-50 dark:bg-gray-800">
//           <h2 className="text-xl font-semibold mb-2">Your Stats</h2>
//           <div className="flex items-center space-x-4">
//             <Image src={currentUserData.avatarUrl} alt={currentUserData.githubUsername} width={50} height={50} className="rounded-full" />
//             <div>
//               <p><strong>Rank:</strong> {currentUserRank}</p>
//               <p><strong>Contributions:</strong> {currentUserData.totalContributions}</p>
//               <p><strong>Issues:</strong> {currentUserData.totalIssues}</p>
//               <p><strong>PRs:</strong> {currentUserData.totalPullRequests}</p>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p className="mb-6 text-gray-600">You are not ranked yet. Start contributing to appear here.</p>
//       )}

//       {/* Filters */}
//       <div className="flex space-x-2 mb-6">
//         {['weekly', 'monthly', 'all'].map((f) => (
//           <button
//             key={f}
//             onClick={() => setFilter(f)}
//             className={`px-4 py-2 rounded ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200'}`}
//           >
//             {f.charAt(0).toUpperCase() + f.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Leaderboard Table */}
//       <LeaderboardTable filter={filter} />
//     </div>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import { useUser } from '@clerk/nextjs';
// import Image from 'next/image';
// import LeaderboardTable from './_component/LeaderboardTable';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Trophy, Award, GitPullRequest, AlertCircle } from 'lucide-react';

// interface LeaderboardUser {
//   userId: string;
//   githubUsername: string;
//   avatarUrl: string;
//   totalIssues: number;
//   totalPullRequests: number;
//   totalContributions: number;
// }

// export default function LeaderboardPage() {
//   const { user, isSignedIn } = useUser();
//   const [filter, setFilter] = useState('all');
//   const [users, setUsers] = useState<LeaderboardUser[]>([]);
//   const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);
//   const [currentUserData, setCurrentUserData] = useState<LeaderboardUser | null>(null);

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       try {
//         const res = await fetch(`/api/leaderboard?filter=${filter}`);
//         const result = await res.json();

//         if (Array.isArray(result.data)) {
//           const sortedUsers = result.data.sort((a:any, b:any) => b.totalContributions - a.totalContributions);
//           setUsers(sortedUsers);

//           if (isSignedIn && user) {
//             const index = sortedUsers.findIndex(u => u.githubUsername === user.username);
//             if (index !== -1) {
//               setCurrentUserRank(index + 1);
//               setCurrentUserData(sortedUsers[index]);
//             } else {
//               setCurrentUserRank(null);
//               setCurrentUserData(null);
//             }
//           }
//         } else {
//           console.error('Leaderboard API did not return a data array:', result);
//           setUsers([]);
//           setCurrentUserRank(null);
//           setCurrentUserData(null);
//         }
//       } catch (error) {
//         console.error('Failed to fetch leaderboard:', error);
//         setUsers([]);
//       }
//     };

//     fetchLeaderboard();
//   }, [filter, isSignedIn, user]);

//   return (
//     <div className="space-y-8">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold tracking-tight">Leaderboard</h1>
//         <p className="text-muted-foreground mt-2">See who's making the biggest impact.</p>
//       </div>

//       {isSignedIn && currentUserData && (
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Trophy className="w-6 h-6 text-yellow-500" />
//               Your Ranking
//             </CardTitle>
//             <CardDescription>Your current position and stats.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <Image src={currentUserData.avatarUrl} alt={currentUserData.githubUsername} width={64} height={64} className="rounded-full" />
//                 <div>
//                   <p className="text-xl font-bold">{currentUserData.githubUsername}</p>
//                   <p className="text-muted-foreground">Rank: <span className="font-bold text-primary">{currentUserRank}</span></p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-3 gap-4 text-center">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Contributions</p>
//                   <p className="text-2xl font-bold">{currentUserData.totalContributions}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Issues</p>
//                   <p className="text-2xl font-bold">{currentUserData.totalIssues}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Pull Requests</p>
//                   <p className="text-2xl font-bold">{currentUserData.totalPullRequests}</p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle>Rankings</CardTitle>
//               <CardDescription>Top contributors based on the selected period.</CardDescription>
//             </div>
//             <div className="flex space-x-2">
//               {['all', 'monthly', 'weekly'].map((f) => (
//                 <Button
//                   key={f}
//                   variant={filter === f ? 'default' : 'outline'}
//                   onClick={() => setFilter(f)}
//                 >
//                   {f.charAt(0).toUpperCase() + f.slice(1)}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <LeaderboardTable filter={filter} />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



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
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`/api/leaderboard?filter=${filter}`);
        const result = await res.json();

        if (Array.isArray(result.data)) {
          const sortedUsers = result.data.sort((a:any, b:any) => b.totalContributions - a.totalContributions);
          setUsers(sortedUsers);
          setPodiumUsers(sortedUsers.slice(0, 3));

          if (isSignedIn && user) {
            const index = sortedUsers.findIndex(u => u.githubUsername === user.username);
            if (index !== -1) {
              setCurrentUserRank(index + 1);
              setCurrentUserData(sortedUsers[index]);
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

    const fetchTotalUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setTotalUsers(data.totalUsers);
      } catch (error) {
        console.error('Failed to fetch total users:', error);
      }
    };

    fetchLeaderboard();
    fetchTotalUsers();
  }, [filter, isSignedIn, user]);

  return (
    <div className="space-y-8 p-4 md:p-8">
      <h1 className="text-3xl font-bold">Leaderboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
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
                    <Badge key={lang} variant="outline" className={`px-2 py-1 text-xs font-semibold transition-colors border-0 ${colors[index % colors.length]}`}>
                      {lang}
                    </Badge>
                  )) || <p className="text-sm text-muted-foreground">N/A</p>}
                </div>
              </CardContent>
            </Card>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {podiumUsers.map((podiumUser, index) => (
          <PodiumCard key={podiumUser.userId} user={podiumUser} rank={index + 1} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Global Ranking</CardTitle>
            <div className="flex space-x-2">
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



