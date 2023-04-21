import { useThemeStore } from "@/store/useThemeStore";
import { HalfMoon, SunLight } from "iconoir-react";
import { Button } from "../atoms/button";

function ThemeChanger() {
  const { theme, setTheme } = useThemeStore((state) => state);
  return (
    <>
      {theme === "dark" ? (
        <Button
          variant={"ghost"}
          className="p-3"
          onClick={() => setTheme("light")}
        >
          <SunLight />
        </Button>
      ) : (
        <Button
          variant={"ghost"}
          className="p-3"
          onClick={() => setTheme("dark")}
        >
          <HalfMoon />
        </Button>
      )}
    </>
  );
}

export default ThemeChanger;
