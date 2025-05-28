// logout/page.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import Logout from "./logout-component";

export default function LogoutPage() {
  return (
    <SidebarProvider>
      <Logout />
    </SidebarProvider>
  );
}