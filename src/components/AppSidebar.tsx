/**
 * Node modules
 */
import { Link, useLocation } from "react-router";
import { useState } from "react";

/**
 * Custom modules
 */
import { cn } from "@/lib/utils";

/**
 * Assets
 */
import { Logo } from "@/assets/logo";

/**
 * Components
 */
import { Sidebar, SidebarHeader, useSidebar } from "@/components/ui/sidebar";

/**
 * Constants
 */
import { SIDEBAR_LINKS } from "@/constants";

/**
 * Assets
 */

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { state } = useSidebar();
  const location = useLocation();

  const [openUpload, setOpenUpload] = useState(false);
  const [openCreateFolder, setOpenCreateFolder] = useState(false);

  return (
    <>
      <Sidebar {...props}>
        <SidebarHeader>
          <Link to="/drive/home">
            <Logo
              variant="icon"
              className={cn(state === "collapsed" && "size-8")}
            />
          </Link>
        </SidebarHeader>
      </Sidebar>
    </>
  );
};
