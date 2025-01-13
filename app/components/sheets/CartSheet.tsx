import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";

const CartSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          <ShoppingCartIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side={"right"}>
        <SheetHeader>Your cart</SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
