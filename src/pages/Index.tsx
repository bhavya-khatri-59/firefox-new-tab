import { useState, useEffect, useRef } from "react";
import Gear from "@/components/Gear";
import LinkButton from "@/components/LinkButton";
import SteampunkClock from "@/components/SteampunkClock";
import { Input } from "@/components/ui/input";
import parchmentBg from "@/assets/parchment-bg-2.jpg";

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
  
  const gearSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    gearSoundRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAf4CAgICAgICAgH+AgH9/gIB/gH+Af4B/f4B/f39/f39/f39+f35/fn9+fn5+fn5+fn1+fX59fn19fX19fX18fXx9fHx8fHx8e3x7fHt8e3t7e3t6e3p7ent6enp6enl6eXp5enl5eXl5eHl4eXh5eHh4eHh3eHd4d3h3d3d3dnd2d3Z3dnZ2dnZ1dnV2dXV1dXV0dXR1dHR0dHRzdHN0c3NzczNyc3JzcnJycnFycXJxcXFxcHFwcXBwcHBvb3Bvb29vbm5vbm5ubm1tbW1sbWxsbGxra2trawA=');
  }, []);

  const playGearSound = () => {
    if (gearSoundRef.current) {
      gearSoundRef.current.currentTime = 0;
      gearSoundRef.current.volume = 0.3;
      gearSoundRef.current.play().catch(() => {});
    }
  };

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
    localStorage.setItem("firefox-links", JSON.stringify(newLinks));
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
      <Gear size={120} className="top-8 left-8 opacity-85" onClick={playGearSound} />
      <Gear size={90} className="top-24 left-24 opacity-70" reverse onClick={playGearSound} />
      <Gear size={70} className="top-48 left-12 opacity-80" onClick={playGearSound} />
      <Gear size={100} className="top-72 left-28 opacity-65" reverse onClick={playGearSound} />
      <Gear size={80} className="bottom-64 left-16 opacity-75" onClick={playGearSound} />
      <Gear size={95} className="bottom-48 left-32 opacity-70" reverse onClick={playGearSound} />
      <Gear size={75} className="bottom-32 left-20 opacity-80" onClick={playGearSound} />
      <Gear size={110} className="bottom-12 left-12 opacity-85" reverse onClick={playGearSound} />
      
      {/* Right Side Gears - Fixed positions, spinning in place */}
      <Gear size={130} className="top-4 right-12 opacity-85" reverse onClick={playGearSound} />
      <Gear size={95} className="top-28 right-24 opacity-70" onClick={playGearSound} />
      <Gear size={75} className="top-52 right-16 opacity-80" reverse onClick={playGearSound} />
      <Gear size={105} className="top-76 right-32 opacity-65" onClick={playGearSound} />
      <Gear size={85} className="bottom-64 right-20 opacity-75" reverse onClick={playGearSound} />
      <Gear size={100} className="bottom-48 right-28 opacity-70" onClick={playGearSound} />
      <Gear size={70} className="bottom-32 right-18 opacity-80" reverse onClick={playGearSound} />
      <Gear size={120} className="bottom-8 right-16 opacity-85" onClick={playGearSound} />

      {/* Main Content - Centered, no gear overlap */}
      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-8 -mt-24">
        {/* Clock */}
        <div className="flex justify-center mb-4">
          <SteampunkClock />
        </div>
        
        {/* Title */}
        <div className="text-center">
          {isEditingTitle ? (
            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              className="!text-7xl font-bold text-center bg-transparent border-none text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 h-auto"
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
                    // Use browser's default search engine (works when loaded as Firefox extension)
                    const browserAPI = (window as any).browser;
                    if (browserAPI?.search?.search) {
                      // Use default search engine in current tab
                      browserAPI.search.search({ 
                        query, 
                        engine: undefined // undefined = default search engine
                      });
                    } else {
                      // Fallback for preview/non-extension context - open in current tab to avoid security warning
                      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                    }
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
