'use client';
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';

import { ClerkFirebaseSync } from '@/app/_components/ClerkFirebaseSync';
import { AppSidebar } from '../dashboard/app-sidebar';

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
<main className="flex-1 h-screen overflow-y-auto bg-background p-6 scrollbar-hide">
  <div className="h-full w-full rounded-md border border-sidebar-border shadow-md p-4 overflow-y-auto scrollbar-hide">
    {children}
  </div>
</main>

      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
