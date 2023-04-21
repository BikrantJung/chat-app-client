import { Label } from "../atoms/label";
import { Switch } from "../atoms/switch";

function ThemeChangerSwitch() {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="change-theme">Dark Mode</label>
      <Switch id="change-theme" />
    </div>
  );
}

export default ThemeChangerSwitch;
