// import { auth } from '@clerk/nextjs/server';
// import { clerkClient } from '@clerk/clerk-sdk-node';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const oauthAccessTokens = await clerkClient.users.getUserOauthAccessToken(
//       userId,
//       'oauth_github'
//     );

//     if (!oauthAccessTokens || oauthAccessTokens.length === 0) {
//       return NextResponse.json(
//         { error: 'GitHub access token not found for this user.' },
//         { status: 403 }
//       );
//     }

//     const githubAccessToken = oauthAccessTokens[0].token;

//     // Fetch basic user data
//     const githubUserRes = await fetch('https://api.github.com/user', {
//       headers: {
//         Authorization: `Bearer ${githubAccessToken}`,
//         Accept: 'application/vnd.github+json',
//       },
//     });

//     if (!githubUserRes.ok) {
//       const errorData = await githubUserRes.json();
//       console.error('GitHub User API Error:', errorData);
//       return NextResponse.json({ error: 'Failed to fetch GitHub user data.' }, { status: 500 });
//     }

//     const userData = await githubUserRes.json();

//     // Fetch starred repositories to get totalStars
//     const starredReposRes = await fetch(`https://api.github.com/users/${userData.login}/starred?per_page=100`, {
//       headers: {
//         Authorization: `Bearer ${githubAccessToken}`,
//         Accept: 'application/vnd.github+json',
//       },
//     });

//     let totalStars = 0;
//     if (starredReposRes.ok) {
//       const starredRepos = await starredReposRes.json();
//       totalStars = starredRepos.length;
//     }

//     // Fetch user repositories to determine top languages
//     const userReposRes = await fetch(`https://api.github.com/users/${userData.login}/repos?per_page=100`, {
//       headers: {
//         Authorization: `Bearer ${githubAccessToken}`,
//         Accept: 'application/vnd.github+json',
//       },
//     });

//     let topLanguages: string[] = [];
//     if (userReposRes.ok) {
//       const userRepos = await userReposRes.json();
//       const languageCounts: { [key: string]: number } = {};

//       userRepos.forEach((repo: any) => {
//         if (repo.language) {
//           languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
//         }
//       });

//       topLanguages = Object.entries(languageCounts)
//         .sort(([, countA], [, countB]) => countB - countA)
//         .slice(0, 5) // Get top 5 languages
//         .map(([language]) => language);
//     }

//     // --- Placeholder for more complex GitHub API data --- 
//     // Fetching total commits, pull requests, and issues for a user across all repositories
//     // is highly complex with the REST API and can easily hit rate limits.
//     // It typically requires iterating through all repositories and then making further
//     // API calls for each repo's commits, pull requests, and issues.
//     // For a more efficient and robust solution, consider using GitHub's GraphQL API.
//     const totalCommits = 0; // Placeholder: Implement GraphQL or extensive REST API calls
//     const totalPullRequests = 0; // Placeholder: Implement GraphQL or extensive REST API calls
//     const totalIssues = 0; // Placeholder: Implement GraphQL or extensive REST API calls
//     const contributions = []; // Placeholder: Best fetched via GitHub GraphQL API for heatmap data
//     // --- End of Placeholder --- 

//     return NextResponse.json({
//       login: userData.login,
//       avatar_url: userData.avatar_url,
//       followers: userData.followers,
//       following: userData.following,
//       public_repos: userData.public_repos,
//       bio: userData.bio,
//       totalCommits,
//       totalPullRequests,
//       totalIssues,
//       totalStars,
//       topLanguages,
//       contributions,
//     });
//   } catch (error: any) {
//     console.error('API Error in /api/github-user:', error);
//     return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
//   }
// }










// //working
// import { auth } from '@clerk/nextjs/server';
// import { clerkClient } from '@clerk/clerk-sdk-node';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const oauthAccessTokens = await clerkClient.users.getUserOauthAccessToken(
//       userId,
//       'oauth_github'
//     );

