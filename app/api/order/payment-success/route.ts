import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("No signature", { status: 500 });
  }

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("Payment was successful", session);
  }

  return NextResponse.json({ received: true });
};
