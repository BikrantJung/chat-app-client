import { LogOut, Settings, User } from "iconoir-react";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../atoms/dropdown";
import { useUserStore } from "@/store/useUserStore";
import ThemeChangerSwitch from "./ThemeChangerSwitch";

function ProfileDropdown() {
  const { resetUser, userInfo } = useUserStore((state) => state);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Avatar>
          <AvatarImage src={userInfo?.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4">
        <DropdownMenuItem className="gap-1">
          <User className="icon" /> <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-1">
          <Settings className="icon" /> <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-1"
          onClick={() => {
            resetUser();
          }}
        >
          <LogOut className="icon" /> <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdown;
