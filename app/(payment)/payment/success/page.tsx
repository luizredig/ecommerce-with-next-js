"use client";

import { Button } from "@/app/components/ui/button";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <div className="mb-4 flex w-full justify-center">
          <CheckCircleIcon size={100} className="text-green-400" />
        </div>

        <h1 className="mb-4 text-2xl font-bold">
          Purchase Simulation Successful
        </h1>

        <p className="mb-6 text-muted-foreground">
          Thank you for simulating a purchase! Please note that this is not a
          real transaction. You can return to the home page or continue
          browsing.
        </p>

        <div className="flex justify-center space-x-4">
          <Link href="/">
            <Button variant="default">Go to Home Page</Button>
          </Link>

          <Link href="/">
            <Button variant="secondary">Continue Browsing</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
