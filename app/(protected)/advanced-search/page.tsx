'use client';

import { useState } from 'react';
import { DashboardTable } from '@/app/(protected)/dashboard/_components/DashboardTable';
import { RepositoryIssue } from '@/lib/types';

export default function AdvancedSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [issues, setIssues] = useState<RepositoryIssue[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/advanced-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: searchTerm }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch issues');
      }

      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error("Error fetching advanced search results:", error);
      // You might want to show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">Advanced Issue Search</h1>
        <p className="text-center text-gray-600">
          Describe the type of issues you want to work on, and let AI find them for you.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex items-center gap-3 mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="e.g., 'Fix UI bugs in React components'"
          className="flex-1 bg-gray-100 text-gray-900 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-200 active:scale-95"
          disabled={loading || !searchTerm.trim()}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
          ) : (
            'Search'
          )}
        </button>
      </form>

      {loading ? (
        <p className="text-center text-black">Searching for issues...</p>
      ) : (
        <DashboardTable customData={issues} disableFilters={true} />
      )}
    </div>
  );
}
