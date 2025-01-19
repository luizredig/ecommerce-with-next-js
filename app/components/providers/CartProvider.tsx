"use client";

import { ProductWithTotalPrice } from "@/app/helpers/product";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  total: number;
  subtotal: number;
  totalDiscount: number;
  totalItems: number;
  addProductToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  total: 0,
  subtotal: 0,
  totalDiscount: 0,
  totalItems: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[] | null>(null);

  useEffect(() => {
    const storedProducts = JSON.parse(
      localStorage.getItem("@cart-products") || "[]",
    );
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    if (products !== null) {
      localStorage.setItem("@cart-products", JSON.stringify(products));
    }
  }, [products]);

  const subtotal = useMemo(() => {
    return (
      products?.reduce((acc, product) => {
        return acc + Number(product.basePrice) * product.quantity;
      }, 0) || 0
    );
  }, [products]);

  const total = useMemo(() => {
    return (
      products?.reduce((acc, product) => {
        return acc + product.totalPrice * product.quantity;
      }, 0) || 0
    );
  }, [products]);

  const totalDiscount = subtotal - total;

  const totalItems = useMemo(() => {
    return products?.reduce((acc, product) => acc + product.quantity, 0) || 0;
  }, [products]);

  const addProductToCart = (product: CartProduct) => {
    if (!products) return;

    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev!.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }

          return cartProduct;
        }),
      );

      return;
    }

    setProducts((prev) => [...prev!, product]);
  };

  const decreaseProductQuantity = (productId: string) => {
    if (!products) return;

    setProducts((prev) =>
      prev!
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          }

          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0),
    );
  };

  const increaseProductQuantity = (productId: string) => {
    if (!products) return;

    setProducts((prev) =>
      prev!.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }

        return cartProduct;
      }),
    );
  };

  const removeProductFromCart = (productId: string) => {
    if (!products) return;

    setProducts((prev) =>
      prev!.filter((cartProduct) => cartProduct.id !== productId),
    );
  };

  const clearCart = () => {
    setProducts([]);
    localStorage.removeItem("@cart-products");
  };

  if (products === null) {
    return null;
  }

  return (
    <CartContext.Provider
      value={{
        products,
        total,
        subtotal,
        totalDiscount,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
        totalItems,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