//     if (!oauthAccessTokens || oauthAccessTokens.length === 0) {
//       return NextResponse.json(
//         { error: 'GitHub access token not found for this user.' },
//         { status: 403 }
//       );
//     }

//     const githubAccessToken = oauthAccessTokens[0].token;

//     // Fetch basic user data
//     const githubUserRes = await fetch('https://api.github.com/user', {
//       headers: {
//         Authorization: `Bearer ${githubAccessToken}`,
//         Accept: 'application/vnd.github+json',
//       },
//     });

//     if (!githubUserRes.ok) {
//       const errorData = await githubUserRes.json();
//       console.error('GitHub User API Error:', errorData);
//       return NextResponse.json({ error: 'Failed to fetch GitHub user data.' }, { status: 500 });
//     }

//     const userData = await githubUserRes.json();

//     // Fetch starred repositories to get totalStars
//     const starredReposRes = await fetch(`https://api.github.com/users/${userData.login}/starred?per_page=100`, {
//       headers: {
//         Authorization: `Bearer ${githubAccessToken}`,
//         Accept: 'application/vnd.github+json',
//       },
//     });

//     let totalStars = 0;
//     if (starredReposRes.ok) {
//       const starredRepos = await starredReposRes.json();
//       totalStars = starredRepos.length;
//     }

//     // Fetch user repositories to determine top languages
//     const userReposRes = await fetch(`https://api.github.com/users/${userData.login}/repos?per_page=100`, {
//       headers: {
//         Authorization: `Bearer ${githubAccessToken}`,
//         Accept: 'application/vnd.github+json',
//       },
//     });

//     let topLanguages: string[] = [];
//     if (userReposRes.ok) {
//       const userRepos = await userReposRes.json();
//       const languageCounts: { [key: string]: number } = {};

//       userRepos.forEach((repo: any) => {
//         if (repo.language) {
//           languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
//         }
//       });

//       topLanguages = Object.entries(languageCounts)
//         .sort(([, countA], [, countB]) => countB - countA)
//         .slice(0, 5)
//         .map(([language]) => language);
//     }

//     // ------------------------
//     // Fetch total commits, pull requests, issues using GitHub GraphQL API
//     // ------------------------

//     const graphqlQuery = {
//       query: `
//         query {
//           viewer {
//             repositories(first: 100, ownerAffiliations: OWNER) {
//               nodes {
//                 name
//                 defaultBranchRef {
//                   target {
//                     ... on Commit {
//                       history {
//                         totalCount
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//             pullRequests {
//               totalCount
//             }
//             issues {
//               totalCount
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

//     let totalCommits = 0;
//     let totalPullRequests = 0;
//     let totalIssues = 0;

//     if (githubGraphqlRes.ok) {
//       const graphData = await githubGraphqlRes.json();
//       const repos = graphData.data.viewer.repositories.nodes;

//       repos.forEach((repo: any) => {
//         if (repo.defaultBranchRef && repo.defaultBranchRef.target.history) {
//           totalCommits += repo.defaultBranchRef.target.history.totalCount;
//         }
//       });

//       totalPullRequests = graphData.data.viewer.pullRequests.totalCount;
//       totalIssues = graphData.data.viewer.issues.totalCount;

//     } else {
//       const errorData = await githubGraphqlRes.json();
//       console.error('GitHub GraphQL API Error:', errorData);
//     }

//     // ------------------------

//     return NextResponse.json({
//       login: userData.login,
//       avatar_url: userData.avatar_url,
//       followers: userData.followers,
//       following: userData.following,
//       public_repos: userData.public_repos,
//       bio: userData.bio,
//       totalCommits,
//       totalPullRequests,
//       totalIssues,
//       totalStars,
//       topLanguages,
//       contributions: [], // Future: Implement contributions heatmap via GraphQL
//     });
//   } catch (error: any) {
//     console.error('API Error in /api/github-user:', error);
//     return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
//   }
// }













