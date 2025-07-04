'use client'

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import {  Bot, CreditCard, LayoutDashboard, Plus, Presentation } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
const items = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icons: LayoutDashboard
    },
    {
        title: 'Saved Issues',
        url: '/saved',
        icons: Bot
      },
      // {
      //   title: 'Profile',
      //   url: '/meetings',
      //   icons: Presentation
      // },
          {
        title: 'Ask AI',
        url: '/ask-ai',
        icons: Presentation
      },

]


export function AppSidebar() {
    const pathname = usePathname()
    const {open} = useSidebar()
  return (
<Sidebar
  // collapsible="icon"
  // variant="floating"
  className=" text-white"
>
  <SidebarHeader>
    {/* <Image src='/logo.png' width={100} height={100} alt="logo image" /> */}
    <h1 className="text-center text-2xl font-bold mt-10 bg-gradient-to-br from-violet-500 to-pink-500 bg-clip-text text-transparent">
  Open Source AI
</h1>
  </SidebarHeader>

  <SidebarContent>
    <SidebarGroup>
      {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
      <SidebarGroupContent className="mt-4">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className={cn(
                      "flex items-center gap-2 w-full px-4 py-2 rounded-md transition-colors",
                      "hover:bg-neutral-800", // on hover
                      isActive ? "bg-neutral-800 text-white" : "text-neutral-300"
                    )}
                  >
                    <item.icons className="w-5 ml-4 h-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>
</Sidebar>

  )
}