import { LogOut, Settings, User } from "iconoir-react";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../atoms/dropdown";

function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Avatar>
          <AvatarImage src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.909542152.1678622892&semt=sph" />
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
        <DropdownMenuItem className="gap-1">
          <LogOut className="icon" /> <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdown;
