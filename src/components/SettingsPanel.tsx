import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CustomTheme {
  mainColor: string;
  accentColor: string;
  bgImage: string;
}

const defaultTheme: CustomTheme = {
  mainColor: "#2d2519", // HSL 30 20% 12% converted
  accentColor: "#a6784a", // HSL 30 40% 45% converted
  bgImage: "",
};

interface SettingsPanelProps {
  onThemeChange: (theme: CustomTheme) => void;
}

const SettingsPanel = ({ onThemeChange }: SettingsPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<CustomTheme>(() => {
    const saved = localStorage.getItem("firefox-theme");
    return saved ? JSON.parse(saved) : defaultTheme;
  });

  useEffect(() => {
    onThemeChange(theme);
  }, []);

  const handleMainColorChange = (color: string) => {
    const newTheme = { ...theme, mainColor: color };
    setTheme(newTheme);
    localStorage.setItem("firefox-theme", JSON.stringify(newTheme));
    onThemeChange(newTheme);
  };

  const handleAccentColorChange = (color: string) => {
    const newTheme = { ...theme, accentColor: color };
    setTheme(newTheme);
    localStorage.setItem("firefox-theme", JSON.stringify(newTheme));
    onThemeChange(newTheme);
  };

  const handleBgImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newTheme = { ...theme, bgImage: reader.result as string };
        setTheme(newTheme);
        localStorage.setItem("firefox-theme", JSON.stringify(newTheme));
        onThemeChange(newTheme);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBgImageUrl = (url: string) => {
    const newTheme = { ...theme, bgImage: url };
    setTheme(newTheme);
    localStorage.setItem("firefox-theme", JSON.stringify(newTheme));
    onThemeChange(newTheme);
  };

  const handleReset = () => {
    setTheme(defaultTheme);
    localStorage.setItem("firefox-theme", JSON.stringify(defaultTheme));
    onThemeChange(defaultTheme);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-primary/80 hover:bg-primary border-2 border-accent/50 hover:border-accent transition-all"
        >
          <Settings className="w-5 h-5 text-primary-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-accent/50">
        <DialogHeader>
          <DialogTitle>Customize Theme</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="mainColor">Main Color</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="mainColor"
                type="color"
                value={theme.mainColor}
                onChange={(e) => handleMainColorChange(e.target.value)}
                className="w-16 h-10 p-1 cursor-pointer"
              />
              <span className="text-sm text-muted-foreground">
                Buttons, search bar, dialog backgrounds
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accentColor">Accent Color</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="accentColor"
                type="color"
                value={theme.accentColor}
                onChange={(e) => handleAccentColorChange(e.target.value)}
                className="w-16 h-10 p-1 cursor-pointer"
              />
              <span className="text-sm text-muted-foreground">
                Clock, text highlights, borders
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bgImage">Background Image</Label>
            <div className="space-y-2">
              <Input
                id="bgImageUrl"
                type="text"
                value={theme.bgImage.startsWith("data:") ? "" : theme.bgImage}
                onChange={(e) => handleBgImageUrl(e.target.value)}
                placeholder="Enter image URL"
              />
              <Input
                id="bgImageFile"
                type="file"
                accept="image/*"
                onChange={handleBgImageUpload}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                Upload an image or enter a URL. Leave empty for default.
              </p>
            </div>
          </div>

          <Button onClick={handleReset} variant="outline" className="w-full">
            Reset to Default
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsPanel;