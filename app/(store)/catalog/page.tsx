import { Badge } from "@/app/components/ui/badge";
import { prismaClient } from "@/app/lib/prisma";
import { GripIcon } from "lucide-react";
import CatalogItem from "../components/catalogItem";

const Page = async () => {
  const categories = await prismaClient.category.findMany({});

  return (
    <>
      <div className="flex h-full w-full flex-col gap-8 px-5 pb-10 pt-5 md:px-24">
        <Badge
          variant={"outline"}
          className="flex w-fit flex-row items-center justify-center gap-1 border-2 border-primary py-1"
        >
          <GripIcon />

          <p className="px-2 font-semibold uppercase">Catalog</p>
        </Badge>

        <div className="grid grid-cols-2 items-center justify-center gap-4 md:grid-cols-3 md:gap-8">
          {categories.map((category) => (
            <CatalogItem key={category.id} category={category} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
