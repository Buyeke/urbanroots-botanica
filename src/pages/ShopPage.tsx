
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sprout, Store } from "lucide-react";

const produce = [
  {
    name: "Organic Tomatoes",
    description: "Freshly picked, vine-ripened tomatoes grown without pesticides.",
    icon: <Sprout className="h-8 w-8 text-primary" />,
  },
  {
    name: "Heirloom Carrots",
    description: "Sweet, colorful carrots rich in vitamins and flavor.",
    icon: <Sprout className="h-8 w-8 text-primary" />,
  },
  {
    name: "Seasonal Greens",
    description: "A variety of crisp, nutrient-dense greens harvested daily.",
    icon: <Sprout className="h-8 w-8 text-primary" />,
  },
  // Add more produce as you grow!
];

const ShopPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 md:px-10 bg-gradient-to-br from-background to-secondary/10">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <Store className="mx-auto h-10 w-10 text-primary mb-2" />
          <h1 className="text-4xl font-bold mb-3 text-primary">Shop Organic Produce</h1>
          <p className="text-lg text-muted-foreground mb-2">
            Are you a farmers market or produce buyer? Partner directly with our women-led sustainable farms!
          </p>
          <div className="mb-4">
            <span className="block text-base text-foreground font-semibold">Fresh. Local. Empowering.</span>
          </div>
          <Button asChild size="lg" className="bg-primary text-white px-8">
            <Link to="/contact">Request a Supplier Invitation</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {produce.map((item) => (
            <Card key={item.name} className="transition-shadow hover:shadow-lg">
              <CardHeader className="flex flex-col items-center">
                {item.icon}
                <CardTitle className="mt-2 text-xl text-center">{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-muted-foreground text-base">
            Get in touch to receive our product list and join our growing community of markets and buyers supporting sustainable agriculture!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
