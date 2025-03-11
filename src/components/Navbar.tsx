
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Contact", path: "/contact" },
  ];
  
  return (
    <header 
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20">
          <Link 
            to="/" 
            className="text-2xl md:text-3xl font-serif font-bold text-primary"
          >
            Andolini's
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium tracking-wider transition-colors hover:text-primary",
                  location.pathname === link.path 
                    ? "text-primary" 
                    : scrolled ? "text-muted-foreground" : "text-white"
                )}
              >
                {link.name.toUpperCase()}
              </Link>
            ))}
            
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white ml-4">
              <Link to="/contact">Reservations</Link>
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className={cn("md:hidden", scrolled ? "text-primary" : "text-white")}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full bg-white">
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMenu}
              className="text-primary"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col items-center space-y-8 mt-16">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-lg font-medium tracking-wider transition-colors",
                  location.pathname === link.path 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
            
            <Button className="mt-4 bg-primary hover:bg-primary/90 text-white w-1/2">
              <Link to="/contact">Reservations</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
