import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

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

  const handleSave = () => {
    onUpdate(editUrl, editIcon, editName);
    setIsOpen(false);
  };

  const getFavicon = () => {
    if (editIcon) return editIcon;
    if (editUrl) {
      try {
        const domain = new URL(editUrl).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
      } catch {
        return "";
      }
    }
    return "";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative group">
        <Button
          variant="ghost"
          className="w-24 h-24 rounded-3xl bg-primary hover:bg-secondary transition-all duration-300 p-0 overflow-hidden border-2 border-primary/20 hover:border-accent/50 hover:scale-105"
          onClick={() => url && window.open(url, "_blank")}
        >
          {getFavicon() ? (
            <img src={getFavicon()} alt={name} className="w-12 h-12" />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center text-primary-foreground text-2xl">+</div>
          )}
        </Button>
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
            <Label htmlFor="icon">Icon URL (optional)</Label>
            <Input
              id="icon"
              value={editIcon}
              onChange={(e) => setEditIcon(e.target.value)}
              placeholder="Leave empty to use favicon"
            />
          </div>
          <Button onClick={handleSave} className="w-full">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkButton;
