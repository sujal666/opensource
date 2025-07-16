'use client';
import React from 'react';
import { ClerkFirebaseSync } from '@/app/_components/ClerkFirebaseSync';
import { TopNavbar } from '@/components/ui/top-navbar';

const HomeLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
       <ClerkFirebaseSync />
      <TopNavbar />
      <div className="flex w-full overflow-hidden border-l-[20px] border-r-[20px] border-b-[20px] border-purple-950 ">

        {/* Main Content Area */}
<main className="flex-1 overflow-y-auto bg-background p-6 scrollbar-hide">
  <div className="w-full  p-4 overflow-y-auto scrollbar-hide">
    {children}
  </div>
</main>

      </div>
    </>
  );
};

export default HomeLayout;
