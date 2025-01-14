import {
  HomeIcon,
  ListIcon,
  LogInIcon,
  MenuIcon,
  PercentIcon,
  XIcon,
} from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";

const MenuSheet = () => {
  const { data: session, status } = useSession();

  const handleLogin = () => {
    signIn();
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size={"icon"} variant={"outline"} className="flex md:hidden">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent
          side={"left"}
          className="flex flex-col gap-4 [&>button]:hidden"
        >
          <div className="flex items-center justify-between">
            <p>Menu</p>

            <SheetClose asChild>
              <Button size={"icon"} variant={"ghost"}>
                <XIcon />
              </Button>
            </SheetClose>
          </div>

          <div className="flex w-full">
            <Button onClick={handleLogin} className="flex w-full gap-2">
              <LogInIcon size={16} />

              <p>Login</p>
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <SheetClose asChild>
              <Link className="flex w-full" href={"/"}>
                <Button
                  variant={"outline"}
                  className="flex w-full items-center justify-start gap-2"
                >
                  <HomeIcon size={16} />

                  <p>Home</p>
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link className="flex w-full" href={"/catalog"}>
                <Button
                  variant={"outline"}
                  className="flex w-full items-center justify-start gap-2"
                >
                  <PercentIcon size={16} />

                  <p>Catalog</p>
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link className="flex w-full" href={"/categories/deals"}>
                <Button
                  variant={"outline"}
                  className="flex w-full items-center justify-start gap-2"
                >
                  <ListIcon size={16} />

                  <p>Deals</p>
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MenuSheet;
