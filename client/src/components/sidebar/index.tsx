import { useState } from "react";
import { LayoutDashboard, ArrowLeftRight, TrendingUp, Settings, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { PROTECTED_ROUTES } from "@/routes/common/routePath";
import { cn } from "@/lib/utils";
import Logo from "../logo/logo";
import { Button } from "../ui/button";
import { UserNav } from "./user-nav";
import LogoutDialog from "./logout-dialog";
import { useTypedSelector } from "@/app/hook";

interface SidebarProps {
  className?: string;
  onMobileClose?: () => void;
}

const Sidebar = ({ className, onMobileClose }: SidebarProps) => {
  const { pathname } = useLocation();
  const { user } = useTypedSelector((state) => state.auth);

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const routes = [
    {
      href: PROTECTED_ROUTES.OVERVIEW,
      label: "Overview",
      icon: <LayoutDashboard className="h-5 w-5 mr-3 shrink-0" />,
    },
    {
      href: PROTECTED_ROUTES.TRANSACTIONS,
      label: "Transactions",
      icon: <ArrowLeftRight className="h-5 w-5 mr-3 shrink-0" />,
    },
    {
      href: PROTECTED_ROUTES.REPORTS,
      label: "Reports",
      icon: <TrendingUp className="h-5 w-5 mr-3 shrink-0" />,
    },
    {
      href: PROTECTED_ROUTES.SETTINGS,
      label: "Settings",
      icon: <Settings className="h-5 w-5 mr-3 shrink-0" />,
    },
  ];

  return (
    <>
      <aside
        className={cn(
          "flex flex-col h-screen bg-white text-slate-900 dark:bg-primary-base dark:text-white w-64 select-none border-r",
          className
        )}
      >
        {/* Sidebar Header: Brand Logo & Title */}
        <div className="h-20 flex items-center justify-between px-6 shrink-0">
          <Logo />
          {/* Close button for mobile Sheet if applicable */}
          {onMobileClose && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-white/10 !cursor-pointer"
              onClick={onMobileClose}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {routes.map((route) => {
            const isActive =
              pathname === route.href ||
              (route.href === PROTECTED_ROUTES.SETTINGS && pathname.startsWith(PROTECTED_ROUTES.SETTINGS));

            return (
              <Button
                key={route.href}
                size="default"
                variant="ghost"
                className={cn(
                  "w-full font-medium py-6 px-4 border-none transition justify-start !text-[14.5px] cursor-pointer",
                  isActive && "bg-secondary-base transition-all duration-300 ease-in-out text-white hover:text-white hover:bg-secondary-base"
                )}
                onClick={onMobileClose}
                asChild
              >
                <NavLink to={route.href}>
                  {route.icon}
                  {route.label}
                </NavLink>
              </Button>
            );
          })}
        </nav>

        {/* Sidebar Footer: User Card */}
        <div className="p-4 shrink-0 border-t">
          <UserNav
            userName={user?.name || ""}
            profilePicture={user?.profilePicture || ""}
            onLogout={() => setIsLogoutDialogOpen(true)}
          />
        </div>
      </aside>

      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        setIsOpen={setIsLogoutDialogOpen}
      />
    </>
  );
};

export default Sidebar;
