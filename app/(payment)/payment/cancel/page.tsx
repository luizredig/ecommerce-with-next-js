"use client";

import { Button } from "@/app/components/ui/button";
import { CircleXIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <div className="mb-4 flex w-full justify-center">
          <CircleXIcon size={100} className="text-red-500" />
        </div>

        <h1 className="mb-4 text-2xl font-bold">Purchase Canceled</h1>

        <p className="mb-6 text-muted-foreground">
          Your purchase was canceled. If you&apos;d like, you can return to the
          home page.
        </p>

        <Link href="/">
          <Button variant="default">Go to Home Page</Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
