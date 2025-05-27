// components/app-sidebar.tsx
"use client"

import {
  IconDashboard,
  IconListDetails,
  IconSettings,
  IconUsers,
  IconLogout,
} from "@tabler/icons-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Define the props interface
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  fullName?: string
}

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/welcome",
      icon: IconDashboard,
    },
    {
      title: "Formular",
      url: "/formular",
      icon: IconListDetails,
    },
    {
      title: "Clienti",
      url: "/clienti",
      icon: IconUsers,
    },
    {
      title: "Setari",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Logout",
      url: "/logout",
      icon: IconLogout,
    },
  ],
}

export function AppSidebar({ fullName = "User", ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader >
        <SidebarMenu>
          <SidebarMenuItem>
          
           <SidebarMenuButton className="py-6">
            <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
</Avatar>
           <div className="flex flex-col justify-center">
            <span>
              Bine ai venit
            </span>
            <span>{fullName}</span>
           </div>
           </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  )
}