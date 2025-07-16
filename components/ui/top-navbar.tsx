
// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { cn } from '@/lib/utils';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Home, LayoutDashboard, Bookmark, Search, Bot, User } from 'lucide-react';

// const navItems = [
//   {
//     title: 'Home',
//     href: '/home',
//     icon: Home,
//   },
//   {
//     title: 'Issues',
//     icon: LayoutDashboard, // Using LayoutDashboard as a generic icon for Issues dropdown
//     dropdown: [
//       {
//         title: 'Find Issues',
//         href: '/dashboard',
//         icon: LayoutDashboard,
//       },
//       {
//         title: 'Saved Issues',
//         href: '/saved',
//         icon: Bookmark,
//       },
//       {
//         title: 'Advanced Search',
//         href: '/advanced-search',
//         icon: Search,
//       },
//     ],
//   },
//   {
//     title: 'Ask AI',
//     href: '/ask-ai',
//     icon: Bot,
//   },
//   {
//     title: 'Profile',
//     href: '/profile',
//     icon: User,
//   },
// ];

// export function TopNavbar() {
//   const pathname = usePathname();

//   return (
//     <nav className="bg-purple-950 shadow-md p-4 flex items-center justify-between text-gray-200">
//       <div className="flex items-center">
//         <Link href="/home" className="text-2xl font-bold text-purple-400 mr-6">
//           Open Source AI
//         </Link>
//         <div className="flex space-x-4">
//           {navItems.map((item) => (
//             item.dropdown ? (
//               <DropdownMenu key={item.title}>
//                 <DropdownMenuTrigger asChild>
//                   <button
//                     className={cn(
//                       "relative flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
//                       "hover:bg-purple-800",
//                       pathname.startsWith(item.href || '') ? 'bg-purple-800 text-white' : 'text-gray-200'
//                     )}
//                   >
//                     <item.icon className="w-4 h-4 mr-2" />
//                     {item.title}
//                   </button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="w-48 bg-purple-900 border border-purple-700 rounded-md shadow-lg text-gray-200">
//                   {item.dropdown.map((dropdownItem) => (
//                     <DropdownMenuItem key={dropdownItem.title} asChild>
//                       <Link
//                         href={dropdownItem.href}
//                         className={cn(
//                           "flex items-center px-3 py-2 text-sm transition-colors hover:bg-purple-800",
//                           pathname === dropdownItem.href ? 'bg-purple-800 text-white' : 'text-gray-200'
//                         )}
//                       >
//                         <dropdownItem.icon className="w-4 h-4 mr-2" />
//                         {dropdownItem.title}
//                       </Link>
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <Link
//                 key={item.title}
//                 href={item.href || '#'}
//                 className={cn(
//                   "relative flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
//                   "hover:bg-purple-800",
//                   pathname === item.href ? 'bg-purple-800 text-white border-b-2 border-purple-400' : 'text-gray-200'
//                 )}
//               >
//                 <item.icon className="w-4 h-4 mr-2" />
//                 {item.title}
//               </Link>
//             )
//           ))}
//         </div>
//       </div>
//       {/* You can add user profile/auth status here if needed */}
//     </nav>
//   );
// }



// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { cn } from '@/lib/utils';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Home, LayoutDashboard, Bookmark, Search, Bot, User, Code } from 'lucide-react';

// const navItems = [
//   {
//     title: 'Home',
//     href: '/home',
//     icon: Home,
//   },
//   {
//     title: 'Issues',
//     icon: LayoutDashboard,
//     dropdown: [
//       { title: 'Find Issues', href: '/dashboard', icon: LayoutDashboard },
//       { title: 'Saved Issues', href: '/saved', icon: Bookmark },
//       { title: 'Advanced Search', href: '/advanced-search', icon: Search },
//     ],
//   },
//   {
//     title: 'Ask AI',
//     href: '/ask-ai',
//     icon: Bot,
//   },
//   {
//     title: 'Profile',
//     href: '/profile',
//     icon: User,
//   },
// ];

// export function TopNavbar() {
//   const pathname = usePathname();

//   return (
//     <nav className="bg-purple-950 shadow-md p-4 w-full flex justify-center">

//         <div className="flex items-center space-x-2">
//     <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
//       <Code className="w-5 h-5 text-white" />
//     </div>
//     <span className="text-xl font-bold text-white">IssueHunter</span>
//   </div>

//       <div className="flex items-center space-x-6 px-6 py-2 rounded-full">
//         {navItems.map((item) => {
//           const isDropdown = !!item.dropdown;

//           // Check if current route matches dropdown children
//           const isDropdownActive = isDropdown
//             ? item.dropdown?.some((d) => pathname === d.href)
//             : false;

//           const isActive = item.href && pathname === item.href;

//           return isDropdown ? (
//             <DropdownMenu key={item.title}>
//               <DropdownMenuTrigger asChild>
//                 <button
//                   className={cn(
//                     'relative flex items-center gap-2 px-4 py-2 text-sm rounded-full transition-colors',
//                     isDropdownActive
//                       ? 'bg-purple-100 text-purple-900 font-semibold'
//                       : 'text-gray-200 hover:bg-purple-800'
//                   )}
//                 >
//                   <item.icon className="w-4 h-4" />
//                   {item.title}

