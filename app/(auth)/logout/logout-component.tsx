"use client";

import { IconLogout } from "@tabler/icons-react";
import { logout } from "@/app/(auth)/action";
import { useState } from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export default function Logout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };
  
  return (
    
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full justify-start cursor-pointer "
          >
            <IconLogout className="h-5 w-5 mr-2" />
            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

  );
}