
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 50);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="text-5xl md:text-7xl font-serif font-bold text-primary animate-fadeIn">
        Andolini's
      </div>
      
      <div className="w-64 h-1 bg-gray-200 rounded-full mt-8 overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground font-light tracking-widest">
        AUTHENTIC ITALIAN CUISINE
      </div>
    </div>
  );
};

export default LoadingScreen;
