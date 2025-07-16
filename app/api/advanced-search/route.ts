import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { RepositoryIssue } from '@/lib/types';
import { db } from '@/app/firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const CACHE_DURATION_MS = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

async function getGitHubSearchQuery(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const fullPrompt = `
    You are an expert at crafting GitHub search queries. Your task is to convert a user's natural language prompt into a precise GitHub search query.
    The user is looking for open source issues to contribute to.
    Focus on keywords and technologies from the user's prompt.
    Generate a simple query without excessive use of AND/OR/NOT operators or complex grouping.
    Scope the search to the title and body of the issue.
    Ensure the issues are open.

    User Prompt: "${prompt}"

    GitHub Search Query:
  `;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();
    return text.trim().replace(/`/g, ''); // Clean up potential markdown
  } catch (error) {
    console.error("Error generating GitHub search query:", error);
    // Fallback to a simple query if the model fails
    return `${prompt} in:title,body state:open`;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, userId } = await req.json();
    

    if (!prompt) {
      return NextResponse.json({ message: 'Prompt is required' }, { status: 400 });
    }

    const cacheRef = doc(db, 'recommendedIssues', userId);
    const cacheSnap = await getDoc(cacheRef);

    if (cacheSnap.exists()) {
      const cachedData = cacheSnap.data();
      const lastUpdated = cachedData.lastUpdated.toDate();
      const now = new Date();

      if (now.getTime() - lastUpdated.getTime() < CACHE_DURATION_MS) {
        console.log('Returning cached recommendations for user:', userId);
        return NextResponse.json(cachedData.issues);
      }
    }

    const githubQuery = await getGitHubSearchQuery(prompt);
    
    const response = await fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(githubQuery)}&per_page=20`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("GitHub API error:", errorData);
      return NextResponse.json({ message: 'Failed to fetch issues from GitHub' }, { status: response.status });
    }

    const data = await response.json();
    

    const issuesWithLanguage = await Promise.all(data.items.map(async (item: any) => {
      try {
        const repoRes = await fetch(item.repository_url, {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        });
        if (repoRes.ok) {
          const repoData = await repoRes.json();
          item.language = repoData.language;
        } else {
          item.language = 'N/A';
        }
      } catch (error) {
        item.language = 'N/A';
      }
      return item;
    }));

    const issues: RepositoryIssue[] = issuesWithLanguage.map((item: any) => ({
      id: item.id.toString(),
      title: item.title,
      url: item.html_url,
      repoName: item.repository_url.split('/').slice(-2).join('/'),
      language: item.language || 'N/A',
      difficulty: item.labels.map((label: any) => label.name).join(', '),
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      comments: item.comments,
      repoUrl: item.repository_url.replace('api.github.com/repos', 'github.com'),
    }));

    // Cache the new recommendations in Firebase
    await setDoc(cacheRef, {
      issues,
      lastUpdated: new Date(),
    });

    return NextResponse.json(issues);

  } catch (error) {
    console.error("Error in advanced search API:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
