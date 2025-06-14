
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Home } from "lucide-react";

const Header = () => {
  return (
    <header className="py-4 px-6 md:px-10 border-b sticky top-0 bg-background/95 backdrop-blur z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <Leaf className="h-8 w-8" />
          <span>Urban Roots</span>
        </Link>
        <nav className="hidden md:flex gap-4 items-center">
          <Button asChild variant="ghost">
            <Link to="/" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </Button>
          <Link to="/products" className="text-foreground hover:text-primary transition-colors">Products</Link>
          <Link to="/blog" className="text-foreground hover:text-primary transition-colors">Blog</Link>
          <Link to="/careers" className="text-foreground hover:text-primary transition-colors">Careers</Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
          <Button asChild variant="outline">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/join-waitlist">Join Waitlist</Link>
          </Button>
        </nav>
        <div className="md:hidden flex gap-2">
          {/* Mobile Home button */}
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <Home className="h-6 w-6" />
              <span className="sr-only">Home</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Leaf className="h-6 w-6" /> {/* Replace with Menu icon later */}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
