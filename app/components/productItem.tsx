import { Product } from "@prisma/client";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { ArrowDownIcon, PercentIcon } from "lucide-react";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <>
      <div className="flex h-full w-full flex-col gap-5">
        {/* Image */}
        <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-muted p-[15%]">
          {/* Bagde */}
          {product.discountPercentage > 0 && (
            <Badge className="absolute left-2 top-2 flex max-h-5 flex-row p-2">
              <ArrowDownIcon size={16} />

              <p>{product.discountPercentage}</p>

              <PercentIcon size={16} />
            </Badge>
          )}

          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            priority
            className="h-auto w-full"
          />
        </div>

        {/* Info */}
        <div>
          <p className="truncate font-light">{product.name}</p>

          {product.discountPercentage > 0 ? (
            <div className="flex flex-row items-center gap-1">
              <p className="font-semibold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(
                  Number(
                    Number(product.basePrice) -
                      (Number(product.basePrice) * product.discountPercentage) /
                        100,
                  ),
                )}
              </p>

              <p className="truncate text-sm text-[#525252] line-through">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(Number(product.basePrice))}
              </p>
            </div>
          ) : (
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(Number(product.basePrice))}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductItem;
