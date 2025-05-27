"use client";

import { IconLogout } from "@tabler/icons-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { logout } from "@/app/(auth)/action";
import { useState } from "react";

export function Logout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      await logout();
      // The redirect happens in the server action
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };
  
  return (
    <SidebarMenuButton 
      onClick={handleLogout}
      tooltip="Logout" 
      className="cursor-pointer"
      disabled={isLoggingOut}
    >
      <IconLogout className="mr-2 h-5 w-5" />
      <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
    </SidebarMenuButton>
  );
}