//working
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const oauthAccessTokens = await clerkClient.users.getUserOauthAccessToken(
      userId,
      'oauth_github'
    );

    if (!oauthAccessTokens || oauthAccessTokens.length === 0) {
      return NextResponse.json(
        { error: 'GitHub access token not found for this user.' },
        { status: 403 }
      );
    }

    const githubAccessToken = oauthAccessTokens[0].token;

    // Fetch basic user data
    const githubUserRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (!githubUserRes.ok) {
      const errorData = await githubUserRes.json();
      console.error('GitHub User API Error:', errorData);
      return NextResponse.json({ error: 'Failed to fetch GitHub user data.' }, { status: 500 });
    }

    const userData = await githubUserRes.json();

    // Fetch starred repositories to get totalStars
    const starredReposRes = await fetch(`https://api.github.com/users/${userData.login}/starred?per_page=100`, {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
        Accept: 'application/vnd.github+json',
      },
    });

    let totalStars = 0;
    if (starredReposRes.ok) {
      const starredRepos = await starredReposRes.json();
      totalStars = starredRepos.length;
    }

    // Fetch user repositories to determine top languages
    const userReposRes = await fetch(`https://api.github.com/users/${userData.login}/repos?per_page=100`, {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
        Accept: 'application/vnd.github+json',
      },
    });

    let topLanguages: string[] = [];
    let languageCounts: { [key: string]: number } = {}; // Declare and initialize here
    if (userReposRes.ok) {
      const userRepos = await userReposRes.json();

      userRepos.forEach((repo: any) => {
        if (repo.language) {
          languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
        }
      });

      topLanguages = Object.entries(languageCounts)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 5)
        .map(([language]) => language);
    }

    // ------------------------
    // Fetch total commits, pull requests, issues using GitHub GraphQL API
    // ------------------------

  const graphqlQuery = {
  query: `
    query {
      viewer {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
        repositories(first: 100, ownerAffiliations: OWNER) {
          nodes {
            name
            defaultBranchRef {
              target {
                ... on Commit {
                  history {
                    totalCount
                  }
                }
              }
            }
          }
        }
        pullRequests {
          totalCount
        }
        issues {
          totalCount
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

    let totalCommits = 0;
    let totalPullRequests = 0;
    let totalIssues = 0;
    let contributions: { date: string; count: number }[] = [];

    if (githubGraphqlRes.ok) {
      const graphData = await githubGraphqlRes.json();
      const repos = graphData.data.viewer.repositories.nodes;
      const viewer = graphData.data.viewer;

      repos.forEach((repo: any) => {
        if (repo.defaultBranchRef && repo.defaultBranchRef.target.history) {
          totalCommits += repo.defaultBranchRef.target.history.totalCount;
        }
      });

      totalPullRequests = graphData.data.viewer.pullRequests.totalCount;
      totalIssues = graphData.data.viewer.issues.totalCount;

      const weeks = graphData.data.viewer.contributionsCollection.contributionCalendar.weeks;
weeks.forEach((week: any) => {
  week.contributionDays.forEach((day: any) => {
    contributions.push({
      date: day.date,
      count: day.contributionCount,
    });
  });
});

    } else {
      const errorData = await githubGraphqlRes.json();
      console.error('GitHub GraphQL API Error:', errorData);
    }

    // ------------------------

    // Extract contributions



    return NextResponse.json({
      login: userData.login,
      avatar_url: userData.avatar_url,
      followers: userData.followers,
      following: userData.following,
      public_repos: userData.public_repos,
      bio: userData.bio,
     
      totalCommits,
      totalPullRequests,
      totalIssues,
      totalStars,
      topLanguages,
      languageCounts, // Add languageCounts to the response
      contributions, // Future: Implement contributions heatmap via GraphQL
    });
  } catch (error: any) {
    console.error('API Error in /api/github-user:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
