import { useState, useEffect } from "react";
import Gear from "@/components/Gear";
import LinkButton from "@/components/LinkButton";
import { Input } from "@/components/ui/input";
import firefoxBg from "@/assets/firefoxbg.png";

interface LinkConfig {
  url: string;
  icon: string;
  name: string;
}

const Index = () => {
  const [title, setTitle] = useState("Firefox");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [links, setLinks] = useState<LinkConfig[]>(() => {
    const saved = localStorage.getItem("firefox-links");
    if (saved) {
      return JSON.parse(saved);
    }
    return Array(8).fill({ url: "", icon: "", name: "" });
  });

  useEffect(() => {
    const savedTitle = localStorage.getItem("firefox-title");
    if (savedTitle) setTitle(savedTitle);
  }, []);

  useEffect(() => {
    localStorage.setItem("firefox-links", JSON.stringify(links));
  }, [links]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    localStorage.setItem("firefox-title", newTitle);
  };

  const updateLink = (index: number, url: string, icon: string, name: string) => {
    const newLinks = [...links];
    newLinks[index] = { url, icon, name };
    setLinks(newLinks);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-8"
      style={{
        backgroundImage: `url(${firefoxBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Animated Gears */}
      <Gear size={180} className="absolute top-8 left-8 opacity-80" />
      <Gear size={140} className="absolute top-16 left-32 opacity-60" reverse />
      <Gear size={100} className="absolute top-32 left-20 opacity-70" />
      
      <Gear size={200} className="absolute top-4 right-4 opacity-80" reverse />
      <Gear size={160} className="absolute top-20 right-28 opacity-60" />
      <Gear size={120} className="absolute top-24 right-12 opacity-70" reverse />

      <Gear size={150} className="absolute bottom-8 left-12 opacity-80" reverse />
      <Gear size={110} className="absolute bottom-20 left-28 opacity-60" />
      <Gear size={90} className="absolute bottom-16 left-8 opacity-70" />

      <Gear size={170} className="absolute bottom-12 right-16 opacity-80" />
      <Gear size={130} className="absolute bottom-24 right-32 opacity-60" reverse />
      <Gear size={95} className="absolute bottom-20 right-12 opacity-70" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center">
          {isEditingTitle ? (
            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              className="text-7xl font-bold text-center bg-transparent border-none text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
          ) : (
            <h1
              className="text-7xl font-bold cursor-pointer hover:text-accent transition-colors"
              onClick={() => setIsEditingTitle(true)}
            >
              {title}
            </h1>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-2xl h-16 bg-primary rounded-full border-4 border-primary/30 shadow-lg flex items-center px-6">
            <Input
              type="text"
              placeholder="Search or enter address"
              className="flex-1 bg-transparent border-none text-primary-foreground placeholder:text-primary-foreground/60 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const query = e.currentTarget.value;
                  if (query) {
                    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Link Buttons */}
        <div className="flex justify-center gap-6 flex-wrap">
          {links.map((link, index) => (
            <LinkButton
              key={index}
              url={link.url}
              icon={link.icon}
              name={link.name}
              onUpdate={(url, icon, name) => updateLink(index, url, icon, name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
