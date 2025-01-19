import { cn } from "@/app/lib/utils";
import { ArrowDownIcon } from "lucide-react";
import { Badge, BadgeProps } from "../../../components/ui/badge";

const DiscountBadge = ({ children, className, ...props }: BadgeProps) => {
  return (
    <Badge className={cn("px-2 py-[2px]", className)} {...props}>
      <ArrowDownIcon size={14} /> {children}%
    </Badge>
  );
};

export default DiscountBadge;
