import ProductItem from "@/app/components/productItem";
import { Badge } from "@/app/components/ui/badge";
import { CATEGORY_ICON } from "@/app/constants/category-icon";
import { prismaClient } from "@/app/lib/prisma";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  let products;

  if (slug === "deals") {
    products = await prismaClient.product.findMany({
      where: { discountPercentage: { gt: 0 } },
    });
  } else {
    products = await prismaClient.product.findMany({
      where: { category: { slug } },
    });
  }

  return (
    <>
      <div className="flex h-full w-full flex-col gap-8 px-5 py-8 md:px-24">
        <Badge
          variant={"outline"}
          className="flex w-fit flex-row items-center justify-center gap-1 border-2 border-primary py-1"
        >
          {CATEGORY_ICON[slug as keyof typeof CATEGORY_ICON]}

          <p className="uppercase">{slug}</p>
        </Badge>

        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="flex md:h-full md:w-full">
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
