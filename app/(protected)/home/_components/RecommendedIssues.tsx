'use client';

import React, { useEffect, useState } from 'react';
import { DashboardTable } from '@/app/(protected)/dashboard/_components/DashboardTable';
import { RepositoryIssue } from '@/lib/types';
import { useAuth } from '@clerk/nextjs';

interface RecommendedIssuesProps {
  topLanguages: string[];
}

export function RecommendedIssues({ topLanguages }: RecommendedIssuesProps) {
  const [recommendedIssues, setRecommendedIssues] = useState<RepositoryIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchRecommendedIssues = async () => {
      if (topLanguages.length === 0 || !userId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Use the advanced search API to get recommendations
        // We'll construct a prompt based on top languages
        const prompt = `Find good first issues in ${topLanguages.join(', ')} for beginners.`;
        
        const response = await fetch('/api/advanced-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, userId }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch recommended issues: ${response.statusText}`);
        }

        const data = await response.json();
        setRecommendedIssues(data);
      } catch (err: any) {
        console.error('Error fetching recommended issues:', err);
        setError(err.message || 'Failed to fetch recommended issues.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedIssues();
  }, [topLanguages, userId]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Issues for You</h2>
      {loading ? (
        <div className="text-center text-gray-800">Loading recommendations...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : recommendedIssues.length > 0 ? (
        <DashboardTable customData={recommendedIssues} disableFilters={true} />
      ) : (
        <div className="text-center text-gray-600">No recommendations found based on your top languages.</div>
      )}
    </div>
  );
}
