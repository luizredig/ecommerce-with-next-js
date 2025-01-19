"use client";

import { CartContext } from "@/app/components/providers/CartProvider";
import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/app/lib/utils";
import { useContext } from "react";

type CartBadgeProps = {
  className?: string;
};

const CartBadge = ({ className }: CartBadgeProps) => {
  const { totalItems } = useContext(CartContext);

  if (totalItems === 0) {
    return null;
  }

  return (
    <Badge
      className={cn(
        "flex w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white hover:bg-primary",
        className,
      )}
    >
      {totalItems > 10 ? "10+" : totalItems}
    </Badge>
  );
};

export default CartBadge;
