import { useState, useEffect } from "react";
import Gear from "@/components/Gear";
import LinkButton from "@/components/LinkButton";
import { Input } from "@/components/ui/input";
import parchmentBg from "@/assets/parchment-bg.jpg";

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
        backgroundImage: `url(${parchmentBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Left Side Gears - No overlap with center content */}
      <div className="absolute left-0 top-0 bottom-0 w-64 flex flex-col justify-start pt-8 pl-4 space-y-2 pointer-events-none">
        <Gear size={180} className="opacity-90" />
        <Gear size={140} className="opacity-70 -ml-8" reverse />
        <Gear size={100} className="opacity-80 ml-4" />
        <Gear size={120} className="opacity-60 -ml-4 mt-8" reverse />
        <Gear size={90} className="opacity-75 ml-8" />
      </div>
      
      {/* Right Side Gears - No overlap with center content */}
      <div className="absolute right-0 top-0 bottom-0 w-64 flex flex-col justify-start pt-8 pr-4 space-y-2 pointer-events-none items-end">
        <Gear size={200} className="opacity-90" reverse />
        <Gear size={160} className="opacity-70 -mr-8" />
        <Gear size={120} className="opacity-80 mr-4" reverse />
        <Gear size={140} className="opacity-60 -mr-4 mt-8" />
        <Gear size={95} className="opacity-75 mr-8" reverse />
      </div>

      {/* Main Content - Centered, no gear overlap */}
      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-8">
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
          <div className="w-full max-w-3xl h-16 bg-primary rounded-full border-4 border-primary/30 shadow-lg flex items-center px-6">
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

        {/* Link Buttons - Horizontal row matching reference design */}
        <div className="flex justify-center gap-4">
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