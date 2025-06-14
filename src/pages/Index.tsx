
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Leaf, TrendingUp, Users, Handshake } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-secondary py-20 md:py-32">
        <div className="container mx-auto text-center px-6">
          <Leaf className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary-foreground leading-tight">
            Cultivating Change with Agritech, Empowering Communities.
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-3xl mx-auto">
            Urban Roots is pioneering sustainable agriculture through innovative technology,
            with a social mission to empower women and marginalized groups towards financial independence.
            We donate 10% of our profits to training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/join-waitlist">Join Waitlist</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
              <Link to="/invest">Invest in Us</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-primary hover:bg-primary/10">
              <Link to="/our-work">Explore Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Placeholder for other sections like Features, Impact, etc. */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Why Urban Roots?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-card">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Innovative Tech</h3>
              <p className="text-muted-foreground">Cutting-edge IoT and AI solutions for modern farming.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-card">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Social Impact</h3>
              <p className="text-muted-foreground">Empowering women and marginalized communities.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-card">
              <Handshake className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">Sustainable Future</h3>
              <p className="text-muted-foreground">Promoting eco-friendly agricultural practices.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Placeholder for a "How it Works" or "Our Mission" section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary-foreground">Our Commitment</h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            We're dedicated to building a future where technology and agriculture create equitable opportunities and a healthier planet.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Index;

