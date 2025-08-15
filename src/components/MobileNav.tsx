
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Leaf, 
  Menu, 
  Home, 
  ShoppingBag, 
  Package, 
  BookOpen, 
  Briefcase, 
  Mail, 
  LogIn,
  UserPlus
} from "lucide-react";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/shop", label: "Shop", icon: ShoppingBag },
    { href: "/products", label: "Products", icon: Package },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/careers", label: "Careers", icon: Briefcase },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-8">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Urban Roots</span>
          </div>
          
          <nav className="flex-1 space-y-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive(href)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="space-y-3 pt-6 border-t">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/login" onClick={() => setOpen(false)}>
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button asChild className="w-full justify-start">
              <Link to="/join-waitlist" onClick={() => setOpen(false)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Join Waitlist
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
