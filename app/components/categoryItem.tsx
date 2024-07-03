import { Category } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import { CATEGORY_ICON } from "../constants/category-icon";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <>
      <Card className="flex items-center justify-center">
        <CardContent className="flex flex-row items-center justify-center gap-2 py-2">
          {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}

          <p>{category.name}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default CategoryItem;
