import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [hasError, setHasError] = useState(false);

  // Example: check if required data exists
  useEffect(() => {
    try {
      // If something fails:
      // throw new Error("Missing data");
    } catch (e) {
      setHasError(true);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {hasError ? <NotFound /> : <Index />}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
