"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode } from "react";

type CartProduct = Product & { quantity: number };

interface CartContextType {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
}

const CartContext = createContext<CartContextType | undefined>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CartContext.Provider
        value={{
          products: [],
          cartTotalPrice: 0,
          cartBasePrice: 0,
          cartTotalDiscount: 0,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
};

export default CartProvider;
