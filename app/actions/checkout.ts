"use server";

import Stripe from "stripe";
import { CartProduct } from "../components/providers/CartProvider";

export const createCheckout = async (products: CartProduct[]) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia",
  });

  const checkout = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.HOST_URL}/payment/success`,
    cancel_url: `${process.env.HOST_URL}/payment/cancel`,
    line_items: products.map((product) => ({
      price_data: {
        currency: "BRL",
        product_data: {
          name: product.name,
          description: product.description,
          images: product.imageUrls,
        },
        unit_amount: product.totalPrice * 100,
      },
      quantity: product.quantity,
    })),
  });

  return checkout;
};
