
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { BarChart3, Leaf, Users, TrendingUp, CheckCircle } from "lucide-react";

const ProductsPage = () => {
  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Real-time Monitoring",
      description: "Track soil moisture, temperature, and nutrient levels in real-time"
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "AI Crop Analysis",
      description: "Machine learning algorithms predict optimal harvest times and detect diseases"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Yield Optimization",
      description: "Data-driven insights to maximize crop yield and minimize waste"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Support",
      description: "Connect with other farmers and access expert agricultural advice"
    }
  ];

  const useCases = [
    {
      title: "Small-Scale Farmers",
      description: "Perfect for individual farmers looking to modernize their operations",
      benefits: ["Reduced water usage by 30%", "Increased yield by 25%", "Early disease detection"]
    },
    {
      title: "Agricultural Cooperatives",
      description: "Scale solutions across multiple farms and communities",
      benefits: ["Centralized monitoring", "Bulk resource optimization", "Shared knowledge base"]
    },
    {
      title: "Training Centers",
      description: "Educational institutions teaching modern farming techniques",
      benefits: ["Hands-on learning tools", "Real-world data", "Skill development programs"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-10 bg-gradient-to-br from-primary/10 to-secondary/20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Revolutionary AgriTech Solutions
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transform your farming with our IoT-enabled tools and AI-powered insights. 
            Sustainable agriculture that empowers communities and maximizes yields.
          </p>
          <Button asChild size="lg">
            <Link to="/join-waitlist">Get Early Access</Link>
          </Button>
        </div>
      </section>

      {/* Product Overview */}
      <section className="py-16 px-6 md:px-10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">Smart Farming Ecosystem</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our comprehensive platform combines hardware sensors, cloud analytics, and mobile applications 
                to give farmers unprecedented control over their crops.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>IoT sensors for soil and environmental monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>AI-powered crop health analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Mobile app for remote farm management</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Community platform for knowledge sharing</span>
                </div>
              </div>
            </div>
            <div className="bg-secondary/20 rounded-lg p-8 text-center">
              <div className="h-64 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-24 w-24 text-primary" />
              </div>
              <p className="text-muted-foreground">Product demo and screenshots coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 md:px-10 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">Key Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every feature designed with farmers in mind, built for sustainability and ease of use.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center text-primary mb-2">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-6 md:px-10">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">Use Cases</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our solutions adapt to different farming contexts and community needs.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{useCase.title}</CardTitle>
                  <CardDescription>{useCase.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {useCase.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 md:px-10 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">What Farmers Say</h2>
            <p className="text-lg text-muted-foreground">
              Real stories from our community of forward-thinking farmers.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <blockquote className="text-muted-foreground mb-4">
                  "Urban Roots has transformed how I manage my farm. The real-time insights have helped me reduce water usage while increasing my harvest yield significantly."
                </blockquote>
                <div className="flex items-center gap-2">
                  <div>
                    <div className="font-semibold">Rebekah Moraa</div>
                    <div className="text-sm text-muted-foreground">Small-scale farmer, Mwakirunge</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <blockquote className="text-muted-foreground mb-4">
                  "The AI crop monitoring caught a disease outbreak early, saving our entire season. This technology is a game-changer for sustainable farming."
                </blockquote>
                <div className="flex items-center gap-2">
                  <div>
                    <div className="font-semibold">Abdi Mkonge</div>
                    <div className="text-sm text-muted-foreground">Small-scale farmer, Mombasa</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <blockquote className="text-muted-foreground mb-4">
                  "As part of their training program, I learned modern farming techniques that have opened up new opportunities for me. Urban Roots truly empowers women in agriculture."
                </blockquote>
                <div className="flex items-center gap-2">
                  <div>
                    <div className="font-semibold">Aisha Mdoe</div>
                    <div className="text-sm text-muted-foreground">Trainee, Urban Roots</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 md:px-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary">Ready to Revolutionize Your Farm?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of farmers already using Urban Roots to grow smarter, more sustainably.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/join-waitlist">Get Early Access</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Schedule Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
