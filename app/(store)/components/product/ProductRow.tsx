import { Product } from "@prisma/client";
import ProductItem from "./ProductItem";
import { transformProductWithTotalPrice } from "@/app/helpers/product";

interface ProductRowProps {
  products: Product[];
}

const ProductRow = ({ products }: ProductRowProps) => {
  return (
    <div className="flex w-full gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={transformProductWithTotalPrice(product)}
          className="w-[156px] lg:w-[200px] lg:min-w-[200px]"
        />
      ))}
    </div>
  );
};

export default ProductRow;
