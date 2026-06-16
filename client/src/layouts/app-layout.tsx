import Sidebar from "@/components/sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import EditTransactionDrawer from "@/components/transaction/edit-transaction-drawer";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Logo from "@/components/logo/logo";
import { Button } from "@/components/ui/button";

const AppLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-zinc-50 dark:bg-zinc-950">
      {/* Desktop Sidebar (hidden on mobile) */}
      <Sidebar className="hidden md:flex fixed top-0 bottom-0 left-0 w-64 z-20" />
      
      {/* Content wrapper */}
      <div className="flex flex-col flex-1 min-h-screen md:pl-64 w-full">
        {/* Mobile top-bar */}
        <header className="flex md:hidden items-center justify-between px-6 py-4 bg-[#1a1e2a] text-white border-b border-zinc-800 sticky top-0 z-30 h-16 shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 !cursor-pointer"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Logo />
          </div>
        </header>

        {/* Mobile Drawer (Sheet) */}
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetContent side="left" className="p-0 w-64 bg-[#1a1e2a] border-r border-zinc-800 text-white [&>button]:text-white">
            <Sidebar className="flex h-full w-full border-r-0" onMobileClose={() => setIsMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Main Content Page */}
        <main className="flex-1 w-full max-w-full">
          <Outlet />
        </main>
      </div>

      <EditTransactionDrawer />
    </div>
  );
};

export default AppLayout;
