import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/app/firebase/firebaseConfig';

async function getGitHubData(accessToken: string, username: string, since: string) {
  const headers = {
    Authorization: `bearer ${accessToken}`,
  };

  console.log(`[getGitHubData] Fetching data for ${username} since ${since}`);

  const contributionsQuery = `
    query($username: String!, $since: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $since) {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  const contributionsResponse = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: contributionsQuery,
      variables: { username, since },
    }),
  });

  const contributionsData = await contributionsResponse.json();
  console.log(`[getGitHubData] GraphQL Contributions Response for ${username}: ${JSON.stringify(contributionsData)}`);
  const contributions = contributionsData.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0;

  const issuesResponse = await fetch(`https://api.github.com/search/issues?q=author:${username}+is:issue+is:closed+closed:>=${since}`, {
    headers: {
        Authorization: `bearer ${accessToken}`,
      }
  });
  const issuesData = await issuesResponse.json();
  console.log(`[getGitHubData] REST Issues Response for ${username}: ${JSON.stringify(issuesData)}`);
  const issuesSolved = issuesData.total_count || 0;

  return { contributions, issuesSolved };
}

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    console.log(`[sync-github-data] Received request for userId: ${userId}`);

    if (!userId) {
      console.error('[sync-github-data] User ID is required');
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    console.log(`[sync-github-data] CLERK_SECRET_KEY: ${process.env.CLERK_SECRET_KEY ? 'Set' : 'Not Set'}`);
    console.log(`[sync-github-data] clerkClient defined: ${!!clerkClient}`);
//@ts-ignore
    if (!clerkClient || !clerkClient.users) {
      console.error('[sync-github-data] clerkClient.users is not initialized. This might indicate a Clerk SDK setup issue.');
      return NextResponse.json({ error: 'Clerk client users API not available.' }, { status: 500 });
    }

    const userRef = doc(db, 'users', userId);
//@ts-ignore
    const oauthTokens = await clerkClient.users.getUserOauthAccessToken(userId, 'oauth_github');
    console.log(`[sync-github-data] OAuth tokens retrieved for ${userId}: ${JSON.stringify(oauthTokens)}`);

    if (!Array.isArray(oauthTokens) || oauthTokens.length === 0) {
      console.warn(`[sync-github-data] User ${userId} does not have a GitHub OAuth token or it's invalid.`);
      return NextResponse.json({ message: 'GitHub OAuth token not found' }, { status: 200 });
    }

    const accessToken = oauthTokens[0]?.token;

    if (!accessToken) {
      console.warn(`[sync-github-data] User ${userId} has an empty access token.`);
      return NextResponse.json({ message: 'Empty GitHub access token' }, { status: 200 });
    }

    const userRes = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `bearer ${accessToken}`,
        }
    });
    const githubUser = await userRes.json();
    console.log(`[sync-github-data] GitHub user data for ${userId}: ${JSON.stringify(githubUser)}`);
    const username = githubUser.login;

    if (!username) {
        console.warn(`[sync-github-data] Could not get GitHub username for user ${userId}.`);
        return NextResponse.json({ message: 'GitHub username not found' }, { status: 200 });
    }

    const now = new Date();

    // Daily
    const dailySince = new Date(now);
    dailySince.setDate(now.getDate() - 1);
    const { contributions: dailyContributions, issuesSolved: dailyIssuesSolved } = await getGitHubData(accessToken, username, dailySince.toISOString());
    console.log(`[sync-github-data] Daily data for ${userId}: Contributions=${dailyContributions}, IssuesSolved=${dailyIssuesSolved}`);

    // Weekly
    const weeklySince = new Date(now);
    weeklySince.setDate(now.getDate() - 7);
    const { contributions: weeklyContributions, issuesSolved: weeklyIssuesSolved } = await getGitHubData(accessToken, username, weeklySince.toISOString());
    console.log(`[sync-github-data] Weekly data for ${userId}: Contributions=${weeklyContributions}, IssuesSolved=${weeklyIssuesSolved}`);

    // Monthly
    const monthlySince = new Date(now);
    monthlySince.setMonth(now.getMonth() - 1);
    const { contributions: monthlyContributions, issuesSolved: monthlyIssuesSolved } = await getGitHubData(accessToken, username, monthlySince.toISOString());
    console.log(`[sync-github-data] Monthly data for ${userId}: Contributions=${monthlyContributions}, IssuesSolved=${monthlyIssuesSolved}`);

    const dataToSet = {
      contributions_daily: dailyContributions,
      issuesSolved_daily: dailyIssuesSolved,
      contributions_weekly: weeklyContributions,
      issuesSolved_weekly: weeklyIssuesSolved,
      contributions_monthly: monthlyContributions,
      issuesSolved_monthly: monthlyIssuesSolved,
      githubUsername: username,
      githubAvatarUrl: githubUser.avatar_url,
      lastSyncedAt: now.toISOString(),
    };
    console.log(`[sync-github-data] Attempting to set Firestore document for ${userId} with data: ${JSON.stringify(dataToSet)}`);

    await setDoc(userRef, dataToSet, { merge: true });
    console.log(`[sync-github-data] Firestore document updated for ${userId}`);

    return NextResponse.json({ message: 'GitHub data synced successfully' });

  } catch (error) {
    console.error('[sync-github-data] Failed to sync GitHub data:', error);
    return NextResponse.json({ error: 'Failed to sync GitHub data' }, { status: 500 });
  }
}
