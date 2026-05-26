/**
 * Node modules
 */
import { Outlet, useLoaderData } from "react-router";

/**
 * Components
 */
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/AppSidebar";
import { FolderProvider } from "@/contexts/FolderContext";

export const AppLayout = () => {
  const { user } = useLoaderData();
  const folderName = user.$id;

  return (
    <FolderProvider folderName={folderName}>
      <SidebarProvider>
        <TooltipProvider delayDuration={500} disableHoverableContent>
          <AppSidebar collapsible="icon" variant="sidebar" />

          <SidebarInset>
            <header className="flex items-center p-2 border-b">
              <SidebarTrigger className="mr-2" />

              <h1 className="font-semibold text-lg">Dashboard</h1>
            </header>

            <main className="flex-1 p-4 overflow-y-auto">
              <Outlet />
            </main>
          </SidebarInset>
        </TooltipProvider>
      </SidebarProvider>
    </FolderProvider>
  );
};
