
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Users, Bell, Gift, TrendingUp } from "lucide-react";

const JoinWaitlistPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    farmSize: "",
    location: "",
    currentChallenges: "",
    interests: [] as string[],
    updates: true
  });
  const { toast } = useToast();

  const interestOptions = [
    "IoT Soil Monitoring",
    "AI Crop Analysis", 
    "Weather Predictions",
    "Pest Detection",
    "Yield Optimization",
    "Community Training Programs",
    "Financial Independence Programs",
    "Sustainable Farming Practices"
  ];

  const benefits = [
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Early Access",
      description: "Be among the first to use our revolutionary farming tools"
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: "Special Pricing",
      description: "Exclusive discounts for early adopters and community members"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Access",
      description: "Join our network of innovative farmers and agricultural experts"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Impact Reports",
      description: "Regular updates on how we're empowering women in agriculture"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Welcome to the waitlist!",
      description: "Thank you for joining our mission. We'll keep you updated on our progress.",
    });
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      farmSize: "",
      location: "",
      currentChallenges: "",
      interests: [],
      updates: true
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest]
      });
    } else {
      setFormData({
        ...formData,
        interests: formData.interests.filter(i => i !== interest)
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-10 bg-gradient-to-br from-primary/10 to-secondary/20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Join the Future of Farming
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Be part of a revolutionary movement that combines cutting-edge agriculture technology 
            with meaningful social impact. Join our waitlist for early access.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              500+ farmers already joined
            </div>
            <div className="text-primary">•</div>
            <div>Early access launching Q4 2025</div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 md:px-10 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">Why Join Our Waitlist?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Early supporters get exclusive benefits and help shape the future of sustainable agriculture.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center text-primary mb-2">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section className="py-16 px-6 md:px-10">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Join Our Waitlist</CardTitle>
              <CardDescription>
                Help us understand your needs so we can build the perfect solution for your farm.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="farmSize">Farm Size</Label>
                    <Input
                      id="farmSize"
                      name="farmSize"
                      value={formData.farmSize}
                      onChange={handleChange}
                      placeholder="e.g., 5 acres, 50 hectares"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, State/Country"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="currentChallenges">Current Farming Challenges</Label>
                  <Textarea
                    id="currentChallenges"
                    name="currentChallenges"
                    value={formData.currentChallenges}
                    onChange={handleChange}
                    placeholder="Tell us about the biggest challenges you face in farming..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label className="text-base font-medium">What interests you most? (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {interestOptions.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={formData.interests.includes(interest)}
                          onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                        />
                        <Label 
                          htmlFor={interest} 
                          className="text-sm font-normal cursor-pointer"
                        >
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="updates"
                    checked={formData.updates}
                    onCheckedChange={(checked) => setFormData({...formData, updates: checked as boolean})}
                  />
                  <Label htmlFor="updates" className="text-sm">
                    I'd like to receive updates about Urban Roots' progress and impact stories
                  </Label>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Join Waitlist
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  By joining our waitlist, you agree to our terms of service and privacy policy. 
                  We'll never share your information with third parties.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 md:px-10 bg-secondary/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-primary">Join Farmers Worldwide</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Farmers on waitlist</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Countries represented</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">75%</div>
              <div className="text-muted-foreground">Small-scale farmers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinWaitlistPage;
