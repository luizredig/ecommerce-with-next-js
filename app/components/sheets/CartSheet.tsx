import CartBadge from "@/app/(store)/components/cart/CartBadge";
import CartItem from "@/app/(store)/components/product/CartItem";
import { createCheckout } from "@/app/actions/checkout";
import { calculateTotalPrice } from "@/app/helpers/product";
import { loadStripe } from "@stripe/stripe-js";
import { ShoppingCartIcon, XIcon } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../providers/CartProvider";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";

const CartSheet = () => {
  const { products, subtotal, total, totalDiscount } = useContext(CartContext);

  const handleFinishPurchaseClick = async () => {
    const checkout = await createCheckout(products);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"outline"} className="relative">
          <ShoppingCartIcon />

          <CartBadge className="absolute -right-2 -top-2" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side={"right"}
        className="flex flex-col gap-[30px] [&>button]:hidden"
      >
        <div className="flex justify-between">
          <Badge
            variant={"outline"}
            className="flex w-fit flex-row items-center justify-center gap-1 border-2 border-primary py-1"
          >
            <ShoppingCartIcon />

            <p className="px-2 font-semibold uppercase">Cart</p>
          </Badge>

          <SheetClose asChild>
            <Button size={"icon"} variant={"ghost"}>
              <XIcon />
            </Button>
          </SheetClose>
        </div>

        <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="flex h-full flex-col gap-8">
              {products.length > 0 ? (
                products.map((product) => (
                  <CartItem
                    key={product.id}
                    product={{
                      ...product,
                      totalPrice: calculateTotalPrice(product),
                    }}
                  />
                ))
              ) : (
                <div className="flex flex-1 justify-center">
                  <p className="text-center font-semibold">
                    Oops! Your cart is empty.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {products.length > 0 && (
          <div className="flex flex-col gap-3">
            <Separator />

            <div className="flex items-center justify-between text-xs lg:text-sm">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs lg:text-sm">
              <p>Discounts</p>
              <p>- ${totalDiscount.toFixed(2)}</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-sm font-bold lg:text-base">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>

            <Button
              className="mt-7 font-bold uppercase"
              onClick={handleFinishPurchaseClick}
            >
              Finish purchase
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
