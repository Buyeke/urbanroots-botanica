
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  name: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (name: string, quantity: number) => void;
  clearCart: () => void;
  totalQuantity: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      const found = prev.find((i) => i.name === item.name);
      if (found) {
        return prev.map((i) =>
          i.name === item.name
            ? { ...i, quantity: Math.min(i.quantity + item.quantity, 999) }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const updateQuantity = (name: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.name === name ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);
  const totalQuantity = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, clearCart, totalQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
