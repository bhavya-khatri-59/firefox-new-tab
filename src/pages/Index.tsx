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
      {/* Left Side Gears - Fixed positions, spinning in place */}
      <Gear size={120} className="top-8 left-8 opacity-85" />
      <Gear size={90} className="top-24 left-24 opacity-70" reverse />
      <Gear size={70} className="top-48 left-12 opacity-80" />
      <Gear size={100} className="top-72 left-28 opacity-65" reverse />
      <Gear size={80} className="bottom-64 left-16 opacity-75" />
      <Gear size={95} className="bottom-48 left-32 opacity-70" reverse />
      <Gear size={75} className="bottom-32 left-20 opacity-80" />
      <Gear size={110} className="bottom-12 left-12 opacity-85" reverse />
      
      {/* Right Side Gears - Fixed positions, spinning in place */}
      <Gear size={130} className="top-4 right-12 opacity-85" reverse />
      <Gear size={95} className="top-28 right-24 opacity-70" />
      <Gear size={75} className="top-52 right-16 opacity-80" reverse />
      <Gear size={105} className="top-76 right-32 opacity-65" />
      <Gear size={85} className="bottom-64 right-20 opacity-75" reverse />
      <Gear size={100} className="bottom-48 right-28 opacity-70" />
      <Gear size={70} className="bottom-32 right-18 opacity-80" reverse />
      <Gear size={120} className="bottom-8 right-16 opacity-85" />

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
