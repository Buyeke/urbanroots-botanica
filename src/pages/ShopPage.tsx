
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sprout, Store, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartSummary from "@/components/CartSummary";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
];

const ShopPage = () => {
  const [quantity, setQuantity] = useState<{ [name: string]: number }>({});
  const [cartOpen, setCartOpen] = useState(false);
  const { addToCart, totalQuantity } = useCart();

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
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {produce.map((item) => (
            <Card key={item.name} className="transition-shadow hover:shadow-lg flex flex-col">
              <CardHeader className="flex flex-col items-center">
                {item.icon}
                <CardTitle className="mt-2 text-xl text-center">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <CardDescription className="text-center mb-2">{item.description}</CardDescription>
                <div className="flex items-center justify-center gap-2 mt-auto">
                  <input
                    type="number"
                    min={1}
                    max={999}
                    value={quantity[item.name] || 1}
                    onChange={e =>
                      setQuantity(q => ({
                        ...q,
                        [item.name]: Math.max(1, Number(e.target.value)),
                      }))
                    }
                    className="w-16 rounded px-2 py-1 border"
                  />
                  <Button
                    onClick={() => {
                      addToCart({ name: item.name, quantity: quantity[item.name] || 1 });
                    }}
                  >
                    Add to cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mb-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2"
            disabled={!totalQuantity}
          >
            <ShoppingCart className="h-5 w-5" />
            View Cart
            {totalQuantity > 0 && <span className="ml-2 font-bold text-primary">({totalQuantity})</span>}
          </Button>
        </div>
        <div className="text-center mt-10">
          <p className="text-muted-foreground text-base">
            Get in touch to receive our product list and join our growing community of markets and buyers supporting sustainable agriculture!
          </p>
        </div>
      </div>
      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="max-w-md w-full">
          <CartSummary onClose={() => setCartOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopPage;
