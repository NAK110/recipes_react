import { Link } from "react-router-dom";
import { Inbox, User } from "lucide-react";
import { GalleryVerticalEnd } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";

const items = [
  {
    title: "Recipes",
    url: "/recipes",
    icon: Inbox,
  },
  {
    title: "Users",
    url: "/users",
    icon: User,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="mb-4 touch-manipulation active:scale-95 transition-transform"
              asChild
            >
              <Link to="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Recipe App</span>
                  <span className="text-xs">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="pb-2">
                  <SidebarMenuButton
                    asChild
                    className="touch-manipulation active:scale-95 transition-transform min-h-[44px]"
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="size-5" />
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="touch-manipulation">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
