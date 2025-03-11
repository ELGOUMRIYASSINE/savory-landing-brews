
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.8;
      
      // Check if about section is in view
      if (aboutRef.current && scrollPosition > aboutRef.current.offsetTop) {
        aboutRef.current.classList.add("animate-slideUp");
        aboutRef.current.style.opacity = "1";
      }
      
      // Check if feature items are in view
      featureRefs.current.forEach((ref) => {
        if (ref && scrollPosition > ref.offsetTop) {
          ref.classList.add("animate-fadeIn");
          ref.style.opacity = "1";
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const specialties = [
    {
      title: "Homemade Pasta",
      description: "Our pasta is made fresh daily using traditional techniques and the finest ingredients.",
      imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Wood-Fired Pizza",
      description: "Authentic Neapolitan pizzas baked in our imported wood-fired oven at 900°F.",
      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Seasonal Specials",
      description: "Chef's special dishes featuring the freshest seasonal ingredients from local farmers.",
      imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ];
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')", 
            filter: "brightness(0.6)" 
          }}
        />
        
        <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto animate-fadeIn">
          <div className="text-white mb-2 text-sm md:text-base tracking-widest">AUTHENTIC ITALIAN RESTAURANT</div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Andolini's</h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            A culinary journey through Italy, crafted with passion, tradition, and the finest ingredients.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link to="/menu">View Our Menu</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
            >
              <Link to="/contact">Make a Reservation</Link>
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-float">
          <button 
            onClick={scrollToAbout}
            aria-label="Scroll down"
            className="focus:outline-none hover:opacity-80 transition-opacity"
          >
            <ChevronDown size={36} />
          </button>
        </div>
      </section>
      
      {/* About Section */}
      <section 
        ref={aboutRef} 
        className="py-20 px-4 md:px-8 opacity-0 transition-opacity duration-1000"
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Restaurant interior" 
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-lg hidden md:flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-xl font-serif font-bold">25</div>
                    <div className="text-sm">Years of Excellence</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="text-sm text-primary font-medium tracking-wider mb-2">OUR STORY</div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">A Tradition of Italian Excellence</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Established in 1998, Andolini's brings the authentic flavors of Italy to your table. Our founder, 
                Marco Andolini, was inspired by his grandmother's recipes from the Amalfi Coast. Every dish tells 
                a story of tradition, craftsmanship, and the finest ingredients.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our chefs are trained in traditional Italian cooking methods, and we source ingredients directly 
                from Italy and local farms. From our handmade pasta to our wood-fired pizzas, each dish is crafted 
                with care and respect for Italian culinary heritage.
              </p>
              <div className="flex items-center gap-8">
                <div>
                  <div className="text-3xl font-serif font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Expert Chefs</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Italian Dishes</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-primary">5⭐</div>
                  <div className="text-sm text-muted-foreground">Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Specialties Section */}
      <section className="py-20 px-4 md:px-8 bg-muted">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm text-primary font-medium tracking-wider mb-2">OUR SPECIALTIES</div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Signature Dishes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most beloved dishes, prepared with passion and traditional Italian techniques.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialties.map((specialty, index) => (
              <div 
                key={specialty.title}
                ref={(el) => (featureRefs.current[index] = el)}
                className="bg-white rounded-lg overflow-hidden shadow-md opacity-0 transition-all duration-700 card-hover"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={specialty.imageUrl} 
                    alt={specialty.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold mb-2">{specialty.title}</h3>
                  <p className="text-muted-foreground">{specialty.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              <Link to="/menu">Explore Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Quick Info Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-8 text-center hover:border-primary transition-colors">
              <div className="flex justify-center mb-4">
                <Clock className="text-primary" size={36} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">Opening Hours</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground">Monday - Thursday: 11:30 AM - 10:00 PM</li>
                <li className="text-muted-foreground">Friday - Saturday: 11:30 AM - 11:00 PM</li>
                <li className="text-muted-foreground">Sunday: 12:00 PM - 9:00 PM</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-8 text-center hover:border-primary transition-colors">
              <div className="flex justify-center mb-4">
                <MapPin className="text-primary" size={36} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">Our Location</h3>
              <p className="text-muted-foreground mb-4">
                123 Pasta Street<br />
                New York, NY 10001
              </p>
              <p className="text-sm text-muted-foreground">
                Public parking available nearby<br />
                Accessible entrance
              </p>
            </div>
            
            <div className="border rounded-lg p-8 text-center hover:border-primary transition-colors">
              <div className="flex justify-center mb-4">
                <Phone className="text-primary" size={36} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">Reservations</h3>
              <p className="text-muted-foreground mb-4">
                For parties of 6 or more,<br />
                reservations are recommended
              </p>
              <p className="font-medium text-primary">(212) 555-1234</p>
              <p className="text-sm text-muted-foreground mt-2">
                or book online
              </p>
              <Button className="mt-4 bg-primary hover:bg-primary/90 text-white">
                <Link to="/contact">Book a Table</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-20 px-4 md:px-8 bg-secondary">
        <div className="container mx-auto text-center">
          <div className="text-sm text-primary font-medium tracking-wider mb-2">TESTIMONIALS</div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12">What Our Guests Say</h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl font-serif italic mb-8">
              "Andolini's brings back memories of my childhood in Naples. The pasta is perfectly al dente, 
              the sauces are rich and flavorful, and the service is impeccable. It's a taste of Italy 
              in the heart of New York."
            </p>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/65.jpg" 
                  alt="Customer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <div className="font-medium">Sophia Romano</div>
                <div className="text-sm text-muted-foreground">Food Critic, NYC Dining</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="bg-primary rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                Join Us for an Unforgettable Dining Experience
              </h2>
              <p className="text-white/90">
                Book your table today and enjoy authentic Italian cuisine in an elegant setting.
              </p>
            </div>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 whitespace-nowrap"
            >
              <Link to="/contact">Make a Reservation</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
