
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, User } from "lucide-react";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Genesis: From Idea to Impact",
      excerpt: "How Urban Roots was born from a simple observation about food security and women's empowerment in rural communities.",
      date: "January 15, 2025",
      author: "Community Team",
      readTime: "5 min read",
      category: "Company Journey",
      featured: true
    },
    {
      id: 2,
      title: "Understanding Our Users: Deep Dive into Farmer Needs",
      excerpt: "Months of user research revealed the real challenges facing small-scale farmers, especially women in agriculture.",
      date: "February 12, 2025",
      author: "Community Team",
      readTime: "7 min read",
      category: "Research"
    },
    {
      id: 3,
      title: "Building Our First Prototype: Lessons from the Field",
      excerpt: "The journey from concept to working prototype, including our failures, pivots, and breakthrough moments.",
      date: "March 8, 2025",
      author: "Community Team",
      readTime: "6 min read",
      category: "Product Development"
    },
    {
      id: 4,
      title: "IoT Sensors Meet Ancient Wisdom: Technology for Sustainable Farming",
      excerpt: "How we're combining cutting-edge IoT technology with traditional farming knowledge to create something revolutionary.",
      date: "April 5, 2025",
      author: "Community Team",
      readTime: "8 min read",
      category: "Technology"
    },
    {
      id: 5,
      title: "Building an MVP That Actually Helps Farmers",
      excerpt: "From prototype to minimum viable product: the technical and human challenges of creating tools that farmers love.",
      date: "May 20, 2025",
      author: "Community Team",
      readTime: "9 min read",
      category: "Product Development"
    },
    {
      id: 6,
      title: "The Power of Community: How Farmers Are Shaping Our Platform",
      excerpt: "User feedback and community input that's driving our product roadmap and social impact initiatives.",
      date: "June 14, 2025",
      author: "Community Team",
      readTime: "5 min read",
      category: "Community",
      featured: false
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-10 bg-gradient-to-br from-primary/10 to-secondary/20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Our Journey
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Follow our path from idea to impact. Stories of innovation, challenges overcome, 
            and the communities we're building together.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-6 md:px-10">
        <div className="container mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 text-primary">Featured Story</h2>
            {blogPosts.filter(post => post.featured).map(post => (
              <Card key={post.id} className="overflow-hidden">
                <div className="grid lg:grid-cols-2">
                  <div className="bg-secondary/20 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="h-32 w-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="h-16 w-16 text-primary" />
                      </div>
                      <p className="text-muted-foreground">Featured article image</p>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary">{post.category}</Badge>
                      <Badge variant="outline">Featured</Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                    <p className="text-muted-foreground mb-6">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 px-6 md:px-10 bg-secondary/20">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-primary">All Stories</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {blogPosts.map(post => (
              <Card key={post.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-6 md:px-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary">Stay Updated</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get the latest updates on our journey, product developments, and impact stories 
            delivered to your inbox monthly.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
            />
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
