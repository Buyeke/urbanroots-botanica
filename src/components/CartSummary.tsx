
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import PayPalCheckout from "./PayPalCheckout";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const producePricing: Record<string, number> = {
  "Organic Tomatoes": 3.5,
  "Heirloom Carrots": 2.5,
  "Seasonal Greens": 3.0,
  "Organic Apples": 2.8,
  "Fresh Herbs": 4.0,
  "Organic Bell Peppers": 3.2,
  "Sweet Potatoes": 2.2,
  "Organic Spinach": 3.5,
  "Zucchini": 2.0,
};

function getTotal(items: { name: string; quantity: number }[]) {
  return items.reduce(
    (sum, item) => sum + (producePricing[item.name] || 0) * item.quantity,
    0
  );
}

const CartSummary = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const { items, updateQuantity, clearCart } = useCart();
  const [showContact, setShowContact] = useState(false);
  const { toast } = useToast();

  const totalQty = items.reduce((s, i) => s + i.quantity, 0);
  const total = getTotal(items);

  // Bulk orders (>100 items)
  if (totalQty > 100) {
    return (
      <>
        <Dialog open={showContact} onOpenChange={setShowContact}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contact Us for Bulk Orders</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={e => {
                e.preventDefault();
                toast({
                  title: "Request Sent",
                  description:
                    "We'll contact you shortly to discuss your bulk order.",
                });
                clearCart();
                setShowContact(false);
                onClose();
              }}
            >
              <Input name="name" required placeholder="Full Name" />
              <Input name="email" required placeholder="Email Address" type="email" />
              <Textarea name="message" required placeholder="Tell us about your bulk order..." />
              <DialogFooter>
                <Button type="submit">Send Request</Button>
                <DialogClose asChild>
                  <Button variant="ghost" type="button">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <div>
          <h2 className="font-bold mb-2">Bulk Order Detected</h2>
          <p className="mb-4">
            For orders larger than 100 items, please complete a contact form to arrange your purchase.
          </p>
          <Button onClick={() => setShowContact(true)}>Contact Us</Button>{" "}
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Cart Summary</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          <ul>
            {items.map((item) => (
              <li key={item.name} className="flex items-center gap-2">
                <span className="flex-1">{item.name}</span>
                <Input
                  type="number"
                  min={1}
                  value={item.quantity}
                  className="w-16"
                  onChange={(e) =>
                    updateQuantity(item.name, Math.max(1, Number(e.target.value)))
                  }
                />
                <span className="w-16 text-right">
                  ${(producePricing[item.name] * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="text-right font-semibold">
            Total: ${total.toFixed(2)}
          </div>
          <PayPalCheckout
            onSuccess={onClose}
            amount={total}
          />
          <Button variant="ghost" className="w-full" onClick={() => { clearCart(); onClose(); }}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
