import { Product } from "@prisma/client";

export interface ProductWithTotalPrice extends Product {
  totalPrice: number;
}

export const calculateTotalPrice = (
  product: Pick<Product, "discountPercentage" | "basePrice">,
): number => {
  if (product.discountPercentage === 0) {
    return Number(product.basePrice);
  }

  const totalDiscount =
    Number(product.basePrice) * (product.discountPercentage / 100);

  return Number(product.basePrice) - totalDiscount;
};

export const transformProductWithTotalPrice = (
  product: Product,
): ProductWithTotalPrice => {
  const totalPrice = calculateTotalPrice({
    basePrice: product.basePrice,
    discountPercentage: product.discountPercentage,
  });

  return {
    ...product,
    totalPrice,
  };
};

export const transformProductsWithTotalPrice = (
  products: Product[],
): ProductWithTotalPrice[] => {
  return products.map((product) => transformProductWithTotalPrice(product));
};
