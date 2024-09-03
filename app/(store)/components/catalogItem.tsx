import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CatalogItemProps {
  category: Category;
}

const CatalogItem = ({ category }: CatalogItemProps) => {
  return (
    <>
      <Link
        href={`/categories/${category.slug}`}
        className="h-full max-h-64 min-h-52 w-full overflow-hidden rounded-xl"
      >
        {/* Image */}
        <div className="flex h-2/3 w-full items-center justify-center bg-gradient-to-bl from-neutral-900 to-primary">
          <Image
            src={category.imageUrl}
            alt={category.name}
            width={0}
            height={0}
            sizes="100vw"
            priority
            className="h-auto max-h-[70%] w-full max-w-[70%] object-contain"
          />
        </div>

        {/* Name */}
        <div className="flex h-1/3 items-center justify-center bg-muted">
          <p>{category.name}</p>
        </div>
      </Link>
    </>
  );
};

export default CatalogItem;
