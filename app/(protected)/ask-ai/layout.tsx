
'use client';
import React from 'react';
import { ClerkFirebaseSync } from '@/app/_components/ClerkFirebaseSync';
import { TopNavbar } from '@/components/ui/top-navbar';

const AskAILayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ClerkFirebaseSync />
      <div className="flex flex-col min-h-screen bg-background">
        {/* Top Navigation */}
        <TopNavbar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden">
          <div className="w-full h-full overflow-hidden">{children}</div>
        </main>
      </div>
    </>
  );
};

export default AskAILayout;
