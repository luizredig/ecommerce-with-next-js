import {
  transformProductsWithTotalPrice,
  transformProductWithTotalPrice,
} from "@/app/helpers/product";
import { prismaClient } from "@/app/lib/prisma";
import ProductImages from "../../components/product/ProductImages";
import ProductInfo from "../../components/product/ProductInfo";
import ProductRow from "../../components/product/ProductRow";
import SectionTitle from "../../components/product/SectionTitle";

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailsPage = async ({
  params: { slug },
}: ProductDetailsPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) return null;

  return (
    <div className="flex flex-col gap-8 pb-8 lg:container lg:mx-auto lg:gap-10 lg:px-24 lg:py-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-9">
        <ProductImages imageUrls={product.imageUrls} name={product.name} />

        <ProductInfo product={transformProductWithTotalPrice(product)} />
      </div>

      <div className="flex flex-col gap-5 px-5 lg:px-0">
        <SectionTitle>Recommended</SectionTitle>

        <ProductRow
          products={transformProductsWithTotalPrice(product.category.products)}
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
