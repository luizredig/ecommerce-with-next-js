import Banner from "./components/banner";
import CategoryItem from "./components/categoryItem";
import Section from "./components/section";
import { prismaClient } from "./lib/prisma";

const Home = async () => {
  const categories = await prismaClient.category.findMany({});

  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 6,
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
    take: 6,
  });

  const speakers = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "speakers",
      },
    },
    take: 6,
  });

  return (
    <>
      <div className="mb-10 flex h-full flex-col gap-10">
        <Banner
          src={"/mobile-first-banner.png"}
          alt="Até 55% de desconto só este mês."
          className="flex h-auto w-full px-5 pt-5 md:hidden"
        />

        <Banner
          src={"/desktop-first-banner.png"}
          alt="Ofertas imperdíveis! Até 55% de desconto só este mês."
          className="hidden h-auto w-full md:flex"
        />

        {categories.length > 0 && (
          <div className="grid w-full grid-cols-2 grid-rows-3 gap-3 overflow-x-scroll px-5 md:flex md:items-center md:gap-3 md:px-24 lg:justify-between [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        )}

        <Section title="Deals" products={deals} href="/products/deals" />

        <div className="flex w-full flex-row gap-9 px-5 md:px-24">
          <Banner
            src="/mouses-banner.png"
            alt="Até 55% de desconto em mouses!"
            className="flex h-auto w-full md:w-1/2"
          />

          <Banner
            src="/headsets-banner.png"
            alt="Até 55% de desconto em fones!"
            className="hidden h-auto w-1/2 md:flex"
          />
        </div>

        <Section
          title="Keyboards"
          products={keyboards}
          href="/products/keyboards"
        />

        <Banner
          src="/delivery-banner.png"
          alt="Frete grátis para todo o Brasil!"
          className="hidden h-auto w-full px-5 md:flex md:px-24"
        />

        <Banner
          src="/headsets-banner.png"
          alt="Até 55% de desconto em fones de ouvido!"
          className="flex h-auto w-full px-5 md:hidden"
        />

        <Section
          title="Speakers"
          products={speakers}
          href="/categories/speakers"
        />
      </div>
    </>
  );
};

export default Home;
