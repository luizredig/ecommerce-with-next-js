import Image from "next/image";
import { prismaClient } from "./lib/prisma";
import CategoryItem from "./components/categoryItem";

const Home = async () => {
  const categories = await prismaClient.category.findMany({});

  return (
    <>
      <div>
        <Image
          src={"/mobile-first-banner.png"}
          alt="Até 55% de desconto só este mês."
          width={0}
          height={0}
          sizes="100vw"
          className="flex h-auto w-full px-5 py-7 md:hidden"
        />

        <Image
          src={"/desktop-first-banner.png"}
          alt="Ofertas imperdíveis! Até 55% de desconto só este mês."
          width={0}
          height={0}
          sizes="100vw"
          className="hidden h-auto w-full md:flex"
        />

        {categories.length > 0 && (
          <div className="grid grid-cols-2 grid-rows-3 gap-3 overflow-x-scroll px-5 md:flex md:items-center md:gap-3 lg:justify-center [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
