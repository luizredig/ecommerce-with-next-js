import { Category } from "@prisma/client";
import { CATEGORY_ICON } from "../constants/category-icon";
import { Button } from "./ui/button";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <>
      <Link
        href={`/${category.slug}`}
        className="flex w-full items-center justify-center"
      >
        <Button
          variant={"outline"}
          className="flex w-full flex-row items-center justify-center gap-1 px-1 sm:px-6"
        >
          {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}

          <p>{category.name}</p>
        </Button>
      </Link>
    </>
  );
};

export default CategoryItem;
