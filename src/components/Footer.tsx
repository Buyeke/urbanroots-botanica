
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Leaf, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 px-6 md:px-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary mb-4">
            <Leaf className="h-8 w-8" />
            <span>Urban Roots</span>
          </Link>
          <p className="text-sm">Empowering communities through sustainable agriculture and technology.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/products" className="hover:text-primary transition-colors">Products</Link></li>
            <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-lg">Newsletter</h3>
          <p className="text-sm mb-2">Stay updated with our latest news and offers.</p>
          <div className="flex gap-2">
            <Input type="email" placeholder="Enter your email" className="bg-background" />
            <Button type="submit" variant="default">Subscribe</Button>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-3 text-lg">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-primary transition-colors"><Facebook /></a>
              <a href="#" aria-label="Twitter" className="hover:text-primary transition-colors"><Twitter /></a>
              <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors"><Instagram /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors"><Linkedin /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-8 border-t border-primary/20 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Urban Roots. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

