"use client"

import Link from "next/link"
import { Icon } from "@tabler/icons-react"
import  Logout  from "@/app/(auth)/logout/logout-component"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  return (
    <SidebarGroup >
      <SidebarGroupContent className="flex flex-col gap-2 ">
        <SidebarMenu>
          {items.map((item) => {
            // Special handling for logout
            if (item.title === "Logout") {
              return (
                <SidebarMenuItem key={item.title}>
                  <Logout />
                </SidebarMenuItem>
              );
            }
            
            // Regular menu items
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title} className="cursor-pointer">
                  <Link href={item.url}>
                    {item.icon && <item.icon className="mr-2 h-5 w-5" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}


          
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
