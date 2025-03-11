
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock } from "lucide-react";

const ContactPage = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [guests, setGuests] = useState<number>(2);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  
  const timeSlots = [
    "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", 
    "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
  ];
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // For reservation
    if (date && time) {
      toast({
        title: "Reservation request sent!",
        description: `We've received your reservation request for ${format(date, "PPP")} at ${time} for ${guests} guests. We'll contact you shortly to confirm.`,
      });
    } else {
      // For general contact
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you as soon as possible.",
      });
    }
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setDate(undefined);
    setTime(undefined);
    setGuests(2);
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')", 
            filter: "brightness(0.5)" 
          }}
        />
        
        <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Contact & Reservations</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Get in touch with us or book your table for an unforgettable dining experience.
          </p>
        </div>
      </section>
      
      {/* Contact & Reservation Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8 animate-slideInLeft">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6">Make a Reservation</h2>
                <p className="text-muted-foreground mb-8">
                  Reserve your table online and we'll confirm your booking shortly. For parties 
                  larger than 8, please call us directly.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="(212) 555-1234"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !time && "text-muted-foreground"
                            )}
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            {time || "Select time"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-0">
                          <div className="grid max-h-[300px] overflow-y-auto p-2">
                            {timeSlots.map((slot) => (
                              <Button
                                key={slot}
                                variant="ghost"
                                className={cn(
                                  "justify-start font-normal",
                                  time === slot && "bg-primary text-primary-foreground"
                                )}
                                onClick={() => {
                                  setTime(slot);
                                  document.body.click(); // Close popover
                                }}
                              >
                                {slot}
                              </Button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="guests" className="text-sm font-medium">
                        Guests
                      </label>
                      <div className="flex">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="rounded-r-none"
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          disabled={guests <= 1}
                        >
                          -
                        </Button>
                        <div className="flex-1 flex items-center justify-center border-y border-input">
                          {guests}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="rounded-l-none"
                          onClick={() => setGuests(Math.min(12, guests + 1))}
                          disabled={guests >= 12}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Special Requests
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Any special requests or dietary requirements..."
                      rows={4}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                    {date && time ? "Request Reservation" : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
            
            <div className="space-y-10 animate-slideInRight">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-muted p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        123 Pasta Street<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-muted p-3 rounded-full">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground">(212) 555-1234</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-muted p-3 rounded-full">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Opening Hours</h3>
                      <ul className="text-muted-foreground space-y-1">
                        <li>Monday - Thursday: 11:30 AM - 10:00 PM</li>
                        <li>Friday - Saturday: 11:30 AM - 11:00 PM</li>
                        <li>Sunday: 12:00 PM - 9:00 PM</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="h-80 rounded-lg overflow-hidden shadow-md">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425872427956!3d40.74076654379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sManhattan%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1631045490000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  title="Restaurant location"
                ></iframe>
              </div>
              
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="text-xl font-serif font-bold mb-4">Private Events</h3>
                <p className="text-muted-foreground mb-4">
                  Andolini's offers a private dining room for special events, business dinners, 
                  and celebrations. Our events team will work with you to create a custom menu 
                  and experience.
                </p>
                <div className="text-primary font-medium">
                  For private event inquiries, please contact our Events Coordinator:
                </div>
                <div className="text-muted-foreground">
                  events@andolinis.com | (212) 555-1235
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-8 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-serif font-bold mb-2">Do you take walk-ins?</h3>
              <p className="text-muted-foreground">
                Yes, we accept walk-in guests, but reservations are recommended, especially for dinner and weekends.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-serif font-bold mb-2">Is there a dress code?</h3>
              <p className="text-muted-foreground">
                We suggest smart casual attire. While we don't enforce a strict dress code, we appreciate guests who dress for the occasion.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-serif font-bold mb-2">Do you cater for special dietary requirements?</h3>
              <p className="text-muted-foreground">
                Yes, we offer vegetarian, gluten-free, and vegan options. Please inform us of any dietary requirements when making your reservation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-serif font-bold mb-2">Is there parking available?</h3>
              <p className="text-muted-foreground">
                We don't have our own parking, but there are several public parking garages within a block of the restaurant.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
