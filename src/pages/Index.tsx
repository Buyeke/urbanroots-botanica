
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Leaf, Users, TrendingUp, Heart, Sprout, BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-10 bg-gradient-to-br from-primary/10 to-secondary/20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
            Empowering Women Through<br />
            <span className="text-foreground">Sustainable Agriculture</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Urban Roots combines cutting-edge agritech with social impact, donating 10% of profits 
            to train marginalized women with skills for financial independence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link to="/join-waitlist">Join Waitlist</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link to="/contact">Invest in Us</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-lg px-8 py-3">
              <Link to="/products">Explore Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 md:px-10">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Technology meets purpose. Agriculture meets empowerment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Sprout className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Smart Agriculture</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  IoT-enabled farming tools and AI-powered crop monitoring for sustainable, efficient farming.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Social Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Empowering marginalized communities, especially women, with skills and opportunities for financial independence.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>10% Promise</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We donate 10% of our profits to training programs that equip women with valuable skills and resources.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-6 md:px-10 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Making a Difference</h2>
            <p className="text-lg text-muted-foreground">
              Our impact grows with every partnership and every innovation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Women Trained</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Farming Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">$50K+</div>
              <div className="text-muted-foreground">Donated to Training</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Crop Yield Improvement</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Ready to Grow with Us?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our mission to revolutionize agriculture while empowering communities. 
            Whether you're a farmer, investor, or changemaker, there's a place for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/join-waitlist">Join Our Waitlist</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Partner with Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
