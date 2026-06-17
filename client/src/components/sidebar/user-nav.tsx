import { ChevronDown, LogOut } from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function UserNav({
  userName,
  profilePicture,
  onLogout,
}: {
  userName: string;
  profilePicture: string;
  onLogout: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-3 p-3 h-auto !bg-transparent text-left hover:bg-white/5 border-none focus:outline-none focus:ring-0 focus-visible:ring-0 !cursor-pointer select-none"
        >
          <Avatar className="h-9 w-9 shrink-0 !cursor-pointer">
            <AvatarImage
              src={profilePicture || ""}
              className="object-cover"
            />
            <AvatarFallback
              className="!bg-[var(--secondary-dark-color)] border border-zinc-700 !text-white text-xs font-bold"
            >
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 flex flex-col text-left">
            <span className="text-xs font-semibold text-white truncate leading-none mb-1">{userName}</span>
            <span className="text-[10px] text-gray-400 truncate leading-none">Free Trial</span>
          </div>
          <ChevronDown className="h-3 w-3 text-gray-400 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent
        className="w-56 bg-primary-base border-zinc-800 text-white shadow-xl"
        align="start"
        side="top"
        sideOffset={12}
        forceMount
      >
        <DropdownMenuLabel className="flex flex-col items-start gap-1 p-2">
          <span className="font-semibold text-sm">{userName}</span>
          <span className="text-[11px] text-gray-400 font-light">Free Trial (2 days left)</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <DropdownMenuGroup>
          <DropdownMenuItem 
            className="hover:!bg-white/10 hover:!text-white text-zinc-350 cursor-pointer focus:bg-white/10 focus:text-white"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
