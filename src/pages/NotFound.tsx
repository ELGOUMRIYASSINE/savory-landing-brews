
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-primary mb-6">404</h1>
        <p className="text-xl md:text-2xl text-foreground mb-4">Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          We're sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
