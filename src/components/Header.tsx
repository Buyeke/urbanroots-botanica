
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Home } from "lucide-react";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="py-3 px-4 md:py-4 md:px-6 lg:px-10 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary">
          <Leaf className="h-6 w-6 md:h-8 md:w-8" />
          <span className="hidden xs:block">Urban Roots</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 items-center">
          <Button asChild variant="ghost" size="sm">
            <Link to="/" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </Button>
          <Link to="/shop" className="text-foreground hover:text-primary transition-colors font-medium text-sm">Shop</Link>
          <Link to="/products" className="text-foreground hover:text-primary transition-colors text-sm">Products</Link>
          <Link to="/blog" className="text-foreground hover:text-primary transition-colors text-sm">Blog</Link>
          <Link to="/careers" className="text-foreground hover:text-primary transition-colors text-sm">Careers</Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors text-sm">Contact</Link>
          <Button asChild variant="outline" size="sm">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/join-waitlist">Join Waitlist</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="sm:hidden">
            <Link to="/">
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
