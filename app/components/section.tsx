import { Product } from "@prisma/client";
import ProductItem from "./productItem";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

interface SectionProps {
  title: string;
  products: Product[];
  href: string;
}

const Section = ({ title, products, href }: SectionProps) => {
  return (
    <>
      <section className="flex w-full flex-col gap-5">
        <div className="flex flex-row items-center justify-between px-5 md:px-24">
          <p className="text-xl font-bold uppercase">{title}</p>

          <Link href={`/${href}`}>
            <Button variant="link" className="flex flex-row gap-1 pr-0">
              <p>View all</p>

              <ArrowRightIcon size={20} />
            </Button>
          </Link>
        </div>

        <div className="flex flex-row gap-4 overflow-x-scroll px-5 md:px-24 [&::-webkit-scrollbar]:hidden">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Section;
