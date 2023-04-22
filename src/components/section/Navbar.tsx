import ThemeChanger from "../ui/ThemeChanger";
import ProfileDropdown from "../ui/ProfileDropdown";
import Notification from "../ui/notification/Notification";
import { NewChatDrawer } from "./NewChatDrawer";
function Navbar() {
  return (
    <div className="px-8 py-4 flex items-center justify-end gap-8">
      <div className="flex items-center gap-2">
        <NewChatDrawer />
        <Notification />
        <ThemeChanger />
      </div>
      <ProfileDropdown />
    </div>
  );
}

export default Navbar;
