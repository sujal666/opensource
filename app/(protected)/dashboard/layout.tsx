'use client';
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { ClerkFirebaseSync } from '@/app/_components/ClerkFirebaseSync';

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SidebarProvider>
       <ClerkFirebaseSync />
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <div className="w-full h-full rounded-md border border-sidebar-border shadow-md p-4 overflow-y-auto max-h-[calc(100vh-4rem)] scrollbar-hide">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
