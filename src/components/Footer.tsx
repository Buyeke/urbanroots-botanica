
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Leaf, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] py-6 px-6 md:px-10 transition-colors duration-300"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-[hsl(var(--primary))] mb-3"
          >
            <Leaf className="h-7 w-7" />
            <span>Urban Roots</span>
          </Link>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Empowering communities through sustainable agriculture and technology.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-base">Quick Links</h3>
          <ul className="space-y-1 text-xs">
            <li>
              <Link to="/about" className="hover:text-[hsl(var(--primary))] transition-colors">About Us</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-[hsl(var(--primary))] transition-colors">Products</Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-[hsl(var(--primary))] transition-colors">Blog</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[hsl(var(--primary))] transition-colors">Contact</Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-[hsl(var(--primary))] transition-colors">Careers</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-base">Newsletter</h3>
          <p className="text-xs mb-1 text-[hsl(var(--muted-foreground))]">Stay updated with our latest news and offers.</p>
          <div className="flex gap-2 mb-4">
            <Input type="email" placeholder="Enter your email" className="bg-background h-8 text-xs px-2" />
            <Button type="submit" variant="default" className="h-8 text-xs px-3">Subscribe</Button>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-base">Follow Us</h3>
            <div className="flex space-x-3">
              <a href="#" aria-label="Facebook" className="hover:text-[hsl(var(--primary))] transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-[hsl(var(--primary))] transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-[hsl(var(--primary))] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-[hsl(var(--primary))] transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-6 pt-4 border-t border-[hsl(var(--sidebar-border))] text-center text-xs">
        <p>
          &copy; {new Date().getFullYear()} Urban Roots. All rights reserved.
        </p>
        <div className="mt-1 space-x-4">
          <Link to="/terms" className="hover:text-[hsl(var(--primary))] transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-[hsl(var(--primary))] transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
