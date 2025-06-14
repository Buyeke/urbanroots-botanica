
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const CareersPage = () => {
  const jobListings = [
    {
      id: 1,
      title: "Full-Stack Developer",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      salary: "$90K - $130K",
      description: "Join our engineering team to build the future of sustainable agriculture technology. Work with React, Node.js, and IoT systems.",
      requirements: [
        "3+ years of full-stack development experience",
        "Experience with React, Node.js, and cloud platforms",
        "Interest in IoT and agricultural technology",
        "Passion for social impact and sustainability"
      ],
      posted: "2 days ago"
    },
    {
      id: 2,
      title: "Agronomist",
      department: "Product & Research",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$70K - $95K",
      description: "Lead our agricultural research and work directly with farming communities to develop and validate our solutions.",
      requirements: [
        "Bachelor's or Master's in Agronomy, Agriculture, or related field",
        "5+ years of field experience in sustainable agriculture",
        "Experience working with small-scale and community farmers",
        "Knowledge of crop monitoring and soil health management"
      ],
      posted: "1 week ago"
    },
    {
      id: 3,
      title: "Personal/Executive Assistant",
      department: "Operations",
      location: "San Francisco, CA / Hybrid",
      type: "Full-time",
      salary: "$50K - $65K",
      description: "Support our founding team and help manage day-to-day operations as we scale our impact.",
      requirements: [
        "2+ years of executive assistant experience",
        "Excellent organizational and communication skills",
        "Experience in startup or fast-paced environments",
        "Interest in social impact and sustainable business"
      ],
      posted: "3 days ago"
    }
  ];

  const benefits = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Mission-Driven Work",
      description: "Every day you'll be working toward meaningful impact for farming communities worldwide."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Growth Opportunities",
      description: "Join a fast-growing startup where you can make a real difference and advance your career."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaborative Culture",
      description: "Work with a diverse, passionate team committed to innovation and social impact."
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Competitive Package",
      description: "Fair compensation, equity, health benefits, and flexible work arrangements."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-10 bg-gradient-to-br from-primary/10 to-secondary/20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Join Our Mission
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Help us revolutionize agriculture while empowering communities. Build technology that 
            feeds the world and changes lives.
          </p>
          <Button asChild size="lg">
            <Link to="#positions">View Open Positions</Link>
          </Button>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="py-16 px-6 md:px-10">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">Why Urban Roots?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're building more than a company—we're cultivating a movement for sustainable agriculture and social impact.
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

      {/* Open Positions */}
      <section id="positions" className="py-16 px-6 md:px-10 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">Open Positions</h2>
            <p className="text-lg text-muted-foreground">
              Ready to make an impact? Check out our current openings.
            </p>
          </div>
          
          <div className="space-y-6">
            {jobListings.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary">{job.department}</Badge>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Posted {job.posted}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline">
                        <Link to="/contact">Learn More</Link>
                      </Button>
                      <Button asChild>
                        <Link to="/contact">Apply Now</Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{job.description}</CardDescription>
                  <div>
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 px-6 md:px-10">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">Application Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe in a fair, transparent hiring process that helps us find the right fit for both sides.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Apply</h3>
              <p className="text-sm text-muted-foreground">Submit your application through our contact form with your resume and cover letter.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Screen</h3>
              <p className="text-sm text-muted-foreground">Initial phone/video call to discuss your background and interest in our mission.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Interview</h3>
              <p className="text-sm text-muted-foreground">In-depth interviews with team members and leadership to assess fit and skills.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Decision</h3>
              <p className="text-sm text-muted-foreground">We'll make a decision quickly and provide feedback regardless of the outcome.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 md:px-10 bg-secondary/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary">Don't See the Right Role?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for passionate people who want to make a difference. 
            Reach out and tell us how you'd like to contribute to our mission.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
