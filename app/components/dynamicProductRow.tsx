"use client";

import { Product } from "@prisma/client";
import ProductItem from "./productItem";
import { useEffect, useState } from "react";
import { useScreenSize } from "../helpers/useScreenSize";

interface DynamicProductRowProps {
  products: Product[];
}

const DynamicProductRow = ({ products }: DynamicProductRowProps) => {
  const screenSize = useScreenSize();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchSelectedProducts = async () => {
      let take = 6;

      if (screenSize === "sm") {
        take = 6;
      } else if (screenSize === "md") {
        take = 4;
      }

      setSelectedProducts(products.slice(0, take));
    };

    fetchSelectedProducts();
  }, [screenSize, setSelectedProducts, products]);
  return (
    <>
      {selectedProducts.length > 0 && (
        <div className="grid w-full grid-cols-2 grid-rows-3 gap-4 overflow-x-scroll px-5 sm:gap-8 md:flex md:max-h-[286px] md:px-24 [&::-webkit-scrollbar]:hidden">
          {selectedProducts.map((product) => (
            <div
              key={product.id}
              className="h-full min-h-[286px] w-full md:min-w-[180px]"
            >
              <ProductItem key={product.id} product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DynamicProductRow;
