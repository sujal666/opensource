
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@clerk/nextjs';

interface GitHubDataContextType {
  githubData: any;
  loading: boolean;
  error: string | null;
}

const GitHubDataContext = createContext<GitHubDataContextType | undefined>(undefined);

export const GitHubDataProvider = ({ children }: { children: ReactNode }) => {
  const { getToken, isLoaded, userId } = useAuth();
  const [githubData, setGithubData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      if (!isLoaded || !userId) {
        setLoading(false);
        return;
      }

      try {
        const token = await getToken();
        const response = await fetch('/api/github-user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch GitHub data from API.');
        }

        const data = await response.json();
        setGithubData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch GitHub data.');
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, [isLoaded, userId, getToken]);

  return (
    <GitHubDataContext.Provider value={{ githubData, loading, error }}>
      {children}
    </GitHubDataContext.Provider>
  );
};

export const useGitHubData = () => {
  const context = useContext(GitHubDataContext);
  if (context === undefined) {
    throw new Error('useGitHubData must be used within a GitHubDataProvider');
  }
  return context;
};
