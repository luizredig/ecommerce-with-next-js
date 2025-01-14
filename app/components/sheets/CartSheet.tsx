import { ShoppingCartIcon, XIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";
import { Product } from "@prisma/client";

const CartSheet = () => {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <ShoppingCartIcon />
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

        {products.length === 0 ? (
          <>
            <div className="flex flex-1 justify-center">
              <p>Oops! Your cart is empty.</p>
            </div>
          </>
        ) : (
          <></>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
