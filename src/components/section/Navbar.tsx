import React from "react";
import { Bell } from "iconoir-react";
import { Button } from "../ui/button";
import ThemeChanger from "../ui/ThemeChanger";
function Navbar() {
  return (
    <div className="border-b px-8 py-8">
      <Button variant={"ghost"}>
        <Bell />
      </Button>
      <ThemeChanger />
    </div>
  );
}

export default Navbar;
