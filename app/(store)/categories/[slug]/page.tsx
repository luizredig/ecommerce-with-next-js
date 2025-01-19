import ProductItem from "@/app/(store)/components/product/ProductItem";
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
      <div className="flex h-full w-full flex-col gap-8 py-8">
        <div className="flex w-full px-5 md:px-24">
          <Badge
            variant={"outline"}
            className="flex w-fit flex-row items-center justify-center gap-1 border-2 border-primary py-1"
          >
            {CATEGORY_ICON[slug as keyof typeof CATEGORY_ICON]}

            <p className="uppercase">{slug}</p>
          </Badge>
        </div>

        <div className="grid w-full grid-cols-2 grid-rows-3 gap-4 overflow-x-scroll px-5 sm:gap-8 md:flex md:max-h-[286px] md:px-24 [&::-webkit-scrollbar]:hidden">
          {products.map((product) => (
            <div
              key={product.id}
              className="h-auto max-h-[286px] min-h-[286px] md:min-w-[180px] md:max-w-[180px]"
            >
              <ProductItem key={product.id} product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
