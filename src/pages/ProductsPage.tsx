
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { BarChart3, Leaf, Users, TrendingUp, CheckCircle, Play, Download, Handshake, UserPlus, Droplet, Sun, AlertTriangle, Globe } from "lucide-react";

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

      {/* Dashboard Demo Section */}
      <section className="py-16 px-6 md:px-10">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">See Urban Roots in Action</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
              See how Urban Roots empowers farmers with data-driven insights — no login needed. 
              Click below to explore our climate-resilient farming dashboard.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary">Deep Tech for Marginalized Women Farmers</h3>
              <p className="text-muted-foreground">
                Our AI-powered platform combines IoT sensors, satellite data, and machine learning 
                to deliver climate-resilient farming insights directly to smallholder farmers.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Droplet className="h-5 w-5 text-primary" />
                  <span>Real-time soil moisture monitoring across multiple plots</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sun className="h-5 w-5 text-warning" />
                  <span>AI-generated planting window recommendations</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <span>Proactive alerts for irrigation and crop health</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-accent" />
                  <span>Multilingual support (Swahili, English, French)</span>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="mt-6">
                    <Play className="mr-2 h-5 w-5" />
                    Try the Dashboard
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Urban Roots AI Dashboard Preview</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Simulated Dashboard Interface */}
                    <div className="bg-card rounded-lg p-6 border">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold">Farm Overview</h4>
                        <Badge variant="secondary" className="bg-success/20 text-success-foreground">
                          Live Data
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-primary/10 p-4 rounded-lg text-center">
                          <Droplet className="h-8 w-8 text-primary mx-auto mb-2" />
                          <div className="text-2xl font-bold text-primary">72%</div>
                          <div className="text-sm text-muted-foreground">Soil Moisture</div>
                        </div>
                        <div className="bg-warning/10 p-4 rounded-lg text-center">
                          <Sun className="h-8 w-8 text-warning mx-auto mb-2" />
                          <div className="text-2xl font-bold text-warning">24°C</div>
                          <div className="text-sm text-muted-foreground">Temperature</div>
                        </div>
                        <div className="bg-success/10 p-4 rounded-lg text-center">
                          <TrendingUp className="h-8 w-8 text-success mx-auto mb-2" />
                          <div className="text-2xl font-bold text-success">85%</div>
                          <div className="text-sm text-muted-foreground">Crop Health</div>
                        </div>
                        <div className="bg-accent/10 p-4 rounded-lg text-center">
                          <Leaf className="h-8 w-8 text-accent mx-auto mb-2" />
                          <div className="text-2xl font-bold text-accent">5</div>
                          <div className="text-sm text-muted-foreground">Active Plots</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                            <span className="font-semibold text-destructive">Irrigation Alert</span>
                          </div>
                          <p className="text-sm">Low soil moisture detected in Plot 2. Recommend irrigation within 12 hours for optimal maize growth.</p>
                        </div>
                        
                        <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="h-5 w-5 text-success" />
                            <span className="font-semibold text-success">Planting Recommendation</span>
                          </div>
                          <p className="text-sm">Weather conditions optimal for cassava planting in Plot 4. Recommended planting window: Next 3-5 days.</p>
                        </div>

                        <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="h-5 w-5 text-accent" />
                            <span className="font-semibold text-accent">Training Available</span>
                          </div>
                          <p className="text-sm">New sustainable farming techniques video available. Access training materials in your preferred language.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/30 rounded-2xl p-8">
                <div className="bg-card rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Dashboard Preview</h4>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-destructive rounded-full"></div>
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                      <span className="text-sm">Plot 1 - Maize</span>
                      <Badge variant="secondary" className="bg-success/20 text-success-foreground">Healthy</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                      <span className="text-sm">Plot 2 - Beans</span>
                      <Badge variant="secondary" className="bg-warning/20 text-warning-foreground">Low Moisture</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                      <span className="text-sm">Plot 3 - Cassava</span>
                      <Badge variant="secondary" className="bg-success/20 text-success-foreground">Optimal</Badge>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium">Today's Insights</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Weather forecast shows 60% chance of rain. Delay fertilizer application by 2 days.
                    </p>
                  </div>
                </div>
              </div>
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
          <h2 className="text-3xl font-bold mb-4 text-primary">Ready to Transform Agriculture?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the climate-resilient farming revolution. Partner with us to scale deep tech solutions for marginalized communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/join-waitlist">
                <UserPlus className="mr-2 h-5 w-5" />
                Join the Waitlist
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                <Handshake className="mr-2 h-5 w-5" />
                Partner With Us
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#" onClick={(e) => e.preventDefault()}>
                <Download className="mr-2 h-5 w-5" />
                Download Demo Brief
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
