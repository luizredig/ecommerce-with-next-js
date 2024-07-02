import { MenuIcon, ShoppingCartIcon } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";

const Header = () => {
  return (
    <>
      <Card className="flex h-[85px] w-full flex-row items-center justify-between px-8 sm:px-32">
        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"} variant={"outline"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent side={"left"}>
            <SheetHeader>Menu</SheetHeader>
          </SheetContent>
        </Sheet>

        <h1 className="flex select-none flex-row gap-1 text-lg font-semibold">
          <span className="bg-gradient-to-r from-primary to-[#8162FF] bg-clip-text font-bold text-transparent">
            NEXT
          </span>

          <span>Eccomerce</span>
        </h1>

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
      </Card>
    </>
  );
};

export default Header;
