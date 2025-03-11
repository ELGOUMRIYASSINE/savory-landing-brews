import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Menu data
const menuItems = {
  appetizers: [
    {
      id: 1,
      name: "Bruschetta",
      description: "Toasted bread topped with fresh tomatoes, garlic, basil, and olive oil",
      price: 9.95,
      image: "https://images.unsplash.com/photo-1506280754576-f6fa8a873550?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["vegetarian"],
    },
    {
      id: 2,
      name: "Caprese Salad",
      description: "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze",
      price: 12.95,
      image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["vegetarian", "gluten-free"],
    },
    {
      id: 3,
      name: "Antipasto Platter",
      description: "Selection of Italian cured meats, cheeses, and marinated vegetables",
      price: 16.95,
      image: "https://images.unsplash.com/photo-1626200909510-3975d7a3fb85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["gluten-free"],
    },
    {
      id: 4,
      name: "Calamari Fritti",
      description: "Crispy fried calamari served with marinara sauce and lemon wedges",
      price: 14.95,
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ],
  mains: [
    {
      id: 5,
      name: "Spaghetti Carbonara",
      description: "Classic Roman pasta with eggs, pecorino cheese, guanciale, and black pepper",
      price: 18.95,
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      name: "Margherita Pizza",
      description: "Traditional Neapolitan pizza with tomato sauce, mozzarella, and fresh basil",
      price: 16.95,
      image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["vegetarian"],
    },
    {
      id: 7,
      name: "Osso Buco",
      description: "Braised veal shanks with vegetables, white wine, and gremolata, served with risotto",
      price: 32.95,
      image: "https://images.unsplash.com/photo-1525184438-4a7b22a9fd2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["gluten-free"],
    },
    {
      id: 8,
      name: "Seafood Risotto",
      description: "Creamy Arborio rice with a variety of fresh seafood, white wine, and herbs",
      price: 28.95,
      image: "https://images.unsplash.com/photo-1624726175512-8ccda36a615e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["gluten-free"],
    },
  ],
  desserts: [
    {
      id: 9,
      name: "Tiramisu",
      description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
      price: 8.95,
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["vegetarian"],
    },
    {
      id: 10,
      name: "Panna Cotta",
      description: "Silky vanilla cream dessert topped with seasonal berry compote",
      price: 7.95,
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["vegetarian", "gluten-free"],
    },
    {
      id: 11,
      name: "Cannoli",
      description: "Crispy pastry tubes filled with sweet ricotta cream and chocolate chips",
      price: 6.95,
      image: "https://images.unsplash.com/photo-1636743715220-d5a31de8aa7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["vegetarian"],
    },
    {
      id: 12,
      name: "Gelato Selection",
      description: "Three scoops of house-made gelato, ask your server for today's flavors",
      price: 9.95,
      image: "https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["vegetarian", "gluten-free"],
    },
  ],
  drinks: [
    {
      id: 13,
      name: "Italian Wine Selection",
      description: "Curated selection of fine Italian wines, ask your server for recommendations",
      price: "varies",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["alcoholic"],
    },
    {
      id: 14,
      name: "Espresso",
      description: "Traditional Italian coffee served in a small cup",
      price: 3.95,
      image: "https://images.unsplash.com/photo-1606791405792-1004f1d8e0a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["vegetarian", "gluten-free"],
    },
    {
      id: 15,
      name: "Aperol Spritz",
      description: "Classic Italian aperitif with Aperol, Prosecco, and soda water",
      price: 10.95,
      image: "https://images.unsplash.com/photo-1560512823-829485b8bf22?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["alcoholic"],
    },
    {
      id: 16,
      name: "San Pellegrino Sparkling Water",
      description: "Premium Italian sparkling mineral water (500ml)",
      price: 4.95,
      image: "https://images.unsplash.com/photo-1605188229570-0c1ac3ab2d7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["vegetarian", "gluten-free"],
    },
  ],
};

type MenuCategory = "appetizers" | "mains" | "desserts" | "drinks";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("appetizers");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    // Reset scroll position when changing tabs
    window.scrollTo(0, 0);
    
    // Add animation to menu items with a slight delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-slideUp");
              entry.target.style.opacity = "1";
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      itemRefs.current.forEach((ref) => {
        if (ref) {
          observer.observe(ref);
        }
      });
      
      return () => {
        itemRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      };
    }, 100);
    
    return () => clearTimeout(timer);
  }, [activeCategory]);
  
  const toggleItemSelection = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };
  
  const filteredItems = filter
    ? menuItems[activeCategory].filter((item) => item.tags?.includes(filter))
    : menuItems[activeCategory];
  
  const renderMenuItems = (items: typeof filteredItems) => {
    return items.map((item, index) => (
      <div
        key={item.id}
        ref={(el) => (itemRefs.current[index] = el)}
        className="border rounded-lg overflow-hidden flex flex-col md:flex-row opacity-0 transition-all duration-300"
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className="h-48 md:h-auto md:w-1/3">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 flex flex-col justify-between md:w-2/3">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-serif font-bold">{item.name}</h3>
              <div className="font-medium text-primary">${item.price}</div>
            </div>
            <p className="text-muted-foreground mb-4">{item.description}</p>
            <div className="flex space-x-2 mb-4">
              {item.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-secondary text-xs rounded-full text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Button
            variant={selectedItems.includes(item.id) ? "default" : "outline"}
            size="sm"
            className={selectedItems.includes(item.id) ? "bg-primary text-white" : ""}
            onClick={() => toggleItemSelection(item.id)}
          >
            {selectedItems.includes(item.id) ? "Added to Order" : "Add to Order"}
          </Button>
        </div>
      </div>
    ));
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')", 
            filter: "brightness(0.6)" 
          }}
        />
        
        <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Our Menu</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Indulge in authentic Italian flavors crafted with passion and the finest ingredients.
          </p>
        </div>
      </section>
      
      {/* Menu Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <Tabs 
            defaultValue="appetizers" 
            value={activeCategory}
            onValueChange={(value) => setActiveCategory(value as MenuCategory)}
            className="w-full"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
              <TabsList className="mb-6 md:mb-0">
                <TabsTrigger value="appetizers">Appetizers</TabsTrigger>
                <TabsTrigger value="mains">Main Course</TabsTrigger>
                <TabsTrigger value="desserts">Desserts</TabsTrigger>
                <TabsTrigger value="drinks">Drinks</TabsTrigger>
              </TabsList>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className={cn(
                    filter === "vegetarian" ? "bg-primary text-white" : ""
                  )}
                  onClick={() => setFilter(filter === "vegetarian" ? null : "vegetarian")}
                >
                  Vegetarian
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={cn(
                    filter === "gluten-free" ? "bg-primary text-white" : ""
                  )}
                  onClick={() => setFilter(filter === "gluten-free" ? null : "gluten-free")}
                >
                  Gluten Free
                </Button>
                {filter && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setFilter(null)}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
            
            <TabsContent value="appetizers" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {renderMenuItems(filteredItems)}
              </div>
            </TabsContent>
            
            <TabsContent value="mains" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {renderMenuItems(filteredItems)}
              </div>
            </TabsContent>
            
            <TabsContent value="desserts" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {renderMenuItems(filteredItems)}
              </div>
            </TabsContent>
            
            <TabsContent value="drinks" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {renderMenuItems(filteredItems)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Order Summary Section */}
      {selectedItems.length > 0 && (
        <section className="py-8 px-4 md:px-8 bg-muted">
          <div className="container mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-serif font-bold mb-4">Your Order</h2>
              <div className="space-y-4 mb-6">
                {Object.keys(menuItems).map((category) => 
                  menuItems[category as MenuCategory]
                    .filter((item) => selectedItems.includes(item.id))
                    .map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.description.substring(0, 60)}...</div>
                        </div>
                        <div className="flex items-center">
                          <div className="font-medium text-primary mr-4">${item.price}</div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-destructive"
                            onClick={() => toggleItemSelection(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))
                )}
              </div>
              <div className="flex justify-between border-t pt-4">
                <div className="text-lg font-medium">Total</div>
                <div className="text-lg font-bold text-primary">
                  $
                  {selectedItems
                    .reduce((total, id) => {
                      const item = 
                        [...menuItems.appetizers, ...menuItems.mains, ...menuItems.desserts, ...menuItems.drinks]
                          .find((item) => item.id === id);
                      return typeof item?.price === "number" ? total + item.price : total;
                    }, 0)
                    .toFixed(2)}
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-white">
                  Proceed to Checkout
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setSelectedItems([])}>
                  Clear Order
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Special Dietary Needs Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="bg-secondary rounded-lg p-8">
            <h2 className="text-2xl font-serif font-bold mb-4">Dietary Accommodations</h2>
            <p className="text-muted-foreground mb-6">
              At Andolini's, we understand the importance of accommodating different dietary needs. 
              Many of our dishes can be adapted to suit various requirements. Please inform your 
              server of any allergies or dietary restrictions when ordering.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-serif font-bold mb-2">Vegetarian Options</h3>
                <p className="text-muted-foreground">
                  We offer a wide range of vegetarian dishes, from classic pasta and pizza to seasonal vegetable specials.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-serif font-bold mb-2">Gluten-Free Options</h3>
                <p className="text-muted-foreground">
                  Many of our dishes can be prepared with gluten-free alternatives, including our house-made pasta.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-serif font-bold mb-2">Special Requests</h3>
                <p className="text-muted-foreground">
                  Our chefs are happy to accommodate special requests where possible. Please ask your server.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MenuPage;
