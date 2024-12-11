import { MenuIcon, ShoppingCartIcon, UserRoundIcon } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { Separator } from "./ui/separator";

const Header = () => {
  return (
    <>
      <Card className="fixed z-10 flex h-20 w-full flex-row items-center justify-between rounded-none border-x-0 border-t-0 bg-background/85 px-5 backdrop-blur-lg backdrop-filter md:h-28 md:px-24">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size={"icon"}
              variant={"outline"}
              className="flex md:hidden"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent side={"left"}>
            <SheetHeader>Menu</SheetHeader>
          </SheetContent>
        </Sheet>

        <Link href={"/"}>
          <h1 className="flex select-none flex-row items-center justify-center gap-1 text-lg font-semibold">
            <span className="bg-gradient-to-r from-primary to-[#8162FF] bg-clip-text font-bold text-transparent">
              NEXT
            </span>

            <span>Ecommerce</span>
          </h1>
        </Link>

        <div className="absolute left-1/2 top-1/2 hidden h-full -translate-x-1/2 -translate-y-1/2 transform flex-row items-center justify-center gap-4 md:flex">
          <Link href={"/"}>
            <p>Home</p>
          </Link>

          <Separator orientation="vertical" className="h-5 w-1 rounded-full" />

          <Link href={"/catalog"}>
            <p>Catalog</p>
          </Link>

          <Separator orientation="vertical" className="h-5 w-1 rounded-full" />

          <Link href={"/categories/deals"}>
            <p>Deals</p>
          </Link>
        </div>

        <div className="flex flex-row gap-3 sm:gap-7">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size={"icon"}
                variant={"outline"}
                className="hidden md:flex"
              >
                <UserRoundIcon />
              </Button>
            </SheetTrigger>

            <SheetContent side={"right"}>
              <SheetHeader>Your account</SheetHeader>
            </SheetContent>
          </Sheet>

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
        </div>
      </Card>
    </>
  );
};

export default Header;
