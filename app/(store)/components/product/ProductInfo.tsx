"use client";

import { CartContext } from "@/app/components/providers/CartProvider";
import { Button } from "@/app/components/ui/button";
import {
  calculateTotalPrice,
  ProductWithTotalPrice,
  transformProductWithTotalPrice,
} from "@/app/helpers/product";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useContext, useState } from "react";
import DiscountBadge from "./DiscountBadge";

interface ProductInfoProps {
  product: ProductWithTotalPrice;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const { addProductToCart } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCartClick = () => {
    addProductToCart({ ...product, quantity });
  };

  return (
    <div className="flex flex-col px-5 lg:w-[40%] lg:rounded-lg lg:bg-accent lg:p-10">
      <h2 className="text-lg lg:text-2xl">{product.name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold lg:text-3xl">
          R${" "}
          {Number(
            calculateTotalPrice(transformProductWithTotalPrice(product)),
          ).toFixed(2)}
        </h1>

        {product.discountPercentage > 0 && (
          <DiscountBadge className="lg:text-base">
            {product.discountPercentage}
          </DiscountBadge>
        )}
      </div>

      {product.discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75 lg:text-base">
          R$ {Number(product.basePrice).toFixed(2)}
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={handleDecreaseQuantityClick}
        >
          <ChevronLeftIcon size={16} />
        </Button>

        <span>{quantity}</span>

        <Button
          size="icon"
          variant="outline"
          onClick={handleIncreaseQuantityClick}
        >
          <ChevronRightIcon size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">Description</h3>

        <p className="text-justify text-sm opacity-60">{product.description}</p>
      </div>

      <div className="mt-8 flex flex-col gap-5">
        <Button className="font-bold uppercase" onClick={handleAddToCartClick}>
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