//                   {isDropdownActive && (
//                     <span className="absolute left-1/2 -bottom-[10px] -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-purple-100" />
//                   )}
//                 </button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-48 bg-purple-900 border border-purple-700 rounded-md shadow-lg text-gray-200 mt-2">
//                 {item.dropdown.map((dropdownItem) => (
//                   <DropdownMenuItem key={dropdownItem.title} asChild>
//                     <Link
//                       href={dropdownItem.href}
//                       className={cn(
//                         'flex items-center px-3 py-2 text-sm transition-colors hover:bg-purple-800 rounded-md',
//                         pathname === dropdownItem.href
//                           ? 'bg-purple-800 text-white'
//                           : 'text-gray-200'
//                       )}
//                     >
//                       <dropdownItem.icon className="w-4 h-4 mr-2" />
//                       {dropdownItem.title}
//                     </Link>
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <Link
//               key={item.title}
//               href={item.href}
//               className={cn(
//                 'relative flex items-center gap-2 px-4 py-2 text-sm rounded-full transition-colors',
//                 isActive
//                   ? 'bg-purple-100 text-purple-900 font-semibold'
//                   : 'text-gray-200 hover:bg-purple-800'
//               )}
//             >
//               <item.icon className="w-4 h-4" />
//               {item.title}

//               {isActive && (
//                 <span className="absolute left-1/2 -bottom-[10px] -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-purple-100" />
//               )}
//             </Link>
//           );
//         })}
//       </div>
//     </nav>
//   );
// }


'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Home, LayoutDashboard, Bookmark, Search, Bot, User, Code } from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';

const navItems = [
  {
    title: 'Home',
    href: '/home',
    icon: Home,
  },
  {
    title: 'Issues',
    icon: LayoutDashboard,
    dropdown: [
      { title: 'Find Issues', href: '/dashboard', icon: LayoutDashboard },
      { title: 'Saved Issues', href: '/saved', icon: Bookmark },
      { title: 'Advanced Search', href: '/advanced-search', icon: Search },
    ],
  },
  {
    title: 'Ask AI',
    href: '/ask-ai',
    icon: Bot,
  },
  {
    title: 'Leaderboard',
    href: '/leaderboard',
    icon: User,
  },
];

export function TopNavbar() {
  const pathname = usePathname();
  const { user } = useUser();

  const isDropdownActive = (dropdown: any[]) =>
    dropdown.some((item) => pathname === item.href);

  return (
    <nav className="relative bg-purple-950 shadow-md py-4 w-full flex justify-center items-center">
      {/* 🔵 Logo on the Left with margin */}
      <div className="absolute left-16 flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <Code className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-white">IssueHunter</span>
      </div>

      {/* 🟣 Centered Navigation Items */}
      <div className="flex items-center space-x-6 px-6 py-2 rounded-full bg-purple-900 shadow">
        {navItems.map((item) => {
          const isActive = item.href && pathname === item.href;
          const isDropdown = !!item.dropdown;
          const isDropdownNowActive = isDropdown ? isDropdownActive(item.dropdown) : false;

          return isDropdown ? (
            <DropdownMenu key={item.title}>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    'relative flex items-center gap-2 px-4 py-2 text-sm rounded-full transition-colors',
                    isDropdownNowActive
                      ? 'bg-purple-100 text-purple-900 font-semibold'
                      : 'text-gray-200 hover:bg-purple-800'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.title}

                  {isDropdownNowActive && (
                    <span className="absolute left-1/2 -bottom-[10px] -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-purple-100" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-purple-900 border border-purple-700 rounded-md shadow-lg text-gray-200 mt-2">
                {item.dropdown.map((dropdownItem) => (
                  <DropdownMenuItem key={dropdownItem.title} asChild>
                    <Link
                      href={dropdownItem.href}
                      className={cn(
                        'flex items-center px-3 py-2 text-sm transition-colors hover:bg-purple-800 rounded-md',
                        pathname === dropdownItem.href
                          ? 'bg-purple-800 text-white'
                          : 'text-gray-200'
                      )}
                    >
                      <dropdownItem.icon className="w-4 h-4 mr-2" />
                      {dropdownItem.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                'relative flex items-center gap-2 px-4 py-2 text-sm rounded-full transition-colors',
                isActive
                  ? 'bg-purple-100 text-purple-900 font-semibold'
                  : 'text-gray-200 hover:bg-purple-800'
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.title}

              {isActive && (
                <span className="absolute left-1/2 -bottom-[10px] -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-purple-100" />
              )}
            </Link>
          );
        })}
      </div>

      {/* User Profile on the Right */}
      <div className="absolute right-16 flex items-center space-x-3">
        {user && (
          <span className="text-white text-sm font-medium">
            Hello, {user.firstName || user.username || 'User'}!
          </span>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}
