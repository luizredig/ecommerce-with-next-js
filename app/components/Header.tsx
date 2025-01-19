"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import AccountSheet from "./sheets/AccountSheet";
import CartSheet from "./sheets/CartSheet";
import MenuSheet from "./sheets/MenuSheet";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data: session, status } = useSession();

  const handleLogin = () => {
    signIn();
  };

  return (
    <>
      <Card className="fixed z-10 flex h-20 w-full flex-row items-center justify-between rounded-none border-x-0 border-t-0 bg-background/85 px-5 backdrop-blur-lg backdrop-filter md:h-28 md:max-h-16 md:px-24">
        <MenuSheet />

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

        {status === "loading" || status === "unauthenticated" ? (
          <Button onClick={handleLogin} size={"sm"}>
            Login
          </Button>
        ) : (
          <div className="flex flex-row gap-3 sm:gap-7">
            <AccountSheet />

            <CartSheet />
          </div>
        )}
      </Card>
    </>
  );
};

export default Header;
