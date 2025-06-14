
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    paypal: any;
  }
}

interface PayPalCheckoutProps {
  onSuccess: () => void;
  amount: number;
}

const PayPalCheckout = ({ onSuccess, amount }: PayPalCheckoutProps) => {
  const { clearCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // Remove previous buttons in case of re-mount
    const container = document.getElementById("paypal-btn-container");
    if (container) container.innerHTML = "";

    // Dynamically load PayPal JS SDK
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID || "test"}&currency=USD`;
    script.async = true;
    script.onload = () => {
      if (window.paypal && container) {
        window.paypal.Buttons({
          createOrder: (data: any, actions: any) =>
            actions.order.create({
              purchase_units: [{
                amount: { value: amount.toFixed(2) }
              }]
            }),
          onApprove: async (data: any, actions: any) => {
            await actions.order.capture();
            toast({ title: "Payment successful!", description: "Thank you for your purchase." });
            clearCart();
            onSuccess();
          },
          onError: () =>
            toast({ title: "Payment failed", description: "Please try again.", variant: "destructive" }),
        }).render(container);
      }
    };
    document.body.appendChild(script);
    return () => { if (container) container.innerHTML = ""; };
  }, [amount]);

  return <div id="paypal-btn-container" className="w-full" />;
};

export default PayPalCheckout;
