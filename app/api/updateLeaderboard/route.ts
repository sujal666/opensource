// // File: app/api/updateLeaderboard/route.ts

// import { auth } from '@clerk/nextjs/server';
// import { clerkClient } from '@clerk/clerk-sdk-node';
// import { NextResponse } from 'next/server';
// import { db } from '@/app/firebase/firebaseConfig';
// import { doc, setDoc } from 'firebase/firestore';

// export async function GET() {
//   try {
//     // Authenticate user
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     // Get GitHub OAuth token
//     const oauthAccessTokens = await clerkClient.users.getUserOauthAccessToken(userId, 'oauth_github');
//     if (!oauthAccessTokens || oauthAccessTokens.length === 0) {
//       return NextResponse.json({ error: 'GitHub token not found' }, { status: 403 });
//     }
//     const githubAccessToken = oauthAccessTokens[0].token;

//     // Fetch contributions and issues via GitHub GraphQL
//     const graphqlQuery = {
//       query: `
//         query {
//           viewer {
//             login
//             avatarUrl
//             pullRequests {
//               totalCount
//             }
//             issues {
//               totalCount
//             }
//             contributionsCollection {
//               contributionCalendar {
//                 totalContributions
//               }
//             }
//           }
//         }
//       `
//     };

//     const githubGraphqlRes = await fetch('https://api.github.com/graphql', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${githubAccessToken}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(graphqlQuery),
//     });

//     if (!githubGraphqlRes.ok) {
//       const errorData = await githubGraphqlRes.json();
//       console.error('GitHub GraphQL API Error:', errorData);
//       return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
//     }

//     const graphData = await githubGraphqlRes.json();
//     const viewer = graphData.data.viewer;

//     const leaderboardData = {
//       userId,
//       githubUsername: viewer.login,
//       avatarUrl: viewer.avatarUrl,
//       totalIssues: viewer.issues.totalCount,
//       totalPullRequests: viewer.pullRequests.totalCount,
//       totalContributions: viewer.contributionsCollection.contributionCalendar.totalContributions,
//       updatedAt: new Date().toISOString(),
//     };

//     // Store/update in Firestore under 'leaderboard/{userId}'
//     await setDoc(doc(db, 'leaderboard', userId), leaderboardData, );

//     return NextResponse.json({ message: 'Leaderboard data updated', data: leaderboardData });
//   } catch (error) {
//     console.error('API Error in /api/updateLeaderboard:', error);
//     let errorMessage = 'Internal Server Error';
//     if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') {
//       errorMessage = (error as any).message;
//     }
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }



import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { NextResponse } from 'next/server';
import { db } from '@/app/firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export async function GET(request: Request) {
  try {
    // Get forcedUserId from query if called by CRON
    const { searchParams } = new URL(request.url);
    const forcedUserId = searchParams.get('userId');

    // Authenticate user if forcedUserId not provided
    let userId = forcedUserId;
    if (!forcedUserId) {
      const authRes = await auth();
      if (!authRes.userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      userId = authRes.userId;
    }

    // Get GitHub OAuth token
    //@ts-ignore
    const oauthAccessTokens = await clerkClient.users.getUserOauthAccessToken(userId, 'oauth_github');
    if (!oauthAccessTokens || oauthAccessTokens.length === 0) {
      return NextResponse.json({ error: 'GitHub token not found' }, { status: 403 });
    }
    const githubAccessToken = oauthAccessTokens[0].token;

    // Fetch contributions and issues via GitHub GraphQL
    const graphqlQuery = {
      query: `
        query {
          viewer {
            login
            avatarUrl
            pullRequests { totalCount }
            issues { totalCount }
            contributionsCollection {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }
      `
    };

    const githubGraphqlRes = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphqlQuery),
    });

    if (!githubGraphqlRes.ok) {
      const errorData = await githubGraphqlRes.json();
      console.error('GitHub GraphQL API Error:', errorData);
      return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
    }

    const graphData = await githubGraphqlRes.json();
    const viewer = graphData.data.viewer;

    const leaderboardData = {
      userId,
      githubUsername: viewer.login,
      avatarUrl: viewer.avatarUrl,
      totalIssues: viewer.issues.totalCount,
      totalPullRequests: viewer.pullRequests.totalCount,
      totalContributions: viewer.contributionsCollection.contributionCalendar.totalContributions,
      updatedAt: new Date().toISOString(),
    };

    // Store/update in Firestore under 'leaderboard/{userId}'
    //@ts-ignore
    await setDoc(doc(db, 'leaderboard', userId), leaderboardData);

    return NextResponse.json({ message: 'Leaderboard data updated', data: leaderboardData });
  } catch (error) {
    console.error('API Error in /api/updateLeaderboard:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
