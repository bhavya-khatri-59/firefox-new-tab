import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Settings, Trash2, X } from "lucide-react";

interface LinkButtonProps {
  url: string;
  icon: string;
  name: string;
  onUpdate: (url: string, icon: string, name: string) => void;
}

const LinkButton = ({ url, icon, name, onUpdate }: LinkButtonProps) => {
  const [editUrl, setEditUrl] = useState(url);
  const [editIcon, setEditIcon] = useState(icon);
  const [editName, setEditName] = useState(name);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setEditUrl(url || "");
    setEditIcon(icon || "");
    setEditName(name || "");
  }, [url, icon, name]);

  const formatUrl = (inputUrl: string) => {
    if (!inputUrl) return "";
    if (inputUrl.startsWith("http://") || inputUrl.startsWith("https://")) {
      return inputUrl;
    }
    return `https://${inputUrl}`;
  };

  const handleSave = () => {
    onUpdate(editUrl, editIcon, editName);
    setIsOpen(false);
  };

  const handleDelete = () => {
    setEditUrl("");
    setEditIcon("");
    setEditName("");
    onUpdate("", "", "");
    setIsOpen(false);
  };

  const handleClearIcon = () => {
    setEditIcon("");
    onUpdate(editUrl, "", editName);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditIcon(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getFavicon = () => {
    if (icon) return icon;
    if (url) {
      try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
      } catch {
        return "";
      }
    }
    return "";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <div className="relative group">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-24 h-24 rounded-3xl bg-primary hover:bg-secondary transition-all duration-300 p-4 overflow-hidden border-2 border-primary/20 hover:border-accent/50 hover:scale-105"
                onClick={() => url && window.open(formatUrl(url), "_blank")}
              >
                {getFavicon() ? (
                  <img src={getFavicon()} alt={name} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary-foreground text-2xl">+</div>
                )}
              </Button>
            </TooltipTrigger>
            {name && <TooltipContent><p>{name}</p></TooltipContent>}
          </Tooltip>
          <DialogTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Settings className="w-3 h-3" />
            </Button>
          </DialogTrigger>
        </div>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure Link</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Google"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={editUrl}
              onChange={(e) => setEditUrl(e.target.value)}
              placeholder="https://google.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  id="icon"
                  value={editIcon}
                  onChange={(e) => setEditIcon(e.target.value)}
                  placeholder="Enter icon URL or upload file below"
                  className="flex-1"
                />
                {editIcon && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleClearIcon}
                    className="shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  id="icon-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
              </div>
              <p className="text-xs text-muted-foreground">Leave empty to use website favicon</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1">Save</Button>
            <Button onClick={handleDelete} variant="destructive" size="icon">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkButton;
