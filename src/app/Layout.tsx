import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/dark-modeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <ModeToggle />
        <Outlet />
        <Toaster />
      </main>
    </SidebarProvider>
  );
}